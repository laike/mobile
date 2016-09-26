/* 雷达图组件对象 */
var H5ComponentPolyline =function ( name, cfg ) {
    var component =  new H5ComponentBase( name ,cfg );

    //  绘制网格线 - 背景层
    var w = cfg.width;
    var h = cfg.height;

    //  加入一个画布（网格线背景）
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = ctx.width = w;
    canvas.height = ctx.height =h;
    component.append(canvas);
    var r = w/2;
    ctx.lineWidth = 1;
    ctx.strokeStyle="rgba(0,0,0,0)";

    ctx.beginPath();
    ctx.arc(r,r,5,0,2*Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(r,r,r-5,0,2*Math.PI);
    ctx.stroke();
    var step = cfg.data.length;
    //计算一个圆周上的坐标（计算多边形的顶点坐标）
    //已知：圆心坐标(a,b) 、半径、角度deg
    //rad = (2 * Math.PI/360)*(360/step);
    //x = a + Math.sin(rad) *r;
    //y = b + Math.cos(rad) *r;
    //这里需要封装一个函数 ，在老师讲的时候注意使用设计模式和封装思维来封装代码
    /***
     * 绘制内部多边形函数
     * @param radius 半径
     * @param filltype 填充颜色
     */
    function drawFiveShape(radius,filltype,fn){
        filltype = filltype ? filltype : '#333333';
        radius = radius ? radius : r;
        ctx.fillStyle = filltype;
        ctx.beginPath();
        for (var i=0; i<step;i++){
            var rad = (2 * Math.PI/360)*(360/step)*i;
            var x = r + Math.sin(rad) *radius;
            var y = r + Math.cos(rad) *radius;
            //ctx.arc(x,y,5,0,2*Math.PI);
            // ctx.moveTo(r,r);
            if(fn) {
                //请注意这里使用了apply 因为纵观整个项目这个地方经常变动
                //所以单独提出来 让一个函数来进行执行
                fn.apply(this,[x,y]);
            }
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    //绘制十份
    var isblue = false;
    for (var s =10;s>0;s--){
          var fillcolor = (isblue = !isblue) ? "#99c0ff" : "#f1f9ff";
          drawFiveShape(r*(s/10),fillcolor,function(x,y){
              ctx.lineTo(x,y);
          });
    }
    //绘制散骨图
    /*
    for (var i =0;i<step;i++){
        drawFiveShape(r,'#000000',function(x,y){
            ctx.moveTo(r,r);
            ctx.lineTo(x,y);
        });
    }*/
    //  加入一个数据层
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = ctx.width = w;
    canvas.height = ctx.height =h;
    component.append(canvas);
    /**
     * 绘制折现以及对应的数据和阴影
     * @param  {floot} per 0到1之间的数据，会根据这个值绘制最终数据对应的中间状态
     * @return {DOM}     Component元素
     */
    var draw = function(per){
    	   if(per <= 1){
		        component.find('.text').css('opacity',0);
		    }
		    if(per >= 1){
		        component.find('.text').css('opacity',1);
		    }
           ctx.clearRect(0,0,w,h);
           ctx.strokeStyle = '#ff0000';
           ctx.beginPath();
           for (var i=0;i<step;i++){
               var rad = (2 * Math.PI/360)*(360/step)*i;
               rate = cfg.data[i][1]*per;
               var x = r + Math.sin(rad) *r*rate;
               var y = r + Math.cos(rad) *r*rate;
               ctx.lineTo(x,y);
           }
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = '#ff7676';
        for (var i=0;i<step;i++){
            var rad = (2 * Math.PI/360)*(360/step)*i;
            rate = cfg.data[i][1]*per;
            var x = r + Math.sin(rad) *r*rate;
            var y = r + Math.cos(rad) *r*rate;
            ctx.beginPath();
            ctx.arc(x,y,5,0,2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    };

    var perRateAngle = 360/step;
    function drawDataText(){
        //最后一步写入数据以及添加动画效果
        for (var i=0; i<step;i++){
            var rad = (2 * Math.PI/360)*(360/step)*i;
            var x = r + Math.sin(rad) *r;
            var y = r + Math.cos(rad) *r;
            var item = cfg.data[i];
            var text = $('<div class="text"/>');
            text.css('transition','all .5s '+ i*.1 + 's');
            text.text(item[0]);
            x > w/2 ? text.css('left',x/2) :text.css('right',(w-x)/2) ;
            y > h/2 ? text.css('top',y/2) : text.css('bottom',(h-y)/2);
            component.append(text);
           
        }

    }
    drawDataText();
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
