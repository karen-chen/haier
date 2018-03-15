/**
 * Created by Administrator on 2016/5/5.
 */
$(window).load(function() {
    setHeight();
});
function setHeight(){
    var wHeight=$(window).height();
    var bHeight=$('.return_btn').outerHeight();
    var tHeight=$('.feeter').outerHeight();
    var cHeight=wHeight-bHeight-tHeight;
    $('.list_card').outerHeight(cHeight);
}

/*            上下轮播                   */
var comments;

var COMMENT_POOL = [
    {url: '', text: '我爱听'},
    {url: '', text: '我在厕所听'},
    {url: '', text: '不好听'},
    {url: '', text: '不要太长'},
    {url: '', text: '在不在'},
    {url: '', text: '特效特效'},
    {url: '', text: '现在没有特效'},
    {url: '', text: '向上滚动'},
    {url: '', text: '这个'},
    {url: '', text: '...'},
    {url: '', text: 'Hello'},
    {url: '', emoji: '', text: ''},

];
$(document).ready(function() {
    var options = {
        height: 'pTR(37)',
        fixedColumn: 6,
        onClickItem: function(event, item) {

        }
    };
    comments = $('#lountNode').CommentsBubbleUp(options);
    commentsFlowStart();

});


var seed;


function addText(url, text) {
    var $item = $('<span>').addClass('comment-item');
    var $span = $('<span>');

    $item.append($span);
    $span.append(text);

    comments.addContentAsHTML($item.prop('outerHTML'));
}

function commentsFlowStart() {
    seed = setInterval(function() {
        var index = random(0, COMMENT_POOL.length - 1);
        var c = COMMENT_POOL[index];

        /**
         * <span class="comment-item">
         *      <img src="avatar/image/path.jpg" />
         *      <span>
         *          text and expression || <img src="expression/image/path.gif" />
         *      </span>
         * </span>
         */
        if(c.emoji)
            addEmoji(c.url, c.emoji);
        else
            addText(c.url, c.text);

    }, 1500);
}

function commentsFlowStop(){
    clearInterval(seed);
}

function random(min,max){
    return Math.floor(min+Math.random()*(max-min));
}
