/* COMBO: filename = common/login.v4.8.js, type = application/javascript, resp = 200 */
$(function(){
    //弹窗关闭
    $('.st-lregwin .close-btn').on('click', function () {
        $('.st-lregwin').fadeOut();
        $('.st-lregwin .frame-box').hide();
        $('.st-lregwin .regist-box').show();
        $('.st-lregwin .login-box').show();
    });
    $('.st-lregwin .mask').on('click',function () {
        $('.st-lregwin').fadeOut();
    });
    // 到QQ登录
    $('.do-qqlogin').click(function(){
        env.qqlogin();
    });
    // 登录框切换到注册框
    $('.login-to-reg').click(function(){
        $('#alert-action-login').hide();
        env.logup();
    });
    // 切换到手机登录
    $('.do-phone-login').click(function(){
        $('.login-box').hide();
        $('.phone-login').show();
    });
    // 切换到验证码登录
    $('.do-phone-applogin').click(function(){
        $(".verify_login").empty();
        $(".get-code").removeClass("click-border");
        $(".error-ts").hide();
        var VerifyCode = function (obj) {
            window._obj = obj;
            obj.onReady(function (){
                $(".err-16").show();
            }).onSuccess(function () {
                var validate = window._obj.getValidate();
                if (!validate) {
                    $(".err-16").show();
                    setTimeout(function () {
                        $(".err-16").hide();
                    }, 2000);
                    e.preventDefault();
                    return false;
                }
                $(".login-code").addClass("click-border");
                $(".login-code").attr("data-disable",0);
                var state = $(".login-code").attr('data-disable');
                var state = parseInt(state);
                var is_bind = $(".login-code").attr('is-bind');
                var oInput = $(".phone-applogin").find("input[name='phone']");
                if (!state) {
                    if(LoginPhone(oInput)){
                        var phone = oInput.val();
                        var geetest_challenge = validate.geetest_challenge;
                        var geetest_validate  = validate.geetest_validate;
                        var geetest_seccode   = validate.geetest_seccode;
                        var data = {'phone':phone,geetest_challenge:geetest_challenge,geetest_validate:geetest_validate,geetest_seccode:geetest_seccode,is_bind:1};
                        $.post("/register/ajaxSendPhoneVerifyCode", data, function(res){
                            if (res.message == 1) {
                                $('.phone-register .err-12').show().siblings('p').hide();
                            } else if (res.message == 2) {
                                $('.phone-register .err-11').show().siblings('p').hide();
                            } else if (res.message == 3) {
                                if(is_bind == 1) {
                                    $('.phone-applogin .err-15').show().siblings('p').hide();
                                } else {
                                    $('.phone-register .err-15').show().siblings('p').hide();
                                }
                            } else if (res.message == 4) {
                                LoginCountdown();
                                $('.phone-register .err-3').show().siblings('p').hide();
                            } 
                        });
                    }
                }
            });
            $(".login-code").click(function () {
                var isDisable = $(this).attr('data-disable');
                if(isDisable != 1) {
                    obj.verify();
                } else {
                    $(".do-phone-applogin err-0").show().siblings('p').hide();
                }
            });
        };
        $.ajax({
            url: "/register/verifyCodeLogin?t=" + (new Date()).getTime(), // 加随机数防止缓存
            type: "get",
            dataType: "json",
            success: function (data) {
                initGeetest({
                    gt: data.gt,
                    challenge: data.challenge,
                    new_captcha: data.new_captcha,
                    product: "bind", 
                    offline: !data.success,
                    width: '328px'
                }, VerifyCode);
            }
        });
        $(".login-box").hide();
        $('.phone-login').hide();
        $('.phone-applogin').show();
    });
    function resetPopup(){
        $('.st-lregwin .frame-box').hide();
        $('.st-lregwin .regist-box').show();
        $('.st-lregwin .login-box').show();
    }
    // 手机号码输入框失去焦点判断格式
    $(".phone-login input[name='phone']").blur(function(){
        var phone = $(".phone-login input[name='phone']").val();
        var rePhone = /^[1][3-9][0-9]{9}$/;
        if (!rePhone.test(phone) && phone != '') {
            //不是手机号码的话判断是否是邮箱登录
            var reMail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
            if (!reMail.test(phone)) {
                // 不是手机号码，也不是邮箱的话，就判断是否是兼职账号  2或3开头的11位数字
                var res = /^[2,3]\d{10}/;
                if (!res.test(phone)) {
                    prompt('请输入正确的手机号码');
                }
            }
        }
    }).focus(function(){
        $('.phone-login .fd-tips').hide();
    });
    $(".phone-login input[name='passwd']").focus(function(){
        $('.phone-login .fd-tips').hide();
    });
    // 手机登录
    $('.phone-login-btn').click(function(){
        var phone = $(".phone-login input[name='phone']").val();
        var passwd = $(".phone-login input[name='passwd']").val();
        if(!phone) {
            prompt('请输入正确的手机号码');
            return false;
        }
        if(!passwd) {
            prompt('请输入密码');
            return false;
        }
        $.post('/auth/dologin', {'name':phone, 'passwd':passwd}, function(res){
            if (res.state) {
                location.reload();
            } else {
                prompt('您输入的用户名或密码有误');
            }
        });
    });
    // 按下回车，提交表单
    $("body").keydown(function(event) {
        if (event.keyCode == "13") { //keyCode=13是回车键
            if ($('.phone-login').is(":visible")) {
                $('.phone-login-btn').click();
            } else if ($('.phone-applogin').is(":visible")) {
                $('.phone-applogin .sure-success').click();
            }
        }
    });
    // 显示错误提示
    function prompt(content){
        $('.phone-login .fd-tips').show();
        $('.phone-login .fd-tips span').text(content);
    }
    //失去焦点，判断手机号码格式
    $(".phone-applogin input[name='phone']").focus(function(){
        $('.error-phone').hide();
    }).blur(function (){
        var res = LoginPhone();
        if(!res) {
            $(this).addClass('error-border');
            $(".login-code").removeClass('click-border').attr('data-disable',1);
        } else {
            $(".login-code").addClass("click-border").attr("data-disable",0);
            $('.phone-applogin .err-1').hide().siblings('p').hide();
            $(".phone-applogin input[name='phone']").removeClass('error-border');
        }
    });

    // 验证验证码是否正确
    $(".phone-applogin input[name='code']").blur(function(){
        var code = $(".phone-applogin input[name='code']").val();
        var phone = $(".phone-applogin input[name='phone']").val();
        var data = {'phone':phone, 'code':code};
        if (code != '' & phone != '') {
            $.post("/register/ajaxConfirmPhoneVerifyCode", data, function(res){
                if (res.state == 0) {
                    $('.phone-applogin .err-4').show().siblings('p').hide();
                } else {
                    $('.phone-applogin .err-5').show().siblings('p').hide();
                }
            });
        }
    }).focus(function(){
        $('.phone-applogin .err-4').hide();
        $('.phone-applogin .err-14').hide();
    });

    // 验证手机号码格式
    function LoginPhone(){
        var phone = $(".phone-applogin input[name='phone']").val();
        var rePhone = /^1[3-9][0-9]{9}$/;
        if (!rePhone.test(phone)) {
            $('.phone-applogin .err-1').show().siblings('p').hide();
            return false;
        } else {
            return true;
        }
    }
    //点击确定
    $('.phone-applogin .sure-success').click(function(){
        var phone = $(".phone-applogin input[name='phone']").val();
        var code = $(".phone-applogin input[name='code']").val();
        var data = {'phone':phone, 'code':code};
        if (!LoginPhone()) {
            $('.success-1').hide();
            return false;
        }
        $.post("/auth/verifyCodeLogin", data, function(res){
            if (res.state == 0) {
                $(".error-code").show();
            } else {
                location.reload(); //登录成功
            }
        });
    });
    // 倒计时
    function LoginCountdown() {
        $('.login-code').attr('style', 'background:#F9F9F9;cursor:default;');
        num = 60;
        sendTimmer = setInterval(function () {
            $('.login-code').attr('data-disable', true);
            num -= 1;
            if (num <= 0) {
                num = 60;
                clearInterval(sendTimmer);
                $('.login-code').html('获取验证码');
                $('.login-code').removeAttr('data-disable');
                $('.login-code').attr('style', '');
                return;
            }
            $('.login-code').html(num + '秒后重发');
        }, 1000);
    }
});
/* COMBO: filename = common/reg.v4.0.js, type = application/javascript, resp = 200 */
$(function(){
    //弹窗关闭
    $('.st-lregwin .close-btn').on('click', function () {
        $('.st-lregwin').fadeOut();
        $('.st-lregwin .frame-box').hide();
        $('.st-lregwin .regist-box').show();
        $('.st-lregwin .login-box').show();
    })
    $('.st-lregwin .mask').on('click',function () {
        $('.st-lregwin').fadeOut();
    });


    // 注册框切换到登录框
    $('.reg-to-login').click(function(){
        $('#alert-action-logup').hide();
        env.login();
    });

    // 切换到手机注册
    $('.do-phone-reg').click(function(){
        $(".regist-code").removeClass("click-border");
        $(".error-ts").hide();
        var VerifyCode = function (obj) {
            window._obj = obj;
            obj.onReady(function () {
                $(".err-16").show();
            }).onSuccess(function () {
                var validate = window._obj.getValidate();
                if (!validate) {
                    $(".err-16").show();
                    setTimeout(function () {
                        $(".err-16").hide();
                    }, 2000);
                    e.preventDefault();
                    return false;
                }
                $(".regist-code").addClass("click-border");
                $(".regist-code").attr("data-disable",0);
                var state = parseInt($(".regist-code").attr('data-disable'));
                var oInput = $(".phone-register").find("input[name='phone']");
                if (!state) {
                    if(RegistPhone(oInput)){
                        var phone = oInput.val();
                        var geetest_challenge = validate.geetest_challenge;
                        var geetest_validate  = validate.geetest_validate;
                        var geetest_seccode   = validate.geetest_seccode;
                        var data = {'phone':phone,geetest_challenge:geetest_challenge,geetest_validate:geetest_validate,geetest_seccode:geetest_seccode,is_bind:2};
                        $.post("/register/ajaxSendPhoneVerifyCode", data, function(res){
                            if (res.message == 1) {
                                $('.phone-register .err-12').show().siblings('p').hide();
                            } else if (res.message == 2) {
                                $('.phone-register .err-11').show().siblings('p').hide();
                            } else if (res.message == 3) {
                                if(is_bind == 1) {
                                    $('.phone-applogin .err-15').show().siblings('p').hide();
                                } else {
                                    $('.phone-register .err-15').show().siblings('p').hide();
                                }
                            } else if (res.message == 4) {
                                RegistCountDown();
                                $('.phone-register .err-3').show().siblings('p').hide();
                            } 
                        });
                    }
                }
            });
            // 点击按钮开始验证
            $(".regist-code").click(function () {
                var isDisable = $(this).attr('data-disable');
                if(isDisable != 1) {
                    obj.verify();
                } else {
                    $('.phone-applogin .err-0').show().siblings('p').hide();
                }
            });
        };
        $.ajax({
            url: "/register/verifyCode?t=" + (new Date()).getTime(), // 加随机数防止缓存
            type: "get",
            dataType: "json",
            success: function (data) {
                initGeetest({
                    gt: data.gt,
                    challenge: data.challenge,
                    new_captcha: data.new_captcha,
                    product: "bind", 
                    offline: !data.success,
                    width:'328px'
                }, VerifyCode);
            }
        });
        $('.regist-box').hide();
        $('.phone-register').show();
    });

    // 按下回车，提交表单
    $("body").keydown(function(event) {
        if (event.keyCode == "13") { //keyCode=13是回车键
            if ($('.phone-register').is(":visible")) {
                $('.phone-register .sure-success').click();
            } else if ($('.phone-approve').is(":visible")) {
                $(".phone-approve .sure-success").click();
            }
        }
    });

    // 手机号码输入框失去焦点判断格式
    $(".phone-register input[name='phone']").blur(function(){
        // 手机号未验证通过
        var res = RegistPhone($(this));
        if(!res) {
            $(this).addClass('error-border');
            $(".regist-code").removeClass('click-border').attr('data-disable',1);
        } else {
            $(".regist-code").addClass("click-border").attr("data-disable",0);
        }
    }).focus(function(){
        $('.err-0').hide();
        $('.err-1').hide();
        $('.err-2').hide();
        $(this).siblings('p').hide();
        $(this).removeClass('error-border');
    });

    // 验证手机号码格式
    function RegistPhone(){
        var obj = arguments[0] ? arguments[0] : '';
        var rePhone = /^1[3-9][0-9]{9}$/;
        if(obj) {
            var phone = obj.val();
        } else {
            var phone = $(".phone-register input[name='phone']").val();
        }
        if (!rePhone.test(phone)) {
            $('.err-1').show().siblings('p').hide();
            if(obj) obj.siblings('p').hide();
            $('.err-1').show();
            return false;
        } else {
            // 判断手机号码是否已注册
            var bol = false;
            $.ajax({
                type:'POST',
                async:false,
                url:'/user/checkLogupName',
                data:{'name':phone},
                success:function(res){
                    if (res.msg == '账户已被注册') {
                        $('.phone-register .err-2').show().siblings('p').hide();
                        bol = false;
                    } else {
                        bol = true;
                    }
                }
            })
            return bol;
        }
    }

    // 验证码输入框失去焦点判断验证码是否正确
    $(".phone-register input[name='code']").blur(function(){
        var code = $(".phone-register input[name='code']").val();
        var phone = $(".phone-register input[name='phone']").val();
        var data = {'phone':phone, 'code':code};
        if (code != '' & phone != '') {
            $.post("/register/ajaxConfirmPhoneVerifyCode", data, function(res){
                if (res.state == 0) {
                    $('.phone-register .err-4').show().siblings('p').hide();
                } else {
                    $('.phone-register .err-5').show().siblings('p').hide();
                }
            });
        }
    }).focus(function(){
        $('.phone-register .err-4').hide();
        $('.phone-register .err-14').hide();
    });
    // 密码输入框失去焦点判断密码格式是否正确
    $(".phone-register input[name='passwd']").blur(function(){
        var passwd = $(".phone-register input[name='passwd']").val();
        var reg1 = new RegExp(/^[0-9]+$/);
        var reg2 = new RegExp(/^[A-Za-z]+$/);
        if (passwd == '') return false;
        if(reg1.test(passwd) || reg2.test(passwd)){
            $('.phone-register .err-6').show().siblings('p').hide();
            return false;
        }
        if(passwd.length < 8){
            $('.phone-register .err-6').show().siblings('p').hide();
            return false;
        }
    }).focus(function(){
        $('.phone-register .err-6').hide();
    });

    // 确认密码输入框失去焦点判断两次输入密码是否一致
    $(".phone-register input[name='repasswd']").blur(function(){
        var passwd = $(".phone-register input[name='passwd']").val();
        var repasswd = $(".phone-register input[name='repasswd']").val();
        if (repasswd == '') return false;
        if(passwd != repasswd){
            $('.phone-register .err-8').show();
            return false;
        } else {
            $('.phone-register .err-9').show();
        }
    }).focus(function(){
        $('.phone-register .err-8').hide();
        $('.phone-register .err-9').hide();
    });

    // 选择用户类型
    $('.phone-register .user_type').click(function(){
        $(this).parent().find('input').click();
    });

    //手机注册点击确定
    $('.phone-register .sure-success').click(function(){
        var phone = $(".phone-register input[name='phone']").val();
        var code = $(".phone-register input[name='code']").val();
        var passwd = $(".phone-register input[name='passwd']").val();
        var user_type = $(".phone-register input[name='user_type']:checked").val();
        var obj = $(".phone-register input[name='phone']");
        if (!RegistPhone(obj) || phone == '') {
            $('.phone-register .err-1').show().siblings('p').hide();
            return false;
        }
        if (code == '') {
            $('.phone-register .err-14').show().siblings('p').hide();
            return false;
        }
        if (passwd == '') {
            $('.phone-register .err-6').show().siblings('p').hide();
            return false;
        } else {
            var reg1 = new RegExp(/^[0-9]+$/);
            var reg2 = new RegExp(/^[A-Za-z]+$/);
            if(reg1.test(passwd) || reg2.test(passwd)){
                $('.phone-register .err-6').show().siblings('p').hide();
                return false;
            }
            if(passwd.length < 8 && passwd != ''){
                $('.phone-register .err-6').show().siblings('p').hide();
                return false;
            }
        }
        var data = {'verifyCode':code, 'password':passwd,'phone':phone, 'user_type':user_type}
        $.post("/user/dologup", data, function(res){
            if( res.state ){ // 注册成功
                if( res.isinvite ) { //处理邀请
                    window.location.href = 'http://699pic.com/index/invite_success';
                } else {
                    window.location.href = res.redirect;
                }

            }else if( res.reason=='not_verify_phone' ){
                alert("没有验证码,请重新获取");
            }else if( res.reason == 'error_verify_phone' ){ // 验证码错误
                $('.phone-register .err-4').show();

            } else if( res.range == '账户已被注册'){
                $('.phone-register .err-2').show();
            } else {
                alert(res.msg);
            }
        });
    });
    // 倒计时
    function RegistCountDown() {
        $('.regist-code').attr('style', 'background:#F9F9F9;cursor:default;');
        num = 60;
        sendTimmer = setInterval(function () {
            $('.regist-code').attr('data-disable', true);
            num -= 1;
            if (num <= 0) {
                num = 60;
                clearInterval(sendTimmer);
                $('.regist-code').html('获取验证码');
                $('.regist-code').removeAttr('data-disable');
                $('.regist-code').attr('style', '');
                return;
            }
            $('.regist-code').html(num + '秒后重发');
        }, 1000);
    }
    $('.return-regist').on('click',function(){ $('.phone-register').hide();$('.regist-box').show(); });
    $('.return-login').on('click',function(){ $('.phone-applogin').hide();$(".login-box").show() });
    $(".phone-login .return-login").click(function (){ $(".phone-login").hide(); $(".login-box").show(); });
});

