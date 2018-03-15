<template>
  <div class="buyBox">
    <div class="scrollBox">
      <div class="content">
        <div class="main">
          <img class="personPic" :src="imageServerUrl + picUrl">
          <p class="logo">{{logo}}</p>
          <ul class="quanList">
            <h2 class="quanTxt">{{title}}</h2>
            <div class="timedata">
              <h2>有效日期</h2>
              <p>{{startDate}}至 {{endDate}}</p>
            </div>
          </ul>
          <div class="buyBtn" @click="showmessRoute()" v-if=" price != 0">
            立即购买
          </div>
          <div class="buyBtn" @click="showmessRoute()" v-if=" price == 0">
            立即领取
          </div>
          <span class="lineonff"></span>
          <div class="suitBox"><i></i>适用门店</div>
          <div class="tips">
            <img class="tipsImg" :src="icon ? icon:'static/share/activePic.png'">
            <h2>使用说明</h2>
            <p v-html="description"></p>
          </div>
        </div>
      </div>
    </div>
    <!-- 提示弹框 -->
    <div class="masuccess" v-show="tips">{{masseg}}</div>
    <!-- 验证码 -->
    <div class="popmask" v-show="verificationcode">
      <div class="verificationcode">
        <div class="input_box">
          <input placeholder="请输入4位验证码完成领取" v-model="inputCode" maxlength="4">
        </div>
        <p>请向销售员索要验证码</p>
        <div class="sureBtn" @click="submitSure">确认</div>
        <div class="closeSure" @click="closeSure"></div>
      </div>
    </div>
    <!-- 活动结束 -->
    <div class="endBox" v-show="endMess">
      <div class="textline">
        <div class="img"></div>
        该活动已关闭
      </div>
    </div>
  </div>
</template>
<script src="//wximg.gtimg.com/shake_tv/include/js/lib/jquery.2.1.1.min.js"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script src="//wximg.gtimg.com/shake_tv/include/js/jsapi.js"></script>
<script src="//code.jquery.com/jquery-2.2.4.min.js"></script>
<script>
import * as purl from '@/assets/js/purl'
import * as constants from '@/assets/js/constants'
import * as auth from '@/assets/js/auth'
import * as config from '@/lib/config'
import {
  userData,
  EnumConfigType,
  ShareInfo,
  getJsSign,
  wxconfig
} from '@/lib/tools';

