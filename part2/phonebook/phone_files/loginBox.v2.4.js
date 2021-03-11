var qqLeft = Math.floor(($(window).width() - 600) / 2);
var allTop = Math.floor(($(window).height() - 420) / 2);
var phoneTips = ['请输入手机号码', '请输入正确的手机号码', '该手机号已注册，请重新输入', '验证码已发送至你的手机，请查收', '操作过于频繁，请联系客服', '注册需低调，明天再来', '您的验证码有误，请重新输入'];
var verifyTips = ['验证码发送失败', '您的验证码有误，请重新输入', '验证码输入正确', '验证码不能为空', '验证码已发送至你的手机，请查收'];

$(window).resize(function () {
    qqLeft = Math.floor(($(window).width() - 600) / 2);
    allTop = Math.floor(($(window).height() - 420) / 2);
});
function deleteCookie (name) {
// document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
var date = new Date();
date.setTime(date.getTime()-10000); //删除一个cookie，就是将其过期时间设定为一个过去的时间
document.cookie = name + "= ' ' " + "; expires=" + date.toUTCString()+";path="+"/";
document.cookie = name + "= ' ' " + "; expires=" + date.toUTCString()+";path="+"/";
}
deleteCookie('redirect');
$.cookie('redirect', window.location.href, {path: '/', domain: '.699pic.com'});

//使二维码展现在页面当中
function wxLoginFn () {
    var protocol = window.location.protocol;
    typeof WxLogin != 'function' && appendJs('//res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js');
    var wxLoginReadyTimer =  setInterval(function () {
        if (typeof WxLogin == 'function') {
            clearInterval(wxLoginReadyTimer);
            try{
                new WxLogin({
                    self_redirect: false,
                    id: "login_container",
                    appid: "wx3fbc41a9e6a71a17",
                    scope: "snsapi_login",
                    redirect_uri: encodeURI(protocol + '//699pic.com/auth/wxcallback'),
                    state: "",
                    style: "white",
                    href: ""
                });
            } catch (e) {
                console.log(e)
            }
        }
    }, 500)
}
// 新微信登录
function wxLoginFn2 () {
    $.post('/auth/wxLoginPc',function(res){
        if(res.stutas == "success"){
            $('#login_container').html('<div style=text-align:center;margin-left:-100px;padding-top:18px><p style=text-align:center;font-size:20px;color:#fff;line-height:32px>微信登录</p><img src='+ res.wx_qrcode_url +' style=width:280px;margin-top:15px><p style=text-align:center;color:#fff;padding:13px>微信扫码关注登录</div>').show();
            wxLoginInquire(res.wx_ticket);
        }else{
            $('#login_container').html('<p style="color: #fff;font-size: 18px;line-height: 400px;">请求异常，请检查网络或联系客服人员</p>').show();
        }
    });
};
//微信登录查询
var inquireTime = '';
function wxLoginInquire(ticket){
    $.post('/auth/wxLoginPcCheck',{ticket:ticket},function(res){
        if(res.status == 2){
            window.location.href = res.data.redirectUrl;
        }else if(res.status == 1){
            $('body').toast(res.message);
        }else{
            inquireTime = setTimeout(function(){
                wxLoginInquire(ticket);
            },1000);
        };
    });

};
$('body').on('click','.close-newcomer',function(){
    clearTimeout(inquireTime);
});
function showWeixinPop () {
    wxLoginFn2();
    $('.weixin-login-wrap').show();
}

$('body').on('click', '.weixin-login-wrap .close-newcomer', function () {
    $('#login_container').hide();
    $('.weixin-login-wrap').hide();
})


var qqLeft = Math.floor(($(window).width() - 600) / 2);
var weixinLeft = Math.floor(($(window).width() - 400) / 2);
var allTop = Math.floor(($(window).height() - 520) / 2);
var flag = true;  //锁定全局只有一个倒计时

