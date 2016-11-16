/***
 * ×ÔÓÃ±à¼­Æ÷´úÂëÂß¼­
 * ±à¼­Æ÷×é¼þ¹¤³§Ä£Ê½
 */
 //定义全局的一些个常量
var ed1=null;
//ace 这个编辑器支持的语言列表 如下所示
//初始化本地存储数据库db
var db = null;

var modes = [];
function getModeForPath(path) {
    var mode = modesByName.text;
    var fileName = path.split(/[\/\\]/).pop();
    for (var i = 0; i < modes.length; i++) {
        if (modes[i].supportsFile(fileName)) {
            mode = modes[i];
            break;
        }
    }
    return mode;
}

var Mode = function(name, caption, extensions) {
    this.name = name;
    this.caption = caption;
    this.mode = "ace/mode/" + name;
    this.extensions = extensions;
    var re;
    if (/\^/.test(extensions)) {
        re = extensions.replace(/\|(\^)?/g, function(a, b){
                return "$|" + (b ? "^" : "^.*\\.");
            }) + "$";
    } else {
        re = "^.*\\.(" + extensions + ")$";
    }

    this.extRe = new RegExp(re, "gi");
};

Mode.prototype.supportsFile = function(filename) {
    return filename.match(this.extRe);
};
var supportedModes = {
    ABAP:        ["abap"],
    ABC:         ["abc"],
    ActionScript:["as"],
    ADA:         ["ada|adb"],
    Apache_Conf: ["^htaccess|^htgroups|^htpasswd|^conf|htaccess|htgroups|htpasswd"],
    AsciiDoc:    ["asciidoc|adoc"],
    Assembly_x86:["asm|a"],
    AutoHotKey:  ["ahk"],
    BatchFile:   ["bat|cmd"],
    C_Cpp:       ["cpp|c|cc|cxx|h|hh|hpp|ino"],
    C9Search:    ["c9search_results"],
    Cirru:       ["cirru|cr"],
    Clojure:     ["clj|cljs"],
    Cobol:       ["CBL|COB"],
    coffee:      ["coffee|cf|cson|^Cakefile"],
    ColdFusion:  ["cfm"],
    CSharp:      ["cs"],
    CSS:         ["css"],
    Curly:       ["curly"],
    D:           ["d|di"],
    Dart:        ["dart"],
    Diff:        ["diff|patch"],
    Dockerfile:  ["^Dockerfile"],
    Dot:         ["dot"],
    Dummy:       ["dummy"],
    DummySyntax: ["dummy"],
    Eiffel:      ["e|ge"],
    EJS:         ["ejs"],
    Elixir:      ["ex|exs"],
    Elm:         ["elm"],
    Erlang:      ["erl|hrl"],
    Forth:       ["frt|fs|ldr"],
    Fortran:     ["f|f90"],
    FTL:         ["ftl"],
    Gcode:       ["gcode"],
    Gherkin:     ["feature"],
    Gitignore:   ["^.gitignore"],
    Glsl:        ["glsl|frag|vert"],
    Gobstones:   ["gbs"],
    golang:      ["go"],
    Groovy:      ["groovy"],
    HAML:        ["haml"],
    Handlebars:  ["hbs|handlebars|tpl|mustache"],
    Haskell:     ["hs"],
    haXe:        ["hx"],
    HTML:        ["html|htm|xhtml"],
    HTML_Elixir: ["eex|html.eex"],
    HTML_Ruby:   ["erb|rhtml|html.erb"],
    INI:         ["ini|conf|cfg|prefs"],
    Io:          ["io"],
    Jack:        ["jack"],
    Jade:        ["jade"],
    Java:        ["java"],
    JavaScript:  ["js|jsm|jsx"],
    JSON:        ["json"],
    JSONiq:      ["jq"],
    JSP:         ["jsp"],
    JSX:         ["jsx"],
    Julia:       ["jl"],
    LaTeX:       ["tex|latex|ltx|bib"],
    Lean:        ["lean|hlean"],
    LESS:        ["less"],
    Liquid:      ["liquid"],
    Lisp:        ["lisp"],
    LiveScript:  ["ls"],
    LogiQL:      ["logic|lql"],
    LSL:         ["lsl"],
    Lua:         ["lua"],
    LuaPage:     ["lp"],
    Lucene:      ["lucene"],
    Makefile:    ["^Makefile|^GNUmakefile|^makefile|^OCamlMakefile|make"],
    Markdown:    ["md|markdown"],
    Mask:        ["mask"],
    MATLAB:      ["matlab"],
    Maze:        ["mz"],
    MEL:         ["mel"],
    MUSHCode:    ["mc|mush"],
    MySQL:       ["mysql"],
    Nix:         ["nix"],
    NSIS:        ["nsi|nsh"],
    ObjectiveC:  ["m|mm"],
    OCaml:       ["ml|mli"],
    Pascal:      ["pas|p"],
    Perl:        ["pl|pm"],
    pgSQL:       ["pgsql"],
    PHP:         ["php|phtml|shtml|php3|php4|php5|phps|phpt|aw|ctp|module"],
    Powershell:  ["ps1"],
    Praat:       ["praat|praatscript|psc|proc"],
    Prolog:      ["plg|prolog"],
    Properties:  ["properties"],
    Protobuf:    ["proto"],
    Python:      ["py"],
    R:           ["r"],
    Razor:       ["cshtml"],
    RDoc:        ["Rd"],
    RHTML:       ["Rhtml"],
    RST:         ["rst"],
    Ruby:        ["rb|ru|gemspec|rake|^Guardfile|^Rakefile|^Gemfile"],
    Rust:        ["rs"],
    SASS:        ["sass"],
    SCAD:        ["scad"],
    Scala:       ["scala"],
    Scheme:      ["scm|sm|rkt|oak|scheme"],
    SCSS:        ["scss"],
    SH:          ["sh|bash|^.bashrc"],
    SJS:         ["sjs"],
    Smarty:      ["smarty|tpl"],
    snippets:    ["snippets"],
    Soy_Template:["soy"],
    Space:       ["space"],
    SQL:         ["sql"],
    SQLServer:   ["sqlserver"],
    Stylus:      ["styl|stylus"],
    SVG:         ["svg"],
    Swift:       ["swift"],
    Tcl:         ["tcl"],
    Tex:         ["tex"],
    Text:        ["txt"],
    Textile:     ["textile"],
    Toml:        ["toml"],
    Twig:        ["twig|swig"],
    Typescript:  ["ts|typescript|str"],
    Vala:        ["vala"],
    VBScript:    ["vbs|vb"],
    Velocity:    ["vm"],
    Verilog:     ["v|vh|sv|svh"],
    VHDL:        ["vhd|vhdl"],
    Wollok:      ["wlk|wpgm|wtest"],
    XML:         ["xml|rdf|rss|wsdl|xslt|atom|mathml|mml|xul|xbl|xaml"],
    XQuery:      ["xq"],
    YAML:        ["yaml|yml"],
    Django:      ["html"]
};
var nameOverrides = {
    ObjectiveC: "Objective-C",
    CSharp: "C#",
    golang: "Go",
    C_Cpp: "C and C++",
    coffee: "CoffeeScript",
    HTML_Ruby: "HTML (Ruby)",
    HTML_Elixir: "HTML (Elixir)",
    FTL: "FreeMarker"
};
var modesByName = {};
for (var name in supportedModes) {
    var data = supportedModes[name];
    var displayName = (nameOverrides[name] || name).replace(/_/g, " ");
    var filename = name.toLowerCase();
    var mode = new Mode(filename, displayName, data[0]);
    modesByName[filename] = mode;
    modes.push(mode);
}



