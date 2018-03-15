import * as config from './config';


export let userData = {};

//获取url param
export const getParam = function(attr) {

  let match = RegExp(`[?&]${attr}=([^&]*)`).exec(window.location.search)

  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

//判断页面是否授权
export const wxChankeAuthorize = function(backLink) {

  if (!getParam('openid') || !(getParam('nickname'))) {
    // window.location.href = `http://user.weshaketv.com/wss/platformMpOauth?app_code=${ config.appcode }&redirect_url=${ window.location.href }`;
    // TODO 获取目标页面地址
    // var backUrl="http://192.168.10.68:8080/#/Cardmain";

    var backUrl = backLink || window.location.href;
    if (getParam('openid')) {
      backUrl = window.location.href.replace(/&?openid=[^#&]*/, '');
    }
    var loginPage = config.cdnUrl + "/static/login.html?backUrl=" + encodeURIComponent(backUrl);
    window.location.href = config.authUrl + "/oauth/to_auth?appId=" + config.appid + "&return_url=" + encodeURIComponent(encodeURIComponent(loginPage));
    //console.log('openid不存在');
    return false;
  } else {
    userData.actSid = getParam("actSid");
    userData.openid = getParam("openid");
    userData.nickname = getParam("nickname");
    userData.sex = getParam("sex");
    userData.province = getParam("province");
    userData.city = getParam("city");
    userData.country = getParam("country");
    userData.headimgurl = getParam("headimgurl");
    userData.subscribe = getParam("subscribe");
    userData.cardOrderId = getParam("cardOrderId");
    userData.userLogId = getParam("userLogId");
    userData.saleOpenid = getParam("saleOpenid");
    userData.userId = getParam("userId");
    userData.shopId = getParam("shopId");
    userData.orgId = getParam("orgId");
    userData.hash = getParam("hash"); //判断页面路由跳转;
    return true;
  }
}

export const splitLink = function() {
  return config.cdnUrl + '/index.html?openid=' + userData.openid + '&nickname=' + userData.nickname + '&sex=' + userData.sex + '&province=' + userData.province + '&city=' + userData.city + '&country=' + userData.country + '&headimgurl=' + userData.headimgurl + "&subscribe=" + userData.subscribe
}

export const EnumConfigType = {
  RECOGNIZE: 'recognize_act_base_config',
  SHAKE: 'shake_act_base_config',
  DRAW: 'draw_act_base_config'
}

export const ShareInfo = {}


export const wxconfig = function(sign) {
  //console.log("wxconfig")
  let WX_API_LIST = [
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'getLocation',
    'previewImage',
    'chooseImage',
    'uploadImage',
    'openLocation',
    'hideMenuItems',

    'showMenuItems',
    'hideAllNonBaseMenuItem',
    'showAllNonBaseMenuItem',
    'onMenuShareQZone',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'closeWindow'
  ];
  wx.config({
    debug: false,
    appId: sign.appid,
    timestamp: sign.timestamp,
    nonceStr: sign.nonceStr,
    signature: sign.signature,
    jsApiList: WX_API_LIST
  });

}
export const getJsSign = function(onSuccess) {
  //console.log("getJsSign")
  $.ajax({
    // url: config.signServerUrl + '/sign/get_js_sign',
    url: 'http://user.s.weshaketv.com/wss/api/jsSign',
    dataType: 'jsonp',
    data: {
      appId: config.appid,
      url: location.href.split("#")[0]
    },
    success: function(data) {
      // console.log(" after getJsSign")
      // console.log(data.data);
      if (data.ret == '0') {
        onSuccess && onSuccess(data)

      } else {
        alert('获取js-sdk签名失败');
      }
    },
    error: function() {
      alert('获取js-sdk配置错误');
    }
  });
}

export const wxShare = function() {
  wx.ready(function() {
    wx.onMenuShareTimeline({
      title: config.wxShareData.title,
      link: config.wxShareData.link,
      imgUrl: config.wxShareData.imgUrl,
      desc: config.wxShareData.desc,
      success: function() {
        $.ajax({
          url: config.locationUrl + "/visitor_log/addVisitorLog",
          dataType: "jsonp",
          data: {
            actSid: userData.actSid,
            saleOpenid: userData.saleOpenid,
            openid: userData.openid,
            sourcePage: window.location.hash.substr(2),
            actionType: 3
          },
          success: function(data) {

          }
        });
      }
    });

    wx.onMenuShareAppMessage({
      title: config.wxShareData.title,
      link: config.wxShareData.link,
      imgUrl: config.wxShareData.imgUrl,
      desc: config.wxShareData.desc,
      success: function() {
        $.ajax({
          url: config.locationUrl + "/visitor_log/addVisitorLog",
          dataType: "jsonp",
          data: {
            actSid: userData.actSid,
            saleOpenid: userData.saleOpenid,
            openid: userData.openid,
            sourcePage: window.location.hash.substr(2),
            actionType: 4
          },
          success: function(data) {

          }
        });
      }
    });

    wx.onMenuShareQQ({
      title: config.wxShareData.title,
      link: config.wxShareData.link,
      imgUrl: config.wxShareData.imgUrl,
      desc: config.wxShareData.desc,
      success: function() {
        $.ajax({
          url: config.locationUrl + "/visitor_log/addVisitorLog",
          dataType: "jsonp",
          data: {
            actSid: userData.actSid,
            saleOpenid: userData.saleOpenid,
            openid: userData.openid,
            sourcePage: window.location.hash.substr(2),
            actionType: 5
          },
          success: function(data) {

          }
        });
      }
    });

    wx.onMenuShareWeibo({
      title: config.wxShareData.title,
      link: config.wxShareData.link,
      imgUrl: config.wxShareData.imgUrl,
      desc: config.wxShareData.desc,
      success: function() {
        $.ajax({
          url: config.locationUrl + "/visitor_log/addVisitorLog",
          dataType: "jsonp",
          data: {
            actSid: userData.actSid,
            saleOpenid: userData.saleOpenid,
            openid: userData.openid,
            sourcePage: window.location.hash.substr(2),
            actionType: 6
          },
          success: function(data) {}
        });
      }
    });
    wx.onMenuShareQZone({
      title: config.wxShareData.title,
      link: config.wxShareData.link,
      imgUrl: config.wxShareData.imgUrl,
      desc: config.wxShareData.desc,
      success: function() {
        $.ajax({
          url: config.locationUrl + "/visitor_log/addVisitorLog",
          dataType: "jsonp",
          data: {
            actSid: userData.actSid,
            saleOpenid: userData.saleOpenid,
            openid: userData.openid,
            sourcePage: window.location.hash.substr(2),
            actionType: 7
          },
          success: function(data) {

          }
        });
      }
    });
  });
}


export const wxHideMenu = function() {

  wx.ready(function() {
    wx.hideMenuItems({
      menuList: [
        //传播类
        'menuItem:share:qq', //分享到QQ
        'menuItem:share:weiboApp', //分享到Weibo
        'menuItem:favorite', //收藏
        'menuItem:share:facebook', //分享到facebook
        'menuItem:share:QZone', //分享到QQ空间
        "menuItem:share:timeline", //分享到朋友圈

        //保护类
        "menuItem:share:appMessage", //发送给朋友
        'menuItem:editTag', //编辑标签
        'menuItem:delete', //删除
        'menuItem:copyUrl', //复制链接
        'menuItem:originPage', //原网页
        'menuItem:readMode', //阅读模式
        'menuItem:openWithQQBrowser', //在QQ浏览器中打开
        'menuItem:openWithSafari', //在Safari中打开
        'menuItem:share:email', //邮件
        'menuItem:share:brand' //一些特殊公众号
      ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
    });
  });

}




export const uploadImage = function() {

}
export const getLocalImgData = function() {
  wx.ready(function() {
    wx.getLocalImgData({
      localId: 'localId', // 图片的localID
      success: function(res) {
        var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
      }
    });
  })
}



export function TMap(key) {
  return new Promise(function(resolve, reject) {
    window.init = function() {
      resolve(qq) //注意这里
    }
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://map.qq.com/api/js?v=2.exp&callback=init&key=" + key;
    script.onerror = reject;
    document.head.appendChild(script);
  })
}


export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};

//过滤非法字符
export function checkInject(value) {
  var reg = /<([a-za-z]+)[^>]*>/; //过滤所有html标签属性
  return reg.test(value);
};

//验证手机号码
export function checkTel(value) {
  var reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/; //过滤所有html标签属性
  return reg.test(value);
};


//验证字符串是否是数字
export function checkNumber(theObj) {
  var reg = /^[0-9]+.?[0-9]*$/;
  if (reg.test(theObj)) {
    return true;
  }
  return false;
}

//去掉空格
export  function removeAllSpace(str) {
     return str.replace(/\s+/g, "");
    }
