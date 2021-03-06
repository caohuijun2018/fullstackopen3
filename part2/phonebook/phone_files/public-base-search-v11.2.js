/* COMBO: filename = v2.0/module/public-base-search-v11.2.js, type = application/javascript, resp = 200 */
$(window).ready(function(){

	/***以图搜图end**/
	if (!window.FormData) {
	$(".purimg").hide();
	}

	//以图搜图
	$(".purimg").click(function (ev) {
	$.getJSON('/shitu/uploadAuth', function (data) {
		$("input[name='policy']").val(data['policy']);
		$("input[name='authorization']").val(data['authorization']);
	});
	$("#file").click();

	$("#file").change(function (){
		var val = $(this).val();
		if (!val) return;
		$(".put-img-hint").show();
		$(".uploading").show();
		$(".error-hint").hide();
		$("#photo_search").submit();
	});

	Mark = null;
	if(window.ActiveXObject || "ActiveXObject" in window) {
		setInterval(function (){
			var val = $("#file").val();
			if (val != '' && Mark == void 0) {
				$(".put-img-hint").show();
				$(".uploading").show();
				$(".error-hint").hide();
				Mark = 1;
				$("#photo_search").submit();
			}
		},500);
	}
	var oEvent = ev || event;
	if(oEvent && oEvent.stopPropagation) { //非IE
		oEvent.stopPropagation();
	} else { //IE
	  window.event.cancelBubble = true;
	}
	// 以图搜图统计 type = 2 标识非首页
	shitu({type:2});
	});

	$(document).click(function () {
	if($(".error-hint").is(":hidden")) return ;
	$(".put-img-hint").hide();
	$("input[name='policy']").val('');
	$("input[name='authorization']").val('');
	$("#file").val('');
	});

	$(".put-btn").click(function (ev) {
	$.getJSON('/shitu/uploadAuth', function (data) {
		$("input[name='policy']").val(data['policy']);
		$("input[name='authorization']").val(data['authorization']);
	});
	$("#file").click();
	$("#file").change(function (){
		var val = $(this).val();
		if (!val) return;
		$(".put-img-hint").show();
		$(".uploading").show();
		$("#photo_search").submit();
	});
	Mark = null;
	if(window.ActiveXObject || "ActiveXObject" in window) {
		setInterval(function (){
			var val = $("#file").val();
			if (val != '' && Mark == void 0) {
				$(".put-img-hint").show();
				$(".uploading").show();
				$(".error-hint").hide();
				Mark = 1;
				$("#photo_search").submit();
			}
		},1000);
	}
	var oEvent = ev || event;
	if(oEvent && oEvent.stopPropagation) { //非IE
		oEvent.stopPropagation();
	} else { //IE
	  window.event.cancelBubble = true;
	}

	// 以图搜图统计 type = 2 标识非首页
	shitu({type:2});
	});



$("#photo_search").submit(function () {
if(window.FormData) {
    var data = new window.FormData($("#photo_search")[0]);
} else {
    return ;
}
$.ajax({
    url: '//v0.api.upyun.com/sheyingtu-web-95',
    type: 'POST',
    data: data,
    cache: false,
    processData: false,
    contentType: false,
}).done(function(data, textStatus) {
    var data = JSON.parse(data);

	console.log(data);

    window.location.href = '/shitu/search?url='+data['url'];
}).fail(function(res, textStatus, error) {
    var data = JSON.parse(res['responseText']);
    if (data && data['code'] == '403') {
        if (data['message'].indexOf('small') > -1) {
            $(".error-hint-clue").html('您上传的图片过小');
        } else if (data['message'].indexOf('large') > -1) {
            $(".error-hint-clue").html('您上传的图片过大');
        } else if (data['message'].indexOf('type error') > -1) {
            $(".error-hint-clue").html('您上传的图片类型不正确');
        }
    }
    $(".put-img-hint").show();
    $(".uploading").hide();
    $(".error-hint").show();
    // 统计上传失败次数
    shitu({upload:0});
});
return false;
});

// 首页以图搜图统计 type = 1 为首页 ，type = 2为列表页
function shitu (data) {
var url = "//ajax.699pic.com/?c=Ajax&a=shitu";
$.ajax({
    type: "get",
    url: url,
    jsonp: "",
    data:data,
    dataType: "jsonp",
    success: function (data) {}
});
}

//不是搜索页，vip页，支付页将cookie设置为0

});

/***以图搜图end**/

if( !window.env ) window.env = {};

$(function(){

    try{
        $("img.lazy").lazyload({
            threshold :350
        });
    }catch(err){}

  try{
      var isTruncate = true;
      if( env['notTruncate'] ) isTruncate = false;
      // $('.swipeboxEx').flexImages({'rowHeight':300,'container':'.list','truncate':isTruncate });
    }catch(err){}

});

 /*登录注册或者弹窗*/
    var loadedAlert = {};
    function doAlert(path,data){
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

    // 弹窗
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
                $(response.doc).appendTo('body');
                eval(response.run);
            }else{
            }
        })
    }
    window.env.doAlertNoCache = doAlertNoCache;

    window.env.doAlert = doAlert;
