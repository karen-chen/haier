<template>
  <div class="useBox">
    <div class="maBox">
      <img class="maPic" :src="imageServerUrl + picUrl"></img>
      <div class="shopName">{{title}}</div>
      <div class="shoptitle">{{quanname}}</div>
      <div class="maimg" id="qrcode"></div>
      <p class="matext">请出示给店员完成核销</p>
    </div>
  </div>
</template>
<script src="//wximg.gtimg.com/shake_tv/include/js/lib/jquery.2.1.1.min.js"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script src="//wximg.gtimg.com/shake_tv/include/js/jsapi.js"></script>
<script>
import * as config from '@/lib/config'
import '@/assets/js/jquery.qrcode.min'
import {
  formatDate,
  userData,
  EnumConfigType,
  ShareInfo,
  getJsSign,
  wxconfig
} from '@/lib/tools';

export default {
  data() {
    return {
      picUrl: '',
      title: '',
      quanname: '',
      imageServerUrl: config.imageServerUrl,
      erweima: config.cdnUrl,
      cardOrderId:''
    }
  },

  created() {
    var self=this;
        this.cardOrderId = localStorage.getItem('cardOrderId');
    this.getMyRecognizeCard(function() {
      $('#qrcode').html("");
      $('#qrcode').qrcode({
        width: 178,
        height: 178,
        text: self.link
      });
    });

  },

  methods: {
    error(msg) {
      console.log('msg:', 'fail');
    },
    getMyRecognizeCard(cb) {
      var self = this;
      $.ajax({
        url: config.locationUrl + "/order/getMyRecognizeCardDetail",
        dataType: "jsonp",
        data: {
          openid: userData.openid,
          cardOrderId: this.cardOrderId
        },
        success: function(data) {
          console.log(data);
          self.picUrl = data.order.logoUrl;
          self.quanname = data.order.title;
          //商户名称
          self.title = data.order.merchantName;
          self.link = self.erweima + '/index.html?&userId=' + userData.openid + "&cardOrderId=" + self.cardOrderId + '#/verificationcode';
          console.log(self.link);
          cb && cb();
          if (data.ret === "-1") {
            self.nofang = true;
            setTimeout(() => {
              self.$router.push({
                name: 'Quanlist'
              })
            }, 2000);
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
  }
}

</script>
<style lang="scss" scoped>
@import '../../assets/scss/_mixins.scss';
.useBox {
  width: 100%;
  height: 100%;
  background: url(../../assets/czlImg/usepage.jpg) 0 0 no-repeat;
  -webkit-background-size: 100%;
  background-size: 100%;
  .maBox {
    width: pTR(652);
    height: pTR(778);
    background: #fff;
    border-radius: pTR(10);
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .maPic {
      width: pTR(120);
      height: pTR(120);
      border-radius: 50%;
      margin: pTR(-60) auto 0;
    }
    .shopName {
      padding: pTR(33) 0 pTR(40);
      color: #999999;
      font-size: pTR(36);
    }
    .shoptitle {
      padding: pTR(5) pTR(60) pTR(55);
      color: #333333;
      font-size: pTR(42);
      display:block;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    .maimg {
      width: 168px;
      height: 168px;
      display: block;
      margin: 0 auto pTR(60);
      canvas {
        width: 100%;
        height: 100%;
      }
    }
    .matext {
      color: #f66051;
      font-size: pTR(36);
    }
  }
}

</style>
