
/**
 * Created by Administrator on 2014/10/31.
 */
/*
 * 此文件用于管理包和模块
 * */

require.config({
    enforceDefine: false,//是否强制define
    urlArgs: "bust=" + (new Date()).getTime(),//时间戳
    waitSeconds: 200,//加载js等待时间
    paths: {
        "jquery": "lib/jquery",
        "underscore": "lib/underscore",
        "backbone": "lib/backbone",
        "widget":"js/components/widget",
        "window":"js/components/window",
        "canlendar":"js/components/canlendar",
        "jquery.fullpage":"lib/jquery.fullPage",
        "jquery.transition":"lib/jquery.transition.min",
        "jquery.easing":"lib/jquery.easing.min",
        "tips":"js/tips",
        "velocity":"lib/velocity/velocity.min", //动画库velocity
        "velocity-ui":"lib/velocity/velocity.ui.min",//动画库velocity  ui
        "jquery-ui":"http://cdn.bootcss.com/jqueryui/1.12.1/jquery-ui.min",//jqueryui 库js
        "RGBaster":'lib/RGBaster',
        "lkmusic":"js/lkmusic_visualizer",
        "util":'js/util',
        "webaudio":'js/webaudio',
        "common":"js/common",
        "jquery.emotion":'js/jquery.emotion',
        "blogdetail":"js/blog_detail",
        "blogindex":"js/blog_index",
        "blogworks":"js/blog_works",
        "H5":'js/H5',
        "H5_loading":'js/H5_loading',
        "H5ComponentBase":'js/H5ComponentBase'

    },
    /*对于那些没有采用AMD规范编写。如果要加载它们的话，必须先定义它们的特征，这里使用shim这个参数来进行配置*/
    shim: {
        "underscore": {
            deps: [],
            exports: "_"
        },
        "backbone": {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        },
        'jquery.fullpage': {
            deps: ['jquery'],
            exports: 'jQuery.fn.fullpage'
        }
        ,
        'jquery.easing': {
            deps: ['jquery'],
            exports: 'jQuery.fn.easing'
        }
        ,
        'jquery.transition': {
            deps: ['jquery'],
            exports: 'jQuery.fn.transition'
        },
        "velocity": {
            deps: [ "jquery" ]
        },
        // Optional, if you're using the UI pack:
        "velocity-ui": {
            deps: [ "velocity" ]
        },
        "RGBaster": {

        },
        "lkmusic": {

        },
        "common":{

        }
        ,
        "tips":{
            deps: ['jquery'],
            exports: 'jQuery.fn.tips'
        },
        "jquery.emotion":{
            deps: ['jquery'],
            exports: 'jQuery.fn.emotions'
        },
        "H5":{

        },
        "H5_loading":{

        },
        "H5ComponentBase":{

        }
    }
});
require(['jquery', 'underscore', 'backbone',"window","jquery.fullpage","jquery.easing","jquery.transition","RGBaster","lkmusic","canlendar","tips","jquery.emotion","blogdetail","blogindex","blogworks"],
    function ($, _, Backbone, w,fullpage,easing,transition,rgb,lkmusic,canlendar,tips,emotions,detail,blogindex,blogworks){

        //调用音乐播放器函数
        var lkmusicplayer = null;
        //初始化拖动效果
        var oBox = document.getElementById("grid-music-container-3d");
        var oBar = document.getElementById("grid-music-container-3d");
        startDrag(oBar, oBox);
        new lkmusic.LMusic({
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
                    backgroundImage:'url(../Public/images/device-main.jpg)',
                    backgroundSize:'100% auto',
                    backgroundPosition:'50% top',
                    top:365
                }
            })
            .addPage('page2',{
                text:''
            })
            .addComponent('base',{
                name:'blog',
                type:'base',
                text:'',
                width:320,
                height:550,
                //html标签模板
                tpls:['.lk-blog-item1'],
                css:{
                    top:157,
                    left:'20%'
                }
            })
            .addComponent('base',{
                name:'blog_about',
                type:'base',
                text:'',
                width:556,
                height:550,
                //html标签模板
                tpls:['.lk-blog-about'],
                css:{
                    top:157,
                    right:'20%'
                }
            })
            .addPage('page3',{
                text:''
            })
            .addComponent('base',{
                name:'works',
                type:'base',
                text:'',
                width:1200,
                height:'100%',
                center:true,
                //html标签模板
                tpls:['.lk-blog-item2,.lk-blog-latest-work'],
                css:{
                    top:157
                }
            })
            .addPage('page4',{
                text:'',
                bg:'url(../Public/images/index_contact.jpg)',
            })
            .addComponent('base',{
                name:'contact',
                type:'base',
                text:'',
                width:1200,
                height:'100%',
                center:true,

                //html标签模板
                tpls:['.lk-blog-contack-item,.lk-blog-contact'],
                css:{
                    top:157
                }
            })
            .addPage('page5',{
                text:''
            })
            .addComponent('base',{
                name:'footer',
                type:'base',
                text:'',
                width:1200,
                height:'100%',
                center:true,
                //html标签模板
                tpls:['.lk-blog-footer'],
                css:{
                    top:310
                }
            })
            .loader(['images/logo.png'],1);


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

        $('.lk-right-controller').click(function(){
            $(this).toggleClass('active');
            if($(this).hasClass('fa-align-justify')){
                $(this).removeClass('fa-align-justify').addClass('fa-close');
            }else{
                $(this).removeClass('fa-close').addClass('fa-align-justify');
            }
            $('.grid-music-container').toggleClass('active');
            $('.navbar,.mask').toggleClass('active');
        });
        $('.expand-music-player').click(function(event){
            $('.grid-music-container').toggleClass('lrclist');
            if($('.grid-music-container').hasClass('lrclist')){
                $('.grid-music-container-3d').transition({
                    width:840,
                    height:520,
                    duration: 2500,
                    easing: 'easeOutQuad',
                    complete:function(){

                    }
                });
            }else{
                $('.grid-music-container-3d').transition({
                    width:540,
                    height:185,
                    duration: 2500,
                    easing: 'easeOutQuad',
                    complete:function(){

                    }
                });
            }

        });



    });

