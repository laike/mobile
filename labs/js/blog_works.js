/**
 * Created by Administrator on 2016/11/1.
 */
define(['jquery'],function($){
    function init(){
        //作品页面效果切换
        $('.ctrl-list li').click(function(event){
            var _this = this;
            $('.ctrl-list li span').removeClass('active').eq($(_this).index()).addClass('active');
        });
    }

    return {
        blogworks:init
    }
});