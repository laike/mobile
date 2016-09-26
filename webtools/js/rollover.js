window.onload=function(){
	var i = 0;
	for (i;i<document.images.length;i++) {
		 var img = document.images[i];
		 var src =img.getAttribute('data-rollover');
		 if(!src){
		 	 continue;
		 }
		 (new Image()).src = src;
		 img.setAttribute('data-rollout',img.src);
		 img.onmouseover=function(){
		 	this.src = this.getAttribute('data-rollover');
		 };
		 img.onmouseout=function(){
		 	this.src = this.getAttribute('data-rollout');
		 };
	}
};
