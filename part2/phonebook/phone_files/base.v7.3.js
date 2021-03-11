$(function(){

    if( !window.env ) window.env = {};
    window.env.site = '//699pic.com';
    try{ //相册
        var isTruncate = true;
        if( env['notTruncate'] ) isTruncate = false;
        $('.swipeboxEx').flexImages({'rowHeight':300,'container':'.list','truncate':isTruncate });
    }catch(err){}
    try{ //延迟加载
        $(".imgshow,.islazy").find("img.lazy").lazyload({
            threshold :350
        });
    }catch(err){}

    // 弹窗
    var loadedAlert = {};
    function doAlert(path,data){
        console.log(loadedAlert[path]);
        if( loadedAlert[path] ){
            eval(loadedAlert[path].run)
            return;
        }
        $.post(path,data,function( response ){
            if( response.state ){
                loadedAlert[path] = response;
                $(response.doc).appendTo('body');
                eval(response.run);
            }else{

            }
        })
    }
    window.env.doAlert = doAlert;

    function doAlertNoCache(path,data){
        $.post(path,data,function( response ){
            if( response.state ){
                $(document).find('.faceCen,.alert-bg').remove();
                $(response.doc).appendTo('body');
                eval(response.run);
            }else{
            }
        })
    }
    window.env.doAlertNoCache = doAlertNoCache;

/**个人vip提醒start**/
 if(CONFIG['isLogin']==1 && CONFIG['vip_type']>0 && CONFIG['vip_type']!=3 && CONFIG['user_type']==2 && CONFIG['isfirsttan']==1 )
  {
      var timeend = CONFIG['vip_end']-load_data.start_time/1000;
      if(timeend>=864000){
          var type=88;
      }else{
          var type=99;
      }

      $(window).load(function () {
            doAlert('/download/downloadLimit', {type:type})
      })
  }
/**个人vip提醒end**/

/**右侧栏*start**/
 if(CONFIG['isLogin']==1 && CONFIG['vip_type']==0 && CONFIG['isviptan']==1)
{
    $(window).load(function () {
        $('.fixed-send-vip').show();
        if (CONFIG['isdiyici']== 1)
        {
            $('.fixed-send-vip').addClass('normal-opened');
        }
    });
}
/**右侧栏end******************************/

    /*图片用途填写*/
    $('.fixed-send-vip').hover(function(){
        $(this).addClass('hover-opened');
        $(this).removeClass('normal-opened');
    },function(){
        $(this).removeClass('hover-opend');
    });

  //点击回到顶部的元素
    $("#fixed-box .gotop").click(function(e) {
        $('body,html').animate({scrollTop:0},500);
    });

    //公用弹窗公用关闭
    $('.stPublic-win .closeBtn').on('click',function () {
        $('.stPublic-win').fadeOut();
    });

    //意见反馈弹窗弹出激活
    $('#fixed-box .ideawin').on('click',function () {
        $("#feedback-win").fadeIn();
    });

    $('.subMit-btn').off('click');
    $('.subMit-btn').click(function(){
            var content = $('.iwm-cont textarea').val();
            var qq = $(".iwm-cont input[name='qq']").val();
            var email = $(".iwm-cont input[name='email']").val();

            if (content == "") {
                alert("请输入内容");
                return false;
            } else if (qq == "") {
                alert("请输入QQ号码");
                return false;
            }

            if (!/^[0-9]{5,11}$/.test(qq)) {
                alert('QQ格式不正确!');
                return false;
            }

            if (email != '' && !/^([a-zA-Z0-9]{1,20})(([\_\-\.])?([a-zA-Z0-9]{1,20}))*@([a-zA-Z0-9]{1,20})(([\-\_])?([a-zA-Z0-9]{1,20}))*(\.[a-z]{2,4}){1,2}$/.test(email)) {
                alert('邮箱格式不正确!');
                return false;
            }

            $.ajax({
                type:'post',
                url:"//ajax.699pic.com/index.php?m=Statistics&c=Idea&a=addIdea",
                data:{content:content, qq:qq, email:email},
                success:function(data){
                    if (data.state == 1) {
                        $(".subMit-btn").html("提交成功");
                        $(".stPublic-win").animate({
                            opacity: "hide"
                        }, "slow");
                    }
                }
            })

        })


    //回到顶部元素的渐显与渐隐
    $(window).scroll(function(e) {
        //若滚动条离顶部大于100元素
        if($(window).scrollTop()>100){
            $('#fixed-box .ideawin').css('borderBottom','none')
            $("#fixed-box .gotop").css('visibility','visible').animate({
                opacity:'1'
            },200);
        }else{
            $("#fixed-box .gotop").css('visibility','hidden').animate({
                opacity:'0'
            },200);
            $('#fixed-box .ideawin').css('borderBottom','1px solid #dedede')
        }

    });
/**右侧栏*end**/

    //	登录
    function login(){
        $('.go-login_span').eq(0).click();
        $('#login-box_home').fadeIn();
        $('#new-login-mask').show();
    }
    window.env.login = login;
    //注册
    function logup() {
        $('.go-regist_span').eq(0).click();
        $('#login-box_home').fadeIn();
        $('#new-login-mask').show();
    }
    window.env.logup = logup;

    function qqlogin(){ window.open("//699pic.com/?s=/Home/Auth/qqLogin","","width=750, height=500, top=50, left=50"); }
    window.env.qqlogin = qqlogin;

    // 登录注册弹窗，由异步加载修改为同步加载  update by 黄芳阳 time：2017-4-7
    $('#header .login .register').on('click',function(){ logup() });
    $('#header .login .in').on('click',function(){ login(); });

    function downloadPhoto( pid ){
        if( !env.isLogin ){
            env.login();
            return;
        }
        $.post('/download/getDownloadUrl',{ 'pid':pid },function(res){
            if( res.state==true ){
                $('<iframe style="display:none;"/>').appendTo('html').attr('src',res.url);
                if (window.env.firstLogin == true) { // 第一次下载，提示收藏
                    $(".bgimg, .prompt").show();

                }
                downloadStat(res.stat);
            }else if(res.state == '-1'){
                doAlertNoCache('/download/downloadLimit',{type:res.type});
                downloadStat(res.stat);
            }else if(res.state == '-2'){
                doAlert('/download/userSurvey');
            }else if(res.state == '-3'){
                doAlertNoCache('/download/hangDownload',{l:res.type});
            }else if(res.state == '-11'){
                doAlertNoCache('/alert/uniqueLogout');
            }else if(res.state == '-12'){
                env.login();
            }else if(res.state == '10'){
                $('body').append(res.doc);
            }
        });

    }

    window.env.downloadPhoto = downloadPhoto;
    function searchDownloadPhoto(pid, sid, page){
        if( !env.isLogin ){
            env.login();
            return;
        }
        var data = {'pid':pid, 'sid':sid, 'page':page};
        if (env.isShitu != void 0 && env.isShitu == '1') {
            data['byshitu'] = 1;
        }
        $.post('/download/getDownloadUrl', data, function(res){
            if( res.state==true ){
                $('<iframe style="display:none;"/>').appendTo('html').attr('src',res.url);
                if (window.env.firstLogin == true) { // 第一次下载，提示收藏
                    $(".bgimg, .prompt").show();
                }
                downloadStat(res.stat);
            }else if(res.state == '-1'){
				if(res.stat.is_bangong == 1){
                    doAlertNoCache('/download/downloadLimit',{type:res.type});
                    downloadStat(res.stat);
				}
            }else if(res.state == '-2'){
                doAlert('/download/userSurvey');
            }else if(res.state == '-3'){
                doAlertNoCache('/download/hangDownload',{l:res.type});
            }else if(res.state == '-11'){
                doAlertNoCache('/alert/uniqueLogout');
            }else if(res.state == '-12'){
                env.login();
            }else if(res.state == '10'){
                $('body').append(res.doc);
            }
        });
    }
    function toDetail(pid, sid, page) {
        var storage   = window.localStorage;
        var myDate    = new Date();
        var todayDate = myDate.toLocaleDateString();
        storage.pspt  = pid + '_' + sid + '_' + page + '_' + todayDate;
    }

    window.env.downloadPhoto = downloadPhoto;
    window.env.searchDownloadPhoto = searchDownloadPhoto;
    window.env.toDetail = toDetail;


    //发送异步请求到ajax服务器统计下载次数
    function downloadStat (data) {
        $.ajax({
            type: "get",
            url: '//ajax.699pic.com/?c=Ajax&a=downStat',
            jsonp: "getStatCookie",
            data:data,
            dataType: "jsonp",
            success: function (data) {}
        })

    }
    window.env.downloadStat;

// 注册
    $(".login .register").click(function(){
        $("#alert-action").show();
        $(".alert-action-m .feet .reg").hide();
    });

    $(".alert-action-m .close,.alert-action-bg").click(function(){
        $("#alert-action").hide();
    });

//点击回到顶部的元素
    $("#gotop").click(function(e) {
        $('body,html').animate({scrollTop:0},500);
    });

//实现回到顶部元素的渐显与渐隐
    $(window).scroll(function(e) {
        //若滚动条离顶部大于100元素
        if($(window).scrollTop()>100)
            $("#gotop").fadeIn(200);
        else
            $("#gotop").fadeOut(200);
    });

    $(".sea-nav .row-r .wap-touch").click(function(){
        var seah = $(".sea-nav .row-m").height();
        if (seah > 50) {
            $(".sea-nav .row-m").css("height","36px");
            $(".sea-nav .row-r").addClass("on");
        }else{
            $(".sea-nav .row-r").removeClass("on");
            $(".sea-nav .row-m").css("height","auto");
        }

    });






    var param = {};
    function doFilte(){
        var params = [];
        for( var i in param ){
            params.push( i+'='+param[i] );
        }
        params = params.join('&');
        // console.log(params);
        location.href = location.href.split('?')[0]+'?'+params
    }
    var paramstr = location.href.split('?')[1];
    if( paramstr ){
        params = paramstr.split('&');
        for( var i=0; i<params.length; i++ ){
            var kv = params[i].split('=');
            param[kv[0]] = kv[1];
        }
    }

    $(".filter .filter-order a").on('click',function(){
        $(this).siblings().removeClass('on').end().addClass('on');
        var filter = $(this).attr('data-filter');
        param['order'] = filter;
        doFilte();
    })
    $(".filter .filter-direction a").on('click',function(){
        $(this).siblings().removeClass('on').end().addClass('on');
        var filter = $(this).attr('data-filter');
        param['direction'] = filter;
        doFilte();
    })
    $(".filter .filter-size").on('submit',function(){
        var w = $(this).find('[name="width"]').val()
        var h = $(this).find('[name="height"]').val()
        param['size-w'] = w;
        param['size-h'] = h;
        doFilte();
        return false;
    })
    $(".filter .filter-color a").on('click',function(){
        var color = $(this).attr('class');
        param['color'] = color;
        doFilte();
        return false;
    })
// filter end

// 打开收藏
    var setHide = '';
    var collectLimit = false;   // 限制标志
    var userCollectPid = '';
    var key;
    $(document).on("click", ".shoucang, .imgshow .collect-one", function(){
        if (!env.isLogin) {
            env.login();
            return;
        }
        // 获取用户收藏图片的PID
        userCollectPid = $(this).attr('data-pid') || env.pid;

        var list = $(this);
        if(list.hasClass('yet')) return ;

        key  = CONFIG['uid']+'_user_is_collect_'+userCollectPid;
        //if (window.localStorage && localStorage.getItem(key) == '1') {
        //    return ;
        //} else if (list.hasClass('yet')) {
        //    return ;
        //}
        if (list.hasClass('yet')) {
            return ;
        }
        // 已收藏的图片提示，收藏成功
        $.ajax({
            type : 'get',
            url  : '/my/getNewMyCollectInfo',
            data : 'option=getNewCollectGroup&pid=' + userCollectPid,
            success: function(res){
                if (res.state == '-11') {
                    doAlertNoCache('/alert/uniqueLogout');
                } else if (res.state == '-12') {
                    env.login();
                } else if(res.state == '10'){
                    $('body').append(res.doc);
                } else {
                    key  = CONFIG['uid']+'_user_is_collect_'+userCollectPid;
                    $(".freedownload-collectbtn").removeClass("shoucang").addClass("quitColl collectioned");
                    // 用户已经收藏过该图片
                    if (res.isCollect == true) {
                        list.parents(".list").css("overflow", "initial");
                        list.prev(".show").show();
                        return;
                    }
                    // 用户没有收藏过该图片
                    if (res.limit) {
                        if (collectLimit == false) {
                            $("body").append(res.limit);
                        }
                        collectLimit = true;        // 表示弹窗加载到页面
                        eval(res.run);
                    } else {
                        if(!$(".zhezhao").is(":visible")){
                            $('.copy-tips,.collect-onePop,.zhezhao').remove();
                            list.addClass('yet');
                            $("body").append(res.html);
                            $('#collect_pid').val(res.pid);
                            $(".shou_cang").show();
                            $(".zhezhao").show();
                        }
                    }
                }

            }
        })
    });
// 当鼠标离开图片后，overflow属性回复
    $(document).on("mouseleave", ".imgshow .list", function(){
        $(this).css('overflow', 'hidden');
        $(".imgshow .list .collect-icon .show").hide();
    })
// 添加收藏分类
    function sendAjax(){
        var name = $(".add_group input.text").val();
        // 判断用户输入的正则
        var reg = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$/;
        if (name == '' || !reg.test(name)) {
            $(".add_group input.text").val("");
            $(".add_group input.text").attr("placeholder", "收藏分类名称格式错误");
            setPlace = setTimeout(function(){
                $(".add_group input.text").attr("placeholder", "快速新建收藏分类");
            }, 2000);
        } else {
            // 如果重复抛出异常，没有重复添加元素
            try{
                $(".sel ul li").each(function(){
                    var oldGroup = $(this).html();
                    if (oldGroup == name) {
                        throw '分类名称有重复';
                    }
                });
                // 没有重复，ajax添加新的收藏分类
                $.ajax({
                    type : 'get',
                    url  : '/my/addNewCollectGroup',
                    data : 'name=' + name,
                    success: function(res){
                        $(".sel ul li[data-gid='0']").after("<li data-gid='" + res.id + "'>" + res.name + "</li>");
                        $(".add_group input.text").val("");
                        $(".add_group input.text").attr("placeholder", "分类创建完成，点击分组即可收藏");
                        $(".add_group input.text").blur();
                    }
                })
            } catch(e) {
                $(".add_group input.text").val("");
                $(".add_group input.text").attr("placeholder", "收藏分类名称已经存在");
                setPlace = setTimeout(function(){
                    $(".add_group input.text").attr("placeholder", "快速新建收藏分类");
                }, 2000);
            }
        }
    }
// 点击回车添加收藏分类
    $(document).on("keyup", ".add_group input.text", function(event){
        var event = event || window.event;
        if (event.keyCode == 13) {
            sendAjax();
        }
    });
// 点击添加收藏分类按钮
    $(document).on("click", ".add_group span.button", function(event){
        sendAjax();
    });
// 点击任意分类收藏
    $(document).on('click', ".sel li", function(){
        var gname = $(this).html();
        var gid   = $(this).attr('data-gid');
        // ajax收藏图片，提示收藏成功
        $.ajax({
            type : 'get',
            url  : '/my/addNewCollect',
            data : 'pid=' + userCollectPid + '&gid=' + gid + '&gname=' + gname,
            success: function(res){
                // 收藏成功关闭收藏弹框
                $(".add_group input.text").val("");
                $(".add_group input.text").attr("placeholder", "快速新建收藏分类");
                $(".shou_cang").hide();
                // 收藏成功提示
                $(".zhezhao").remove();
                $(".copy-tips").slideDown();
                // 收藏页面 收藏、取消收藏转化
                $("div.shoucang").remove();
                $(".free-download").after('<div class="quitColl"><a class="quit" href="javascript:void(0)">取消收藏</a></div>');
                $(".zan-but").after('<div class="quitColl"><a class="quit" href="javascript:void(0)"><i class="iconfont icon-liebiaoxiangqing-shoucangshu"></i>取消收藏</a></div>');
                // 存储缓存
                var key =  CONFIG['uid']+'_user_is_collect_'+res['pid'];
                if (window.localStorage) {
                    localStorage.setItem(key,1);
                }

                // 延迟3秒关闭收藏成功提示
                setHide = setTimeout(function(){
                    $(".copy-tips").hide();
                    $(".copy-tips .res i").hide();
                    $(".zhezhao").hide();
                    // 删除原DOM
                    $(".shou_cang").remove();
                    $(".zhezhao").remove();
                    // 第一次登录网站，提示收藏
                    if (window.env.firstLogin == true) {
                        $(".bgimg, .prompt").show();
                    }
                }, 3000);
            }
        })
    });
// 关闭收藏、收藏成功
    $(document).on("click", "body .shou_cang .off", function(){
        $(".add_group input.text").val("");
        $(".add_group input.text").attr("placeholder", "快速新建收藏分类");
        clearTimeout(setHide);
        $(".shou_cang").hide();
        $(".zhezhao").hide();
        // 删除原DOM
        $(".shou_cang").remove();
        $(".zhezhao").remove();
    });
    $(document).on("click", "body .shou_cang_success .off", function(){
        clearTimeout(setHide);
        $(".shou_cang_success").hide();
        $(".shou_cang_success .res i").hide();
        $(".zhezhao").hide();
        // 删除原DOM
        $(".shou_cang").remove();
        $(".zhezhao").remove();
        // 第一次登录网站，提示收藏
        if (window.env.firstLogin == true) {
            $(".bgimg, .prompt").show();
        }
    });

// 监听按键
    $.ctrl = function(key, callback, args) {
        var isCtrl = false;
        $(document).keydown(function(e) {
            if (!args) args=[];
            if (e.ctrlKey) isCtrl = true;
            if (e.keyCode == key.charCodeAt(0) && isCtrl) {
                callback.apply(this, args);
            }
        }).keyup(function(e) {
            if (e.ctrlKey) isCtrl = false;
        });
    };
// 关闭提示，消除首次登录网页标志
    function closePrompt() {
        $(".bgimg, .prompt").fadeOut(500);
        window.env.firstLogin = '';
    }
// 点击我知道了，或者Ctrl+D按钮，关闭提示
    $(".prompt .prompt-page .off i").click(function(){
        closePrompt();
    });
    $.ctrl('D', function() {
        closePrompt();
    });

    //未登录点击企业认证弹登录框
    $(".instAppr-Btnr").on("click", function(){
        if (CONFIG['isLogin'] == 0) {
            env.login();
            return false;
        }
    });

    $('.head-search .text').focus(function(){
        $(this).attr('placeholder', '').parents(".head-search ").css("background", "#fff");
    }).blur(function(){
        $(this).attr('placeholder', '请输入关键词').parents(".head-search ").css("background", "#333");
    });

    var user_show = '';
    var user_hide = '';
    $(".user .user").on("mouseenter", function(){
        clearTimeout(user_hide);
        user_show = setTimeout(function(){
            $(".new-user-menu").attr("data", "show");
            var show = $(".new-user-menu").attr("data");
            if (show == 'show') {
                $(".new-user-menu").show();
            }
        }, 500);
    }).on("mouseleave", function(){
        clearTimeout(user_show);
        user_hide = setTimeout(function(){
            $(".new-user-menu").attr("data", '');
            var hide = $(".new-user-menu").attr("data");
            if (hide == '') {
                $(".new-user-menu").hide();
            }
        }, 500);
    });

    //统计企业VIP下拉点击人数
    $('.drop_click').click(function(){
        $.get("/vip/ajaxStats?type=2");
    });

    // 累计三次下载之后 提示图片用途
    // 设置cookie
    function setCookie(name, value, seconds) {
        seconds = seconds || 0; //seconds有值就直接赋值，没有为0，这个根php不一样。
        var expires = "";
        if (seconds != 0 ) { //设置cookie生存时间
            var date = new Date();
            date.setTime(date.getTime()+(seconds*1000));
            expires = "; expires="+date.toGMTString();
        }
        document.cookie = name+"="+escape(value)+expires+"; path=/; domain=.699pic.com;"; //转码并赋值
    }
    window.env.setCookie = setCookie;
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';'); //把cookie分割成组
        for(var i=0;i < ca.length;i++) {
            var c = ca[i]; //取得字符串
            while (c.charAt(0)==' ') { //判断一下字符串有没有前导空格
                c = c.substring(1,c.length); //有的话，从第二位开始取
            }
            if (c.indexOf(nameEQ) == 0) { //如果含有我们要的name
                return unescape(c.substring(nameEQ.length,c.length)); //解码并截取我们要值
            }
        }
        return false;
    }
    window.env.getCookie = getCookie;
    function delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=getCookie(name);
        if(cval!=null)
            document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    }

    //收藏部分js
    // 判断是否收藏图片 使用
    $(function (){
        var timer = null;
        $(document).on('mouseover','.imgshow .list',function () {
            return true;

        });
        function is_collect (url,data,$dom,key) {
            var obj = $dom.find(".collect-one");
            obj.attr('data-mark',1);
            $.get(url,data,function (res) {
                if (res['status'] == '1' && obj.length > 0) {
                    obj.addClass('yet');
                    obj.attr('title','取消收藏');
                    if (window.localStorage) {
                        localStorage.setItem(key,1);
                    }
                } else {
                    if (window.localStorage) {
                        localStorage.setItem(key,0);
                    }
                }
            },'json');
        }

            // 取消收藏
        $(document).on('click','.popup .yet',function (ev) {
            var oEvent = ev || event;
            var url  = '/my/removeNewCollect';
            var pid  = $(this).attr('data-pid');
            var data = {pid:pid};
            var that = $(this);
            var key;
            if (CONFIG['uid'] == '') return ;
            key  = CONFIG['uid']+'_user_is_collect_'+pid;
            $(".shou_cang").remove();
            $.get(url,data,function (res){
                that.removeClass('yet');
                if (window.localStorage) {
                    localStorage.removeItem(key);
                }
                that.parents(".list").css("overflow", "initial");
                that.prev(".show").show();
                $(".zhezhao").remove();
                $("body").append("<div class='copy-tips'><div class='copy-tips-wrap'><span>☺</span>取消成功</div></div>");
                $(".copy-tips").slideDown();
                that.removeClass('yet');
                setTimeout(function (){
                    $(".zhezhao").remove();
                    $(".copy-tips").remove();
                    $(".shou_cang").remove();
                },2000);
            },'json');
            oEvent.stopPropagation();
        });

        // 鼠标移除
        $(document).on('mouseout','.imgshow .list',function () {
            clearTimeout(timer);
        });
    });


    // 新版vip下拉展示
    $('.dropVIP').on({
        mouseover:function(){
            $('.nav-drop-VIP').css({
                'top':'50px',
                'opacity':'1',
                'z-index':'1000',
                'visibility': 'visible'
            });
        },
        mouseout:function(){
            $('.nav-drop-VIP').css({
                'top':'80px',
                'opacity':'0',
                'z-index':'-1',
                'visibility': 'hidden'
            });
        }
    })
    //版权证书相关代码
    // 打开证书
    $(document).on('click','.certificate',function () {
        var pid = $(this).attr('data-pid');
        var url = '/enterprise/checkCopyright';
        var copyright = $(this).attr('copyright');
        var str = '';
        if(copyright == 1) {
            $.get(url, {photo_id: pid}, function (res) {
                if (res['id']) {
                    str += "<ul class='certificate-list clearfix'>" +
                        "<li>登记号：" + res['copyright'] + "</li>" +
                        "<li></li>" +
                        "<li>作品／制品名称：" + res['title'] + "</li>" +
                        "<li>作品类别：摄影作品</li>" +
                        "<li>作者：" + res['copyright_name'] + "</li>" +
                        "<li>著作权人： " + res['copyright_owner'] + "</li>" +
                        "<li>创作完成日期：" + res['date'] + "</li>" +
                        "<li>首次发表／出版／制作日期：" + res['date'] + "</li></ul>" +
                        "<p class='certificate-size'>以上事项，由上海韩众网络科技有限公司申请，经上海市版权局审核，根据《作品自愿登记试行办法》规定，予以登记。</p>" +
                        "<p class='certificate-date'>登记日期：" + res['date'] + "</p>";
                    $("[data-id='copyright']").empty();
                    $("[data-id='copyright']").append(str);
                    $('.winpopbg').fadeIn();
                    $('.certificateBG').fadeIn();
                }
            }, 'json');

        } else if (copyright == 3)
        {
            url = '/enterprise/tjbq';
            $.get(url, {photo_id: pid}, function (result) {
                if (result['status']) {
                    var res = result.info
                    var work_type = '摄影作品';
                    if(res.work_type == 2){
                        work_type = '美术作品';
                    }
                    str += "<ul class='certificate-list clearfix'>" +
                        "<li>登记号：" + res['reg_num'] + "</li>" +
                        "<li></li>" +
                        "<li>作品／制品名称：" + res['title'] + "</li>" +
                        "<li>作品类别："+work_type+"</li>" +
                        "<li>作者：" + res['author'] + "</li>" +
                        "<li>著作权人： " + res['work'] + "</li>" +
                        "<li>创作完成日期：" + res['complete_time'] + "</li>" +
                        "<li>首次发表／出版／制作日期：" + res['publish_time'] + "</li></ul>" +
                        "<p class='certificate-size'>以上事项，由天津摄图网络科技有限公司申请，经天津市版权局审核，根据《作品自愿登记试行办法》规定，予以登记。</p>" +
                        "<p class='certificate-date'>登记日期：" + res['register_time'] + "</p>";
                    $("[data-id='copyright']").empty();
                    $("[data-id='copyright']").append(str);
                    $('.winpopbg').fadeIn();
                    $('.certificateBG').fadeIn();
                }
            }, 'json');
        } else {
            var one = pid.substring(0,3);
            var two = pid.substring(3,6);
            var three = pid.substring(6,9);
                $('.putRecords2-block').css('background-image',"url(//img95.699pic.com/copyrightImg/"+one+"/"+two+"/"+three+".jpg!/fh/500)");
                $('.putRecords2-block,.winpopbg').fadeIn(200);
            }

    });
    //关闭证书
    $(document).on('click','.certificate-close',function (){
        $('.winpopbg').fadeOut();
        $('.certificateBG').fadeOut();
    });
});

