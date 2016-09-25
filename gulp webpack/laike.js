var md=require('laike');
md.showname();
var fs = require('fs');

function generalcode(key,value){
    return 'var '+key+' = '+value+';\n';
}
//首先清空文档
fs.writeFile('./build/build.js','');
for( var key in md){
    fs.appendFile('./build/build.js',generalcode(key,md[key]));
}

//这里的话我们要模拟一下编译css到js里面 这个版本已经支持es2015 的写法啦

fs.readFile('./css/style.css',function(err,data){
    //这里我们要进行一下处理那就是如果判断到里面有图片的话那么就进行替换
    var imgpattern = /['|"](.*\.jpg)['|"]/g;
    var res ;
    while(res =imgpattern.exec(data.toString())){
        var getimg = fs.readFileSync(res[1]);
        data = data.toString().replace(res[1],getimg.toString('base64'));
    }
    fs.appendFile('./build/build.js','document.write("'+data+'");');
});
//这个我们弄清楚原理以后那么以后学习gulp 就很轻松了 知其然知其所以然


