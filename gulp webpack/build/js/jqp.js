/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		1:0,
/******/ 		4:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"index","2":"main","3":"user","4":"common"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	/**
	 * fullPage 1.5.3
	 * https://github.com/alvarotrigo/fullPage.js
	 * MIT licensed
	 *
	 * Copyright (C) 2013 alvarotrigo.com - A project by Alvaro Trigo
	 */
	(function(b){b.fn.fullpage=function(c){function m(a){if(c.autoScrolling){a=window.event||a;a=Math.max(-1,Math.min(1,a.wheelDelta||-a.detail));var e;e=b(".section.active");if(!k)if(e=e.find(".slides").length?e.find(".slide.active").find(".scrollable"):e.find(".scrollable"),0>a)if(0<e.length)if(v("bottom",e))b.fn.fullpage.moveSectionDown();else return!0;else b.fn.fullpage.moveSectionDown();else if(0<e.length)if(v("top",e))b.fn.fullpage.moveSectionUp();else return!0;else b.fn.fullpage.moveSectionUp();
	return!1}}function F(){document.addEventListener?(document.addEventListener("mousewheel",m,!1),document.addEventListener("DOMMouseScroll",m,!1)):document.attachEvent("onmousewheel",m)}function n(a,e){var d={},f,h=a.position(),h=null!==h?h.top:null,H=G(a),l=a.data("anchor"),g=a.index(".section"),p=a.find(".slide.active");if(p.length){f=p.data("anchor");var q=p.index()}p=b(".section.active").index(".section")+1;a.addClass("active").siblings().removeClass("active");k=!0;"undefined"!==typeof l?I(q,f,
	l):location.hash="";c.autoScrolling?(d.top=-h,f="#superContainer"):(d.scrollTop=h,f="html, body");c.css3&&c.autoScrolling?(b.isFunction(c.onLeave)&&c.onLeave.call(this,p,H),z("translate3d(0px, -"+h+"px, 0px)",!0),setTimeout(function(){b.isFunction(c.afterLoad)&&c.afterLoad.call(this,l,g+1);setTimeout(function(){k=!1;b.isFunction(e)&&e.call(this)},J)},c.scrollingSpeed)):(b.isFunction(c.onLeave)&&c.onLeave.call(this,p,H),b(f).animate(d,c.scrollingSpeed,c.easing,function(){b.isFunction(c.afterLoad)&&
	c.afterLoad.call(this,l,g+1);setTimeout(function(){k=!1;b.isFunction(e)&&e.call(this)},J)}));r=l;c.autoScrolling&&(K(l),L(l,g))}function u(a,e){var d=e.position(),f=a.find(".slidesContainer").parent(),h=e.index(),g=a.closest(".section"),l=g.index(".section"),k=g.data("anchor"),p=g.find(".fullPage-slidesNav"),q=e.data("anchor");if(c.onSlideLeave){var m=g.find(".slide.active").index(),n;n=m>h?"left":"right";b.isFunction(c.onSlideLeave)&&c.onSlideLeave.call(this,k,l+1,m,n)}e.addClass("active").siblings().removeClass("active");
	"undefined"===typeof q&&(q=h);g.hasClass("active")&&(c.loopHorizontal||(g.find(".controlArrow.prev").toggle(0!=h),g.find(".controlArrow.next").toggle(!e.is(":last-child"))),I(h,q,k));c.css3?(d="translate3d(-"+d.left+"px, 0px, 0px)",a.find(".slidesContainer").addClass("easing").css({"-webkit-transform":d,"-moz-transform":d,"-ms-transform":d,transform:d}),setTimeout(function(){b.isFunction(c.afterSlideLoad)&&c.afterSlideLoad.call(this,k,l+1,q,h);s=!1},c.scrollingSpeed)):f.animate({scrollLeft:d.left},
	c.scrollingSpeed,function(){b.isFunction(c.afterSlideLoad)&&c.afterSlideLoad.call(this,k,l+1,q,h);s=!1});p.find(".active").removeClass("active");p.find("li").eq(h).find("a").addClass("active")}function M(){var a=b(window).width();g=b(window).height();c.resize&&S(g,a);b(".section").each(function(){parseInt(b(this).css("padding-bottom"));parseInt(b(this).css("padding-top"));if(c.scrollOverflow){var a=b(this).find(".slide");a.length?a.each(function(){w(b(this))}):w(b(this))}c.verticalCentered&&b(this).find(".tableCell").css("height",
	g+"px");b(this).css("height",g+"px");a=b(this).find(".slides");a.length&&u(a,a.find(".slide.active"))});b(".section.active").position();a=b(".section.active");a.index(".section")&&n(a)}function S(a,e){var c=825,f=a;825>a||900>e?(900>e&&(f=e,c=900),c=(100*f/c).toFixed(2),b("body").css("font-size",c+"%")):b("body").css("font-size","100%")}function L(a,e){c.navigation&&(b("#fullPage-nav").find(".active").removeClass("active"),a?b("#fullPage-nav").find('a[href="#'+a+'"]').addClass("active"):b("#fullPage-nav").find("li").eq(e).find("a").addClass("active"))}
	function K(a){c.menu&&(b(c.menu).find(".active").removeClass("active"),b(c.menu).find('[data-menuanchor="'+a+'"]').addClass("active"))}function v(a,b){if("top"===a)return!b.scrollTop();if("bottom"===a)return b.scrollTop()+b.innerHeight()>=b[0].scrollHeight}function G(a){var c=b(".section.active").index(".section");a=a.index(".section");return c>a?"up":"down"}function w(a){a.css("overflow","hidden");var b=a.closest(".section"),d=a.find(".scrollable");(d.length?a.find(".scrollable").get(0).scrollHeight-
	parseInt(b.css("padding-bottom"))-parseInt(b.css("padding-top")):a.get(0).scrollHeight-parseInt(b.css("padding-bottom"))-parseInt(b.css("padding-top")))>g?(b=g-parseInt(b.css("padding-bottom"))-parseInt(b.css("padding-top")),d.length?d.css("height",b+"px").parent().css("height",b+"px"):(c.verticalCentered?a.find(".tableCell").wrapInner('<div class="scrollable" />'):a.wrapInner('<div class="scrollable" />'),a.find(".scrollable").slimScroll({height:b+"px",size:"10px",alwaysVisible:!0}))):(a.find(".scrollable").children().first().unwrap().unwrap(),
	a.find(".slimScrollBar").remove(),a.find(".slimScrollRail").remove());a.css("overflow","")}function N(a){a.addClass("table").wrapInner('<div class="tableCell" style="height:'+g+'px;" />')}function z(a,c){b("#superContainer").toggleClass("easing",c);b("#superContainer").css({"-webkit-transform":a,"-moz-transform":a,"-ms-transform":a,transform:a})}function A(a,c){var d=isNaN(a)?b('[data-anchor="'+a+'"]'):b(".section").eq(a-1);a===r||d.hasClass("active")?O(d,c):n(d,function(){O(d,c)})}function O(a,b){if("undefined"!=
	typeof b){var c=a.find(".slides"),f=c.find('[data-anchor="'+b+'"]');f.length||(f=c.find(".slide").eq(b));f.length&&u(c,f)}}function T(a,b){a.append('<div class="fullPage-slidesNav"><ul></ul></div>');var d=a.find(".fullPage-slidesNav");d.addClass(c.slidesNavPosition);for(var f=0;f<b;f++)d.find("ul").append('<li><a href="#"><span></span></a></li>');d.css("margin-left","-"+d.width()/2+"px");d.find("li").first().find("a").addClass("active")}function I(a,b,c){var f="";a?("undefined"!==typeof c&&(f=c),
	"undefined"===typeof b&&(b=a),P=b,location.hash=f+"/"+b):location.hash=c}function U(){var a=document.createElement("p"),b,c={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.insertBefore(a,null);for(var f in c)void 0!==a.style[f]&&(a.style[f]="translate3d(1px,1px,1px)",b=window.getComputedStyle(a).getPropertyValue(c[f]));document.body.removeChild(a);return void 0!==b&&0<b.length&&"none"!==b}
	c=b.extend({verticalCentered:!0,resize:!0,slidesColor:[],anchors:[],scrollingSpeed:700,easing:"easeInQuart",menu:!1,navigation:!1,navigationPosition:"right",navigationColor:"#000",navigationTooltips:[],slidesNavigation:!1,slidesNavPosition:"bottom",controlArrowColor:"#fff",loopBottom:!1,loopTop:!1,loopHorizontal:!0,autoScrolling:!0,scrollOverflow:!1,css3:!1,paddingTop:0,paddingBottom:0,fixedElements:null,normalScrollElements:null,afterLoad:null,onLeave:null,afterRender:null,afterSlideLoad:null,onSlideLeave:null},
	c);var J=700;b.fn.fullpage.setAutoScrolling=function(a){c.autoScrolling=a;a=b(".section.active");c.autoScrolling?(b("html, body").css({overflow:"hidden",height:"100%"}),a.length&&(c.css3?(a="translate3d(0px, -"+a.position().top+"px, 0px)",z(a,!1)):b("#superContainer").css("top","-"+a.position().top+"px"))):(b("html, body").css({overflow:"auto",height:"auto"}),c.css3?z("translate3d(0px, 0px, 0px)",!1):b("#superContainer").css("top","0px"),b("html, body").scrollTop(a.position().top))};var s=!1,B=navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/),
	g=b(window).height(),k=!1,r,P;F();c.css3&&(c.css3=U());b("body").wrapInner('<div id="superContainer" />');if(c.navigation){b("body").append('<div id="fullPage-nav"><ul></ul></div>');var t=b("#fullPage-nav");t.css("color",c.navigationColor);t.addClass(c.navigationPosition)}b(".section").each(function(a){var e=b(this).find(".slide"),d=e.length;a||b(this).addClass("active");b(this).css("height",g+"px");(c.paddingTop||c.paddingBottom)&&b(this).css("padding",c.paddingTop+" 0 "+c.paddingBottom+" 0");"undefined"!==
	typeof c.slidesColor[a]&&b(this).css("background-color",c.slidesColor[a]);"undefined"!==typeof c.anchors[a]&&b(this).attr("data-anchor",c.anchors[a]);if(c.navigation){var f="";c.anchors.length&&(f=c.anchors[a]);a=c.navigationTooltips[a];"undefined"===typeof a&&(a="");t.find("ul").append('<li data-tooltip="'+a+'"><a href="#'+f+'"><span></span></a></li>')}if(0<d){var f=100*d,h=100/d;e.wrapAll('<div class="slidesContainer" />');e.parent().wrap('<div class="slides" />');b(this).find(".slidesContainer").css("width",
	f+"%");b(this).find(".slides").after('<div class="controlArrow prev"></div><div class="controlArrow next"></div>');b(this).find(".controlArrow.next").css("border-color","transparent transparent transparent "+c.controlArrowColor);b(this).find(".controlArrow.prev").css("border-color","transparent "+c.controlArrowColor+" transparent transparent");c.loopHorizontal||b(this).find(".controlArrow.prev").hide();c.slidesNavigation&&T(b(this),d);e.each(function(a){a||b(this).addClass("active");b(this).css("width",
	h+"%");c.verticalCentered&&N(b(this))})}else c.verticalCentered&&N(b(this))}).promise().done(function(){b.fn.fullpage.setAutoScrolling(c.autoScrolling);b.isFunction(c.afterRender)&&c.afterRender.call(this);c.fixedElements&&c.css3&&b(c.fixedElements).appendTo("body");c.navigation&&(t.css("margin-top","-"+t.height()/2+"px"),t.find("li").first().find("a").addClass("active"));c.menu&&c.css3&&b(c.menu).appendTo("body");if(c.scrollOverflow)b(window).on("load",function(){b(".section").each(function(){var a=
	b(this).find(".slide");a.length?a.each(function(){w(b(this))}):w(b(this))})});b(window).on("load",function(){var a=window.location.hash.replace("#","").split("/"),b=a[0],a=a[1];b&&A(b,a)})});var Q,C=!1;b(window).scroll(function(a){if(!c.autoScrolling){var e=b(window).scrollTop();a=b(".section").map(function(){if(b(this).offset().top<e+100)return b(this)});a=a[a.length-1];if(!a.hasClass("active")){C=!0;var d=G(a);b(".section.active").removeClass("active");a.addClass("active");var f=a.data("anchor");
	b.isFunction(c.onLeave)&&c.onLeave.call(this,a.index(".section"),d);b.isFunction(c.afterLoad)&&c.afterLoad.call(this,f,a.index(".section")+1);K(f);L(f,0);c.anchors.length&&!k&&(r=f,location.hash=f);clearTimeout(Q);Q=setTimeout(function(){C=!1},100)}}});var D=0,x=0,E=0,y=0;b(document).on("touchmove",function(a){if(c.autoScrolling&&B){a.preventDefault();a=a.originalEvent;var e=b(".section.active");if(!k&&!s)if(E=a.touches[0].pageY,y=a.touches[0].pageX,e.find(".slides").length&&Math.abs(x-y)>Math.abs(D-
	E))x>y?e.find(".controlArrow.next").trigger("click"):x<y&&e.find(".controlArrow.prev").trigger("click");else if(a=e.find(".slides").length?e.find(".slide.active").find(".scrollable"):e.find(".scrollable"),D>E)if(0<a.length)if(v("bottom",a))b.fn.fullpage.moveSectionDown();else return!0;else b.fn.fullpage.moveSectionDown();else if(0<a.length)if(v("top",a))b.fn.fullpage.moveSectionUp();else return!0;else b.fn.fullpage.moveSectionUp()}});b(document).on("touchstart",function(a){c.autoScrolling&&B&&(a=
	a.originalEvent,D=a.touches[0].pageY,x=a.touches[0].pageX)});b.fn.fullpage.moveSectionUp=function(){var a=b(".section.active").prev(".section");c.loopTop&&!a.length&&(a=b(".section").last());(0<a.length||!a.length&&c.loopTop)&&n(a)};b.fn.fullpage.moveSectionDown=function(){var a=b(".section.active").next(".section");c.loopBottom&&!a.length&&(a=b(".section").first());(0<a.length||!a.length&&c.loopBottom)&&n(a)};b.fn.fullpage.moveTo=function(a,c){var d="",d=isNaN(a)?b('[data-anchor="'+a+'"]'):b(".section").eq(a-
	1);"undefined"!==c?A(a,c):0<d.length&&n(d)};b(window).on("hashchange",function(){if(!C){var a=window.location.hash.replace("#","").split("/"),b=a[0],a=a[1],c="undefined"===typeof r,f="undefined"===typeof r&&"undefined"===typeof a;(b&&b!==r&&!c||f||"undefined"!==typeof a&&!s&&P!=a)&&A(b,a)}});b(document).keydown(function(a){if(!k)switch(a.which){case 38:case 33:b.fn.fullpage.moveSectionUp();break;case 40:case 34:b.fn.fullpage.moveSectionDown();break;case 37:b(".section.active").find(".controlArrow.prev").trigger("click");
	break;case 39:b(".section.active").find(".controlArrow.next").trigger("click")}});b(document).on("click","#fullPage-nav a",function(a){a.preventDefault();a=b(this).parent().index();n(b(".section").eq(a))});b(document).on({mouseenter:function(){var a=b(this).data("tooltip");b('<div class="fullPage-tooltip '+c.navigationPosition+'">'+a+"</div>").hide().appendTo(b(this)).fadeIn(200)},mouseleave:function(){b(this).find(".fullPage-tooltip").fadeOut().remove()}},"#fullPage-nav li");c.normalScrollElements&&
	(b(document).on("mouseover",c.normalScrollElements,function(){document.addEventListener?(document.removeEventListener("mousewheel",m,!1),document.removeEventListener("DOMMouseScroll",m,!1)):document.detachEvent("onmousewheel",m)}),b(document).on("mouseout",c.normalScrollElements,function(){F()}));b(".section").on("click",".controlArrow",function(){if(!s){s=!0;var a=b(this).closest(".section").find(".slides"),c=a.find(".slide.active"),d=null,d=b(this).hasClass("prev")?c.prev(".slide"):c.next(".slide");
	d.length||(d=b(this).hasClass("prev")?c.siblings(":last"):c.siblings(":first"));u(a,d)}});b(".section").on("click",".toSlide",function(a){a.preventDefault();a=b(this).closest(".section").find(".slides");a.find(".slide.active");var c=null,c=a.find(".slide").eq(b(this).data("index")-1);0<c.length&&u(a,c)});if(!B){var R;b(window).resize(function(){clearTimeout(R);R=setTimeout(M,500)})}b(window).bind("orientationchange",function(){M()});b(document).on("click",".fullPage-slidesNav a",function(a){a.preventDefault();
	a=b(this).closest(".section").find(".slides");var c=a.find(".slide").eq(b(this).closest("li").index());u(a,c)})}})(jQuery);

