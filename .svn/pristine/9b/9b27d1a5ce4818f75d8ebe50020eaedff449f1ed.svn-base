<template>
  <div class="information_body" v-show="showBody">
    <div class="inforBody">
      <div class="title">
        手机号码
      </div>

<!--     <div class="el-row">
      <div class="el-col el-col-24">
        <div class="el-input">
          <input autocomplete="off" id="input1" placeholder="请输入姓名" v-model="name" type="text" rows="2" @keyup="updateTip1"  class="el-input__inner">
          <div class="pop_tips" v-show="tip1 && showTips">
            请输入姓名
          </div>
        </div>
      </div>
    </div> -->
        <div class="inputBar">
          <input autocomplete="off" id="input2" @blur="phoneValidate" placeholder="请输入手机号" v-model="phone" type="text" rows="2" @keyup="updateTip2">
          <div class="pop_tips" v-show="tip2 && showTips2">
            请输入手机号
          </div>
        </div>


    </div>
    <div class="text-center el-row">
      <button type="button" class="el-button el-button--default" @click="submitBtn">
        <span>确认绑定</span>
      </button>
    </div>
    <div class="pop_comment" v-show="showPop">
      {{msg}}
    </div>
  </div>
</template>
<style lang="scss">
  @import '../../assets/scss/_mixins.scss';
  @import '../../assets/scss/pages/_index.scss';
  @import '../../assets/scss/pages/_information.scss';
  html,body{
    background:#f2f2f2;
  }
  .pop_comment{
    background-color: rgba(0,0,0,.6);
    max-width: 80%;
  @include p(10,20);
  @include radius(10);
  @include size_color(30,#fff);
    position: fixed;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding:pTR(20) pTR(30);
  }
  .inforBody{
    background:#fff;
    margin-top:pTR(40);
    padding:pTR(45) pTR(32) pTR(50);
    .title{
      font-size:pTR(30);
      color:#666666;
      padding-bottom:pTR(45);
    }
    .inputBar{
      width:100%;
      height:pTR(100);
      border-bottom:pTR(2) solid #e5e5e5;
      input{
        width:100%;
        height:100%;
        line-height:pTR(100);
        color:#b9b9b9;
        font-size:pTR(30);
      }
      input::-webkit-input-placeholder {
        color:#b9b9b9;
      }
    }
  }
  .size36{
    padding-top:pTR(50);
  }

</style>
<script>
  import * as config from '@/lib/config'
  import {
    userData,
    wxHideMenu,
    getJsSign,
    wxconfig,
    checkInject,
    checkTel
  } from '@/lib/tools';


  export default {
    data(){
      return {
        showBody:false,
        showPop:false,
        name:'',
        phone:'',
        msg:'',
        tip1:false,
        tip2:false
      }
    },

    created(){
      var _this = this;
      document.title = "账号绑定";
      //console.log(userData.openid)
      getJsSign(function(sign) {
        wxconfig(sign);
      })
      wxHideMenu()
      wx.ready(function(){
        wx.showMenuItems({
          menuList: [
            'menuItem:favorite',
          ] // 要显示的菜单项，所有menu项见附录3
        });
      })

    $.ajax({
        type: "GET",
        url: config.locationUrl + "/user/checkBind",
        dataType: "jsonp",
        data: {
          openid:userData.openid
        },
        success: function(data) {
         // console.log(data)
          if (data.ret == 0) {
            _this.$router.push({path:'coupon'})
          }else{
            _this.showBody = true
          }
        },
        error(res) {
          console.log('/user/checkBind:', 'fail');
        }
      });
    },
    computed:{
      showTips2:function(){
        return this.phone.length==0
      }
    },
    methods:{
      updateTip2(){
        this.tip2=true;
      },
      phoneValidate(){
        var _this = this
        this.phone = $.trim(this.phone)
        if (checkTel(this.phone)) {
          return true;
        } else {
          this.showPop = true
          this.msg = "手机号码有误,请重填"
          setTimeout(function(){
            _this.showPop = false
          },2000)
          return false;
        }

      },
      submitBtn(){
        var _this = this;
        _this.updateTip2();
        if(_this.showTips2){
          return
        }if(_this.phone == ''){
          _this.tip2 = true
        }
        if(checkInject(_this.name)){
          this.showPop = true
          this.msg = "输入内容不能包含字符<>"
          setTimeout(function(){
            _this.showPop = false
          },2000)
          return
        }
        _this.newname = $.trim(_this.name)
        $.ajax({
          type: "GET",
          url: config.locationUrl + "/user/bindSaleUser",
          dataType: "jsonp",
          data: {
            openid:userData.openid,
            phone:this.phone
          },
          success: function(data) {
            console.log(data)
            if (data.ret == 0) {
              _this.$router.push({path:'coupon'})
            }else{
              _this.showPop = true
              setTimeout(function(){
                _this.showPop = false
              },2000)
              _this.msg = data.msg
            }
          },
          error(res) {
            console.log('/user/bindSaleUser:', 'fail');
          }
        });
      }
    }
  }

</script>
