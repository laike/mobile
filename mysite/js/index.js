
var H5 = new H5();
H5.addPage('page1',{
  text:''
})
.addComponent('base',{
    name:'caption',
    type:'base',
    text:'',
    width:520,
    height:115,
    center:true,
    //html标签模板
    tpls:['.caption'],
    css:{
     background:'',
     top:230
   }
})
.addComponent('base',{
    name:'next_page',
    type:'base',
    html:'<i class="fa fa-chevron-down" aria-hidden="true"></i>',
    width:50,
    height:50,
    center:true,
    css:{
     top:890
   }
})
.addComponent('base',{
    name:'computer',
    type:'base',
    text:'',
    width:600,
    height:353,
    center:true,
    //html标签模板
    tpls:['.computer'],
    css:{
     backgroundImage:'url(./images/device-main.jpg)',
     backgroundSize:'100% auto',
     backgroundPosition:'50% top',
     top:365
   }
})
.addPage('page2',{
  text:'测试第二屏'
})
.addPage('page3',{
  text:'测试第三屏'
})
.addPage('page4',{
  text:'测试第四屏'
})
.addPage('page5',{
  text:'测试第五屏'
})
.loader(['images/logo.png']);

//初始化插件
$('.tips').tips();

//这里我们新增一个音乐播放器
var volume = 0.5;
var audio = document.getElementById('site_bg_music');
var pause_control = document.getElementById('bg_musc_pause');
audio.volume = volume;
pause_control.addEventListener('click',function(e){
    if(!audio.paused){
        audio.pause();
        return false;
    }
    audio.play();
    return false;
});
