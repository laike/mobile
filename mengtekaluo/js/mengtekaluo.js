//应用js代码
var app = {};
//弹框组件
var dialog = new auiDialog({});
//Toast组件
var toast = new auiToast({})
    //注册页面验证规则
var registerRulesOpts = {
        rules: {
            username: {
                required: true,
                checkUsername: true
            },
            password: {
                required: true,
                checkPassword: true,
            },
            passwd: {
                required: true,
                checkPasswd: true,
                equalTo: "#password"
            },
            email: {
                required: true,
                email: true
            },
            agree: {
                required: true
            },
            mobile: {
                required: true,
                checkMobile: true
            },
            rmNum: {
                required: true,
                digits: true,
                maxlength: 4
            },
            real_name: {
                required: true
            },
            pwd1: {
                required: true
            },
            pwd2: {
                required: true
            },
            pwd3: {
                required: true
            },
            pwd4: {
                required: true
            }
        },
        messages: {
            username: {
                required: "请输入账号",
            },
            password: {
                required: "请输入密码！",
            },
            passwd: {
                required: "请输入确认密码！",
                equalTo: "输入的确认密码和密码不相同，请重新输入！"
            },
            email: {
                required: "请输入邮件地址",
                email: '邮箱地址不正确！'
            },
            agree: {
                required: "您还没有勾选条款！"
            },
            mobile: {
                required: '请输入手机号码！',
                checkMobile: '手机号码格式不正确!'
            }
        }
    }
    //登录页面验证规则
var loginRulesOpts = {
        rules: {
            username: {
                required: true,
                checkUsername: true
            },
            password: {
                required: true,
                checkPassword: true,
            },
            rmNum: {
                required: true,
                digits: true,
                maxlength: 4
            }
        },
        messages: {
            username: {
                required: "请输入账号",
            },
            password: {
                required: "请输入密码！",
            }
        }
    }
    //绑定银行卡页面验证规则
var bindingRulesOpts = {
        rules: {
            username: {
                required: true,
                checkUsername: true
            },
            bank: {
                required: true
            },
            province: {
                required: true
            },
            town: {
                required: true
            },
            real_name: {
                required: true
            },
            pwd1: {
                required: true
            },
            pwd2: {
                required: true
            },
            pwd3: {
                required: true
            },
            pwd4: {
                required: true
            }
        },
        messages: {
            username: {
                required: "请输入账号"
            }
        }
    }
    //初始化轮播器
app.initSlider = function(opt) {
        var opts = $.extend({
            container: document.getElementById("mgtl-slide"),
            "height": 60,
            "speed": 500,
            "autoPlay": 3000, //自动播放
            "loop": true,
            "pageShow": true,
            "pageStyle": 'line',
            'dotPosition': 'center'
        }, opt);
        return new auiSlide(opts);
    }
    //初始化底部导航 效果等
app.initFooterBar = function(opt) {
        var opts = $.extend({
            id: '#footer',
            itemcls: '.aui-bar-tab-item',
            activecls: '.aui-active',
            activebarcls: '.mgtl-footer-navbar',
            effectcls: 'ripple-effect',
            duration: 3000
        }, opt);
        var curNativeBar = $(opts.activebarcls);

        $(opts.activebarcls).css({
            width: $(opts.id).find(opts.itemcls).eq(0).width(),
            bottom: $(opts.id).find(opts.itemcls).eq(0).height()
        });
        $(opts.activebarcls).width()
        curNativeBar.animate({
            left: $(opts.activebarcls).offset().left
        });
        $(opts.id).find(opts.itemcls).click(function(event) {

            event = event || window.event;

            var _this = this;
            curNativeBar.stop(true).animate({
                left: $(_this).offset().left
            });
            var xPos = event.pageX - $(_this).offset().left;
            var yPos = event.pageY - $(_this).offset().top;
            var div = $('<div/>');
            div.addClass('ripple-effect');
            var ripple = $(_this).find('.ripple-effect');
            ripple.css("height", $(_this).height());
            ripple.css("width", $(_this).height());
            div.css({
                left: xPos - (ripple.width() / 2),
                top: yPos - (ripple.height() / 2),
                background: $(_this).data('bgcolor') ? $(_this).data('bgcolor') : 'rgba(254,73,2,.6)'
            });
            div.appendTo($(_this));
            setTimeout(function() {
                div.remove();
            }, opts.duration);
        });
    }
    //语言下拉效果
app.initLanguageDownList = function(opt) {
        var opts = $.extend({
            cls: '.language',
            triggerele: '.language a:first',
            listcls: '.language-list',
            speed: 'slow',
            effect: 'swing',
            duration: 3000
        }, opt);
        var triggerele = $(opts.triggerele);
        var lanList = $(opts.listcls);
        var _timeout = null;
        triggerele.click(function(event) {
            event.preventDefault();
            lanList.slideToggle(opts.speed);
        });
    }
    //初始化ui-select
