//rem自适应调节
(function(win,doc){
	var resizeEvt = 'orientationchange' in win ? 'orientationchange' :'resize';
	var docEl = doc.documentElement;
	var onDeviceResize = function(){
        docEl.style.fontSize = 20 * (docEl.clientWidth/640) +'px';
	};
	win.addEventListener(resizeEvt, onDeviceResize,false);
	doc.addEventListener('DOMContentLoaded', onDeviceResize,false);
	/*var $=function(selector){
          return document.querySelector(selector);
	};
	var $$ = function(selector){
		return document.querySelectorAll(selector);
 	};*/
})(window,document);
//页面逻辑js
$(document).ready(function(){
  loading();
  var hammertime = new Hammer(document.getElementById('app-body'));
  hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
  // hammertime.on("panleft panright panup pandown tap press", function(ev) {
  //        switch(ev.type){
  //          case 'panleft':
  //             $('body').addClass('m-bar-push-right');
  //             $('.mask').fadeIn(500);
  //
  //            break;
  //          case 'panright':
  //             $('body').removeClass('m-bar-push-right');
  //             $('.mask').fadeOut(500);
  //             break;
  //        }
  // });
  $('.mask').click(function(){
    $('.mask').fadeOut(500);
    $('body').toggleClass('m-bar-push-right');
    $('.m-right-push-bar').toggleClass('m-push-bar-right');

  });
  $('.member-area a').click(function(){
    if($('body').hasClass('m-bar-push-right')){
      $('.mask').fadeOut(500);
    }else{
      $('.mask').fadeIn(500);
    }
    $('body').toggleClass('m-bar-push-right');
    $('.m-right-push-bar').toggleClass('m-push-bar-right');
  });
  //右侧点击效果
  $('.m-right-push-bar .list a').click(function(evt){
      var _this = this;
      $('.m-right-push-bar .list a').removeClass('active');
      $(_this).addClass('active');
  });
  //下拉列表
  $('.header-nav ul li a').click(function(){
      var data_rel = $(this).data('rel');
      $('.header-nav a').removeClass('active');
      $(this).addClass('active');
      $('.downlist').hide();
      $('.mask1').fadeIn(500);
      $('.downlist[data-rel='+data_rel+']').slideToggle();
  });
  $('.mask1').click(function(){
    $('.mask1').fadeOut(500);
    $('.downlist').hide();
    $('.header-nav a').removeClass('active');
  });



});
//我们这里转而使用iscroll 这个插件来替代移动端滚动区域的问题
var Scroll = null;
function scrollRefresh(){
  var tm=setTimeout(function(){
    clearTimeout(tm);
    Scroll.refresh();
  },1000);
}
function resize(){
  //设置appbody的高度
  var height = $(window).height()-$('.header').height()-$('.header-nav').height()-$('.foot-touzhu').height()-20;
  $('.app-body').height(height);
  scrollRefresh();
}
function loaded() {
    if($('#wrapper').length !=0){
      //绑定resize
      resize();
      $(window).resize(resize);
      setTimeout(function(){
        Scroll = new IScroll('#wrapper',{ mouseWheel: true, preventDefault: false,useTransform:true, click:true,useTransition:true,HWCompositing:false,scrollbars:false});
      },2000);
    }
}
document.addEventListener('DOMContentLoaded', loaded);
/**
 * time 秒为单位
 */
function secondToTime(time){
    var hours = Math.floor(time/3600);
    var minute = Math.floor(time%3600/60);
    var seconds = Math.ceil(time%3600%60);
    return (hours == 0 ? '' : hours > 0 && hours.toString().length<2 ? '0'+hours+':' : hours+':') +(minute.toString().length<2 ? '0'+minute+':' : minute+":")+(seconds.toString().length<2 ? '0'+seconds : seconds);
}

