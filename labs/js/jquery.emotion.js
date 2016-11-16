// Shawn Khameneh
// ExtraordinaryThoughts.com

(function($) {

	$.fn.emotions = function(options) {
    var defaults = {
        title:'这是一个提示',//默认提示文字
        direction:'down',//方向
        type:'text'//提示类型支持图片格式
    }
    options = $.extend({}, defaults, options);


    function toggleEmotion(event){
        var _this = this;
        $(this).parent().find('.emotion-container-float').toggleClass('active');
    }
    function changeTabs(event){
        var _this = this;
        var index = $(this).index();
        $(this).parent().find('li').removeClass('active').eq(index).addClass('active');
        $(this).parent().parent().find('.emotion-tabs-content').removeClass('active').eq(index).addClass('active');
    }
        function closeEmotionPane(event){
            $(this).parent().removeClass('active');
        }
    // 在每个元素上执行方法
    return this.each(function() {
         var $this = $(this);
         $this.click(toggleEmotion);
         $this.parent().find('.emotion-tabs li').click(changeTabs);
        $this.parent().find('.close-emotion').click(closeEmotionPane);
    });

	}

})(jQuery);
