var H5_loading =function(images,page){

    //这里我们要对页面的加载动画进行处理
   //这里表示是第一次载入
   if(this._images === undefined){
     this._images = (images||[]).length;
     this._loaded = 0;//初始化加载的资源数
     window[this.id] = this;
     var i=0 ;
     for(;i<= images;i++){
        var source = images[i];
        var img = new Image();
        img.onload=function(){
          window[this.id].loader();//每张图片加载成功之后 进行加载loader函数
        }
        img.src = source;
     }
   }else{
      this._loaded++;//叠加资源加载数目
      //$('.H5_loading').text(Math.floor(this._loaded/this._images)*100)+"%";//显示进度
      if(this._loaded< this._images){
         //如果加载资源小于预定的资源数目 那么就继续返回
         return this;
      }

   }
   function initPage(){
     //初始化fullpage
     this.ele.fullpage({
       onLeave:function(index,nextIndex,direction){
          $(this).find('.h5_component').trigger('onLeave');
       },
       afterLoad:function(anchorLink,index){
          console.log(anchorLink,index);
          $('.lk-right-dots li').removeClass('active').eq(index-1).addClass('active');
          $(this).find('.h5_component').trigger('onLoad');
       }
     });
     //启动第一页中的组件动作
     this.pages[0].trigger('onLoad');
     this.ele.show();
     if(page){
        this.ele.fullpage.moveTo(page);
     }
   }
   var _this = this;
   //否则我们就显示loader
   $('.H5_loading').addClass('H5_loading_effect').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){

       $(this).removeClass('H5_loading_effect').fadeOut(500,initPage.bind(_this));//这里使用bind 改变函数作用域中this的指向

   });



}
