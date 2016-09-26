/**
 * Created by Administrator on 2016/7/12.
 */

var Canvas = function(options){
    return Canvas.prototype.init(options);
}
Canvas.prototype={
    _extend:function(o,p){
          o = o ? o : {};
          for (prop in p) {
              if ({}.hasOwnProperty.call(p, prop)) {
                  o[prop] =p[prop];
              }
          }
          return o;
    },
    init:function(options){
        options = this._extend({
              id:'#canvas'
        },options);
        this.canvas = document.querySelector(options.id);
        this.ctx = this.canvas.getContext('2d');
        this.ctx.width = this.canvas.width;
        this.ctx.height =this.canvas.height;
        return this;
    },
    draw:function(){
        
    },
    redraw:function(){

    },
    /**
     *绘制规则的多边形
     * @param c
     * @param n 多边形数量
     * @param x 中心的x
     * @param y 中心的y
     * @param r 半径r
     * @param angle  将第一个顶点放置在最上面或者指定一定的这个angle角度
     * @param counterclockwise 是否逆时针旋转
     * @returns {Canvas}
     */
    polygon:function(opt){
         opt = this._extend({
             n:4,
             r:50,
             angle:0,
             x:this.canvas.width/2,
             y:this.canvas.height/2,
             counterclockwise:true,
             stroke:false,
             fillStyle:'#ccc',
             strokeStyle:'#ff0',
             lineWidth:1
         },opt);
         this.ctx.lineWidth = opt.lineWidth;
         this.ctx.beginPath();
         this.ctx.moveTo(opt.x+opt.r*Math.sin(opt.angle),opt.y-opt.r*Math.cos(opt.angle));
         var delta = 2*Math.PI/opt.n;
         for(var i=1;i<opt.n;i++){
             opt.angle += opt.counterclockwise ? -delta : delta;
             this.ctx.lineTo(opt.x+opt.r*Math.sin(opt.angle),opt.y-opt.r*Math.cos(opt.angle));
         }
         this.ctx.closePath();
         if(opt.fillStyle){
             this.ctx.fillStyle = opt.fillStyle;
             this.ctx.fill();
         }
         if(opt.strokeStyle){
             this.ctx.strokeStyle=opt.strokeStyle;
             this.ctx.stroke();
         }
        return this;
    },
    /***
     * 圆形
     */
    circle:function(opt){
         opt = this._extend({
             r:50,
             x:this.canvas.width/2,
             y:this.canvas.height/2,
             counterclockwise:true,
             fill:true,
             fillStyle:'#ff0000',
             lineWidth:1
         },opt);
         var sAngle = 0;
         var eAngle = 2 * Math.PI;
         this.ctx.lineWidth = opt.lineWidth;
         this.ctx.beginPath();
         this.ctx.arc(opt.x,opt.y,opt.r,sAngle,eAngle,opt.counterclockwise);
         opt.fill ? (this.ctx.fillStyle = opt.fillStyle) : (this.ctx.strokeStyle=opt.fillStyle);
         opt.fill ? this.ctx.fill() : this.ctx.stroke();
         return this;
    },
    /***
     * 菱形
     */
    diamond:function(){

    },
    /***
     * 五边形
     */
    pentagon:function(){

    },
    /***
     * 梯形
     */
    trapezoid:function(){

    },
    /***
     * 三角形
     */
    triangle:function(){

    },
    /***
     * 雪花
     */
    snow:function(){

    }


}
