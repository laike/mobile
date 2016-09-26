var all_script = document.getElementsByTagName('script');
var currentScript = all_script[0];
function using(path,callback){
	var script =document.createElement('script');
	script.src = path;
	script.type="text/javascript";
	currentScript.parentNode.insertBefore(script,currentScript);
	script.onload=function(){
		callback.apply(this,arguments);
	};
}
