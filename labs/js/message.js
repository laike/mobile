/**
 * Created by Administrator on 2016/11/1.
 */
define(['jquery','TimeLine','window','jquery.flashcolor'],function($,timeline,w,fcolor){
    //进行表单验证
    var validation = (function(){
        return {
            checkEmail:function(email){
                return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(email) ;
            },
            checkNickName:function(nickname){
                return (nickname != '' && nickname !=undefined && nickname.length > 1) ? true : false;
            },
            checkContent:function(content){
                content = $.trim(content);
                return (content != '' && content !=undefined && content.length > 10 &&  content.length <240) ? true : false;
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
        $('.replay-message').click(function(event){
            event.preventDefault();
            event.stopPropagation();
            var publish=$(this).parent().find('.lk-message-container');
            if(publish.length !== 0){
                //如果有了就不需要进行添加了我们可以进行隐藏
                publish.slideToggle(500);
                return;
            }
            var clone = $('#lk-message-container').eq(0).clone(true);
            clone.find('legend').remove();
            clone.find('.lk-message-title').remove();
            //如果是管理员的话那么久可以直接回复了
            clone.find('.send-area .ctr-item').remove();
            // clone.find('#emotion-ctr').remove();
            // clone.find('.emotion-container-float').remove();
            clone.css({position:'relative',zIndex:999,backgroundColor:'#fff',boxShadow:'0 0 25px rgba(0,0,0,0.2)',padding:'10px'});
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
        $('.lk-message-container').off();//先取消事件绑定
        $('.lk-message-container textarea[name=content]').css({textIndex:'10px'});
        $('.lk-message-container').delegate('form','submit',{},function(event){
            event.preventDefault();
            var submit = true;
            var _this = this;
            var postData = $(_this).serializeObject();
            if(!canClick){
                var win = new w.Window();
                win.alert({width:300,height:300,content:'正在提交您的评论请等等！'});
            }
            //添加blogid
            postData.comment_type = 1;//这个是评论的类型 0为博客评论 1 为留言评论两个是不一样的
            //获取信息
            $.each($(_this).serializeArray(),function(index,item){
                if(submit==false){
                    return;
                }
                switch (item.name){
                    case 'nickname':
                        if(!validation.checkNickName(item.value)){
                            submit = false;
                            $(_this).find('input[name=nickname]').flashColor();
                        }
                        break;
                    case 'email':
                        if(!validation.checkEmail(item.value) ){
                            submit = false;
                            $(_this).find('input[name=email]').flashColor();

                        }
                        break;
                    case 'content':
                        if(!validation.checkContent(item.value) ){
                            submit = false;
                            $(_this).find('textarea[name=content]').flashColor();
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

                                $("li a[page=message]").trigger('click');
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
        var tl = new timeline.TimeLine();
        tl.timeline({id:'#timeline'});
    }

    return {
        message:init
    }
});