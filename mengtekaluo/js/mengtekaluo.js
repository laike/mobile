//应用js代码
var app ={};
//初始化轮播器
app.initSlider=function(opt){
   var opts = $.extend({
       container:document.getElementById("mgtl-slide"),
       "height":60,
       "speed":500,
       "autoPlay": 3000, //自动播放
       "loop":true,
       "pageShow":true,
       "pageStyle":'line',
       'dotPosition':'center'
   },opt);
    return new auiSlide(opts);
}
//初始化底部导航 效果等
app.initFooterBar=function(opt){
    var opts = $.extend({
        id:'#footer',
        itemcls:'.aui-bar-tab-item',
        activecls:'.aui-active',
        activebarcls:'.mgtl-footer-navbar',
        effectcls:'ripple-effect',
        duration:3000
    },opt);
    var curNativeBar = $(opts.activebarcls);
    $(opts.activebarcls).css({
        width:$(opts.id).find(opts.itemcls).eq(0).width(),
        bottom:$(opts.id).find(opts.itemcls).eq(0).height()
    });
    $(opts.activebarcls).width()
    curNativeBar.animate({
        left:$(opts.activebarcls).offset().left
    });
    $(opts.id).find(opts.itemcls).click(function(event){

        event = event || window.event;

        var _this = this;
        curNativeBar.stop(true).animate({
            left:$(_this).offset().left
        });
        var xPos = event.pageX-$(_this).offset().left;
        var yPos = event.pageY-$(_this).offset().top;
        var div = $('<div/>');
        div.addClass('ripple-effect');
        var ripple = $(_this).find('.ripple-effect');
        ripple.css("height", $(_this).height());
        ripple.css("width", $(_this).height());
        div.css(
            {
                left:xPos-(ripple.width()/2),
                top:yPos-(ripple.height()/2),
                background:$(_this).data('bgcolor') ? $(_this).data('bgcolor') :'rgba(254,73,2,.6)'
            }
        );
        div.appendTo($(_this));
       setTimeout(function(){
           div.remove();
       },opts.duration);
    });
}
//语言下拉效果
app.initLanguageDownList=function(opt){
    var opts = $.extend({
        cls:'.language',
        triggerele:'.language a:first',
        listcls:'.language-list',
        speed:'slow',
        effect:'swing',
        duration:3000
    },opt);
    var triggerele = $(opts.triggerele);
    var lanList = $(opts.listcls);
    var _timeout = null;
    triggerele.click(function(event){
        event.preventDefault();
        lanList.slideToggle(opts.speed);
    });
}
//初始化ui-select
app.initUiSelect=function(opt){
    var opts = $.extend({
        cls:'.ui-select',
    },opt);
    var _select = $(opts.cls);
    _select.change(function(){
        var _this = this;
        var _span = $(_this).find('span');
        var _curitem = $(_this).find('option:selected');
        _span.html('<i class=\"iconfont icon-'+_curitem.data('icon')+' col-red aui-font-size-20 aui-padded-r-5\"></i>'+_curitem.text());
    });
}
//注册页面初始化验证
app.initRegsiter=function(){
    
}
jQuery(function(){
    app.initSlider();
    app.initFooterBar();
    app.initLanguageDownList();
    app.initUiSelect();
});