var phoneTips = ['请输入手机号码', '请输入正确的手机号码', '该手机号已注册，请重新输入', '验证码已发送至你的手机，请查收', '操作过于频繁，请联系客服', '验证码次数已达上限，请明天再来', '您的验证码有误，请重新输入'];
var verifyTips = ['验证码发送失败', '您的验证码有误，请重新输入', '验证码输入正确', '验证码不能为空', '验证码已发送至你的手机，请查收'];

var user_type = 1;
// 右下方 立即注册 点击
$('body').on('click', '.go-regist_span', function () {
    $('.contact-phone').addClass('regist-phone_new').find('>p').text('手机注册');
    $('.contact-wx p').text('微信注册');
    // $('.switch-login-passwd').hide();
    $('.contact-qq p').text('QQ注册');
    $('.contact-phone a').attr('name', 'regist_phone');
    $('.contact-wx a').attr('name', 'regist_weixin');
    $('.contact-qq a').attr('name', 'regist_qq');
    $('.go-regist').addClass('hide');
    $('.go-login').removeClass('hide');
    $('.operation-tools').show();
    $('.login-box_desc').show();
    $('.regist-area_new').addClass('hide');
    $('.login-area_new').addClass('hide');
    $('.go-login_qqwx').addClass('hide');
    $('.go-regist_qqwx').addClass('hide');
    $('.regist-text-tips').removeClass('hide');
    clearError();
});
// 右下方 立即登录 点击
$('body').on('click', '.go-login_span', function () {
    $('.contact-phone').removeClass('regist-phone_new').find('>p').text('手机登录');
    $('.contact-wx p').text('微信登录');
    $('.contact-qq p').text('QQ登录');
    $('.contact-phone a').attr('name', 'login_phone');
    // $('.switch-login-passwd').show();
    $('.contact-wx a').attr('name', 'login_weixin');
    $('.contact-qq a').attr('name', 'login_qq');
    $('.go-login').addClass('hide');
    $('.go-regist').removeClass('hide');
    $('.operation-tools').show();
    $('.login-box_desc').show();
    $('.regist-area_new').addClass('hide');
    $('.login-area_new').addClass('hide');
    $('.go-login_qqwx').addClass('hide');
    $('.go-regist_qqwx').addClass('hide');
    $('.regist-text-tips').addClass('hide');
    clearError();
});
// 顶部 验证码登录/账号密码登录 点击
$('body').on('click', '.login-area_ways span', function () {
    var oIndex = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    $('.login-area_item:eq(' + oIndex + ')').removeClass('hide').siblings().addClass('hide');
    $('.login-area_item:eq(' + oIndex + ') .js-focus-phone').focus();
    clearError();
});

// 顶部 验证码注册/账号密码注册 点击
$('body').on('click', '.regist-area_ways span', function () {
    var oIndex = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    $('.regist-area_item:eq(' + oIndex + ')').removeClass('hide').siblings().addClass('hide');
    $('.regist-area_item:eq(' + oIndex + ') .js-focus-phone').focus();
    getVerifyCode('regist' + (oIndex + 1));
    clearError();
});

// 手机登录/手机注册 按钮点击
$('body').on('click', '.contact-phone', function () {
    initContantPhone();
    if ($(this).hasClass('regist-phone_new')) {
        // 手机注册点击
        showLogupWrap();
    } else {
        // 手机登录点击
        showLoginWrap();
    }
});

// $('body').on('click', '.switch-login-passwd', function () {
//     initContantPhone();
//     $('.login-area_new').removeClass('hide');
//     $('.go-login_qqwx').removeClass('hide');
//     $('.login-area_ways span').eq(1).click();
// });

function initContantPhone () {
    $('.login-box_desc').hide();
    $('.operation-tools').hide();
    $('.login-box_logo').css('margin', '0 auto 26px');
    $('.go-login_qqwx').addClass('hide');
    $('.go-regist_qqwx').addClass('hide');
    $('.regist-text-tips').addClass('hide');
}

function showLogupWrap () {
    $('.regist-area_new').removeClass('hide');
    $('.go-regist_qqwx').removeClass('hide');
    getVerifyCode('regist1');
    $('.regist-area_item').each(function (n, ele) {
        if($(ele).css('display') == 'block') {
            $(ele).find('.js-focus-phone').focus();
        }
    });
}

