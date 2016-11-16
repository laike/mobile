//这里我们新增一个音乐播放器
//定义一个用来存储lkmusic的对象
//自用工具库
var whenReady = (function(){
    var ready = false;
    var funcs = [];//存储函数的数组
    function handler(e){
        if(ready) return;
        if(e.type === 'readystatechange' && document.readyState !== 'commplete'){
            return;
        }
        for(var i=0;i<funcs.length;i++){
            funcs[i].call(document);
        }
        //进行标记
        ready  = true;
        funcs = null;//置空
    }
    if(document.addEventListener){
        document.addEventListener('DOMContentLoaded', handler,false);
        document.addEventListener('readystatechange', handler,false);
        window.addEventListener('load',handler,false);
    }else{
        //兼容IE等不支持addEventListener方法的浏览器
        document.attachEvent('onreadystatechange',handler);
        window.attachEvent('onload',handler);
    }
    return function isReady(f){

        if(ready){
            f.call(document);
        }else{
            funcs.push(f);
        }
    }
}());



//当进行loading的时候进行
function loading(){
    //新增loading mask 遮罩
    $('.lk-content').addClass('blur').append('<div class="lk-content-mask"></div>');
    $('.lk-progress').show();
    $('.lk-loading').show();
}
function hideloading(){
    //新增loading mask 遮罩
    $('.lk-content').removeClass('blur').find('.lk-content-mask').remove();
    $('.lk-progress').hide();
    $('.lk-loading').hide();
}
//自定义公共分享函数
function shareSina(type){
    var shareUrl = 'http://v.t.sina.com.cn/share/share.php?';
    switch (type){
        case 'weibo':
            var url = location.href;
            var params =['url=', encodeURIComponent(url), '&title=', encodeURIComponent(window.sharetitle), '&appkey=1895102973', '&pic=', encodeURIComponent(window.shareUrl)].join('');
            shareUrl = 'http://v.t.sina.com.cn/share/share.php?';
            break;
        case 'tencent_weibo':
            shareUrl = 'http://v.t.qq.com/share/share.php?';
            var url = location.href;
            var params =['title=', encodeURIComponent(window.sharetitle), '&url=', encodeURIComponent(url), '&appkey=1105784378','&site=http://laijiadayuan.com', '&pic=', encodeURIComponent(window.shareUrl)].join('');
            break;
        case 'weixin':
            //这里直接return
            //弹出以后窗口
            return;
            break;
        case 'like':
            //直接返回
            //这里进行其它操作，比如ajax进行点赞 以后后台可以做个可以作弊用的
            return;
            break;
        case 'renren':
            shareUrl = 'http://widget.renren.com/dialog/share?';
            var url = location.href;
            var params =['resourceUrl=', encodeURIComponent(url), '&title=', encodeURIComponent(window.sharetitle), '&image=', encodeURIComponent(window.shareUrl),'&charset=UTF-8'].join('');
            break;
    }
    var openShareWindow = function (){
        //如果被阻止的话那么就返回false
        if(!window.open([shareUrl,params].join(''),'share',['toolbar=0,status=0,resizable=1,width=620,height=450,left=',(window.width-630)/2,'top=',(window.width-400)/2])){
            location.href =[shareUrl,params].join('');
        }
    }
    //如果检测到是火狐的话那么我们要进行另外处理
    if (/Firefox/.test(navigator.userAgent)) {
        setTimeout(openShareWindow, 0);
    } else {
        openShareWindow();
    }
}
//修正一下 实现了操作元素样式的操作类classList默认使用原生支持的api 否则使用模拟的api来进行实现
function classList(e){
    if(e.classList){
        //这里需要对classList的原生api进行一下加强
        /*
         DOMTokenList.prototype.adds = function(tokens){
         tokens.split(' ').forEach(function(token){
         this.add(token);
         });
         return this;
         };*/
        return e.classList;
    }//如果原生支持classList这个api那么直接返回
    else return new CSSClassList(e);//否则就伪造一个
}
//CSSClassList 是一个模拟DOMTokenList的javascript类
function CSSClassList(e){
    this.e = e;
}
//如果e.className 包含类名c则返回true；否则返回false
CSSClassList.prototype.contains=function(c){
    if(c.length ===0 || c.indexOf(' ')!==-1){
        throw new Error("invalid class name: '"+c+"'");
    }
    //首先是常规检查
    var classes = this.e.className;
    if(!classes) return false;//e不含类名
    if(classes === c) return true;//e有一个完全匹配的类名
    //否则，把c自身看成一个单词,利用正则表达式搜索
    //\b在正则表达式里面代表单词的边界
    return classes.search('\\b'+c+'\\b') !== -1;
};
//如果c不存在，将c添加到e.className中
CSSClassList.prototype.add = function(c){
    if(this.contains(c)) return;//如果存在就直接返回 不需要再新增一个
    var classes = this.e.className;
    if(classes && classes[classes.length-1] !== ' '){
        c = ' '+c;//如果没有空格需要加上一个空格
    }
    this.e.className +=c;
};
//将在e.className中出现的c全部删除
CSSClassList.prototype.remove =function(c){
    if(!this.contains(c))return;//如果类里面本来就没有就直接返回
    //将所有作为单词的c和多余的尾随空格全部删除
    var pattern = new RegExp('\\b'+c+'\\b\\s*','g');
    this.e.className = this.e.className.replace(pattern,'');
};
//如果c不存在，将c添加到e.className中，并且返回true
//如果c存在，那么将在e.className中出现的所有c都删除，并返回false
CSSClassList.prototype.toggle=function(c){
    if(this.contains(c)){//如果e.className 包含c
        this.remove(c); //删除它
        return false;
    }else{
        //否则的话
        this.add(c);//否则就添加c
        return true;
    }
};
//返回 e.className本身
CSSClassList.prototype.toString = function(){
    return this.e.className;
};
//返回e.className 中的类名 是一个数组
CSSClassList.prototype.toArray = function(){
    return this.e.className.match(/\b\w+\b/g) || [];
}
//禁用右键菜单函数
function forbidenRightMenu(){
    document.oncontextmenu=function(){
        return true;
    }
    document.onmousedown=function(){

    }
}