/* COMBO: filename = common/verify.js, type = application/javascript, resp = 200 */
/* initGeetest 1.0.0
 * 用于加载id对应的验证码库，并支持宕机模式
 * 暴露 initGeetest 进行验证码的初始化
 * 一般不需要用户进行修改
 */
;(function (global, factory) {
    "use strict";
    if (typeof module === "object" && typeof module.exports === "object") {
        // CommonJS
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("Geetest requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    "use strict";
    if (typeof window === 'undefined') {
        throw new Error('Geetest requires browser environment');
    }
    var document = window.document;
    var Math = window.Math;
    var head = document.getElementsByTagName("head")[0];

    function _Object(obj) {
        this._obj = obj;
    }

    _Object.prototype = {
        _each: function (process) {
            var _obj = this._obj;
            for (var k in _obj) {
                if (_obj.hasOwnProperty(k)) {
                    process(k, _obj[k]);
                }
            }
            return this;
        }
    };
    function Config(config) {
        var self = this;
        new _Object(config)._each(function (key, value) {
            self[key] = value;
        });
    }

    Config.prototype = {
        api_server: 'api.geetest.com',
        protocol: 'http://',
        type_path: '/gettype.php',
        fallback_config: {
            slide: {
                static_servers: ["static.geetest.com", "dn-staticdown.qbox.me"],
                type: 'slide',
                slide: '/static/js/geetest.0.0.0.js'
            },
            fullpage: {
                static_servers: ["static.geetest.com", "dn-staticdown.qbox.me"],
                type: 'fullpage',
                fullpage: '/static/js/fullpage.0.0.0.js'
            }
        },
        _get_fallback_config: function () {
            var self = this;
            if (isString(self.type)) {
                return self.fallback_config[self.type];
            } else if (self.new_captcha) {
                return self.fallback_config.fullpage;
            } else {
                return self.fallback_config.slide;
            }
        },
        _extend: function (obj) {
            var self = this;
            new _Object(obj)._each(function (key, value) {
                self[key] = value;
            })
        }
    };
    var isNumber = function (value) {
        return (typeof value === 'number');
    };
    var isString = function (value) {
        return (typeof value === 'string');
    };
    var isBoolean = function (value) {
        return (typeof value === 'boolean');
    };
    var isObject = function (value) {
        return (typeof value === 'object' && value !== null);
    };
    var isFunction = function (value) {
        return (typeof value === 'function');
    };
    var callbacks = {};
    var status = {};
    var random = function () {
        return parseInt(Math.random() * 10000) + (new Date()).valueOf();
    };
    var loadScript = function (url, cb) {
        var script = document.createElement("script");
        script.charset = "UTF-8";
        script.async = true;
        script.onerror = function () {
            cb(true);
        };
        var loaded = false;
        script.onload = script.onreadystatechange = function () {
            if (!loaded &&
                (!script.readyState ||
                "loaded" === script.readyState ||
                "complete" === script.readyState)) {

                loaded = true;
                setTimeout(function () {
                    cb(false);
                }, 0);
            }
        };
        script.src = url;
        head.appendChild(script);
    };
    var normalizeDomain = function (domain) {
        return domain.replace(/^https?:\/\/|\/$/g, '');
    };
    var normalizePath = function (path) {
        path = path.replace(/\/+/g, '/');
        if (path.indexOf('/') !== 0) {
            path = '/' + path;
        }
        return path;
    };
    var normalizeQuery = function (query) {
        if (!query) {
            return '';
        }
        var q = '?';
        new _Object(query)._each(function (key, value) {
            if (isString(value) || isNumber(value) || isBoolean(value)) {
                q = q + encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
            }
        });
        if (q === '?') {
            q = '';
        }
        return q.replace(/&$/, '');
    };
    var makeURL = function (protocol, domain, path, query) {
        domain = normalizeDomain(domain);

        var url = normalizePath(path) + normalizeQuery(query);
        if (domain) {
            url = protocol + domain + url;
        }

        return url;
    };
    var load = function (protocol, domains, path, query, cb) {
        var tryRequest = function (at) {

            var url = makeURL(protocol, domains[at], path, query);
            loadScript(url, function (err) {
                if (err) {
                    if (at >= domains.length - 1) {
                        cb(true);
                    } else {
                        tryRequest(at + 1);
                    }
                } else {
                    cb(false);
                }
            });
        };
        tryRequest(0);
    };
    var jsonp = function (domains, path, config, callback) {
        if (isObject(config.getLib)) {
            config._extend(config.getLib);
            callback(config);
            return;
        }
        if (config.offline) {
            callback(config._get_fallback_config());
            return;
        }
        var cb = "geetest_" + random();
        window[cb] = function (data) {
            if (data.status === 'success') {
                callback(data.data);
            } else if (!data.status) {
                callback(data);
            } else {
                callback(config._get_fallback_config());
            }
            window[cb] = undefined;
            try {
                delete window[cb];
            } catch (e) {
            }
        };
        load(config.protocol, domains, path, {
            gt: config.gt,
            callback: cb
        }, function (err) {
            if (err) {
                callback(config._get_fallback_config());
            }
        });
    };
    var throwError = function (errorType, config) {
        var errors = {
            networkError: '网络错误'
        };
        if (typeof config.onError === 'function') {
            config.onError(errors[errorType]);
        } else {
            throw new Error(errors[errorType]);
        }
    };
    var detect = function () {
        return !!window.Geetest;
    };
    if (detect()) {
        status.slide = "loaded";
    }
    var initGeetest = function (userConfig, callback) {
        var config = new Config(userConfig);
        if (userConfig.https) {
            config.protocol = 'https://';
        } else if (!userConfig.protocol) {
            config.protocol = window.location.protocol + '//';
        }
        jsonp([config.api_server || config.apiserver], config.type_path, config, function (newConfig) {
            var type = newConfig.type;
            var init = function () {
                config._extend(newConfig);
                callback(new window.Geetest(config));
            };
            callbacks[type] = callbacks[type] || [];
            var s = status[type] || 'init';
            if (s === 'init') {
                status[type] = 'loading';
                callbacks[type].push(init);
                load(config.protocol, newConfig.static_servers || newConfig.domains, newConfig[type] || newConfig.path, null, function (err) {
                    if (err) {
                        status[type] = 'fail';
                        throwError('networkError', config);
                    } else {
                        status[type] = 'loaded';
                        var cbs = callbacks[type];
                        for (var i = 0, len = cbs.length; i < len; i = i + 1) {
                            var cb = cbs[i];
                            if (isFunction(cb)) {
                                cb();
                            }
                        }
                        callbacks[type] = [];
                    }
                });
            } else if (s === "loaded") {
                init();
            } else if (s === "fail") {
                throwError('networkError', config);
            } else if (s === "loading") {
                callbacks[type].push(init);
            }
        });
    };
    window.initGeetest = initGeetest;
    return initGeetest;
});

