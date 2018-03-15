<template>
  <div class="quanlist">
    <div class="inputBar">
      <input placeholder="请输入12位短信券码进行兑换" v-model="duihuanma" maxlength="16" @focus="focusBox" @blur="blurBox">
      <div class="duihuan" @click="duihuanBtn"></div>
    </div>
    <ul class="bottom">
      <li class="all">
        <div class="quanitem" v-for="item in allVouchers">
          <div class="item1" @click="detailBtn(item)">
            <!-- 已经使用 -->
            <div v-show="item.flagStatus==2" class="state4"></div>
            <!-- 已经过期 -->
            <div v-show="item.flagStatus==3" class="state1"></div>
            <div class="logobox">
              <img class="logo" :src="imageServerUrl + item.merchantLogo">
            </div>
            <div class="mainBox">
              <h2>{{item.merchantName}}</h2>
              <p>{{item.resourceName}}</p>
            </div>
          </div>
          <div class="item2">
            <p>有效期：{{item.startDate}}至{{item.endDate}}</p>
          </div>
        </div>
      </li>
      <li class="null" v-show="nullBox">
        <div class="nullImg"></div>
        <p class="nulltext">{{messag}}</p>
      </li>
    </ul>
    <div class="popbox" v-show="successBox">
      <div class="zhucesuccess">
        <div class="rightlogo"></div>
        <div class="successtext">兑券成功！</div>
        <p class="quanName">{{quanName}}</p>
        <p class="tips">已经放入奖券包</p>
        <div class="quanbtn" @click="quanbtnbox">查看奖券包></div>
      </div>
    </div>
    <div class="popbox" v-show="wrongbox">
      <div class="wrongbox">
        <div class="wrongtips">{{messbox}}</div>
        <div class="konwBtn" @click="konwBtnbox">我知道了</div>
      </div>
    </div>
    <div class="showNum" v-show="showNum">
      <p>{{duihuanma1}}</p>
    </div>
  </div>
</template>
<script>
import * as config from '@/lib/config'
import {
  formatDate,
  userData,
  EnumConfigType,
  ShareInfo,
  getJsSign,
  wxconfig,
  checkNumber,
  removeAllSpace,
} from '@/lib/tools';


