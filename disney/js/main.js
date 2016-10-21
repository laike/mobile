var popWindow = (function(){
    var popWinArr = [];
    var id = '';
    //创建新弹出窗口
    var createWin=function(name,cfg){
        var cfg = $.extend({
            showtitle:true,
            showclose:true,
            spantitle:'提示信息',
            closetext:'',
            isremove:false,
            autoshow:false,
            center:true,
            content:'在这里添加内容！',
            onclose:function(event){
                $('#'+id).fadeOut(500,function(){
                    if(cfg.isremove){
                        $(this).remove();
                    }
                });
                $('.ed-ui-mask').fadeOut(500);
            },
            oncomplete:function(event){

            },
            callback:function(id){

            }
        },cfg);
        if($('.ed-ui-mask').length === 0 ){
            $('body').append('<div class="ed-ui-mask"></div>');
        }
        var id = (Math.random()).toString().replace('.','_')+name;
        var cl = 'ed-ui-popwindow ed-box-shadow';

        var win = document.createElement('div');
        win.className = cl;
        win.id = id;
        var title = document.createElement('h2');
        title.className = 'ed-ui-poptitle clearfix';
        if(cfg.showtitle){
            var spantitle = document.createElement('div');
            spantitle.className = 'title clearfix l';
            spantitle.innerHTML = cfg.spantitle;
        }
        if(cfg.showclose){
            var spanclose = document.createElement('i');
            spanclose.className = 'close fa fa-times';
            spanclose.setAttribute('aria-hidden','true');
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
        win.style.display='none';

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
        if(cfg.autoshow){
            $(win).fadeIn(500);
            $('.ed-ui-mask').fadeIn(500);
        }

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
                if(cfg.autoshow){
                    this.show(popWinArr[name]);
                }
                return this;
            }
            //否则重新创建
            popWinArr[name]=createWin(name,cfg);
            return this;
        },
        destroyWin:function (){
            $('.ed-ui-mask').fadeOut(500);
            destroyWin(this.popwin);
        },
        show:function(ele){
            $(ele).fadeIn(500);
            $('.ed-ui-mask').fadeIn(500);
        },
        hide:function(ele){
            $(ele).fadeOut(500);
            $('.ed-ui-mask').fadeOut(500);
        }
    }

})();
//计算
function totalNum(obj){
    if(obj){
        var num = parseInt(obj.value);
        if(isNaN(num)){
           obj.value=0;
           return;
        }
    }
   var total = 0;
   popWin.find('.dn-bet-order-list-content input[type=number]').each(function(index, el) {
       total += parseInt($(el).val());
   });
   popWin.find('.total').html(total);
}
 //当键盘向上抬起时触发的事件
