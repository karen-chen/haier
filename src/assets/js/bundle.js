!function(t){function i(n){if(o[n])return o[n].exports;var e=o[n]={i:n,l:!1,exports:{}};return t[n].call(e.exports,e,e.exports,i),e.l=!0,e.exports}var o={};i.m=t,i.c=o,i.i=function(t){return t},i.d=function(t,o,n){i.o(t,o)||Object.defineProperty(t,o,{configurable:!1,enumerable:!0,get:n})},i.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(o,"a",o),o},i.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},i.p="",i(i.s=5)}([function(t,i,o){(function(i){t.exports=function(){var t=null;return i.wy?t=i.wy:(i.wy={version:"0.0.1",author:"jack yang",base:{},effect:{}},t=i.wy),t}()}).call(i,o(2))},function(t,i,o){function n(t){if(t.options.colorRange){var i=t.options.colorRange.length,o=a(0,i);return t.options.colorRange[o]}return"#"+function(t){return(t+="0123456789abcdef"[Math.floor(16*Math.random())])&&6==t.length?t:arguments.callee(t)}("")}function e(t){return a(t.options.fontSizeRange.from,t.options.fontSizeRange.to)}function r(t){var i=a(0,t.lanes.length),o=null,n="horizontal"==t.options.direction?t.$el.height():t.$el.width(),e=0,r=n-t.laneWidth;if(t.laneStatus[i]){for(i=0;i<t.lanes.length;i++)if(!t.laneStatus[i]){o=t.lanes[i],t.laneStatus[i]=!0;break}o&&(e=o.from,r=o.to)}else t.laneStatus[i]=!0,o=t.lanes[i],e=o.from,r=o.to;return r=Math.min(r,n-t.laneWidth),{index:i,position:a(e,r)}}function s(t,i){var o={width:"100%",height:"200px",duration:5e3,direction:"horizontal",reverse:!1,displayMax:3,fontSizeRange:{from:8,to:48},colorRange:c,beforeItemIn:function(t,i){},positionStrategy:function(){return r(this)},colorStrategy:function(){return n(this)},fontSizeStrategy:function(){return e(this)}};this.options=$.extend(o,i),this.$el=t,this.queue=[],this.displayCount=0,this.laneWidth=0,this.lanes=[],this.laneStatus={},this._init()}o(0);var a=(o(4),o(3).random),c=["black","red","black","black","black"];s.prototype={constructor:s,_init:function(){var t;this.$el.css("width",this.options.width),this.$el.css("height",this.options.height),this.$el.css("position","relative"),this.$el.css("overflow","hidden"),t="horizontal"==this.options.direction?this.$el.height():this.$el.width(),this.laneWidth=t/this.options.displayMax;for(var i=0;i+this.laneWidth<=t;)this.lanes.push({from:i,to:i+=this.laneWidth})},_getRandomPosition:function(){return this.options.positionStrategy.bind(this)()},_getRandomFontSize:function(){return this.options.fontSizeStrategy.bind(this)()},_getRandomColor:function(){return this.options.colorStrategy.bind(this)()},_consumeQueue:function(t){var i=null;this.displayCount>=this.options.displayMax||0==this.queue.length||(i=this.queue.shift(),i.options.forever&&this.queue.push(i),t?setTimeout(function(){this._append(i.content,i.options)}.bind(this),a(0,this.options.duration)):this._append(i.content,i.options))},_beforeItemIn:function(t,i){this.options.beforeItemIn&&this.options.beforeItemIn(t,i)},_append:function(t,i){var o=null,n=null;o=$("<div>"),o.css("display","inline-block"),o.css("position","absolute"),o.css("white-space","nowrap"),o.css("color",i.color||this._getRandomColor()),o.css("font-size",i.fontSize||this._getRandomFontSize()+"px"),o.html(t),this.$el.append(o),n=this._getRandomPosition(),"horizontal"==this.options.direction?(this.options.reverse?o.css("left",-o.width()+"px"):o.css("right",-o.width()+"px"),o.css("top",i.position||n.position+"px"),this._beforeItemIn(o,n),o.snabbt({position:[(o.width()+this.$el.width())*(this.options.reverse?1:-1),0,0],duration:this.options.duration,complete:function(){--this.displayCount,this.laneStatus[n.index]=!1,o.remove(),this._consumeQueue(!0)}.bind(this)})):(this.options.reverse?o.css("bottom",-o.height()+"px"):o.css("top",-o.height()+"px"),o.css("left",n.position+"px"),o.snabbt({position:[0,(o.height()+this.$el.height())*(this.options.reverse?-1:1),0],duration:this.options.duration,complete:function(){--this.displayCount,this.laneStatus[n.index]=!1,o.remove(),this._consumeQueue(!0)}.bind(this)})),++this.displayCount},push:function(t,i,o){o||(o={forever:!1}),i?this._append(t,o):(this.queue.push({content:t,options:o}),this._consumeQueue())},pushForever:function(t,i){i||(i={}),i.forever=!0,this.queue.push({content:t,options:i}),this._consumeQueue()},reset:function(){this.queue=[]}},t.exports=wy.effect.Barrage=s},function(t,i){var o;o=function(){return this}();try{o=o||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(o=window)}t.exports=o},function(t,i,o){function n(t,i){this.min=t,this.max=i,this.span=i-t+1}o(0),n.prototype.map=function(t){return t<this.min?this.max-Math.abs((this.min-t)%this.span):t>this.max?this.min+Math.abs((t-this.max)%this.span):t}(function(){for(var t=0,i=["webkit","moz"],o=0;o<i.length&&!window.requestAnimationFrame;++o)window.requestAnimationFrame=window[i[o]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[i[o]+"CancelAnimationFrame"]||window[i[o]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(i,o){var n=(new Date).getTime(),e=Math.max(0,16-(n-t)),r=window.setTimeout(function(){i(n+e)},e);return t=n+e,r}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)})}());var e={random:function(t,i){return Math.floor(t+Math.random()*(i-t))},getDegree:function(t){return t/Math.PI*180},getRadian:function(t){return t*Math.PI/180},requestAnimationFrame:window.requestAnimationFrame,cancelAnimationFrame:window.cancelAnimationFrame,RangeMapping:n};t.exports=wy.base.Util=e},function(t,i,o){/*! snabbt.js v0.5.8 built: 2015-09-23  (c)2015 Daniel Lundin @license MIT */
!function(i,o){var n=function(){var t=[],i=[],o=[],n="transform",e=window.getComputedStyle(document.documentElement,"");"webkit"===(Array.prototype.slice.call(e).join("").match(/-(moz|webkit|ms)-/)||""===e.OLink&&["","o"])[1]&&(n="webkitTransform");var r=function(t,i,o){var n=t;if(void 0!==n.length){for(var e={chainers:[],then:function(t){return console.log("DeprecationWarning: then() is renamed to snabbt()"),this.snabbt(t)},snabbt:function(t){var i=this.chainers.length;return this.chainers.forEach(function(o,n){o.snabbt(s(t,n,i))}),e},setValue:function(t){return this.chainers.forEach(function(i){i.setValue(t)}),e},finish:function(){return this.chainers.forEach(function(t){t.finish()}),e},rollback:function(){return this.chainers.forEach(function(t){t.rollback()}),e}},r=0,c=n.length;c>r;++r)e.chainers.push("string"==typeof i?a(n[r],i,s(o,r,c)):a(n[r],s(i,r,c),o));return e}return"string"==typeof i?a(n,i,s(o,0,1)):a(n,s(i,0,1),o)},s=function(t,i,o){if(!t)return t;var n=Z(t);Y(t.delay)&&(n.delay=t.delay(i,o)),Y(t.callback)&&(console.log("DeprecationWarning: callback is renamed to complete"),n.complete=function(){t.callback.call(this,i,o)});var e=Y(t.allDone),r=Y(t.complete);return(r||e)&&(n.complete=function(){r&&t.complete.call(this,i,o),e&&i==o-1&&t.allDone()}),Y(t.valueFeeder)&&(n.valueFeeder=function(n,e){return t.valueFeeder(n,e,i,o)}),Y(t.easing)&&(n.easing=function(n){return t.easing(n,i,o)}),["position","rotation","skew","rotationPost","scale","scalePost","width","height","opacity","fromPosition","fromRotation","fromSkew","fromRotationPost","fromScale","fromScalePost","fromWidth","fromHeight","fromOpacity","transformOrigin","duration","delay"].forEach(function(e){Y(t[e])&&(n[e]=t[e](i,o))}),n},a=function(t,o,n){function e(o){return w.tick(o),w.updateElement(t),w.isStopped()?void 0:w.completed()?void(r.loop>1&&!w.isStopped()?(r.loop-=1,w.restart(),g(e)):(r.complete&&r.complete.call(t),y.length&&(r=y.pop(),h=d(r,f,!0),f=d(r,Z(f)),r=m(h,f,r),w=P(r),i.push([t,w]),w.tick(o),g(e)))):g(e)}if("attention"===o)return c(t,n);if("stop"===o)return u(t);var r=o;l();var a=p(t),h=a;h=d(r,h,!0);var f=Z(a);f=d(r,f);var v=m(h,f,r),w=P(v);i.push([t,w]),w.updateElement(t,!0);var y=[],b={snabbt:function(t){return y.unshift(s(t,0,1)),b},then:function(t){return console.log("DeprecationWarning: then() is renamed to snabbt()"),this.snabbt(t)}};return g(e),r.manual?w:b},c=function(t,o){function n(i){r.tick(i),r.updateElement(t),r.completed()?(o.callback&&o.callback(t),o.loop&&o.loop>1&&(o.loop--,r.restart(),g(n))):g(n)}var e=d(o,T({}));o.movement=e;var r=y(o);i.push([t,r]),g(n)},u=function(t){for(var o=0,n=i.length;n>o;++o){var e=i[o],r=e[0],s=e[1];r===t&&s.stop()}},h=function(t,i){for(var o=0,n=t.length;n>o;++o){var e=t[o],r=e[0],s=e[1];if(r===i){var a=s.getCurrentState();return s.stop(),a}}},l=function(){o=o.filter(function(t){return f(t[0]).body})},f=function(t){for(var i=t;i.parentNode;)i=i.parentNode;return i},p=function(t){var n=h(i,t);return n||h(o,t)},d=function(t,i,o){i||(i=T({position:[0,0,0],rotation:[0,0,0],rotationPost:[0,0,0],scale:[1,1],scalePost:[1,1],skew:[0,0]}));var n="position",e="rotation",r="skew",s="rotationPost",a="scale",c="scalePost",u="width",h="height",l="opacity";return o&&(n="fromPosition",e="fromRotation",r="fromSkew",s="fromRotationPost",a="fromScale",c="fromScalePost",u="fromWidth",h="fromHeight",l="fromOpacity"),i.position=j(t[n],i.position),i.rotation=j(t[e],i.rotation),i.rotationPost=j(t[s],i.rotationPost),i.skew=j(t[r],i.skew),i.scale=j(t[a],i.scale),i.scalePost=j(t[c],i.scalePost),i.opacity=t[l],i.width=t[u],i.height=t[h],i},m=function(t,i,o){return o.startState=t,o.endState=i,o},v=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return setTimeout(t,1e3/60)},g=function(i){0===t.length&&v(w),t.push(i)},w=function(n){for(var e=t.length,r=0;e>r;++r)t[r](n);t.splice(0,e);var s=i.filter(function(t){return t[1].completed()});o=o.filter(function(t){for(var i=0,o=s.length;o>i;++i)if(t[0]===s[i][0])return!1;return!0}),o=o.concat(s),i=i.filter(function(t){return!t[1].completed()}),0!==t.length&&v(w)},P=function(t){var i=t.startState,o=t.endState,n=j(t.duration,500),e=j(t.delay,0),r=t.perspective,s=R(j(t.easing,"linear"),t),a=0===n?o.clone():i.clone();t.transformOrigin,a.transformOrigin=t.transformOrigin;var c,u,h=0,l=0,f=!1,p=!1,d=t.manual,m=0,v=e/n;return u=t.valueFeeder?D(t.valueFeeder,i,o,a):V(i,o,a),{stop:function(){f=!0},isStopped:function(){return f},finish:function(t){d=!1,h=l-n*m,c=t,s.resetFrom(m)},rollback:function(t){d=!1,u.setReverse(),h=l-n*(1-m),c=t,s.resetFrom(m)},restart:function(){h=void 0,s.resetFrom(0)},tick:function(t){if(!f){if(d)return l=t,void this.updateCurrentTransform();if(h||(h=t),t-h>e){p=!0,l=t-e;var i=Math.min(Math.max(0,l-h),n);s.tick(i/n),this.updateCurrentTransform(),this.completed()&&c&&c()}}},getCurrentState:function(){return a},setValue:function(t){p=!0,m=Math.min(Math.max(t,1e-4),1+v)},updateCurrentTransform:function(){var t=s.getValue();if(d){var i=Math.max(1e-5,m-v);s.isSpring?t=i:(s.tick(i,!0),t=s.getValue())}u.tween(t)},completed:function(){return!!f||0!==h&&s.completed()},updateElement:function(t,i){if(p||i){var o=u.asMatrix(),n=u.getProperties();Q(t,o,r),X(t,n)}}}},y=function(t){var i=t.movement;t.initialVelocity=.1,t.equilibriumPosition=0;var o=S(t),n=!1,e=i.position,r=i.rotation,s=i.rotationPost,a=i.scale,c=i.scalePost,u=i.skew,h=T({position:e?[0,0,0]:void 0,rotation:r?[0,0,0]:void 0,rotationPost:s?[0,0,0]:void 0,scale:a?[0,0]:void 0,skew:u?[0,0]:void 0});return{stop:function(){n=!0},isStopped:function(){return n},tick:function(){n||o.equilibrium||(o.tick(),this.updateMovement())},updateMovement:function(){var t=o.getValue();e&&(h.position[0]=i.position[0]*t,h.position[1]=i.position[1]*t,h.position[2]=i.position[2]*t),r&&(h.rotation[0]=i.rotation[0]*t,h.rotation[1]=i.rotation[1]*t,h.rotation[2]=i.rotation[2]*t),s&&(h.rotationPost[0]=i.rotationPost[0]*t,h.rotationPost[1]=i.rotationPost[1]*t,h.rotationPost[2]=i.rotationPost[2]*t),a&&(h.scale[0]=1+i.scale[0]*t,h.scale[1]=1+i.scale[1]*t),c&&(h.scalePost[0]=1+i.scalePost[0]*t,h.scalePost[1]=1+i.scalePost[1]*t),u&&(h.skew[0]=i.skew[0]*t,h.skew[1]=i.skew[1]*t)},updateElement:function(t){Q(t,h.asMatrix()),X(t,h.getProperties())},getCurrentState:function(){return h},completed:function(){return o.equilibrium||n},restart:function(){o=S(t)}}},b=function(t){return t},k=function(t){return(Math.cos(t*Math.PI+Math.PI)+1)/2},M=function(t){return t*t},x=function(t){return 1-Math.pow(t-1,2)},S=function(t){var i=j(t.startPosition,0),o=j(t.equilibriumPosition,1),n=j(t.initialVelocity,0),e=j(t.springConstant,.8),r=j(t.springDeceleration,.9),s=j(t.springMass,10),a=!1;return{isSpring:!0,tick:function(t,c){if(0!==t&&!c&&!a){n+=-(i-o)*e/s,i+=n,n*=r,Math.abs(i-o)<.001&&Math.abs(n)<.001&&(a=!0)}},resetFrom:function(t){console.log("resetting spring from "+t),i=t,n=0},getValue:function(){return a?o:i},completed:function(){return a}}},F={linear:b,ease:k,easeIn:M,easeOut:x},R=function(t,i){if("spring"==t)return S(i);var o=t;Y(t)||(o=F[t]);var n,e=o,r=0;return{tick:function(t){r=e(t),n=t},resetFrom:function(){n=0},getValue:function(){return r},completed:function(){return n>=1&&n}}},q=function(t,i,o,n){t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=i,t[13]=o,t[14]=n,t[15]=1},A=function(t,i){t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=Math.cos(i),t[6]=-Math.sin(i),t[7]=0,t[8]=0,t[9]=Math.sin(i),t[10]=Math.cos(i),t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1},_=function(t,i){t[0]=Math.cos(i),t[1]=0,t[2]=Math.sin(i),t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=-Math.sin(i),t[9]=0,t[10]=Math.cos(i),t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1},C=function(t,i){t[0]=Math.cos(i),t[1]=-Math.sin(i),t[2]=0,t[3]=0,t[4]=Math.sin(i),t[5]=Math.cos(i),t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1},O=function(t,i,o){t[0]=1,t[1]=Math.tan(i),t[2]=0,t[3]=0,t[4]=Math.tan(o),t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1},z=function(t,i,o){t[0]=i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=o,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1},I=function(t){t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1},$=function(t,i){i[0]=t[0],i[1]=t[1],i[2]=t[2],i[3]=t[3],i[4]=t[4],i[5]=t[5],i[6]=t[6],i[7]=t[7],i[8]=t[8],i[9]=t[9],i[10]=t[10],i[11]=t[11],i[12]=t[12],i[13]=t[13],i[14]=t[14],i[15]=t[15]},E=function(){var t=new Float32Array(16),i=new Float32Array(16),o=new Float32Array(16);return I(t),{data:t,asCSS:function(){for(var i="matrix3d(",o=0;15>o;++o)i+=Math.abs(t[o])<1e-4?"0,":t[o].toFixed(10)+",";return i+=Math.abs(t[15])<1e-4?"0)":t[15].toFixed(10)+")"},clear:function(){I(t)},translate:function(n,e,r){return $(t,i),q(o,n,e,r),W(i,o,t),this},rotateX:function(n){return $(t,i),A(o,n),W(i,o,t),this},rotateY:function(n){return $(t,i),_(o,n),W(i,o,t),this},rotateZ:function(n){return $(t,i),C(o,n),W(i,o,t),this},scale:function(n,e){return $(t,i),z(o,n,e),W(i,o,t),this},skew:function(n,e){return $(t,i),O(o,n,e),W(i,o,t),this}}},W=function(t,i,o){return o[0]=t[0]*i[0]+t[1]*i[4]+t[2]*i[8]+t[3]*i[12],o[1]=t[0]*i[1]+t[1]*i[5]+t[2]*i[9]+t[3]*i[13],o[2]=t[0]*i[2]+t[1]*i[6]+t[2]*i[10]+t[3]*i[14],o[3]=t[0]*i[3]+t[1]*i[7]+t[2]*i[11]+t[3]*i[15],o[4]=t[4]*i[0]+t[5]*i[4]+t[6]*i[8]+t[7]*i[12],o[5]=t[4]*i[1]+t[5]*i[5]+t[6]*i[9]+t[7]*i[13],o[6]=t[4]*i[2]+t[5]*i[6]+t[6]*i[10]+t[7]*i[14],o[7]=t[4]*i[3]+t[5]*i[7]+t[6]*i[11]+t[7]*i[15],o[8]=t[8]*i[0]+t[9]*i[4]+t[10]*i[8]+t[11]*i[12],o[9]=t[8]*i[1]+t[9]*i[5]+t[10]*i[9]+t[11]*i[13],o[10]=t[8]*i[2]+t[9]*i[6]+t[10]*i[10]+t[11]*i[14],o[11]=t[8]*i[3]+t[9]*i[7]+t[10]*i[11]+t[11]*i[15],o[12]=t[12]*i[0]+t[13]*i[4]+t[14]*i[8]+t[15]*i[12],o[13]=t[12]*i[1]+t[13]*i[5]+t[14]*i[9]+t[15]*i[13],o[14]=t[12]*i[2]+t[13]*i[6]+t[14]*i[10]+t[15]*i[14],o[15]=t[12]*i[3]+t[13]*i[7]+t[14]*i[11]+t[15]*i[15],o},T=function(t){var i=E(),o={opacity:void 0,width:void 0,height:void 0};return{position:t.position,rotation:t.rotation,rotationPost:t.rotationPost,skew:t.skew,scale:t.scale,scalePost:t.scalePost,opacity:t.opacity,width:t.width,height:t.height,clone:function(){return T({position:this.position?this.position.slice(0):void 0,rotation:this.rotation?this.rotation.slice(0):void 0,rotationPost:this.rotationPost?this.rotationPost.slice(0):void 0,skew:this.skew?this.skew.slice(0):void 0,scale:this.scale?this.scale.slice(0):void 0,scalePost:this.scalePost?this.scalePost.slice(0):void 0,height:this.height,width:this.width,opacity:this.opacity})},asMatrix:function(){var t=i;return t.clear(),this.transformOrigin&&t.translate(-this.transformOrigin[0],-this.transformOrigin[1],-this.transformOrigin[2]),this.scale&&t.scale(this.scale[0],this.scale[1]),this.skew&&t.skew(this.skew[0],this.skew[1]),this.rotation&&(t.rotateX(this.rotation[0]),t.rotateY(this.rotation[1]),t.rotateZ(this.rotation[2])),this.position&&t.translate(this.position[0],this.position[1],this.position[2]),this.rotationPost&&(t.rotateX(this.rotationPost[0]),t.rotateY(this.rotationPost[1]),t.rotateZ(this.rotationPost[2])),this.scalePost&&t.scale(this.scalePost[0],this.scalePost[1]),this.transformOrigin&&t.translate(this.transformOrigin[0],this.transformOrigin[1],this.transformOrigin[2]),t},getProperties:function(){return o.opacity=this.opacity,o.width=this.width+"px",o.height=this.height+"px",o}}},V=function(t,i,o){var n=t,e=i,r=o,s=void 0!==e.position,a=void 0!==e.rotation,c=void 0!==e.rotationPost,u=void 0!==e.scale,h=void 0!==e.scalePost,l=void 0!==e.skew,f=void 0!==e.width,p=void 0!==e.height,d=void 0!==e.opacity;return{tween:function(t){if(s){var i=e.position[0]-n.position[0],o=e.position[1]-n.position[1],m=e.position[2]-n.position[2];r.position[0]=n.position[0]+t*i,r.position[1]=n.position[1]+t*o,r.position[2]=n.position[2]+t*m}if(a){var v=e.rotation[0]-n.rotation[0],g=e.rotation[1]-n.rotation[1],w=e.rotation[2]-n.rotation[2];r.rotation[0]=n.rotation[0]+t*v,r.rotation[1]=n.rotation[1]+t*g,r.rotation[2]=n.rotation[2]+t*w}if(c){var P=e.rotationPost[0]-n.rotationPost[0],y=e.rotationPost[1]-n.rotationPost[1],b=e.rotationPost[2]-n.rotationPost[2];r.rotationPost[0]=n.rotationPost[0]+t*P,r.rotationPost[1]=n.rotationPost[1]+t*y,r.rotationPost[2]=n.rotationPost[2]+t*b}if(l){var k=e.skew[0]-n.skew[0],M=e.skew[1]-n.skew[1];r.skew[0]=n.skew[0]+t*k,r.skew[1]=n.skew[1]+t*M}if(u){var x=e.scale[0]-n.scale[0],S=e.scale[1]-n.scale[1];r.scale[0]=n.scale[0]+t*x,r.scale[1]=n.scale[1]+t*S}if(h){var F=e.scalePost[0]-n.scalePost[0],R=e.scalePost[1]-n.scalePost[1];r.scalePost[0]=n.scalePost[0]+t*F,r.scalePost[1]=n.scalePost[1]+t*R}if(f){var q=e.width-n.width;r.width=n.width+t*q}if(p){var A=e.height-n.height;r.height=n.height+t*A}if(d){var _=e.opacity-n.opacity;r.opacity=n.opacity+t*_}},asMatrix:function(){return r.asMatrix()},getProperties:function(){return r.getProperties()},setReverse:function(){var t=n;n=e,e=t}}},D=function(t,i,o,n){var e=t(0,E()),r=i,s=o,a=n,c=!1;return{tween:function(i){c&&(i=1-i),e.clear(),e=t(i,e);var o=s.width-r.width,n=s.height-r.height,u=s.opacity-r.opacity;void 0!==s.width&&(a.width=r.width+i*o),void 0!==s.height&&(a.height=r.height+i*n),void 0!==s.opacity&&(a.opacity=r.opacity+i*u)},asMatrix:function(){return e},getProperties:function(){return a.getProperties()},setReverse:function(){c=!0}}},j=function(t,i){return void 0===t?i:t},Q=function(t,i,o){var e="";o&&(e="perspective("+o+"px) ");var r=i.asCSS();t.style[n]=e+r},X=function(t,i){for(var o in i)t.style[o]=i[o]},Y=function(t){return"function"==typeof t},Z=function(t){if(!t)return t;var i={};for(var o in t)i[o]=t[o];return i};return window.jQuery&&function(t){t.fn.snabbt=function(t,i){return r(this.get(),t,i)}}(jQuery),r.createMatrix=E,r.setElementTransform=Q,r}();t.exports=n}()},function(t,i,o){o(1)}]);