//ng模拟部分
var app = angular.module('myApp', ['ngAnimate']);
app.controller('lotteryCtrl', function($scope,$rootScope,$interval) {
    $scope.week1= 20160922028+Math.floor(Math.random()*10);
    $scope.week2= 20160922028+Math.floor(Math.random()*10);
    var time = 5890;
    $scope.cutdowntime = 10;
    $scope.time = secondToTime(time);//以秒为单位
    $scope.rotateClass = 'rotate';
    $scope.countdown = 10;
    //每隔十秒刷新下
    $interval(function () {
      if(time<=0){
         return;
      }
      if($scope.cutdowntime<=0){
            $scope.cutdowntime = 10;
      }
      $scope.cutdowntime--;
      $scope.time=secondToTime(--time);
    }, 1000);
    //每隔十秒钟进行一下刷新
    function refreshLotteryData(){
      $scope.lotteryData  =[
        [
          {name:'总和大',num:(Math.random()*3).toFixed(3)},
          {name:'总和小',num:(Math.random()*3).toFixed(3)},
          {name:'总和单',num:(Math.random()*3).toFixed(3)},
          {name:'总和双',num:(Math.random()*3).toFixed(3)},
          {name:'龙',num:(Math.random()*3).toFixed(3)},
          {name:'虎',num:(Math.random()*3).toFixed(3)},
          {name:'总和双',num:(Math.random()*3).toFixed(3)},
        ],
        [
          {name:'总和大',num:(Math.random()*3).toFixed(3)},
          {name:'总和小',num:(Math.random()*3).toFixed(3)},
          {name:'总和单',num:(Math.random()*3).toFixed(3)},
          {name:'总和双',num:(Math.random()*3).toFixed(3)},
          {name:'龙',num:(Math.random()*3).toFixed(3)},
          {name:'虎',num:(Math.random()*3).toFixed(3)},
          {name:'总和双',num:(Math.random()*3).toFixed(3)},
        ],
        [
          {name:'总和大',num:(Math.random()*3).toFixed(3)},
          {name:'总和小',num:(Math.random()*3).toFixed(3)},
          {name:'总和单',num:(Math.random()*3).toFixed(3)},
          {name:'总和双',num:(Math.random()*3).toFixed(3)},
          {name:'龙',num:(Math.random()*3).toFixed(3)},
          {name:'虎',num:(Math.random()*3).toFixed(3)},
          {name:'总和双',num:(Math.random()*3).toFixed(3)},
        ],
        [
          {name:'总和大',num:(Math.random()*3).toFixed(3)},
          {name:'总和小',num:(Math.random()*3).toFixed(3)},
          {name:'总和单',num:(Math.random()*3).toFixed(3)},
          {name:'总和双',num:(Math.random()*3).toFixed(3)},
          {name:'龙',num:(Math.random()*3).toFixed(3)},
          {name:'虎',num:(Math.random()*3).toFixed(3)},
          {name:'总和双',num:(Math.random()*3).toFixed(3)},
        ],
        [
          {name:'总和大',num:(Math.random()*3).toFixed(3)},
          {name:'总和小',num:(Math.random()*3).toFixed(3)},
          {name:'总和单',num:(Math.random()*3).toFixed(3)},
          {name:'总和双',num:(Math.random()*3).toFixed(3)},
          {name:'龙',num:(Math.random()*3).toFixed(3)},
          {name:'虎',num:(Math.random()*3).toFixed(3)},
          {name:'总和双',num:(Math.random()*3).toFixed(3)},
        ],
        [
          {name:'总和大',num:(Math.random()*3).toFixed(3)},
          {name:'总和小',num:(Math.random()*3).toFixed(3)},
          {name:'总和单',num:(Math.random()*3).toFixed(3)},
          {name:'总和双',num:(Math.random()*3).toFixed(3)},
          {name:'龙',num:(Math.random()*3).toFixed(3)},
          {name:'虎',num:(Math.random()*3).toFixed(3)},
          {name:'总和双',num:(Math.random()*3).toFixed(3)},
        ],
        [
          {name:'总和大',num:(Math.random()*3).toFixed(3)},
          {name:'总和小',num:(Math.random()*3).toFixed(3)},
          {name:'总和单',num:(Math.random()*3).toFixed(3)},
          {name:'总和双',num:(Math.random()*3).toFixed(3)},
          {name:'龙',num:(Math.random()*3).toFixed(3)},
          {name:'虎',num:(Math.random()*3).toFixed(3)},
          {name:'总和双',num:(Math.random()*3).toFixed(3)},
        ]

      ];

    };
    $interval(function () {

      refreshLotteryData();
      //刷新scroller
      scrollRefresh();

    }, 10000);
    $scope.rotate = function() {
        $scope.rotateClass = $scope.rotateClass == 'rotate' ? '' : 'rotate';
    };
    $scope.isshow = false;
    //模拟数据
    refreshLotteryData();
    $scope.touzhuData = [];
    //设置默认数量
    $scope.presetNums = 10;
    //绑定投注方法
    // $scope.touzhu = function(event){
    //      var list = $(event.target).parent().parent();
    //      list.find('.active').each(function(index,item){
    //           $scope.touzhuData.push({name:$(item).find('.text').html(),num:Number($(item).find('.num').html()),index:index,default:$scope.presetNums});
    //      });
    //      //touzhuData['title'] = list.find('.title').html();
    //      Pop.show();
    // };
    $scope.touZhuBtnClick = function(){
         var list = $('.order-container');
         list.find('.active').each(function(index,item){
              $scope.touzhuData.push({name:$(item).find('.text').html(),num:Number($(item).find('.num').html()),index:index,default:$scope.presetNums});
         });
         //touzhuData['title'] = list.find('.title').html();
         Pop.show();
    };


    $scope.toggle=function(event){
      $(event.target).parent().siblings('.order-area').slideToggle();
      $(event.target).toggleClass('updown');
    }

    $scope.toggleItem=function(event){
          $(event.target).is('span') ? $(event.target).parent().toggleClass('active') : $(event.target).toggleClass('active');
    };

    $scope.deleteItem = function(event){
        // $(event.target).parent().parent().remove();
         //这里我们要;
         $scope.touzhuData.splice( Number($(event.target).data('index')),1);
    };
    //计算total
    $scope.total = function(){
        var totalPrice=0;
        $('.m-lottery-list tr td input').each(function(index,item){
          totalPrice = totalPrice + parseInt($(item).val());
        });
        return totalPrice;
    }
    //投注单数
    $scope.totalNums = function(){
        return $scope.touzhuData.length;
    }
    $scope.submitData = function(){
        Pop.hide();
        //然后可以调用Ajax然后显示出投注结果

        Pop1.show();
    }
    $scope.closeResultPanel = function(){
        Pop1.hide();
        $scope.touzhuData = [];
    }
    $scope.onkeyup=function(event){
       $scope.touzhuData[Number($(event.target).data('index'))].default = Number($(event.target).val());
    }



});
//创建一个弹出窗口的函数
var Pop = (function(){
       return{
           show:function(){
              $('.mask2,#touzhuPanel').fadeIn();
           },
           hide:function(){
              $('.mask2,#touzhuPanel').fadeOut();
           }
       }
})();
var Pop1 = (function(){
       return{
           show:function(){
              $('.mask3,#resultPanel').fadeIn();
           },
           hide:function(){
              $('.mask3,#resultPanel').fadeOut();
           }
       }
})();
//工厂模式
var Class = {
  create:function(){
    return function(){
      this.init.apply(this,arguments);
    }
  }
};
Marquee = Class.create();
Marquee.prototype={
    init:function(element,height){
        this.element = document.getElementById(element);
        if(!this.element){
          return;
        }
        this.height = height;
        this.element.innerHTML += this.element.innerHTML;
        this.maxHeight = this.element.scrollHeight/2;

        this.time = null;//定时器这里我们使用setTimeout来进行实现
        this.counter = 0;//动画计数器
        this.scroll();//开始滚动
        this.element.onmouseout = function(){
            this.time = setTimeout(this.scroll.bind(this),1000);
        }.bind(this);
        this.element.onmouseover= this.stop.bind(this);
    },
    scroll:function(){
        //滚动区域主要函数
        if(this.element.scrollTop < this.maxHeight){
           this.element.scrollTop++;
           this.counter++;
        }else{
           this.element.scrollTop = 0;
           this.counter = 0;
        }
        //这里我们进行
        if(this.counter<this.height){
          this.time = setTimeout(this.scroll.bind(this),20);
        }else{
          this.counter = 0;
          this.time = setTimeout(this.scroll.bind(this),3000);
        }
    },
    stop:function(){
       //清除计时器
       clearTimeout(this.time);
    }
};
var marquee = new Marquee('m-announce','24');

//页面切换时候的加载效果
 function loading(opt) {
        var opts = $.extend({
            loadingcls: '.loader',
            landscapecls: '.landscape',
            contentcls: 'body',
            duration: 2000
        }, opt);
        var content = $(opts.contentcls);
        var loading = $(opts.loadingcls);
        $(content).fadeIn(opts.duration);
				
				setTimeout(function() {
						loading.fadeOut(500);
				}, 3000);
  }



