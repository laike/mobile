<?php

namespace Home\Widget;

use Think\Controller;
/**
 * 导航栏widget
 */
class NavWidget extends Controller{

    public function nav(){

    	$nav = D('Nav');
    	$navs = $nav->where(array('available'=>1))->select();

    	return $navs;

    }
}