var modelist = {
    getModeForPath: getModeForPath,
    modes: modes,
    modesByName: modesByName
};
var EditorFactory = (function(){
    var editorsArr = [];
    return {
        init:function(id){
            if(editorsArr[id]){
                return editorsArr[id];
            }else{
                return editorsArr[id] = ace.edit(id);
            }
        }
    }
})();
var popWindow = (function(){
      var popWinArr = [];
      //创建新弹出窗口
      var createWin=function(name,cfg){
         var cfg = $.extend({
          showtitle:true,
          showclose:true,
          spantitle:'提示信息',
          closetext:'x',
          isremove:false,
          autoshow:true,
          center:true,
          content:'在这里添加内容！',
          onclose:function(event){
            $('#'+id).fadeOut(500,function(){
                if(cfg.isremove){
                  $(this).remove();
                }
            });
          },
          oncomplete:function(event){

          },
          callback:function(id){

          }
        },cfg);
        var id = (Math.random()).toString().replace('.','_')+name;
        var cl = 'ed-ui-popwindow ed-box-shadow';

        var win = document.createElement('div');
        win.className = cl;
        win.id = id;
        var title = document.createElement('h2');
        title.className = 'ed-ui-poptitle';
        if(cfg.showtitle){
          var spantitle = document.createElement('span');
          spantitle.className = 'title';
          spantitle.innerHTML = cfg.spantitle;
        }
        if(cfg.showclose){
          var spanclose = document.createElement('span');
          spanclose.className = 'close';
          spanclose.innerHTML = cfg.closetext;
          //绑定事件
          spanclose.addEventListener('click',function(event){
               if(cfg.onclose){
                      cfg.onclose.call(createWin,id);
               }
          });
        }

        //添加到title
        title.appendChild(spantitle);
        title.appendChild(spanclose);
        var winbody = document.createElement('div');
        winbody.className = 'ed-ui-pop-content';
        //向winbody 添加内容
        winbody.innerHTML = cfg.content;
        //底部 
        var winfooter = document.createElement('div');
        winfooter.className = 'ed-ui-pop-footer';
        //添加到win
        win.appendChild(title);
        win.appendChild(winbody);
        win.appendChild(winfooter);
        win.style.display='none';//默认隐藏

        //添加到页面上面
        document.body.appendChild(win);
         //出发oncomplete事件 
        if(cfg.oncomplete){
            var args = {id:id,target:win}
            cfg.oncomplete.call(createWin,args);
        }
        if(cfg.callback){
            cfg.callback.call(createWin,id);
        }
        //如果有自定义高度那么
        if(cfg.width && cfg.height ){
            if(cfg.center){
                $(win).css({
                  width : cfg.width +'px',
                  height : cfg.height +'px',
                  transform:'translate(-'+cfg.width/2+'px,-'+cfg.height/2+'px)'
               });
            }else{
              //否则随机生成在页面上的位置
              $(win).css({
                width : cfg.width +'px',
                height : cfg.height +'px',
                left:150*Math.random()+50,
                top:150+200*Math.random(),
                transform:'none'
              });
            }
            
        }
        if(cfg.css){
           $(win).css(cfg.css);
        }
        $(win).fadeIn(500);
        return win;

      }
      //销毁新弹出窗口
      function destroyWin(ele){
          $(ele).remove();
      }
      return {
          popwin:null,
          createPopWin:function(name,cfg){
               if(popWinArr[name]){
                   //如果页面中已经有了这个元素我们就不用再进行添加到页面了
                   if(!$('body').has("#"+popWinArr[name].id)){
                      document.body.appendChild(popWinArr[name]);
                   }
                  this.show(popWinArr[name]);
                   return this;
               }
               //否则重新创建
               popWinArr[name]=createWin(name,cfg);
               return this;
          },
          destroyWin:function (){
               destroyWin(this.popwin);
          },
          show:function(ele){
            $(ele).fadeIn(500);
          },
          hide:function(ele){
            $(ele).fadeOut(500);
          }
      }

})();
//以一个对象的x和y属性的方式返回滚动条的偏移量
function getScrollOffsets(w){
    w = w || window;
    //除了IE8及更早的版本意外，其它浏览器都能用
    if(w.pageXOffset !== null){
        return {
           x : w.pageXOffset,
           y : w.pageYOffset
        }
    }
    //针对标准模式下的IE
    var d = w.document;
    if(document.compatMode === 'CSS1Compat'){
            return {
              x : d.documentElement.scrollLeft,
              y : d.documentElement.scrollTop
            }
    }
    //针对怪异模式
    return {
       x:d.body.scrollLeft,
       y:d.body.scrollTop
    }

}
 var drag = function (bar,target,callback){
    //拖放重置版本
    var params ={
      left:0,
      top:0,
      currentX:0,
      currentY:0,
      flag:false
    };
    callback = callback ? callbak : function(){

    }
    var getCss = function(o,key){
      //这里关于getComputedStyle这个方法可以参见张鑫旭的博客有点儿漫长
      return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];
    }
    var barEle = bar[0];
    var targetEle = target[0];
    //if(getCss(targetEle,'left') !== 'auto'){
    //  params.left = getCss(targetEle,'left');
    //}
    //if(getCss(targetEle,'top') !== 'auto'){
    //  params.top = getCss(targetEle,'top');
    //}
     params.top = $(targetEle).css('top');
     params.left= $(targetEle).css('left');
    //移动
    barEle.onmousedown=function(event){
      params.flag = true;
      var e = event||window.event;
      document.body.onselectstart = function(){
            return false;
      }
      params.currentX = e.clientX;
      params.currentY = e.clientY;
      
    }
    barEle.onmouseup = function(){
      params.flag = false;
      if(getCss(targetEle,'left') !== 'auto'){
        params.left = getCss(targetEle,'left');
      }
      if(getCss(targetEle,'top') !== 'auto'){
        params.top = getCss(targetEle,'top');
      }
      
    }
    barEle.onmousemove=function(event){
       var e = event ? event : window.event;
       if(params.flag){
          var nowX = e.clientX,nowY=e.clientY;
          var disX=nowX - params.currentX,disY =nowY - params.currentY;
          var x =parseInt(params.left)+disX;
          var y = parseInt(params.top)+disY;
          var maxL = document.documentElement.clientWidth - targetEle.offsetWidth;
          var maxT = document.documentElement.clientHeight - targetEle.offsetHeight;
          //限定x,y值得范围
          if (x < 0) {
            x = 0;
          }
          if (x > maxL) {
            x = maxL;
          }
          if (y < 0) {
            y = 0;
          }
          if (y > maxT) {
            y = maxT;
          }
          targetEle.style.left = (x)+'px';
          targetEle.style.top = (y)+'px';
       }
      

    }
    if(callback){
      callback(this);
    }
}
//时钟组件
var Clock = function(container,width,height){
    container = container ? container :document.body;
    width = width ? width : 450;
    height = height ? height : 450;
    var lineheight = lineheight ? lineheight : 15;
    var clock = document.createElement('canvas');
    var id = 'ed-clock_'+(Math.random().toString()).replace('.','_');
    clock.id = id;
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
            showTime(year,month,date,week);
            showMinutes(hours,minutes,seconds);
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
    function getTrueLength(str){//获取字符串的真实长度（字节长度）
      var len = str.length, truelen = 0;
      for(var x = 0; x < len; x++){
        if(str.charCodeAt(x) > 128){
          truelen += 2;
        }else{
          truelen += 1;
        }
      }
      return truelen;
    }
    function cutString(str, leng){//按字节长度截取字符串，返回substr截取位置
      var len = str.length, tlen = len, nlen = 0;
      for(var x = 0; x < len; x++){
        if(str.charCodeAt(x) > 128){
          if(nlen + 2 < leng){
            nlen += 2;
          }else{
            tlen = x;
            break;
          }
        }else{
          if(nlen + 1 < leng){
            nlen += 1;
          }else{
            tlen = x;
            break;
          }
        }
      }
      return tlen;
    }
    //显示时间
    function showTime(y,m,d,w){
        var arrWeek = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
        ctx.save();
        ctx.translate(width/2,height/2);
        ctx.font = '35px arial';
        ctx.fillStyle = '#000';
        ctx.strokeStyle = '#000';
        var str = y+'年'+m+'月'+d+'日'+arrWeek[w];
        ctx.fillText(str, -180, -185);
        ctx.restore();
    }
    function showMinutes(h,min,s){
        ctx.save();
        ctx.translate(width/2,height/2);
        ctx.font = '35px arial';
        ctx.fillStyle = '#ff0000';
        ctx.strokeStyle = '#000';
        var str = ''+ad(Math.floor(h))+':'+ad(Math.floor(min))+':'+ad(Math.floor(s));
        ctx.fillText(str, -70, -140);
        ctx.restore();
    }
    //用于时间补零
    function ad(str){
        return Math.floor(str) < 10 ? '0'+str : ''+str;
    }
    //启动时钟
    setInterval(drawClock,1000);

}
//日历组件
var Calendar = function(container,width,height){
    container = container ? container :document.body;
    width = width ? width : 450;
    height = height ? height : 450;
    var time = new Date();
    var Year = time.getFullYear();
    var Month = time.getMonth();
    var Day = time.getDate();
    var calendar = document.createElement('div');
    var id = 'ed-calendar_'+(Math.random().toString()).replace('.','_');
    calendar.id = id;
    calendar.className = 'ed-calendar-container';
    calendar.width = width ;
    calendar.height = height ;
    var calendarinner = document.createElement('div');
    calendarinner.className = 'ed-calendar-inner';
    var topArea = document.createElement('div');
    topArea.className = 'ed-calendar-top-area';
    var pre = document.createElement('a');
    pre.href="javascript:void(0);";
    pre.className = 'ed-calendar-pre';
    pre.onclick=function(){
        var _m = --Month;
        _m = (_m<=0) ? 0 : (_m);
        var _t = new Date(Year,_m,Day);
        createTable(_t);
    }
    var next = document.createElement('a');
    next.href="javascript:void(0);";
    next.className = 'ed-calendar-next';

    next.onclick=function(){
        var _m = ++Month;
        _m = (_m>=11) ? 11 : (_m);
        var _t = new Date(Year,_m,Day);
        createTable(_t);
    }

    topArea.appendChild(pre);
    topArea.appendChild(next);
    //今天的日期
    var txt = document.createElement('div');
    txt.className = 'ed-calendar-txt SkewIn';
    txt.addEventListener('animationend', function() {
        txt.classList.remove('SkewIn');
    }, false);
    var txt1 = document.createElement('span');
    txt1.className = 'ed-calendar-txt-day';
    txt1.innerHTML = '19';
    var txt2 = document.createElement('span');
    txt2.className = 'ed-calendar-txt-year-month';
    txt2.innerHTML = 'jan 2016';
    txt.appendChild(txt1);
    txt.appendChild(txt2);
    topArea.appendChild(txt);
    calendarinner.appendChild(topArea);
    //定义一个函数判断是否是闰年
    function is_leap(year){
        //闰年的条件符合下面两者之一：
        //(1) 年份能被4整除，但不能被100整除
        //(2) 年份能被400整除
        if( (year%4 ===0 && year%100 !==0) || (year%400 ===0) ){
            return 1;
        }
        return 0;
    }
    //用于时间补零
    function ad(str){
        return str < 10 ? '0'+str : ''+str;
    }
    function createTable(dateTime){
        dateTime = dateTime ? dateTime : new Date();
        var date = document.createElement('div');
        date.className = 'ed-calendar-date';
        var table = document.createElement('table');
        table.setAttribute('cellpadding',5);
        table.setAttribute('cellspacing',1);
        table.width = '296px';
        //这里来设置一个动画样式
        table.className = 'SkewIn';
        var now = dateTime;//当前时间
        var fullYear = now.getFullYear();
        var month = now.getMonth();//获取月份返回0-11
        //设置年月
        txt2.innerHTML = ad(month+1)+'月 '+fullYear+'年';
        var date_of_month = now.getDate();//获取日期返回1-31
        //设置日期
        txt1.innerHTML = date_of_month;
        var first_date = new Date(fullYear,month,1);//获取当月第一天时间
        //返回date对象星期天中的一天此值 0(周日)-6(周六)之间的一个整数
        var week = first_date.getDay();//获取当前月第一天是星期几
        var days_of_month = new Array(31,28+is_leap(fullYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        var rows = Math.ceil( (days_of_month[month]+week)/7);//表格所需行数
        var weekArr = ['M','T','W','T','F','S','S'];
        var thead = document.createElement('tr');
        for( var i=0;i<weekArr.length;i++){
            var th = document.createElement('th');
            th.innerHTML = weekArr[i];
            thead.appendChild(th);
        }
        table.appendChild(thead);
        for(var i=0;i<rows;i++){//表格的行
            var tr = document.createElement('tr');
            for(var k=0;k<7;k++){//表格中的单元格
                var td = document.createElement('td');
                idx = i*7+k;//单元格自然序列号
                date_str = idx - week +1;//计算日期
                //过滤无效日期(小于等于零的、大于月总天数的)
                ( date_str <=0 || date_str>days_of_month[month]) ? (td.innerHTML = '&nbsp;') : (td.innerHTML = (idx-week+1));
                //打印出日期
                if(date_str === date_of_month){
                    td.className = 'cur';
                    tr.appendChild(td);
                }else{
                    tr.appendChild(td);
                }
            }
            table.appendChild(tr);
        }
        date.appendChild(table);
        var _table = calendarinner.querySelector('table');
        if(_table){
            var _parent = _table.parentNode;
            _parent.parentNode.removeChild(_parent);
            calendarinner.appendChild(date);
            txt.classList.add('SkewIn');
            return;
        }
        calendarinner.appendChild(date);
    }
    createTable();
    calendar.appendChild(calendarinner);
    container.appendChild(calendar);
}

var localStorgeColorData = [];
var defaultColorData =[
   {name:'col-gray-darker',color:'#222'},
   {name:'col-gray-dark',color:'#333'},
   {name:'col-gray',color:'#555'},
   {name:'col-gray-light',color:'#999'},
   {name:'col-gray-lighter',color:'#eee'},
   {name:'col-brand-primary',color:'#337ab7'},
   {name:'col-brand-success',color:'#5cb85c'},
   {name:'col-brand-warning',color:'#f0ad4e'},
   {name:'col-brand-danger',color:'#d9534f'},
   {name:'col-brand-info',color:'#5bc0de'},
   {name:'col-bs-purple',color:'#563d7c'},
   {name:'col-bs-purple-light',color:'#c7bfd3'},
   {name:'col-bs-purple-lighter',color:'#e5e1ea'},
   {name:'col-bs-gray',color:'#f9f9f9'}
];
//这里是默认颜色模板
var defaultColorPalette=[
            ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", /*"rgb(153, 153, 153)","rgb(183, 183, 183)",*/
            "rgb(204, 204, 204)", "rgb(217, 217, 217)", /*"rgb(239, 239, 239)", "rgb(243, 243, 243)",*/ "rgb(255, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
            "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
            ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
            "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
            "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
            "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
            "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
            "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
            "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
            "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
            "rgb(133, 32, 12)", "rgb(153, 0, 0)", "rgb(180, 95, 6)", "rgb(191, 144, 0)", "rgb(56, 118, 29)",
            "rgb(19, 79, 92)", "rgb(17, 85, 204)", "rgb(11, 83, 148)", "rgb(53, 28, 117)", "rgb(116, 27, 71)",
            "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
            "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
];
//默认的命令操作
 var commands = [];
 commands['bold']=function(text){
      return '<b>'+text+'</b>';
 }
 commands['itlic']=function(text){
      return '<i>'+text+'</i>';
 }
 commands['title']=function(text){
      return '<h2 class="title">'+text+'</h2>';
 }
 commands['p']=function(text){
      return '<p>'+text+'</p>';
 }
 //给选定内容添加颜色样式
 commands['color']=function(className,text){
     return '<span class="'+className+'">'+text+'</span>';
 }
 commands['colorsettings']=function(){
     //打开颜色设置窗口
     $('#ed-color-panel-list').show(500);
 }
 commands['about']=function(){
     //打开颜色设置窗口
     var aboutPopWin = popWindow.createPopWin('aboutPanel',{
                spantitle:'',
                content:'<h2>欢迎使用Lebo Editor</h2> <p>支持emmet css 自动补全 代码查找替换功能等。</p>'+
                '<p>开发者：laike</p><p>版本:version 1.0 Beta</p>'

              });
 }
 //这里是用户中心
  commands['userinfo']=function(){
     //打开颜色设置窗口
     var userinfoPopWin = popWindow.createPopWin('userinfoPanel',{
                spantitle:'',
                content:'<div class="row">'+
                          '<div class="col-xs-12 col-sm-12">'+
                            '<div class="ed-about">'+
                              '<div class="ed-about-side">'+
                                '<div class="ed-about-author"></div>'+
                                '<div class="ed-about-action">'+
                                  '<a class="btn btn-danger btn-lg btn-block" href="javascript://">'+
                                    '<span class="fui-plus"></span>关注'+
                                  '</a>'+
                                '</div>'+
                                '<p>laike</p>'+
                                '<p>'+'QQ:924462390</p>'+
                                '<p>'+'性别：男</p>'+
                              '</div>'+
                              '<div class="ed-about-content ed-color-panel-list">'+
                                '<div class="color-swatches">'+
                                  '<a class="color-swatch color-swatch-add gray-light" href="javascript://">'+
                                      '<div class="glyphicon glyphicon-plus"></div>'+
                                 ' </a>'+
                                '</div>'+
                              '</div>'+
                            '</div>'+
                          '</div>'+
                        '</div>',
                callback:function(id){
                  var id = "#"+id;
                  var container = $(id);
                  var data = JSON.parse(localStorage.getItem('color_data'));
                  //ed1.addColorDiv(defaultColorData,container);
                  var colordata = defaultColorData.concat(data);
                  ed1.addColorDiv(colordata,container,true,6);
                },
                width:600,
                height:450

              });
 }
 //忘记密码窗口
  commands["forget"] = function(){
     var forgetPopWin = popWindow.createPopWin('forgetPanel',{
                spantitle:'',
                content:'<form>'+
                  '<div class="login-form">'+
                    '<div class="form-group">'+
                      '<input  type="password" class="form-control login-field" value="" required  autocomplete="off" id="login-md-pwd">'+
                      '<label class="" for="login-md-pwd">请输入旧密码！</label>'+
                    '</div>'+

                    '<div class="form-group">'+
                      '<input  type="password" class="form-control login-field" value=""  autocomplete="off" required placeholder="密码" id="login-md-pwd2">'+
                      '<label class="" for="login-md-pwd2">请输入新密码！</label>'+
                    '</div>'+
                    '<button class="btn btn-primary btn-lg btn-block" type="submit">确认修改</button>'+
                  '</div>'+
                '</form>',
                callback:function(id){
                         var id = "#"+id;
                         var container = $(id);
                          //这里再绑定相关事件formsubmit表单提交事件
                          container.find('form').submit(function(event){
                              event.preventDefault();
                              event.stopPropagation();
                              //设置localstorage
                              var info = JSON.parse(localStorage.getTime('userinfo'));
                              var username =info.username ;
                              var pwd = $(this).find('#login-md-pwd').val();
                              var userinfo = {username:username,pwd:hex_md5(pwd)};
                              localStorage.setItem('userinfo',JSON.stringify(userinfo));
                              $(this)[0].reset();
                              forgetPopWin.hide(id);
                         });
                },
                width:400,
                height:450

              });
  }
 //登录
  commands['login']=function(){
     var loginPopWin = popWindow.createPopWin('loginPanel',{
                spantitle:'登录账户',
                content:'<div class="login-screen"><form>'+
                  '<div class="login-icon">'+
                    '<img src="images/icon.png" alt="Welcome to LeboEditor">'+
                    '<h4>Welcome to <small>LeboEditor App</small></h4>'+
                  '</div>'+

                  '<div class="login-form">'+
                    '<div class="form-group">'+
                      '<input name ="username" type="text" class="form-control login-field" value="" autocomplete="off" required placeholder="用户名" id="login-name">'+
                      '<label class="login-field-icon fui-user" for="login-name"></label>'+
                    '</div>'+

                    '<div class="form-group">'+
                      '<input name="password" type="password" class="form-control login-field" value="" autocomplete="off" required placeholder="密码" id="login-pass">'+
                      '<label class="login-field-icon fui-lock" for="login-pass"></label>'+
                    '</div>'+

                    '<button class="btn btn-primary btn-lg btn-block" type="submit">登录</button>'+
                    '<a class="login-link" href="javascript://" onclick="commands[\'forget\']()">忘记密码?</a>'+
                  '</div>'+
                '</form></div>',
                callback:function(id){
                         var id = "#"+id;
                         var container = $(id);
                          
                          //这里再绑定相关事件formsubmit表单提交事件
                          container.find('form').submit(function(event){
                              event.preventDefault();
                              event.stopPropagation();
                              var _this = this;
                              var username = $(this).find('input[name=username]').val();
                              var password =$(this).find('input[name=password]').val();
                              db.findusernamepassword(username,password,function(){
                                 alert('登录成功！');
                                 $(_this)[0].reset();
                                 loginPopWin.hide(id);
                              },function(){
                                 alert('登录失败！用户名或者密码错误！');
                                 $(_this)[0].reset();
                                 loginPopWin.hide(id);
                              });
                              
                              
                         });
                },
                width:900,
                height:580

              });
 }
 //注册
   commands['reg']=function(){
          var regPopWin = popWindow.createPopWin('regPanel',{
                spantitle:'注册账号',
                content:'<form>'+
                  '<div class="login-form">'+
                    '<div class="form-group">'+
                      '<input  type="text" name ="username" class="form-control login-field" value="" required autocomplete="off"  placeholder="用户名" id="rg-username">'+
                    '</div>'+
                    '<div class="form-group">'+
                      '<input  type="password" class="form-control login-field" value="" required autocomplete="off" placeholder="密码" id="reg-password">'+
                    '</div>'+
                    '<div class="form-group">'+
                      '<label class="radio">'+
                      '<input type="radio" name="sex" checked  value="男" data-toggle="radio" class="custom-radio"><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span>'+
                      '男'+
                    '</label>'+
                      '<label class="radio">'+
                      '<input type="radio" name="sex"  value="女" data-toggle="radio" class="custom-radio"><span class="icons"><span class="icon-unchecked"></span><span class="icon-checked"></span></span>'+
                      '女'+
                    '</label>'+
                    '</div>'+
                    '<div class="form-group">'+
                      '<input  type="text" class="form-control login-field" value="" required placeholder="QQ" id="rg-qq">'+
                    '</div>'+
                    '<button class="btn btn-primary btn-lg btn-block" type="submit">注册</button>'+
                  '</div>'+
                '</form>',
                callback:function(id){
                         var id = "#"+id;
                         var container = $(id);
                          //这里再绑定相关事件formsubmit表单提交事件
                          container.find('form').submit(function(event){
                              var _this = this;
                              event.preventDefault();
                              event.stopPropagation();
                              var userinfo = {username:$(this).find('#rg-username').val(),password:hex_md5($(this).find('#reg-password').val()),qq:$(this).find('#rg-qq').val(),sex:$(this).find('input[name=sex]').val(),date:(new Date()).getTime()};
                              db.save('editor',userinfo,function(){
                                   //注册成功
                                  alert('恭喜你，注册成功！');
                                  $(_this)[0].reset();
                                  container.hide(id);
                              },function(){
                                  //注册失败
                                  alert('对不起注册失败！');
                                  $(_this)[0].reset();
                                  container.hide(id);
                              });
                              
                         });
                },
                width:400,
                height:450

              });
 }
  //系统设置窗口
   commands['settings']=function(){
          var settingsPopWin = popWindow.createPopWin('settingsPanel',{
                spantitle:'系统设置',
                content:'<form>'+
                          '<div class="share mrl">'+
                          '<ul>'+
                            '<li>'+
                              '<label class="share-label" for="share-toggle2">是否自动登录</label>'+
                              '<input type="checkbox" data-toggle="switch" />'+
                            '</li>'+
                            '<li>'+
                              '<label class="share-label" for="share-toggle4">自动记录上次编辑内容</label>'+
                              '<input type="checkbox" checked="" data-toggle="switch" />'+
                            '</li>'+
                            '<li>'+
                              '<label class="share-label" for="share-toggle6">离开编辑器弹出确认对话框</label>'+
                              '<input type="checkbox" data-toggle="switch" />'+
                            '</li>'+
                          '</ul>'+
                          '<button  type="submit" class="btn btn-primary btn-block btn-large">确认更改</button>'+
                        '</div>'+
                      '</form>',
                callback:function(id){
                        // Switches
                        if ($('[data-toggle="switch"]').length) {
                          $('[data-toggle="switch"]').bootstrapSwitch();
                        }
                         var id = "#"+id;
                         var container = $(id);
                          //这里再绑定相关事件formsubmit表单提交事件
                          container.find('form').submit(function(event){
                              event.preventDefault();
                              event.stopPropagation();

                         });
                },
                width:600,
                height:300,
                css:{
                  zIndex:9999
                }

              });
 }
 commands['music']=function(){
            var musicPopWin = popWindow.createPopWin('musicPanel',{
                spantitle:'音乐播放器',
                content:'<div class="grid-music-container f-usn">'+
                            '<div class="m-music-play-wrap">'+
                                '<div class="u-cover"></div>'+
                                '<div class="m-now-info">'+
                                    '<h1 class="u-music-title"><strong>标题</strong><small>歌手</small></h1>'+
                                    '<div class="m-now-controls">'+
                                        '<div class="u-control u-process">'+
                                            '<span class="buffer-process"></span>'+
                                            '<span class="current-process"></span>'+
                                        '</div>'+
                                        '<div class="u-control u-time">00:00/00:00</div>'+
                                        '<div class="u-control u-volume">'+
                                            '<div class="volume-process" data-volume="0.50">'+
                                                '<span class="volume-current"></span>'+
                                                '<span class="volume-bar"></span>'+
                                                '<span class="volume-event"></span>'+
                                            '</div>'+
                                            '<a class="volume-control"></a>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="m-play-controls">'+
                                        '<a class="u-play-btn prev" title="上一曲"></a>'+
                                        '<a class="u-play-btn ctrl-play play" title="播放"></a>'+
                                        '<a class="u-play-btn next" title="下一曲"></a>'+
                                        '<a class="u-play-btn mode mode-list current" title="列表循环"></a>'+
                                        '<a class="u-play-btn mode mode-random" title="随机播放"></a>'+
                                        '<a class="u-play-btn mode mode-single" title="单曲循环"></a>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="f-cb">&nbsp;</div>'+
                            '<div class="m-music-list-wrap"></div>'+
                            '<div class="m-music-lyric-wrap">'+
                              '<div class="inner-bg"></div>'+
                                '<div class="inner">'+
                                    '<ul class="js-music-lyric-content">'+
                                        '<li class="eof">暂无歌词...</li>'+
                                    '</ul>'+
                                '</div>'+
                            '</div>'+
                            '<div class="music-container-blur-bg"></div>'+
                        '</div>',
                callback:function(id){
                         var id = "#"+id;
                         var container = $(id);
                              new LMusic({
                                musicList : musicList,
                                autoPlay  : true,  //是否自动播放
                                defaultMode : 1,   //默认播放模式，随机
                                offlineMode:true,
                                spectrumtype:0,
                                callback   : function (obj) {  //返回当前播放歌曲信息

                                }
                            });
                            drag(container.find('.ed-ui-poptitle'),container);

                          
                },
                width:905,
                height:460,
                center:false,
                css:{
                  zIndex:9999
                }

              });
 };
  commands['clock']=function(){
            var clockPopWin = popWindow.createPopWin('clockPanel',{
                spantitle:'时钟组件',
                content:'',
                callback:function(id){
                         var id = "#"+id;
                         var container = $(id);
                         var clockContainer = container.find('.ed-ui-pop-content')[0];
                         new Clock(clockContainer);
                         drag(container.find('.ed-ui-poptitle'),container);

                          
                },
                width:500,
                height:500,
                center:false,
                css:{
                  zIndex:9999
                }

              });
 };

   commands['calendar']=function(){
            var calendarPopWin = popWindow.createPopWin('calendarPanel',{
                spantitle:'日历组件',
                content:'',
                callback:function(id){
                         var id = "#"+id;
                         var container = $(id);
                         var calendarContainer = container.find('.ed-ui-pop-content')[0];
                         new Calendar(calendarContainer);
                         drag(container.find('.ed-ui-poptitle'),container);

                          
                },
                width:500,
                height:500,
                center:false,
                css:{
                  zIndex:9999
                }

              });
 };

var isSupportGeolocation = false;
if(navigator.geolocation){
   isSupportGeolocation = true;
}
//这里来实现一个定位类基于HTML5 的geolocation这个对象需要用户在浏览器中允许定位
var Geolocation = function(ele,type){
    return Geolocation.prototype.init(ele,type);
}
Geolocation.prototype = {
    init:function(ele,type){
      this.type = type ? type : 'google';
      this.ele = ele;
      return this;
    },
    //获取位置信息
    getLocation:function(){
        var _that = this;
        if(!isSupportGeolocation){
           this.showError('对不起您的浏览器暂时不支持获取地理位置！');
           return;
        }
        navigator.geolocation.getCurrentPosition(function(position){
          _that.showLocation.call(_that,position)
        },function(error){
          _that.showError.call(_that,error)
        });
    },
    //显示位置信息
    showLocation:function(position){
       var latlon = position.coords.latitude+','+position.coords.longitude;
       var img_url ='';
         switch (this.type) {
           case 'baidu':
              img_url ="http://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&sensor=false";
             break;
           case 'google':
              img_url ="http://maps.googleapis.com/maps/api/staticmap?center="
    +latlon+"&zoom=14&size=400x300&sensor=false";
          
             break;
           default:
             
             break;
         }
        var img = new Image();
        img.src = img_url;
        this.ele.append(img);
    },
    Alert:function(msg){
        popWindow.createPopWin('geolocationErrorPanel',{
                spantitle:'提示信息',
                content:msg
        });
    },
    //显示错误信息
    showError:function(error){
              
             switch (error.code) {
                case error.PERMISSION_DENIED:
                  this.Alert("用户拒绝对获取地理位置的请求。");
                break;
                case error.POSITION_UNAVAILABLE:
                  this.Alert("位置信息是不可用的。");
                  break;
                case error.TIMEOUT:
                  this.Alert("请求用户地理位置超时。");
                  break;
                case error.UNKNOWN_ERROR:
                  this.Alert("未知错误。");
                  break;
             }
    }
};
var lkeditor = function(id){
    return lkeditor.prototype.init(id);
};
lkeditor.prototype={
    init:function(id){
       // verticalSpilt.init();
        var ge=new Geolocation($('#ed-body-right'),'google');
        //ge.getLocation();
        var _that = this;
        window.require = ace.require;
        window.Editor  = require("ace/editor").Editor;
        window.LineWidgets = require("ace/line_widgets").LineWidgets;
        window.Renderer = require("ace/virtual_renderer").VirtualRenderer;
        window.Dom = require("ace/lib/dom");
        window.EditSession = require("ace/edit_session").EditSession;
        window.modelist = require("ace/ext/modelist");
        window.themelist = require("ace/ext/themelist");
        window.layout = require("./layout");
        window.Search = require("./search").Search;
        var type = 'html';
        this.editor = null;
        this.editorSession = null;
        this.render = null;
        this.editorSelection = null;
        require("ace/lib/net").get('frame/hello.html', function(t){
            _that.editorSession =ace.createEditSession(t);
            _that.editorSession.setMode('ace/mode/'+type.toString());
            _that.editorSession.name = type;
            //这里我们暂时手动设置session的name属性 
            
            _that.render = new Renderer(document.getElementById(id),'ace/theme/monokai');
            _that.editor = new Editor(_that.render,_that.editorSession);
            _that.editor.setFontSize('18px');
            _that.editor.setOption("enableEmmet", true);
            //在这里绑定工具栏的一些个事件
            _that.initToolBarEvent();
            _that.initLeftRightAsny(_that.editor.getValue());
            _that.editor.on('change',function(e){
                _that.initLeftRightAsny(_that.editor.getValue());
            });
            //³õÊ¼»¯¶¥²¿¹¤¾ßÀ¸
            //_that.initToolBar();
            _that.initLeftSideBar();
            _that.frameResize();
            _that.resizeIframe();
            //³õÊ¼»¯¸÷ÖÖÃüÁîÒÔ¼°°ó¶¨¼üÅÌ¿ì½Ý¼ü
            _that.initCommands();
            //这里初始化color_switch
            _that.initColorSwitch();
            //初始化拖动
            drag($('.ed-panel-title'),$('#ed-color-panel-list'));
            //初始化db本地存储
            db = indexDbBase(20150305,'editor',
              {
                name:'editor',
                opts:{
                keyPath:'userid',
                autoIncrement:true
                }
             },
             [
                 {
                 name:'by_username',
                 keyPath:'username',
                 opts:{
                  unique:true,
                  multiEntry:false
                 }
             },
             {
                 name:'by_password',
                 keyPath:'password',
                 opts:{
                  unique:false,
                  multiEntry:false
                 }
             },
                 {
                     name:'by_qq',
                     keyPath:'qq',
                     opts:{
                         unique:false,
                         multiEntry:false
                     }
                 }
                 ,
                 {
                     name:'by_sex',
                     keyPath:'sex',
                     opts:{
                         unique:false,
                         multiEntry:false
                     }
                 },
             {
                 name:'by_date',
                 keyPath:'date',
                 opts:{
                  unique:false,
                  multiEntry:false
                 }
             },
                 //复合索引
                 {
                     name:'usernamePasswordIndex',
                     keyPath:['username','password'],
                     opts:{
                         unique:false,
                         multiEntry:false
                     }
                 }
             ]);
           //这里初始化tabbar导航栏位
           var filesData= JSON.parse(localStorage.getItem('files_data')) ? JSON.parse(localStorage.getItem('files_data')) : [];
           _that.initTabBar(filesData);
        })
        this.resultFrameWindow = document.querySelector('.ed-body-right-reslut');
        this.win = this.resultFrameWindow.contentWindow;
        this.topBar = $('#ed-top-tools-bar');
        this.rightBody = $('#ed-body-right');
        this.leftBody = $('#ed-body-left');
        return this;
    },
    addColorDiv:function(data,parent,animate,pagesize){
          animate = animate ? animate : false;
          pagesize = pagesize ? pagesize : 0;//0表示无限制
          if(pagesize){
                        //使用闭包进行重构 自用分页类
                  var Page = function(data,ele,callback){
                       var callback = callback ? callback : function(){};
                       var cPage = 1;
                       var pageSize =6;
                       var totalPage = Math.ceil(data.length/pageSize);
                       $(ele).find('.color-swatches').height(totalPage*($(ele).find('.ed-about-content').height()-27));

                       return function (data,ele){
                            //闭包内 可以访问外部函数的变量 cPage 并且 此函数返回以后其它任何代码都不能访问 cPage等变量就像是 私有变量一样
                            return {
                               oncallback:function(){
                                         if(callback){
                                            callback.call(this,ele);
                                         }
                               },
                               gotopage:function(target){
                                     cPage = target;
                                     this.setpage();
                               },
                               setpage:function(){
                                    _that = this;
                                    $(ele).find('.color-swatches').css({
                                    transform:'translateY(-'+((cPage-1)*(($(ele).find('.ed-about-content').height())))+'px)'
                                   });
                                    var pageDom = document.createElement('ul');
                                    pageDom.className = 'pagination';
                                    //创建中间内容区域
                                    if(totalPage <= pageSize){
                                           for(let count = 1; count <= totalPage;count++){
                                              if(count !== cPage){
                                                var pageADom = document.createElement('li');
                                                var pageA = document.createElement('a');
                                                pageA.innerHTML = count;
                                                pageA.onclick = function(){
                                                        _that.gotopage(count);
                                                };
                                                pageADom.appendChild(pageA);
                                                pageDom.appendChild(pageADom);
                                              }else{
                                                var pageADom = document.createElement('li');
                                                pageADom.className = 'active';
                                                var pageA = document.createElement('a');
                                                pageA.innerHTML = count;
                                                pageADom.appendChild(pageA);
                                                pageDom.appendChild(pageADom);
                                              }
                                           }
                                    }
                                    //如果总页数大于pageSize
                                    if(totalPage > pageSize){
                                           if(parseInt((cPage-1)/pageSize)===0){
                                              for(let count = 1; count <= pageSize;count++){
                                                   if(count !== cPage){
                                                      var pageADom = document.createElement('li');
                                                      var pageA = document.createElement('a');
                                                      pageA.innerHTML = count;
                                                      pageA.onclick = function(){
                                                              _that.gotopage(count);
                                                      };
                                                      pageADom.appendChild(pageA);
                                                      pageDom.appendChild(pageADom);
                                                    }else{
                                                      var pageADom = document.createElement('li');
                                                      pageADom.className = 'active';
                                                      var pageA = document.createElement('a');
                                                      pageA.innerHTML = count;
                                                      pageADom.appendChild(pageA);
                                                      pageDom.appendChild(pageADom);
                                                    }
                                              }
                                              //创建下一页
                                              var pageNextDom = document.createElement('li');
                                              pageNextDom.className = 'next';
                                              var pageNextA = document.createElement('a');
                                              pageNextA.className = 'fui-arrow-right';
                                              pageNextA.innerHTML = '后一页';
                                              pageNextA.onclick = function(){
                                                              _that.gotopage(pageSize+1);
                                              };
                                              pageNextDom.appendChild(pageNextA);
                                              pageDom.appendChild(pageNextDom);
                                           }else if(parseInt((cPage-1)/pageSize) === parseInt(totalPage/pageSize)){
                                            //创建前一页
                                            var pagePriviousDom = document.createElement('li');
                                            pagePriviousDom.className = 'previous';
                                            var pagePriviousA = document.createElement('a');
                                            pagePriviousA.className = 'fui-arrow-left';
                                            pagePriviousA.innerHTML = '前一页';
                                            pagePriviousA.onclick = function(){
                                                              _that.gotopage((parseInt((cPage-1)/pageSize)*pageSize));
                                            };
                                            pagePriviousDom.appendChild(pagePriviousA);
                                            pageDom.appendChild(pagePriviousDom);
                                            for (let count=parseInt(totalPage/pageSize)*pageSize+1;count<=totalPage;count++) 
                                            {    if(count !== cPage){
                                                      var pageADom = document.createElement('li');
                                                      var pageA = document.createElement('a');
                                                      pageA.innerHTML = count;
                                                      pageA.onclick = function(){
                                                              _that.gotopage(count);
                                                      };
                                                      pageADom.appendChild(pageA);
                                                      pageDom.appendChild(pageADom);
                                                    }else{
                                                      var pageADom = document.createElement('li');
                                                      pageADom.className = 'active';
                                                      var pageA = document.createElement('a');
                                                      pageA.innerHTML = count;
                                                      pageADom.appendChild(pageA);
                                                      pageDom.appendChild(pageADom);
                                                    }
                                            } 
                                      }else{
                                            //创建前一页
                                            var pagePriviousDom = document.createElement('li');
                                            pagePriviousDom.className = 'previous';
                                            var pagePriviousA = document.createElement('a');
                                            pagePriviousA.className = 'fui-arrow-left';
                                            pagePriviousA.innerHTML = '前一页';
                                            pagePriviousA.onclick = function(){
                                                              _that.gotopage((parseInt((cPage-1)/pageSize)*pageSize));
                                            };
                                            pagePriviousDom.appendChild(pagePriviousA);
                                            pageDom.appendChild(pagePriviousDom);
                                            for (let count=parseInt((cPage-1)/pageSize)*pageSize+1;count<=parseInt((cPage-1)/pageSize)*pageSize+pageSize;count++) 
                                            {    if(count !== cPage){
                                                      var pageADom = document.createElement('li');
                                                      var pageA = document.createElement('a');
                                                      pageA.innerHTML = count;
                                                      pageA.onclick = function(){
                                                              _that.gotopage(count);
                                                      };
                                                      pageADom.appendChild(pageA);
                                                      pageDom.appendChild(pageADom);
                                                    }else{
                                                      var pageADom = document.createElement('li');
                                                      pageADom.className = 'active';
                                                      var pageA = document.createElement('a');
                                                      pageA.innerHTML = count;
                                                      pageADom.appendChild(pageA);
                                                      pageDom.appendChild(pageADom);
                                                    }
                                            }
                                            //创建下一页
                                            var pageNextDom = document.createElement('li');
                                            pageNextDom.className = 'next';
                                            var pageNextA = document.createElement('a');
                                            pageNextA.className = 'fui-arrow-right';
                                            pageNextA.innerHTML = '后一页';
                                            pageNextA.onclick = function(){
                                                            _that.gotopage(parseInt((cPage-1)/pageSize)*pageSize+pageSize+1);
                                            };
                                            pageNextDom.appendChild(pageNextA);
                                            pageDom.appendChild(pageNextDom); 
                                      }
                                    }
                                    $(ele).find('.pagination').remove();
                                    pageDom.style.float = 'right';
                                    $(ele).find('.ed-about').append(pageDom);
                               }

                            }
                       }

                  }(data,parent);
              var curPage = new Page(data,parent);
              curPage.setpage();
          }
          data.forEach(function(item,index){
          //这里会出现这种情况：[{"name":"col-red","color":"rgb(255, 0, 0)"},{"name":"col-blue","color":"rgb(0, 0, 255)"},null] null的情况
          if(item === null){
             return;
          }
          var colorDiv = document.createElement('div');
          
          colorDiv.innerHTML = item.name;
          colorDiv.setAttribute('data-color',item.color);
          colorDiv.setAttribute('data-name',item.name);
          colorDiv.setAttribute('style','background-color:'+item.color);
          //这里如果有动画效果的话那么就添加动画效果样式 
          if(animate){
            colorDiv.className = 'color-swatch '+item.name+' color-swatch-add-effect';
            //这里可以添加一个删除的小箭头
            var spanclose = document.createElement('span');
            spanclose.className = 'close';
            spanclose.innerHTML = 'x';
            colorDiv.appendChild(spanclose);
          }else{
            //默认颜色无法删除
            colorDiv.className = 'color-swatch '+item.name+' color-swatch-default';
          }
          //这里怎么来进行分页因为有可能颜色太多

          parent.find('.color-swatch-add').before(colorDiv);
         });
    },
    localStorageHasItemName:function(name,data){
        for(var i = 0, length1 = data.length; i < length1; i++){
             if(data[i] === null){
                continue;
             }
             if(name === data[i].name){
                   return true;
             }
        }
        return false;
    },
    removeItemNameLocalstorage:function(name,data){
       var newdata = [];
       for(var i = 0, length1 = data.length; i < length1; i++){
             if(data[i] !== null && name !== data[i].name){
                newdata.push(data[i]);
             }
        }
        return newdata;
    },
    initColorSwitch:function(){
         var _that = this;
         //使得颜色选择框可以拖动

         this.addColorDiv(defaultColorData,$('#ed-color-panel-list'));
         //这里判断下是否有localstorage中存储了颜色数据格式[name:'col-red',color:'#ff0000']
         localStorgeColorData=JSON.parse(localStorage.getItem('color_data'));
         if(localStorgeColorData){
            //如果localstorage中存储了颜色值数据那么进行添加到DOM
            this.addColorDiv(localStorgeColorData,$('#ed-color-panel-list'),true);
         }
         $('.color-swatch-add').click(function(event){

             var colorWin=popWindow.createPopWin('addColorPanel',{
                content:'<form>'+
                  '<div class="form-group">'+
                    '<label for="color-input">请输入</label>'+
                    '<input  name="color-input" type="text" class="form-control" id="color-input" pattern="col-[a-zA-Z]+" title="请输入颜色样式名称，例如：col-red   col-purple" required placeholder="样式名称">'+
                  '</div>'+
                  '<div class="form-group">'+
                   ' <label for="color-select">选取颜色</label>'+
                  '  <input type="text" name="color-select" class="form-control" id="color-select"  placeholder="#ffffff">'+
                 ' </div>'+
                 ' <button type="submit" class="btn btn-default">确定</button>'+
               ' </form>',
                callback:function(id){
                         var id = "#"+id;
                         var container = $(id);
                         var spectrum=container.find('#color-select').spectrum({
                              color: "#fff",
                              showInput: true,
                              showInitial: true,
                              showPalette: true,
                              showSelectionPalette: true,
                              maxPaletteSize: 10,
                              preferredFormat: "rgb",
                              palette:defaultColorPalette,
                              get:container.find('#color-select').val()
                         });
                         $(".sp-picker-container").width(250);
                          
                          //这里再绑定相关事件formsubmit表单提交事件
                          container.find('form').submit(function(event){
                              event.preventDefault();
                              event.stopPropagation();
                              var localColorData= JSON.parse(localStorage.getItem('color_data')) ? JSON.parse(localStorage.getItem('color_data')) : [];
                              var name = $(this).find('input[name=color-input]').val();
                              var color = $.trim(container.find('#color-select').val());
                              if(color === '' || color === undefined){
                                   alert('颜色值不能为空！');
                                   return;      
                              }
                              //写入localstorage
                              var toAddColorObj={name:name,color:color};
                              if(_that.localStorageHasItemName(name,localColorData)){
                                  alert('此颜色已经存在无需添加！');
                                  return;
                              }
                              localColorData.push(toAddColorObj);
                              localStorage.setItem('color_data',JSON.stringify(localColorData));
                              colorWin.hide();
                              //reset重置表单
                              container.find('form')[0].reset();
                              //这里需要添加一个效果
                              _that.addColorDiv([toAddColorObj],$('#ed-color-panel-list'),true);
                         });
                }
             });
         });
         //这里要使用deglete来进行元素的删除操作 删除完了页面dom元素以后马上删除localstorage里面的数据
         $('.ed-color-panel-list').delegate('span.close','click',function(event){
              event.stopPropagation();//阻止事件冒泡
              event.preventDefault();
              $(this).parent().animate({
              width:0,
              height:0
             },'linear',function(){
                var name = $(this).data('name');
                var localColorData= JSON.parse(localStorage.getItem('color_data')) ? JSON.parse(localStorage.getItem('color_data')) : [];
                var newLocalColorData=_that.removeItemNameLocalstorage(name,localColorData);
                localStorage.setItem('color_data',JSON.stringify(newLocalColorData));
                $(this).remove();
             });
         });
         //这里需要绑定到编辑器的命令
        $('.ed-color-panel-list').delegate('.color-swatch','click',function(){
                  if($(this).hasClass('color-swatch-add')){
                    return;
                  }
                  var name = $(this).data('name');
                  var txt = _that.editor.getCopyText();
                  var setTxt = commands['color'](name,txt);
                  var currentRange = _that.editor.getSelection();
                  _that.replaceRange(setTxt,currentRange.getRange());

         });

    }, 
    replaceRange:function(text, randge) {
                return this.editor.session.replace(randge, text);
    },
    initToolBarEvent:function(){

             var _that = this;
            
             //这里我们先不用命令模式
             var btns = $('#ed-top-tools-bar .navbar-nav a[data-type],.ed-left-sidebar-fixed a');
             btns.click(function(event){
                  event = event || window.event;
                  event.stopPropagation();//阻止事件冒泡
                  event.preventDefault();//阻止默认事件
                  var _this  =  this;
                  var data_bind_type = $(_this).data('type');
                  var data_bind_name = $(_this).data('name');
                  if(!data_bind_type){
                      return;
                  }
                  var txt = _that.editor.getCopyText();
                  if(data_bind_type === 'color'){
                      var setTxt = commands[data_bind_type](data_bind_name,txt);
                  }else if(data_bind_type === 'settings' || data_bind_type ==='leftbar'){
                       commands[data_bind_name]()
                       return;
                  }else if(data_bind_type === 'loginregmodel'){
                       commands[data_bind_name]()
                       return;
                  }else if(data_bind_type === 'ctrtools'){
                      commands[data_bind_name]()
                      return;
                  }
                  else if(data_bind_type === 'file'){
                      commands[data_bind_name]()
                      return;
                  }else{
                      var setTxt = commands[data_bind_type](txt);
                  }
                  //这里要怎么设置才行呢？
                  //这里的话只能使用Search来进行替换了没有其它更好地方法了
                  var currentRange = _that.editor.getSelection();

                  _that.replaceRange(setTxt,currentRange.getRange());//这一句很重要已经OK

             });
    },
    initCommands:function(){
        var commands = this.editor.commands;
        var _that = this;
        commands.addCommand({
            name: "save",
            bindKey: {win: "Ctrl-S", mac: "Command-S"},
            exec: function(arg) {
                var session = _that.editor.session;
                var name = session.name.match(/[^\/]+$/);
                localStorage.setItem(
                    "saved_file:" + name,
                    session.getValue()
                );
            }
        });
    },
    initToolBar:function (){
        var _that = this;
        (this.topBar.css('display') === 'none')? this.topBar.fadeIn(500): this.topBar.hide();
        $(window).scroll(function(e){
            if($(this).scrollTop() > 70){
                _that.topBar.fadeOut(500);
            }else{
                _that.topBar.fadeIn(500);
            }
        });
    },
    initLeftSideBar:function(){
        $('.ed-left-sidebar-fixed').mouseenter(function(){

             $(this).animate({
                right:0
             },'swing');
        });
        $('.ed-left-sidebar-fixed').mouseleave(function(){
                       $(this).animate({
                          right:-200
                       },'swing');
          });

    },
    frameResize:function(){
             
             //启动自动分屏功能
            // verticalSpilt.init();
             var _width = $('#ed-body-right').width();
             var _height = $('#ed-body-left').height();
             $(this.resultFrameWindow).css({
                 width:_width + 'px',
                 height:_height+'px'
             });
    },
    resizeIframe:function (){
        var _that = this;
        $(window).resize(function(){
          _that.frameResize();
        });
    },
    initLeftRightAsny:function (value){
        this.win.loadHtml(value);
    },
    initTabBar:function(filesData){
          var _that = this;
          var tabBar=$('#ed-tab-bars');
          tabBar.html('');
          if(filesData.length===0){
            tabBar.append($('<div class="ed-tab-bars-tab active">html<span>x</span></div>'));
            return;
          }
          for(var i = 0, length1 = filesData.length; i < length1; i++){
            var _item=filesData[i];
            if(_item.active){
              tabBar.append($('<div class="ed-tab-bars-tab active" data-index="'+i+'">'+_item.filename+'<span>x</span></div>'));
              
               _that.editor.session.doc.setValue(_item.content);
               _that.editor.session.setMode(_item.mode);
               _that.editor.session.modeName = _item.name;
               console.log(_item.cursor);
               _that.editor.moveCursorTo(_item.cursor.row,_item.cursor.column);
            }else{
              tabBar.append($('<div class="ed-tab-bars-tab" data-index="'+i+'">'+_item.filename+'<span>x</span></div>'));
            }
          }
          tabBar.find('.ed-tab-bars-tab').click(function(event){
               var index = parseInt($(this).data('index'));
               
               var previtem=tabBar.find('.active');
               var previndex = previtem.data('index');
               var data= JSON.parse(localStorage.getItem('files_data')) ? JSON.parse(localStorage.getItem('files_data')) : [];
               var newdata = [];
               for(var i = 0, length1 = data.length; i < length1; i++){
                     if(previndex === i){
                        //获取当前的文本文档和光标的位置进行缓存
                        var cursorPos = ed1.editor.getCursorPosition();
                        
                        var value = ed1.editor.session.doc.getValue();
                        
                        data[i].content = value;
                        data[i].cursor = cursorPos;
                     }
                }
                for(var i = 0, length1 = data.length; i < length1; i++){
                 data[i].acitve = false;
                }
                localStorage.setItem('files_data',JSON.stringify(data));
               tabBar.find('.ed-tab-bars-tab').removeClass('active');
               $(this).addClass('active');
               var _item = data[index];
               _that.editor.session.doc.setValue(_item.content);
               _that.editor.session.setMode(_item.mode);
               _that.editor.session.modeName = _item.name;
               //然后将光标移动到之前的位置
               _that.editor.moveCursorTo(_item.cursor.row,_item.cursor.column);

          });
          tabBar.find('.ed-tab-bars-tab span').click(function(){
               var index = $(this).parent().data('index');
               var data= JSON.parse(localStorage.getItem('files_data')) ? JSON.parse(localStorage.getItem('files_data')) : [];
               var newdata = [];
               for(var i = 0, length1 = data.length; i < length1; i++){
                     if(data[i] !== null && index !== i){
                        newdata.push(data[i]);
                     }
                }
                localStorage.setItem('files_data',JSON.stringify(newdata));
                _that.initTabBar(newdata);

          });
    }
}
//这个是分屏组件使用的暂时只是支持了左右分屏后面会增加上下分屏
var verticalSpilt= {
      //这里有几个参数很重要定义了左右划分的宽度和高度
      SliderTopHeight: 0,
      SliderBottomHeight: 0,
      SliderTopLeftWidth: 0,
      SliderTopRightWidth: 0,
      SliderMoving: true,//设置为true 为动态分屏设置为false 为静态分屏
      SliderMiniWidth: 150,
      SliderMiniHeight: 150,
      SliderFlag: false,
      sliderTop:null,
      sliderBottom:null,
      sliderBody:document.getElementById('ed-body'),
      sliderTopLeft:document.getElementById('ed-body-left'),
      sliderTopRight:document.getElementById('ed-body-right'),
      sliderVertical:document.getElementById('ed-body-spiler'),
      sliderEditor:document.getElementById('ed-editor'),
      init:function(){
        this.SliderTopHeight = (document.documentElement.clientHeight-5)*0.5;
        this.SliderBottomHeight = (document.documentElement.clientHeight-5)*0.1;
        this.SliderTopLeftWidth = (document.documentElement.clientWidth-5)*0.5;
        this.SliderTopRightWidth = (document.documentElement.clientWidth-5)*0.1;
        //设置高度和宽度
        this.sliderTopLeft.style.width =this.SliderTopLeftWidth +'px';
        this.sliderTopRight.style.width = this.SliderTopRightWidth+'px';
        this.sliderVertical.style.height = this.sliderTopLeft.clientHeight+'px';
        this.sliderEditor.style.width = this.sliderTopLeft.clientWidth +'px';
        this.sliderEditor.style.height = this.sliderTopLeft.clientHeight+'px';
        this.SliderHorizontal();
      },
      SliderHorizontal:function(){
        var _this = this;
        document.body.onselectstart = function(){
          return false;
        }
        this.sliderVertical.onmousedown=function(){
            document.body.onmousemove=function(evt){
                 evt = evt || window.event;
                 _this.SliderMoving === false ? _this.SliderHorizontalMove(evt) : _this.SliderHorizontalMoving(evt);
            }
            document.body.onmouseup=function(){
                  document.body.onmousemove=function(){
                    return false;
                  }
                  if(_this.SliderMoving === false){
                     _this.SliderTopLeftWidth = _this.sliderVertical.offsetLeft;
                     _this.sliderTopLeft.style.width =_this.SliderTopLeftWidth +'px';
                     _this.sliderTopRight.style.width = (document.documentElement.clientWidth||document.body.clientWidth)-_this.SliderTopLeftWidth+'px';
                     _this.sliderEditor.style.width = _this.sliderTopLeft.clientWidth +'px';
                     _this.sliderEditor.style.height = _this.sliderTopLeft.clientHeight+'px';
                      var result_frame=document.querySelector('.ed-body-right-reslut');
                      result_frame.style.width = _this.sliderTopRight.clientWidth +'px';
                      result_frame.style.height = _this.sliderTopRight.clientHeight +'px';
                  }
            }
        }
      },
      SliderHorizontalMove:function(evt){
           this.SliderMoving = false;
           evt = evt || window.event;
           var cursorX = evt.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
           //判断是否小于最小宽度
           if(cursorX <=this.SliderMiniWidth|| cursorX >= (document.documentElement.clientWidth - this.SliderMiniWidth)){
              return;//直接返回
           }
           var cursorMoveInstance = cursorX - this.SliderTopLeftWidth;
           this.sliderVertical.style.position = 'absolute';
           this.sliderVertical.style.left = this.SliderTopLeftWidth+cursorMoveInstance+'px';
      },
      SliderHorizontalMoving:function(evt){
          this.SliderMoving =true;
          evt = evt || window.event;
          var cursorX = evt.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
           var cursorMoveInstance = cursorX - this.SliderTopLeftWidth;
           this.SliderTopLeftWidth = this.SliderTopLeftWidth + cursorMoveInstance;
           this.SliderTopRightWidth = document.documentElement.clientWidth - this.SliderTopLeftWidth-5;
           //判断是否小于最小宽度
           if(this.SliderTopRightWidth <= this.SliderMiniWidth || this.SliderTopLeftWidth <= this.SliderMiniWidth){
              return;//直接返回
           }
           this.sliderTopLeft.style.width =this.SliderTopLeftWidth +'px';
           this.sliderTopRight.style.width = this.SliderTopRightWidth+'px';
           this.sliderEditor.style.width = this.sliderTopLeft.clientWidth +'px';
           this.sliderEditor.style.height = this.sliderTopLeft.clientHeight+'px';
            var result_frame=document.querySelector('.ed-body-right-reslut');
            result_frame.style.width = this.sliderTopRight.clientWidth +'px';
            result_frame.style.height = this.sliderTopRight.clientHeight +'px';
      }
};

//ÎÞ·¨ÔÙ²»Ö§³ÖDOMContentLoadedä¯ÀÀÆ÷Ö®ÖÐÊ¹ÓÃ
window.onload = function(){
  ed1 = lkeditor('ed-editor');
}
//这里我们要使用indexDb来进行存储
//统一各个浏览器中的定义
window.indexedDB = window.indexedDB|| window.mozIndexedDB|| window.msIndexedDB
window.IDBTransaction = window.IDBTransaction||window.webkitIDBTransaction||window.msIDBTransaction||window.mozIDBTransaction
window.IDBKeyRange=window.IDBKeyRange || window.webkitIDBKeyRange|| window.mozIDBKeyRange|| window.msIDBKeyRange
window.IDBCursor = window.IDBCursor||window.webkitIDBCursor||window.mozIDBCursor||window.msIDBCursor

var indexDbBase = function(version,dbname,storeopts,indexopts){
     return indexDbBase.prototype.init(version,dbname,storeopts,indexopts);
}
indexDbBase.prototype= {
     idb:null,
     dbVersion:20150305,
     dbName:'editorfilesdb',
     conn:null,
     tx:null,
     newDbVersion:0,
     store:null,
     idx:null,
     defaultStoreOpts:{
         name:'books',
         opts:{
            keyPath:'isbn',
            autoIncrement:false
           }
     },
     defaultIndexOpts:[
         {
             name:'by_title',
             keyPath:'title',
             opts:{
                 unique:false,
                 multiEntry:false
             }
         }
     ],
     init:function(version,dbname,storeopts,indexopts){
            this.dbVersion = version;
            this.dbName = dbname;
            this.defaultStoreOpts = storeopts;
            this.defaultIndexOpts = indexopts;
            return this;
     },
     //开启事务
     transaction:function(callback,abortcall,mode){
          mode = mode ? mode : 'readwrite';
          callback = callback ? callback : function(){

          };
          abortcall = abortcall ? abortcall :function(){

          };
          this.tx=this.idb.transaction(this.defaultStoreOpts.name,mode);
          console.log('开启事务成功！');
          callback.call(this);
          this.tx.oncomplete = function(e){
              console.log('事务完成');
          }
          this.tx.onabort = function(e){
              console.log('事务终止');
          }
          return this;
     },
     abort:function(){
        this.tx.abort();
     },
     connect:function(callback){

         var _this = this;
          callback = callback ? callback : function(){
              
          };
         if(this.idb){
           callback.call(this);
           return this;
         }
         this.conn = indexedDB.open(this.dbName,this.dbVersion);
         this.conn.onsuccess=function(e){
          _this.idb = e.target.result;
          callback.call(this);
         }
         this.conn.onerror=function(e){
            throw (new Error('indexedDB链接错误！'));
         }
         this.conn.onupgradeneeded=function(e){
           _this.idb = e.target.result;
           if (_this.idb.objectStoreNames.contains(_this.defaultStoreOpts.name)) {
              _this.idb.deleteObjectStore(_this.defaultStoreOpts.name)
           }  
           _this.newDbVersion = e.newVersion;
           console.log('数据库版本更新成功！当前版本号是：'+_this.newDbVersion);
           //这里可以创建对象仓库
           _this.store = _this.idb.createObjectStore(_this.defaultStoreOpts.name,_this.defaultStoreOpts.opts);
           console.log('数据库仓库创建成功名字为:'+_this.defaultStoreOpts.name);
           //创建索引
           for(var i=0;i<_this.defaultIndexOpts.length;i++){
               _this.store.createIndex(_this.defaultIndexOpts[i].name,_this.defaultIndexOpts[i].keyPath,_this.defaultIndexOpts[i].opts);
               console.log('索引创建成功，索引名称为：'+_this.defaultIndexOpts[i].name);
           }
         }
         return this;
     },
     //保存数据
     save:function(storename,data,callback,errorback){
        var _this = this;
        storename = storename ? storename : this.defaultStoreOpts.name;
        callback = callback ? callback :function(){console.log('保存成功！');};
        errorback = errorback ? errorback :function(){console.log('保存失败！');};
        data = data ? data :{
                  title: "Quarry Memories",
                  isbn: 123456
        }
        
        this.connect(function(){
              _this.transaction(function(){
                  var store = _this.tx.objectStore(storename);
                  var req = store.put(data);
                  req.onsuccess=function(e){
                       
                      callback.call(this);
                  }
                  req.onerror=function(e){
                    
                      errorback.call(this);
                  }
              },function(){
                 console.log('这里终止了事务了，但是并不进行任何操作！');
              }) 
        });
        
     },
    //新增一个根据主键值检索数据
     findusernamepassword:function(username,password,callback,errorback){
            var _this = this;
            var username = username ? username : ''; 
            var password = password ? password : ''; 
            callback = callback ? callback :function(){alert('登录成功！');};
            errorback = errorback ? errorback :function(){alert('登录失败！用户名或者密码错误！');};
            this.connect(function(){
              _this.transaction(function(){

                var store = _this.tx.objectStore(_this.defaultStoreOpts.name);
                var idx = store.index('usernamePasswordIndex');
                var req = idx.get([username,hex_md5(password)]);//要进行一下反加密
                req.onsuccess=function(){
                    if(this.result !== undefined){
                       //获取数据成功
                       callback.call(this);
                    }else{
                      //获取数据失败
                      errorback.call(this);
                    }

                }
                req.onerror=function(){
                  
                    errorback.call(this);
                }
              });
            });

     },
     close:function(){
          this.idb.close();
          this.idb = null;
          return this;
     }
}

//这里要进行一下判断看是不是在nodejs 或者electron 这样的环境之中
if ( typeof module === "object" && typeof module.exports === "function" ) {
    $('#ed-right-ctrl-bar').fadeIn();
    //与electron进行通信
    const {ipcRenderer,dialog} = require('electron')
    const fs = require('fs');
    const ModeList = modelist;
    ipcRenderer.on('ctrlbar-message', (event, arg) => {
        switch(arg.type){
            case 'openfile':
                //在这里我们可以获取到相关的文件路径使用nodejs 的fs 来进行读取
                var fileurl = arg.fileurl;
                var filename = arg.filename;
                fs.readFile(fileurl,'utf8',function(err,data){
                    var mode = ModeList.getModeForPath(fileurl);

                    ed1.editor.session.doc.setValue(data);
                    //这里我们设置当前的tab标签页面
                    var filesData= JSON.parse(localStorage.getItem('files_data')) ? JSON.parse(localStorage.getItem('files_data')) : [];
                    var item = {filename:filename,fileurl:fileurl,name:mode.name,mode:mode.mode,content:data,active:true,cursor:{row: 0, column: 0}};
                    for(var i = 0, length1 = filesData.length; i < length1; i++){
                      filesData[i].active=false;
                    }
                    filesData.push(item);
                    ed1.initTabBar(filesData);
                    localStorage.setItem('files_data',JSON.stringify(filesData));
                    ed1.editor.session.setMode(mode.mode);
                    ed1.editor.session.modeName = mode.name;
                    ed1.editor.moveCursorTo(item.cursor.row,item.cursor.column);
                });
                break;
            case 'oringin':

                break;
            case 'close':

                break;
            case 'close':

                break;
            case 'close':

                break;
            case 'close':

                break;
        }
    })
    commands['minum']=function(){
        var data = {
            type:'minum'
        }
        ipcRenderer.send('ctrlbar-message',data)
    };
    commands['oringin']=function(){
        var data = {
            type:'oringin'
        }
        ipcRenderer.send('ctrlbar-message',data)
    };
    commands['close']=function(){
        var data = {
            type:'close'
        }
        ipcRenderer.send('ctrlbar-message',data)
    };
    commands['newfile']=function(){
        var data = {
            type:'newfile'
        }
        ipcRenderer.send('ctrlbar-message',data)

    };
    commands['openfile']=function(){
        var data = {
            type:'openfile'
        }
        ipcRenderer.send('ctrlbar-message',data)
    };
    commands['openfolder']=function(){
        var data = {
            type:'openfolder'
        }
        ipcRenderer.send('ctrlbar-message',data)
    };
    commands['savefile']=function(){
        var data = {
            type:'savefile'
        }
        ipcRenderer.send('ctrlbar-message',data)
    };
}