$(function(){

   //	登录
    function login(){
        $('.go-login_span').eq(0).click();
        $('#login-box_home').show();
        $('#new-login-mask').show();
    }
    window.env.login = login;
    //注册
    function logup() {
        $('.go-regist_span').eq(0).click();
        $('#login-box_home').show();
        $('#new-login-mask').show();
    }
    window.env.logup = logup;

    function qqlogin(){ window.open("//699pic.com/?s=/Home/Auth/qqLogin","","width=750, height=500, top=50, left=50"); }
    window.env.qqlogin = qqlogin;

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

    // 登录注册弹窗，由异步加载修改为同步加载  update by 黄芳阳 time：2017-4-7
    $('.head-right .login-enter .register').on('click',function(){ logup() });
    $('.head-right .login-enter .login').on('click',function(){ login(); });


    function downloadPhoto( pid )
    {
        if( !env.isLogin ){
            env.login();
            return false;
        }
        $.post('/download/getDownloadUrl',{ 'pid':pid },function(res){
            if( res.state==true ){
                $('<iframe style="display:none;"/>').appendTo('html').attr('src',res.url);
                if (window.env.firstLogin == true) { // 绗竴娆′笅杞斤紝鎻愮ず鏀惰棌
                    $(".bgimg, .prompt").show();
                }
            }else if(res.state == '-1'){
                doAlert('/download/downloadLimit',{type:res.type})
            }else if(res.state == '-2'){
                doAlert('/download/userSurvey');
            }else if(res.state == '-3'){
                doAlertNoCache('/download/hangDownload',{l:res.type});
            }else if(res.state == '-11'){
                doAlertNoCache('/alert/uniqueLogout');
            }else if(res.state == '-12'){
                env.login();
            } else if(res.state == '10'){
                $('body').append(res.doc);
            }
        });
    }

    window.env.downloadPhoto = downloadPhoto;



      /*搜索下拉切换*/
    $('.index-search .select-box').hover(function(){
        $('.index-search .select-drop').show()
    },function(){
        $('.index-search .select-drop').hide()
    });
    $('.index-search .select-drop li').on('click',function(){
        var mode = $(this).attr('mode');
        $('#pic_form_search_model').val(mode);
        /*
        if(!$(this).hasClass('on')){
            $(this).addClass('on').hide().siblings('li').removeClass('on').show();
            $('.index-search .select-show .sch-value').html($(this).text());
            $('.index-search .select-drop').hide()
        }else{
            $('.index-search .select-drop').hide()
        }
        */
        $(this).hide().siblings('li').show().parents('.select-drop').hide();
        $('.sch-value').text($(this).text());
        console.log(mode);
    });

/************搜索start*******************/
    window.env.search = function(kw, mode){

    var searchMode = 'all';

    if (mode) {
        searchMode = mode;
    } else {
    	searchMode =  $('#pic_form_search_model').val();
    	if (searchMode== '') {
    		searchMode = 'all';
    	}
    }

    kw = $.trim(kw).toLowerCase();

    if(kw == '插画' && searchMode == 'all')
    {
        location.href = '/chahua-0-0-1.html';
        return false;
    }
    if(kw == '小报' && searchMode == 'all')
    {
        location.href = '/office/word-xiaobao.html';
        return false;
    }
    if(kw == '手抄报' && searchMode == 'all')
    {
        location.href = '/office/word-shouchaobao.html';
        return false;
    }
    if(kw == 'PPT图标' && searchMode == 'all')
    {
        location.href = '/ppt/tubiao.html';
        return false;
    }
    if(kw == '商业计划书' && searchMode == 'all')
    {
        location.href = '/ppt/jihuashu.html';
        return false;
    }
    if(kw == '工作总结' && searchMode == 'all')
    {
        location.href = '/ppt/huibao.html';
        return false;
    }
    if(kw == '工作计划' && searchMode == 'all')
    {
        location.href = '/ppt/huibao.html';
        return false;
    }
    if(kw == '工作汇报' && searchMode == 'all')
    {
        location.href = '/ppt/huibao.html';
        return false;
    }
    if(kw == '自我介绍' && searchMode == 'all')
    {
        location.href = '/office/ppt-ziwojieshao.html';
        return false;
    }
    if(kw == '职业规划' && searchMode == 'all')
    {
        location.href = '/office/ppt-zhiyeguihua.html';
        return false;
    }
    if(kw == '述职报告' && searchMode == 'all')
    {
        location.href = '/office/ppt-shuzhibaogao.html';
        return false;
    }
    if(kw == '招聘ppt' && searchMode == 'all')
    {
        location.href = '/ppt/jianli.html';
        return false;
    }
    if(kw == '年度总结' && searchMode == 'all')
    {
        location.href = '/office/ppt-nianduzongjie.html';
        return false;
    }
    if(kw == '毕业论文' && searchMode == 'all')
    {
        location.href = '/office/ppt-biyedabian.html';
        return false;
    }
    if(kw == '岗位竞聘' && searchMode == 'all')
    {
        location.href = '/ppt/jianli.html';
        return false;
    }
    if(kw == '个人述职' && searchMode == 'all')
    {
        location.href = '/office/ppt-296177.html';
        return false;
    }
    if(kw == '个人总结' && searchMode == 'all')
    {
        location.href = '/office/ppt-zongjie.html';
        return false;
    }
    if(kw == '幻灯片' && searchMode == 'all')
    {
        location.href = '/ppt-0-263-1-0-0-0-0-0-0.html';
        return false;
    }
    if(kw == '计划书' && searchMode == 'all')
    {
        location.href = '/ppt/jihuashu.html';
        return false;
    }
    if(kw == '家长会' && searchMode == 'all')
    {
        location.href = '/office/ppt-jiazhanghui.html';
        return false;
    }
    if(kw == '开题报告' && searchMode == 'all')
    {
        location.href = '/office/ppt-kaitibaogao.html';
        return false;
    }
    if(kw == '论文' && searchMode == 'all')
    {
        location.href = '/office/ppt-biyedabian.html';
        return false;
    }
    if(kw == '年度计划' && searchMode == 'all')
    {
        location.href = '/office/ppt-niandujihua.html';
        return false;
    }
    if(kw == '年终述职' && searchMode == 'all')
    {
        location.href = '/office/ppt-nianzhongshuzhi.html';
        return false;
    }
    if(kw == '年终总结' && searchMode == 'all')
    {
        location.href = '/office/ppt-nianzhongzongjie.html';
        return false;
    }
    if(kw == '授课' && searchMode == 'all')
    {
        location.href = '/ppt/peixun.html';
        return false;
    }
    if(kw == '新年计划' && searchMode == 'all')
    {
        location.href = '/office/ppt-xinnianjihua.html';
        return false;
    }
    if(kw == '员工培训' && searchMode == 'all')
    {
        location.href = '/office/ppt-yuangong.html';
        return false;
    }
    if(kw == '入职培训' && searchMode == 'all')
    {
        location.href = '/office/ppt-1119297.html';
        return false;
    }
    if (kw == '竞聘' && searchMode == 'all') {
        location.href = '/office/ppt-337241.html';
        return false;
    }
    if(kw == '海报' && searchMode == 'all')
    {
        location.href = '/muban-67872-366-1.html';
        return false;
    }
    if(kw == '展板' && searchMode == 'all'){
        location.href = '/muban-246935-443-1.html';
        return false;
    }
    if(kw == '展架' && searchMode == 'all'){
        location.href = '/muban-251112-443-1.html';
        return false;
    }
    if(kw == '易拉宝' && searchMode == 'all'){
        location.href = '/muban-249980-443-1.html';
        return false;
    }
    if(kw == '画册' && searchMode == 'all'){
        location.href = '/muban-246287-444-1.html';
        return false;
    }
    if ( (kw == 'word' || kw == 'word模板' || kw == 'word文档') && searchMode == 'all') {
    	location.href = '/office/word-so.html';
    	return false;
    }

    if ( (kw == 'excel模板' || kw == 'excel表格' || kw == 'excel')&& searchMode == 'all') {
    	location.href = '/excel/';
    	return false;
    }
    if ( (kw == '简历' || kw =='个人简历' || kw == '简历模板' || kw == '求职简历')&& searchMode == 'all') {
    	location.href = '/office/word-jianli.html';
    	return false;
    }

    if ( (kw == '毕业答辩' || kw == '论文答辩' || kw == '毕业答辩ppt')&& searchMode == 'all') {
    	location.href = '/office/ppt-biyedabian.html';
    	return false;
    }

    if ( (kw == '教育课件' || kw == '教育课件ppt')&& searchMode == 'all') {
    	location.href = '/office/ppt-jiaoyukejian.html';
    	return false;
    }

    if ( (kw == '海报设计' || kw=='商业海报')&& searchMode == 'all') {
    	location.href = '/haibao.html';
    	return false;
    }

    if ( (kw == '画册封面')&& searchMode == 'all') {
    	location.href = '/muban-0-444-1-0-780-0-0-0-0.html';
    	return false;
    }

    if (kw == '名片' && searchMode == 'all') {
    	location.href = '/muban-0-406-1-0-407-0-0-0-0.html';
    	return false;
    }

    if (kw == '工作证' && searchMode == 'all') {
    	location.href = '/muban-0-406-1-0-779-0-0-0-0.html';
    	return false;
    }

    if (kw == '证书' && searchMode == 'all') {
    	location.href = '/muban-0-406-1-0-778-0-0-0-0.html';
    	return false;
    }

    if (kw == '优惠券' && searchMode == 'all') {
    	location.href = '/muban-0-406-1-0-408-0-0-0-0.html';
    	return false;
    }

    if (kw == '传单' && searchMode == 'all') {
    	location.href = '/tupian/muban-chuandan.html';
    	return false;
    }

    if ( (kw == '折页')&& searchMode == 'all') {
    	location.href = '/tupian/muban-zheye.html';
    	return false;
    }

    if ( (kw == '二折页')&& searchMode == 'all') {
    	location.href = '/tupian/muban-erzheye.html';
    	return false;
    }

    if ( (kw == '三折页')&& searchMode == 'all') {
    	location.href = '/tupian/muban-sanzheye.html';
    	return false;
    }

    if ( (kw == '淘宝海报' || kw == '淘宝banner') && searchMode == 'all') {
    	location.href = '/banners.html';
    	return false;
    }

    if ( (kw == '淘宝主图' || kw == '主图' || kw == '主图背景') && searchMode == 'all') {
    	location.href = '/zhitongche.html';
    	return false;
    }

    if ( (kw == '淘宝首页' || kw == '店铺装修') && searchMode == 'all') {
    	location.href = '/shouye.html';
    	return false;
    }

    if ( (kw == '详情页' || kw == '淘宝详情页') && searchMode == 'all') {
    	location.href = '/pages.html';
    	return false;
    }

    if ( kw == '淘宝手机模板' && searchMode == 'all' ) {
    	location.href = '/mobile.html';
    	return false;
    }
    if (kw == '片头' && searchMode == 'all') {
    	location.href = '/media/video-piantou.html';
    	return false;
    }
    if (kw == '字幕' && searchMode == 'all') {
    	location.href = '/media/video-125753.html';
    	return false;
    }
    if (kw == '快闪' && searchMode == 'all') {
    	location.href = '/media/video-kuaishan.html';
    	return false;
    }
    if (kw == '视频片头' && searchMode == 'all') {
    	location.href = '/media/video-385290.html';
    	return false;
    }
    if (kw == '片尾' && searchMode == 'all') {
    	location.href = '/media/video-pianwei.html';
    	return false;
    }
    if (kw == '背景视频' && searchMode == 'all') {
    	location.href = '/media/video-beijingshipin.html';
    	return false;
    }
    if (kw == '粒子特效' && searchMode == 'all') {
    	location.href = '/media/video-lizitexiao.html';
    	return false;
    }
    if (kw == '转场' && searchMode == 'all') {
    	location.href = '/media/video-783738.html';
    	return false;
    }
    if (kw == '开场' && searchMode == 'all') {
    	location.href = '/media/video-372267.html';
    	return false;
    }
    if (kw == '会声会影' && searchMode == 'all') {
    	location.href = '/media/video-393550.html';
    	return false;
    }
    if (kw == 'ae' && searchMode == 'all') {
    	location.href = '/media/video-ae.html';
    	return false;
    }
    if (kw == '字幕条' && searchMode == 'all') {
    	location.href = '/media/video-zimutiao.html';
    	return false;
    }
    if (kw == 'pr' && searchMode == 'all') {
    	location.href = '/media/video-pr.html';
    	return false;
    }
    if (kw == '宣传片' && searchMode == 'all') {
    	location.href = '/media/video-xuanchuanpian.html';
    	return false;
    }
    if (kw == '结尾' && searchMode == 'all') {
    	location.href = '/media/video-jiewei.html';
    	return false;
    }
    if (kw == '新闻片头' && searchMode == 'all') {
    	location.href = '/media/video-xinwenpiantou.html';
    	return false;
    }
    if (kw == '婚礼片头' && searchMode == 'all') {
    	location.href = '/media/video-hunlipiantou.html';
    	return false;
    }
    if (kw == '开场视频' && searchMode == 'all') {
    	location.href = '/media/video-kaichangshipin.html';
    	return false;
    }
    if (kw == 'mg' && searchMode == 'all') {
    	location.href = '/media/video-mg.html';
    	return false;
    }
    if (kw == '时间轴' && searchMode == 'all') {
    	location.href = '/media/video-shijianzhou.html';
    	return false;
    }
    if (kw == '启动仪式' && searchMode == 'all') {
    	location.href = '/media/video-qidongyishi.html';
    	return false;
    }
    if ( (kw == 'pr模板' || kw == 'pr')&& searchMode == 'all') {
    	location.href = '/media/videopr.html';
    	return false;
    }
    if (kw == '企业宣传片' && searchMode == 'all') {
    	location.href = '/media/video-509074.html';
    	return false;
    }
    if (kw == '年会开场' && searchMode == 'all') {
    	location.href = '/media/video-nianhuikaichang.html';
    	return false;
    }
    if (kw == '文字快闪' && searchMode == 'all') {
    	location.href = '/media/video-wenzikuaishan.html';
    	return false;
    }
    if (kw == '绿幕' && searchMode == 'all') {
    	location.href = '/media/video-471477.html';
    	return false;
    }
    if (kw == '元素' && searchMode == 'all') {
    	location.href = '/tupian/sucai-so.html';
    	return false;
    }
    // -------------
    if (kw == '台历' && searchMode == 'all') {
    	location.href = '/tupian/muban-taili.html';
    	return false;
    }
    if (kw == '宣传单' && searchMode == 'all') {
    	location.href = '/tupian/muban-xuanchuandan.html';
    	return false;
    }
    if (kw == '彩页' && searchMode == 'all') {
    	location.href = '/chuandan.html';
    	return false;
    }
    if (kw == '节目单' && searchMode == 'all') {
    	location.href = '/tupian/muban-jiemudan.html';
    	return false;
    }
    if (kw == '贺卡' && searchMode == 'all') {
    	location.href = '/muban-0-406-1-0-865-0-0-0-0.html';
    	return false;
    }
    if (kw == '电商' && searchMode == 'all') {
    	location.href = '/tupian/muban-dianshang.html';
    	return false;
    }
    if (kw == '万圣节海报' && searchMode == 'all') {
    	location.href = '/tupian/muban-wanshengjie.html';
    	return false;
    }

    if (kw == '圣诞节海报' && searchMode == 'all') {
    	location.href = '/tupian/muban-shengdanjie.html';
    	return false;
    }
    if (kw == '新年海报' && searchMode == 'all') {
    	location.href = '/muban-143090-366-1.html';
    	return false;
    }
    if (kw == '猪年海报' && searchMode == 'all') {
    	location.href = '/muban-2428422-366-1.html';
    	return false;
    }
    if ( (kw == '春节海报')&& searchMode == 'all') {
    	location.href = '/muban-179687-366-1.html';
    	return false;
    }
    if ( (kw == '样机'  || kw == '样机素材') && searchMode == 'all') {
    	location.href = '/yangjisucai.html';
    	return false;
    }
    if (kw == 'vi样机' && searchMode == 'all') {
    	location.href = '/muban-0-788-1-0-804-0-0-0-0.html';
    	return false;
    }

    if (kw == '手机样机' && searchMode == 'all') {
    	location.href = '/muban-69271-788-1.html';
    	return false;
    }
    if (kw == '电子设备样机' && searchMode == 'all') {
    	location.href = '/muban-0-788-1-0-801-0-0-0-0.html';
    	return false;
    }
    if (kw == '包装样机' && searchMode == 'all') {
    	location.href = '/muban-0-788-1-0-810-0-0-0-0.html';
    	return false;
    }
    if ( (kw == '海报样机')&& searchMode == 'all') {
    	location.href = '/muban-67872-788-1.html';
    	return false;
    }
    if ( kw == '企业形象墙' && searchMode == 'all') {
    	location.href = '/muban-263858-0-1.html';
    	return false;
    }
    if (kw == '文化墙' && searchMode == 'all') {
    	location.href = '/tupian/muban-wenhuaqiang.html';
    	return false;
    }

    if (kw == '杂志排版' && searchMode == 'all') {
    	location.href = '/huace.html';
    	return false;
    }
    if (kw == '文化展板' && searchMode == 'all') {
    	location.href = '/tupian/muban-wenhuazhanban.html';
    	return false;
    }
    if (kw == '房地产广告' && searchMode == 'all') {
    	location.href = '/tupian/muban-fangdichan.html';
    	return false;
    }
    if ( (kw == '微商海报')&& searchMode == 'all') {
    	location.href = '/muban-251041-366-1.html';
    	return false;
    }
    if ( kw == '美容画册' && searchMode == 'all') {
    	location.href = '/muban-206606-444-1.html';
    	return false;
    }
    if (kw == '价目表' && searchMode == 'all') {
    	location.href = '/muban-143555-592-1.html';
    	return false;
    }
    if (kw == 'ae片头模板' && searchMode == 'all') {
    	location.href = '/video-sousuo-303190-0-1-all-complex-0-0-0.html';
    	return false;
    }
    if (kw == '视频' && searchMode == 'all') {
    	location.href = '/video-sousuo-0-0-1-all-popular-0-0-0.html';
    	return false;
    }
    if (kw == 'ae模板' && searchMode == 'all') {
    	location.href = '/video-sousuo-393891-2-1-all-popular-0-0-0.html';
    	return false;
    }
    if (kw == '相册模板' && searchMode == 'all') {
    	location.href = '/video-sousuo-303279-5-1-all-complex-0-0-0.html';
    	return false;
    }
    if (kw == '延时视频' && searchMode == 'all') {
    	location.href = '/video-sousuo-2816166-1-1-0-0-0.html';
    	return false;
    }
    if (kw == '电影片头' && searchMode == 'all') {
    	location.href = '/media/video-dianyingpiantou.html';
    	return false;
    }
    if (kw == '会声会影模板' && searchMode == 'all') {
    	location.href = '/video-sousuo-1966971-3-1-all-popular-0-0-0.html';
    	return false;
    }
    if (kw == '视频素材' && searchMode == 'all') {
    	location.href = '/video-sousuo-306707-0-1-all-popular-0-0-0.html';
    	return false;
    }
    if (kw == '婚礼视频' && searchMode == 'all') {
    	location.href = '/video-sousuo-392353-0-1-all-complex-0-0-0.html';
    	return false;
    }
    if (kw == 'mg动画' && searchMode == 'all') {
    	location.href = '/media/video-622567.html';
    	return false;
    }
    if (kw == '会声会影x9' && searchMode == 'all') {
    	location.href = '/video-sousuo-6078543-3-1-all-new-0-0-0.html';
    	return false;
    }
    if (kw == '免费视频' && searchMode == 'all') {
    	location.href = '/media/video-mianfeishipin.html';
    	return false;
    }
    if (kw == '婚礼背景视频' && searchMode == 'all') {
    	location.href = '/media/video-hunlibeijing.html';
    	return false;
    }
    if (kw == '颁奖背景视频' && searchMode == 'all') {
    	location.href = '/media/video-banjiangbeijing.html';
    	return false;
    }
    if (kw == 'logo演绎' && searchMode == 'all') {
    	location.href = '/media/video-logoyanyi.html';
    	return false;
    }
    if (kw == 'ae片头' && searchMode == 'all') {
    	location.href = '/video-sousuo-312834-2-1-all-complex-0-0-0.html';
    	return false;
    }
    if (kw == '年会倒计时' && searchMode == 'all') {
    	location.href = '/video-sousuo-2027129-0-1-all-complex-0-0-0.html';
    	return false;
    }
    if (kw == '电影特效' && searchMode == 'all') {
    	location.href = '/media/video-dianyingtexiao.html';
    	return false;
    }
    if (kw == '婚庆片头' && searchMode == 'all') {
    	location.href = '/media/video-2251329.html';
    	return false;
    }
    if (kw == '年会视频' && searchMode == 'all') {
    	location.href = '/video-sousuo-1948821-0-1-all-complex-0-0-0.html';
    	return false;
    }
    if (kw == '片尾字幕' && searchMode == 'all') {
    	location.href = '/media/video-pianweizimu.html';
    	return false;
    }
    if (kw == '字幕模板' && searchMode == 'all') {
    	location.href = '/video-sousuo-3826783-0-1-all-popular-0-0-0.html';
    	return false;
    }
    if (kw == '震撼片头' && searchMode == 'all') {
    	location.href = '/video-sousuo-3045775-2-1-0-0-0.html';
    	return false;
    }
    if (kw == '电子相册' && searchMode == 'all') {
    	location.href = '/media/video-xiangce.html';
    	return false;
    }
    if (kw == '震撼' && searchMode == 'all') {
    	location.href = '/video-sousuo-248336-2-1-all-popular-0-0-0.html';
    	return false;
    }
    if (kw == '背景音乐' && searchMode == 'all') {
    	location.href = '/media/soundtrack-beijingyinyue.html';
    	return false;
    }
    if (kw == '轻音乐' && searchMode == 'all') {
    	location.href = '/media/soundtrack-qingyinyue.html';
    	return false;
    }
    if (kw == '纯音乐' && searchMode == 'all') {
    	location.href = '/media/soundtrack-491498.html';
    	return false;
    }
    if (kw == '婚礼配乐' && searchMode == 'all') {
    	location.href = '/media/soundtrack-hunli.html';
    	return false;
    }
    if (kw == '音效' && searchMode == 'all') {
    	location.href = '/soundeffect/';
    	return false;
    }
    if (kw == '生日ppt' && searchMode == 'all') {
    	location.href = '/office/ppt-shengri.html';
    	return false;
    }
    if (kw == '婚礼ppt' && searchMode == 'all') {
    	location.href = '/office/ppt-hunli.html';
    	return false;
    }
    if (kw == '快闪ppt' && searchMode == 'all') {
    	location.href = '/office/ppt-kuaishan.html';
    	return false;
    }
    if (kw == '相册ppt' && searchMode == 'all') {
    	location.href = '/office/ppt-xiangce.html';
    	return false;
    }
    if (kw == '小清新ppt' && searchMode == 'all') {
    	location.href = '/office/ppt-xiaoqingxin.html';
    	return false;
    }
    if (kw == '中国风ppt' && searchMode == 'all') {
    	location.href = '/office/ppt-zhongguofeng.html';
    	return false;
    }
    if (kw == '微立体ppt' && searchMode == 'all') {
    	location.href = '/office/ppt-734496.html';
    	return false;
    }
    if (kw == '简约ppt' && searchMode == 'all') {
    	location.href = '/muban-0-263-1-316-0-0-0-0-0.html';
    	return false;
    }
    if (kw == '党建ppt' && searchMode == 'all') {
    	location.href = '/office/ppt-dangjian.html';
    	return false;
    }
    if (kw == '企业ppt' && searchMode == 'all') {
    	location.href = '/office/ppt-qiye.html';
    	return false;
    }
    if (kw == '商务ppt' && searchMode == 'all') {
    	location.href = '/office/ppt-shangwu.html';
    	return false;
    }
    if (kw == '商业计划书ppt' && searchMode == 'all') {
    	location.href = '/office/ppt-shangyejihuashu.html';
    	return false;
    }
    if (kw == '企业宣传ppt' && searchMode == 'all') {
    	location.href = '/muban-0-263-1-0-307-0-0-0-0.html';
    	return false;
    }
    if (kw == '工作总结ppt' && searchMode == 'all') {
    	location.href = '/office/ppt-gongzuozongjie.html';
    	return false;
    }
    if (kw == '年终总结' && searchMode == 'all') {
        location.href = '/office/ppt-nianzhongzongjie.html';
        return false;
    }
    if (kw == '工作计划ppt' && searchMode == 'all') {
    	location.href = '/office/ppt-394663.html';
    	return false;
    }
    if (kw == '课件ppt' && searchMode == 'all') {
    	location.href = '/office/ppt-313580.html';
    	return false;
    }
    if (kw == '家长会ppt' && searchMode == 'all') {
    	location.href = '/office/ppt-jiazhanghui.html';
    	return false;
    }
    if (kw == '答辩ppt' && searchMode == 'all') {
    	location.href = '/office/ppt-325046.html';
    	return false;
    }
    if (kw == '2019ppt' && searchMode == 'all') {
    	location.href = '/muban-2130342-263-complex-all-0-all-all-1-0-0-0-0-0-0-all-all.html';
    	return false;
    }
    if (kw == '新年ppt' && searchMode == 'all') {
    	location.href = '/office/ppt-xinnian.html';
    	return false;
    }
    if (kw == '年会ppt' && searchMode == 'all') {
    	location.href = '/office/ppt-nianhui.html';
    	return false;
    }
    if (kw == '颁奖ppt' && searchMode == 'all') {
    	location.href = '/office/ppt-banjiang.html';
    	return false;
    }
    if ( (kw == '手抄报' || kw == '小报') && searchMode == 'all') {
    	location.href = '/muban-0-355-1-0-661-0-0-0-0.html';
    	return false;
    }
    if ( (kw == '字体下载' || kw == '字体设计' || kw == '字体元素')&& searchMode == 'all') {
    	location.href = '/sucai/zitiyuansu.html';
    	return false;
    }
    if (kw == '摄影图' && searchMode == 'all') {
    	location.href = '/tupian/photo-so.html';
    	return false;
    }
    if (kw == '封面背景' && searchMode == 'all') {
    	location.href = '/chahua-0-337-1-365-0-0-0-0-0.html';
    	return false;
    }
    if ( kw == '建筑插画' && searchMode == 'all') {
    	location.href = '/tupian/chahua-jianzhu.html';
    	return false;
    }
    if ( kw == '促销海报' && searchMode == 'all') {
        location.href = '/vector-0-366-popular-all-0-all-all-1-0-373-0-0-0-0-all-all.html';
        return false;
    }
    if ( kw == '节气海报' && searchMode == 'all') {
        location.href = '/vector-260092-366-1.html';
        return false;
    }
    if ( kw == '节日海报' && searchMode == 'all') {
        location.href = '/vector-150250-366-1.html';
        return false;
    }
    if ( kw == '地产海报' && searchMode == 'all') {
        location.href = '/vector-0-366-1-0-374-0-0-0-0.html';
        return false;
    }
    if ( kw == '美食海报' && searchMode == 'all') {
        location.href = '/vector-0-366-1-0-375-0-0-0-0.html';
        return false;
    }
    if ( kw == '教育海报' && searchMode == 'all') {
        location.href = '/vector-0-366-1-0-376-0-0-0-0.html';
        return false;
    }
    if ( kw == '招聘海报' && searchMode == 'all') {
        location.href = '/vector-0-366-1-0-377-0-0-0-0.html';
        return false;
    }
    if ( kw == '旅游海报' && searchMode == 'all') {
        location.href = '/vector-0-366-1-0-379-0-0-0-0.html';
        return false;
    }
    if ( kw == '化妆品海报' && searchMode == 'all') {
        location.href = '/vector-0-366-1-0-381-0-0-0-0.html';
        return false;
    }
    if ( kw == '中国风海报' && searchMode == 'all') {
        location.href = '/vector-0-366-1-0-387-0-0-0-0.html';
        return false;
    }
    if ( kw == '健身海报' && searchMode == 'all') {
        location.href = '/vector-175529-366-1.html';
        return false;
    }
    if ( kw == '运动海报' && searchMode == 'all') {
        location.href = '/vector-102239-366-1.html';
        return false;
    }
    if ( kw == '汽车海报' && searchMode == 'all') {
        location.href = '/vector-0-366-1-0-384-0-0-0-0.html';
        return false;
    }
    if ( kw == '公益海报' && searchMode == 'all') {
        location.href = '/vector-0-366-1-0-383-0-0-0-0.html';
        return false;
    }
    if ( kw == '企业文化海报' && searchMode == 'all') {
        location.href = '/vector-0-366-1-0-382-0-0-0-0.html';
        return false;
    }
    if ( kw == '党建海报' && searchMode == 'all') {
        location.href = '/vector-0-366-1-0-378-0-0-0-0.html';
        return false;
    }
    if ( kw == '医疗海报' && searchMode == 'all') {
        location.href = '/vector-72271-366-1.html';
        return false;
    }
    if ( kw == '美容海报' && searchMode == 'all') {
        location.href = '/vector-206606-366-1.html';
        return false;
    }
    if ( kw == '美妆海报' && searchMode == 'all') {
        location.href = '/vector-246068-366-1.html';
        return false;
    }
    if ( kw == '饮料海报' && searchMode == 'all') {
        location.href = '/vector-132653-366-1.html';
        return false;
    }
    if ( kw == '风景海报' && searchMode == 'all') {
        location.href = '/vector-218808-366-1.html';
        return false;
    }
    if ( kw == '中医海报' && searchMode == 'all') {
        location.href = '/vector-130800-366-1.html';
        return false;
    }
    if ( kw == '秋冬上新' && searchMode == 'all') {
        location.href = '/tupian/muban-qiudongshangxin.html';
        return false;
    }
    if ( kw == '册子' && searchMode == 'all') {
        location.href = '/vector-4076108-444-1.html';
        return false;
    }
    if ( kw == '公司画册' && searchMode == 'all') {
        location.href = '/vector-4076108-444-1.html';
        return false;
    }
    if ( kw == '折页设计' && searchMode == 'all') {
        location.href = '/vector-254584-592-1.html';
        return false;
    }
    if ( kw == 'dm单' && searchMode == 'all') {
        location.href = '/chuandan.html';
        return false;
    }
    if ( kw == 'dm单页' && searchMode == 'all') {
        location.href = '/chuandan.html';
        return false;
    }
    if ( kw == '双十一页面' && searchMode == 'all') {
        location.href = '/vector-246397-668-1.html';
        return false;
    }
    if ( kw == '双十一承接页' && searchMode == 'all') {
        location.href = '/vector-246397-668-1.html';
        return false;
    }
    if ( kw == '封皮' && searchMode == 'all') {
        location.href = '/vector-0-444-1-0-780-0-0-0-0.html';
        return false;
    }
    if ( kw == '公司背景墙' && searchMode == 'all') {
        location.href = '/vector-266772-443-1.html';
        return false;
    }
    if ( kw == 'ae模版' && searchMode == 'all') {
        location.href = '/media/videoae.html';
        return false;
    }
    if ( kw == '绘声绘影' && searchMode == 'all') {
        location.href = '/video-sousuo-1966971-3-1-all-popular-0-0-0.html';
        return false;
    }
    if ( kw == 'pr模版' && searchMode == 'all') {
        location.href = '/media/videopr.html';
        return false;
    }
    if ( kw == 'ae片头模版' && searchMode == 'all') {
        location.href = '/video-sousuo-303190-0-1-all-complex-0-0-0.html';
        return false;
    }
    if ( kw == '相册模版' && searchMode == 'all') {
        location.href = '/video-sousuo-303279-5-1-all-complex-0-0-0.html';
        return false;
    }
    if ( kw == '会声会影模版' && searchMode == 'all') {
        location.href = '/video-sousuo-1966971-3-1-all-popular-0-0-0.html';
        return false;
    }
    if ( kw == '字幕模版' && searchMode == 'all') {
        location.href = '/video-sousuo-3826783-0-1-all-popular-0-0-0.html';
        return false;
    }
    if ( kw == '公司历程' && searchMode == 'all') {
        location.href = '/media/video-shijianzhou.html';
        return false;
    }
    if ( kw == '启动' && searchMode == 'all') {
        location.href = '/phoneMap-qidongye-1-0-0-0-0-complex-all-0-all-0-all-all.html';
        return false;
    }
    if ( kw == '启动页' && searchMode == 'all') {
        location.href = '/phoneMap-qidongye-1-0-0-0-0-complex-all-0-all-0-all-all.html';
        return false;
    }
    if ( kw == '开屏页' && searchMode == 'all') {
        location.href = '/phoneMap-kaipingye-1-0-0-0-0-complex-all-0-all-0-all-all.html';
        return false;
    }
    if ( kw == '引导页' && searchMode == 'all') {
        location.href = '/phoneMap-kaipingye-1-0-0-0-0-complex-all-0-all-0-all-all.html';
        return false;
    }
    if ( kw == '专题' && searchMode == 'all') {
        location.href = '/zhuanti.html';
        return false;
    }
        if ( kw == '新年视频' && searchMode == 'all') {
            location.href = '/media/video-143090.html';
            return false;
        }
        if ( kw == '视频背景' && searchMode == 'all') {
            location.href = '/media/videobjsp.html';
            return false;
        }
        if ( kw == '抽奖背景' && searchMode == 'all') {
            location.href = '/media/video-choujiang.html';
            return false;
        }
        if ( kw == '动感背景' && searchMode == 'all') {
            location.href = '/video-sousuo-247821-7-1-0-0-0.html';
            return false;
        }
        if ( kw == '图片展示' && searchMode == 'all') {
            location.href = '/media/video-954790.html';
            return false;
        }
        if ( kw == '年会抽奖' && searchMode == 'all') {
            location.href = '/media/video-choujiang.html';
            return false;
        }
        if ( kw == '产品宣传' && searchMode == 'all') {
            location.href = '/media/video-chanpinxuanchuan.html';
            return false;
        }
        if ( kw == '倒数' && searchMode == 'all') {
            location.href = '/video-all-0-0-1-all-complex-2-0.html';
            return false;
        }
        if ( kw == 'LED屏幕' && searchMode == 'all') {
            location.href = '/media/videobjsp.html';
            return false;
        }
        if ( kw == '春节视频' && searchMode == 'all') {
            location.href = '/media/video-chunjie.html';
            return false;
        }
        if ( kw == '喜庆视频' && searchMode == 'all') {
            location.href = '/media/video-xiqingshipin.html';
            return false;
        }
        if ( kw == '图片汇聚' && searchMode == 'all') {
            location.href = '/media/video-tupianhuiju.html';
            return false;
        }
        if ( kw == '图片视频' && searchMode == 'all') {
            location.href = '/media/video-tupianshipin.html';
            return false;
        }
    var searchUrl = "//699pic.com/search/getKwInfo";

    $.get(searchUrl, {'kw': kw}, function(rep){

        if (searchMode == 'photo') {

            //location.href = "//699pic.com/photo-" + rep.kwid + "-0-1.html";
            location.href = "//699pic.com/tupian/photo-" + rep.pinyin + ".html";

        } else if (searchMode == 'chahua') {

            //location.href = "//699pic.com/chahua-" + rep.kwid + "-0-1.html";
            location.href = "//699pic.com/tupian/chahua-" + rep.pinyin + ".html";

        } else if (searchMode == 'muban') {

            // location.href = "//699pic.com/muban-" + rep.kwid + "-0-1.html";
            location.href = "//699pic.com/tupian/muban-" + rep.pinyin + ".html ";

        } else if (searchMode == 'video') {

             location.href = "//699pic.com/video-sousuo-" + rep.kwid + "-0-1.html";

        } else if (searchMode == 'originality') {

            //location.href = "//699pic.com/originality-" + rep.kwid + "-0-1.html";
            location.href = "//699pic.com/tupian/chuangyi-" + rep.pinyin + ".html ";

        } else if (searchMode == 'PPT') {

            // location.href = "//699pic.com/muban-" + rep.kwid + "-263-1.html";
             location.href = "//699pic.com/office/ppt-" + rep.pinyin + ".html ";


        } else if (searchMode == 'word') {

            // location.href = "//699pic.com/muban-" + rep.kwid + "-355-1.html";
            location.href = "//699pic.com/office/word-" + rep.pinyin + ".html ";

        }else if (searchMode == 'peitu') {

            // location.href = "//699pic.com/muban-" + rep.kwid + "-355-1.html";
            // location.href = "//699pic.com/phoneMap-" + rep.pinyin + "-1-0-0-0-0-complex-all-0-all-0-all-all.html";
            location.href = "//699pic.com/tupian/peitu-" + rep.pinyin +".html";
        } else if (searchMode == 'yuansu') {

            // location.href = "//699pic.com/muban-" + rep.kwid + "-355-1.html";
            location.href = "//699pic.com/tupian/sucai-" + rep.pinyin + ".html";

        } else if (searchMode == 'gif') {
            location.href = "//699pic.com/tupian/gif-" + rep.pinyin + ".html";
        }
         else {

            location.href = "//699pic.com/tupian/" + rep.pinyin + ".html";

        }

    });
};
var getzhi='';
var searchSugHtml='';
var now_model = 'all';
function loadSugSearchWords(word) {
	searchSugCurrentOffset = 0;
	mode = $('#pic_form_search_model').val();
	if(getzhi !==word || now_model != mode){
		$.get('/word_completion.php',{keyword:word,type:mode},function(response){
	    	var responseResult = $.parseJSON(response);
	        if (responseResult.status == 1) {
	        	searchSugHtml='';
	            for(var key in responseResult.data) {
	                searchSugHtml += '<ul class="sug_sokeyup_1 sug"><li class="sug_sokeyup_2 sug-text">' + key + '</li><li class="sug_sokeyup_3">' + responseResult.data[key] + '结果</li></ul>';
	            }
	            getzhi=word;
	            now_model = mode;
	            if (searchSugHtml != '') {
	            	$(".search-sug").html(searchSugHtml).show();
	            } else {
	            	$(".search-sug").hide();
	            }
	            $('.search-hot').hide();
	        }
	    });
	}else{
	    $(".search-sug").html(searchSugHtml).show();
	    $('.search-hot').hide();
	}
}
/*
    function loadHotSearchWords() {
        searchSugCurrentOffset = 0;
        var search_mode = $('#pic_form_search_model').val();
        if (CONFIG.is_index > 0) {
            var response = window.localStorage && localStorage.getItem('hot_search_words');
            if (response != void 0) {
                if (response.indexOf('++') > -1) {
                    var arr  = response.split('++');
                    var html = arr[0];
                    var expire = arr[2];
                    var time = (new Date()).valueOf()/1000;
                    var kws = str = url = '';
                    if (parseInt(time)  < parseInt(expire) ) {
                        kws = env.getCookie('recent_search_data') && env.getCookie('recent_search_data').split(',');
                        for(var i in kws) {
                            if (kws[i] != void 0) {
                                url += '<a class="sug" href="javascript:;"><span  class="sug-text rsss">'+decodeURI(kws[i])+'</span></a>'
                            }
                        }
                        if (url != '') {
                            str += '<div class="dateseek"  pic-click-type="sug-list"><span class="iconseek"></span><span class="seekcol">最近搜索：</span>'+url+'</div>';
                        }
                        if(search_mode != 'muban')
                        {
                            str += HTMLDecode(html)
                        }
                        $(".search-hot").html('');
                        $(".search-hot").html(str).show();
                        $(".search-sug").hide();
                        $(".search-sug").html('');
                        return ;
                    }
                }
            }
            $.get('/hot_search_word.php', function(response){
                var str = url = '';
                if (response != '' && window.localStorage) {
                    var _html = HTMLEncode(response);
                    localStorage.setItem('hot_search_words',_html);
                }
                if (response.indexOf('++') > -1) {
                    var arr  = response.split('++');
                    var html = arr[0];
                } else {
                    var html = response;
                }
                // 获取Cookie存的值
                kws = env.getCookie('recent_search_data') && env.getCookie('recent_search_data').split(',');
                for(var i in kws) {
                    if (kws[i] != void 0) {
                        url += '<a class="sug" href="javascript:;"><span  class="sug-text rsss">'+decodeURI(kws[i])+'</span></a>';
                    }
                }
                if (url != '') {
                    str += '<div class="dateseek"  pic-click-type="sug-list"><span class="iconseek"></span><span class="seekcol">最近搜索：</span>'+url+'</div>';
                }
                str += html;
                $(".search-hot").html('');
                $(".search-hot").html(str).show();
                $(".search-sug").hide();
                $(".search-sug").html('');
            });
        }
    }
*/
/*
    function loadHotSearchWords() {
    	searchSugCurrentOffset = 0;
        var search_mode = $('#pic_form_search_model').val();
        if (CONFIG.is_index > 0) {
            var kws = str = url = hot_str = '';
        	key = 'hot_search_words_' + search_mode;
        	var reici = env.getCookie(key);
        	var history_s = false;
            kws = env.getCookie('recent_search_data') && env.getCookie('recent_search_data').split(',');
            if (kws){
            	for(var i in kws) {
            		if (kws[i] != void 0) {
            			url += '<a class="sug" href="javascript:;"><span  class="sug-text rsss">'+decodeURI(kws[i])+'</span></a>'
	                }
	            }
	            if (url != '') {
	            	str += '<div class="dateseek"  pic-click-type="sug-list"><span class="iconseek"></span><span class="seekcol">最近搜索：</span>'+url+'</div>';
	            }
	            history_s = true;
            }

            if (reici) {
            	reici = reici.split('++');
            	var k = 0;
            	for(var i in reici) {
            		if (reici[i] != void 0){
            			o = reici[i].split(',');
            			k++;
            			if (k <= 3) {
            				hot_str += '<a href="javascript:env.search(\''+o[1]+'\',false);" >';
            				hot_str += '<ul class="hot_sokeyup_1"><li class="hot-word-no"><div class="box-c'+k+'">'+k+'</div></li>';
            				hot_str += '<li pic-click-type="pick-sug" class="hot_sokeyup_2 hot-word-text sug-text">'+o[1]+'</li>';
            				hot_str += '<li class="hot_sokeyup_3">'+o[2]+'结果</li></ul></a>';
            			} else {
            				hot_str += '<a href="javascript:env.search(\''+o[1]+'\',false);" >';
            				hot_str += '<ul class="hot_sokeyup_1"><li class="hot-word-no"><div class="box-cn">'+k+'</div></li>';
            				hot_str += '<li pic-click-type="pick-sug" class="hot_sokeyup_2 hot-word-text sug-text">'+o[1]+'</li>';
            				hot_str += '<li class="hot_sokeyup_3">'+o[2]+'结果</li></ul></a>';
            			}
            		}
            	}
            	str += hot_str;
            	history_s = true;
            } else {
            	history_s = false;
            }

            if (history_s) {
	            $(".search-hot").html('');
	            $(".search-hot").html(str).show();
	            $(".search-sug").hide();
	            $(".search-sug").html('');
	            return false;
            }

            $.get('/hot_search_word.php?type='+search_mode, function(response){
            	if (response.status == 1) {
            		searchSugHtml= '';
	                searchHotCookie = new Array();
	                response.data = JSON.parse(response.data);
	                var k = 0;
	                for(var i in response.data) {
            			k++;
            			if (k <= 3) {
            				hot_str += '<a href="javascript:env.search(\''+response.data[i].kw+'\',false);" >';
            				hot_str += '<ul class="hot_sokeyup_1"><li class="hot-word-no"><div class="box-c'+k+'">'+k+'</div></li>';
            				hot_str += '<li pic-click-type="pick-sug" class="hot_sokeyup_2 hot-word-text sug-text">'+response.data[i].kw+'</li>';
            				hot_str += '<li class="hot_sokeyup_3">'+response.data[i].result+'结果</li></ul></a>';
            			} else {
            				hot_str += '<a href="javascript:env.search(\''+response.data[i].kw+'\',false);" >';
            				hot_str += '<ul class="hot_sokeyup_1"><li class="hot-word-no"><div class="box-cn">'+k+'</div></li>';
            				hot_str += '<li pic-click-type="pick-sug" class="hot_sokeyup_2 hot-word-text sug-text">'+response.data[i].kw+'</li>';
            				hot_str += '<li class="hot_sokeyup_3">'+response.data[i].result+'结果</li></ul></a>';
            			}
            			searchHotCookie.push(k+','+response.data[i].kw+','+response.data[i].result);
	            	}
	                $(".search-hot").html('');
	                $(".search-hot").html(str+hot_str).show();
		            $(".search-sug").hide();
		            $(".search-sug").html('');
	                if (hot_str !='') {
	                	env.setCookie(key, searchHotCookie.join('++') , 7200);
	                }
            	} else {
            		$(".search-hot").html('');
    	            $(".search-hot").html(str).show();
    	            $(".search-sug").hide();
    	            $(".search-sug").html('');
            	}
            }, 'json');
        }
    }
*/
	function loadHotSearchWords(){
		searchSugCurrentOffset = 0;
        var search_mode = $('#pic_form_search_model').val();
        console.log(search_mode);
		if (CONFIG.is_index > 0) {
	    	var localKey = 'new_hot_search_words_';
	    	var cookieKey = 'recent_search_data';
	    	var response = window.localStorage && localStorage.getItem(localKey+search_mode);
	    	if (response != void 0) {
	            if (response.indexOf('++') > -1) {
	                var arr  = response.split('++');
	                var html = arr[0];
	                var expire = arr[1];
	                var time = (new Date()).valueOf()/1000;
	                var expire = expire / 1000;
	                var kws = str = url = '';
	                if (parseInt(time) - parseInt(expire) < 3600 ) {
	                    kws = env.getCookie(cookieKey) && env.getCookie(cookieKey).split(',');
	                    if (kws) {
	                    	for(var i in kws) {
	                    		if (kws[i] != void 0) {
	                    			url += '<a class="sug" href="javascript:;"><span  class="sug-text rsss">'+decodeURI(kws[i])+'</span></a>'
	        	                }
	        	            }
	        	            if (url != '') {
	        	            	str += '<div class="dateseek"  pic-click-type="sug-list"><span class="iconseek"></span><span class="seekcol">最近搜索：</span>'+url+'</div>';
	        	            }
	                    }
	                    str += HTMLDecode(html)
	                    $(".search-hot").html('');
	                    $(".search-hot").html(str).show();
	                    $(".search-sug").hide();
	                    $(".search-sug").html('');
	                    return ;
	                }
	            }
	        }

	        var kws = str = url = hot_str = '';
	        kws = env.getCookie(cookieKey) && env.getCookie(cookieKey).split(',');
	        if (kws){
	        	for(var i in kws) {
	        		if (kws[i] != void 0) {
	        			url += '<a class="sug" href="javascript:;"><span  class="sug-text rsss">'+decodeURI(kws[i])+'</span></a>'
	                }
	            }
	            if (url != '') {
	            	str += '<div class="dateseek"  pic-click-type="sug-list"><span class="iconseek"></span><span class="seekcol">最近搜索：</span>'+url+'</div>';
	            }
	        }
	        $.get('/hot_search_word.php?type='+search_mode, function(response){
	        	if (response.status == 1) {
	        		searchSugHtml= '';
	                searchHotCookie = new Array();
	                response.data = JSON.parse(response.data);
	                var k = 0; var hot_str = '';
	                for(var i in response.data) {
	        			k++;
	        			if (k <= 3) {
	        				hot_str += '<a href="'+response.data[i].url+'" >';
	        				hot_str += '<ul class="hot_sokeyup_1"><li class="hot-word-no"><div class="box-c'+k+'">'+k+'</div></li>';
	        				hot_str += '<li pic-click-type="pick-sug" class="hot_sokeyup_2 hot-word-text sug-text">'+response.data[i].kw+'</li>';
	        				hot_str += '<li class="hot_sokeyup_3">'+response.data[i].result+'结果</li></ul></a>';
	        			} else {
	        				hot_str += '<a href="'+response.data[i].url+'" >';
	        				hot_str += '<ul class="hot_sokeyup_1"><li class="hot-word-no"><div class="box-cn">'+k+'</div></li>';
	        				hot_str += '<li pic-click-type="pick-sug" class="hot_sokeyup_2 hot-word-text sug-text">'+response.data[i].kw+'</li>';
	        				hot_str += '<li class="hot_sokeyup_3">'+response.data[i].result+'结果</li></ul></a>';
	        			}
	        			//searchHotCookie.push(k+','+response.data[i].kw+','+response.data[i].result);
	            	}

	                $(".search-hot").html('');
	                $(".search-hot").html(str+hot_str).show();
		            $(".search-sug").hide();
		            $(".search-sug").html('');
	                if (hot_str !='') {
	                	//env.setCookie(key, searchHotCookie.join('++') , 7200);
	                	var _html = HTMLEncode(hot_str)+'++'+(new Date()).valueOf();
	                    localStorage.setItem(localKey+search_mode,_html);
	                }
	        	} else {
	        		$(".search-hot").html('');
		            $(".search-hot").html(str).show();
		            $(".search-sug").hide();
		            $(".search-sug").html('');
	        	}
	        }, 'json');
	    }
	}


    $('.search-btn').click(function(){
        var mode = $('#pic_form_search_model').val();
        var kw = $('#searchinput').val();
        env.search(kw,mode);
        return false;
    });

    $('[pic-click-type="sug-list"]').on('mousedown', '.sug', function(e) {
        var pickSugWord = $(this).children('.sug-text').html();
        var mode = $('#pic_form_search_model').val();
        $('[pic-click-type="sug-list"]').hide();
        env.search(pickSugWord,mode);
        return false;
    });

	var iptzhi=dingshi = '';
    $('#searchinput').focus(function(e) {

        var searchInput = $(this);
        var searchKeyWord = searchInput.val();
        if ($.trim(searchKeyWord).length == 0  ) {

            loadHotSearchWords();

        } else {
            loadSugSearchWords(searchKeyWord);

        }

    }).blur(function(e) {

        $('.search-sug').hide();
        $('.search-sug').html('');

        setTimeout("$('.search-hot').hide();", 180);

        $('.search-sug .sug').removeClass('search-sug-pick');
        $('.search-hot .sug').removeClass('search-sug-pick');

    }).keyup(function(e){
    	var iths=$(this)
    	clearTimeout(dingshi);
    	dingshi=setTimeout(function(){
    		var searchInput = iths;
            var searchKeyWord = searchInput.val();
            if ($.trim(searchKeyWord).length == 0  ){
                loadHotSearchWords();
            } else {
                loadSugSearchWords(searchKeyWord);
            }
    	},500);
    	/*
        var searchInput = $(this);
        var searchKeyWord = searchInput.val();

        var keyCode = -1;

        if (window.event) {
            keyCode = window.event.keyCode;
        } else {
            keyCode = e.which;
        }



        if (keyCode == 40 || keyCode == 38 || keyCode == 13) {

            var currentSugList = null;
            var currentSugListSize = 0;

            var hotSugList = $('.search-hot .sug');
            var sugList = $('.search-sug .sug');

            if (hotSugList.size() > 0) {

                currentSugList = hotSugList;
                currentSugListSize = hotSugList.size();

            } else {

                currentSugList = sugList;
                currentSugListSize = sugList.size();

            }

            if (keyCode == 40) {

                if (currentSugList) {

                    if (searchSugCurrentOffset > currentSugListSize) {

                        searchSugCurrentOffset = 0;

                        searchInput.val(currentSugList.eq(currentSugListSize)
                                .css("background-color", "#eeeff2")
                                .children('.sug-text')
                                .html()
                        );

                        currentSugList.eq(searchSugCurrentOffset).css("background-color", "#fff");

                    } else {

                        searchInput.val(currentSugList.eq(searchSugCurrentOffset)
                                .css("background-color", "#eeeff2")
                                .children('.sug-text')
                                .html()
                        );

                        currentSugList.eq(searchSugCurrentOffset - 1).css("background-color", "#fff");

                        searchSugCurrentOffset++;

                    }

                }

            } else if (keyCode == 38) {

                if (currentSugList) {

                    searchSugCurrentOffset--;

                    if (searchSugCurrentOffset < 1) {

                        searchSugCurrentOffset = currentSugListSize;
                        searchInput.val(currentSugList.eq(currentSugListSize - 1)
                                .css("background-color", "#eeeff2")
                                .children('.sug-text')
                                .html()
                        );
                        currentSugList.eq(0).css("background-color", "#fff");

                    } else {

                        currentSugList.eq(searchSugCurrentOffset).css("background-color", "#fff");
                        searchInput.val(currentSugList.eq(searchSugCurrentOffset - 1)
                                .css("background-color", "#eeeff2")
                                .children('.sug-text')
                                .html()
                        );

                    }

                }

            } else if (keyCode == 13) {

                $('.search-hot').hide();
                $('.search-sug').hide();
                $('.search-hot').html('');
                $('.search-sug').html('');

            }

        } else {
            loadSugSearchWords(searchKeyWord);

        }
        */
    });

    function HTMLEncode(html) {
        var temp = document.createElement("div");
        (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
        var output = temp.innerHTML;
        temp = null;
        return output;
    }


    //反转义
    function HTMLDecode(text) {
        var temp = document.createElement("div");
        temp.innerHTML = text;
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    }


/**********搜索end********************/


/**右侧栏start******************************/

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

});


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

$('.send-reference').hover(function(){
    $('.dropbox-close-btn').css('background','none');
},function(){});

$('.fixed-send-vip').hover(function(){
    $(this).addClass('hover-opened');
    $(this).removeClass('normal-opened');
},function(){
    $(this).removeClass('hover-opend');
});

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

/**个人vip提醒start***********/
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
/**个人vip提醒end***********/


function webJumpPhone()
{

    if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent)))
    {

                var currentUrl = location.href;

                if (currentUrl.indexOf('#pc') < 0 && !env.getCookie('_is_from_phone'))
                {

                    //图片详情url转换
                    var detailMatch = currentUrl.match(/tupian-(\d+).html/);
                    var cateMatchPt = /(animals|architecture|backgrounds|beauty|business|computer|education|emotions|food|health|industry|music|nature|people|places|religion|science|sports|transportation|travel|other|car|army|plant|game|holiday|interiordesign|landmarks|artdesign).html/;
                    var cateMap = {
                        'animals' : 1,
                        'architecture':2,
                        'backgrounds':3,
                        'beauty':4,
                        'business':5,
                        'computer':6,
                        'education':7,
                        'emotions':8,
                        'food':9,
                        'health':10,
                        'industry':11,
                        'music':12,
                        'nature':13,
                        'people':14,
                        'places':15,
                        'religion':16,
                        'science':17,
                        'sports':18,
                        'transportation':19,
                        'travel':20,
                        'other':21,
                        'car':22,
                        'army':23,
                        'plant':24,
                        'game':25,
                        'holiday':26,
                        'interiordesign':27,
                        'landmarks':28,
                        'artdesign':29
                    };
                    if (detailMatch) {

                        window.location.href = '//m.699pic.com/photo/detail/' + detailMatch[1];

                    } else if (/\/best.html/.test(currentUrl)) {

                        //精品页面
                        window.location.href = '//m.699pic.com/column/prime'

                    } else if (/new.html/.test(currentUrl)) {

                        //新增页面
                        window.location.href = '//m.699pic.com/column/Latest';

                    } else if (cateMatchPt.test(currentUrl)) {

                        //分类页面跳转
                        var match = currentUrl.match(cateMatchPt);

                        if (match) {

                            var cateEnName = match[1];

                            window.location.href = '//m.699pic.com/category?category=' + cateMap[cateEnName];

                        }

                    } else {

                        window.location.href='//m.699pic.com';

                    }

                } else {
                    env.setCookie('_is_from_phone',1,7200);
                }
    }

}




/*加载百度统计和时间的代码*/
function loadtime(){
    load_data.end_time  = load_data.now();
    load_data.load_time = (load_data.end_time - load_data.start_time) / 1000;
    $(".load_time").text(load_data.load_time);
}

function PVTJ(){
    webJumpPhone();
    loadtime();
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?ddcd8445645e86f06e172516cac60b6a";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();

    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?1154154465e0978ab181e2fd9a9b9057";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();

    _hmt.push(['_setAccount', 'ddcd8445645e86f06e172516cac60b6a']);

    (function(){
        var bp = document.createElement('script');
        bp.src = '//push.zhanzhang.baidu.com/push.js';
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
    })();
}

//顶部搜索项选择
$('.select-show,.select-drop').hover(function() {
    $('.select-drop').show();
    }, function() {
    $('.select-drop').hide();
    })
    $('.select-drop li').click(function() {
    $(this).hide().siblings('li').show().parents('.select-drop').hide();
    $('.sch-value').text($(this).text());
})