function showLoginWrap () {
    $('.login-area_new').removeClass('hide');
    $('.go-login_qqwx').removeClass('hide');
    getVerifyCode('login');
    $('.login-area_item').each(function (n, ele) {
        if($(ele).css('display') == 'block') {
            $(ele).find('.js-focus-phone').focus();
        }
    });
    // $('.login-area_ways span').eq(0).click();
}

//请求极验
function getVerifyCode (type) {
    $.ajax({
        url: "/register/verifyCodeLogin?t=" + (new Date()).getTime(), // 加随机数防止缓存
        type: "get",
        dataType: "json",
        success: function (data) {
            $('.geetest_panel.geetest_wind').remove();
            initGeetest({
                gt: data.gt,
                challenge: data.challenge,
                new_captcha: data.new_captcha,
                product: "bind",
                offline: !data.success,
                width: '328px'
            }, function (data) {
                switch(type) {
                    case 'login': {
                        handleCodercoderLoginClick(data);
                        break;
                    }
                    case 'regist1': {
                        handleCodercoderRegister1Click(data);
                        break;
                    }
                    case 'regist2': {
                        handleCodercoderRegister2Click(data);
                        break;
                    }
                }
            })
        }
    })
};

//ajaxSendPhoneVerifyCode回调处理
function callbackCodeResponse (res, cName) {
    $(cName).find('.error-verify').hide().css('opacity', 0);
    console.log(res);
    switch(res.message) {
        case 1: {
            $(cName).find('.error-verify').html('<span style="color: #f00;">' + phoneTips[5] + '</span>').show().animate({'opacity': 1});
            break;
        }
        case 2: {
            $(cName).find('.error-verify').html('<span style="color: #f00;">' + phoneTips[4] + '</span>').show().animate({'opacity': 1});
            break;
        }
        case 3: {
            $(cName).find('.error-verify').html('<span style="color: #f00;">' + phoneTips[0] + '</span>').show().animate({'opacity': 1});
            break;
        }
        case 4: {
            myNewSendCodeCountdown('.js-get-verify-btn');
            $(cName).find('.error-verify').html('<i class="tip-icon success-icon iconfont"></i>' + verifyTips[4]).show().animate({'opacity': 1});
            break;
        }
        default: {
            alert(res.message.msg);
        }
    }
}

function clearError () {
    $('.error-phone').hide().css('opacity', 0);
    $('.error-verify').hide().css('opacity', 0);
    $('.error-passwd').hide().css('opacity', 0);
}

function captchaCallback (captchaObj, cName) {
    captchaObj.onReady(function () {
        $("#wait").hide();
    }).onSuccess(function () {
        var result = captchaObj.getValidate();
        if (!result) {return alert('请完成验证')}
        var tempData = {
            geetest_challenge: result.geetest_challenge,
            geetest_validate: result.geetest_validate,
            geetest_seccode: result.geetest_seccode,
            is_bind: 1
        }
        tempData.phone = $(cName).find('.js-input-phone').val();
        $.post("/register/ajaxSendPhoneVerifyCode", tempData, function (res) {
            callbackCodeResponse(res, cName);
        });

    });

    $('.js-get-verify-btn').click(function () {
        if ($(this).hasClass('disabled')) return;
        captchaObj.verify();
    });
}

// 极验-手机注册回调
function handleCodercoderRegister1Click (captchaObj) {
    captchaCallback(captchaObj, '.regist-area_item-phone');
}

// 极验-用户名注册回调
function handleCodercoderRegister2Click(captchaObj) {
    captchaCallback(captchaObj, '.regist-area_item-passwd');
}

// 极验-手机登录回调
function handleCodercoderLoginClick (captchaObj) {
    captchaCallback(captchaObj, '.login-area_item-phone');
}

