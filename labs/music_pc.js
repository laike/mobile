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
        "message":"js/message",
        "TimeLine":"js/components/TimeLine",
        "harmerjs":"lib/hammer.min",
        'jquery.color':'lib/jquery.colorAnimations',
        'jquery.flashcolor':'js/jquery.flashcolor',
        "musicList":'js/musicList'

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
        },
        'jquery.color': {
            deps: ['jquery']
        }
        ,
        'jquery.flashcolor':{
            deps: ['jquery']
        },
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
        "harmerjs":{

        },
        "musicList":{

        }
    }
});
require(['jquery', 'underscore', 'backbone',"window","jquery.fullpage","jquery.easing","jquery.transition","RGBaster","lkmusic","canlendar","tips","jquery.emotion","blogdetail","blogindex","blogworks","message","harmerjs","musicList"],
    function ($, _, Backbone, w,fullpage,easing,transition,rgb,lkmusic,canlendar,tips,emotions,detail,blogindex,blogworks,message,timeline,harmerjs,list){

        //调用音乐播放器函数
        var lkmusicplayer = null;
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
        
            $('#grid-music-container-3d').css({visibility:'visible'})
            $('.expand-music-player').click(function(event){
                $('.grid-music-container').toggleClass('lrclist');
                $(this).find('i').toggleClass('fa-compress fa-expand');
            });

    });

