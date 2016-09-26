<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>优惠活动定制编辑器</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/bootstrap.css"/>
    <link href="js/flatui/css/flat-ui.css?=<?php echo rand();?>" rel="stylesheet">
    <link rel="stylesheet" href="css/spectrum.css?=<?php echo rand();?>"/>
    <link rel="stylesheet" href="css/smusic.css?=<?php echo rand();?>"/>
    <link rel="stylesheet" href="css/editor.css?=<?php echo rand();?>"/>
    <link rel="stylesheet" href="fonts/iconfont.css?=<?php echo rand();?>"/>
    <script type="text/javascript" src="js/jquery.js?=<?php echo rand();?>" onload="window.$ = window.jQuery = module.exports;"></script>
    <script type="text/javascript" src="js/spectrum.js?=<?php echo rand();?>"></script>
    <script type="text/javascript" src="js/i18n/jquery.spectrum-fi.js?=<?php echo rand();?>"></script>
    <script src="js/emmet.js?=<?php echo rand();?>"></script>
    <script src="js/ace/ace.js?=<?php echo rand();?>"></script>
    <script src="js/ace/ext-emmet.js?=<?php echo rand();?>"></script>
    <script src="js/ace/ext-searchbox.js?=<?php echo rand();?>"></script>
    <script src="js/ace/ext-keybinding_menu.js?=<?php echo rand();?>"></script>
    <script src="js/ace/keybinding-vim.js?=<?php echo rand();?>"></script>
    <script src="js/ace/keybinding-emacs.js?=<?php echo rand();?>"></script>
    <script src="js/ace/mode-autohotkey.js?=<?php echo rand();?>"></script>
    <script src="js/musicList.js?=<?php echo rand();?>"></script>
    <script src="js/wavesurfer.js?=<?php echo rand();?>"></script>
    <!--引入工具库-->
    <script src="js/util.js?=<?php echo rand();?>"></script>
    <!--引入webaudio封装js-->
    <script src="js/webaudio.js?=<?php echo rand();?>"></script>
    <!--引入音频可视化js-->
    <script src="js/lkmusic_visualizer.js?=<?php echo rand();?>"></script>
</head>
<body>
<div id="ed-top-tools-bar" class="row demo-row ">
    <div class="col-xs-12">
      <nav class="navbar navbar-inverse navbar-embossed navbar-fixed-top" role="navigation">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-01">
            <span class="sr-only">点击切换下拉菜单</span>
          </button>
          <a class="navbar-brand" >Lebo Editor</a>
        </div>
        <div class="collapse navbar-collapse" id="navbar-collapse-01">
          <ul class="nav navbar-nav navbar-left">
            <li class="dropdown">
              <a href="javascript://" class="dropdown-toggle" data-toggle="dropdown">文件 <b class="caret"></b></a>
              <span class="dropdown-arrow"></span>
              <ul class="dropdown-menu">
                <li><a href="javascript://" data-type="file" data-name="newfile" >新建文件</a></li>
                <li><a href="javascript://" data-type="file" data-name="openfile">打开文件</a></li>
                <li><a href="javascript://" data-type="file" data-name="savefile">保存</a></li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="javascript://" class="dropdown-toggle" data-toggle="dropdown">视图 <b class="caret"></b></a>
              <span class="dropdown-arrow"></span>
              <ul class="dropdown-menu">
                <li><a href="javascript://" data-type="view" data-name="split2">左右拆分1:1</a></li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="javascript://" class="dropdown-toggle" data-toggle="dropdown">工具栏 <b class="caret"></b></a>
              <span class="dropdown-arrow"></span>
              <ul class="dropdown-menu">
                <li><a href="javascript://" data-type="bold" >加粗</a></li>
                <li><a href="javascript://" data-type="itlic">斜体</a></li>
                <li><a href="javascript://" data-type="title">添加标题</a></li>
                <li><a href="javascript://" data-type="p">添加段落</a></li>
                <li class="divider"></li>
                <li><a href="javascript://" data-type="color"  data-name="col-red" data-color="red">加红色</a></li>
                <li><a href="javascript://" data-type="color"  data-name="col-blue" data-color="blue">加蓝色</a></li>
                <li><a href="javascript://" data-type="color"  data-name="col-yellow" data-color="yellow">加黄色</a></li>
                <li><a href="javascript://" data-type="color"  data-name="col-black" data-color="black">加黑色</a></li>
              </ul>
            </li>

            <li class="dropdown">
              <a href="javascript://" class="dropdown-toggle" data-toggle="dropdown">帮助<b class="caret"></b></a>
              <span class="dropdown-arrow"></span>
              <ul class="dropdown-menu">
                <li><a href="javascript://" data-type="settings" data-name="settings" >编辑器系统设置</a></li>
                <li><a href="javascript://" data-type="settings" data-name="userinfo">用户中心</a></li>
                <li><a href="javascript://" data-type="settings" data-name="forget">修改密码</a></li>
                <li><a href="javascript://" data-type="settings" data-name="colorsettings">颜色设置</a></li>
                <li><a href="javascript://" data-type="settings" data-name="about">关于编辑器</a></li>
              </ul>
            </li>
            <li><a href="javascript://"  data-type="loginregmodel" data-name="reg">注册</a></li>
            <li><a href="javascript://"  data-type="loginregmodel" data-name="login">登录</a></li>
           </ul>
            <ul class="nav navbar-nav navbar-right " id="ed-right-ctrl-bar">
                <li><a href="javascript://"  data-type="ctrtools" data-name="minum">
                    <span class="iconfont icon-suoxiao"></span>
                </a></li>
                <li><a href="javascript://"  data-type="ctrtools" data-name="oringin">
                    <span class="iconfont icon-huanyuan"></span>
                </a></li>
                <li><a href="javascript://"  data-type="ctrtools" data-name="close">
                    <span class="iconfont icon-guanbi2"></span>
                </a></li>
            </ul>
        </div><!-- /.navbar-collapse -->
      </nav><!-- /navbar -->
    </div>
