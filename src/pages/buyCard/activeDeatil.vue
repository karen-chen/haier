<template>
  <div class="activedetail">
    <div class="scrollBox">
      <div class="detailtitel"><span class="returnBtn" @click="retrunBack"> </span>活动详情介绍</div>
      <div class="zanshiBox">
        <div class="ruleBox">
          <div class="quanline"></div>
          <h2>{{title}}</h2>
          <ul>
            <li>
              <h3>活动时间：</h3>
              <p> {{activityTime}}</p>
              <i class="icon1"></i>
            </li>
            <li>
              <h3>活动地点：</h3>
              <p>{{activityAddress}}</p>
              <i class="icon2"></i>
            </li>
            <li>
              <div class="navigationBtn"></div>
            </li>
          </ul>
          <div class="description">
            <h3>活动规则</h3>
            <strong v-html="actDesc"></strong>
            <i class="icon3"></i>
          </div>
        </div>
        <div class="footerbox">本活动最终解释权归海尔所有</div>
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
      actDesc: '',
      activityAddress: '',
      activityTime: '',
      title: ''
    }
  },


  created() {
    //判断活动是否有效
    var self = this;
    console.log(3333);
    $.ajax({
      url: config.locationUrl + "/activity/checkActivityIng",
      dataType: "jsonp",
      data: {
        actSid: userData.actSid,
      },
      success: function(data) {
        if (data.ret === "0") {
          //获取页面配置信息
          console.log(11111, data);
          self.title = data.obj.actName;
          self.getBaseConfig();

        } else {
          //处理接口调用失败
          self.endMess = true;
        }
      },
      error(res) {
        self.error('checkActivityIng');
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

    error(msg) {
      console.log('msg:', 'fail');
    },

    retrunBack() {
      this.$router.go(-1);
    }
  }


}

</script>
<style lang="scss" scoped>
@import '../../assets/scss/_mixins.scss';
.activedetail {
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
  .zanshiBox {
    width: 100%;
    height: auto;
    background: url(../../assets/czlImg/activeDetail.jpg)0 0 no-repeat;
    background-size: 100%;
    position: relative;
    padding-top: pTR(40);
    .ruleBox {
      width: pTR(700);
      min-height: pTR(1000);
      background: #fffdf9 url(../../assets/czlImg/activecenter.png)0 0 no-repeat;
      background-size: 100%;
      margin: 0 auto;
      .quanline {
        wideth: 100%;
        height: pTR(78);
        background: #fffdf9 url(../../assets/czlImg/quanline.png) 0 center no-repeat;
        background-size: 100% pTR(15);
      }
      h2 {
        padding-top: pTR(15);
        text-align: center;
        font-size: pTR(40);
      }
      ul {
        padding: pTR(70) pTR(35) 0 pTR(35);
        border-bottom: dotted #efefef pTR(3);
        li {
          padding-bottom: pTR(40);
          position: relative;
          h3 {
            font-size: pTR(34);
            color: #333;
            padding-bottom: pTR(20);
            padding-left: pTR(50);
          }
          p {
            padding: pTR(10) 0 0 pTR(50);
            color: #7c7c7c;
            font-size: pTR(28);
            line-height: pTR(50);
          }
          em {
            padding: pTR(10) 0 pTR(50);
            color: #7c7c7c;
            font-size: pTR(28);
            line-height: pTR(50);
            display: block;
          }
          .icon1 {
            position: absolute;
            left: 0;
            top: pTR(-5);
            width: pTR(37);
            height: pTR(37);
            background: url(../../assets/czlImg/activeTime.png)0 0 no-repeat;
            background-size: 100%;
          }
          .icon2 {
            position: absolute;
            left: 0;
            top: pTR(-5);
            width: pTR(33);
            height: pTR(41);
            background: url(../../assets/czlImg/activeAdd.png)0 0 no-repeat;
            background-size: 100%;
          }
          .icon3 {
            position: absolute;
            left: 0;
            top: pTR(-5);
            width: pTR(35);
            height: pTR(29);
            background: url(../../assets/czlImg/activeBook.png)0 0 no-repeat;
            background-size: 100%;
          }
          .navigationBtn {
            width: pTR(550);
            height: pTR(88);
            background: url(../../assets/czlImg/navigationBtn.png)0 0 no-repeat;
            background-size: 100%;
          }
        }
      }
    }
    .footerbox{
      height:pTR(120);
      line-height:pTR(120);
      text-align:center;
      color:#9d9d9d;
    }
  }

  .description {
    padding:0 pTR(50) pTR(50);
    color:#838383;
    line-height:pTR(35);
    h3{
      width:100%;
      height:pTR(135);
      text-align:center;
      line-height:pTR(135);
      font-size:pTR(36);
      color:#7f7f7f;
      position:relative;
    }

    h3:before{
      position:absolute;
      content:'';
      width:pTR(39);
      height:pTR(16);
      background: url(../../assets/czlImg/titleicon2.png) 0 0 no-repeat;
      -webkit-background-size:100%;
      left:pTR(150);
      top:50%;
      transform:translateY(-50%);
    }
    h3:after{
      position:absolute;
      content:'';
      width:pTR(39);
      height:pTR(16);
      background: url(../../assets/czlImg/titleicon1.png) 0 0 no-repeat;
      -webkit-background-size:100%;
      right:pTR(150);
      top:50%;
      transform:translateY(-50%);
    }
    strong {
      padding-top: pTR(10);
      color: #838383;
      font-size: pTR(28);
      line-height: pTR(30);
      word-break: break-all;
      line-height:pTR(50);
    }
  }
}

</style>