export default {
  data() {
    return {
      imageServerUrl: config.imageServerUrl,
      money: 0,
      price: 0,
      picUrl: '',
      logo: '',
      title: '',
      buyBtn: '',
      startDate: '',
      endDate: '',
      description: '',
      canCustomerInfo: '',
      recognizeCardSid: '',
      cardNo: '',
      sign: {},
      allow: true,
      status: 0,
      endActive: false,
      onoff: true,
      tips: false,
      endMess: false,
      masseg: '',
      verificationcode: '',
      inputCode: '',
      submitSureIndex: true,
      icon: ''

    }
  },

  created() {
    document.title = '认筹活动详情';
    //设置调用微信支付接口配置
    if (typeof WeixinJSBridge === "undefined") {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
      }
    } else {
      this.onBridgeReady();
    }

    var self = this;

    //拒绝分享
    getJsSign(function(sign) {
      wxconfig(sign);
    })
    wx.ready(function() {
      wx.hideAllNonBaseMenuItem();
    });


    //存储接口传参所需数据

    this.recognizeCardSid = localStorage.getItem('detailrecognizeCardSid')

    this.getRecognizeCardDetial();

  },
  methods: {
    error(msg) {
      console.log('msg:', 'fail');
    },

    //点击购买按钮判断
    showmessRoute() {
      // localStorage.setItem('recognizeCardSid', item.sid);
      // console.log(item.card.configBean.price.value);
      console.log(this.allow);
      var self = this;
      if (!self.allow) {
        return;
      }
      console.log(3333);
      self.allow = false;
      setTimeout(() => {
        self.allow = true;
      }, 500)
      $.ajax({
        url: config.locationUrl + "/activity/getRecognizeCardDetial",
        dataType: "jsonp",
        data: {
          recognizeCardSid: self.recognizeCardSid,
          openid: userData.openid
        },
        success: function(data) {
          console.log(121212, data.ret);
          console.log(1)
          if (data.ret === "0") {
            self.status = parseInt(data.ret);
            self.cardNo = data.obj.card.sid;
            localStorage.setItem('checkMember', self.cardNo);

            if (data.obj.card.configBean.canSaleCode == null || data.obj.card.configBean.canSaleCode.value == '0') {
              self.wx_pay();

            } else {
              self.verificationcode = true;
            }

          }
          if (data.ret === "-1") {
            self.tipsShow('卡券已下架');
            setTimeout(function() {
              self.$router.push({
                name: 'BuyCard'
              })
            }, 2000)

            return;
          }
          if (data.ret === "2") {
            self.tipsShow('卡券已过期');
            return;
          }
          if (data.ret === "3") {
            self.tipsShow('库存不够');
            return;
          }
          if (data.ret === "4") {
            self.tipsShow('购买数量已达上限');
            return;
          }
          if (data.ret === "-88") {
            self.endMess = true;
          }
        },
        error(res) {
          self.error('getRecognizeCardList');
        }
      });


      // this.$router.push({
      //   name: 'Buy'
      // })
    },
    // //详情接口状态判断
    getRecognizeCardDetial(cb) {
      var self = this;
      $.ajax({
        url: config.locationUrl + "/activity/getRecognizeCardDetial",
        dataType: "jsonp",
        data: {
          recognizeCardSid: this.recognizeCardSid,
          openid: userData.openid
        },
        success: function(data) {
          console.log(data);
          if (data.ret === "0") {
            self.status = parseInt(data.ret);
            self.buyBtn = data.obj.card.configBean.price.value + '元购买';
          }
          self.obj = data.obj;
          self.price = data.obj.card.configBean.price.value;
          self.money = Math.round(data.obj.card.configBean.price.value * 100);
          self.picUrl = data.obj.card.merchant.merchantLogo;
          self.logo = data.obj.card.merchant.merchantName;
          self.title = data.obj.card.resourceName;
          self.startDate = data.obj.card.configBean.startDate.value.substring(0, 11);
          self.endDate = data.obj.card.configBean.endDate.value.substring(0, 11);
          self.description = "<p>" + data.obj.card.configBean.description.value.replace(/\n/g, "</p><p>") + "</p>";
          self.canCustomerInfo = data.obj.card.configBean.canCustomerInfo.value;
          self.cardNo = data.obj.card.sid;
          localStorage.setItem('checkMember', self.cardNo);
          localStorage.setItem('money', self.money);
          if (data.obj.card.configBean.icon) {
            self.icon = self.imageServerUrl + data.obj.card.configBean.icon.value
          }
          cb && cb();
        },
        error(res) {
          self.error('getRecognizeCardList');
        }
      });
    },

    //请求接口,获取微信支付签名

    wx_pay() {
      var self = this;
      $.ajax({
        url: config.locationUrl + "/wx_pay/pay_sign",
        dataType: "jsonp",
        type: "post",
        data: {
          openid: userData.openid,
          money: self.money,
          cardNo: self.cardNo,
          recognizeCardSid: self.recognizeCardSid,
          actId: userData.actSid,
          saleOpenid: userData.saleOpenid,
          codeSid: self.vcodesid
        },
        success: function(data) {

          if (data.ret === "0") {
            //订单ID
            localStorage.setItem('orderId', data.order.sid);
            if (self.money == 0) {
              if (self.canCustomerInfo === '1') {
                self.$router.push({
                  name: 'Submit'
                })
              } else {
                self.$router.push({
                  name: 'Buysuccess'
                })
              }
              return
            } else {

              self.invokePayDlg(data);
            }
            // self.sign = data.sign;

          } else {
            //处理接口调用失败
            self.error('getCustomData');
          }
        },
        error(res) {
          self.error('getCustomData');
        }
      });
    },

    invokePayDlg(ret) {
      var self = this;
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        ret.sign,
        function(res) {
          //alert(res.err_msg);
          // $("#log_info").append("<p>支付结果："+res.err_msg+"</p>");
          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            //CT：实际是否成交以后台接口为准
            // $("#out_trade_no").val(now_time);
            if (self.canCustomerInfo === '1') {
              self.$router.push({
                name: 'Submit'
              })
            } else {
              self.$router.push({
                name: 'Buysuccess'
              })
            }

          } else {
            //其他情况：get_brand_wcpay_request:cancel或者get_brand_wcpay_request:fail，后者在配置错误时也会出现，日
          }
        }
      );
    },

    onBridgeReady() {
      console.log("组件加载完毕");
    },

    //弹框定时显示
    tipsShow(meg) {
      var self = this;
      self.tips = true;
      self.masseg = meg;
      setTimeout(() => {
        self.tips = false;
      }, 600);
    },
    submitSure() {
      var self = this;
      // $('.body').css('overflow', 'auto');
      console.log(this.inputCode);
      if (!self.submitSureIndex) {
        console.log(12121211111111)
        return
      }
      self.submitSureIndex = false
      console.log('hhhhhhhhh')
      $.ajax({
        url: config.locationUrl + "/code/useCode",
        dataType: "jsonp",
        data: {
          code: this.inputCode
        },
        success: function(data) {
          if (data.ret === "0") {
            self.vcodesid = data.data.sid;
            self.wx_pay();
            self.verificationcode = false;
          } else {
            console.log(111111111);
            self.tipsShow('验证码错误');
          }
          self.submitSureIndex = true
        },

      });
    },
    closeSure() {
      this.verificationcode = false;
      /* this.submitSureIndex = false*/
      // $('.body').css('overflow', 'auto');
    },
  }
}

