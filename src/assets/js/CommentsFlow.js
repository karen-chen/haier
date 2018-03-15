/**
 * CommentsFlow jQuery Plugin
 *
 * dependency: animation CSS
 * sample:
 *
     .animated {
                -webkit-animation-duration: 1s;
                animation-duration: 1s;
                -webkit-animation-fill-mode: both;
                animation-fill-mode: both;
      }
     .comment-flow-fadeIn {
                -webkit-animation-name: comment-flow-fadeIn;
                animation-name: comment-flow-fadeIn;
            }
     @-webkit-keyframes comment-flow-fadeIn {
                  from {
                      opacity: 0;
                      transform: scale(0, 0) translateX(-50%);

                  }
                  to {
                      opacity: 1;
                      transform: scale(1, 1);
                      transform: scale(1, 1) translateX(0);
                  }
            }
     @keyframes comment-flow-fadeIn {
                  from {
                      opacity: 0;
                      transform: scale(0, 0) translateX(-50%);

                  }
                  to {
                      opacity: 1;
                      transform: scale(1, 1);
                      transform: scale(1, 1) translateX(0);
                  }
            }
     @-webkit-keyframes comment-flow-fadeOut {
              from {
                  opacity: 1;
              }
              to {
                  opacity: 0;
              }
            }
     @keyframes comment-flow-fadeOut {
              from {
                  opacity: 1;
              }
              to {
                  opacity: 0;
              }
            }
     .comment-flow-fadeOut {
              -webkit-animation-name: comment-flow-fadeOut;
              animation-name: comment-flow-fadeOut;
      }
 *
 */
;(function($, window) {

    function CommentsFlow($el, options) {
        var defaultOptions = {
            width: '100%',
            height: '400px',
            onClickItem: function(event, item) { console.log('click item')}
        };
        options = options || {};

        for(var p in defaultOptions)
            if(options[p])
                defaultOptions[p] = options[p];

        this.options = defaultOptions;

        this.$el = $el;
        this.$comments = [];
        this.$placeholder = null;
        this.$content = null;
        this.transitionY = 0;

        this._init();
    }

    CommentsFlow.prototype = {
        constructor: CommentsFlow,

        _init: function() {
            this._styleContainer();
        },

        _styleContainer: function() {
            this.$el.css('position', 'relative');
            this.$el.css('overflow', 'hidden');
            this.$el.css('width', this.options.width);
            this.$el.css('height', this.options.height);

            this.$content = $('<div>');
            this.$content.css('transform', 'translateY(0)');
            this.$content.css('-webkit-transform', 'translateY(0)');
            this.$content.css('transition', 'transform 0.5s ease');
            this.$content.css('-webkit-transition', '-webkit-transform 0.5s ease');

            this.$content.on('transitionend webkitTransitionEnd', function() {
                this.$comments.forEach(function($c, index) {
                    if($c.offset().top <= this.$el.offset().top + 1) {

                        // remove comment item, need to increase height of placeholder
                        $c.on('animationend webkitAnimationEnd', function() {
                            this._removeCommentEvent($c);
                            this.$placeholder.height(this.$placeholder.height() + $c.outerHeight(true));
                            $c.remove();
                        }.bind(this));

                        $c.addClass('animated comment-flow-fadeOut');

                    }
                }.bind(this));
            }.bind(this));

            this.$el.append(this.$content);

            this.$placeholder = $('<div>');
            this.$content.append(this.$placeholder);
            this.$placeholder.height(this.$el.height());

        },

        _attachCommentEvent: function($comment) {
            $comment.on('click', function(e) {
                this.options.onClickItem(e, $comment);
            }.bind(this));
        },

        _removeCommentEvent: function($comment) {
            $comment.off('click');
        },

        addComments: function(comment, height) {
            var $comment = $('<div>');
            $comment.html(comment);

            this._attachCommentEvent($comment);

            this.$comments.push($comment);
            this.$content.append($comment);
            $comment.addClass('comment-flow-animated comment-flow-fadeIn');
            $comment.height(height);

            this.scrollBottom($comment);
        },

        scrollBottom: function($comment) {
            this.transitionY += $comment.outerHeight(true);
            this.$content.css('-webkit-transform', 'translateY(-' + this.transitionY + 'px)');
        }
    };


    $.fn.CommentsFlow = function(options) {
        return new CommentsFlow(this, options);
    }

})(jQuery, window);