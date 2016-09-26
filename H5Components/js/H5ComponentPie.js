/* 饼图组件对象 */
var H5ComponentPie =function ( name, cfg ) {
    var component =  new H5ComponentBase( name ,cfg );

    //  绘制网格线 - 背景层
    var w = cfg.width;
    var h = cfg.height;

    //  加入一个背景层
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = ctx.width = w;
    canvas.height = ctx.height =h;
    canvas.style.zIndex =1;
    component.append(canvas);
    var r = w/2;

    sAngel = 1.5*Math.PI;//十二点钟的位置　
    eAngel = 2*Math.PI;//结束位置
    //这里开始绘图了　
    ctx.beginPath();
　　 ctx.lineWidth = .1;
    ctx.strokeStyle = '#eee';
    ctx.fillStyle = "#eee";
    ctx.arc(r,r,r,0,eAngel);
    ctx.fill();
    ctx.stroke();
    //定义一些个颜色
    var colors = ['red','green','blue','purple','pink','orange','yellow','grey','dark','white'];
    //  加入一个数据层
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = ctx.width = w;
    canvas.height = ctx.height =h;
    canvas.style.zIndex = 2;
　  component.append(canvas);
  　var len = cfg.data.length;
    cfg.data.forEach(function(item,index){
      eAngel = sAngel+2*Math.PI*item[1];
      ctx.beginPath();
  　　ctx.lineWidth = .1;
      ctx.strokeStyle = item[2]?item[2]:colors.pop();
      ctx.fillStyle = item[2]?item[2]:colors.pop();
      ctx.moveTo(r,r);
      ctx.arc(r,r,r,sAngel,eAngel);
      ctx.fill();
      ctx.stroke();
      sAngel = eAngel;
    });
    //  加入一个遮罩层
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = ctx.width = w;
    canvas.height = ctx.height =h;
    canvas.style.zIndex = 3;
　  component.append(canvas);
　　

    /**
     * 绘制折现以及对应的数据和阴影
     * @param  {floot} per 0到1之间的数据，会根据这个值绘制最终数据对应的中间状态
     * @return {DOM}     Component元素
     */
    var draw = function(per){
      ctx.clearRect(0,0,w,h);
      if(per <= 1){
         component.find('.text').css('opacity',0);
     }
      ctx.beginPath();
      ctx.lineWidth = .1;
      ctx.strokeStyle = '#eee';
      ctx.fillStyle = "#eee";
      ctx.moveTo(r,r);
      if(per <= 0){
        ctx.arc(r,r,r,0,2*Math.PI,true);
      }else{
        ctx.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);
      }
      ctx.fill();
      ctx.stroke();
        if(per >= 1){
            component.find('.text').css('opacity',1);
            H5ComponentPie.reSort( component.find('.text') );
            component.find('.text').css('transition','all 1s');
            ctx.clearRect(0,0,w,h);
        }
    };
    draw(0);
    //这里要进行到最重要的一部绘制文本，这里我们先借鉴雷达组建的方法
    function drawDataText(){
        //最后一步写入数据以及添加动画效果
        for (var i=0; i<len;i++){
            var rad = (2 * Math.PI/360)*(360/len)*i;
            var x = r + Math.sin(rad) *r;
            var y = r + Math.cos(rad) *r;
            var item = cfg.data[i];
            var text = $('<div class="text"/>');
            text.css('transition','all .5s '+ i*.1 + 's');
            text.text(item[0]);
            var per = $('<div class="per">');
            var percent = (item[1]*100)>>>0;
            per.text(percent+"'%");
            text.append(per);
            x > w/2 ? text.css('left',x/2) :text.css('right',(w-x)/2) ;
            y > h/2 ? text.css('top',y/2) : text.css('bottom',(h-y)/2);
            component.append(text);
        }

    }
    drawDataText();
    debugger;
    //最后一步添加动画效果
    component.on('onLoad',function(){
        //  折现图生长动画
        var s = 0;
        for( i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                draw(s);
            },i*10+500);
        }
    });
    component.on('onLeave',function(){
        //  折现图退场动画
        var s = 1;
        for( i=0;i<100;i++){
            setTimeout(function(){
                s-=.01;
                draw(s);
            },i*10);
        }
    });
    return component;
}

//  重排项目文本元素
H5ComponentPie.reSort = function( list ){

    //  1. 检测相交
    var compare = function( domA, domB ){

        //  元素的位置，不用 left，因为有时候 left为 auto
        var offsetA = $(domA).offset();
        var offsetB = $(domB).offset();

        //  domA 的投影
        var shadowA_x = [ offsetA.left,$(domA).width()  + offsetA.left ];
        var shadowA_y = [ offsetA.top ,$(domA).height() + offsetA.top ];

        //  domB 的投影
        var shadowB_x = [ offsetB.left,$(domB).width()  + offsetB.left ];
        var shadowB_y = [ offsetB.top ,$(domB).height() + offsetB.top  ];

        //  检测 x
        var intersect_x = ( shadowA_x[0] > shadowB_x[0] && shadowA_x[0] < shadowB_x[1] ) || ( shadowA_x[1] > shadowB_x[0] &&  shadowA_x[1] < shadowB_x[1]  );

        //  检测 y 轴投影是否相交
        var intersect_y = ( shadowA_y[0] > shadowB_y[0] && shadowA_y[0] < shadowB_y[1] ) || ( shadowA_y[1] > shadowB_y[0] &&  shadowA_y[1] < shadowB_y[1]  );
        return intersect_x && intersect_y;
    }


    //  2. 错开重排
    var reset = function( domA, domB ){

        if( $(domA).css('top') != 'auto' ){

            $(domA).css('top', parseInt($(domA).css('top')) + $(domB).height() );
        }
        if( $(domA).css('bottom') != 'auto' ){

            $(domA).css('bottom', parseInt($(domA).css('bottom')) + $(domB).height() );
        }

    }

    //  定义将要重排的元素
    var willReset = [list[0]];

    $.each(list,function(i,domTarget){
        if( compare(willReset[willReset.length-1] , domTarget ) ){
            willReset.push(domTarget);  //  不会把自身加入到对比
        }
    });

    if(willReset.length >1 ){
        $.each(willReset,function(i,domA){
            if( willReset[i+1] ){
                reset(domA,willReset[i+1]);
            }
        });
        H5ComponentPie.reSort( willReset );
    }

}