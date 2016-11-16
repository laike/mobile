/**
 * TimeLine
 * Author:lk
 * Version:3.2.0
 * url: http://www.smohan.net/lab/smohan_timeline.html
 * 使用请保留以上信息
 */
define(["widget","jquery","velocity","velocity-ui"],function(widget,$,Velocity){

    function TimeLine(){
        this.id = 'timeline_'+(Math.random(9999)+1502654).toString().replace('.','_');
        this.version = '1.0.0 beta';
        //时间轴默认参数
        this.cfg = {
            item:'.item',
            margin:120,//左右之间的间距
            top:20,//距离上一个item的间距
            minTop:10,//如在手机下面显示,可以将上下间距适当缩小
            resize:true,//是否监听窗口变化
            minScreen:640,//当窗口小于640时单列显示
            animation:true,//是否有动画效果 默认为真
            id:'#timeline1',//id容器
            container:'.timeline-container'
        }
    }
    TimeLine.prototype = $.extend({},new widget.Widget(),{
        renderUI:function(){

            this.boundingBox = $(this.cfg.id).length > 0 ? $(this.cfg.id) : null;
            if(this.boundingBox === null){
                //抛出错误
                throw (new Error('无法获取id容器！'));
                return;
            }
            this.items = this.boundingBox.find(this.cfg.item);
            this.size = this.items.length;
            this.isMinScreen = false;
            //this.boundingBox.velocity('fadeIn',1000);
            var _this = this,i= 0,width=this.boundingBox.width(),heightArr=[];//用于存储每列中的所有块框相加的高度
            this.isMinScreen = (width <= this.cfg.minScreen);
            //计算item宽度
            var itemWidth = (width-this.cfg.margin)/2;
            //创建line
            var line = $('.line');
            if(!line.length){
                var line = $('<div class="line"></div>');
                this.boundingBox.append(line);
            }
            //获取方向
            /**
             * 获取方向
             * @param index
             * @returns {string}
             */
            var isDirection = function (index) {
                return (Math.round(index * (itemWidth + _this.cfg.margin)) === 0) ? 'isLeft' : 'isRight';
            };
            //循环item
            this.items.each(function(index,item){
                var point = $(item).find('.point'),corner = $(item).find('.corner');
                $(item).removeClass('isLeft isRight');
                if(!point.length){
                   $(item).append($('<span class="point"></span>'));
                }
                if(!corner.length){
                    $(item).append($('<span class="corner"></span>'));
                }
                //全屏模式不显示pointer和corner以及line
                if(_this.cfg.resize && _this.isMinScreen){
                    $('.line').hide();
                    $(item).find('.point,.corner').hide();
                    //设置item的大小
                    $(item).css({
                        position:'static',
                        float:'none',
                        top:0,
                        left:0,
                        marginTop:_this.cfg.minTop,
                        overflow:'visible',
                        visibility:'visible',
                        width:'100%'
                    });
                }else{
                    //如果不是全屏状态那么
                    var top= 0,left= 0;
                    //设置item的大小
                    $(item).css({
                        position:'absolute',
                        margin:0,
                        padding:0,
                        overflow:'visible',
                        visibility:'visible',
                        width:itemWidth+'px'
                    });
                    $('.line').show();
                    $(item).find('.point,.corner').show();
                    var height = $(item).height(),pointWidth = $(item).find('.point').width(),pointLeft=0;
                    //前两个item 元素
                    if(index < 2){
                        heightArr[index] = height;
                        top=0;
                        left = index*(itemWidth+_this.cfg.margin);
                        $(item).addClass(isDirection(index));
                        pointLeft = isDirection(index) == 'isLeft' ? Math.round((_this.cfg.margin-pointWidth)/2+itemWidth) :-Math.round((_this.cfg.margin+pointWidth)/2);
                    }else{
                         var minH = Math.min.apply(null,heightArr);//数组中的最小值minH
                         var minIndex = heightArr.indexOf(minH);
                         heightArr[minIndex] += height + _this.cfg.top;
                        top = minH + _this.cfg.top;
                        left = minIndex * (itemWidth + _this.cfg.margin);
                        $(item).addClass(isDirection(minIndex));
                        pointLeft = isDirection(minIndex) == 'isLeft' ? Math.round((_this.cfg.margin-pointWidth)/2+itemWidth) :-Math.round((_this.cfg.margin+pointWidth)/2);
                    }
                    //从新设置item的css 样式
                    $(item).css({
                        float:'left',
                        left:left+'px',
                        top:top+'px'
                    });
                    $(item).find('.point').css({
                        position:'absolute',
                        left:pointLeft+'px'
                    });
                }
            });

            if(!_this.isMinScreen || !_this.cfg.resize){
                var maxHeight = Math.max.apply(null,heightArr);
                this.boundingBox.css({
                    height:(heightArr[heightArr.indexOf(maxHeight)] + 60)+'px'
                });
            }else{
                this.boundingBox.css({
                    height:'auto'
                });
            }
            this.boundingBox.css({
                visibility:'visible',
                overflow:'visible'
            });
            var lineWidth = $('.line').width();
            $('.line').css({
                position:'absolute',
                left:'50%',
                marginLeft:(-lineWidth/2)+'px',
                height:'100%'
            });


        },

        bindUI:function(){

        },
        syncUI:function(){
            var _this = this;
            if(this.cfg.resize){
                window.onresize=this.throtle(function(){
                    _this.render(_this.cfg.container);//重新渲染
                },1000);
            }
        },
        destructor:function(){

        },
        //这里我们需要顶一个方法
        timeline:function(cfg){
            $.extend(this.cfg,cfg,{type:'default'});
            this.render(this.cfg.container);//渲染
            return this;//支持链式调用
        }
    });

    //暴露出去
    return {
        TimeLine:TimeLine
    };

});