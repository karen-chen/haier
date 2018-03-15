<template>
  <div class="content">
    <div class="main">
      <img class="personPic" :src="imageServerUrl + picUrl">
      <p class="logo">{{title}}</p>
      <h2 class="title">{{buyBtn}}</h2>
      <div class="tips">
        <h2>有效日期:</h2>
        <p>{{startDate}} 至 {{endDate}}</p>
      </div>
      <div :class="[ allow ? '' : 'nouse','buyBtn']" @click="userNow">
        {{masseg}}
      </div>
      <span class="lineonff"></span>
      <div class="suitBox"><i></i>适用门店</div>
      <a class="logoPic" :href="linkUrl ? linkUrl:'javascript:void(0)'"><img :src="icon ? icon:'static/share/activePic.png'"></a>
      <div class="tips1" @click="instrucShow">
        <h2>使用说明</h2>
        <div class="instrucBox" v-html="description"></div>
      </div>
    </div>
    <!-- 提示弹框 -->
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
      cardOrderId: '',
      imageServerUrl: config.imageServerUrl,
      erweima: config.cdnUrl,
      picUrl: '',
      logo: '',
      title: '',
      buyBtn: '',
      startDate: '',
      endDate: '',
      description: '',
      masseg: '',
      ma: false,
      link: '',
      allow: false,
      orderStatus: 0,
      localStorageList: {},
      tips: false,
      instructions: false,
      icon: '',
      linkUrl: ''
    }
  },

  created() {
    document.title = "卡劵详情";
    //拒绝分享
    getJsSign(function(sign) {
      wxconfig(sign);
    })
    wx.ready(function() {
      wx.hideAllNonBaseMenuItem();
    });

    var self = this;
    //接口传参的数据需要存储在本地缓存
    // console.log(this.$route.params.sid)
    if (this.$route.params.sid) {
      this.localStorageList.userLogId = this.$route.params.sid;
      this.localStorageList.orderStatus = this.$route.params.orderStatus;
      localStorage.setItem('userLog', JSON.stringify(this.localStorageList))
    }
    this.localStorageList = JSON.parse(localStorage.getItem('userLog'));
    console.log(this.localStorageList)

    this.cardOrderId = this.localStorageList.userLogId;
    // this.orderStatus = this.localStorageList.orderStatus;
    console.log(this.cardOrderId, this.orderStatus);
    this.getLogDetail();
  },

  methods: {
    error(msg) {
      console.log('msg:', 'fail');
    },
    userNow() {
      var self = this;
      if (this.orderStatus == 1) {
        this.getLogDetail(function() {
          self.$router.push({
            name: 'Prizema'
          })
        })

      }

    },

    getLogDetail(cb) {
      var self = this;
      $.ajax({
        url: config.locationUrl + "/prize_log/getLogDetail",
        dataType: "jsonp",
        data: {
          openid: userData.openid,
          userLogId: this.cardOrderId
        },
        success: function(data) {

          if (data.ret === "0") {
            self.picUrl = data.data.merchantLogo;
            self.title = data.data.merchantName;
            self.buyBtn = data.card.resourceName;
            self.startDate = data.card.configBean.startDate.value.slice(0, 11);
            self.endDate = data.card.configBean.endDate.value.slice(0, 11);
            self.description = "<p style='padding-bottom:0.1rem;line-height:1.5;word-break:break-all'>" + data.card.configBean.description.value.replace(/\n/g, "</p><p>") + "</p>";
            self.orderStatus = data.data.flagStatus;
            if (data.card.configBean.linkUrl) {
              self.linkUrl = data.card.configBean.linkUrl.value
            }
            if (data.card.configBean.icon) {
              self.icon = self.imageServerUrl + data.card.configBean.icon.value
            }
            console.log(data);
            // console.log(data.data.flagStatus);
            // self.masseg = "立即使用";
            if (self.orderStatus == 1) {
              self.allow = true;
              self.masseg = "立即使用";
            }
            if (self.orderStatus == 2) {
              self.allow = false;
              self.masseg = "已使用";
              cb && self.tipsShow('已使用');
            }
            if (self.orderStatus == 3) {
              self.allow = false;
              self.masseg = "已过期";
              cb && self.tipsShow('已过期');
            }
            if (self.orderStatus == 4) {
              self.allow = false;
              self.masseg = "未到使用时间";
              cb && self.tipsShow('未到使用时间');
            }
            self.link = self.erweima + '/index.html?&userId=' + userData.openid + "&userLogId=" + self.cardOrderId + '#/prizeCode';
            console.log(self.link);
            cb && cb();
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

    //弹框定时显示
    tipsShow(meg) {
      var self = this;
      this.tips = true;
      this.masseg = meg;
      setTimeout(() => {
        self.tips = false;
      }, 2000);
    },
    instrucShow() {
      this.instructions = true;
    },
    instrucClose() {
      this.instructions = false;
    }



  }
}

</script>
<style lang="scss" scoped>
@import '../../assets/scss/_mixins.scss';
.content {
  width: 100%;
  min-height: 100%;
  padding: pTR(100) pTR(20) pTR(40);
  background: #f52b3a;
  background-size: 100%;
  .main {
    position: relative;
    padding: pTR(66) 0 0;
    width: pTR(691);
    background: #fff url(../../assets/czlImg/detailBg.png) 0 0 no-repeat;
    background-size: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    border-radius: pTR(10);
    margin: 0 auto;
    .personPic {
      position: absolute;
      width: pTR(100);
      height: pTR(100);
      display: block;
      left: 50%;
      transform: translateX(-50%);
      top: pTR(-50);
      border-radius: 50%;
    }
    .logo {
      font-size: pTR(26);
      color: #999;
      padding: pTR(5) pTR(30);
    }
    .title {
      padding: pTR(62) pTR(30) pTR(10);
      font-size: pTR(36);
      color: #333;
    }
    .buyBtn {
      width: pTR(320);
      height: pTR(70);
      line-height: pTR(70);
      background: #f66051;
      color: #fff;
      font-size: pTR(30);
      border-radius: pTR(5);
      margin: pTR(20) auto 0;
    }
    .nouse {
      background: #929292;
    }
    .logoPic {
      width: 100%;
      height: pTR(235);
      margin: pTR(30) 0;
      padding: 0 pTR(30);
      img {
        width: 100%;
        height: 100%;
      }
    }

    .tips {
      display: flex;
      height: pTR(80);
      align-items: center;
      padding: 0 pTR(30);
      justify-content: center;
      h2 {
        font-size: pTR(26);
        color: #666666;
      }
      p {
        color: #666666;
        font-size: pTR(26);
        word-break: break-all;
        text-align: left;
      }
      div {
        padding-top: pTR(10);
        color: #666666;
        font-size: pTR(28);
        line-height: pTR(30);
        word-break: break-all;
      }
    }
    .tips1 {
      height: auto;
      text-align: center;
      padding:0 pTR(30) pTR(45);
      .instrucBox {
        color: #7c7c7c;
        font-size: pTR(26);
        line-height: pTR(50);
        text-align: justify;
      }
      h2 {
        font-size: pTR(32);
        color: #333;
        padding-bottom: pTR(30);
      }
      p {}
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
  .ma {
    width: pTR(560);
    height: pTR(565);
    position: absolute;
    background: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: pTR(10);
    padding: 0 pTR(22);
    .maimg {
      width: 178px;
      height: 178px;
      display: block;
      margin: pTR(60) auto 0;
      canvas {
        width: 100%;
        height: 100%;
      }
    }
    .matext {
      font-size: pTR(32);
      color: #333;
      text-align: center;
      padding-top: pTR(20);
      line-height: pTR(50);
    }
    .mabtn {
      position: absolute;
      width: pTR(54);
      height: pTR(54);
      background: url(../../assets/czlImg/maclose.png) center center no-repeat;
      background-size: 100%;
      left: 50%;
      bottom: pTR(-80);
      transform: translateX(-50%);
    }
  }
  .instructions {
    width: pTR(532);
    position: absolute;
    background: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: pTR(10);
    padding: pTR(160) pTR(40) pTR(55);
    .instrucPic {
      position: absolute;
      width: pTR(238);
      height: pTR(247);
      background: url(../../assets/czlImg/instructions.png) center center no-repeat;
      background-size: 100%;
      top: pTR(-115);
      left: 50%;
      transform: translateX(-50%);
    }
    .instrucTitle {
      text-align: center;
      color: #333333;
      font-size: pTR(36);
      font-weight: bold;
      padding-bottom: pTR(50);
    }

    .instrucBtn {
      width: pTR(278);
      height: pTR(78);
      background: #f41f37;
      color: #fff;
      font-size: pTR(36);
      text-align: center;
      line-height: pTR(78);
      border-radius: pTR(10);
      margin: pTR(55) auto 0;
    }
  }
}

.masuccess {
  position: fixed;
  width: pTR(350);
  height: pTR(80);
  background: rgba(0, 0, 0, 0.8);
  left: 50%;
  top: 30%;
  transform: translateX(-50%);
  font-size: pTR(30);
  text-align: center;
  line-height: pTR(80);
  color: #fff;
}

.popBox1 {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: #fff;
}

.nofang {
  font-size: pTR(35);
  text-align: center;
  padding-top: pTR(100);
  color: #999;
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

</style>
