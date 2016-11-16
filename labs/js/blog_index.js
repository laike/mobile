/**
 * Created by Administrator on 2016/11/1.
 */
define(['jquery','window'],function($,w){
    var start = 10;
    function init(){
        var page = 1;//默认第一页
        var isloaded = false;
        var canClick = true;
        //闭包里面免得影响全局变量
        $('.btn-load-more').click(function(event){
            event.preventDefault();
            event.stopPropagation();
            if(!canClick){
                var win = new w.Window();
                win.alert({width:250,height:200,content:'数据正在加载,请一会儿再试'});
            }
            if(isloaded){
                //已经加载完毕，没有数据可以进行添加了
                return;
            }
            var timeout = null;
            setTimeout(function(){
                $.ajax({
                    url:requestUrl,// 跳转到 action
                    data:{
                        page:++page
                    },
                    type:'post',
                    cache:false,
                    dataType:'html',
                    beforeSend:function(){
                        canClick =false;
                        $('.btn-load-more').find('span').html('<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>正在加载数据之中...');
                    },
                    complete:function(){
                        canClick = true;
                        if(isloaded){
                            $('.btn-load-more').find('span').html('所有数据全部加载完毕！');
                            return;
                        }
                        $('.btn-load-more').find('span').html('加载更多...');
                    },
                    success:function(data) {

                        console.log(  Boolean(data)  == false);
                        if(Boolean(data) == false){
                            isloaded = true;
                            return;
                        }
                        //否者添加到页面尾部
                        $('.btn-load-more').before(data);
                        clearTimeout(timeout);
                    },
                    error : function() {
                        $('.btn-load-more').find('span').html("数据加载异常,请检查网络......");
                        clearTimeout(timeout);
                    }
                });

            },100);

        });
    }

    return {
        blogindex:init
    }
});