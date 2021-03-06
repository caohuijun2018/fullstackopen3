$(window).load(function() {
  var onloadUrl = '//ajax.699pic.com/?c=AjaxPublic&a=index';
  var uniqid = SpCusCookie.getCookie('user_uniqid');
  if (!uniqid) {
    var uniqid = genID(16);
    SpCusCookie.setCookie('user_uniqid', uniqid, 365, 1);
  }
  $.ajax({
    type: 'get',
    url: onloadUrl,
    jsonp: "jsonp",
    data: {
      word: globalStatic.word,
      source: globalStatic.source,
      sem: globalStatic.sem,
      uid: globalStatic.uid,
      page: globalStatic.newpage,
      getIp: globalStatic.getIp,
      ip: globalStatic.ip,
      domain: globalStatic.httpReferer,
      sem_kid: globalStatic.sem_kid,
      sem_type: globalStatic.sem_type,
      is_user_login: globalStatic.is_user_login,
      url: globalStatic.url,
      uniqid: uniqid,
      json_data: globalStatic.jsonData
    },
    dataType: "jsonp",
    success: function(data) {}
  })
  // 是否来自上一页的点击浏览
  var getPrevIndex = SpCusCookie.getCookie('prevClickAjax');
  if (getPrevIndex && JSON.parse(getPrevIndex)['index']) {
    var tempResult = JSON.parse(getPrevIndex);
    globalStatic.page = tempResult['page'];
    globalStatic.index = tempResult['index'];
    fetchTraceFn(1, tempResult['sid'], tempResult['page'], tempResult['index']);
    if(CONFIG['page_type'] === '4' && $('.freedownload-downloadbtn').length > 0) {
      $('.freedownload-downloadbtn').attr({'data-ajax-index': tempResult['index']});
    }
    SpCusCookie.deleteCookie('prevClickAjax');
  } else {
    fetchTraceFn(1, globalStatic.sid, globalStatic.page, 0);
  }

  var getSearchFrom = SpCusCookie.getCookie('searchFromAjax');
  if (getSearchFrom && JSON.parse(getSearchFrom)['search_from']) {
    var tempResult = JSON.parse(getSearchFrom);
    fetchTraceFn(2, tempResult['sid'], 0, 0, tempResult['search_from']);
    SpCusCookie.deleteCookie('searchFromAjax');
  }

  if (CONFIG['page_type'] == "2") {
    SpCusCookie.setCookie('prevPageSid', globalStatic.sid, 1, 1);
  }
})
$('body').on('click', '.certificate', function() {
  var oPid = $(this).attr('data-pid');
  var tempIndex = $(this).parents('.list').index();
  fetchTraceFn(4, globalStatic.sid, globalStatic.page, tempIndex, 0, 0, oPid, 1);
})

$('body').on('click', '.list, .imgLibox', function() {
  var oIndex = $(this).index();
  var tempRes = {
    index: oIndex + 1,
    sid: Number(globalStatic.sid),
    page: Number(globalStatic.page)
  }
  SpCusCookie.setCookie('prevClickAjax', JSON.stringify(tempRes), 1, 1);
})
$('body').on('click', '.down-btn-common', function() {
  var oIndex = $(this).parents('.list').index();
  if ($(this).attr('href') && $(this).attr('href').indexOf('javascript:') == -1) {
    var tempRes = {
      index: oIndex + 1,
      sid: Number(globalStatic.sid),
      page: Number(globalStatic.page)
    }
    SpCusCookie.setCookie('prevClickAjax', JSON.stringify(tempRes), 1, 1);
    return
  }
  var getPrevSid = SpCusCookie.getCookie('prevPageSid') || 0;
  var oFrom = 3;
  var oPid = $(this).attr('data-fetch-id');
  var oType = $(this).attr('data-fetch-type');
  if ($(this).hasClass('down-from-search')) {
    oFrom = 1;
  } else if ($(this).hasClass('down-from-detail')) {
    oFrom = 2;
  } else if ($(this).hasClass('down-from-know')) {
    oFrom = $(this).attr('data-downid');
  }
  var tempIndex = oIndex + 1;
  if (oFrom == 2) {
    tempIndex = $('.freedownload-downloadbtn:eq(0)').attr('data-ajax-index');
  }
  if (globalStatic.sid && globalStatic.sid !== "0") {
    fetchTraceFn(3, globalStatic.sid, globalStatic.page, tempIndex, 0, oType, oPid, oFrom);
  } else {
    fetchTraceFn(3, getPrevSid,  globalStatic.page, tempIndex, 0, oType, oPid, oFrom);
  }
})
function saveSearchCookie(key) {
  var tempRes = {
    sid: Number(globalStatic.sid),
    search_from: key
  }
  SpCusCookie.setCookie('searchFromAjax', JSON.stringify(tempRes), 1, 1);
}
$('body').on('click', '.search-suggest_item, .sugWord-block .sugWord-list a', function() {
  saveSearchCookie(2);
});
$('body').on('click', '.search-hotwords_item, .pullDown-search .hotWord-list a', function() {
  saveSearchCookie(3);
});
$('body').on('click', '.search-history .search-recent_local span, .pullDown-search .historyList-search a', function() {
  saveSearchCookie(4);
});
$('body').on('click', '.result-search_release span', function() {
  saveSearchCookie(5);
});
$('body').on('click', '.result-bot_tip span', function() {
  saveSearchCookie(6);
});
$('body').on('click', '.alikesearchbox a', function() {
  saveSearchCookie(7);
});
$('body').on('click', '.photo-info-other a, .dldd a', function() {
  if (!$(this).hasClass('show-all')) {
    saveSearchCookie(8);
  }
});
$('body').on('click', '.search-office_r', function() {
  saveSearchCookie(10);
});
$('body').on('click', '.header-search_btn', function() {
  saveSearchCookie(11);
});