</script>
<style lang="scss" scoped>
@import '../../assets/scss/_mixins.scss';

.buyBox {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #f52b3a;
  left: 0;
  top: 0;
  z-index: 99;
  overflow: auto;
  .scrollBox {
    width: 100%;
    height: 100%;
    overflow: scroll;
    background: #f52b3a;
  }
  .content {
    width: 100%;
    padding: pTR(108) pTR(25) pTR(20);
    background: #f52b3a;
    display: flex;
    flex-direction: column;

    .main {
      width: 100%;
      background: #fff;
      position: relative;
      padding: pTR(90) 0 pTR(50);
      border-radius: pTR(5);
      text-align: center;
      .personPic {
        position: absolute;
        width: pTR(150);
        height: pTR(150);
        display: block;
        left: 50%;
        transform: translateX(-50%);
        top: pTR(-75);
        border-radius: 50%;
      }
      .logo {
        font-size: pTR(28);
        color: #666;
      }
      .title {
        padding: pTR(40) 0 pTR(60);
      }
      .buyBtn {
        width: pTR(434);
        height: pTR(70);
        line-height: pTR(70);
        color: #fff;
        font-size: pTR(30);
        border-radius: pTR(5);
        margin: 0 auto;
        background: #f52b3a;
      }
      .lineonff {
        width: 100%;
        height: pTR(19);
        background: url(../../assets/czlImg/quanline.png) 0 0 no-repeat;
        background-size: 100%;
        margin: pTR(50) 0 0;
        display: block;
      }
      .suitBox {
        height: pTR(108);
        display: flex;
        align-items: center;
        position: relative;
        margin: 0 pTR(30);
        border-bottom: pTR(2) solid rgba(0, 0, 0, 0.07);
        padding-left: pTR(10);
        i {
          display: block;
          width: pTR(24);
          height: pTR(31);
          background: url(../../assets/czlImg/addicon.png) 0 0 no-repeat;
          background-size: 100%;
          margin-right: pTR(20);
        }
      }
      .suitBox:after {
        position: absolute;
        content: '';
        display: block;
        width: pTR(14);
        height: pTR(16);
        background: url(../../assets/czlImg/arrowicon2.png) 0 0 no-repeat;
        background-size: 100%;
        margin-right: pTR(20);
        right: pTR(10);
        top: 50%;
        transform: translateY(-50%);
      }
      .nouse {
        background: #929292;
      }
      .logoPic {
        width: 100%;
        height: pTR(236);
        background: url(../../assets/czlImg/activePic.png) 0 0 no-repeat;
        background-size: 100%;
        margin-bottom: pTR(10);
      }

      .tips {
        text-align: left;
        padding: pTR(33) pTR(28) 0;
        .tipsImg {
          width: 100%;
          height:pTR(240);
        }
        h2 {
          font-size: pTR(28);
          color: #5d5d5d;
          line-height: pTR(34);
          text-align: center;
          padding: pTR(45) 0 pTR(10);
        }
        p {
          padding-top: pTR(10);
          color: #7c7c7c;
          font-size: pTR(30);
          line-height: pTR(50);
          word-break: break-all;
        }
      }
    }
  }
}


