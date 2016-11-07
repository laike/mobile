//这里我们新增一个音乐播放器
//定义一个用来存储lkmusic的对象
var lkmusicplayer = null;
var pause_control = document.getElementById('bg_musc_pause');
if(pause_control != undefined){
    pause_control.addEventListener('click',function(e){
        if($('.ctrl-play').hasClass('play')){
            lkmusicplayer.pause();
            $(this).removeClass('rotate');
            return false;
        }
        lkmusicplayer.play();
        $(this).addClass('rotate')
        return false;
    });
}

//绑定音乐播放器移动移出的事件
$('.grid-music-container').hover(function(){
    $(this).toggleClass('lrclist');
},function(){
    $(this).toggleClass('lrclist');
});

//初始化音乐播放器组件
//初始化音乐播放器组件
whenReady(function(){
    new LMusic({
        musicList : musicList,
        autoPlay  : true,  //是否自动播放
        defaultMode : 2,   //默认播放模式，随机
        offlineMode:true,
        callback   : function (obj) {  //返回当前播放歌曲信息
            lkmusicplayer = obj;
            //初始化插件
            $('.tips').tips();
        }
    });
    //添加返回顶部效果
    $('.lk-return-top').click(function(){
      $('body,html').animate({
        scrollTop:0
      },2000,'easeOutQuad');
    });
    $(window).scroll(function(){

          if($(window).scrollTop() > 80){

             $('.lk-return-top').addClass('active');
          }else{
              $('.lk-return-top').removeClass('active');
          }
    });
});
