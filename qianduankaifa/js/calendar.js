/**
 * Created by Administrator on 2016/7/29.
 */
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