app.initUiSelect = function(opt) {
        var opts = $.extend({
            cls: '.ui-select',
        }, opt);
        var _select = $(opts.cls);
        _select.change(function() {
            var _this = this;
            var _span = $(_this).find('span');
            var _curitem = $(_this).find('option:selected');
            _span.html('<i class=\"iconfont icon-' + _curitem.data('icon') + ' col-red aui-font-size-20 aui-padded-r-5\"></i>' + _curitem.text());
        });
    }
    //初始化注册验证
app.initValidate = function(formid, opt, callback) {
    if (jQuery.validator === undefined) {
        return;
    }
    var callback = callback ? callback : function(form) {
        //这里我们需要弹出一个正在登陆窗口进行提示
        toast.loading({
            title: "努力加载中...",
            duration: 2000
        }, function(ret) {
            $.post('index.html', { usderid: 15561452, from: 'login.html', token: 'egqeg51451541414gregeageag1sfwgfag' }, function(data) {
                //成功以后进行隐藏
                setTimeout(function() {
                    toast.hide(500);
                }, 3000)
            });
        });
    };
    var opts = $.extend({
        submitHandler: callback,
        errorElement: "em",
        errorPlacement: function(error, element) {
            error.addClass("help-block");
            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                error.insertAfter(element);
            }
        },
    }, opt);
    //新增账号验证规则
    jQuery.validator.addMethod("checkUsername", function(value, element) {
        var usernamePattern = /^[0-9A-Za-z]{4,12}$/;
        return this.optional(element) || (usernamePattern.test(value));
    }, "请输入4-12个字, 仅可输入英文字母以及数字的组合!");
    //新增密码验证规则
    jQuery.validator.addMethod("checkPassword", function(value, element) {
        var passPattern = /^[0-9a-z]{6,12}$/;
        return this.optional(element) || (passPattern.test(value));
    }, "密码须为6~12个英文或数字且符合0~9或a~z字元!");
    //新增确认密码密码验证规则
    jQuery.validator.addMethod("checkPasswd", function(value, element) {
        var passPattern = /^[0-9a-z]{6,12}$/;
        return this.optional(element) || (passPattern.test(value));
    }, "确认密码须为6~12个英文或数字且符合0~9或a~z字元!");
    //新增邮箱的验证规则
    jQuery.validator.addMethod("checkMobile", function(value, element) {
        var mobilePattern = /^1\d{10}$/;
        return this.optional(element) || (mobilePattern.test(value));
    }, "手机格式不正确！");
    $(formid).validate(opts);


}

