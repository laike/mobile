$(function(){
    //这里我们写代码
    //作品页面效果切换
    $('.ctrl-list li').click(function(event){
          var _this = this;
          $('.ctrl-list li span').removeClass('active').eq($(_this).index()).addClass('active');
    });
});