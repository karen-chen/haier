<template>
  <div class="consultdetail">
    <div class="scrollBox">
      <div class="detailtitel"><span class="returnBtn" @click="retrunBack"> </span>适用门店</div>
      <div class="consultBox">
        <div class="shownum">仅显示离你最近的30家适用店。</div>
        <ul class="shoplist">
          <li>
            <div class="left">
              <h3>壹生鲜金欧路店<i>500m</i></h3>
              <p>成都市清羊金欧路79号1层</p>
            </div>
            <div class="right"></div>
          </li>
          <li>
            <div class="left">
              <h3>壹生鲜金欧路店<i>500m</i></h3>
              <p>成都市清羊金欧路79号1层</p>
            </div>
            <div class="right"></div>
          </li>
        </ul>
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
      background: url(../../assets/czlImg/newArrow.png) pTR(40) center no-repeat;
      -webkit-background-size: pTR(20) pTR(35);
      background-size: pTR(20) pTR(35);
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .consultBox {
    .shownum {
      width: 100%;
      height: pTR(65);
      line-height: pTR(65);
      padding: 0 pTR(40);
      color: #a1a1a1;
      font-size: pTR(24);
    }
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
      width: pTR(594);
      height: pTR(155);
      background: url(../../assets/czlImg/phoneBtn.png)0 0 no-repeat;
      background-size: 100%;
      position: relative;
      margin: 0 auto;
    }
    .tips {
      padding: pTR(50) 0;
      text-align: center;
      color: #8b8b8b;
      font-size: pTR(26);
    }
    .mabox {
      width: pTR(435);
      height: pTR(435);
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.shoplist {
  background: #fff;
  li {
    padding: pTR(40) 0 pTR(40) pTR(30);
    display: flex;
    align-items: center;
    position: relative;
    border-bottom:pTR(2) solid #f2f2f2;
    .left {
      flex: 1;
      position: relative;
      overflow:hidden;
      h3 {
        color: #525252;
        font-size: pTR(34);
        height: pTR(40);
        line-height: pTR(40);
        position: relative;
        padding: 0 pTR(150) 0 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: pTR(650);
        i {
          position: absolute;
          right: pTR(40);
        }
      }
      p {
        color: #b6b6b6;
        padding: pTR(20) pTR(150) pTR(5) 0;
        word-break:break-all;
        text-align:justify;
      }
    }
    .left:after {
      position: absolute;
      content: '';
      right: 0;
      height: pTR(40);
      background: #dfdfdf;
      width: pTR(4);
      top: 50%;
      transform: translateY(-50%);
    }
    .right {
      width: pTR(100);
      height: pTR(80);
      background: url(../../assets/czlImg/addicon.png) pTR(40) center no-repeat;
      background-size: pTR(24) pTR(31);
    }
  }
}

</style>
