/* 柱图组件对象 */

var H5ComponentPolyline =function ( name, cfg ) {
    var component =  new H5ComponentBase( name ,cfg );

    //  绘制网格线 - 背景层
    var w = cfg.width;
    var h = cfg.height;
    var horizontalLine = 10;//水平横线的条数
    var scalSize = 1.5;

    //  加入一个画布（网格线背景）
    /*
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = ctx.width = w;
    canvas.height = ctx.height =h;
    component.append(canvas);
    var bg = new Image();
    bg.src = '../imgs/bg.png';
    bg.style.display = 'none';
    bg.onload=function(){
    	canvas.drawImage(bg,0,0,w,h);
    }
    document.body.appendChild(bg);*/
    
    
    //  加入一个画布（网格线背景）
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = ctx.width = w;
    canvas.height = ctx.height =h;
    component.append(canvas);
    //绘制背景方框
    //首先绘制水平网格线
    var step = 10;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#c0c8d7";

    ctx.moveTo(0,h);
    ctx.lineTo(w,h);
    for(var i=0;i<horizontalLine;i++){
        var y = (h/horizontalLine)*i;
        ctx.moveTo(0,y);
        ctx.lineTo(w,y);
    }
    //垂直的网格线根据项目的个数去分配
    step = cfg.data.length+1;
    //计算出文字的宽度 去掉小数点
    var text_w = w/step >> 0;
    for (var j=0;j<step+1;j++){
        var x = (w/step)*j;
        ctx.moveTo(x,0);
        ctx.lineTo(x,h);
        //这里还要进行下标的标注
        if(cfg.data[j]){
            var text = $("<div class='text'>");
            text.text(cfg.data[j][0]);
            text.css('width',text_w/2)
                .css('left',(x/2-text_w/4)+text_w/2);
            component.append(text);
        }
    }
    ctx.stroke();
    //加入画布和数据层
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
    	
    	ctx.clearRect(0,0,w,h);
       //首先我们来画点
        ctx.beginPath();
        ctx.lineWidth = 3 ;
        ctx.strokeStyle="#ff725f";

        var x =0,y =0;
        
        var row_w = (w/(cfg.data.length+1));
        for (var i in cfg.data){
            var item = cfg.data[i];
            var x = row_w *i +row_w;
            var y = h - (h*item[1]*per);
            ctx.moveTo(x,y);
            ctx.arc(x,y,5,0,2*Math.PI);
        }
        //现在开始连线
        //首先移动到第一个点的位置
        ctx.moveTo(row_w,h - (h*cfg.data[0][1]*per));
        for (var i in cfg.data){
            var item = cfg.data[i];
            var x =  row_w *i +row_w;
            var y = h - (h*item[1]*per);
            ctx.lineTo(x,y);
        }
        //这里要绘制背景填充了
        ctx.lineWidth = 1 ;
        
        //绘制阴影背景
        
        ctx.lineTo(x,h);
        ctx.lineTo(row_w,h);
        ctx.fillStyle = 'rgba(255, 102, 102, 0.5)';
        ctx.fill();
        //最后一步写入数据以及添加动画效果
        for(var i in cfg.data){
            var item = cfg.data[i];
            var x = row_w *i +row_w;
            var y = h - (h*item[1]*per);
            var percent =((item[1])*100)>>0;
            ctx.font="16px Microsoft Yahei";
            ctx.fillStyle = item[2] ? item[2] : '#000000';
            ctx.fillText(percent+"%",x-10,y-10);
            ctx.moveTo(x,y);
        }
        ctx.stroke();
    };
    
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
