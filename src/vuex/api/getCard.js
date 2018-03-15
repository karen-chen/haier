import * as config from '@/lib/config'
import * as tool from '@/lib/tools'
let user = tool.userData


export default {
  //团购会首页title配置 /sys/getBaseConfigByType
  //配置类型:(recognize_act_base_config:
  //宣传页配置;shake_act_base_config:摇奖页配置;
  //draw_act_base_config:抽奖页配置)
  getBaseConfigByType(req, cb) {
    $.ajax({
      type: "GET",
      url: config.url + "sys/getBaseConfigByType",
      dataType: "jsonp",
      data: {
        configType: req.configType,
        actSid: user.actSid,
      },
      success(res) {
        // console.log(res);
        if (res.ret == 0) {
          cb && cb(res);
        } else {
          console.log('sys/getBaseConfigByType:', 'ret != 0');
        }
      },
      error(res) {
        console.log('sys/getBaseConfigByType:', 'fail');
      }
    });
  },


  //宣传页面-自定义板块配置  /banner/getBannerList
  //banner位置配置:(activity_page_custom_module_config)
  //banner类型(text)

  getBannerList(cb) {
    $.ajax({
      type: "GET",
      url: config.url + "banner/getBannerList",
      dataType: "jsonp",
      data: {
        actSid: user.actSid,
        location: 'activity_page_custom_module_config',
        targetType: 'text'
      },
      success(res) {

        // console.log(res);

        if (res.ret == 0) {

          cb && cb(res.bannerGrop);
        } else {
          console.log('banner/getBannerList:', 'ret != 0');
        }

      },
      error(res) {
        console.log('banner/getBannerList:', 'fail');
      }
    });
  },

  //宣传页面-自定义板块配置  /banner/getProductModuleList
  //banner位置配置:(activity_page_product_module_config)
  //banner类型(img)

  getProductModuleList(cb) {
    $.ajax({
      type: "GET",
      url: config.url + "banner/getProductModuleList",
      dataType: "jsonp",
      data: {
        actSid: user.actSid,
        location: 'activity_page_product_module_config',
        targetType: 'img'
      },
      success(res) {

        // console.log(res.list);

        if (res.ret == 0) {
          cb && cb(res.list);
        } else {
          console.log('banner/getProductModuleList:', 'ret != 0');
        }

      },
      error(res) {
        console.log('banner/getProductModuleList:', 'fail');
      }
    });

  },


  //activity/getRecognizeCardList

  getRecognizeCardList(cb) {
    $.ajax({
      type: "GET",
      url: config.url + "activity/getRecognizeCardList",
      dataType: "jsonp",
      data: {
        actSid: user.actSid,
      },
      success(res) {

        // console.log(res.list);

        if (res.ret == 0) {
          cb && cb(res.list);
        } else {
          console.log('banner/getRecognizeCardList:', 'ret != 0');
        }

      },
      error(res) {
        console.log('banner/getRecognizeCardList:', 'fail');
      }
    });
  },


  getRecognizeCardDetial(req, cb) {
    $.ajax({
      type: "GET",
      url: config.url + "activity/getRecognizeCardDetial",
      dataType: "jsonp",
      data: {
        openid: user.openid,
        recognizeCardSid: req.recognizeCardSid,
      },
      success(res) {

        console.log(res.list);

        if (res.ret == 0) {
          cb && cb(res.list);
        } else {
          console.log('banner/getRecognizeCardDetial:', 'ret != 0');
        }

      },
      error(res) {
        console.log('banner/getRecognizeCardDetial:', 'fail');
      }
    });
  }





}
