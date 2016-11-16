/**
 * Created by Administrator on 2014/10/31.
 */

define(["widget","jquery","velocity","velocity-ui","jquery-ui"],function(widget,$,Velocity,$UI){

    function Window(){
         this.id = 'window_'+(Math.random(9999)+1502654).toString().replace('.','_');
         this.widgetInfo = {
            fileName   : "window",
            version    : "1.0.0",
            author     : "windKe",
            createTime : "2016 10 5",
            updateTime : "2016 11 2"
         };
         this.cfg = {
             width:350,
             height:400,
             title:'提示信息',
             content:'弹出框内容！',
             skinClassName:'window_skin_a',
             maxlenth:20,//最大限制20个字
             inputype:'text',//prompt输入框的类型 可以是 password number date text 默认text类型
             hasCloseBtn:true,//是否显示关闭按钮
             okText:'确定',
             cancleText:'取消',
             showBtns:true,
             hasMask:true,
             dragHandler:'.window_box_title',
             isDraggable:true,//是否可以拖动
             isresponsive:false,//是否是自适应的窗口
             basefontsize:20,//默认的浏览器字体大小
             close:function(){},//默认close回调函数
             ok:function(){},//点击确定后的回调函数
             cancel:function(){},//点击取消后的回调函数
             confirm:function(){},//prompt框以后执行的回调函数
             minsize:525,//当敞口这个宽度的时候会进行80%显示窗口
             isFullScreen:false,
             callback:function(data){}//默认ajax处理函数
         }
    }
    Window.prototype= $.extend({},new widget.Widget(),{
        renderUI:function(){
            this.boundingBox = $('<div class="window_box"></div>').css({opacity:0});
            this.boundingBox.attr('id',this.id);
            this.boundingBox.appendTo(document.body);

            var title = $('<h2 class="window_box_title"></h2>');
            this.cfg.title && title.html(this.cfg.title);
            this.boundingBox.append(title);
            var closebtn = $('<span class="window_box_close"> <i class="fa fa-times" aria-hidden="true"></i> </span>');
            var container = $('<div class="window_box_content"> </div>');
            container.html(this.cfg.content)
            var footer = $('<div class="window_box_footer"></div>');
            var btn_ok = $('<button class="btn btn-success"><span>'+this.cfg.okText+'</span></button>');
            var btn_cancel = $('<button class="btn btn-warning"><span>'+this.cfg.cancleText+'</span></button>');

            switch (this.cfg.winType){
                case 'common':
                    break;
                case 'alert':
                    footer.append(btn_ok);
                    break;
                case 'prompt':
                    var prompt_input=$('<div class="ctr-item tc"><input class="prompt_input" type="'
                    +(this.cfg.inputype? "password":"text")
                    +'" value="" maxlength="'+this.cfg.maxlenth
                    +'"/></div>');
                    prompt_input.appendTo(container);

                    footer.append(btn_ok);
                    footer.append(btn_cancel);

                    break;
                case 'confirm':
                    footer.append(btn_ok);
                    footer.append(btn_cancel);
                    break;
            }

            if(this.cfg.hasCloseBtn){
                this.boundingBox.append(closebtn);
            }
            this.boundingBox.append(container);
            if(this.cfg.showBtns){
                this.boundingBox.append(footer);
            }

            if(this.cfg.hasMask){
                this.mask = $('<div class="window_box_mask"></div>');
                this.mask.appendTo(document.body);
            }
            this.prompt_input = this.boundingBox.find('.prompt_input');
        },
        bindUI:function(){
            var _this = this;
            //绑定resize事件
            //为了整个浏览器进行resize 或者移动端进行横屏竖屏的时候dom元素调整位置的性能需要一个函数节流 使用了闭包
            window.onresize=this.throtle(function(){

                if(_this.cfg.isresponsive){
                    _this.boundingBox.velocity({
                        left:(_this.cfg.x||(window.innerWidth/_this.cfg.basefontsize-_this.cfg.width/_this.cfg.basefontsize)/2)+'rem',
                        top:(_this.cfg.y||(window.innerHeight/_this.cfg.basefontsize-_this.cfg.height/_this.cfg.basefontsize)/2)+'rem',
                        opacity:1
                    });
                }else{
                    if(window.innerWidth<_this.cfg.minsize){
                        _this.boundingBox.velocity({
                            width:'80%',
                            height:'80%',
                            left:'50%',
                            top:'50%',
                            marginLeft:'-45%',
                            marginTop:'-40%',
                            opacity:1
                        });
                    }else{
                        _this.boundingBox.velocity({
                            width:_this.cfg.width+'px',
                            height:_this.cfg.height+'px',
                            left:(_this.cfg.x||(window.innerWidth-_this.boundingBox.outerWidth())/2)+'px',
                            top:(_this.cfg.y||(window.innerHeight-_this.boundingBox.outerHeight())/2)+'px',
                            opacity:1,
                            margin:0
                        });
                    }

                }
            },500);
            if(this.cfg.ok){
                _this.on('ok',_this.cfg.ok);
            }
            if(this.cfg.cancel){
                _this.on('cancel',_this.cfg.cancel);
            }
            if(this.cfg.close){
                _this.on('close',_this.cfg.close);
            }
            this.boundingBox.delegate('.btn-success','click',function(){
                _this.fire('ok');
                _this.destroy();
            }).delegate('.btn-warning','click',function(){
                _this.fire('cancel');
                _this.destroy();
            }).delegate('.window_box_close','click',function(){
                _this.fire('close');
                _this.destroy();
            });
            //如果有callback
            if(this.cfg.callback){
                this.cfg.callback(this.boundingBox);
            }
        },
        syncUI:function(){
            //是否可以拖动
            if(this.cfg.isDraggable){
                this.boundingBox.draggable({cursor: "move",revert: false,handle:this.cfg.dragHandler,containment:'.window_box_mask'});
            }
            if(this.cfg.skinClassName){
                this.boundingBox.addClass(this.cfg.skinClassName);
            }
            if(this.cfg.isresponsive){
                this.boundingBox.velocity({
                    width:this.cfg.width/this.cfg.basefontsize+'rem',
                    height:this.cfg.height/this.cfg.basefontsize+'rem',
                    left:(this.cfg.x||(window.innerWidth/this.cfg.basefontsize-this.cfg.width/this.cfg.basefontsize)/2)+'rem',
                    top:(this.cfg.y||(window.innerHeight/this.cfg.basefontsize-this.cfg.height/this.cfg.basefontsize)/2)+'rem',
                    opacity:1
                });
            }else{
                if(window.innerWidth<this.cfg.minsize){
                    this.boundingBox.velocity({
                        width:'80%',
                        height:'80%',
                        left:'50%',
                        top:'50%',
                        marginLeft:'-45%',
                        marginTop:'-40%',
                        opacity:1
                    });
                }else{
                    this.boundingBox.velocity({
                        width:this.cfg.width+'px',
                        height:this.cfg.height+'px',
                        left:(this.cfg.x||(window.innerWidth-this.cfg.width-20)/2)+'px',
                        top:(this.cfg.y||(window.innerHeight-this.cfg.height-10)/2)+'px',
                        opacity:1,
                        margin:0
                    });
                }

            }



        },
        destroy:function(){
            this.destructor();
            this.boundingBox.off();
        },
        destructor:function(){
             var _this = this;
             //移除遮罩
             this.mask &&  this.mask.velocity('fadeOut',function(){_this.mask.remove();});
             //进行动画效果消失后然后移除这个dom
             this.boundingBox.velocity("reverse",function(){
                 _this.boundingBox.remove();
             });
        },
        common:function(cfg){
            $.extend(this.cfg, cfg, {winType: "common"});
            this.render();
            return this;
        },
        alert:function(cfg){
            $.extend(this.cfg,cfg,{winType:'alert'});
            this.render();
            return this;//进行链式调用
        },
        prompt:function(cfg){
            $.extend(this.cfg,cfg,{winType:'prompt'});
            this.render();
            this.prompt_input.focus();
            return this;//进行链式调用
        },
        confirm:function(cfg){
            $.extend(this.cfg,cfg,{winType:'confirm'});
            this.render();
            return this;//进行链式调用
        }
    });

    return {
        Window:Window
    };

});