//页面切换时候的加载效果
app.loading = function(opt) {
        var opts = $.extend({
            loadingcls: '.loader',
            landscapecls: '.landscape',
            contentcls: 'body',
            duration: 2000
        }, opt);
        //这里我们动态设置下内容滚动区域的高度
        var resizeFn = function(event) {

                var h = $(window).height() - $('.mgtl-header').height() - $('#footer').height();

                $('.mgtl-content-bg').height(h);
            }
            //resizeFn();
            // $(window).resize(resizeFn);

        var content = $(opts.contentcls);
        var loading = $(opts.loadingcls);
        var landscape = $(opts.landscapecls);
        $(content).fadeIn(opts.duration);
        //判断手机横竖屏状态：
        function orientatechange() {
            if (window.orientation == 180 || window.orientation == 0) {
                landscape.hide(500);
            }
            if (window.orientation == 90 || window.orientation == -90) {
                landscape.show(500);
            }
        }
        var rute = location.href;
        if (/index/.test(rute)) {
            loading.show();
            setTimeout(function() {
                loading.fadeOut(500);
            }, 3000);
        }
        //如果是取款页面的话
        if (/withdraw/.test(rute)) {
            dialog.alert({
                title: "提醒你",
                msg: "若要提出非BBIN余额，请先[额度转换]至BBIN余额",
                buttons: ['确定']
            }, function(ret) {

                //这里调用成功了以后然后通过ajax请求看看是否还有公告等提示信息依次显示出来
                $.get('login.html', function(data) {
                    data = {
                        error: 0,
                        hasannounce: 1,
                        title: '敬请注意: 维护中的游戏，暂时无法显示游戏的实际有效投注额',
                        msg: '<p>SA视讯 - 維護時間(北京時間) 2016-09-19 10:30 ~ 14:00<br>维护时间(美东时间):2016-09-18 22:30:00 ~ 2016-09-19 02:00:00</p>' +
                            '<p class="col-red"> 敬请注意: 维护中的游戏，暂时无法显示游戏的实际有效投注额。</p>'
                    };
                    if (data.error === 0 && data.hasannounce === 1) {
                        //弹出提示框
                        var _timeout = null;
                        _timeout = setTimeout(function() {
                            dialog.alert({
                                title: data.title,
                                msg: data.msg,
                                buttons: ['确定']
                            }, function(ret) {
                                clearTimeout(_timeout);
                            });
                        }, 1000);
                    }
                })
            });
            //这里是取款页面的逻辑
            //绑定input输入框的keyup事件
            $('input[name=pwd]').keyup(function(event) {
                var _this = this;
                var pattern = /^\d*$/;
                var txt = $.trim($(_this).val());
                if (txt == "") {
                    $(_this).parent().siblings('.aui-list-item-label-icon').find('i').removeClass('col-red col-white').addClass('col-gray');
                    return;
                }
                if (!pattern.test(txt)) {
                    $(_this).val('');
                    $(_this).parent().siblings('.aui-list-item-label-icon').find('i').removeClass('col-gray col-white').addClass('col-red');
                    return;
                }
                $(_this).parent().siblings('.aui-list-item-label-icon').find('i').removeClass('col-gray col-red').addClass('col-white');
            }).focus(function() {
                var _this = this;
                var txt = $.trim($(_this).val());
                if (txt == "") {
                    $(_this).parent().siblings('.aui-list-item-label-icon').find('i').removeClass('col-red col-white').addClass('col-gray');
                    return;
                }
            });

            $('input[name=money]').keyup(function(event) {
                var _this = this;
                var pattern = /^\d*$/;
                var txt = $.trim($(_this).val());
                if (txt == "") {
                    $(_this).parent().siblings('.aui-list-item-label-icon').find('i').removeClass('col-red col-white').addClass('col-gray');
                    return;
                }
                if (!pattern.test(txt)) {
                    $(_this).val('');
                    $(_this).parent().siblings('.aui-list-item-label-icon').find('i').removeClass('col-gray col-white').addClass('col-red');
                    return;
                }
                if (parseInt(txt) >= 2000000) {
                    if ($('body').has('.aui-dialog').length === 0) {
                        dialog.alert({
                            title: '提醒您',
                            msg: '您提款金额超过$2000000需经过审核，将于24小时内到帐，请耐心等候!',
                            buttons: ['确定']
                        });
                    }
                }
                $('#actual-money').html(parseInt(txt));
                $(_this).parent().siblings('.aui-list-item-label-icon').find('i').removeClass('col-gray col-red').addClass('col-white');
            }).focus(function() {
                var _this = this;
                var txt = $.trim($(_this).val());
                if (txt == "") {
                    $(_this).parent().siblings('.aui-list-item-label-icon').find('i').removeClass('col-red col-white').addClass('col-gray');
                    return;
                }
            });
            //第一个页面逻辑
            $('#mgtl-widthdraw-step1 .mgtl-withdraw-continue').click(function(event) {
                event.preventDefault();
                toast.loading({
                    title: "努力加载中...",
                    duration: 2000
                }, function(ret) {
                    $.post('index.html', { test: 'test', userid: 'test' }, function(data) {
                        data = {
                            'username': 'test',
                            'pwd': '123456'
                        };
                        data = JSON.parse(JSON.stringify(data));
                        setTimeout(function() {
                            toast.hide(500);
                            //显示第二个窗口出来
                            $('#mgtl-widthdraw-step1').slideToggle(500);
                            $('#mgtl-widthdraw-step2').slideToggle(1500);
                        }, 3000)
                    });

                });

            });
        }
        //第二个页面逻辑
        //绑定页面中的
        $('#mgtl-widthdraw-step2 .mgtl-withdraw-continue').click(function(event) {
            event.preventDefault();
            dialog.alert({
                title: '提醒您',
                msg: '确定要写入么？',
                buttons: ['确定', '取消']
            });
        });
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", orientatechange, false);
    }
    //金额模拟函数
function randomEdu() {
    return Math.round(Math.random(100000) * 100000) + '.00';
}
//初始化会员中心
app.initMemberCenter = function() {
    var _timeout = null;
    $('.mgtl-member .fa-refresh').click(function() {
        var _this = this;
        clearTimeout(_timeout);
        $(_this).addClass('fa-spin');
        $.get('navlist.html', function(data) {
            data = {
                'username': 'test',
                'pwd': '123456'
            };
            //业务处理
            data = JSON.parse(JSON.stringify(data)); //转化json字符串
            _timeout = setTimeout(function() {
                $(_this).removeClass('fa-spin');
                $(_this).parent().html(randomEdu());
            }, 1500);
        })
    });
}
jQuery(document).ready(function() {
    app.initSlider();
    app.initLanguageDownList();
    app.initUiSelect();
    $('.mgtl-concept').click(function() {
        dialog.alert({
            title: "提示",
            msg: $('.concept').html(),
            buttons: ['确定']
        }, function(ret) {

        });
    });
    app.initValidate('#regsiterForm', registerRulesOpts);
    app.initValidate('#bindingForm', bindingRulesOpts);
    app.initValidate('#loginForm', loginRulesOpts);
    app.loading();
    app.initFooterBar();
    app.initMemberCenter();
});

//我们这里转而使用iscroll 这个插件来替代移动端滚动区域的问题
function loaded() {
    Scroll = new IScroll('#wrapper', { mouseWheel: true, preventDefault: false });
}

document.addEventListener('DOMContentLoaded', loaded);