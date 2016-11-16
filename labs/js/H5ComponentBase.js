var H5ComponentBase = function(name,cfg){
  cfg = cfg || {};
  cfg = $.extend({
     type:'base',
     uint:'px'//默认采用px 像素进行计算
  },cfg);
  //定义组件id
  this.id = 'h5_c_'+(Math.random()*1000).toString().replace('.','_');
  //定义组件class
  this.cls = 'h5_component_'+cfg.type;
  //定义组件名称
  this.name = 'h5_component_name_'+cfg.name;
  //定义组件
  var component = $('<div class="h5_component '+this.cls+' '+this.name+'" id="'+this.id+'" />');
  //根据组件cfg进行下面操作
  cfg.text && component.text(cfg.text);
  //如果是html
  cfg.html && component.html(cfg.html);
  //如果有背景、
  cfg.bg && component.css({backgroundImage:cfg.bg});
  //如果有宽度和高度 这个是可以支持rem的
  cfg.width && component.css({width:cfg.width+cfg.uint});
  cfg.height && component.css({height:cfg.height+cfg.uint});
  //如果居中
  if(cfg.center){
     component.css({
       marginLeft:(cfg.width/2*-1)+cfg.uint,
       left:'50%'
     })
  }
  //如果此时还定义了其它的css样式
  cfg.css && component.css(cfg.css);
  //保存当前this
  var _this = this;
    //这里我们要新增一个参数用来加载页面中的html模板
    if(cfg.tpls){
        cfg.tpls.forEach(function(tpl,index,tps){

            component.append($(tpl).css({'visibility':'visible','overflow':'visible'}));

        });
    }
  //这里添加侦听函数 进入和离开
  component.on('onLeave',function(){
         var timeout = setTimeout(function(){
               clearTimeout(timeout);
               //添加移入还是移出的样式
               component.addClass(this.name+'_leave').removeClass(this.name+'_load');
               //如果有动画那么就执行动画
               cfg.animateOut && component.transition(cfg.animateOut,500,'easeOutQuad');
               //进行动画
         }.bind(_this),cfg.delay||0);
  })

  component.on('onLoad',function(){
    var timeout = setTimeout(function(){
          clearTimeout(timeout);
          //添加移入还是移出的样式
          component.addClass(this.name+'_load').removeClass(this.name+'_leave');
          //如果有动画那么就执行动画
          cfg.animateIn && component.transition(cfg.animateIn,500,'easeOutQuad');
          //进行动画
    }.bind(_this),cfg.delay||0);
  })

  return component;
}
