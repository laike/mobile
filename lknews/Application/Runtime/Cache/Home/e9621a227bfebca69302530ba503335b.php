<?php if (!defined('THINK_PATH')) exit();?><html>
<head>
	<meta charset="UTF-8">
	<title>新闻页面</title>
	<!--font-awesome-->
    <link rel="stylesheet" href="/lknews/Public/Font-Awesome/css/font-awesome.min.css">
    <!-- Bootstrap -->
    <link href="/lknews/Public/bs/bootstrap.css" rel="stylesheet">
    <!--是否引入主题-->
    <!--<link rel="stylesheet" href="/lknews/Public/bs/bootstrap-theme.min.css"/>-->
    <!--引入页面重置样式-->
    <link rel="stylesheet" href="/lknews/Public/css/lknews.css">
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="/lknews/Public/lib/respond.min.js"></script>
    <![endif]-->
    <script src="/lknews/Public/lib/jquery-1.10.0.min.js"></script>
	<script src="/lknews/Public/bs/bootstrap.min.js"></script>
    <!--针对苹果设备的一些优化和功能体验-->
    <link rel="apple-touch-icon" href="/lknews/Public/images/icon.png" ><!--添加至桌面-->
    <meta name="apple-mobile-web-app-capable" content="yess"><!--是否允许全屏-->
</head>
<body>

	<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
		  <div class="container">
		    <!-- Brand and toggle get grouped for better mobile display -->
		    <div class="navbar-header">
		      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
		        <span class="sr-only">移动端切换</span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		      </button>
		      <a class="navbar-brand" href="/lknews">随风新闻</a>
		    </div>

		    <!-- Collect the nav links, forms, and other content for toggling -->
		    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		      <ul class="nav navbar-nav">
		      <li class="active"><a href="/lknews/Home/News/news/">首页</a></li>
		      
		      <?php echo $navs=W('Nav/nav');?>
		      <?php if(is_array($navs)): foreach($navs as $index=>$nav): if(($index) <= "4"): ?><li ><a href="<?php echo ($nav["url"]); ?>"><?php echo ($nav["name"]); ?></a></li><?php endif; endforeach; endif; ?>
		      </ul>
		      
               <form class="navbar-form navbar-right" role="search">
		        <div class="form-group">
		          <input type="text" class="form-control" placeholder="请输入关键字">
		        </div>
		        <button type="submit" class="btn btn-default">搜索</button>
		      </form>
		    </div><!-- /.navbar-collapse -->
		  </div><!-- /.container-fluid -->
		</nav>

左边分栏
主内容
右边分栏

	

</body>
</html>