/* 基本图文组件对象 */

var H5ComponentBase = function(name,cfg){
	var cfg = cfg || {};
	var id = ('h5_c_'+Math.random()).replace('.','_');
	
	    // 把当前的组建类型添加到样式中进行标记
    var cls = ' h5_component_'+cfg.type; 
    var component = $('<div class="h5_component '+cls+' h5_component_name_'+name+'" id="'+id+'">');

	cfg.text && component.text(cfg.text);
	cfg.width && component.width(cfg.width/2);
	cfg.height && component.height(cfg.height/2);
	cfg.bg && component.css('backgroundImage','url('+cfg.bg+')');
	cfg.css && component.css(cfg.css);
	if(cfg.center === true){
		component.css({
			 marginLeft:(cfg.width/4 * -1)+'px',
			 left:'50%'
		})
	}
	component.on('onLoad',function(){
		var timeid = setTimeout(function(){
			clearTimeout(timeid);
			component.addClass(cls+'_load').removeClass(cls+"_leave");
		    cfg.animateIn && component.animate(cfg.animateIn);
		},cfg.delay||0);
	});
	component.on('onLeave',function(){
		var timeid = setTimeout(function(){
			clearTimeout(timeid);
			component.addClass(cls+'_leave').removeClass(cls+"_load");
		    cfg.animateOut && component.animate(cfg.animateOut);
		},cfg.delay||0);
		
	});
	//....自定义的参数还有很多
	if(cfg.relativeTo){
		 (
			function(name){
					var parentEle = $('.h5_component_name_'+name);
				    parentEle.length && parentEle.append(component);
		    }
		)(cfg.relativeTo);
		return false;
	}
	return component;
}