export default {
  data() {
    return {
      userName: '',
      userPic: '',
      allVouchers: [],
      refundTicket: [],
      num1: true,
      num2: false,
      startDate: '',
      endDate: '',
      totalNum: 0,
      imageServerUrl: config.imageServerUrl,
      nullBox: false,
      messag: '',
      Resure: false,
      dataTime: false,
      errorMessage: '',
      tips: false,
      cardOrderId: '',
      nullBox: false,
      duihuanma: '',
      successBox: false,
      wrongbox: false,
      onoff: true,
      messbox: '',
      quanName: '',
      showNum:false,
    }
  },
  computed: {
    duihuanma1: function() {
      var aaa = this.duihuanma.replace(/ /g, "");
      var bbb = "";
      var times = 0;
      var matches = Math.floor(aaa.length / 3);
      while (times < matches) {
        var subStr = aaa.substring(times * 3, (times + 1) * 3);
        bbb += subStr + " ";
        times++;
      }
      var left = aaa.length % 3;
      if (left > 0) {
        var leftStr = aaa.substring(aaa.length - left, aaa.length);
        bbb += leftStr;
      }
      return bbb;
    }
  },
  created() {
    document.title = "我的奖品";
    //拒绝分享
    getJsSign(function(sign) {
      wxconfig(sign);
    })
    wx.ready(function() {
      wx.hideAllNonBaseMenuItem();
    });

    var self = this;
    //获取奖券接口/prize_log/getLogList
    $.ajax({
      url: config.locationUrl + "/prize_log/getLogList",
      dataType: "jsonp",
      data: {
        openid: userData.openid,
      },
      success: function(data) {
        // console.log(data);
        if (data.ret === "0") {
          console.log(data.list.length);
          if (data.list.length !== 0) {
            console.log(123123123);
            data.list.forEach(function(obj, index) {
              data.list[index].startDate = self.formatDate(obj.startDate, 'yyyy-MM-dd');
              data.list[index].endDate = self.formatDate(obj.endDate, 'yyyy-MM-dd');
            })
            console.log(data);
            self.allVouchers = data.list;
          } else {
            console.log(456456456);
            self.nullBox = true;
            self.messag = '你还没有领取任何奖品';
          }

        } else {
          //处理接口调用失败
          self.error('getLogList');
        }
      },
      error(res) {
        self.error('getLogList');
      }
    });

  },

  methods: {
    error(msg) {
      console.log('msg:', 'fail');
    },

    //点击券,跳转详细信息

    detailBtn(item) {

      // console.log(item,item.flagStatus, item.sid)
      this.$router.push({
        name: 'Prizeoffset',
        params: {
          sid: item.sid,
          orderStatus: item.flagStatus
        }
      })
    },

    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    },
    duihuanBtn() {
      var _this = this;
      if (_this.onoff) {
        _this.onff = false;
        setTimeout(() => {
          _this.onff = true;
        }, 2000)
        var textdanmu=removeAllSpace(_this.duihuanma)
        if (textdanmu.length == 12 && checkNumber(textdanmu)) {
            console.log(12312312231321,removeAllSpace(textdanmu).length);
          $.ajax({
            url: config.locationUrl + "/smsCard/checkResourceNo",
            dataType: "jsonp",
            data: {
              resourceNo: textdanmu
            },
            success: function(data) {
              if (data.ret === "0") {
                $.ajax({
                  url: config.locationUrl + "/smsCard/useResourceNo",
                  dataType: "jsonp",
                  data: {
                    openid: userData.openid,
                    resourceNo: textdanmu,
                    // callback:'456'
                  },
                  success: function(data) {
                    if (data.ret === "0") {
                      _this.quanName = data.data.resourceName;
                      _this.successBox = true;
                    }
                  }
                });
              }
              if (data.ret === "1") {
                _this.wrongbox = true;
                _this.messbox = '无效的短信券码'
              }
              if (data.ret === "2") {
                _this.wrongbox = true;
                _this.messbox = '短信券码已使用'
              }
            }
          });
        } else {
          _this.wrongbox = true;
          _this.messbox = '请输入正确的短信券码。'
        }
      }
    },
    konwBtnbox() {
      this.wrongbox = false;
    },
    quanbtnbox() {
      var self = this;
      self.successBox = false;
      //获取奖券接口/prize_log/getLogList
      $.ajax({
        url: config.locationUrl + "/prize_log/getLogList",
        dataType: "jsonp",
        data: {
          openid: userData.openid,
        },
        success: function(data) {
          // console.log(data);
          if (data.ret === "0") {
            if (data.list.length !== 0) {
              console.log(123123123);
              data.list.forEach(function(obj, index) {
                data.list[index].startDate = self.formatDate(obj.startDate, 'yyyy-MM-dd');
                data.list[index].endDate = self.formatDate(obj.endDate, 'yyyy-MM-dd');
              })
              console.log(data);
              self.allVouchers = data.list;
              self.nullBox = false;
            } else {
              console.log(456456456);
              self.nullBox = true;
              self.messag = '你还没有领取任何奖品';
            }

          } else {
            //处理接口调用失败
            self.error('getLogList');
          }
        },
        error(res) {
          self.error('getLogList');
        }
      });

    },
    focusBox(){
      this.showNum=true;
      this.duihuanma=this.duihuanma.replace(/[^\d]/g,'')
    },
    blurBox(){
      this.showNum=false;
    }
  }
}

