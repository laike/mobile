/**
 * Created by laike-pc on 2016/10/30.
 */
//这个文件主要是用来使用worker这个特性的 现代浏览器的支持还是挺好的
onmessage =function (evt){
    var d = evt.data;//通过evt.data获得发送来的数据
    console.log(d);

}
