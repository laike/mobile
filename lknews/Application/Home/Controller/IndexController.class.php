<?php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
    public function index(){
        $this->theme('default')->display();
    }
    public function news(){
    	$this->theme('default')->display();
    }
}