</div> <!-- /row -->
<div id="ed-color-panel-list" class="ed-box-shadow ed-color-panel-list">
    <h2 class="ed-panel-title" ><a href="javascript://" onclick="$('#ed-color-panel-list').hide(500);" type="button" class="btn btn-default " aria-label="Right Align"><span class="glyphicon glyphicon-remove"></span></a></h2>
    <div class="ed-color-panel-body">
        <div class="color-swatches">
            <a class="color-swatch color-swatch-add gray-light" href="javascript://">
                <div class="glyphicon glyphicon-plus"></div>
            </a>
        </div>
    </div>
</div>
<!--左侧工具栏位-->
<div class="ed-left-sidebar-fixed">
       <div class="ed-left-sidebar-touch">
           <span class="fui-triangle-left-large"></span>
       </div>
       <!-- <div class="ed-tools-bar-area ed-tools">
          <h6>工具栏</h6>
          <a href="javascript://"><span class="fui-info-circle"></span></a>
          <a href="javascript://"><span class="fui-alert-circle"></span></a>
          <a href="javascript://"><span class="fui-question-circle"></span></a>
          <a href="javascript://"><span class="fui-check-circle"></span></a>
          <a href="javascript://"><span class="fui-cross-circle"></span></a>
          <a href="javascript://"><span class="fui-plus-circle"></span></a>
          <a href="javascript://"><span class="fui-window"></span></a>
          <a href="javascript://"><span class="fui-windows"></span></a>
          <a href="javascript://"><span class="fui-upload"></span></a>
        </div> -->
        <div class="ed-tools-bar-area ed-share">
          <h6>分享到</h6>
          <a href="javascript://"><span class="fui-vimeo"></span></a>
          <a href="javascript://"><span class="fui-twitter"></span></a>
          <a href="javascript://"><span class="fui-skype"></span></a>
          <a href="javascript://"><span class="fui-linkedin"></span></a>
          <a href="javascript://"><span class="fui-google-plus"></span></a>
          <a href="javascript://"><span class="fui-github"></span></a>
        </div>
        <div class="ed-tools-bar-area ed-small-tools">
          <h6>小工具</h6>
          <a href="javascript://" data-type="leftbar" data-name="calendar"><img src="js/flatui/img/icons/svg/calendar.svg" alt="日历"></a>
          <a href="javascript://" data-type="leftbar" data-name="clock"><img src="js/flatui/img/icons/svg/clocks.svg" alt="时间"></a>
          <a href="javascript://" data-type="leftbar" data-name="settings"><img src="js/flatui/img/icons/svg/chat.svg" alt="聊天"></a>
          <a href="javascript://" data-type="leftbar" data-name="music"><img src="js/flatui/img/icons/svg/loop.svg" alt="音乐循环"></a>
          
        </div>
</div>
<section>
    <div id="ed-body" class="ed-box-shadow  rel">
            <div id="ed-tab-bars">
              
            </div>
            <div class="cl"></div>
            <div id="ed-body-left">
                <pre id="ed-editor" ></pre>
            </div>
            <div id="ed-body-spiler"></div>
            <div id="ed-body-right">
                <iframe  src="result.html" style="position:relative;z-index:-100;" width="100%" height="100%" frameborder="0" class="ed-body-right-reslut"></iframe>
            </div>
    </div>
</section>
<script src="js/md5.js"></script>
<script src="js/flatui/js/vendor/video.js?=<?php echo rand();?>"></script>
<script src="js/flatui/js/flat-ui.js?=<?php echo rand();?>"></script>
<script src="js/editor.js?=<?php echo rand();?>"></script>
<!--<script src="show_own_source.js"></script>-->
</body>
</html>