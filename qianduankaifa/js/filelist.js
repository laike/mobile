/**
 * Created by Administrator on 2016/7/28.
 */
function log(msg){
    console.log(msg);
}
function each(obj){
    for(var i in obj){
           if(typeof obj[i] === 'function'){
               continue;
           }
           log(i+" : "+obj[i]);

    }
    log('-----------------------');
}

function showfilename(){
    var file;
    for(var i=0;i<document.getElementById('file').files.length;i++){
        file = document.getElementById('file').files[i];
        each(file);
    }
}
function showarraybuffer(){
     //我们需要使用arraybufferview来对arraybuffer进行操作 比如说 Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array
     var buf = new ArrayBuffer(32);
}
function showdataView(){
    var buf = new ArrayBuffer(25);
    var view = new DataView(buf,0);
    view.setInt8(0,8);
    var int8Val = view.getInt8(5);
    console.log(int8Val);
}
function showFile(){
    var file = document.getElementById('file').files[0];
    var size = document.getElementById('size');
    size.innerHTML = file.size;
    var type = document.getElementById('type');
    type.innerHTML = file.type;
}
function fileUpload(){
    var files = document.getElementById('file').files;
    for(var i=0;i<files.length;i++){
        var file = files[i];
        if(!/image\/\w+/.test(file.type)){
            alert(file.name+'不是图像文件');
            break;
        }else{
            //上传代码
            alert(file.name + '文件已经上传！');
        }
    }
}
function createBlob(){
    "use strict";
    var buffer = new ArrayBuffer(1024);
    var blob = new Blob(['1234'+'5678']);
    var shorts = new Uint16Array(buffer,512,128);
    var blobA = new Blob([blob,shorts]);
    console.log(blobA);
}
function blob_text(){
    "use strict";
    var text = document.getElementById('text').value;
    var blob;
    var result = document.getElementById('result');
    if(!window.Blob){
        alert('您的浏览器不支持Blob对象');
        return;
    }
    blob = new Blob([text]);
    if(window.URL){
        result.innerHTML = '<a href="'+window.URL.createObjectURL(blob)+'" target="_blank">文件下载</a>';
    }

}

window.onload = function(){


};