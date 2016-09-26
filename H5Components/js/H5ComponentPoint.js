/* 散点图表组件对象 */
var H5ComponentPoint=function(name,cfg){
	
	var component = new H5ComponentBase(name,cfg);
	var base = cfg.data[0][1];//以这个为基点
	var baseidx = 1;
	$.each(cfg.data,function(idx,item,arr){
		 
		var point = $('<div class="point point_'+idx+'" />');
		
		var text_name = $('<div class="name">'+item[0]+'</div>');
		var text_per = $('<div class="per">'+item[1]+'</div>');
		text_name.append(text_per);
		point.append(text_name);
		var per = (item[1]/base*100) + '%';
		point.width(per).height(per);
		if(item[2]){
			//如果有颜色配置
			point.css({
				'backgroundColor':item[2]
			});
		}
		//在这里我们要实现一个动画效果也就是让散点从中心开始像预想的位置进行发散移动的动画效果 
		point.data('left',item[3]).data('top',item[4]).data('zIndex',idx);//暂且存储
		if(cfg.animateType){
			//动画效果的名称 
			point.css('z-index',-idx);
			
		}else{
			if(item[3] !== undefined && item[4] !== undefined){
			 point.css('left',item[3]).css('top',item[4]);
		    }
		}
		
		component.append(point);
		
	});
	component.find('.point').on('onLoad',function(){
		var _this = this;
		component.find('.point').css('z-index',1);
		component.find('.point').eq(0).css('z-index',2);
		$(_this).animate({left:$(_this).data('left'),top:$(_this).data('top')},cfg.animateType,function(){
			
		});
	});
	component.find('.point').on('onLeave',function(){
		var _this = this;
		$(_this).animate({left:0,top:0},cfg.animateType,function(){
			component.find('.point').css('z-index',-$(_this).data('zIndex'));
			component.find('.point').eq(0).css('z-index',2);
		});
	});
	return component;
}
