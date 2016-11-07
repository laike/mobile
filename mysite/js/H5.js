
//这个类是控制页面逻辑的添加页面 添加组件等
var H5 = function(){
   //h5对象id
   this.id = 'h5_'+(Math.random()*100).toString().replace('.','_');
   //h5 容器
   this.ele = $('<div id="'+this.id+'" class="h5"/>');
   //添加到body之中
   $('body').append(this.ele);
   //记录当前页面的page数目 使用数组来进行记录
   this.pages = [];

   //添加组件管理器的几个方法
   //添加新的页面
   this.addPage=function(name,cfg){
     cfg = cfg || {};
     cfg = $.extend({
        text:'这个是一个测试文字'
     },cfg);
     var page = $('<div class="section h5_page" />');
     name && page.addClass('h5_page_'+name);
     cfg.text && page.text(cfg.text);
     this.ele.append(page);
     this.pages.push(page);
     //这里还可以执行其他函数
     return this;
   }
   //向页面中添加组件
   this.addComponent=function(name,cfg){

     var component = null;
     switch(cfg.type){
        case 'base':
        //表示是基本组件
        component = new H5ComponentBase(name,cfg);
        break;
     }
     //如果有其它参数
     var page = this.pages.slice(-1)[0];
     page.append(component);
     return this;
   }
   //进行页面的加载
   this.loader = function(page){
     //初始化fullpage
     this.ele.fullpage({
       onLeave:function(index,nextIndex,direction){
          $(this).find('.h5_component').trigger('onLeave');
       },
       afterLoad:function(anchorLink,index){
          console.log(anchorLink,index);
          $(this).find('.h5_component').trigger('onLoad');
       }
     });
     //启动第一页中的组件动作
     this.pages[0].trigger('onLoad');
     this.ele.fadeIn(800);
     if(page){
        this.ele.fullpage.moveTo(page);
     }

   }
   //如果页面中存在加载函数那么就先执行这个页面加载函数
   this.loader = typeof H5_loading ==='function' ? H5_loading : this.loader;
   //返回对象
   return this;

}