/***/ },
/* 3 */
/***/ function(module, exports) {

	/*!
	 * jQuery Validation Plugin 1.11.1
	 *
	 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
	 * http://docs.jquery.com/Plugins/Validation
	 *
	 * Copyright 2013 Jörn Zaefferer
	 * Released under the MIT license:
	 *   http://www.opensource.org/licenses/mit-license.php
	 */

	(function($) {

	$.extend($.fn, {
		// http://docs.jquery.com/Plugins/Validation/validate
		validate: function( options ) {

			// if nothing is selected, return nothing; can't chain anyway
			if ( !this.length ) {
				if ( options && options.debug && window.console ) {
					console.warn( "Nothing selected, can't validate, returning nothing." );
				}
				return;
			}

			// check if a validator for this form was already created
			var validator = $.data( this[0], "validator" );
			if ( validator ) {
				return validator;
			}

			// Add novalidate tag if HTML5.
			this.attr( "novalidate", "novalidate" );

			validator = new $.validator( options, this[0] );
			$.data( this[0], "validator", validator );

			if ( validator.settings.onsubmit ) {

				this.validateDelegate( ":submit", "click", function( event ) {
					if ( validator.settings.submitHandler ) {
						validator.submitButton = event.target;
					}
					// allow suppressing validation by adding a cancel class to the submit button
					if ( $(event.target).hasClass("cancel") ) {
						validator.cancelSubmit = true;
					}

					// allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
					if ( $(event.target).attr("formnovalidate") !== undefined ) {
						validator.cancelSubmit = true;
					}
				});

				// validate the form on submit
				this.submit( function( event ) {
					if ( validator.settings.debug ) {
						// prevent form submit to be able to see console output
						event.preventDefault();
					}
					function handle() {
						var hidden;
						if ( validator.settings.submitHandler ) {
							if ( validator.submitButton ) {
								// insert a hidden input as a replacement for the missing submit button
								hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val( $(validator.submitButton).val() ).appendTo(validator.currentForm);
							}
							validator.settings.submitHandler.call( validator, validator.currentForm, event );
							if ( validator.submitButton ) {
								// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
								hidden.remove();
							}
							return false;
						}
						return true;
					}

					// prevent submit for invalid forms or custom submit handlers
					if ( validator.cancelSubmit ) {
						validator.cancelSubmit = false;
						return handle();
					}
					if ( validator.form() ) {
						if ( validator.pendingRequest ) {
							validator.formSubmitted = true;
							return false;
						}
						return handle();
					} else {
						validator.focusInvalid();
						return false;
					}
				});
			}

			return validator;
		},
		// http://docs.jquery.com/Plugins/Validation/valid
		valid: function() {
			if ( $(this[0]).is("form")) {
				return this.validate().form();
			} else {
				var valid = true;
				var validator = $(this[0].form).validate();
				this.each(function() {
					valid = valid && validator.element(this);
				});
				return valid;
			}
		},
		// attributes: space seperated list of attributes to retrieve and remove
		removeAttrs: function( attributes ) {
			var result = {},
				$element = this;
			$.each(attributes.split(/\s/), function( index, value ) {
				result[value] = $element.attr(value);
				$element.removeAttr(value);
			});
			return result;
		},
		// http://docs.jquery.com/Plugins/Validation/rules
		rules: function( command, argument ) {
			var element = this[0];

			if ( command ) {
				var settings = $.data(element.form, "validator").settings;
				var staticRules = settings.rules;
				var existingRules = $.validator.staticRules(element);
				switch(command) {
				case "add":
					$.extend(existingRules, $.validator.normalizeRule(argument));
					// remove messages from rules, but allow them to be set separetely
					delete existingRules.messages;
					staticRules[element.name] = existingRules;
					if ( argument.messages ) {
						settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
					}
					break;
				case "remove":
					if ( !argument ) {
						delete staticRules[element.name];
						return existingRules;
					}
					var filtered = {};
					$.each(argument.split(/\s/), function( index, method ) {
						filtered[method] = existingRules[method];
						delete existingRules[method];
					});
					return filtered;
				}
			}

			var data = $.validator.normalizeRules(
			$.extend(
				{},
				$.validator.classRules(element),
				$.validator.attributeRules(element),
				$.validator.dataRules(element),
				$.validator.staticRules(element)
			), element);

			// make sure required is at front
			if ( data.required ) {
				var param = data.required;
				delete data.required;
				data = $.extend({required: param}, data);
			}

			return data;
		}
	});

	// Custom selectors
	$.extend($.expr[":"], {
		// http://docs.jquery.com/Plugins/Validation/blank
		blank: function( a ) { return !$.trim("" + $(a).val()); },
		// http://docs.jquery.com/Plugins/Validation/filled
		filled: function( a ) { return !!$.trim("" + $(a).val()); },
		// http://docs.jquery.com/Plugins/Validation/unchecked
		unchecked: function( a ) { return !$(a).prop("checked"); }
	});

	// constructor for validator
	$.validator = function( options, form ) {
		this.settings = $.extend( true, {}, $.validator.defaults, options );
		this.currentForm = form;
		this.init();
	};

	$.validator.format = function( source, params ) {
		if ( arguments.length === 1 ) {
			return function() {
				var args = $.makeArray(arguments);
				args.unshift(source);
				return $.validator.format.apply( this, args );
			};
		}
		if ( arguments.length > 2 && params.constructor !== Array  ) {
			params = $.makeArray(arguments).slice(1);
		}
		if ( params.constructor !== Array ) {
			params = [ params ];
		}
		$.each(params, function( i, n ) {
			source = source.replace( new RegExp("\\{" + i + "\\}", "g"), function() {
				return n;
			});
		});
		return source;
	};

	$.extend($.validator, {

		defaults: {
			messages: {},
			groups: {},
			rules: {},
			errorClass: "error",
			validClass: "valid",
			errorElement: "label",
			focusInvalid: true,
			errorContainer: $([]),
			errorLabelContainer: $([]),
			onsubmit: true,
			ignore: ":hidden",
			ignoreTitle: false,
			onfocusin: function( element, event ) {
				this.lastActive = element;

				// hide error label and remove error class on focus if enabled
				if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
					if ( this.settings.unhighlight ) {
						this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
					}
					this.addWrapper(this.errorsFor(element)).hide();
				}
			},
			onfocusout: function( element, event ) {
				if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
					this.element(element);
				}
			},
			onkeyup: function( element, event ) {
				if ( event.which === 9 && this.elementValue(element) === "" ) {
					return;
				} else if ( element.name in this.submitted || element === this.lastElement ) {
					this.element(element);
				}
			},
			onclick: function( element, event ) {
				// click on selects, radiobuttons and checkboxes
				if ( element.name in this.submitted ) {
					this.element(element);
				}
				// or option elements, check parent select in that case
				else if ( element.parentNode.name in this.submitted ) {
					this.element(element.parentNode);
				}
			},
			highlight: function( element, errorClass, validClass ) {
				if ( element.type === "radio" ) {
					this.findByName(element.name).addClass(errorClass).removeClass(validClass);
				} else {
					$(element).addClass(errorClass).removeClass(validClass);
				}
			},
			unhighlight: function( element, errorClass, validClass ) {
				if ( element.type === "radio" ) {
					this.findByName(element.name).removeClass(errorClass).addClass(validClass);
				} else {
					$(element).removeClass(errorClass).addClass(validClass);
				}
			}
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
		setDefaults: function( settings ) {
			$.extend( $.validator.defaults, settings );
		},

		messages: {
			required: "This field is required.",
			remote: "Please fix this field.",
			email: "Please enter a valid email address.",
			url: "Please enter a valid URL.",
			date: "Please enter a valid date.",
			dateISO: "Please enter a valid date (ISO).",
			number: "Please enter a valid number.",
			digits: "Please enter only digits.",
			creditcard: "Please enter a valid credit card number.",
			equalTo: "Please enter the same value again.",
			maxlength: $.validator.format("Please enter no more than {0} characters."),
			minlength: $.validator.format("Please enter at least {0} characters."),
			rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
			range: $.validator.format("Please enter a value between {0} and {1}."),
			max: $.validator.format("Please enter a value less than or equal to {0}."),
			min: $.validator.format("Please enter a value greater than or equal to {0}.")
		},

		autoCreateRanges: false,

		prototype: {

			init: function() {
				this.labelContainer = $(this.settings.errorLabelContainer);
				this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
				this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
				this.submitted = {};
				this.valueCache = {};
				this.pendingRequest = 0;
				this.pending = {};
				this.invalid = {};
				this.reset();

				var groups = (this.groups = {});
				$.each(this.settings.groups, function( key, value ) {
					if ( typeof value === "string" ) {
						value = value.split(/\s/);
					}
					$.each(value, function( index, name ) {
						groups[name] = key;
					});
				});
				var rules = this.settings.rules;
				$.each(rules, function( key, value ) {
					rules[key] = $.validator.normalizeRule(value);
				});

				function delegate(event) {
					var validator = $.data(this[0].form, "validator"),
						eventType = "on" + event.type.replace(/^validate/, "");
					if ( validator.settings[eventType] ) {
						validator.settings[eventType].call(validator, this[0], event);
					}
				}
				$(this.currentForm)
					.validateDelegate(":text, [type='password'], [type='file'], select, textarea, " +
						"[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
						"[type='email'], [type='datetime'], [type='date'], [type='month'], " +
						"[type='week'], [type='time'], [type='datetime-local'], " +
						"[type='range'], [type='color'] ",
						"focusin focusout keyup", delegate)
					.validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", delegate);

				if ( this.settings.invalidHandler ) {
					$(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
				}
			},

			// http://docs.jquery.com/Plugins/Validation/Validator/form
			form: function() {
				this.checkForm();
				$.extend(this.submitted, this.errorMap);
				this.invalid = $.extend({}, this.errorMap);
				if ( !this.valid() ) {
					$(this.currentForm).triggerHandler("invalid-form", [this]);
				}
				this.showErrors();
				return this.valid();
			},

			checkForm: function() {
				this.prepareForm();
				for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
					this.check( elements[i] );
				}
				return this.valid();
			},

			// http://docs.jquery.com/Plugins/Validation/Validator/element
			element: function( element ) {
				element = this.validationTargetFor( this.clean( element ) );
				this.lastElement = element;
				this.prepareElement( element );
				this.currentElements = $(element);
				var result = this.check( element ) !== false;
				if ( result ) {
					delete this.invalid[element.name];
				} else {
					this.invalid[element.name] = true;
				}
				if ( !this.numberOfInvalids() ) {
					// Hide error containers on last error
					this.toHide = this.toHide.add( this.containers );
				}
				this.showErrors();
				return result;
			},

			// http://docs.jquery.com/Plugins/Validation/Validator/showErrors
			showErrors: function( errors ) {
				if ( errors ) {
					// add items to error list and map
					$.extend( this.errorMap, errors );
					this.errorList = [];
					for ( var name in errors ) {
						this.errorList.push({
							message: errors[name],
							element: this.findByName(name)[0]
						});
					}
					// remove items from success list
					this.successList = $.grep( this.successList, function( element ) {
						return !(element.name in errors);
					});
				}
				if ( this.settings.showErrors ) {
					this.settings.showErrors.call( this, this.errorMap, this.errorList );
				} else {
					this.defaultShowErrors();
				}
			},

			// http://docs.jquery.com/Plugins/Validation/Validator/resetForm
			resetForm: function() {
				if ( $.fn.resetForm ) {
					$(this.currentForm).resetForm();
				}
				this.submitted = {};
				this.lastElement = null;
				this.prepareForm();
				this.hideErrors();
				this.elements().removeClass( this.settings.errorClass ).removeData( "previousValue" );
			},

			numberOfInvalids: function() {
				return this.objectLength(this.invalid);
			},

			objectLength: function( obj ) {
				var count = 0;
				for ( var i in obj ) {
					count++;
				}
				return count;
			},

			hideErrors: function() {
				this.addWrapper( this.toHide ).hide();
			},

			valid: function() {
				return this.size() === 0;
			},

			size: function() {
				return this.errorList.length;
			},

			focusInvalid: function() {
				if ( this.settings.focusInvalid ) {
					try {
						$(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
						.filter(":visible")
						.focus()
						// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
						.trigger("focusin");
					} catch(e) {
						// ignore IE throwing errors when focusing hidden elements
					}
				}
			},

			findLastActive: function() {
				var lastActive = this.lastActive;
				return lastActive && $.grep(this.errorList, function( n ) {
					return n.element.name === lastActive.name;
				}).length === 1 && lastActive;
			},

			elements: function() {
				var validator = this,
					rulesCache = {};

				// select all valid inputs inside the form (no submit or reset buttons)
				return $(this.currentForm)
				.find("input, select, textarea")
				.not(":submit, :reset, :image, [disabled]")
				.not( this.settings.ignore )
				.filter(function() {
					if ( !this.name && validator.settings.debug && window.console ) {
						console.error( "%o has no name assigned", this);
					}

					// select only the first element for each name, and only those with rules specified
					if ( this.name in rulesCache || !validator.objectLength($(this).rules()) ) {
						return false;
					}

					rulesCache[this.name] = true;
					return true;
				});
			},

			clean: function( selector ) {
				return $(selector)[0];
			},

			errors: function() {
				var errorClass = this.settings.errorClass.replace(" ", ".");
				return $(this.settings.errorElement + "." + errorClass, this.errorContext);
			},

			reset: function() {
				this.successList = [];
				this.errorList = [];
				this.errorMap = {};
				this.toShow = $([]);
				this.toHide = $([]);
				this.currentElements = $([]);
			},

			prepareForm: function() {
				this.reset();
				this.toHide = this.errors().add( this.containers );
			},

			prepareElement: function( element ) {
				this.reset();
				this.toHide = this.errorsFor(element);
			},

			elementValue: function( element ) {
				var type = $(element).attr("type"),
					val = $(element).val();

				if ( type === "radio" || type === "checkbox" ) {
					return $("input[name='" + $(element).attr("name") + "']:checked").val();
				}

				if ( typeof val === "string" ) {
					return val.replace(/\r/g, "");
				}
				return val;
			},

			check: function( element ) {
				element = this.validationTargetFor( this.clean( element ) );

				var rules = $(element).rules();
				var dependencyMismatch = false;
				var val = this.elementValue(element);
				var result;

				for (var method in rules ) {
					var rule = { method: method, parameters: rules[method] };
					try {

						result = $.validator.methods[method].call( this, val, element, rule.parameters );

						// if a method indicates that the field is optional and therefore valid,
						// don't mark it as valid when there are no other rules
						if ( result === "dependency-mismatch" ) {
							dependencyMismatch = true;
							continue;
						}
						dependencyMismatch = false;

						if ( result === "pending" ) {
							this.toHide = this.toHide.not( this.errorsFor(element) );
							return;
						}

						if ( !result ) {
							this.formatAndAdd( element, rule );
							return false;
						}
					} catch(e) {
						if ( this.settings.debug && window.console ) {
							console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
						}
						throw e;
					}
				}
				if ( dependencyMismatch ) {
					return;
				}
				if ( this.objectLength(rules) ) {
					this.successList.push(element);
				}
				return true;
			},

			// return the custom message for the given element and validation method
			// specified in the element's HTML5 data attribute
			customDataMessage: function( element, method ) {
				return $(element).data("msg-" + method.toLowerCase()) || (element.attributes && $(element).attr("data-msg-" + method.toLowerCase()));
			},

			// return the custom message for the given element name and validation method
			customMessage: function( name, method ) {
				var m = this.settings.messages[name];
				return m && (m.constructor === String ? m : m[method]);
			},

			// return the first defined argument, allowing empty strings
			findDefined: function() {
				for(var i = 0; i < arguments.length; i++) {
					if ( arguments[i] !== undefined ) {
						return arguments[i];
					}
				}
				return undefined;
			},

			defaultMessage: function( element, method ) {
				return this.findDefined(
					this.customMessage( element.name, method ),
					this.customDataMessage( element, method ),
					// title is never undefined, so handle empty string as undefined
					!this.settings.ignoreTitle && element.title || undefined,
					$.validator.messages[method],
					"<strong>Warning: No message defined for " + element.name + "</strong>"
				);
			},

			formatAndAdd: function( element, rule ) {
				var message = this.defaultMessage( element, rule.method ),
					theregex = /\$?\{(\d+)\}/g;
				if ( typeof message === "function" ) {
					message = message.call(this, rule.parameters, element);
				} else if (theregex.test(message)) {
					message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters);
				}
				this.errorList.push({
					message: message,
					element: element
				});

				this.errorMap[element.name] = message;
				this.submitted[element.name] = message;
			},

			addWrapper: function( toToggle ) {
				if ( this.settings.wrapper ) {
					toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
				}
				return toToggle;
			},

			defaultShowErrors: function() {
				var i, elements;
				for ( i = 0; this.errorList[i]; i++ ) {
					var error = this.errorList[i];
					if ( this.settings.highlight ) {
						this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
					}
					this.showLabel( error.element, error.message );
				}
				if ( this.errorList.length ) {
					this.toShow = this.toShow.add( this.containers );
				}
				if ( this.settings.success ) {
					for ( i = 0; this.successList[i]; i++ ) {
						this.showLabel( this.successList[i] );
					}
				}
				if ( this.settings.unhighlight ) {
					for ( i = 0, elements = this.validElements(); elements[i]; i++ ) {
						this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
					}
				}
				this.toHide = this.toHide.not( this.toShow );
				this.hideErrors();
				this.addWrapper( this.toShow ).show();
			},

			validElements: function() {
				return this.currentElements.not(this.invalidElements());
			},

			invalidElements: function() {
				return $(this.errorList).map(function() {
					return this.element;
				});
			},

			showLabel: function( element, message ) {
				var label = this.errorsFor( element );
				if ( label.length ) {
					// refresh error/success class
					label.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
					// replace message on existing label
					label.html(message);
				} else {
					// create label
					label = $("<" + this.settings.errorElement + ">")
						.attr("for", this.idOrName(element))
						.addClass(this.settings.errorClass)
						.html(message || "");
					if ( this.settings.wrapper ) {
						// make sure the element is visible, even in IE
						// actually showing the wrapped element is handled elsewhere
						label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
					}
					if ( !this.labelContainer.append(label).length ) {
						if ( this.settings.errorPlacement ) {
							this.settings.errorPlacement(label, $(element) );
						} else {
							label.insertAfter(element);
						}
					}
				}
				if ( !message && this.settings.success ) {
					label.text("");
					if ( typeof this.settings.success === "string" ) {
						label.addClass( this.settings.success );
					} else {
						this.settings.success( label, element );
					}
				}
				this.toShow = this.toShow.add(label);
			},

			errorsFor: function( element ) {
				var name = this.idOrName(element);
				return this.errors().filter(function() {
					return $(this).attr("for") === name;
				});
			},

			idOrName: function( element ) {
				return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
			},

			validationTargetFor: function( element ) {
				// if radio/checkbox, validate first element in group instead
				if ( this.checkable(element) ) {
					element = this.findByName( element.name ).not(this.settings.ignore)[0];
				}
				return element;
			},

			checkable: function( element ) {
				return (/radio|checkbox/i).test(element.type);
			},

			findByName: function( name ) {
				return $(this.currentForm).find("[name='" + name + "']");
			},

			getLength: function( value, element ) {
				switch( element.nodeName.toLowerCase() ) {
				case "select":
					return $("option:selected", element).length;
				case "input":
					if ( this.checkable( element) ) {
						return this.findByName(element.name).filter(":checked").length;
					}
				}
				return value.length;
			},

			depend: function( param, element ) {
				return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
			},

			dependTypes: {
				"boolean": function( param, element ) {
					return param;
				},
				"string": function( param, element ) {
					return !!$(param, element.form).length;
				},
				"function": function( param, element ) {
					return param(element);
				}
			},

			optional: function( element ) {
				var val = this.elementValue(element);
				return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
			},

			startRequest: function( element ) {
				if ( !this.pending[element.name] ) {
					this.pendingRequest++;
					this.pending[element.name] = true;
				}
			},

			stopRequest: function( element, valid ) {
				this.pendingRequest--;
				// sometimes synchronization fails, make sure pendingRequest is never < 0
				if ( this.pendingRequest < 0 ) {
					this.pendingRequest = 0;
				}
				delete this.pending[element.name];
				if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
					$(this.currentForm).submit();
					this.formSubmitted = false;
				} else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
					$(this.currentForm).triggerHandler("invalid-form", [this]);
					this.formSubmitted = false;
				}
			},

			previousValue: function( element ) {
				return $.data(element, "previousValue") || $.data(element, "previousValue", {
					old: null,
					valid: true,
					message: this.defaultMessage( element, "remote" )
				});
			}

		},

		classRuleSettings: {
			required: {required: true},
			email: {email: true},
			url: {url: true},
			date: {date: true},
			dateISO: {dateISO: true},
			number: {number: true},
			digits: {digits: true},
			creditcard: {creditcard: true}
		},

		addClassRules: function( className, rules ) {
			if ( className.constructor === String ) {
				this.classRuleSettings[className] = rules;
			} else {
				$.extend(this.classRuleSettings, className);
			}
		},

		classRules: function( element ) {
			var rules = {};
			var classes = $(element).attr("class");
			if ( classes ) {
				$.each(classes.split(" "), function() {
					if ( this in $.validator.classRuleSettings ) {
						$.extend(rules, $.validator.classRuleSettings[this]);
					}
				});
			}
			return rules;
		},

		attributeRules: function( element ) {
			var rules = {};
			var $element = $(element);
			var type = $element[0].getAttribute("type");

			for (var method in $.validator.methods) {
				var value;

				// support for <input required> in both html5 and older browsers
				if ( method === "required" ) {
					value = $element.get(0).getAttribute(method);
					// Some browsers return an empty string for the required attribute
					// and non-HTML5 browsers might have required="" markup
					if ( value === "" ) {
						value = true;
					}
					// force non-HTML5 browsers to return bool
					value = !!value;
				} else {
					value = $element.attr(method);
				}

				// convert the value to a number for number inputs, and for text for backwards compability
				// allows type="date" and others to be compared as strings
				if ( /min|max/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
					value = Number(value);
				}

				if ( value ) {
					rules[method] = value;
				} else if ( type === method && type !== 'range' ) {
					// exception: the jquery validate 'range' method
					// does not test for the html5 'range' type
					rules[method] = true;
				}
			}

			// maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
			if ( rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength) ) {
				delete rules.maxlength;
			}

			return rules;
		},

		dataRules: function( element ) {
			var method, value,
				rules = {}, $element = $(element);
			for (method in $.validator.methods) {
				value = $element.data("rule-" + method.toLowerCase());
				if ( value !== undefined ) {
					rules[method] = value;
				}
			}
			return rules;
		},

		staticRules: function( element ) {
			var rules = {};
			var validator = $.data(element.form, "validator");
			if ( validator.settings.rules ) {
				rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
			}
			return rules;
		},

		normalizeRules: function( rules, element ) {
			// handle dependency check
			$.each(rules, function( prop, val ) {
				// ignore rule when param is explicitly false, eg. required:false
				if ( val === false ) {
					delete rules[prop];
					return;
				}
				if ( val.param || val.depends ) {
					var keepRule = true;
					switch (typeof val.depends) {
					case "string":
						keepRule = !!$(val.depends, element.form).length;
						break;
					case "function":
						keepRule = val.depends.call(element, element);
						break;
					}
					if ( keepRule ) {
						rules[prop] = val.param !== undefined ? val.param : true;
					} else {
						delete rules[prop];
					}
				}
			});

			// evaluate parameters
			$.each(rules, function( rule, parameter ) {
				rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
			});

			// clean number parameters
			$.each(['minlength', 'maxlength'], function() {
				if ( rules[this] ) {
					rules[this] = Number(rules[this]);
				}
			});
			$.each(['rangelength', 'range'], function() {
				var parts;
				if ( rules[this] ) {
					if ( $.isArray(rules[this]) ) {
						rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
					} else if ( typeof rules[this] === "string" ) {
						parts = rules[this].split(/[\s,]+/);
						rules[this] = [Number(parts[0]), Number(parts[1])];
					}
				}
			});

			if ( $.validator.autoCreateRanges ) {
				// auto-create ranges
				if ( rules.min && rules.max ) {
					rules.range = [rules.min, rules.max];
					delete rules.min;
					delete rules.max;
				}
				if ( rules.minlength && rules.maxlength ) {
					rules.rangelength = [rules.minlength, rules.maxlength];
					delete rules.minlength;
					delete rules.maxlength;
				}
			}

			return rules;
		},

		// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
		normalizeRule: function( data ) {
			if ( typeof data === "string" ) {
				var transformed = {};
				$.each(data.split(/\s/), function() {
					transformed[this] = true;
				});
				data = transformed;
			}
			return data;
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/addMethod
		addMethod: function( name, method, message ) {
			$.validator.methods[name] = method;
			$.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
			if ( method.length < 3 ) {
				$.validator.addClassRules(name, $.validator.normalizeRule(name));
			}
		},

		methods: {

			// http://docs.jquery.com/Plugins/Validation/Methods/required
			required: function( value, element, param ) {
				// check if dependency is met
				if ( !this.depend(param, element) ) {
					return "dependency-mismatch";
				}
				if ( element.nodeName.toLowerCase() === "select" ) {
					// could be an array for select-multiple or a string, both are fine this way
					var val = $(element).val();
					return val && val.length > 0;
				}
				if ( this.checkable(element) ) {
					return this.getLength(value, element) > 0;
				}
				return $.trim(value).length > 0;
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/email
			email: function( value, element ) {
				// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
				return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/url
			url: function( value, element ) {
				// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
				return this.optional(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/date
			date: function( value, element ) {
				return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/dateISO
			dateISO: function( value, element ) {
				return this.optional(element) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value);
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/number
			number: function( value, element ) {
				return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/digits
			digits: function( value, element ) {
				return this.optional(element) || /^\d+$/.test(value);
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/creditcard
			// based on http://en.wikipedia.org/wiki/Luhn
			creditcard: function( value, element ) {
				if ( this.optional(element) ) {
					return "dependency-mismatch";
				}
				// accept only spaces, digits and dashes
				if ( /[^0-9 \-]+/.test(value) ) {
					return false;
				}
				var nCheck = 0,
					nDigit = 0,
					bEven = false;

				value = value.replace(/\D/g, "");

				for (var n = value.length - 1; n >= 0; n--) {
					var cDigit = value.charAt(n);
					nDigit = parseInt(cDigit, 10);
					if ( bEven ) {
						if ( (nDigit *= 2) > 9 ) {
							nDigit -= 9;
						}
					}
					nCheck += nDigit;
					bEven = !bEven;
				}

				return (nCheck % 10) === 0;
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/minlength
			minlength: function( value, element, param ) {
				var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
				return this.optional(element) || length >= param;
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/maxlength
			maxlength: function( value, element, param ) {
				var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
				return this.optional(element) || length <= param;
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/rangelength
			rangelength: function( value, element, param ) {
				var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
				return this.optional(element) || ( length >= param[0] && length <= param[1] );
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/min
			min: function( value, element, param ) {
				return this.optional(element) || value >= param;
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/max
			max: function( value, element, param ) {
				return this.optional(element) || value <= param;
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/range
			range: function( value, element, param ) {
				return this.optional(element) || ( value >= param[0] && value <= param[1] );
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/equalTo
			equalTo: function( value, element, param ) {
				// bind to the blur event of the target in order to revalidate whenever the target field is updated
				// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
				var target = $(param);
				if ( this.settings.onfocusout ) {
					target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
						$(element).valid();
					});
				}
				return value === target.val();
			},

			// http://docs.jquery.com/Plugins/Validation/Methods/remote
			remote: function( value, element, param ) {
				if ( this.optional(element) ) {
					return "dependency-mismatch";
				}

				var previous = this.previousValue(element);
				if (!this.settings.messages[element.name] ) {
					this.settings.messages[element.name] = {};
				}
				previous.originalMessage = this.settings.messages[element.name].remote;
				this.settings.messages[element.name].remote = previous.message;

				param = typeof param === "string" && {url:param} || param;

				if ( previous.old === value ) {
					return previous.valid;
				}

				previous.old = value;
				var validator = this;
				this.startRequest(element);
				var data = {};
				data[element.name] = value;
				$.ajax($.extend(true, {
					url: param,
					mode: "abort",
					port: "validate" + element.name,
					dataType: "json",
					data: data,
					success: function( response ) {
						validator.settings.messages[element.name].remote = previous.originalMessage;
						var valid = response === true || response === "true";
						if ( valid ) {
							var submitted = validator.formSubmitted;
							validator.prepareElement(element);
							validator.formSubmitted = submitted;
							validator.successList.push(element);
							delete validator.invalid[element.name];
							validator.showErrors();
						} else {
							var errors = {};
							var message = response || validator.defaultMessage( element, "remote" );
							errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
							validator.invalid[element.name] = true;
							validator.showErrors(errors);
						}
						previous.valid = valid;
						validator.stopRequest(element, valid);
					}
				}, param));
				return "pending";
			}

		}

	});

	// deprecated, use $.validator.format instead
	$.format = $.validator.format;

	}(jQuery));

	// ajax mode: abort
	// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
	// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
	(function($) {
		var pendingRequests = {};
		// Use a prefilter if available (1.5+)
		if ( $.ajaxPrefilter ) {
			$.ajaxPrefilter(function( settings, _, xhr ) {
				var port = settings.port;
				if ( settings.mode === "abort" ) {
					if ( pendingRequests[port] ) {
						pendingRequests[port].abort();
					}
					pendingRequests[port] = xhr;
				}
			});
		} else {
			// Proxy ajax
			var ajax = $.ajax;
			$.ajax = function( settings ) {
				var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
					port = ( "port" in settings ? settings : $.ajaxSettings ).port;
				if ( mode === "abort" ) {
					if ( pendingRequests[port] ) {
						pendingRequests[port].abort();
					}
					pendingRequests[port] = ajax.apply(this, arguments);
					return pendingRequests[port];
				}
				return ajax.apply(this, arguments);
			};
		}
	}(jQuery));

	// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
	// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target
	(function($) {
		$.extend($.fn, {
			validateDelegate: function( delegate, type, handler ) {
				return this.bind(type, function( event ) {
					var target = $(event.target);
					if ( target.is(delegate) ) {
						return handler.apply(target, arguments);
					}
				});
			}
		});
	}(jQuery));

/***/ }
/******/ ]);