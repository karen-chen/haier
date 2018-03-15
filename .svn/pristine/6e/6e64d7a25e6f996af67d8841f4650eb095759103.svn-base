<template>
  <div class="complete">
    <div class="scoringBox">
      <div class="pfTxt">评分</div>
      <ul class="startlist">
        <li v-for="item in lists" :class="[ item<i? 'on' : '']">{{item}}</li>
      </ul>
      <div class="bottom">
        您已完成对本次服务的评价，感谢您 的帮助与支持
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
  wxconfig
} from '@/lib/tools';


export default {
  data() {
    return {
      lists: [1, 2, 3, 4, 5],
      i: 0,
      beizhu: true,
      textarea: '',
    }
  },
  created() {
    //拒绝分享
    document.title = "我的评论";
    this.i = localStorage.getItem('star');
    getJsSign(function(sign) {
      wxconfig(sign);
    })
    wx.ready(function() {
      wx.hideAllNonBaseMenuItem();
    });
  },
  methods: {

  }
}

</script>
<style lang="scss" scoped>
@import '../../assets/scss/_mixins.scss';
html {
  background: #f9f9f9;
}

.complete {
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
      top:pTR(-50);
      left:pTR(30);
    }
    .bottom:after {
      content: '';
      position: absolute;
      width: pTR(34);
      height: pTR(28);
      background: url(../../assets/czlImg/colon2.png) 0 0 no-repeat;
      background-size: 100%;
      right:pTR(30);
      bottom:pTR(-30);
    }
  }
}

</style>