var WaveSurfer = {

};

var LkMusic = {

};

//rem自适应调节
(function(win,doc){
    var resizeEvt = 'orientationchange' in win ? 'orientationchange' :'resize';
    var docEl = doc.documentElement;
    var playercontainer = document.getElementById("grid-music-container-3d");
    var containerinner = document.querySelector('.grid-music-container');
    var onDeviceResize = function(){
        docEl.style.fontSize = 20 * (docEl.clientWidth/828) +'px';
        playercontainer.style.width = '100%';
        playercontainer.style.height = '25rem';
        playercontainer.style.perspective = '25rem';
        containerinner.style.width = 'calc(100% - 2rem)';
        containerinner.style.padding = '1rem 1rem 0 1rem';
        containerinner.style.height ='100%';
    };
    //这里需要判断一下是手机端还是pc端
    // if(/android|ipad|iphone/gi.test(navigator.userAgent)){
    //     win.addEventListener(resizeEvt, onDeviceResize,false);
    //     doc.addEventListener('DOMContentLoaded', onDeviceResize,false);
    //     onDeviceResize();
    // }

})(window,document);

//分时函数 解决大量数据以及 队列问题
var timeChunk = function(arr,fn,count,time){
    var timer,i=0;
    var start = function(){
        for (;i<Math.min(count||1,arr.length);i++){
            var obj = arr.shift();
            fn(obj);
        }
    }
    return function(){
        timer = setInterval(function(){
            if(arr.length === 0){
                return clearInterval(timer);
                timer = null;
            }
            start();
        },time);
    }
}



