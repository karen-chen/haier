<template>
  <div class="consultdetail">
    <div class="scrollBox">
      <div class="detailtitel"><span class="returnBtn" @click="retrunBack"> </span>活动咨询</div>
      <div class="consultBox">
        <img src="../../assets/czlImg/haierlogo1.png" class="personImg">
        <p class="personname">销售员 {{saleName}}</p>
        <p class="personnum">工号 {{jobNumber}}</p>
        <a class="tellPhone" :href="salePhone"></a>
        <p class="tips">长按二维码添加销售员微信咨询</p>
        <div class="mabox">
          <img :src="consultImg">
        </div>
      </div>
    </div>
  </div>
</template>
<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script>
import * as config from '@/lib/config'
import {
  userData,
  EnumConfigType,
  ShareInfo,
  getJsSign,
  wxconfig,
  wxShare,
  wxHideMenu
} from '@/lib/tools';


export default {
  data() {
    return {
      saleName: '',
      jobNumber: '',
      salePhone: '',
      consultImg:''
    }
  },


  created() {
    //判断活动是否有效
    var _this = this;
    console.log(3333);
    document.title = '活动咨询';
    $.ajax({
      url: config.locationUrl + "/sys/getBaseConfigByType",
      dataType: "jsonp",
      data: {
        actSid: userData.actSid,
        configType: EnumConfigType.RECOGNIZE
      },
      success: function(data) {
        if (data.ret === "0") {
          //获取页面配置信息
          _this.saleName=data.saleName;
          _this.jobNumber=data.jobNumber;
          _this.salePhone="tel:"+data.salePhone;
          _this.consultImg = config.imageServerUrl + data.consultImg;
        }
      },
      error(res) {
        _this.error('checkActivityIng');
      }
    });

  },
  computed: {

  },
  mouted() {},
  methods: {
    getBaseConfig() {
      var self = this;
      $.ajax({
        url: config.locationUrl + "/sys/getBaseConfigByType",
        dataType: "jsonp",
        data: {
          actSid: userData.actSid,
          configType: EnumConfigType.RECOGNIZE
        },
        success: function(data) {
          // console.log(11111, data);
          if (data.ret === "0") {

            self.activityAddress = data.activityAddress;

            self.activityTime = data.activityTime;
            if (data.actDesc) {
              self.actDesc = "<strong>" + data.actDesc.replace(/\n/g, "</strong><strong>") + "</strong>";
            }

          }
        },
        error(res) {
          self.error('getBaseConfigByType');
        }
      });
    },

    retrunBack() {
      this.$router.go(-1);
    }
  }


}

</script>
<style lang="scss" scoped>
@import '../../assets/scss/_mixins.scss';
.consultdetail {
  width: 100%;
  height: 100%;
  background: #efefef;
  z-index: 99;
  position: fixed;
  left: 0;
  top: 0;
  overflow: auto;
  .scrollBox {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
  .detailtitel {
    background: #fff;
    width: 100%;
    height: pTR(90);
    line-height: pTR(90);
    font-size: pTR(36);
    font-weight: bold;
    color: #333333;
    text-align: center;
    position: relative;
    .returnBtn {
      z-index: 99;
      width: pTR(150);
      height: 100%;
      background: url(../../assets/czlImg/newArrow.png) pTR(20) center no-repeat;
      -webkit-background-size: pTR(20) pTR(35);
      background-size: pTR(20) pTR(35);
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .consultBox {
    width: 100%;
    height: auto;
    background: url(../../assets/czlImg/consultBg.jpg)0 0 no-repeat;
    background-size: 100%;
    position: relative;
    padding-top: pTR(50);
    .personImg {
      width: pTR(136);
      height: pTR(136);
      border-radius: 50%;
      margin: 0 auto;
    }
    .personname {
      font-size: pTR(32);
      text-align: center;
      color: #a07a34;
      padding: pTR(25) 0 pTR(10);
    }
    .personnum {
      font-size: pTR(32);
      text-align: center;
      color: #a07a34;
      padding: pTR(25) 0 pTR(20);
    }
    .tellPhone {
      display: block;
      width: pTR(594);
      height: pTR(155);
      background: url(../../assets/czlImg/phoneBtn.png)0 0 no-repeat;
      background-size: 100%;
      position: relative;
      margin: 0 auto;
    }
    .tips{
      padding:pTR(50) 0;
      text-align:center;
      color:#8b8b8b;
      font-size:pTR(26);
    }
    .mabox{
      width:pTR(435);
      height:pTR(435);
      margin:0 auto;
      img{
        width:100%;
        height:100%;
      }
    }
  }
}

</style>