if (CONFIG['page_type'] === '2') {
  // 他在搜索页
  $('body').on('click', '.imgshow .list', function () {
    var tempId = $(this).attr('data-id');
    SpCusCookie.setCookie('enterDetail', tempId, 1, 1)
  })
} else if (CONFIG['page_type'] === '4') {
  var tempId = location.pathname.split('-')[1].split('.')[0];
  var idFromSearch = SpCusCookie.getCookie('enterDetail');
  if(idFromSearch && idFromSearch == tempId) {
    $('body').on('click', '#detail_free_download_btn,[video-op-type="download-video"],.music-download-btn,.resource-download-btn,.imgshow .popup .downimg', function () {
      SpCusCookie.setCookie('enterDetailDown', tempId, 1, 1)
    })
  } else {
    SpCusCookie.setCookie('enterDetailDown', 0, 1, 1)
  }
}


/**
  *
  * @Fn {any} fetchTraceFn: 自定义事件上报
  * @param {number} eventType: 事件类型: 1(浏览) / 2(搜索) / 3(下载)
  * @param {number} index: 点击的DOM序列号, 1 / 2 / 3 ......
  * @param {number} search_from: 搜索来源:
  *  1）搜索框主动输入
  *  2）搜索框联想搜索
  *  3）搜索框下拉词搜索
  *  4）搜索框搜索历史搜索
  *  5）顶部搜索推荐词
  *  6）底部搜索推荐词
  *  7）图片紧贴着下面的相关搜索
  *  8）详情页底部标签点击搜索
  *  9）空搜
  *  10）视频首页-主动搜索
  *  11）视频头部搜索
  * @param {number} download_from: 下载来源
  *  1）1-下载来自列表页
  *  2）2-下载来自详情页
  *  4）4-下载详情页底部推荐下载
  *  5）5-下载来自下载成功落地弹框
  *  6）6-下载来自首页瀑布流
  *  7）7-下载来自搜索无结果热门图片推荐
  *  8）8-下载来自以图搜图
  *  9）9-下载来自猜你喜欢落地页
  *  10）10-下载来自单张售卖下载记录
  *  11）11-下载来自下载排行榜
  *  12）12-下载来自精品页
  *  13）13-下载来自SEO专辑页
  *  14）14-下载来自新图速递
  *  15）15-下载来自模特专辑 / 运营专题 / 收藏页面
  *  16）16-下载来自摄影师主页
  *  17）17-下载来自摄影师相册
  *  18）18-下载来自视频首页
  *  19）19-下载来自视频专辑
  *  20）20-下载来自统搜推荐专辑
  *  21）21-下载来自单张购买成功
  *  3）3-其他 默认值
  */
