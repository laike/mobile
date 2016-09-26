//正则表达式专门学习

//var str ="hello world,你好啊hello WORLD,你们在干什么Hello World,HELLO world,wo_rld!";
//var pattern = /world/ig;
//\w表示大小写、数字、下划线 +表示至少一次或者多次
//var pattern = /w(\w+)d/ig;
//var pattern = /[A-Z]+/g;
//var pattern =/[\u4e00-\u9fa5]/; //匹配中文
//var pattern = /w([A-Z_a-z]+)d/ig;
//var pattern =/[\u4e00-\u9fa5]+/g; //匹配中文
var str = '@laike 您好啊！亲爱的，我爱你一万年。@shenyi 你好';
//var str = 'myweb.getName(3);';
//var pattern = /^@(\w+\s)(.*)/g;
//php中可以使用?<first>这样的来进行副本的保存 /^(?<first>\w+\s)(.*)/
//var pattern = /.+;$/;
//.代表除了\r\n外的任何单个字符，配合一个+后
//用验证的时候用^ $ 这个比较多，但是做爬虫的时候就不一定能够用上它了。
//var result = str.match(pattern);
//console.log(escape('你'));
//通过exec函数
//在全局检索模式下，match()即不提供与子表达式匹配的文本的信息，也不声明每个匹配字符串的位置。
//如果您需要这些全局检索信息，课可以使用exec()
//var result = pattern.exec(str);
//console.log(result);
//console.log(pattern.lastIndex);
//result = pattern.exec(str);
//关于中括号 [^A-Ea-z] 不在A到E的范围内的字符串 
var pattern = /@(\w+)/g;
while(result=pattern.exec(str)){
   console.log(result[1]);
}

//使用正则来实现一个trim功能可以兼容所有的浏览器
function trim(str){
	var pattern = /^\s+|\s+$/g;
	return str.replace(pattern,'');
}
var str1 = '  这里我们来进行测试trim功能  ';
console.log(str1);
console.log(trim(str1));

var str = '大家新年快乐！<img id="mm" src="a1.jpg" alt="xxoo" />'+
          "<img src='a2.jpg'>"+
          '<IMG src="a3.jpg"/>'+
          '<IMG Src=a4.jpg>';
var pattern = /<img.*?src=['|"]?([^'">]+)['"]?.*?\/?>/ig;//注意正则的方法
var result = '';
while(result=pattern.exec(str)){
  // console.log(result[1]);
}
//用户名必须是4-16位的字母 数字 或者下划线组成
function isUserName(str){
	return /^\w{4,16}$/.test(str);
}
//只能是6-20位的英文，字母组成
function isPassWord(str){
	return /^[a-zA-Z0-9]{6,20}$/.test(str);
}
//验证邮箱
function isEmail(str){
	
}

//这里我们要写一个简单的验证代码
document.regform.onsubmit=function(event){
	event.preventDefault();
	event.stopPropagation();
	var username = document.getElementById('username').value;
	var pwd = document.getElementById('password').value;
	var email = document.getElementById('email').value;
	if(trim(username)==''){
       alert('用户名不能为空！');
       return false;
	}
	if(trim(pwd)==''){
       alert('密码不能为空！');
       return false;
	}
	if(trim(email)==''){
       alert('邮箱不能为空！');
       return false;
	}
    return true;
}

//这里我们要来抓取一个网页看看
//这里我们先用简单的方式来进行一下模拟
var html = '';