.endBox {
  position: fixed;
  left: 0;
  width: 100%;
  top: 0;
  height: 100%;
  background: #fff;
  z-index: 999;
  .textline {
    font-size: pTR(35);
    color: #999;
    text-align: center;
    padding-top: pTR(180);
    .img {
      display: block;
      width: pTR(198);
      height: pTR(129);
      background: url(../../assets/czlImg/endPic.png) 0 0 no-repeat;
      background-size: 100%;
      margin: 0 auto pTR(75);
    }
  }
}

.popBox {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
  .RefundBox {
    width: pTR(500);
    height: pTR(300);
    position: absolute;
    background: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: pTR(10);
    padding: 0 pTR(22);
    .text {
      padding: pTR(80) 0 pTR(50);
      text-align: center;
      color: #757575;
      font-size: pTR(36);
    }
    .butList {
      display: flex;
      justify-content: center;
      .btn1 {
        width: pTR(245);
        height: pTR(70);
        border-radius: pTR(10);
        background: #929292;
        font-size: pTR(36);
        text-align: center;
        line-height: pTR(70);
        color: #fff;
      }
      .btn2 {
        width: pTR(245);
        height: pTR(70);
        border-radius: pTR(10);
        background: #f52b3a;
        font-size: pTR(36);
        text-align: center;
        line-height: pTR(70);
        color: #fff;
      }
    }
  }
  .tipsBox {
    width: pTR(560);
    height: pTR(356);
    position: absolute;
    background: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: pTR(10);
    padding: 0 pTR(22);
    text-align: center;
    .tipstext {
      padding: pTR(114) 0 pTR(50);
      color: #757575;
      font-size: pTR(36);
    }

    .tipsday {
      color: #999999;
      font-size: pTR(30);
    }
    .tipsBtn {
      position: absolute;
      width: pTR(50);
      height: pTR(50);
      background: url(../../assets/czlImg/closeBtn.png) center center no-repeat;
      background-size: pTR(16) pTR(16);
      right: 0;
      top: 0;
    }
  }
}

.masuccess {
  position: fixed;
  width: pTR(288);
  height: pTR(100);
  background: rgba(0, 0, 0, 0.8);
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
  font-size: pTR(32);
  text-align: center;
  line-height: pTR(100);
  color: #fff;
  z-index: 9999;
}


.quanTxt {
  color: #333333;
  font-size: pTR(40);
  padding-top: pTR(66);
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.timedata {
  padding: pTR(45) 0 pTR(34);
  color: #828282;
  font-size: pTR(24);
  h2 {
    display: inline-block;
    width: pTR(150);
  }
  p {
    display: inline-block;
  }
}

.quanMoney {
  padding: 0 pTR(15);
  height: pTR(89);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: pTR(30);
  text-align: center;
}

.quandetail {
  padding: 0 pTR(30);
  height: pTR(47);
  text-align: center;
  line-height: pTR(47);
  color: #fff;
  font-size: pTR(30);
  border-radius: pTR(50);
  background: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: pTR(30);
  right: pTR(30);
}


.verificationcode {
  width: pTR(604);
  height: pTR(472);
  background: #fff;
  border-radius: pTR(10);
  padding: pTR(70) pTR(55) 0;
  .input_box {
    padding: pTR(30) 0;
    background: #f4f4f4;
  }
  input {
    width: 100%;
    height: pTR(55);
    line-height: pTR(55);
    background: #f4f4f4;
    font-size: pTR(36);
    color: #666666;
    text-align: center;
  }
  p {
    font-size: pTR(30);
    color: #999;
    text-align: center;
    padding: pTR(55) 0 pTR(60);
  }
  .sureBtn {
    width: 100%;
    height: pTR(80);
    line-height: pTR(80);
    text-align: center;
    color: #fff;
    font-size: pTR(36);
    background: #f66051;
    border-radius: pTR(15);
  }
  .closeSure {
    width: pTR(54);
    height: pTR(54);
    background: url(../../assets/czlImg/maclose.png) 0 0 no-repeat;
    background-size: 100%;
    margin: pTR(150) auto 0;
    ;
  }
}

.popmask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