function fetchTraceFn(eventType, sid, page, index, search_from, pic_type, pid, download_from) {
  var uniqid = SpCusCookie.getCookie('user_uniqid')
  if (!uniqid) {
    var uniqid = genID(16)
    SpCusCookie.setCookie('user_uniqid', uniqid, 365, 1)
  }
  var tempParams = {
    uid: globalStatic.uid,
    event: eventType,
    referer: document.referrer,
    referer_page: globalStatic.referer_page,
    new_page: globalStatic.newpage,
    uniqid: uniqid,
    url: globalStatic.url,
    from: 1,
    act_layer:globalStatic.act_layer
  }
  switch (eventType) {
    case 1:
      tempParams['sid'] = sid
      tempParams['page'] = page
      tempParams['index'] = index || 0
      break
    case 2:
      tempParams['sid'] = globalStatic.sid
      tempParams['search_from'] = search_from || 0
      break
    case 3:
      tempParams['sid'] = sid
      tempParams['pid'] = pid
      tempParams['pic_type'] = pic_type
      tempParams['download_from'] = download_from || 0
      var isDownonDetail = SpCusCookie.getCookie('enterDetailDown')
      if (download_from == 1 || (download_from == 2 && isDownonDetail)) {
        tempParams['page'] = page
        tempParams['index'] = index
      } else {
        tempParams['page'] = 0
        tempParams['index'] = 0
      }
      break
    case 4:
      tempParams['sid'] = sid
      tempParams['pid'] = pid
      tempParams['vip_type'] = static_vip_type || ''
  }
  // 包月用户轨迹
  if(globalStatic.newpage != '' && globalStatic.newpage.indexOf('vip:allTypeVip') == 0){
        tempParams['period_deduction'] = show_period_month_vip;
    }
  $.ajax({
    type: 'post',
    url: '//ajax.699pic.com/index.php?c=AjaxPublic&a=eventBrowse',
    jsonp: 'json',
    data: tempParams,
    success: function() {}
  })
}

// 首页甄选人像埋点
$('body').on('click', '.zxrx-main-link', function () {
    ajaxRenXiang('10001');
});
$('body').on('click', '.classify10 .nav-typebox a:not(.nav-boxTitle)', function () {
    ajaxRenXiang('10002');
});
$('body').on('click', '.zxrx-drop .nav-imgbox a,.classify10 .nav-typebox a.nav-boxTitle', function () {
    ajaxRenXiang('10003');
});
$('body').on('click', '.min-search-block .zxrx-li', function () {
    ajaxRenXiang('10004');
});

   // 人像突出简版埋点统计
$('body').on('click', '.min-search-block .zxrx-li', function () {
    ajaxRenXiang('10004');
});
$('body').on('click', '.filter-item-person a:eq(0)', function () {
    ajaxRenXiang('10005');
});
$('body').on('click', '.filter-item-person a:eq(1)', function () {
    ajaxRenXiang('10006');
});
$('body').on('click', '.filter-item-person a:eq(2)', function () {
    ajaxRenXiang('10007');
});
$('body').on('click', '.filter-item-area a:eq(0)', function () {
    ajaxRenXiang('10008');
});
$('body').on('click', '.filter-item-area a:eq(1)', function () {
    ajaxRenXiang('10009');
});
$('body').on('click', '.filter-item-area a:eq(2)', function () {
    ajaxRenXiang('10010');
});
$('body').on('click', '.filter-item-area:eq(0)', function () {
    ajaxRenXiang('10011');
});
$('body').on('click', '.filter-item-area:eq(1)', function () {
    ajaxRenXiang('10012');
});
$('body').on('click', '.filter-item-area:eq(2)', function () {
    ajaxRenXiang('10013');
});
$('body').on('click', '.filter-item-plateType a:eq(0)', function () {
    ajaxRenXiang('10014');
});
$('body').on('click', '.filter-item-plateType a:eq(1)', function () {
    ajaxRenXiang('10015');
});
$('body').on('click', '.filter-item-plateType a:eq(2)', function () {
    ajaxRenXiang('10016');
});

// 侧边栏优惠券埋点
$('body').on('click', '.Rigmidle-button.discounts', function () {
    ajaxRenXiang('10017');
});
// logo点击埋点
$('body').on('click', '.index-logo,.header-left .logo', function () {
    ajaxRenXiang('10018');
});

function ajaxRenXiang (clickName) {
    $.ajax({
        type: "post",
        url: "//ajax.699pic.com/index.php?c=AjaxPublic&a=clickPoint",
        data: {
            from: '',
            click: clickName,
            uid: CONFIG['uid'],
            uniqid: SpCusCookie.getCookie('uniqid')
        },
        dataType: "dataType",
        success: function (response) {

        }
    });
};
(function(b,a,e,h,f,c,g,s){b[h]=b[h]||function(){(b[h].c=b[h].c||[]).push(arguments)};
b[h].s=!!c;g=a.getElementsByTagName(e)[0];s=a.createElement(e);
s.src="//s.union.360.cn/"+f+".js";s.defer=!0;s.async=!0;g.parentNode.insertBefore(s,g)
})(window,document,"script","_qha",375926,false);