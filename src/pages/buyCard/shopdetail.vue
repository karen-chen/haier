<template>
  <div class="shopdetail">
    <div class="detailtitel"><span class="returnBtn" @click="retrunBack"> </span>商品详情</div>
    <div class="shopBox">
      <!--banner-->
      <div class="left">
        <div class="swiper-container swiper-container1">
          <div class="swiper-wrapper">
            <div class="swiper-slide center-swiper" v-for="item in bannerList"><img :src="imageServerUrlpic+item.imgUrl"></div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <div class="right">
        <div class="title">{{list.item_title}}</div>
        <div class="saleMass" v-show="list.item_field5">{{list.item_field5}}
        </div>
        <div class="discountBox">
          <div class="original">原价：￥<i>{{list.item_field2}}</i></div>
          <div class="discount"><i>￥{{list.item_field3}}</i></div>
        </div>
      </div>
    </div>
    <div class="salelist" v-show="prom_list.length>0">
      <div class="left">促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销：</div>
      <div class="right">
        <div class="list" v-for="item in prom_list"><span>{{item.prom_title}} </span><i>{{item.prom_desc}} </i></div>
      </div>
    </div>
    <div class="salelist">
      <div class="left">商品型号：</div>
      <div class="right">
        <div class="list"><i>{{list.item_code}} </i></div>
      </div>
    </div>
    <div class="detailBox">
      <div class="head"><i></i><span>商品详情</span></div>
      <div class="detailPic"></div>
      <ul class="pic" v-for="item in imgList">
        <li><img :src="item.imgUrl"></li>
      </ul>
    </div>
  </div>
</template>
<script src="//wximg.gtimg.com/shake_tv/include/js/lib/jquery.2.1.1.min.js"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script src="//wximg.gtimg.com/shake_tv/include/js/jsapi.js"></script>
<script>
import * as config from '@/lib/config'
import swiper from 'swiper'
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
      page_item_sid: '',
      imgList: [],
      list: {},
      imageServerUrlpic: config.imageServerUrl,
      prom_list: [],
      bannerList: []
    }
  },

  created() {

    this.page_item_sid = localStorage.getItem('page_item_sid');
    this.get_act_page_item();
  },

  methods: {
    error(msg) {
      console.log('msg:', 'fail');
    },


    //获商品信息
    get_act_page_item() {
      var self = this;
      $.ajax({
        url: config.locationUrl + "/product/get_act_page_item",
        dataType: "jsonp",
        data: {
          page_item_sid: self.page_item_sid

        },
        success: function(data) {
          console.log("33333", data);
          if (data.ret === "0") {
            data.data.imgList = data.data.imgList || [];
            data.data.imgList.forEach(obj => {
              obj.imgUrl = config.imageServerUrl + obj.imgUrl;
            });
            self.list = data.data.item;
            self.imgList = data.data.imgList;
            self.prom_list = data.data.prom_list;
            self.bannerList = data.data.banner_list;
            self.swiper();
            // console.log(data.list);
          } else {
            //处理接口调用失败
            self.error('getBannerList');
          }
        },
        error(res) {
          self.error('getBannerList');
        }
      });
    },
    retrunBack() {
      history.back()
    },
    swiper() {
      var swiper = new Swiper('.swiper-container1', {
        pagination: '.swiper-pagination',
        // autoplay: 5000,
        loop: false,
        autoplayDisableOnInteraction: false,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true //修改swiper的父元素时，自动初始化swiper
      });
    },

  }
}

</script>
<style lang="scss" scoped>
@import '../../assets/scss/swiper.min.css';
@import '../../assets/scss/_mixins.scss';


.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 100%;
  background: #d8d8d8;
  opacity: .2;
}

.swiper-pagination-bullet-active {
  width: 16px;
  opacity: 1;
  background: #e63a3a;
}

.swiper-container {
  width: 100%
}

.swiper-container img {
  width: 100%;
  height: 100%;
}

.shopdetail {
  position:fixed;
  left:0;
  top:0;
  z-index:99;
  width: 100%;
  height: 100%;
  overflow:scroll;
  background: #efefef;
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
    border-bottom: pTR(2) solid #efefef;
    .returnBtn {
      z-index: 9;
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
  .shopBox {
    margin-bottom: pTR(20);
    background: #fff;
    .left {
      width: 100%;
      height: pTR(600);
      .swiper-container {
        width: 100%;
        height: 100%;
        text-align:center;
      }
      img {
        width: pTR(600);
        height: pTR(600);
        display:block;
        margin:0 auto;
      }
    }
    .right {
      padding: pTR(30);
      .title {
        color: #333;
        font-size: pTR(36);
        line-height: pTR(48);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
        word-wrap: break-word;
      }
      .saleMass {
        font-size: pTR(28);
        color: #e63a3a;
        line-height: pTR(46);
        padding-top: pTR(30);
      }
      .discountBox {
        padding-top: pTR(40);
      }
      .discount {
        display: inline-block;
        color: #ff4242;
        font-size: pTR(24);
        vertical-align: middle;
        i {
          font-size: pTR(32);
        }
      }
      .original {
        text-decoration: line-through;
        display: inline-block;
        color: #8c8c8c;
        font-size: pTR(24);
        vertical-align: middle;
        margin-right: pTR(20);
      }
    }
  }
  .salelist {
    width: 100%;
    background: #fff;
    padding: pTR(30);
    display: flex;
    margin-bottom: pTR(20);
    align-items: center;
    .left {
      width: pTR(150);
      color: #333333;
      font-size: pTR(28);
    }
    .right {
      box-flex: 1;
      flex: 1;
      .list {
        width: 100%;
        padding-bottom: pTR(10);
        span {
          padding: 0 pTR(15);
          height: pTR(43);
          line-height: pTR(43);
          border: pTR(2) solid #e63a3a;
          border-radius: pTR(5);
          vertical-align: middle;
          color: #e63a3a;
          font-size: pTR(24);
          border-radius: pTR(10);
        }
        i {
          color: #585858;
          font-size: pTR(26);
          vertical-align: middle;
          padding-left: pTR(14);
        }
      }
      .list:last-child {
        padding-bottom: 0;
      }
    }
  }
  .detailBox {
    width: 100%;
    background: #fff;
    .head {
      width: 100%;
      height: pTR(80);
      line-height: pTR(80);
      padding-left: pTR(30);
      border-bottom: pTR(2) solid #e7e7e7;
      span {
        color: #333333;
        font-size: pTR(28);
      }
    }
    .detailPic {
      width: 100%;
      height: pTR(83);
      background: url(../../assets/czlImg/detaillist.jpg) center center no-repeat;
      -webkit-background-size: 100%;
      background-size: 100%;
    }

    .pic {
      border-bottom-left-radius: pTR(10);
      border-bottom-right-radius: pTR(10);
      overflow: hidden;
    }
  }
}

</style>
