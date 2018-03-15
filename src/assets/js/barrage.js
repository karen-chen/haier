/**
 * Created by Administrator on 2017/9/13.
 */

var Barrage = wy.effect.Barrage;
var barrage;
var CACHEMSG=[];

CACHEMSG.push({
    name:'张三',
    msg:'颜值爆表，舔屏中'
});
CACHEMSG.push({
    name:'李四',
    msg:'颜值爆表，舔屏中'
});
CACHEMSG.push({
    name:'王五',
    msg:'颜值爆表，舔屏中'
});

$(document).ready(function() {
    var options = {
        width: '100%',
        duration: 6000,
        displayMax: 5,
        height: '100%',
        fontSizeRange:{from: 15, to: 15},
        colorRange: '#fff'
    };

    barrage = new Barrage($('#mountNode'), options);

    CACHEMSG.forEach(function(c) {
        // 简单的只传文字进去
       // barrage.pushForever(c);

        // 自定义HTML元素和样式
        barrage.pushForever('<div class="item"><img src="' + getRandomUrl() + '"/><b>' + c.name + '</b><span>' + c.msg + '</span></div>');
    })

    /**
     * barrage.push(content);               放入信息，在很短的将来将被显示，只显示一次
     * barrage.pushForever(content);        放入信息，这些信息会被循环显示
     */

});

function getRandomUrl() {
    var index = wy.base.Util.random(0, 6);
    return 'http://1251097942.cdn.myqcloud.com/1251097942/demos/photo/photo' + index + '.jpg';
}

function getRandomColor(){
    return  '#' +
        (function(color){
            return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])
            && (color.length == 6) ?  color : arguments.callee(color);
        })('');
}

function getContent() {
    var type = $('#type').val();
    var text = $('#message').val();
    var content = '';

    if(type === 'text') content = text;
    else content = '<div class="item"><img src="' + getRandomUrl() + '"/><b>' + name + '</b><span>' + text + '</span></div>';

    return content;
}

function pushNoDelayMessage() {
    barrage.push(getContent(), true);
}

function pushLoopMessage() {
    barrage.pushForever(getContent());
}

function pushFixedStyleNoDelayMessage() {
    barrage.push(getContent(), true, {color: 'red', fontSize: '40px'});
}

function pushDelayMessage() {
    barrage.push(getContent());
}
