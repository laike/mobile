/**
 * Created by Administrator on 2014/10/31.
 */

define(["jquery","velocity","velocity-ui","jquery-ui"],function($,Velocity,$UI){

    function Window(){
         this.id = 'window_'+(Math.random(9999)+1502654).toString().replace('.','_');
         this.cfg = {
             width:350,
             height:400,
             title:'提示信息',
             content:'弹出框内容！',
             skinClassName:'window_skin_a',
             hasCloseBtn:false,//是否显示关闭按钮
             okText:'确定',
             cancleText:'取消',
             showBtns:true,
             hasMask:true,
             dragHandler:'.window_box_title',
             isDraggable:true,//是否可以拖动
             close:function(){},//默认close回调函数
             ok:function(){},//点击确定后的回调函数
             cancel:function(){},//点击取消后的回调函数
             confirm:function(){},//prompt框以后执行的回调函数
         }
         //增加一个事件字典
         this.handlers = {};
    }
    Window.prototype={
        //这里我们需要两个函数一个是on 一个是fire
        on:function(type,handler){
            if(typeof this.handlers[type] === 'undefined'){
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
            return this;
        },
        fire:function(type,data){
               if(this.handlers[type] instanceof  Array){
                   var handlers = this.handlers[type];
                   var i =0;
                   var len = handlers.length;
                   for(;i<len;i++){
                       handlers[i](data);
                   }
               }
        },
        throtle:function(fn,delay){
            var _self = fn,timer,firstTime=true;
            return function(){
                var args =arguments,
                    _me  = this;
                if(firstTime){
                    _self.apply(_me,args);
                    return firstTime = false;
                }
                if(timer){
                    return false;
                }
                timer = setTimeout(function(){
                    clearTimeout(timer);
                    timer = null;
                    _self.apply(_me,args);
                },delay||500);//默认500毫秒延迟
            }
        },
        alert:function(cfg){
            var _this = this;
            var CFG = $.extend(this.cfg,cfg);
            //为了整个浏览器进行resize 或者移动端进行横屏竖屏的时候dom元素调整位置的性能需要一个函数节流 使用了闭包
            window.onresize=this.throtle(function(){
                if(boundingBox){
                    boundingBox.velocity({
                        left:(CFG.x||(window.innerWidth-CFG.width)/2)+'px',
                        top:(CFG.y||(window.innerHeight-CFG.height)/2)+'px'
                    });
                }
            },500);
            var boundingBox = $('<div class="window_box"></div>').css({opacity:0});
            boundingBox.attr('id',this.id);
            boundingBox.appendTo(document.body);
            var title = $('<h2 class="window_box_title"></h2>');
            CFG.title && title.html(CFG.title);
            var closebtn = $('<span class="window_box_close"> <i class="fa fa-times" aria-hidden="true"></i> </span>');
            var container = $('<div class="window_box_content "> </div>');
            container.html(CFG.content);
            var footer = $('<div class="window_box_footer tc"></div>');
            var btn = $('<button class="btn btn-success"><span>'+CFG.okText+'</span></button>');
            btn.click(function(){
                CFG.ok&&CFG.ok();
                boundingBox.velocity("reverse",function(){
                    boundingBox.remove();
                });
            });
            closebtn.click(function(){
                CFG.close && CFG.close();
                boundingBox.velocity("reverse",function(){
                    boundingBox.remove();
                });
            }.bind(_this));
            footer.append(btn);
            boundingBox.append(title);
            if(CFG.hasCloseBtn){
                boundingBox.append(closebtn);
            }

            boundingBox.append(container);
            boundingBox.append(footer);

            boundingBox.velocity({
                width:CFG.width+'px',
                height:CFG.height+'px',
                left:(CFG.x||(window.innerWidth-CFG.width)/2)+'px',
                top:(CFG.y||(window.innerHeight-CFG.height)/2)+'px',
                opacity:1
            });
        },
        prompt:function(){

        },
        confirm:function(cfg){
            var _this = this;
            var CFG = $.extend(this.cfg,cfg),mask=null;
            //为了整个浏览器进行resize 或者移动端进行横屏竖屏的时候dom元素调整位置的性能需要一个函数节流 使用了闭包
            if(CFG.hasMask){
                mask = $('<div class="window_box_mask"></div>');
                mask.appendTo(document.body);
            }
            window.onresize=this.throtle(function(){
                boundingBox.velocity({
                    left:(CFG.x||(window.innerWidth-CFG.width)/2)+'px',
                    top:(CFG.y||(window.innerHeight-CFG.height)/2)+'px'
                });
            },500);
            var boundingBox = $('<div class="window_box"></div>').css({opacity:0});
            boundingBox.attr('id',this.id);
            boundingBox.appendTo(document.body);

            var title = $('<h2 class="window_box_title"></h2>');
            CFG.title && title.html(CFG.title);

            var closebtn = $('<span class="window_box_close"> <i class="fa fa-times" aria-hidden="true"></i> </span>');
            var container = $('<div class="window_box_content"> </div>');
            container.html(CFG.content);
            var footer = $('<div class="window_box_footer"></div>');
            var btn_ok = $('<button class="btn btn-success"><span>'+CFG.okText+'</span></button>');
            if(CFG.ok){
                this.on('ok',CFG.ok);
            }
            if(CFG.cancel){
                this.on('cancel',CFG.cancel);
            }
            if(CFG.close){
                this.on('close',CFG.close);
            }
            btn_ok.click(function(){
                this.fire('ok');
                boundingBox.velocity("reverse",function(){
                    boundingBox.remove();
                });
                mask.velocity('fadeOut',function(){
                    mask.remove();
                });
            });
            var btn_cancel = $('<button class="btn btn-warning"><span>'+CFG.cancleText+'</span></button>');
            btn_cancel.click(function(){
                this.fire('cancel');
                boundingBox.velocity("reverse",function(){
                    boundingBox.remove();
                });
                mask.velocity('fadeOut',function(){
                    mask.remove();
                });
            });
            closebtn.click(function(){
                this.fire('close');
                boundingBox.velocity("reverse",function(){
                    boundingBox.remove();
                });
                mask.velocity('fadeOut',function(){
                    mask.remove();
                });
            }.bind(_this));
            if(CFG.skinClassName){
                boundingBox.addClass(CFG.skinClassName);
            }
            footer.append(btn_ok);
            footer.append(btn_cancel);
            boundingBox.append(title);
            if(CFG.hasCloseBtn){
                boundingBox.append(closebtn);
            }
            boundingBox.append(container);
            if(CFG.showBtns){
                boundingBox.append(footer);
            }
            //是否可以拖动
            if(CFG.isDraggable){
                boundingBox.draggable({cursor: "move",revert: false,handle:CFG.dragHandler,containment:'.window_box_mask'});
            }
            boundingBox.velocity({
                width:CFG.width+'px',
                height:CFG.height+'px',
                left:(CFG.x||(window.innerWidth-CFG.width)/2)+'px',
                top:(CFG.y||(window.innerHeight-CFG.height)/2)+'px',
                opacity:1
            });
            return this;
        }
    }

    return {
        Window:Window
    };

});