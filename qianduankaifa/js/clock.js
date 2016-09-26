/**
 * Created by Administrator on 2016/7/29.
 */
var Clock = function(container,width,height){
    container = container ? container :document.body;
    width = width ? width : 450;
    height = height ? height : 450;
    var clock = document.createElement('canvas');
    var id = 'ed-clock_'+(Math.random().toString()).replace('.','_');
    var ctx = clock.getContext('2d');
    ctx.width=clock.width = width ;
    ctx.height=clock.height = height ;
    container.appendChild(clock);
    function drawClock(){
        //首先清除画布
        ctx.clearRect(0,0,width,height);
        //拿到当前时间
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() +1;
        var date = now.getDate();
        var week = now.getDay();//一周中的第几天

        var hour = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        //小时和分钟的关系
        var hours = hour + (minutes/60);
        //将24小时制转换成12小时制
        var hours = hours > 12 ? hours - 12 : hours;
        //这里开始花园
        ctx.beginPath();
        ctx.fillStyle = '#eee';
        ctx.strokeStyle = '#373737';
        ctx.lineWidth = 15;
        ctx.arc((width/2),(height/2),120,0,2*Math.PI,false);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        //画刻度
        //时针刻度
        for (var i = 0; i < 12; i++) {
            scale(-95, -110, 30, 3, i);
        }
        //分针刻度
        for (var i = 0; i < 60; i++) {
            scale(-100, -110, 6, 1, i);
        }
        //绘制时针
        pin(-60, 20, 7, 'black', hours, 30);

        //绘制分针
        pin(-80, 20, 5, 'black', minutes, 6);

        //绘制秒针
        pin(-90, 20, 3, 'red', seconds, 6);
        //生成数字
        createNum();
        //画数字
        showTime(year,month,date,week,hours,minutes,seconds);

    }
    //绘制刻度
    function scale(y1,y2,angle,w,i){
        //保存当前图形状态
        ctx.save();
        //设置时针刻度样式
        ctx.lineWidth = w;
        ctx.strokeStyle = '#000';
        //设置时针初始位置
        ctx.translate(width/2,height/2);
        ctx.rotate((i*angle)*Math.PI/180);
        //设置路径状态
        ctx.beginPath();
        ctx.moveTo(0,y1);
        ctx.lineTo(0,y2);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();//恢复当前图形状态
    }
    //绘制钟表的针
    function pin(y1,y2,w,color,time,angle){
        //保存当前图形
        ctx.save();
        //设置时钟的样式
        ctx.lineWidth = w;
        ctx.strokeStyle = color;
        //设置起始状态
        ctx.translate(width/2,height/2);
        ctx.rotate((time * angle) * Math.PI / 180); //弧度转角度
        ctx.beginPath();
        ctx.moveTo(0,y1);
        ctx.lineTo(0,y2);
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        if(width ===3){
            overlap();//绘制交叉点
        }
        ctx.restore();
    }
    //绘制交叉点
    function overlap(){
        //画交叉点
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, -70, 5, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.stroke();
    }
    //生成数字
    function createNum(){
        for(var i=0;i<12;i++){
            ctx.save();
            ctx.translate(width/2,height/2);
            ctx.rotate(-(i*29.5)*Math.PI/180);
            ctx.font = '20px arial';
            ctx.fillStyle = '#000';
            ctx.fillText(12-i,-10,-70);
            ctx.restore();
        }
    }
    //显示时间
    function showTime(y,m,d,w,h,min,s){
        var arrWeek = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
        ctx.save();
        ctx.translate(width/2,height/2);
        ctx.font = '35px arial';
        ctx.fillStyle = '#000';
        ctx.strokeStyle = '#000';
        ctx.fillText(y+'年'+m+'月'+d+'日'+arrWeek[w],-180,-170);
        ctx.restore();
    }
    //用于时间补零
    function ad(str){
        return str < 10 ? '0'+str : ''+str;
    }
    //启动时钟
    setInterval(drawClock,1000);

}