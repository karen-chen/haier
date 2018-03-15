;
(function() {

    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };

    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || function(timer) {
        window.clearTimeout(timer);
    };

    var winW = $(window).width();

    //https://github.com/seajs/seajs/blob/master/dist/runtime-debug.js
    function isType(type) {
        return function(obj) {
            return {}.toString.call(obj) == "[object " + type + "]"
        }
    }

    var isObject = isType("Object")
    var isString = isType("String")
    var isArray = Array.isArray || isType("Array")
    var isFunction = isType("Function")
    var isUndefined = isType("Undefined")

    var scroll = {
        istimerrun:null,
        initIsOne: false, //接口数据断开，重新链接；
        moveTimer: null, //定时器
        ajaxArr: [], //接口获取来的数据
        moveArr: [], //要滚动的数据
        // start: function(arr) {

        //     for (var i = 0; i < arr.length; i++) {
        //         this.ajaxArr.unshift(arr[i]);
        //     }

        //     this.init();

        //     this.moveTimer = requestAnimationFrame(this.move.bind(this));
        // },
        run: function() {
            if (this.moveTimer) {
                return;
            }
            this.moveTimer = requestAnimationFrame(this.move.bind(this));
        },
        pause: function() {
            if (this.moveTimer) {
                this.istimerrun = false
                cancelAnimationFrame(this.moveTimer);
                this.moveTimer = null;
            }
        },
        stop: function() {
          //if (this.moveTimer) {
          //  cancelAnimationFrame(this.moveTimer);
          //  this.moveTimer = null;
          //}
          //for (var i = 0; i < this.ajaxArr.length -1; i++) {
          //  this.ajaxArr.shift();
          //}
          //for (var i =  0; i < this.moveArr.length -1; i++) {
          //  this.moveArr.shift();
          //}
          $("#scroll").empty();
            this.ajaxArr.length = 0;
          this.moveArr.length = 0;

        },

        setData: function(obj) {
            if (isObject(obj)) {
                obj.id = Math.random().toString(36).substr(3);
                this.ajaxArr.unshift(obj);
            }

            if (isArray(obj)) {
                for (var i = obj.length -1; i > -1; i--) {
                    obj[i].id = Math.random().toString(36).substr(3);
                    this.ajaxArr.unshift(obj[i]);
                }
            }
        },

        send: function(obj) { //点击可以发送

            this.setData(obj);

            //如果定时器停了
            if (this.moveArr.length == 0) {
                this.initIsOne = false;
                this.init();
                this.moveTimer = requestAnimationFrame(this.move.bind(this));
            }

            //只要页面滚动的不是最后一个数据，就不能init
            if (this.initIsOne) {
                this.initIsOne = false;
                //init方法不能同一时间，多次执行，否则ui试图会重叠；
                //执行一次 就可以了，把链接又开起来了
                this.init();
            }
        },
        init: function() {
            var obj = this.ajaxArr.shift();

            if (obj) {

                // "prizeUser.head && prizeUser.head != '/0' ? prizeUser.head : default_icon"

                obj.head = obj.head && obj.head != '/0' ? obj.head : "http://1251097942.cdn.myqcloud.com/1251097942/mc3-1/haier20170927/images/default_icon_20170927.png"

                obj.isTrue = true; //避免多次执行

                // $('.app').append(`<div class="scroll-li ${obj.id}">${obj.font}${obj.id}</div>`);
                $('#scroll').append(`

                 <h3 class="${obj.id}" style="  white-space: nowrap; position:absolute; right:0; top:0; transform:translate3d(100%,0,0)">
          <span>
            <span class="pic">
              <img src="${obj.head}">

            </span>
            <span class="barrage_box"><span class="nametext">${obj.nickname || ''} </span> <i style="display:inline-block;vertical-align: middle;">获得${obj.resourceName}</i></span>
          </span>
        </h3>
                    `);

                if($(`.${obj.id}`)){
                    if($(`.${obj.id}`).css('transform') != 'none'){
                        obj.left = $(`.${obj.id}`).css('transform').split('(')[1].split(')')[0].split(',')[4] - 0;
                        this.moveArr.push(obj);
                    }
                }


            }
        },
        //对moveArr数组里面的left字段 --
        move: function() {

            this.moveTimer = requestAnimationFrame(this.move.bind(this));

            if (this.moveArr.length == 0) {
                cancelAnimationFrame(this.moveTimer);
              this.istimerrun = false;
                //console.log('定时器停了');
            }

          this.istimerrun = true;

            for (var i = 0; i < this.moveArr.length; i++) {

                var obj = this.moveArr[i];

                obj.left--;

                //下一个滚动时机
                if (obj.left <= 0 && obj.isTrue) {
                    obj.isTrue = false;
                    if (this.ajaxArr.length == 0) {
                        this.initIsOne = true;

                        this.callback && this.callback()

                    }
                    this.init();
                    // console.log('可以放下一个', this.moveArr);
                }

                //单条播放完
                if (obj.left <= (-winW)) {
                    $(`.${obj.id}`).remove();
                    this.moveArr.shift(i, 1);
                    // console.log('删了一个');
                }

                $(`.${obj.id}`).css({
                    '-webkit-transform': 'translate3d(' + obj.left + 'px, 0, 0)'
                });

            }

        }
    };

    window.scroll = scroll;
})();
