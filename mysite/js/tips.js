// Shawn Khameneh
// ExtraordinaryThoughts.com

(function($) {

	$.fn.tips = function(options) {
    var defaults = {
        title:'这是一个提示',//默认提示文字
        direction:'down',//方向
        type:'text'//提示类型支持图片格式
    }
    options = $.extend({}, defaults, options);
    //创建一个 tips 节点
    var tipsNode = $('<div class="lk-tips"/>');
    function MouseOver(event){
        $('body').append(tipsNode);
        var type = $(this).data('type');
        if(type == undefined){
            options.type = 'text';
        }else{
            options.type = type;
        }
      var title = $(this).data('title');
      if(title){
        options.title = title;
      }
        switch (options.type){
            case 'text':
                tipsNode.text(options.title);
                break;
            case 'image':
                tipsNode.html('<img src="'+$(this).data('src')+'" width="'+$(this).data('width')+'">');
                break;
        }

      var direction = $(this).data('direction');

        if(direction == undefined){
            options.direction = 'top';
        }else{
            options.direction = direction;
        }
      var offset = $(this).offset();
      var tipsWidth = tipsNode.outerWidth();
      var tipsHeight = tipsNode.outerHeight();

      //这里要来判断方向
      switch (options.direction) {
        case 'top':
					tipsNode.css({
					 opacity:0,
					 left:offset.left+$(this).outerWidth()/2-tipsWidth/2,
					 top:offset.top+$(this).outerHeight()+10
				 }).animate({
					 opacity:1
				 });
                   tipsNode.removeClass('left,down,right').addClass('top');
          break;
        case 'down':
					tipsNode.css({
					 left:offset.left+$(this).outerWidth()/2-tipsWidth/2,
					 top:offset.top-tipsHeight-10
					});
                    tipsNode.removeClass('left,top,right').addClass('down');
          break;
        case 'left':
					tipsNode.css({
					 left:offset.left+$(this).outerWidth()/2-tipsWidth/2,
					 top:offset.top-tipsHeight-10
					});
                    tipsNode.removeClass('down,top,right').addClass('left');
          break;
        case 'right':
					tipsNode.css({
					 left:offset.left+$(this).outerWidth()/2-tipsWidth/2,
					 top:offset.top-tipsHeight-10
					});
                    tipsNode.removeClass('left,top,down').addClass('right');
          break;
      }

    }

    function MouseOut(event){
        tipsNode.remove();
        tipsNode.removeClass().addClass('lk-tips');
    }

    // 在每个元素上执行方法
    return this.each(function() {
      var $this = $(this);
      $this.hover(MouseOver,MouseOut);
    });

	}

})(jQuery);
