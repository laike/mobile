
    function _extends(a,b){
        for(var name in b){

            a[name] = b[name];

        }
        return a;
    }

    //继承
    function inherit(p){

        //如果当前浏览器支持Object.create这个方法
        if(Object.create){
            return Object.create(p);
        }
        if(typeof p !== 'object' || typeof p !=='function'){
            throw  new Error('arguments must be object or function');
        }
        function f(){

        };
        f.prototype = p;
        return new f();
    }
    function Timer(){
        //默认参数
        this.cfg = {

        };
    }


    Timer.prototype= _extends(new Widget(),{
        renderUI:function(){
            var canvas = document.createElement('canvas');
            canvas.id = "timecuter";
            canvas.width=1204;
            canvas.height=768;
            document.body.appendChild(canvas);
            var ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.moveTo(100,100);
            ctx.lineTo(700,700);
            ctx.lineTo(100,700);
            ctx.lineTo(100,100);
            ctx.lineWidth=1;
            ctx.fillStyle="rgba(255,0,0,0.5)";
            ctx.fill();
            ctx.strokeStyle='rgba(255,0,0,0.8)';
            ctx.closePath();
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(200,100);
            ctx.lineTo(700,600);
            ctx.strokeStyle="rgba(0,0,0,0.6)";
            ctx.closePath();
            ctx.stroke();
        },
        bindUI:function(){


        },
        syncUI:function(){

        },
        destructor:function(){

        },
        timer:function(cfg){
            $.extend(this.cfg,cfg,{time:2000});
            this.render();
            return this;//进行链式调用
        }
    });