// 倒计时
var num = 60;
function myNewSendCodeCountdown(cName) {
    if(!flag) return;
    $(cName).addClass('disabled');
    $(cName).attr('cantUse', true);
    flag = false;
    var sendTimmer = setInterval(function () {
        num -= 1;
        if (num <= 0) {
            num = 60;
            clearInterval(sendTimmer);
            flag = true;
            $(cName).attr('cantUse', null);
            $(cName).html("获取验证码").removeClass('disabled').removeClass('counting-style');
            return;
        }
        $(cName).html(num + "s 后重新获取");
    }, 1000);
}

//判断手机号码
function isPhone(phone) {
    return /^1[3-9]\d{9}$/.test(phone);
}

// 左下方微信/QQ登录 登录按钮点击
$('body').on('click', '.go-login_qqwx', function () {
    $('.go-login_span').eq(0).click();
});
// 左下方微信/QQ登录 注册按钮点击
$('body').on('click', '.go-regist_qqwx', function () {
    $('.go-regist_span').eq(0).click();
});

//手机号码登录 login-area_item-phone
$('body').on('blur', '.login-area_item-phone .js-input-phone', function (){
    var phone = $(this).val();
    if(!phone) {
        $('.login-area_item-phone').find('.error-phone').html('<span style="color: #f00;">'+ phoneTips[0] +'</span>').show().animate({'opacity': 1});
        $('.login-area_item-phone').find('.js-get-verify-btn').addClass('disabled');
        return;
    };
    if(!isPhone(phone)) {
        $('.login-area_item-phone').find('.error-phone').html('<span style="color: #f00;">'+ phoneTips[1] +'</span>').show().animate({'opacity': 1});
        $('.login-area_item-phone').find('.js-get-verify-btn').addClass('disabled');
        return;
    };
    $('.login-area_item-phone').find('.error-phone').hide().css('opacity', 0);
    if($(this).parent().find('.js-get-verify-btn').attr('cantUse') == 'true') return;
    $('.login-area_item-phone').find('.js-get-verify-btn').removeClass('disabled');
});

$('body').on('keyup', '.login-area_item-phone .js-input-phone', function (){
    var phone = $(this).val();
    if(isPhone(phone) && $(this).parent().find('.js-get-verify-btn').attr('cantUse') != 'true') {
        $('.login-area_item-phone').find('.js-get-verify-btn').removeClass('disabled');
    }else{
        $('.login-area_item-phone').find('.js-get-verify-btn').addClass('disabled');
    };
});

$('body').on('blur', '.login-area_item-phone .js-area-code', function (){
    var code = $(this).val();
    var phoneErr = $('.login-area_item-phone').find('.error-phone').css('display');
    if(phoneErr == 'block') return;
    if(!code) {
        $('.login-area_item-phone').find('.error-verify').html('<span style="color: #f00;">'+ verifyTips[3] +'</span>').show().animate({'opacity': 1});
        return;
    }
    $('.login-area_item-phone').find('.error-verify').hide().css('opacity', 0);
});

$('body').on('click', '.login-area_item-phone .js-btn-submit', function () {
    clearError();
    var phone = $('.login-area_item-phone .js-input-phone').val();
    var code = $('.login-area_item-phone .js-area-code').val();
    if(!phone) {
        $('.login-area_item-phone').find('.error-phone').html('<span style="color: #f00;">'+ phoneTips[0] +'</span>').show().animate({'opacity': 1});
        $('.login-area_item-phone').find('.js-get-verify-btn').addClass('disabled');
        return;
    };
    if(!isPhone(phone)) {
        $('.login-area_item-phone').find('.error-phone').html('<span style="color: #f00;">'+ phoneTips[1] +'</span>').show().animate({'opacity': 1});
        $('.login-area_item-phone').find('.js-get-verify-btn').addClass('disabled');
        return;
    };
    if(!code) {
        $('.login-area_item-phone').find('.error-verify').html('<span style="color: #f00;">'+ verifyTips[3] +'</span>').show().animate({'opacity': 1});
        return;
    }
    $.post("/auth/verifyCodeLogin", {'phone':phone, 'code':code}, function(res){
        clearError();
        if (res.state == 0) {
            if(res.message == '您输入的验证码有误') {
                $('.login-area_item-phone .error-verify').html('<span style="color: #f00;">您输入的验证码有误</span>').show().animate({'opacity': 1});
            }
            // alert(res.message);
        }else if (res.state == 1) {
            //localStorage.setItem('isRegist', 'true');
            location.reload(); //注册成功
        } else {
            location.reload(); //登录成功
        }
    });

})


