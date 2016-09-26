<?php
    if($_POST){
    	$txt = $_POST['txt'];
    }else{
    	$txt = file_get_contents('./demo.txt', true);
    }
	$html = preg_replace("/<([a-zA-Z]+)(.*((rowspan|colspan)=(\'|\")?(\d*)(\'|\")?))?[^>]*>/","<\\1 \\3>",$txt);
 	
 	function regExceptArr($arr,$html){
        $arr = $arr ? $arr :array('font','span');
        foreach ($arr as $key => $value) {
        	$html = preg_replace("/<".$value."\s*(\/)?>/","",$html);
        	$html = preg_replace("/<\/".$value.">/","",$html);
        }
        return $html;
 	}
 	$html=regExceptArr(array('font','span','p','strong'),$html);
 	$html = preg_replace("/<(td|th)\s*>\s*(.*?)\s*<\/(td|th)>/","<\\1>\\2</\\3>",$html);
    echo $html;
	die();
	// //然后过滤font strong span 等标签
	// $html = strip_tags($html,'<table><tr><td><th><tbody><thead><tfoot><html><head><script><img><meta><title><body><div>');
	// $html=preg_replace("/<(td.*?)>(\s*)([^\s]*)<(\/td.*?)>/si","<td>\\3</td>",$html);
	// echo $html;
	// $rs = '';
	// if(preg_match_all('/<([a-zA-Z]+)[^>]*>/', $txt, $matches)){
 //          $strs =$matches[0];

 //          for ($i=0; $i <count($strs) ; $i++) { 
 //          	 $str=preg_replace('/<([a-zA-Z]+).*(rowspan=\"(.*)\")?[^>]*>/', '<\\1 rowspan="\\3" >', $strs[$i]);
 //          	 $rs .= $str;
 //          }
	// }
	//echo $rs;
	/*
         下面是备用代码哈
         <?php
    $txt = $_POST['txt'];
    //$pattern='[table|tr|td|th|tbody|thead|tfoot|html|head|script|meta|title|body|div|img]'; (colspan=\"(.*)\")[1]
    
	//$html = preg_replace("/<([a-zA-Z]+).*(rowspan=\"(.*)\")[^>]*>/","<\\1 rowspan='\\3' >",$txt);
	$html = preg_replace("/<([a-zA-Z]+).*(rowspan=\"(.*)\")?[^>]*>/","<\\1 rowspan='\\3'>",$txt);
	//然后过滤font strong span 等标签
	//$html=preg_replace("/td>\s*(.*)<\/td/","td>\\1</td",$html);
	$html = strip_tags($html,'<table><tr><td><th><tbody><thead><tfoot><html><head><script><img><meta><title><body><div>');
	echo $html;
?>
	*/
?>