/**
 * Created by Administrator on 2016/11/1.
 */
define(['jquery','window'],function($,w){
    //进行表单验证
    var validation = (function(){
        return {
            checkEmail:function(email){
                return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(email) ;
            },
            checkNickName:function(nickname){
                return (nickname != '' && nickname !=undefined && nickname.length > 3) ? true : false;
            },
            checkContent:function(content){
                return (content != '' && content !=undefined && content.length > 10 &&  content.length <200) ? true : false;
            }
        }
    })();

    function checkRuls(fn,_this){

        if(fn){
            $(_this).parent().find('.lk-post-error').fadeOut(500);
            return true;
        }else{

            $(_this).parent().find('.lk-post-error').fadeIn(500);
            return false;
        }
    }
    function init(){
        //初始化插件
        $('#emotion-ctr').emotions();
        //添加回复事件的处理
        $('.replay').click(function(event){
            event.preventDefault();
            event.stopPropagation();
            var publish=$(this).parent().find('.publish');
            if(publish.length !== 0){
                //如果有了就不需要进行添加了我们可以进行隐藏
                publish.slideToggle(500);
                return;
            }
            var clone = $('#post_form').eq(0).clone(true);
            clone.find('legend').remove();
            //这里我们还要添加一个隐藏得字段和那个普通回复是不一样的哈
            var replayhidden = document.createElement('input');
            replayhidden.type = 'hidden';
            replayhidden.name = 'commentid';
            replayhidden.value = $(this).attr('replayid');
            clone.find('form').prepend(replayhidden);
            $(this).parent().append(clone);
            clone.find('form').get(0).reset();
        });
        //使用deglete来进行事件的绑定操作
        var canClick = true;
        $('.lk-blog-comments').delegate('form','submit',{},function(event){
            event.preventDefault();
            var submit = true;
            var _this = this;
            var postData = $(_this).serializeObject();
            if(!canClick){
                var win = new w.Window();
                win.alert({width:300,height:300,content:'正在提交您的评论请等等！'});
            }
            //添加blogid
            postData.blog_comment_id = blog_id;//默认是进行对文章的普通评论否者就是下面用户之间的评论
            //获取信息
            $.each($(_this).serializeArray(),function(index,item){
                switch (item.name){
                    case 'nickname':
                        if(!validation.checkNickName(item.value)){
                            submit = false;
                            $(_this).find('input[name=nickname]').parent().find('.lk-post-error').fadeIn(500);
                        }
                        break;
                    case 'email':
                        if(!validation.checkEmail(item.value) ){
                            submit = false;
                            $(_this).find('input[name=email]').parent().find('.lk-post-error').fadeIn(500);
                        }
                        break;
                    case 'content':
                        if(!validation.checkContent(item.value) ){
                            submit = false;
                            $(_this).find('input[name=content]').parent().find('.lk-post-error').fadeIn(500);
                        }
                        break;
                }
            });
            //判断是否可以提交
            if(!submit){
                return false;
            }
            //在这里我们进行ajax操作
            var timeout = null;
            setTimeout(function(){
                $.ajax({
                    url:addCommentUrl,// 跳转到 action
                    data:postData,
                    type:'post',
                    cache:false,
                    dataType:'json',
                    beforeSend:function(){
                        canClick =false;
                    },
                    complete:function(){
                        canClick = true;
                    },
                    success:function(data) {
                        if(data.msg =='ok'){

                            var win = new w.Window();
                            win.alert({width:300,height:300,content:'评论提交成功！'}).on('ok',function(){

                                $(".oringinal+a").trigger('click');
                            });

                        }else{

                            var win = new w.Window();
                            win.alert({width:300,height:300,content:'评论失败！请稍后重试！'});
                        }
                        clearTimeout(timeout);
                    },
                    error : function() {
                        clearTimeout(timeout);
                    }
                });

            },100);
        });

        $('.lk-blog-comments').delegate('input,textarea','keyup keydown blur',{},function(event){

            var val = $.trim($(this).val());
            var name = $(this).attr('name');
            var _this = this;
            switch (name){
                case 'nickname':
                    checkRuls(validation.checkNickName(val),_this);
                    break;
                case 'email':
                    checkRuls(validation.checkEmail(val),_this);
                    break;
                case 'content':
                    checkRuls(validation.checkContent(val),_this);
                    break;
            }

        });
        //绑定分享
        $('.share a').click(function(event){
            event.preventDefault();
            event.stopPropagation();
            var type = $(this).attr('type');
            shareSina(type);
        });
        //初始化插件
        $('.tips').tips();
    }

    return {
        blogdetail:init
    }
});