//账号密码登录 login-area_item-passwd
$('body').on('blur', '.login-area_item-passwd .login-area_account', function (){
    var account = $(this).val();
    if(!account) {
        $('.login-area_item-passwd').find('.error-phone').html('<span style="color: #f00;">手机号码和邮箱不能为空</span>').show().animate({'opacity': 1});
        return;
    };
    $('.login-area_item-passwd').find('.error-phone').hide().css('opacity', 0);
});

$('body').on('blur', '.login-area_item-passwd .login-area_pwd', function (){
    var passwd = $(this).val();
    var phoneErr = $('.login-area_item-passwd').find('.error-phone').css('display');
    if(phoneErr == 'block') return;
    if(!passwd) {
        $('.login-area_item-passwd').find('.error-passwd').html('<span style="color: #f00;">密码不能为空</span>').show().animate({'opacity': 1});
        return;
    }
    $('.login-area_item-passwd').find('.error-passwd').hide().css('opacity', 0);
});

$('body').on('click', '.login-area_item-passwd .js-btn-submit', function () {
    clearError();
    var account = $('.login-area_item-passwd .login-area_account').val();
    var passwd = $('.login-area_item-passwd .login-area_pwd').val();
    if(!account) {
        $('.login-area_item-passwd').find('.error-phone').html('<span style="color: #f00;">手机号码和邮箱不能为空</span>').show().animate({'opacity': 1});
        return;
    };
    if(!passwd) {
        $('.login-area_item-passwd').find('.error-passwd').html('<span style="color: #f00;">密码不能为空</span>').show().animate({'opacity': 1});
        return;
    }
    $.post('/auth/dologin', {'name':account, 'passwd':passwd}, function(res){
        clearError();
        if(res.state) {
            location.reload();
        }else{
            if(res.msg == '用户不存在') {
                $('.login-area_item-passwd').find('.error-phone').html('<span style="color: #f00;">用户不存在</span>').show().animate({'opacity': 1});
            }else if(res.msg == '请输入正确的手机号码') {
                $('.login-area_item-passwd').find('.error-phone').html('<span style="color: #f00;">请输入正确的手机号码或邮箱</span>').show().animate({'opacity': 1});
            }else if(res.msg == '您输入的手机号码或密码有误') {
                $('.login-area_item-passwd').find('.error-phone').html('<span style="color: #f00;">您输入的手机号码或密码有误</span>').show().animate({'opacity': 1});
            }
        }
    });
});


//手机号码注册 regist-area_item-phone
$('body').on('blur', '.regist-area_item-phone .js-input-phone', function (){
    var phone = $(this).val();
    if(!phone) {
        $('.regist-area_item-phone').find('.error-phone').html('<span style="color: #f00;">'+ phoneTips[0] +'</span>').show().animate({'opacity': 1});
        $('.regist-area_item-phone').find('.js-get-verify-btn').addClass('disabled');
        return;
    };
    if(!isPhone(phone)) {
        $('.regist-area_item-phone').find('.error-phone').html('<span style="color: #f00;">'+ phoneTips[1] +'</span>').show().animate({'opacity': 1});
        $('.regist-area_item-phone').find('.js-get-verify-btn').addClass('disabled');
        return;
    };
    $('.regist-area_item-phone').find('.error-phone').hide().css('opacity', 0);
    if($(this).parent().find('.js-get-verify-btn').attr('cantUse') == 'true') return;
    $('.regist-area_item-phone').find('.js-get-verify-btn').removeClass('disabled');
});

$('body').on('keyup', '.regist-area_item-phone .js-input-phone', function (){
    var phone = $(this).val();
    if(isPhone(phone) && $(this).parent().find('.js-get-verify-btn').attr('cantUse') != 'true') {
        $('.regist-area_item-phone').find('.js-get-verify-btn').removeClass('disabled');
    }else{
        $('.regist-area_item-phone').find('.js-get-verify-btn').addClass('disabled');
    };
});

