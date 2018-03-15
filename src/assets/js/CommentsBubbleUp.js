/**
 * CommentsBubbleUp jQuery Plugin
 *
 * dependency: CommentFlow.js
 *
 */
;(function($, window) {

    var LIGHT_COLORS = ['blue','coral','cyan','grey','green','gray','pink','salmon','seagreen','skyblue','slategrey','slategray','steelblue','yellow'];
    function random(min,max){
        return Math.floor(min+Math.random()*(max-min));
    }

    function getRandomLightColor() {
        var index = random(0, LIGHT_COLORS.length - 1);
        return 'light' + LIGHT_COLORS[index];
    };

    function CommentsBubbleUp($el, options) {
        this.fixedColumn = options.fixedColumn;
        this.growList = $($el[0]).CommentsFlow(options);
    }

    CommentsBubbleUp.prototype = {
        constructor: CommentsBubbleUp,

        buildCommentItem: function(imgUrl, content) {
            var $div = $('<div>'),
                $img = $('<img>'),
                $span = $('<span>'),
                height = this.growList.$el.height() / this.fixedColumn,
                margin = 2,
                padding = 5;

            $div.css('display', 'inline-block');
            $div.css('margin', margin + 'px 10px');
            $div.css('padding', padding + 'px');
            $div.css('border-radius', '10px');
            $div.css('height', height - (padding + margin) * 2 + 'px');
            $div.css('background-color', 'rgba(212, 221, 224, 0.8)');
            $div.css('opacity', '0.9');
            $div.css('overflow', 'hidden');

            $img.css('border-radius', '50%');
            $img.css('width', height - (padding + margin) * 2 + 'px');
            $img.css('height',height - (padding + margin) * 2 + 'px');
            $img.css('background-color', getRandomLightColor());
            $img.css('vertical-align', 'middle');

            $span.css('margin', '0 10px');
            $span.css('line-height', '30px');

            $img.attr('src', imgUrl || '');
            $span.html(content);
            $div.append($img).append($span);

            return $div;
        },

        add: function(imgUrl, content) {
            var $div = this.buildCommentItem(imgUrl, content);
            this.growList.addComments($div.prop('outerHTML'), $div.outerHeight(true));
        },

        addContentAsHTML: function(html) {
            this.growList.addComments(html);
        }
    };

    $.fn.CommentsBubbleUp = function(options) {
        return new CommentsBubbleUp(this, options);
    }

})(jQuery, window);