</script>
<style lang="scss" scoped>
@import '../../assets/scss/_mixins.scss';
.quanlist {
  width: 100%;
  min-height: 100%;
  background: #f2f2f2;
  .top {
    width: 100%;
    background: #fff;
    height: pTR(250);
    display: flex;
    flex-direction: column;

    .nameBox {
      box-flex: 1;
      flex: 1;
      padding: pTR(30);
      display: flex;
      align-items: center;
      border-bottom: #eeeeee solid 1px;
      .pic {
        width: pTR(122);
        height: pTR(122);
        border-radius: 50%;
        background: #fff;
      }
      .detail {
        box-flex: 1;
        padding-left: pTR(30);
        .name {
          color: #333333;
          font-size: pTR(36);
          padding-bottom: pTR(25);
        }
        .num {
          color: #999999;
          font-size: pTR(30);
        }
      }
    }
    .chooseItem {
      height: pTR(80);
      padding: 0 pTR(30);
      display: flex;
      justify-content: space-around;
      .item {
        width: pTR(150);
        height: 100%;
        font-size: pTR(30);
        color: #666;
        line-height: pTR(80);
        text-align: center;
      }
      .on {
        color: #f52b3a;
        position: relative;
      }
      .on:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: pTR(3);
        background: #f52b3a;
      }
    }
  }
  .bottom {
    padding: pTR(30) pTR(30);
    .quanitem {
      width: 100%;
      height: pTR(272);
      background: url(../../assets/czlImg/verLine.png) 0 0 no-repeat;
      background-size: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: pTR(25);
      .item1 {
        width: 100%;
        height: pTR(175);
        display: flex;
        align-items: center;
        position: relative;
        .logobox {
          width: pTR(166);
          display: flex;
          align-items: center;
          justify-content: center;
          .logo {
            width: pTR(102);
            height: pTR(102);
            border-radius: 50%;
            background: #f3f3f3;
          }
        }
        .mainBox {
          max-width: pTR(500);
          z-index: 99;
          h2 {
            font-size: pTR(26);
            color: #999999;
            margin-bottom: pTR(20);
            padding-top: pTR(5);
            word-break: break-all;
            overflow: hidden;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          p {
            max-width: pTR(360);
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: pTR(36);
            color: #333333;
            padding: pTR(15) 0;
            position: relative;
          }
        }
        .state1 {
          position: absolute;
          width: pTR(118);
          height: pTR(118);
          background: url(../../assets/czlImg/expired.png) 0 0 no-repeat;
          background-size: 100%;
          right: pTR(25);
          top: pTR(10);
          z-index: 0;
        }
        .state2 {
          position: absolute;
          width: pTR(118);
          height: pTR(118);
          background: url(../../assets/czlImg/refund.png) 0 0 no-repeat;
          background-size: 100%;
          right: pTR(25);
          top: pTR(10);
          z-index: 0;
        }
        .state3 {
          position: absolute;
          width: pTR(118);
          height: pTR(118);
          background: url(../../assets/czlImg/refunded.png) 0 0 no-repeat;
          background-size: 100%;
          right: pTR(25);
          top: pTR(10);
          z-index: 0;
        }
        .state4 {
          position: absolute;
          width: pTR(118);
          height: pTR(118);
          background: url(../../assets/czlImg/used.png) 0 0 no-repeat;
          background-size: 100%;
          right: pTR(25);
          top: pTR(10);
          z-index: 0;
        }
      }
      .item2 {
        box-flex: 1;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: pTR(15);
        p {
          padding: 0 pTR(40);
          color: #999999;
          font-size: pTR(24);
          text-align: right;

          i {
            vertical-align: middle;
            margin-left: pTR(10);
            display: inline-block;
            width: pTR(10);
            height: pTR(18);
            background: url(../../assets/czlImg/arrowright.png) 0 0 no-repeat;
            background-size: 100%;
          }
          span {
            display: inline-block;
            vertical-align: middle;
            color: #eb2440;
            font-size: pTR(26);
          }
        }
      }
    }
    .nullImg {
      width: pTR(198);
      height: pTR(129);
      background: url(../../assets/czlImg/icon1.png) 0 0 no-repeat;
      background-size: 100%;
      margin: pTR(170) auto pTR(77);
      display: block;
    }
    .nulltext {
      color: #999;
      font-size: pTR(36);
      text-align: center;
    }
  }
}

.inputBar {
  padding: 0 pTR(30);
  height: pTR(132);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  input {
    width: 100%;
    height: pTR(85);
    background: #eaeaea;
    font-size: pTR(26);
    color: #afafaf;
    padding: 0 pTR(50);
  }
  .duihuan {
    position: absolute;
    right: pTR(35);
    top: 50%;
    margin-top: pTR(-40);
    width: pTR(160);
    height: pTR(78);
    background: url(../../assets/czlImg/duihuan.png) 0 0 no-repeat;
    background-size: 100%;
  }
}

.popbox {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
  .zhucesuccess {
    text-align: center;
    width: pTR(575);
    height: pTR(639);
    background: #fff;
    border-radius: pTR(10);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .rightlogo {
      display: block;
      margin: pTR(80) auto pTR(20);
      width: pTR(105);
      height: pTR(105);
      background: url(../../assets/czlImg/right1.png) 0 0 no-repeat;
      background-size: 100%;
    }
    .successtext {
      color: #f63e45;
      font-size: pTR(32);
      padding-top: pTR(5);
    }
    .quanName {
      padding: pTR(60) pTR(30) pTR(60);
      color: #373737;
      font-size: pTR(42);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .tips {
      padding: pTR(5) 0 pTR(20);
      color: #969696;
      font-size: pTR(24);
    }
    .quanbtn {
      width: pTR(400);
      height: pTR(80);
      background: #f63e45;
      border-radius: pTR(10);
      text-align: center;
      line-height: pTR(80);
      color: #fff;
      font-size: pTR(30);
      margin: pTR(50) auto 0;
    }
  }
  .wrongbox {
    text-align: center;
    width: pTR(574);
    height: pTR(302);
    background: #fff;
    border-radius: pTR(10);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .wrongtips {
      font-size: pTR(34);
      color: #3e3e3e;
      padding: pTR(100) 0 pTR(50);
    }
    .konwBtn {
      width: pTR(400);
      height: pTR(80);
      background: #f63e45;
      border-radius: pTR(10);
      text-align: center;
      line-height: pTR(80);
      color: #fff;
      font-size: pTR(30);
      margin: 0 auto;
    }
  }
}

.showNum {
  position: fixed;
  top: pTR(130);
  left: 0;
  width: 100%;
  height: pTR(150);
  font-size: pTR(50);
  color: #000;
  z-index:9999;
  overflow:hidden;
  p {
    height: pTR(150);
    line-height: pTR(150);

    background: rgba(230,253,183,0.8);
    margin: 0 pTR(30);
    border-radius:pTR(20);
    padding:0 pTR(30);
  }
}

</style>
