(function($){
	//动画变化函数
	function changeAnimations(ele,type,isremove){
		            if(!isremove){isremove = false;}
					if(typeof ele === 'string'){
						$(ele).removeClass().addClass(type + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
						  $(this).removeClass();
						  if(isremove){
						  	$(this).fadeOut().remove();
						  }
						});
						return;
					}
					ele.removeClass().addClass(type + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					  $(this).removeClass();
					  if(isremove){
						  	$(this).fadeOut().remove();
						  }
					});
	}
	
	var txtOffect={
		isLoop:true,
		lineHeight:30,
		speed:1500,
		classname:'.txt-scroller-container',
		
		txtoffect:function(){
		  var index = 0;
		  var _this = this;
		  var container = $(_this.classname);
          var txtInterval = setInterval(function(){
          	 var pElement=$('<p>');
          	 pElement.html(_this.txtData[index]);
          	 container.append(pElement);
          	 changeAnimations(pElement,_this.effectsData[index],false);
          	 
          	 ++index;

      	 	 if(index > (_this.txtData.length-1)){
      	 		clearInterval(txtInterval);
      	 	 }
          	
          },this.speed);
          
		},
		init:function(data,effects){
		     this.txtData= data.split('\n');
		     this.effectsData= effects.split('\n');
		     this.txtoffect();
		}
	}
	$.get('txt/txt1.txt',{},function(data){
		$.get('txteffect/txt1.txt',{},function(data2){
			txtOffect.init(data,data2);
		})
	},'text');
	
})(jQuery);