$('body').on('blur', '.regist-area_item-phone .js-area-code', function (){
    var code = $(this).val();
    var phoneErr = $('.regist-area_item-phone').find('.error-phone').css('display');
    if(phoneErr == 'block') return;
    if(!code) {
        $('.regist-area_item-phone').find('.error-verify').html('<span style="color: #f00;">'+ verifyTips[3] +'</span>').show().animate({'opacity': 1});
        return;
    }
    $('.regist-area_item-phone').find('.error-verify').hide().css('opacity', 0);
});

$('body').on('click', '.regist-area_item-phone .js-btn-submit', function () {
    clearError();
    var phone = $('.regist-area_item-phone .js-input-phone').val();
    var code = $('.regist-area_item-phone .js-area-code').val();
    if(!phone) {
        $('.regist-area_item-phone').find('.error-phone').html('<span style="color: #f00;">'+ phoneTips[0] +'</span>').show().animate({'opacity': 1});
        $('.regist-area_item-phone').find('.js-get-verify-btn').addClass('disabled');
        return;
    };
    if(!isPhone(phone)) {
        $('.regist-area_item-phone').find('.error-phone').html('<span style="color: #f00;">'+ phoneTips[1] +'</span>').show().animate({'opacity': 1});
        $('.regist-area_item-phone').find('.js-get-verify-btn').addClass('disabled');
        return;
    };
    if(!code) {
        $('.regist-area_item-phone').find('.error-verify').html('<span style="color: #f00;">'+ verifyTips[3] +'</span>').show().animate({'opacity': 1});
        return;
    }
    $.post("/auth/verifyCodeLogin", {'phone':phone, 'code':code}, function(res){
        clearError();
        if (res.state == 0) {
            if(res.message == '您输入的验证码有误') {
                $('.regist-area_item-phone .error-verify').html('<span style="color: #f00;">您输入的验证码有误</span>').show().animate({'opacity': 1});
            }
            // alert(res.message);
        }else if (res.state == 1) {
            //localStorage.setItem('isRegist', 'true');
            location.reload(); //注册成功
        } else {
            location.reload(); //登录成功
        }
    });
})

//账号密码注册 regist-area_item-passwd
$('body').on('blur', '.regist-area_item-passwd .js-input-phone', function (){
    var phone = $(this).val();
    if(!phone) {
        $('.regist-area_item-passwd').find('.error-phone').html('<span style="color: #f00;">'+ phoneTips[0] +'</span>').show().animate({'opacity': 1});
        $('.regist-area_item-passwd').find('.js-get-verify-btn').addClass('disabled');
        return;
    };
    if(!isPhone(phone)) {
        $('.regist-area_item-passwd').find('.error-phone').html('<span style="color: #f00;">'+ phoneTips[1] +'</span>').show().animate({'opacity': 1});
        $('.regist-area_item-passwd').find('.js-get-verify-btn').addClass('disabled');
        return;
    };
    $('.regist-area_item-passwd').find('.error-phone').hide().css('opacity', 0);
    if($(this).parent().find('.js-get-verify-btn').attr('cantUse') == 'true') return;
    $('.regist-area_item-passwd').find('.js-get-verify-btn').removeClass('disabled');
});

$('body').on('keyup', '.regist-area_item-passwd .js-input-phone', function (){
    var phone = $(this).val();
    if(isPhone(phone) && $(this).parent().find('.js-get-verify-btn').attr('cantUse') != 'true') {
        $('.regist-area_item-passwd').find('.js-get-verify-btn').removeClass('disabled');
    }else{
        $('.regist-area_item-passwd').find('.js-get-verify-btn').addClass('disabled');
    };
});

$('body').on('blur', '.regist-area_item-passwd .js-area-code', function (){
    var code = $(this).val();
    var phoneErr = $('.regist-area_item-passwd').find('.error-phone').css('display');
    if(phoneErr == 'block') return;
    if(!code) {
        $('.regist-area_item-passwd').find('.error-verify').html('<span style="color: #f00;">'+ verifyTips[3] +'</span>').show().animate({'opacity': 1});
        return;
    }
    $('.regist-area_item-passwd').find('.error-verify').hide().css('opacity', 0);
});

