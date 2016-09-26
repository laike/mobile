<?php
return array(
	//'配置项'=>'配置值'
	'TMPL_TEMPLATE_SUFFIX'=>'.html',
	'DEFAULT_V_LAYER'=>'View',//默认视图名称
	'TMPL_FILE_DEPR'=>'_',
	'DEFAULT_THEME'=>'default',
	'DEFAULT_FILTER'=> 'strip_tags,htmlspecialchars',
	'MODULE_DENY_LIST'=>  array('Common','Runtime'), // 禁止访问的模块列表
	//数据库配置
	'DB_TYPE'=>'mysql',//数据库类型
	'DB_USER'=>'root',//用户名
	'DB_PWD'=>'root',//密码
	'DB_PREFIX'=>'pre_',//数据库表前缀
	'DB_DSN'=>'mysql:host=localhost;dbname=lknews;charset=utf8',//pdo链接字符串
);