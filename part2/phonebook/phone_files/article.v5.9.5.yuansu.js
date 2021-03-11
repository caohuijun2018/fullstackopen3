$(function () {

var tipWin = "<style>.downloadLimit-pop{position: fixed;left: 0;right: 0;top: 0;bottom: 0;margin: auto;z-index: 101;border-radius: 4px;width: 470px;height: 240px;background: #fff;/*! display:none; */}.downloadLimit-title{height: 49px;padding-left: 20px;line-height: 49px;font-size:16px;border-bottom: 2px solid #DDDDDD;}.downloadLimit-title .vipicon{vertical-align: -4px;margin-right: 5.1px;}.downloadLimit-pop i.icon-guanbi{margin:15px 17px;font-size: 18px;cursor: pointer;transition:transform 0.55s ease-in-out;}.downloadLimit-pop i.icon-guanbi:hover{transform: rotate(360deg);}.downloadLimit-title i.icon-huiyuan-danchuangxingxing{font-size: 30px;vertical-align: -5px;margin-left: 15px;}.downloadLimit-block{text-align: center;}.downloadLimit-block .downloadLimit-text{font-size: 20px;color: #333333;padding-top:28px;}.downloadLimit-block .downloadLimit-hint{font-size: 16px;color: #999999;margin-top: 10px;margin-bottom: 20px;}.downloadLimit-block .downloadLimit-btn{display: inline-block;height: 48px;text-align: center;line-height: 48px;font-size: 18px;color: #FFFFFF;border-radius: 4px;margin: 0 10px;padding: 0 15px;}.downloadLimit-block .downloadLimit-btn:hover,.downloadLimit-block .downloadLimit-btn2:hover{opacity: 0.8;}.downloadLimit-block .downloadLimit-btn2{display: inline-block;margin: 0 8px;font-size: 16px;color: #4497DF;}.downloadLimit-pop .downloadLimit-hint2{font-size: 16px;color: #999999;line-height: 26px;margin-bottom: 17px;} .downloadLimit-pop999{height: 232px;}.downloadLimit-pop999 .downloadLimit-btn{background: #4497DF;}";
tipWin += ".alert-bg{ position:fixed; top:0; left:0; width:100%; height:100%; background:url(//static.699pic.com/images/vip/bgimg.png); z-index:11;}</style>";
tipWin += "<div class='alert-bg'></div><div class='downloadLimit-pop downloadLimit-pop999'> <i class='iconfont icon-guanbi fr' onclick=\"$('.downloadLimit-pop999,.alert-bg').fadeOut(300)\"></i>";
tipWin += "<p class='downloadLimit-title'>摄图网提示</p>";
tipWin += "<div class='downloadLimit-block'><p class='downloadLimit-text'></p>";
var person = company = tipWin;
person += "<p class='downloadLimit-hint2'>此素材包含肖像权<br/>如需企业商用请升级企业VIP。</p>";
person += "<a class='downloadLimit-btn' href='//699pic.com/vip/enterprise?click_type=63' target='__blank'>了解企业相关授权</a> </div> </div>";
company += "<p class='downloadLimit-hint2' style='line-height:24px;'><span style='font-size: 18px;display: inline-block;color: #333;height: 0;transform: translateY(-7px);'>此素材包含肖像权</span><br>如需使用在烟草、医疗、药物、整容、保健品等<br>敏感领域广告和宣传，请购买敏感用途授权</p>";
company += "<a class='downloadLimit-btn' style='margin-top: -6px;' ";

var tipsWinShow = function(bool,pid){
    if (bool == 1) {
        if($('.downloadLimit-pop999,.alert-bg').length != 2){
            $('body').append(person);
            $('.downloadLimit-pop999,.alert-bg').show();
        }
    } else if(bool == 2) {
        if($('.downloadLimit-pop999,.alert-bg').length != 2){
            company += "href='/single-"+ pid +".html' target='__blank'>单独购买敏感用途</a> </div> </div>"
            $('body').append(company);
        $('.downloadLimit-pop999,.alert-bg').show();
        }
      /*  if($('.downloadLimit-pop999').length){
            $('.downloadLimit-pop999 .downloadLimit-btn').attr('href', '/single-'+ pid +'.html');
        }*/
    }
}

$('.radio .radio-list').on('click',function(){
    $('.radio-list .dot').removeClass('on');
    $(this).find('.dot').addClass('on');
});
var onswitch = false;
var loadedAlert = {};
window.env.downloadPhoto = downloadPhoto;
function downloadPhoto( pid , obj){
    if (obj){

    }
    if( !env.isLogin ){
        env.login();
        return;
    }
    var picType = fileType=0;
    if (!onswitch) {
    	onswitch = true;
	    $.post('/newdownload/yuansu',{ 'pid':pid },function(res){
	    	if (res.stat !== undefined){
				if (res.stat.pic_cate !== undefined){
					picType = res.stat.pic_cate;
				}
				if (res.stat.file_type !== undefined){
					fileType = res.stat.file_type;
				}
	    	}
	        if( res.state==true ){
	            $('<iframe style="display:none;"/>').appendTo('html').attr('src','https:'+res.url);
	            if (window.env.firstLogin == true) { // 第一次下载，提示收藏
	                $(".bgimg, .prompt").show();
	            }
				if (res.stat.showTips !== undefined){
                	tipsWinShow(res.stat.showTips,pid);
                }

	            downloadStat(res.stat);
                successDownTjV3($(obj).attr('data-position'), 'downClickSuccess' );
	        }else if(res.state == '-1'){
	        	doAlert('/newdownload/yuansu/downloadLimit', {type:res.type,picType:picType,fileType:fileType});
	            downloadStat(res.stat);
                successDownTjV3($(obj).attr('data-position'), 'downClickFailed' );
	        }else if(res.state == '-2'){
	            doAlert('/download/userSurvey');
                successDownTjV3($(obj).attr('data-position'), 'downClickFailed' );
	        }else if(res.state == '-3'){
	            doAlertNoCache('/download/hangDownload',{l:res.type});
                successDownTjV3($(obj).attr('data-position'), 'downClickFailed' );
	        }else if(res.state == '-11'){
	            doAlertNoCache('/alert/uniqueLogout');
                successDownTjV3($(obj).attr('data-position'), 'downClickFailed' );
	        }else if(res.state == '-12'){
	            env.login();
	        } else if(res.state == '10'){
                $('body').append(res.doc);
            }else if(res.state == '-101' || res.state == '-102' || res.state == '-103' || res.state == '-104'){
                if(!$('#bindjs').length){
                    appendJs('//static.699pic.com/js/binding-phonePop.js',function(){renderBindPhone(res.state);},'bindjs');
                }else{
                    renderBindPhone(res.state);
                }
            }
	        onswitch = false;
	    });
    }

}

function doAlert(path,data){
	if (data.picType && data.fileType) {
		if( loadedAlert[data.picType+data.fileType] ){
			$('#tips_area').html(loadedAlert[data.picType+data.fileType].doc);
	        eval(loadedAlert[data.picType+data.fileType].run)
	        return;
	    }
	} else {
		if( loadedAlert[path] ){
	        eval(loadedAlert[path].run)
	        return;
	    }
	}

    $.post(path,data,function( response ){
    	if( response.state ){
        	if (response.doc && response.run) {
        		loadedAlert[data.picType+data.fileType] = response;
        	} else {
        		loadedAlert[path] = response;
        	}
        	$('#tips_area').html(response.doc);
            eval(response.run);
        }else{
        }
    })
}

function doAlertNoCache(path,data){
    $.post(path,data,function( response ){
        if( response.state ){
            $(response.doc).appendTo('body');
            eval(response.run);
        }else{
        }
    })
}

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
var onswitch2 = false;
$('#detail_free_download_btn').on('click',function(){  // 详情页下载
    var btn = $(this);
    if( !env.isLogin ){
        btn.html('<a>还没有登录哦</a>');
        setTimeout(function(){
            env.login()
        },1000);
        return;
    }
    var size  = $('.radio-list .on').attr('data-size');
    var sizes = $('.radio-list .on').attr('data-sizes');
    var byso  = $('#byso').val();
    var bycat = $('#bycat').val();
    //提供下载文件类型数据
    var filetype = $('.freedownload .on-set').attr('data-id');

    var pspt      = window.localStorage.pspt;
    var pid       = '';
    var today     = '';
    if (pspt) {
        pid       = pspt.split('_')[0];
        today     = pspt.split('_')[3];
        var sid   = pspt.split('_')[1];
        var page  = pspt.split('_')[2];
    }
    var comeFrom  = env.comeFrom;                   // 通过comeFrom判断是否用localStorage
    var res       = -1;
    if (comeFrom) {
        res       = comeFrom.search(/sousuo/);
    }
    var myDate    = new Date();
    var todayDate = myDate.toLocaleDateString();
    var picType = fileType=0;
    if (todayDate == today && pid == env.pid && res != -1) {    // 日期，图片id，来自搜索
    	if (!onswitch2) {
    		onswitch2 = true;
	    	$.post(
	            env.site + '/newdownload/yuansu',
	            {'pid':env.pid, 'size':size, 'sizes':sizes, 'byso':byso, 'bycat':bycat, 'comeFrom':env.comeFrom, 'sid':sid, 'page':page, 'filetype':filetype},
	            function(res){
					if (res.stat !== undefined){
						if (res.stat.pic_cate !== undefined){
							picType = res.stat.pic_cate;
						}
						if (res.stat.file_type !== undefined){
							fileType = res.stat.file_type;
						}
	            	}

	                if (res.state == true) {
	                    $('<iframe style="display:none;"/>').appendTo('html').attr('src','https:'+res.url);
						if (res.stat.showTips !== undefined){
	                    	tipsWinShow(res.stat.showTips,env.pid);
	                    }
	                    downloadStat(res.stat);
	                } else if (res.state == '-1') {
	                    doAlert('/newdownload/yuansu/downloadLimit', {type:res.type,picType:picType,fileType:fileType});
	                    downloadStat(res.stat);
	                } else if (res.state == '-2') {
	                    doAlert('/download/userSurvey');
	                } else if (res.state == '-3') {
	                    doAlertNoCache('/download/hangDownload',{l:res.type});
	                } else if (res.state == '-11') {
	                    doAlertNoCache('/alert/uniqueLogout');
	                } else if(res.state == '-12'){
	                    env.login();
	                } else if(res.state == '10'){
                        $('body').append(res.doc);
                    }else if(res.state == '-101' || res.state == '-102' || res.state == '-103' || res.state == '-104'){
                        if(!$('#bindjs').length){
                            appendJs('//static.699pic.com/js/binding-phonePop.js',function(){renderBindPhone(res.state);},'bindjs');
                        }else{
                            renderBindPhone(res.state);
                        }
                    }
	                onswitch2 = true;
	            }
	        );
    	}
    } else {
    	if (!onswitch2) {
    		onswitch2 = true;
	        $.post(env.site+'/newdownload/yuansu',{ 'pid':env.pid,'size':size,'sizes':sizes,'byso':byso,'bycat':bycat,'comeFrom':env.comeFrom, 'filetype':filetype },function(res){
	        	if (res.stat !== undefined){
					if (res.stat.pic_cate !== undefined){
						picType = res.stat.pic_cate;
					}
					if (res.stat.file_type !== undefined){
						fileType = res.stat.file_type;
					}
				}

	        	if(res.state==true){
	                $('<iframe style="display:none;"/>').appendTo('html').attr('src','https:'+res.url);
					if (res.stat.showTips !== undefined){
						tipsWinShow(res.stat.showTips,env.pid);
					}
	                downloadStat(res.stat);
	                //问卷调查
	                var questionnaireWin = $('#pic-questionnaire-win');

	                if (CONFIG.questionnaire_is_complete == 0 &&
	                    CONFIG.isLogin == 1 &&
	                    CONFIG.vip_type == 0 &&
	                    questionnaireWin) {

	                    questionnaireWin.show();

	                    CONFIG.questionnaire_is_complete = 1;

	                }
	            }else if(res.state == '-1'){
	                doAlert('/newdownload/yuansu/downloadLimit',{type:res.type,picType:picType,fileType:fileType});
	                downloadStat(res.stat);
	            }else if(res.state == '-2'){
	                doAlert('/download/userSurvey');
	            }else if(res.state == '-3'){
	                doAlertNoCache('/download/hangDownload',{l:res.type});
	            }else if(res.state == '-11'){
	                doAlertNoCache('/alert/uniqueLogout');
	            }else if(res.state == '-12'){
					console.log(env.login);
	                window.env.login();
	            } else if(res.state == '10'){
                    $('body').append(res.doc);
                }else if(res.state == '-101' || res.state == '-102' || res.state == '-103' || res.state == '-104'){
                    if(!$('#bindjs').length){
                        appendJs('//static.699pic.com/js/binding-phonePop.js',function(){renderBindPhone(res.state);},'bindjs');
                    }else{
                        renderBindPhone(res.state);
                    }
                }
	        	onswitch2 = false;
	        });
    	}
    }
});

document.getElementById('photo').oncontextmenu = function(){ return false; }
document.getElementById('photo').onmousedown = function(){ return false; }
$('.tags a.kw_noid').on('click',function(){
    window.env.search($(this).html());
});


$(function(){

    $('[op-type="report-type"]').trigger('click');

    $(".report").click(function(){
        $(".report-box").fadeIn(300);
        $(".report-con").show();
        $(".report-con-success").hide();
        $("#report-desc").val('');
    });

    $(".reason-report p").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
    });


    $(".report-box .close-but").click(function(){
        $(".report-box,.report-con-success,.report-con").fadeOut(300);

    });

    $(".report-sub a").click(function(){

        var reportType = $('[op-type="report-type"].active').attr('report-id');
        var reportDesc = $('#report-desc').val();

        if ( (!reportDesc || $.trim(reportDesc).length <= 0) && (reportType != 3 && reportType != 4)) {

            alert('举报内容必填!');
            e.stopPropagation();
            return false;

        }

        $.post('/report/ajaxReport', {

            pid:detail.pid,
            type:reportType,
            desc:reportDesc

        }, function(){

        });

        $(this).parents(".report-con").hide().siblings().show();
        $(".report-box").delay(1000).fadeOut(100);

    });

    $('[op-type="report-type"]').click(function (e) {

        var id = $(this).attr('report-id');
        var descText = $('#report-desc');

        if (id) {

            if (id == 1) {

                descText.attr('placeholder', '请填写原图地址');

            } else if (id == 2) {

                descText.attr('placeholder', '请填写第三方图片地址');

            } else {

                descText.attr('placeholder', '请备注您的举报内容以及联系方式，方便小编尽快进行核实');

            }

        }


    });

    $(".geshi").on("mouseenter", function(){
        $(".show-ai").show();
    }).on("mouseleave", function(){
        $(".show-ai").hide();
    })



    $('#btn-cy').click(function () {

        window.open('//699pic.com/vip/index?t=6#uses-info');

    });

    $('#cpy-fixedEnter').animate({
        bottom:0
    },600);
    $('#cpy-fixedEnter .closeBtn').on('click',function(){

        // 关闭授权加保费弹窗后一周内不再显示
        $.get("//699pic.com/index.php?m=Home&c=Detail&a=ajaxClosePopup");

        $('#cpy-fixedEnter').animate({
            bottom:"-115px"
        },600,function () {
            $('#cpy-fixedEnter').hide();
        })
    })



      //图片收藏node迁移到jquery
        $('[pic_object_name="change_friendship"]').on('click', function(e) {

            //未登录弹窗
            if (CONFIG.isLogin == 0) {
                env.login();
                return false;
            }


            var action = $(this).attr('pic_action');
            var followUid = $(this).attr('pic_action_value');

            if (followUid)
            {

                   if(action=='create_friendship'){
                       var pic_action = 'destroy_friendship';
                       var pic_action_replace_text = '取消关注';
                       var url = '//699pic.com/photographer/createFriendShip';
                   }else{
                       var pic_action =  'create_friendship';
                       var pic_action_replace_text = '加关注';
                       var url = '//699pic.com/photographer/destroyFriendShip';
                   }

                    $(this).attr('pic_action', pic_action);
                    $(this).attr('pic_action_replace_text',pic_action_replace_text);
                    $(this).html(pic_action_replace_text);
                    $.post(url,{follow_uid:followUid},function(data){});

            }

        })

        // 点赞
        $(document).on('click', '#add-star', function(){
            var self = $(this);
            if (!env.isLogin) {
                env.login();
            } else {
                var photoId = env.pid;
                $.get(
                    '//699pic.com/?c=detail&a=incrementStar',
                    {'pid': photoId},
                    function(res){
                        if (res.status == true) {
                            self.find(".star-status").text("已赞");
                            var star = parseInt(self.find(".star-count").text()) + 1;
                            self.find(".star-count").text(star);
                            self.attr('id', 'remove-star');
                        }
                    }
                );
            }
        });

        // 取消赞
        $(document).on('click', '#remove-star', function(){
            var self = $(this);
            if (!env.isLogin) {
                env.login();
            } else {
                var photoId = env.pid;
                $.get(
                    '//699pic.com/?c=detail&a=decrementStar',
                    {'pid': photoId},
                    function(res){
                        if (res.status == true) {
                            self.find(".star-status").text("赞");
                            var star = parseInt(self.find(".star-count").text()) - 1;
                            self.find(".star-count").text(star);
                            self.attr('id', 'add-star');
                        }
                    }
                );
            }
        });

        // 登陆清除浏览限制标志
        if (env.isLogin) {
            window.localStorage.removeItem("vl");
        }
        // 浏览限制
        if (window.localStorage.vl == 1) {
            $(".viewLimit").show();
            $.ajax({
                type: 'get',
                url : '//ajax.699pic.com/?c=ViewLimit&a=ViewLimitNum',
                success: function(res){}
            })
        }
        // 用户点击
        $(document).on("click", "div.viewLimit-logn a", function(){
            $.ajax({
                type: 'get',
                url : '//ajax.699pic.com/?c=ViewLimit&a=ViewLimitToRegist',
                success: function(res){}
            })
        });
        // 未登录设置浏览限制标志
        if (!env.isLogin) {
            window.localStorage.vl = 1;
        }
        var _false = true;
        // 取消收藏
        $(document).on("click", ".quitColl", function(){
            if(_false)
            {
                _false = false;
                $.ajax({
                type: 'get',
                url : '/my/removeNewCollect',
                data: 'pid=' + env.pid,
                success: function(res){
                    // 收藏、取消收藏转换
                    $("div.quitColl").remove();
                    $(".zan-but").after('<div class="shoucang"><a class="coll" href="javascript:void(0)"><i class="iconfont icon-liebiaoxiangqing-shoucangshu"></i>收藏</a></div>');
                    _false = true;
                    $(".freedownload-collectbtn").removeClass("quitColl collectioned").addClass("shoucang");
                }
                })
            }

        });

        // 显示全部标签
        $('.show-all').click(function(){
            $(this).hide();
            $('.tag-en').show();
        });

        // 底部栏目切换
        $(".remeng").mouseover(function(){
            $(this).attr('style', 'color:#666;').siblings('a').attr('style', 'color:#999;');
            $('.dldd').eq($(this).index()).show().siblings().hide();
        })

})
});