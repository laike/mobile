(function($){
    $.fn.flashColor = function(options){
        var defaults = {
            total:4,
            speed:200,
            colorstart:"rgb(250,128,114)",
            colorend:"rgb(255,255,255)",
            color:'rgb(255,255,255)',
            endcolor:'rgba(229,230,228)'
        };
        var cfg = $.extend({},defaults,options);
        function flash(ele)
        {
            cfg.total --;
            if(cfg.total >= 0  )
            {
                ele.animate({backgroundColor:cfg.colorstart }, cfg.speed,
                    function(){
                        ele.animate({backgroundColor: cfg.colorend }, cfg.speed,function(){
                            flash(ele,cfg.total,cfg.speed);
                        });
                    }
                );
            }
        }
        return this.each(function(i,item){
            var $this = $(this);
            flash($this);
        });
    };
})(jQuery);