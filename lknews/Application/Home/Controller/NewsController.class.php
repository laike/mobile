<?php
namespace Home\Controller;
use Think\Controller;
class NewsController extends Controller {

    public function index(){

        $this->theme('default')->display('news');
    }
    
    public function news(){
    	
    	$this->theme('default')->display();
    }
}