/***
 * @author laike
 * @date 2016 7 5
 * @description the simple javascript libary
 */

var  suli = function(_name){
     return suli.prototype.init(_name);
}

var arr = [];

var slice = arr.slice;

var push = arr.push;

var indexOf = arr.indexOf;

var concat = arr.concat;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};

//实现兼容ie5和ie6的XMLHttpRequest对象
if(window.XMLHttpRequest === undefined){
    window.XMLHttpRequest = function(){
        try{
          return new ActiveXObject('Msxml2.XMLHTTP.6.0');
        }catch(e){
            try{
                return new ActiveXObject('Msxml2.XMLHTTP.3.0');
            }catch(e2){
                //否则就抛出错误
                throw new Error('XMLHttpRequest is not supported!');
            }
        }
    }
}
var jsonpCounter=0;
/***
 * 使用JSONP进行跨域请求  服务器端以php 为例子news.php  echo $_GET['callback'].'('.json_encode($news).')';
 * @param url
 * @param callback
 * @returns {suli}
 */
function getJSONP(url,callback){
    //否则使用script来进行访问
    //为本次请求创建一个唯一的回调函数名称
    var cbnum = 'cb'+jsonpCounter++;//每次自增计数器
    var cbname = 'getJSONP'+cbnum;//作为jsonp函数的属性
    if(url.indexOf('?') === -1){//没有查询参数进行构造
        url += '?callback='+cbname;
    }else{
        url +='&callback='+cbname;
    }
    var script = document.createElement('script');
    //定义将脚本执行的回调函数
    window[cbname] = function(response){
        try{
            callback(response);
        }finally{
            delete window[cbname];//移除该函数
            script.parentNode.removeChild(script);//移除script元素
        }
    };
    script.src = url;
    document.body.appendChild(script);
}
suli.prototype= {
    //实用函数
    /**
     * [trim 去除字符两边的空格]
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    trim:function(str){
        var pattern = /^\s+|\s+$/g;
        return str.replace(pattern,'');
    },
    debugMode:true,
    debugReady:false,
    _extend:function(o,p){
        o = o ? o : {};
        for (prop in p) {
            if ({}.hasOwnProperty.call(p, prop)) {
                o[prop] =p[prop];
            }
        }
        return o;
    },
    /*添加事件的工具函数*/
    /***
     *
     * @param target
     * @param type
     * @param handler
     * @param iscapture
     */
    addEvent:function(target,type,handler,iscapture){
        iscapture = iscapture ? iscapture : false;

        if(target.addEventListener){
            if(!iscapture){
                target.addEventListener(type,handler,false);
            }else{
                target.addEventListener(type,handler,true);
            }
        }else if(target.attachEvent){
             target.attachEvent('on'+type,function(event){
                 event = event||window.event;
                 return handler.call(target,event);
             });
        }else{
            //默认所有浏览器都支持
            target['on'+type]=function(event){
                 event = event||window.event;
                 return handler.call(target,event);
            };
        }
    },
    whenReady : (function(){
        var ready = false;
        var funcs = [];
        function handler(e){
            if(ready) return;
            if(e.type === 'readystatechange' && document.readyState !=='complete'){
                return;
            }
            for(var i=0;i<funcs.length;i++)
                funcs[i].call(document);
            ready = true;
            funcs = null;
        }
        if(document.addEventListener){
            document.addEventListener('DOMContentLoaded',handler,false);
            document.addEventListener('readystatechange',handler,false);
            window.addEventListener('load',handler,false);
        }else{
            document.attachEvent('onreadystatechange',handler);
            window.attachEvent('onload',handler);
        }
        //这里使用闭包
        return function (f){

            if(ready){
                f.call(document);//若文档准备完毕那么立即运行
            }else{
                //否则加入队列进行等候
                funcs.push(f);
            }
        }
    }()),
    /*当文档准备就绪时候调用的函数 此函数可以在页面任何地方进行调用*/
    /***
     *
     * @param fn
     */
    ready:function(fn){
        this.whenReady(fn);
    },
    /***
     *
     * @param _name
     * @returns {suli}
     */
    init:function(_name){
        this.id_object = null;
        this.version = '1.0.0 beta';
        //开启调试模式
        if(!this.debugReady)
        {
            if(this.debugMode){
              this.debug();
            }
        }

        if(_name != null  && (typeof _name === 'object')){
            this.id_object = _name;
            return this;
        }
        if(document.getElementById(_name) != null  && (typeof _name === 'string')){
            this.id_object = document.getElementById(_name);
            return this;
        }
        return this;
    },
    /***
     *
     * @param value
     * @returns {*}
     */
    html:function(value){
           if(this.isNull()){
              if(value){
                  return this.id_object.innerHTML;
              }
           }else{
              if(value){
                  this.id_object.innerHTML = value;
              }else{
                  return this.id_object.innerHTML;
              }
           }
    }
    ,
    /***
     *
     * @param attrName
     * @param attrValue
     * @returns {*}
     */
    attr:function(attrName,attrValue){
        if(this.isNull()){
                return null;
        }else{
            return (attrName && attrValue) ? this.id_object.setAttribute(attrName,attrValue) :this.id_object.getAttribute(attrName);
        }
    }
    ,
    isNull:function(){
        return (this.id_object == null) ? true : false;
    },
    parent:function(){
        if(this.isNull()) return suli();
        return suli(this.id_object.parentNode);
    },
    fireEvent:function(el,evtType,keyCode){
        //注意这里
    },
    /***
     *
     */
    debug:function(){
        //调试模式代码
        this.debugReady = true;
        //初始化一些个调试事件
    },
    /***
     *
     * @param msg
     */
    error:function(msg){
        msg = msg ? msg : '';
        throw  new Error(msg);
    },
    /***
     * 对数据进行编码操作 返回一个查询字符串
     * @param data
     * @returns {String}
     */
    encodeData:function(data){

        if(!data) return '';
        var pairs = [];
        for(name in data){
              if(!data.hasOwnProperty(name)){
                  continue;//跳过继承的属性
              }
             if(typeof data[name] === 'function'){
                 continue;//跳过方法
             }
             var value = data[name].toString();
            name = encodeURIComponent(name.replace('%20',"+"));
            value = encodeURIComponent(value.replace('$20','+'));
            pairs.push(name+"="+value);
        }
        return pairs.join('&');
    }
    ,
    /**
     * 封装Ajax
     * @param url 请求地址
     * @param type 请求类型 post get
     * @param async 是否异步请求 true false
     * @param param 请求参数列表  对象格式
     * @param datatype 返回值得格式化数据类型 json text html xml等
     * @param success 请求成功时候执行的回调函数
     * @param error  请求失败时候执行的回调函数
     * @param timeout 实现超时如果超过指定的这个时间就自动结束请求 默认是5秒后结束请求
     */
    Ajax:function(url,type,async,param,datatype,success,error,timeout){
        if(!url){
            this.error('请求地址不能为空！');
            return this;
        }
        var _xhr = new XMLHttpRequest();
        type = (type ? type : 'get').toUpperCase();
        param = param ? param : {};
        datatype = datatype ? datatype :'text';
        success = success ? success : function(response){};
        error = error ? error : function(msg){};
        async = (async !== undefined) ? async : true;//默认为异步请求
        timeout = timeout ? timeout : 5000;
        var _timedout = false;
        var _timer = setTimeout(function(){
            _timedout = true;
             _xhr.abort();//定时器到了就中断请求
        },timeout);
        if(async && type === 'GET' && param.length !== 0){
            _xhr.open(type,url+"?"+this.encodeData(param),async);
        }else{
            _xhr.open(type,url,async);
        }
        //如果是POST请求那么必须设置请求头部
        if(type === 'POST'){
             _xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        }
        _xhr.onreadystatechange=function(){
            if(_xhr.readyState !== 4 ){
                return;
            }
            if(_timedout){
                return;
            }
            clearTimeout(_timer);
            if(_xhr.readyState === 4 && _xhr.status === 200){
                var type = _xhr.getResponseHeader('Content-Type');
                if(datatype === 'xml' && _xhr.responseXML){
                    success.call(window,_xhr.responseXML);
                }else if(datatype === 'json' && type === 'application/json'){
                    success.call(window,JSON.parse(_xhr.responseText));
                }else{
                    success.call(window,_xhr.responseText);
                }
            }else{
                error.call(window,'请求失败！');
            }
        };
        if(type === 'GET'){
            _xhr.send(null);
            return this;
        }
        _xhr.send(this.encodeData(param));
        return this;
    },
    /***
     * 是否支持跨域请求 IE10 以下的版本不支持 只能使用jsonp来进行
     * @param url
     * @returns {boolean}
     * @constructor
     */
    isSupportCors:function(url){
           return (new XMLHttpRequest()).withCredentials !== undefined  ? true : false;
    },
    getjsonp:function(url,callback){
        getJSONP(url,callback);
    },
    notification:function(opts){
        var _this = this;
        var opts = _this._extend({
            title:'HI 帅哥！',
            icon:'http://laijiadayuan.com/wp-content/uploads/2016/07/IMG_20160227_152208.jpg',
            body:'欢迎使用Suli库！',
            silent:false,
            callback:function(notification){
                notification.close();
            }
        },opts);
        //如果支持HTML5的通知那么就使用高级的通知功能否则使用document.title来进行实现
        if(window.Notification){
            var popNotice = function(){
                var notification = new Notification(opts.title,opts);
                notification.onclick = function(){
                    opts.callback.call(this,notification);
                };
            };
            //如果已经允许通知
            if(Notification.permission ==='granted'){
                popNotice();
            }
            else if (Notification.permission != "denied") {
                Notification.requestPermission(function (permission) {
                    popNotice();
                });
            }
            return this;
        }
        var title = document.title;
        var isshine = true;
        var time =null;
        msg = msg ? msg : '您有新消息';
        function bouncenews(){
            var _title = document.title;
            if(isshine == true){
                if(/新/.test(_title) == false){
                    document.title= '【'+opts.title+'】';
                }else{
                    document.title = '【　　　　　】';
                }
            }else{
                document.title = title;
            }
        }
        time = setInterval(bouncenews,500);
        //监听窗口聚焦和不聚焦事件
        window.onfocus = function(){
            isshine = false;
        }
        window.onblur=function(){
            isshine = true;
        }
        //兼容ie
        window.onfocusin=function(){
            isshine = false;
        }
        window.onfocusout = function(){
            isshine = true;
        }
        return this;

    },

};

suli(document).ready(function(){
    //suli("demo").Ajax('http://localhost:63342/js%20learn/qianduankaifa/demo5.html','get',true,{username:'laike',pwd:'laikedou'},'html',function(res){
    //       suli('demo').html(res);
    //});
    //console.log(suli('child').parent().attr('name'));
    //suli("demo").getjsonp('http://localhost:808/news.php',function(res){
    //    console.log(res);
    //});
    suli('demo').notification({
        title:'您有新消息了哈！',
        body:'欢迎来到赖家大院的博客',
        icon:'http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg',
        data:{url:'http://laijiadayuan.com'},
        callback:function(nt){
            nt.close();
            //window.location.href = nt.data.url;
        }

    })
});
//关于JavaScript中的AO链(Active Object)这个链要理解主要分为两个阶段AO对象定义阶段 和赋值阶段如果没有定义那么
//就会先定义一个AO.varable = undefined 然后再是找上层去找
var me = function(){
    this.money = 100;
    this.show =function(){
        alert('我有'+this.money+'元钱！');
    }
}
function mm(){
    this.name = 'meimei';
}
var mm1 = new mm();

//me.call(mm1);
//mm1.show();

//关于匿名函数的写法我们经常使用没有名字