function presetOrderNum(obj){
    var num = parseInt(obj.value);
    if(isNaN(num)){
       obj.value=0;
       return;
    }
    //这里进行操作
    popWin.find('.dn-bet-order-list-content input[type=number]').val(num);
    totalNum();

}
var orderPopWinId="";
var orderPopWin=null;
var popWin=null;
$(document).ready(function(){
    $('.dn-order-bet-item').click(function(){
        var _self = $(this);
        _self.toggleClass('dn-bet-active');
        _self.find('.dn-bet-active-arrow').toggle();
    });

    orderPopWin = popWindow.createPopWin('orderPopPanel',{
        spantitle:' <div class="l pdl5 ">金额'+
        '</div>'+
        '<div class="l pdl5 ">'+
           '<input type="number"  min="1" class="w140 tc l presetnumber"   pattern="\d*" onkeyup="presetOrderNum(this)">'+
        '</div>'+
        '<div class="l pdl5 ">'+
        '<input  type="checkbox" >&nbsp;&nbsp;预设'+
        '</div>',
        content:
        '<div class="row bdgray tc">'+
            '<div class="pd10 clearfix">'+
                '<div class="col-xs-4">号码</div>'+
                '<div class="col-xs-2">赔率</div>'+
                '<div class="col-xs-4">金额</div>'+
            '</div>'+
        '</div>'+
        '<div class="clearfix dn-bet-order-list bdgray pd10 tc">'+
             '<div class="row pd10 dn-bet-order-list-content">'+
                 '<div class="col-xs-4">'+
                     '<div class="name">冠，亚军和</div>'+
                     '<div class="result">冠亚小</div>'+
                 '</div>'+
                 '<div class="col-xs-2">'+
                      '<span class="col-red fb">1.79</span>'+
                 '</div>'+
                 '<div class="col-xs-6">'+
                    '<input type="number" min="1" class="w115 tc l "   pattern="\d*">'+
                    '<i class="close fa fa-times pdl5 l" aria-hidden="true"></i>'+
                 '</div>'+
             '</div>'+
        '</div>'+
        '<div class="row bdgray tc pd10">'+
            '<div class="col-xs-5">组数：<span class="totalGroup">2</span></div>'+
            '<div class="col-xs-7">金额：<span class="total"></span></div>'
        +'</div>'+
        '<div class="row tc">'+
           '<button type="button" class="btn btn-primary w120 mg10 dn-bet-order-confirm">确认</button>'
        +'</div>',
        callback:function(id){
            orderPopWinId = id;
            var container = $('#'+id);
            var h = container.height();
            var t = container.offset().top;
            var windowH = $(window).height();
            container.find('.dn-bet-order-list').height(windowH-h-t);
        }
    });
    //绑定隐藏
    $('.dn-bet-hide').click(function(){
        var _self = $(this);
        _self.parent().parent().next().toggle();
    });
    //获取弹出窗口id
    popWin = $('#'+orderPopWinId);

    popWin.find('.dn-bet-order-confirm').click(function(){
           var numInputs = popWin.find('.dn-bet-order-list-content input[type=number]');
           for(var i=0;i<numInputs.length;i++){
                 var numStr = $(numInputs[i]).val();
                  if(numStr == ""){
                       alert('您输入类型不正确或没有输入实际金额！');
                       return;
                  }
           }
           //这里进行下注提交到后台服务器 ajax ...
           //这里先点击确定后关闭窗口
           alert('下注成功！');
           orderPopWin.hide(popWin);

    });
    //绑定下单
    $('.dn-bet-order').click(function(event){
      var _self = $(this);
      var _parent = _self.parent().parent().next();
      var name = _self.parent().parent().find('.name').html();
      //拼凑成一个数组
      var resultArr=[];
      var resultStr = '';
      var totalGroupNum=_parent.find('.dn-bet-active').length;
      if( totalGroupNum=== 0){
        return;
      }
       _parent.find('.dn-bet-active').each(function(index, el) {
          var result= $(el).find('.title').html();
          var num = parseFloat($(el).find('.num').html());
          resultArr.push({
            result:result,
            num:num
          });
          resultStr+='<div class="row pd10 dn-bet-order-list-content">'+
                 '<div class="col-xs-4">'+
                     '<div class="name">'+name+'</div>'+
                     '<div class="result">'+result+'</div>'+
                 '</div>'+
                 '<div class="col-xs-2">'+
                      '<span class="col-red fb">'+num+'</span>'+
                 '</div>'+
                 '<div class="col-xs-6">'+
                    '<input type="number" min="1" class="w115 tc l "   pattern="\d*" onkeyup="totalNum(this)" onchange="totalNum(this)">'+
                    '<i class="close fa fa-times pdl5 l" aria-hidden="true" ></i>'+
                 '</div>'+
             '</div>';

      });
       _parent.find('.dn-bet-active').removeClass('dn-bet-active');
       _parent.find('.dn-bet-active-arrow').hide();
       popWin.find('.dn-bet-order-list').html(resultStr);
       popWin.find('.totalGroup').html(totalGroupNum);
       popWin.find('.presetnumber').val('');
       orderPopWin.show(popWin);

    });
});