$('body').on('blur', '.regist-area_item-passwd .regist-area_pwd', function (){
    var passwd = $(this).val();
    var re = /^(?=.*?[0-9])(?=.*?[a-zA-Z])[0-9a-zA-Z]{8,20}$/;
    var phoneErr = $('.regist-area_item-passwd').find('.error-phone').css('display');
    var codeErr = $('.regist-area_item-passwd').find('.error-verify').css('display');
    if(phoneErr == 'block' || codeErr == 'block') return;
    if(!$('.regist-area_item-passwd').find('.js-area-code').val()) {
        $('.regist-area_item-passwd').find('.error-verify').html('<span style="color: #f00;">验证码不能为空</span>').show().animate({'opacity': 1});
        return;
    }
    if(!passwd) {
        $('.regist-area_item-passwd').find('.error-passwd').html('<span style="color: #f00;">密码不能为空</span>').show().animate({'opacity': 1});
        return;
    }
    if(!re.test(passwd)) {
        $('.regist-area_item-passwd').find('.error-passwd').html('<span style="color: #f00;">密码必须包含数字和字母，8-20位，不允许特殊字符</span>').show().animate({'opacity': 1});
        return;
    }
    $('.regist-area_item-passwd').find('.error-passwd').hide().css('opacity', 0);
});

$('body').on('click', '.regist-area_item-passwd .js-btn-submit', function () {
    clearError();
    var re = /^(?=.*?[0-9])(?=.*?[a-zA-Z])[0-9a-zA-Z]{8,20}$/;
    var phone = $('.regist-area_item-passwd .js-input-phone').val();
    var code = $('.regist-area_item-passwd .js-area-code').val();
    var passwd = $('.regist-area_item-passwd .js-area-pwd').val();
    if(!phone) {
        $('.regist-area_item-passwd').find('.error-phone').html('<span style="color: #f00;">'+ phoneTips[0] +'</span>').show().animate({'opacity': 1});
        return;
    };
    if(!isPhone(phone)) {
        $('.regist-area_item-passwd').find('.error-phone').html('<span style="color: #f00;">'+ phoneTips[1] +'</span>').show().animate({'opacity': 1});
        return;
    };
    if(!code) {
        $('.regist-area_item-passwd').find('.error-verify').html('<span style="color: #f00;">'+ verifyTips[3] +'</span>').show().animate({'opacity': 1});
        return;
    }
    if(!passwd) {
        $('.regist-area_item-passwd').find('.error-passwd').html('<span style="color: #f00;">密码不能为空</span>').show().animate({'opacity': 1});
        return;
    }

    if(!re.test(passwd)) {
        $('.regist-area_item-passwd').find('.error-passwd').html('<span style="color: #f00;">密码必须包含数字和字母，8-20位，不允许特殊字符</span>').show().animate({'opacity': 1});
        return;
    }

    $.post("/user/dologup", {'verifyCode':code, 'password':passwd,'phone':phone, 'user_type': 2}, function(res){
        clearError();
        if( res.state ){ // 注册成功
            localStorage.setItem('isRegist', 'true');
            if( res.isinvite ) { //处理邀请
                window.location.href = '//699pic.com/index/invite_success';
            } else {
                window.location.href = res.redirect;
            }
        }else if(res.msg == '账户已被注册'){
            $('.regist-area_item-passwd').find('.error-phone').html('<span style="color: #f00;">' + phoneTips[2] + '</span>').show().animate({'opacity': 1});
        }else if( res.reason=='not_verify_phone' ){
            alert("没有验证码,请重新获取");
        }else if( res.reason == 'error_verify_phone' ){ // 验证码错误
            $('.regist-area_item-passwd').find('.error-verify').html('<span style="color: #f00;">' + verifyTips[1] ).show().animate({'opacity': 1});

        } else if( res.range == '账户已被注册'){
            $('.regist-area_item-passwd').find('.error-phone').html('<span style="color: #f00;">' + phoneTips[2]).show().animate({'opacity': 1});
        } else {
            alert(res.msg);
        }
    });

})

