<!DOCTYPE html>
<html xmlns:wb="http://open.weibo.com/wb">
  <head>
    <meta charset="utf-8">
    <title>赖家大院首页</title>
    <meta name="format-detection" content="telephone=no,email=no,date=no,address=no">
    <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
      <link rel="shortcut icon" type="image/ico" href="favicon.ico?version=6.0.8">
    <script src="lib/jquery.js"></script>
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link href='//cdn.webfont.youziku.com/webfonts/nomal/18402/46758/58097c07f629dc16e0c10a08.css' rel='stylesheet' type='text/css' />
    <script src="lib/jquery.fullPage.js"></script>
    <script src="lib/jquery.easing.min.js"></script>
    <script src="lib/jquery.transition.min.js"></script>
    <script src="lib/RGBaster.js"></script>
    <!--lkmusic-->
    <link rel="stylesheet" href="css/lk.css">
    <link rel="stylesheet" href="css/blog.css">
    <script src="js/musicList.js"></script>
    <script src="js/wavesurfer.js"></script>
    <!--引入工具库-->
    <script src="js/util.js"></script>
    <!--引入webaudio封装js-->
    <script src="js/webaudio.js"></script>
    <!--引入音频可视化js-->
    <script src="js/lkmusic_visualizer.js"></script>
    <script src="js/tips.js"></script>

  </head>
  <body>
  <!--头部-->
  <header >
   <div class="global lk-header">
       <div class=" w1200 rel mc  h100 clearfix">
           <!--logo-->
           <div class="logo l">
               <img src="images/logo.png" alt="">
           </div>
           <!--navigation list-->
           <ul class="r rel nav">
               <li><a href="">首页</a></li>
               <li ><a href="" class="active">作品</a></li>
               <li><a href="">博客</a></li>
               <li><a href="">留言</a></li>
               <li><a href="">实验室</a></li>
               <li><a href="">前端资源 &nbsp;&nbsp;<i class="fa fa-angle-down" aria-hidden="true"></i></a></li>
           </ul>
       </div>
   </div>
  </header>
  <!--内容展示区域-->
  <section >
     <div class="global lk-content mgt50">
         <div class="h100 w1280 rel mc clearfix lk-grid-container">
                <div class="lk-blog-content">
                   <article>
                     <div class="lk-blog-list-item clearfix">
                            <header>
                              <div class="rel header clearfix">
                                  <h1><span class="oringinal">【原创】</span> <a href="">HTML5音乐列表播放器SMusic开发总结</a></h1>
                                  <div class="date-time">
                                    <span class="day">17</span>
                                    <span class="date">05月&nbsp;2015</span>
                                  </div>
                              </div>
                            </header>
                            <section>
                              <div class="rel content clearfix">
                                <img src="images/blog_cover1.jpg" class="l" alt="" />
                                前段时间写过一篇介绍简单音乐播放器效果开发的博文《<a href="">为你的博客添加简单的CSS3音乐播放器</a>》，实现了单曲循环播放效果，
                                这个效果也是我的博客首页一直有的效果，同时文中也介绍了一些简单的HTML5 <span class="col-red">Audio</span>标签的属性和方法，如 <span class="col-red">play()</span> ,
                                <span class="col-red">paused()</span>等。
                                当然，之前的效果只适合诸如博客或者某个单页面（如专题页面）使用。而现在的可以称之为完整版的播放器弥补了之前的不足，增加了列表播放，
                                音量控制，播放进度，播放时间以及播放模式，上一曲，下一曲等功能，除了歌词外，基本就是个播放器了（本来就是播放器）。除了上述介绍的功能外，
                                有必要说明一下的是，为了迎合新东家的口味，编码时，JavaScript部分采用原生来写，没有使用之前的jQuery库，代码量可能大了点，加上注释，应该在400来行。
                                这也是我第一次采用纯原生JavaScript来写插件，因此，代码中有很多不足还望指出。
                                音乐文件本来想使用其他音乐网站的接口来着，但是百度了很久，也没有找到一个开放的接口，应该是音乐之类的有版权限制。
                                如果哪位知道有此类接口烦请告知一声，<a href="">demo</a>中的音乐文件列表是我下载了几首上传到服务器上弄得（如果有喜欢的音乐可以获取地址后添加到QQ空间背景音乐哦），(⊙﹏⊙)b。
                                播放器界面上基本没考虑太多，把百度新首页（需登录）的音乐播放器界面改了下，因此这款播放器也可以称之为仿百度首页音乐播放器。
                              </div>
                            </section>
                            <footer>
                                <div class="rel footer clearfix">
                                    <div class="continute-read ">
                                      <a href="">  继续阅读 →</a>
                                    </div>
                                    <div class="tags l">
                                       <i class="fa fa-tag" aria-hidden="true"></i>
                                       <span>html5</span>
                                       <span>css3</span>
                                       <span>audio</span>
                                       <span>音乐</span>
                                       <span>javascript</span>
                                       <span>html5播放器</span>
                                       <span>列表</span>
                                       <span>播放器</span>
                                    </div>
                                    <div class="readcount r">
                                       <i class="fa fa-fire" aria-hidden="true"></i> <span>1.38 w</span>
                                       <i class="fa fa-comment" aria-hidden="true"></i><a href="">6</a>
                                    </div>
                                </div>
                            </footer>
                     </div>
                   </article>

                   <article>
                     <div class="lk-blog-list-item clearfix">
                            <header>
                              <div class="rel header clearfix">
                                  <h1><span class="oringinal">【原创】</span> <a href="">HTML5音乐列表播放器SMusic开发总结</a></h1>
                                  <div class="date-time">
                                    <span class="day">17</span>
                                    <span class="date">05月&nbsp;2015</span>
                                  </div>
                              </div>
                            </header>
                            <section>
                              <div class="rel content clearfix">
                                <img src="images/blog_cover2.jpg" class="l" alt="" />
                                前段时间写过一篇介绍简单音乐播放器效果开发的博文《<a href="">为你的博客添加简单的CSS3音乐播放器</a>》，实现了单曲循环播放效果，
                                这个效果也是我的博客首页一直有的效果，同时文中也介绍了一些简单的HTML5 <span class="col-red">Audio</span>标签的属性和方法，如 <span class="col-red">play()</span> ,
                                <span class="col-red">paused()</span>等。
                                当然，之前的效果只适合诸如博客或者某个单页面（如专题页面）使用。而现在的可以称之为完整版的播放器弥补了之前的不足，增加了列表播放，
                                音量控制，播放进度，播放时间以及播放模式，上一曲，下一曲等功能，除了歌词外，基本就是个播放器了（本来就是播放器）。除了上述介绍的功能外，
                                有必要说明一下的是，为了迎合新东家的口味，编码时，JavaScript部分采用原生来写，没有使用之前的jQuery库，代码量可能大了点，加上注释，应该在400来行。
                                这也是我第一次采用纯原生JavaScript来写插件，因此，代码中有很多不足还望指出。
                                音乐文件本来想使用其他音乐网站的接口来着，但是百度了很久，也没有找到一个开放的接口，应该是音乐之类的有版权限制。
                                如果哪位知道有此类接口烦请告知一声，<a href="">demo</a>中的音乐文件列表是我下载了几首上传到服务器上弄得（如果有喜欢的音乐可以获取地址后添加到QQ空间背景音乐哦），(⊙﹏⊙)b。
                                播放器界面上基本没考虑太多，把百度新首页（需登录）的音乐播放器界面改了下，因此这款播放器也可以称之为仿百度首页音乐播放器。
                              </div>
                            </section>
                            <footer>
                                <div class="rel footer clearfix">
                                    <div class="continute-read ">
                                      <a href="">  继续阅读 →</a>
                                    </div>
                                    <div class="tags l">
                                       <i class="fa fa-tag" aria-hidden="true"></i>
                                       <span>html5</span>
                                       <span>css3</span>
                                       <span>audio</span>
                                       <span>音乐</span>
                                       <span>javascript</span>
                                       <span>html5播放器</span>
                                       <span>列表</span>
                                       <span>播放器</span>
                                    </div>
                                    <div class="readcount r">
                                       <i class="fa fa-fire" aria-hidden="true"></i> <span>1.38 w</span>
                                       <i class="fa fa-comment" aria-hidden="true"></i><a href="">6</a>
                                    </div>
                                </div>
                            </footer>
                     </div>
                   </article>

                   <article>
                     <div class="lk-blog-list-item clearfix">
                            <header>
                              <div class="rel header clearfix">
                                  <h1><span class="oringinal">【原创】</span> <a href="">HTML5音乐列表播放器SMusic开发总结</a></h1>
                                  <div class="date-time">
                                    <span class="day">17</span>
                                    <span class="date">05月&nbsp;2015</span>
                                  </div>
                              </div>
                            </header>
                            <section>
                              <div class="rel content clearfix">
                                <img src="images/blog_cover3.jpg" class="l" alt="" />
                                前段时间写过一篇介绍简单音乐播放器效果开发的博文《<a href="">为你的博客添加简单的CSS3音乐播放器</a>》，实现了单曲循环播放效果，
                                这个效果也是我的博客首页一直有的效果，同时文中也介绍了一些简单的HTML5 <span class="col-red">Audio</span>标签的属性和方法，如 <span class="col-red">play()</span> ,
                                <span class="col-red">paused()</span>等。
                                当然，之前的效果只适合诸如博客或者某个单页面（如专题页面）使用。而现在的可以称之为完整版的播放器弥补了之前的不足，增加了列表播放，
                                音量控制，播放进度，播放时间以及播放模式，上一曲，下一曲等功能，除了歌词外，基本就是个播放器了（本来就是播放器）。除了上述介绍的功能外，
                                有必要说明一下的是，为了迎合新东家的口味，编码时，JavaScript部分采用原生来写，没有使用之前的jQuery库，代码量可能大了点，加上注释，应该在400来行。
                                这也是我第一次采用纯原生JavaScript来写插件，因此，代码中有很多不足还望指出。
                                音乐文件本来想使用其他音乐网站的接口来着，但是百度了很久，也没有找到一个开放的接口，应该是音乐之类的有版权限制。
                                如果哪位知道有此类接口烦请告知一声，<a href="">demo</a>中的音乐文件列表是我下载了几首上传到服务器上弄得（如果有喜欢的音乐可以获取地址后添加到QQ空间背景音乐哦），(⊙﹏⊙)b。
                                播放器界面上基本没考虑太多，把百度新首页（需登录）的音乐播放器界面改了下，因此这款播放器也可以称之为仿百度首页音乐播放器。
                              </div>
                            </section>
                            <footer>
                                <div class="rel footer clearfix">
                                    <div class="continute-read ">
                                      <a href="">  继续阅读 →</a>
                                    </div>
                                    <div class="tags l">
                                       <i class="fa fa-tag" aria-hidden="true"></i>
                                       <span>html5</span>
                                       <span>css3</span>
                                       <span>audio</span>
                                       <span>音乐</span>
                                       <span>javascript</span>
                                       <span>html5播放器</span>
                                       <span>列表</span>
                                       <span>播放器</span>
                                    </div>
                                    <div class="readcount r">
                                       <i class="fa fa-fire" aria-hidden="true"></i> <span>1.38 w</span>
                                       <i class="fa fa-comment" aria-hidden="true"></i><a href="">6</a>
                                    </div>
                                </div>
                            </footer>
                     </div>
                   </article>


                   <article>
                     <div class="lk-blog-list-item clearfix">
                            <header>
                              <div class="rel header clearfix">
                                  <h1><span class="oringinal">【原创】</span> <a href="">HTML5音乐列表播放器SMusic开发总结</a></h1>
                                  <div class="date-time">
                                    <span class="day">17</span>
                                    <span class="date">05月&nbsp;2015</span>
                                  </div>
                              </div>
                            </header>
                            <section>
                              <div class="rel content clearfix">
                                <img src="images/blog_cover4.jpg" class="l" alt="" />
                                前段时间写过一篇介绍简单音乐播放器效果开发的博文《<a href="">为你的博客添加简单的CSS3音乐播放器</a>》，实现了单曲循环播放效果，
                                这个效果也是我的博客首页一直有的效果，同时文中也介绍了一些简单的HTML5 <span class="col-red">Audio</span>标签的属性和方法，如 <span class="col-red">play()</span> ,
                                <span class="col-red">paused()</span>等。
                                当然，之前的效果只适合诸如博客或者某个单页面（如专题页面）使用。而现在的可以称之为完整版的播放器弥补了之前的不足，增加了列表播放，
                                音量控制，播放进度，播放时间以及播放模式，上一曲，下一曲等功能，除了歌词外，基本就是个播放器了（本来就是播放器）。除了上述介绍的功能外，
                                有必要说明一下的是，为了迎合新东家的口味，编码时，JavaScript部分采用原生来写，没有使用之前的jQuery库，代码量可能大了点，加上注释，应该在400来行。
                                这也是我第一次采用纯原生JavaScript来写插件，因此，代码中有很多不足还望指出。
                                音乐文件本来想使用其他音乐网站的接口来着，但是百度了很久，也没有找到一个开放的接口，应该是音乐之类的有版权限制。
                                如果哪位知道有此类接口烦请告知一声，<a href="">demo</a>中的音乐文件列表是我下载了几首上传到服务器上弄得（如果有喜欢的音乐可以获取地址后添加到QQ空间背景音乐哦），(⊙﹏⊙)b。
                                播放器界面上基本没考虑太多，把百度新首页（需登录）的音乐播放器界面改了下，因此这款播放器也可以称之为仿百度首页音乐播放器。
                              </div>
                            </section>
                            <footer>
                                <div class="rel footer clearfix">
                                    <div class="continute-read ">
                                      <a href="">  继续阅读 →</a>
                                    </div>
                                    <div class="tags l">
                                       <i class="fa fa-tag" aria-hidden="true"></i>
                                       <span>html5</span>
                                       <span>css3</span>
                                       <span>audio</span>
                                       <span>音乐</span>
                                       <span>javascript</span>
                                       <span>html5播放器</span>
                                       <span>列表</span>
                                       <span>播放器</span>
                                    </div>
                                    <div class="readcount r">
                                       <i class="fa fa-fire" aria-hidden="true"></i> <span>1.38 w</span>
                                       <i class="fa fa-comment" aria-hidden="true"></i><a href="">6</a>
                                    </div>
                                </div>
                            </footer>
                     </div>
                   </article>


                </div>
                <div class="lk-blog-side-bar">
                      <aside>
                            <div class="lk-blog-side-item">
                                   <ul class="category">
                                      <li><a href="">全部博文</a></li>
                                      <li class="active">
                                        <a href="">前端开发</a>
                                      </li>
                                      <ul class="secondary">
                                        <li><a href="">移动前端</a></li>
                                        <li><a href="">前端分享</a></li>
                                        <li><a href="">前端文档</a></li>
                                      </ul>
                                      <li><a href="">学习笔记</a></li>
                                      <li><a href="">且行且冥</a></li>
                                      <li><a href="">他山之石</a></li>
                                   </ul>
                            </div>
                      </aside>
                      <aside>
                         <div class="lk-blog-side-item">
                              <div class="sina-avatar-wall-bg">
                                     <div class="sina-avatar-container">
                                             <img src="images/logo.png" alt="" />
                                             <i class="fa fa-mars-stroke-v icon" aria-hidden="true"></i>
                                     </div>
                              </div>
                              <h2 class="sina-avatar-name tc">Laike</h2>
                              <p class="tc">
                                随风的个人网站 laijiadayuan.com 官方微博
                              </p>
                              <p class="tc">
                                  <a href="" class="btn btn-like"> <span><i class="fa fa-weibo" aria-hidden="true"></i>立即关注</span></a>
                              </p>
                              <div class="sina-info">
                                  <div class="info">
                                     <span class="num">40</span>
                                     <span class="text">关注</span>
                                  </div>
                                  <div class="info">
                                     <span class="num">353</span>
                                     <span class="text">粉丝</span>
                                  </div>
                                  <div class="info">
                                     <span class="num">431</span>
                                     <span class="text">微博</span>
                                  </div>
                              </div>
                         </div>
                      </aside>
                      <aside>
                         <div class="lk-blog-side-item">
                            <div class="inner">
                                <h2 class="title">标签</h2>
                                <div class="content lk-tags-list">
                                     <ul class="red">
                                          <li><a href="">测试</a></li>
                                          <li><a href="">测试</a></li>
                                          <li><a href="">测试</a></li>
                                          <li><a href="">测试</a></li>
                                          <li><a href="">测试</a></li>
                                          <li><a href="">测试</a></li>
                                          <li><a href="">测试</a></li>
                                          <li><a href="">测试</a></li>
                                          <li><a href="">测试</a></li>
                                          <li><a href="">测试</a></li>
                                     </ul>
                                </div>
                            </div>
                         </div>
                      </aside>
                      <aside>
                         <div class="lk-blog-side-item">
                            <div class="inner">
                                <h2 class="title">热门文章</h2>
                                <div class="content">

                                </div>
                            </div>
                         </div>
                      </aside>
                </div>
         </div>
     </div>
  </section>
  <!--尾部内容-->
  <footer >
     <div class="global lk-footer">
         <div class="h100 w1200 rel mc clearfix">
          <div class="lk-footer-webapp clearfix">
               <h2 class="l">Laike - 写代码的第一步学会为人处世</h2>
               <div class="lk-webapp r tips"  data-type="image" data-src="images/weixin2.png" data-direction="down" data-width="150">
                   <i class="fa fa-mobile" aria-hidden="true"></i>
                   移动版
               </div>
          </div>
             <div class="lk-footer-links clearfix">
                 <div class="l links">
                     <a href="" class="tips" data-direction="down" data-title="关于Laike">关于Laike</a>
                     <a href="" class="tips" data-direction="down" data-title="联系方式">联系方式</a>
                     <a href="" class="tips" data-direction="down" data-title="前端WEB圈">前端WEB圈</a>
                     <a href="" class="tips" data-direction="down" data-title="实验室">实验室</a>
                 </div>
                 <div class="abs contact">
                    <a href=""><span><i class="fa fa-github-alt tips"  data-direction="down" data-title="github开源仓库" aria-hidden="true"></i></span></a>
                    <a href=""><span><i class="fa fa-weibo tips"  data-direction="down" data-title="微博" aria-hidden="true"></i></span></a>
                    <a href=""><span><i class="fa fa-envelope tips"  data-direction="down" data-title="给我发邮箱！" aria-hidden="true"></i></span></a>
                    <a href=""><span  class="tips" data-type="image" data-src="images/weixin.png" data-direction="down" data-width="150"><i class="fa fa-weixin" aria-hidden="true"></i></span></a>
                 </div>
             </div>
             <div class="lk-copyright clearfix">
                 Copyright @2015-2016 Laike All Rights Reserved 盗版必究 v1.0.0  蜀ICP备12014235号
             </div>
         </div>
     </div>
  </footer>
  <!--返回顶部-->
  <div class="lk-return-top tips"  data-direction="down" data-title="返回顶部">
      <i class="fa fa-angle-up" aria-hidden="true"></i>
  </div>
  <!--音乐播放器组件-->
  <div class="grid-music-container-3d">
      <div class="grid-music-container f-usn">
          <div class="m-music-play-wrap">
              <div class="u-cover"></div>
              <div class="m-now-info">
                  <h1 class="u-music-title" ><strong>标题</strong><small>歌手</small></h1>
                  <div class="m-now-controls">
                      <div class="u-control u-process tips" data-title="0" data-direction="top">
                          <span class="buffer-process"></span>
                          <span class="current-process"></span>
                      </div>
                      <div class="u-control u-time">00:00/00:00</div>
                      <div class="u-control u-volume">
                          <div class="volume-process tips" data-volume="0.50" data-title="调节音量" data-direction="top">
                              <span class="volume-current"></span>
                              <span class="volume-bar"></span>
                              <span class="volume-event"></span>
                          </div>
                          <a class="volume-control"></a>
                      </div>
                  </div>
                  <div class="m-play-controls">
                      <a class="u-play-btn prev tips"  data-title="上一曲" data-direction="top"></a>
                      <a class="u-play-btn ctrl-play play tips"  data-title="暂停" data-direction="top"></a>
                      <a class="u-play-btn next tips"  data-title="下一曲" data-direction="top"></a>
                      <a class="u-play-btn mode mode-list current tips"  data-title="列表循环" data-direction="top"></a>
                      <a class="u-play-btn mode mode-random tips"  data-title="随机播放" data-direction="top"></a>
                      <a class="u-play-btn mode mode-single tips"  data-title="单曲循环" data-direction="top"></a>
                  </div>
              </div>
          </div>
          <div class="f-cb">&nbsp;</div>
          <div class="m-music-list-wrap"></div>
          <div class="cl"></div>
          <div class="m-music-lyric-wrap">
              <div class="inner-bg"></div>
              <div class="inner">
                  <ul class="js-music-lyric-content">
                      <li class="eof">暂无歌词...</li>
                  </ul>
              </div>
          </div>
          <div class="music-container-blur-bg"></div>
      </div>
  </div>
  <script src="js/common.js"></script>
  <script src="js/works.js"></script>
  </body>
</html>
