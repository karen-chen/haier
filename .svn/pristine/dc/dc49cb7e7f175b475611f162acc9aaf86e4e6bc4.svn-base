<template>
  <div class="content">
       <div class="main">
      <div class="top">
        <img class="personPic" :src="imageServerUrl + picUrl">
        <p class="logo">{{title}}</p>
        <h2 class="title">{{buyBtn}}</h2>
        <div class="codetime">
          有效日期{{startDate}} 至 {{endDate}}
        </div>
      </div>

      <ul>
        <li class="hexiao">
          <div class="inputma" v-show="orderStatus == 1">
            <input type="" placeholder="请输入核销密码" v-model="code">
          </div>
          <div @click="codeMatch" :class="[ allow ? '' : 'nouse','buyBtn']">{{btnmass}}</div>
        </li>
      </ul>
    </div>
    <!-- 核销成功 -->
    <div class="masuccess" v-show="tips">{{masseg}}</div>
  </div>
</template>
<script>
import * as config from '@/lib/config'
import '@/assets/js/jquery.qrcode.min'
import {
  userData,
  EnumConfigType,
  ShareInfo,
  formatDate,
  getJsSign,
  wxconfig
} from '@/lib/tools';

export default {
  data() {
    return {
      imageServerUrl: config.imageServerUrl,
      picUrl: '',
      logo: '',
      title: '',
      buyBtn: '',
      startDate: '',
      endDate: '',
      masseg: '',
      code: '',
      code1: '',
      tips: false,
      onoff: true,
      orderStatus: 0,
      allow: false,
      btnmass: '',
      btnmass1: '',
      textarea: '备注（选填）',
      num1: true,
      num2: false,
      money: 0
    }
  },

  created() {
document.title = "店员核销页面";
    //拒绝分享
    getJsSign(function(sign) {
      wxconfig(sign);
    })
    wx.ready(function() {
      wx.hideAllNonBaseMenuItem();
    });

    var self = this;
    if (typeof WeixinJSBridge === "undefined") {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', self.onBridgeReady, false);
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', self.onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady', self.onBridgeReady);
      }
    } else {
      self.onBridgeReady();
    }
    //获取相关卡片详情
    $.ajax({
      url: config.locationUrl + "/prize_log/getLogDetail",
      dataType: "jsonp",
      data: {
        //顾客的openID
        openid: userData.userId,
        userLogId: userData.userLogId

      },
      success: function(data) {
        console.log(data);
        if (data.ret === "0") {
          self.picUrl = data.card.merchant.merchantLogo;
          self.title = data.card.merchant.merchantName;
          self.buyBtn = data.card.resourceName;
          self.startDate = data.card.configBean.startDate.value;
          self.endDate = data.card.configBean.endDate.value;
          self.description = data.card.configBean.description.value;
          self.orderStatus = parseInt(data.data.flagStatus);
          if (self.orderStatus == 1) {
            self.allow = true;
            self.btnmass = '确定';
          }
          if (self.orderStatus == 2) {
            self.allow = false;
            self.btnmass = '已核销';
          }
          if (self.orderStatus == 3) {
            self.allow = false;
            self.btnmass = '已过期';
          }
          if (self.orderStatus == 4) {
            self.allow = false;
            self.btnmass = '卡券还未开始使用';
          }

        } else {
          //处理接口调用失败
          self.error('getMyRecognizeCardDetail');
        }
      },
      error(res) {
        self.error('getMyRecognizeCardDetail');
      }
    });

  },

  methods: {
    error(msg) {
      console.log('msg:', 'fail');
    },
    codeMatch() {
      var self = this;
      // console.log(111111111111111111);
      if (self.onoff) {
        if (self.orderStatus == 1) {


          if (self.code == '') {
            // debugger
            self.tipsShow('核销码不能为空');
            self.onoff = false;
            setTimeout(() => {
              self.onoff = true;
            }, 2000);
          } else {
            self.onoff = false;
            //提交核销密码,进行核销
            $.ajax({
              url: config.locationUrl + "/prize_log/hexiao",
              dataType: "jsonp",
              data: {
                openid: userData.openid,
                userLogId: userData.userLogId,
                code: this.code
              },
              success: function(data) {
                console.log(data);

                setTimeout(() => {
                  self.onoff = true;
                }, 2000);

                if (data.ret === "0") {
                  self.$router.push({
                    name: 'Prizesuccess'
                  })
                }
                if (data.ret === '1') {
                  self.tipsShow('中奖纪录号无效');
                }
                if (data.ret === '2') {
                  self.tipsShow('密码错误');
                }
                if (data.ret === '3') {
                  self.tipsShow('中奖纪录状态不对');
                }
                if (data.ret === '-99') {
                  self.tipsShow('参数异常');
                }

                // self.onoff = true;
              },
              error(res) {
                // self.onoff = true;
                self.error('prize_log/hexiao');
              }
            });

          }

        }
      } else {
        return
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
        onBridgeReady() {
      console.log("组件加载完毕");
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../../assets/scss/_mixins.scss';
html {
  background: #f2f2f2;
}

.content {
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  .main {
    .top {
      padding-top: pTR(30);
      text-align: center;
      width: 100%;
      height: pTR(368);
      background: url(../../assets/czlImg/hexiaoBg.jpg) 0 0 no-repeat;
      background-size: 100%;
      .personPic {
        width: pTR(120);
        height: pTR(120);
        display: block;
        margin: 0 auto;
        border-radius: 50%;
      }
      .logo {
        font-size: pTR(28);
        color: #fff;
        padding-top: pTR(20);
      }
      .title {
        padding: pTR(40) 0 0;
        color: #fff;
      }
      .codetime {
        height: pTR(100);
        line-height: pTR(100);
        color: rgba(255, 255, 255, 0.6);
        font-size: pTR(24);
      }
    }
    .listBar {
      width: 100%;
      height: pTR(80);
      background: #fff;
      padding: 0 pTR(110);
      color: #666666;
      font-size: pTR(30);
     text-align:center;
     line-height:pTR(80);
    }

    .hexiao {
      .buyBtn {
        width: pTR(687);
        height: pTR(95);
        line-height: pTR(70);
        background: #f66051;
        color: #fff;
        font-size: pTR(30);
        border-radius: pTR(5);
        margin: pTR(40) auto pTR(85);
        text-align: center;
        line-height: pTR(95);
        font-size: pTR(32);
        border-radius: pTR(5);
      }
      .nouse {
        background: #929292;
      }
      .inputma {
        padding: pTR(20) 0;
        border-top: solid #eeeeee pTR(2);
        border-bottom: solid #eeeeee pTR(2);
        color: #666;
        input {
          width: 100%;
          background: #fff;
          font-size: pTR(30);
          height: pTR(100);
          line-height: pTR(100);
          padding-left: pTR(40);
        }
      }
      .remark {
        width: 100%;
        height: pTR(200);
        padding: pTR(30);
        background: #fff;
        border-top: solid #eeeeee pTR(2);
        border-bottom: solid #eeeeee pTR(2);
        textarea {
          border: none;
          width: 100%;
          height: 100%;
          color: #666666;
          font-size: pTR(30);
          line-height: pTR(40);
        }
      }
    }
    .refund {
      .inputma {
        padding: pTR(20) 0;
        border-top: solid #eeeeee pTR(2);
        border-bottom: solid #eeeeee pTR(2);
        input {
          width: 100%;
          background: #fff;
          font-size: pTR(30);
          height: pTR(100);
          line-height: pTR(100);
          padding-left: pTR(40);
        }
      }
      .buyBtn {
        width: pTR(687);
        height: pTR(95);
        line-height: pTR(70);
        background: #f66051;
        color: #fff;
        font-size: pTR(30);
        border-radius: pTR(5);
        margin: pTR(40) auto pTR(85);
        text-align: center;
        line-height: pTR(95);
        font-size: pTR(32);
        border-radius: pTR(5);
      }
      .nouse {
        background: #929292;
      }
    }
  }
}


.masuccess {
  position: fixed;
  width: pTR(340);
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

</style>
