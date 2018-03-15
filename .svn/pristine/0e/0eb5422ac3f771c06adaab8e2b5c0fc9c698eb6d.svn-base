<template>
  <div class="scoring">
    <div class="scoringBox">
      <div class="top">
        <div class="pfTxt">评分</div>
        <ul class="startlist">
          <li @click="show(item)" v-for="item in lists" :class="[ item<i? 'on' : '']">{{item}}</li>
        </ul>
      </div>
      <div class="bottom">
        <textarea @focus="textCenter" v-model="textarea" maxlength="140">
        </textarea>
        <div class="beizhu" v-show="beizhu">请输入评论</div>
        <div class="fontNum">{{textarea_length}}/140</div>
      </div>
    </div>
    <div @click="saveComment" :class="[ i<0? 'onclass' : '','submitBtn']">提交</div>
    <!-- 核销成功 -->
    <div class="masuccess" v-show="tips">{{masseg}}</div>
    <!-- 评论成功 -->
    <div class="complete" v-show="complete">
      <div class="scoringBox">
        <div class="pfTxt">评分</div>
        <ul class="startlist">
          <li v-for="item in lists" :class="[ item<i? 'on' : '']">{{item}}</li>
        </ul>
        <div class="bottom">
          您已完成对本次服务的评价，感谢您的帮助与支持
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as config from '@/lib/config'
import {
  userData,
  EnumConfigType,
  ShareInfo,
  getJsSign,
  wxconfig,
  checkInject
} from '@/lib/tools';


export default {
  data() {
    return {
      lists: [1, 2, 3, 4, 5],
      i: -1,
      beizhu: true,
      textarea: '',
      masseg: '请选择星级进行评分',
      tips: false,
      onoff: true,
      complete: false

    }
  },
  computed:{
    textarea_length:function(){
      return this.textarea.length + (this.textarea.match(/\n/g)?this.textarea.match(/\n/g).length:0);
    }
  },
  created() {
    //拒绝分享
    var self = this;
    document.title = "我的评论";
    getJsSign(function(sign) {
      wxconfig(sign);
    })
    wx.ready(function() {
      wx.hideAllNonBaseMenuItem();
    });
    $.ajax({
      url: config.locationUrl + "/order/checkOrderComment",
      dataType: "jsonp",
      data: {
        // cardOrderId: userData.cardOrderId,
        cardOrderId: 'B000000APG50853',
        openid: userData.openid,
      },
      success: function(data) {
        console.log(data.obj.commentScore);
        //为0 则显示获取信息资料按钮 需要填写资料,为1 则显示按钮 资料已经填写 直接调微信卡券接口 ,-1 不显示按钮
        if(data.ret === "1"){
          self.i=data.obj.commentScore+1;
          self.complete = true;
        }
      }
    });
  },
  methods: {
    show(item) {
      console.log(item);
      this.i = item + 1;
      localStorage.setItem('star', this.i);
      // this.i = index
    },
    textCenter() {
      this.beizhu = false;
    },

    saveComment() {
      var self = this;
     
      var val = this.textarea;
       console.log(val);
      if (this.onoff) {
        if (this.i == -1) {
          self.onoff = false;
          setTimeout(() => {
            self.onoff = true;
          }, 2000)
          self.tipsShow('请选择星级进行评分');
        }
        else if(checkInject(val)) {
          self.onoff = false;
          setTimeout(() => {
            self.onoff = true;
          }, 2000)
          self.tipsShow('输入内容不能包含字符<>');
        } else {
          $.ajax({
            url: config.locationUrl + "/order/saveComment",
            dataType: "jsonp",
            data: {
              cardOrderId: userData.cardOrderId,
              // cardOrderId: 'B000000APG50853',
              commentScore: this.i - 1,
              commentContent: this.textarea
            },
            success: function(data) {
              //为0 则显示获取信息资料按钮 需要填写资料,为1 则显示按钮 资料已经填写 直接调微信卡券接口 ,-1 不显示按钮
              if (data.ret === "0") {
                self.complete = true;
              }
            }
          });
        }
      }
    },
    //弹框定时显示
    tipsShow(meg) {
      var self = this;
      this.tips = true;
      this.masseg = meg;
      setTimeout(() => {
        self.tips = false;
      }, 2000);
    },

  }
}

</script>
<style lang="scss" scoped>
@import '../../assets/scss/_mixins.scss';
html {
  background: #f9f9f9;
}

