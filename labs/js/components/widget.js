// 为Widget类添加一个统一的生命周期

define(['jquery'], function($) {
	function Widget() {
		this.boundingBox = null;
	}

	Widget.prototype = {
		throtle:function(fn,delay){
			var _self = fn,timer,firstTime=true;
			return function(){
				var args =arguments,
						_me  = this;
				if(firstTime){
					_self.apply(_me,args);
					return firstTime = false;
				}
				if(timer){
					return false;
				}
				timer = setTimeout(function(){
					clearTimeout(timer);
					timer = null;
					_self.apply(_me,args);
				},delay||500);//默认500毫秒延迟
			}
		},
		on: function(type, handler) {
			if (typeof this.handlers[type] == "undefined") {
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
			return this;
		},
		fire: function(type, data) {
			if (this.handlers[type] instanceof Array) {
				var handlers = this.handlers[type];
				for (var i=0, len=handlers.length; i < len; i++) {
					handlers[i](data);
				}
			}
		},
		renderUI: function() {}, // 接口：添加DOM节点
		bindUI: function() {}, // 接口：监听事件
		syncUI: function() {},	// 接口：初始化组件属性
		destructor: function() {}, // 接口：销毁前的处理函数
		render: function(container) { // 方法：渲染组件
			this.renderUI();
			this.handlers = {};
			this.bindUI();
			this.syncUI();
			$(container || document.body).append(this.boundingBox);
		},
		destroy: function() { // 方法：销毁组件
			this.destructor();
			this.boundingBox.off();
			this.boundingBox.remove();
		}
	}

	return {
		Widget: Widget
	}
});