$('body').on('keydown', '.login-area_item', function (e) {
    if(e.keyCode == '13') {
        $(this).find('.js-btn-submit').click();
    }
});

$('body').on('keydown', '.regist-area_item', function (e) {
    if(e.keyCode == '13') {
        $(this).find('.js-btn-submit').click();
    }
});

$('body').on('keydown', '.login-box_r input[type="text"]', function (e) {
    if (event.keyCode == "8") {
        $(this).parent().find('.error-phone').hide().css('opacity', 0);
        $(this).parent().find('.error-verify').hide().css('opacity', 0);
        $(this).parent().find('.error-passwd').hide().css('opacity', 0);
    }
})

$('body').on('keydown', '.login-box_r input[type="number"]', function (e) {
    if (event.keyCode == "8") {
        $(this).parent().parent().find('.error-phone').hide().css('opacity', 0);
        $(this).parent().parent().find('.error-verify').hide().css('opacity', 0);
        $(this).parent().parent().find('.error-passwd').hide().css('opacity', 0);
    }
})

$('body').on('keydown', '.login-box_r input[type="password"]', function (e) {
    if (event.keyCode == "8") {
        $(this).parent().parent().find('.error-phone').hide().css('opacity', 0);
        $(this).parent().parent().find('.error-verify').hide().css('opacity', 0);
        $(this).parent().parent().find('.error-passwd').hide().css('opacity', 0);
    }
})

// 新登录弹框点击关闭
$('body').on('click', '.login-box_close', function () {
    $('#login-box_home').hide();
    $('#new-login-mask').hide();
    clearError();
});
// 判断qq浏览器替换qq登录
if(navigator.userAgent.toLowerCase().indexOf('qqbrowser') != -1){
    $('.contact-qq>a').removeAttr('onclick').attr('href','/?s=/Home/Auth/qqLogin');
}

// typeof SpCusCookie
if(typeof SpCusCookie != "object"){
    var SpCusCookie = {
        setCookie: function (name, value, days, isZero) {
            var date = new Date(),
                expires = "",
                days = Number(days);
            if (days) {
                if(isZero) {
                    var curTemp = date.getTime();
                    var curWeekHours = new Date(date.toLocaleDateString()).getTime() - 1;
                    var passedTimeStamp = curTemp - curWeekHours;
                    var leftTimeStamp = 24 * 60 * 60 * 1000 - passedTimeStamp;
                    var leftTime = new Date();
                    leftTime.setTime(leftTimeStamp + curTemp + (days-1) * 24 * 60 * 60 * 1000);
                    expires = "; expires="+leftTime.toGMTString();
                } else {
                    date.setTime(date.getTime()+(days*24*60*60*1000));
                    expires = "; expires="+date.toGMTString();
                }
            }
            document.cookie = name+"="+value+expires+"; path=/";
        },
        getCookie: function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1,c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
            }
            return null;
        },
        deleteCookie: function (name) {
            // document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
            var date = new Date();
            date.setTime(date.getTime()-10000); //删除一个cookie，就是将其过期时间设定为一个过去的时间
            document.cookie = name + "= ' ' " + "; expires=" + date.toUTCString()+";path="+"/";
            document.cookie = name + "= ' ' " + "; expires=" + date.toUTCString()+";path="+"/";
        }
    }
}
/* 上次登录 */
$('body').on('click', '.operation-tool,.new-phone-btn', function() {
    var lastTimeName = 'new-phone-btn'
    if($(this).hasClass('contact-qq')){
        lastTimeName='contact-qq';
    }else if($(this).hasClass('contact-wx')){
        lastTimeName='contact-wx';
    }
    SpCusCookie.setCookie('lastTime', lastTimeName, 15, 1);
});
var lastTime = SpCusCookie.getCookie('lastTime');
if(lastTime){
    $('.'+lastTime).append('<div class="lastTime">（上次登录）</div>');
};