.scoring {
  background: #f9f9f9;
  padding: pTR(32) pTR(40) pTR(32);
  width: 100%;
  height: 100%;
  .scoringBox {
    padding: 0 pTR(20);
    width: 100%;
    height: pTR(412);
    background: #fff;
    border-radius: pTR(10);
    display: flex;
    flex-direction: column;
    .top {
      width: 100%;
      height: pTR(137);
      border-bottom: pTR(2) solid rgba(0, 0, 0, 0.1);
      position: relative;
      .pfTxt {
        position: absolute;
        color: #333333;
        font-size: pTR(36);
        left: pTR(36);
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
      }
      .startlist {
        width: 100%;
        padding-left: pTR(150);
        height: pTR(137);
        display: flex;
        align-items: center;
        li {
          width: pTR(59);
          height: pTR(57);
          background: url(../../assets/czlImg/star.png) 0 0 no-repeat;
          background-size: 100%;
          margin-right: pTR(20);
          font-size: 0;
        }
        .on {
          background: url(../../assets/czlImg/star1.png) 0 0 no-repeat;
          background-size: 100%;
        }
      }
    }
    .bottom {
      position: relative;
      width: 100%;
      box-flex: 1;
      flex: 1;
      textarea {
        border: none;
        width: 100%;
        height: 100%;
        padding: pTR(20) pTR(23) pTR(22);
      }
      .beizhu {
        position: absolute;
        top: pTR(20);
        left: pTR(23);
        color: #999999;
        font-size: pTR(32);
        point-event: none;
      }
      .fontNum {
        position: absolute;
        bottom: pTR(20);
        right: pTR(23);
        color: #999999;
        font-size: pTR(26);
      }
    }
  }
  .submitBtn {
    width: 100%;
    height: pTR(100);
    background: rgba(246, 96, 81, 1);
    border-radius: pTR(10);
    line-height: pTR(100);
    text-align: center;
    color: #fff;
    font-size: pTR(32);
    margin-top: pTR(40);
  }
  .onclass {
    width: 100%;
    height: pTR(100);
    border-radius: pTR(10);
    line-height: pTR(100);
    text-align: center;
    color: #fff;
    font-size: pTR(32);
    margin-top: pTR(40);
    background: rgba(246, 96, 81, 0.5)
  }
}

.masuccess {
  position: fixed;
  width: pTR(500);
  height: pTR(88);
  background: rgba(0, 0, 0, 0.8);
  left: 50%;
  top: 30%;
  transform: translateX(-50%);
  font-size: pTR(30);
  text-align: center;
  line-height: pTR(88);
  color: #fff;
}

.complete {
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  background: #f9f9f9;
  padding: pTR(32) pTR(40) pTR(32);
  width: 100%;
  height: 100%;
  .scoringBox {
    padding: 0 pTR(20);
    width: 100%;
    height: pTR(460);
    background: #fff;
    border-radius: pTR(10);
    .startlist {
      width: 100%;
      padding: 0 pTR(150);
      height: pTR(66);
      display: flex;
      align-items: center;
      margin-bottom: pTR(50);
      li {
        width: pTR(59);
        height: pTR(57);
        background: url(../../assets/czlImg/star.png) 0 0 no-repeat;
        background-size: 100%;
        margin-right: pTR(20);
        font-size: 0;
      }
      .on {
        background: url(../../assets/czlImg/star1.png) 0 0 no-repeat;
        background-size: 100%;
      }
    }

    .pfTxt {
      color: #333333;
      font-size: pTR(28);
      color: #999999;
      text-align: center;
      padding: pTR(65) 0;
      position: relative;
    }
    .pfTxt:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      -webkit-transform: translateY(-50%);
      width: pTR(232);
      height: pTR(5);
      background: url(../../assets/czlImg/line2.png) 0 0 no-repeat;
      background-size: 100%;
    }
    .pfTxt:after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      -webkit-transform: translateY(-50%);
      width: pTR(232);
      height: pTR(5);
      background: url(../../assets/czlImg/line1.png) 0 0 no-repeat;
      background-size: 100%;
    }
    .bottom {
      padding: 0 pTR(50);
      color: #333333;
      font-size: pTR(36);
      line-height: pTR(48);
      position: relative;
    }
    .bottom:before {
      content: '';
      position: absolute;
      width: pTR(34);
      height: pTR(28);
      background: url(../../assets/czlImg/colon1.png) 0 0 no-repeat;
      background-size: 100%;
      top: pTR(-50);
      left: pTR(30);
    }
    .bottom:after {
      content: '';
      position: absolute;
      width: pTR(34);
      height: pTR(28);
      background: url(../../assets/czlImg/colon2.png) 0 0 no-repeat;
      background-size: 100%;
      right: pTR(30);
      bottom: pTR(30);
    }
  }
}

</style>
