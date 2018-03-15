<template>
  <div class="binding_body">
    <div class="binding_verification">
      <div class="code_btn" @click="codeBtn">生成新验证码</div>
      <h2>购券动态验证码</h2>
      <div class="code_box">{{codeList.saleCode}}</div>
      <div class="tips_box">
        <p class="tips1" v-show="tips1">本验证码将在<span>{{time}}</span>秒后失效</p>
        <p class="tips2" v-show="tips2">该验证码已失效</p>
        <p class="tips3" v-show="tips3">该验证码已使用</p>
      </div>
    </div>
    <div class="remark">
      <h2>备注信息</h2>
      <div class="textarea_box" v-show="textarea">
        <textarea placeholder="请输入备注信息" v-model="textareaFonts" @keyup="textareaChange" Maxlength="100"></textarea>
        <span><b>{{num}}</b>/100</span>
      </div>
      <div class="textarea_fonts" v-show="remark_fonts">{{remark}}</div>
    </div>
    <div class="submit_btn" @click="submitBtn" v-show="showBtn">提交</div>
    <div class="popTips" v-show="showTips">{{msg}}</div>
  </div>
</template>
<script>
  import * as config from '@/lib/config'
  import {
    formatDate,
    checkInject
  } from '@/lib/tools';
  export default({
    data(){
      return{
        tips1:true,
        tips2:false,
        tips3:false,
        textarea:true,
        remark_fonts:false,
        remark:"",
        userId:'',
        token:'',
        codeList:'',
        time:'',
        showTips:false,
        textareaFonts:'',
        msg:'',
        num:0,
        sid:'',
        showBtn:true,
        setId:'',
        timeId:'',
        createIndex:true
      }
    },
    created(){

      this.userId = localStorage.getItem('adminuserId')
      this.token = localStorage.getItem('admintoken')
      this.getLastCode()

    },
    mounted(){
      var _this = this
      _this.setId = setInterval(function(){
        _this.refreshcode()
      },8000)
      console.log(1111,_this.setId)
    },
    methods:{
      codeBtn(){
        this.tips1 = true;
        this.tips2 = false;
        this.tips3 = false;
        this.textarea = true;
        this.remark_fonts = false;
        this.showBtn = true
        this.textareaFonts = ''
        this.num = 0
        console.log(888888,this.timeId)
        window.clearInterval(this.timeId)
        /*window.clearInterval(this.setId)*/
        this.createCode()
      /*  this.getLastCode()*/
      },
      textareaChange(){
        this.num = this.textareaFonts.length
        console.log(this.textareaFonts.length)
        if(this.textareaFonts.length >= 100){
          return
        }
      },
      refreshcode(){
        var _this = this
        $.ajax({
          type: "GET",
          url: config.locationUrl + "/code/getLastCode",
          dataType: "jsonp",
          data: {
            token: _this.token,
            userId: _this.userId
          },
          success: function (data) {
            if (data.ret == 0) {
              if(data.data.flagStatus == '1'){
                return
              }
              if(data.data.flagStatus == '2'){
                _this.tips1 = false;
                _this.tips2 = false;
                _this.tips3 = true;
                window.clearInterval(_this.timeId)
                return
              }
            }
          },
          error(res) {
            console.log('/code/getLastCode', 'fail');
          }
        });
      },
      getLastCode(){
        var _this = this
        $.ajax({
          type: "GET",
          url: config.locationUrl + "/code/getLastCode",
          dataType: "jsonp",
          data: {
            token: _this.token,
            userId: _this.userId
          },
          success: function (data) {
            if (data.ret == 0) {

              if(data.data == null){
                _this.createCode()
              }else {
                _this.codeList = data.data
                _this.sid = data.data.sid
                localStorage.setItem('codeSid', _this.sid)
                if(data.data.remark == null || data.data.remark == ''){
                  _this.textarea = true;
                  _this.remark_fonts = false;
                }else {
                  _this.textarea = false;
                  _this.remark_fonts = true;
                  _this.remark = data.data.remark
                  _this.showBtn = false
                }
                if(data.data.flagStatus == '1'){
              console.log(data.currentTime)
                  var TendDate = _this.time_to_sec(formatDate(new Date(data.data.endDate), 'hh:mm:ss'))
                  var TcurrentTime =  _this.time_to_sec(formatDate(new Date(data.currentTime), 'hh:mm:ss'))
                  _this.time = TendDate - TcurrentTime
                  _this.timeId = setInterval(function(){
                if(_this.time == '0' || _this.time == 0){
                  _this.tips1 = false;
                  _this.tips2 = true;
                  _this.tips3 = false;
                  console.log(5555,_this.setId)
                  console.log(89898989,_this.timeId)
                  window.clearInterval(_this.timeId)
//                  window.clearInterval(_this.setId)
                  return
                }else {
                  _this.time = _this.time - 1
                }
              },1000)
              if(data.currentTime > data.data.endDate){
                _this.tips1 = false;
                _this.tips2 = true;
                _this.tips3 = false;
                window.clearInterval(_this.timeId)
//                window.clearInterval(_this.setId)
                return
              }
                }
              if(data.data.flagStatus == '2'){
                _this.tips1 = false;
                _this.tips2 = false;
                _this.tips3 = true;
                window.clearInterval(_this.timeId)
              }
              }
            }else if(data.ret == -8){
              _this.showTips = true;
              _this.msg = '该账号暂时无法使用，请联系上一级管理员';
              setTimeout(function(){
                _this.showTips = false;
              },1000);
              setTimeout(function(){
                _this.$router.push({
                  name: 'Loginpage'
                })
              },1100);
              window.clearInterval(_this.setId)
              return
            }else if(data.ret == 403){
              _this.showTips = true;
              _this.msg = '系统超时，请重新登录';
              setTimeout(function(){
                _this.showTips = false;
              },1000);
              setTimeout(function(){
                _this.$router.push({
                  name: 'Loginpage'
                })
              },1100);
              window.clearInterval(_this.setId)
              return
            }
          },
          error(res) {
            console.log('/code/getLastCode', 'fail');
          }
        });
      },
      time_to_sec (time) {
        var s = '';

        var hour = time.split(':')[0];
        var min = time.split(':')[1];
        var sec = time.split(':')[2];

        s = Number(hour*3600) + Number(min*60) + Number(sec);

        return s;
      },
      createCode(){
        var _this = this
        window.clearInterval(this.timeId)
        if(!_this.createIndex){
          return
        }
        _this.createIndex = false
        $.ajax({
          type: "GET",
          url: config.locationUrl + "/code/createCode",
          dataType: "jsonp",
          data: {
            token: _this.token,
            userId: _this.userId
          },
          success: function (data) {
            if (data.ret == 0) {
              _this.codeList = data.data
              _this.sid = data.data.sid
              localStorage.setItem('codeSid', _this.sid)
              if (data.data.remark == null || data.data.remark == '') {
                _this.textarea = true;
                _this.remark_fonts = false;
              } else {
                _this.textarea = false;
                _this.remark_fonts = true;
                _this.remark = data.data.remark
                _this.showBtn = false
              }
              if(data.data.flagStatus == '1'){
                var TendDate = _this.time_to_sec(formatDate(new Date(data.data.endDate), 'hh:mm:ss'))
                var TcurrentTime =  _this.time_to_sec(formatDate(new Date(data.currentTime), 'hh:mm:ss'))
              _this.time = TendDate - TcurrentTime
              _this.timeId = setInterval(function () {
                if (_this.time == '0' || _this.time == 0) {
                  _this.tips1 = false;
                  _this.tips2 = true;
                  _this.tips3 = false;
                  console.log(5555, _this.setId)
                  console.log(89898989, timeId)
                  window.clearInterval(_this.timeId)
                  /* window.clearInterval(_this.setId)*/
                  return
                } else {
                  _this.time = _this.time - 1
                }
              }, 1000)
              if (data.currentTime > data.data.endDate) {
                _this.tips1 = false;
                _this.tips2 = true;
                _this.tips3 = false;
                console.log(6666, _this.setId)
                window.clearInterval(_this.timeId)
                /*     window.clearInterval(_this.setId)*/
                return
              }
            }
              if(data.data.flagStatus == '2'){
                _this.tips1 = false;
                _this.tips2 = false;
                _this.tips3 = true;
                window.clearInterval(_this.timeId)
              }

            }else if(data.ret == -8){
              _this.showTips = true;
              _this.msg = '该账号暂时无法使用，请联系上一级管理员';
              setTimeout(function(){
                _this.showTips = false;
              },1000);
              setTimeout(function(){
              _this.$router.push({
                name: 'Loginpage'
              })
              },1100);
              window.clearInterval(_this.setId)
              _this.createIndex = true;
              return
            }else if(data.ret == 403){
              _this.showTips = true;
              _this.msg = '系统超时，请重新登录';
              setTimeout(function(){
                _this.showTips = false;
              },1000);
              setTimeout(function(){
                _this.$router.push({
                  name: 'Loginpage'
                })
              },1100);
              window.clearInterval(_this.setId)
              _this.createIndex = true;
              return
            }else {
              console.log('/code/createCode', 'ret != 0');
            }
            _this.createIndex = true;
          },
          error(res) {
            console.log('/code/createCode', 'fail');
            _this.createIndex = true;
          },
        });
      },
      submitBtn(){
        var _this = this
        _this.sid = localStorage.getItem('codeSid')
        _this.textareaFonts = $.trim(_this.textareaFonts)
        if(checkInject(_this.textareaFonts)){
          this.showTips = true
          this.msg = "输入内容不能包含字符<>"
          setTimeout(function(){
            _this.showTips = false
          },1000)
          return
        }
        if(_this.textareaFonts == ''){
          _this.num = 0
          _this.showTips = true;
          _this.msg = '请填写备注';
          setTimeout(function(){
            _this.showTips = false;
          },1000);
          return;
        }

        $.ajax({
          type: "GET",
          url: config.locationUrl + "/code/saveRemark",
          dataType: "jsonp",
          data: {
            token: _this.token,
            sid: _this.sid,
            remark: _this.textareaFonts,
            userId: _this.userId
          },
          success: function (data) {
            if (data.ret == 0) {
              _this.showTips = true;
              _this.msg = '提交成功';
              _this.textarea = false;
              _this.remark_fonts = true;
              _this.showBtn = false
              _this.remark = _this.textareaFonts
              setTimeout(function(){
                _this.showTips = false;
              },1000);
            }else if(data.ret == -8){
              _this.showTips = true;
              _this.msg = '该账号暂时无法使用，请联系上一级管理员';
              setTimeout(function(){
                _this.showTips = false;
              },1000);
              setTimeout(function(){
                _this.$router.push({
                  name: 'Loginpage'
                })
              },1100);
              window.clearInterval(_this.setId)
              return
            }else if(data.ret == 403){
              _this.showTips = true;
              _this.msg = '系统超时，请重新登录';
              setTimeout(function(){
                _this.showTips = false;
              },1000);
              setTimeout(function(){
                _this.$router.push({
                  name: 'Loginpage'
                })
              },1100);
              window.clearInterval(_this.setId)
              return
            }else {
              console.log('/code/saveRemark', 'ret != 0');
            }
          },
          error(res) {
            console.log('/code/saveRemark', 'fail');
          }
        });
      }
    }
  })
</script>
<style lang="scss" scoped>
  @import '../../assets/scss/_mixins.scss';
  @import '../../assets/scss/pages/_binding.scss';
</style>
