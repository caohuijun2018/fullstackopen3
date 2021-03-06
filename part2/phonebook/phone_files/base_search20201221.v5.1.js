// pv 引导
if (!env.isLogin) {
    var visitedTimeNoLogin = SpCusCookie.getCookie('visited_times');
    if (visitedTimeNoLogin) {
        visitedTimeNoLogin++;
        if (visitedTimeNoLogin == 3) {
            var loginReady = setInterval(function () {
                if (env.login) {
                    clearInterval(loginReady)
                    env.login()
                }
            })
        }
    } else {
        visitedTimeNoLogin = 1;
    }
    SpCusCookie.setCookie('visited_times', visitedTimeNoLogin, 1, 1);
};
// sem from 引导
$(document).ready(function() {
    var semFrom = getQueryString('from')
    if (semFrom && !env.isLogin) {
        typeof env.login != 'undefined' && env.login();
        $('#login-box_home .login-box_close').hide()
        setTimeout(function() {
            $('#login-box_home .login-box_close').fadeIn()
        }, 3000)
    }
});
/* 顶部导航切换*/
$('body').on('mouseenter','.creativityClassify',function(){
    $(this).addClass('on').siblings('.creativityClassify').removeClass('on');
});
$('body').on('mouseenter','.min-search-li.jingxuan',function(){
    $('.min-search-li.jingxuan .creativityClassify').eq(0).addClass('on');
});
$('body').on('mouseleave','.min-search-block',function(){
    $('.min-search-li .creativityClassify').removeClass('on');
    if($(this).parents('.min-search-li').hasClass('jingxuan')){
        $('.min-search-li.jingxuan .creativityClassify').eq(0).addClass('on');
    }
});
// 以图搜图
$('body').on('click', '.select-pic_search', function (ev) {
    $.getJSON('/shitu/uploadAuth', function (data) {
        $('input[name="policy"]').val(data['policy']);
        $('input[name="authorization"]').val(data['authorization']);
    });
    $('#file').click();
    $('body').on('change', '#file', function () {
        var val = $(this).val();
        if (!val) return;
        $('.put-img-hint').show();
        $('.uploading').show();
        $('.error-hint').hide();
        $('#photo_search').submit();
    });
    Mark = null;
    if (window.ActiveXObject || 'ActiveXObject' in window) {
        setInterval(function () {
            var val = $('#file').val();
            if (val != '' && Mark == void 0) {
                $('.put-img-hint').show();
                $('.uploading').show();
                $('.error-hint').hide();
                Mark = 1;
                $('#photo_search').submit();
            }
        }, 500);
    }
    var oEvent = ev || event;
    if (oEvent && oEvent.stopPropagation) { //非IE
        oEvent.stopPropagation();
    } else { //IE
        window.event.cancelBubble = true;
    }
});
$('body').on('mouseover', '.drop-box_item', function (event) {
    event.preventDefault();
    window.dropTimer && clearTimeout(window.dropTimer);
    $('.drop-box_content').hide();
    $(this).find('.drop-box_content').show();
});
$('body').on('mouseout', '.drop-box_item', function (event) {
    event.preventDefault();
    window.dropTimer = setTimeout(function () {
        $('.drop-box_content').hide();
    }, 200);
});
var oGlobalType = $('#pic_form_search_model').val();
$.each($('.header-search .header-search_tag .drop-box_content li'), function (index, val) {
    if ($(val).attr('data-type') == oGlobalType) {
        $(val).hide();
    }
});
/*if (CONFIG['uid'] > 0) {
    $.ajax({
        type: 'post',
        url: '//ajax.699pic.com/?c=AjaxPublic&a=getUnreadNum',
        jsonp: "callback",
        dataType: "jsonp",
        success: function (d) {
            if (d.status == true && d.num > 0) {
                $(".news_num").show();
            } else {
                $(".news_num").hide();
            }
        }
    });
}*/
$(".news_hover").off("mouseenter");
$(".news_hover").off("mouseleave");
$(".news_hover").off("mouseover");
$(".news_hover").off("mouseout");
var is_ajax, news_show, news_hide = '';
$(".InMail-block").on("mouseenter.sp_base", function () {
    clearTimeout(news_hide);
    news_show = setTimeout(function () {
        $(".news_wrapper").attr("data", "show");
        var show = $(".news_wrapper").attr("data");
        if (show == 'show') {
            $(".news_wrapper").show();
            if (is_ajax) return;
            $.ajax({
                type: 'post',
                url: '//699pic.com/dongtai/getAllInfo',
                success: function (d) {
                    if (d.status == true) {
                        is_ajax = true;
                        $(".null_content").hide();
                        $(".news_wrapper").html(d.html);
                    }
                }
            })
        }
    }, 500);
}).on("mouseleave", function () {
    clearTimeout(news_show);
    news_hide = setTimeout(function () {
        $(".news_wrapper").attr("data", '');
        var hide = $(".news_wrapper").attr("data");
        if (hide == '') {
            $(".news_wrapper").hide();
        }
    }, 500);
});
// GLOBAL Event Emit
var customEvent = (function () {
    var events = {}
    function on (evt, handler) {
        events[evt] = events[evt] || []
        events[evt].push({
            handler: handler
        })
    }
    function trigger (evt, args) {
        if (!events[evt]) {
            return
        }
        for (var i = 0;i < events[evt].length;i++) {
            events[evt][i].handler(args)
        }
    }
    return {
        on: on,
        trigger: trigger
    }
})();
// 自定义 LocalStorage 处理（有过期时间功能）
function customLocalStorage () {
    this.set = function (key, value) {
        var curTime = new Date().getTime();
        localStorage.setItem(key, JSON.stringify({ data: value, time: curTime }));
    }
    this.get = function (key, exp) {
        var data = localStorage.getItem(key);
        if (data) {
            var dataObj = JSON.parse(data);
            if (!exp) {
                var dataObjDatatoJson = dataObj.data
                return dataObjDatatoJson;
            }
            if (new Date().getTime() - dataObj.time > exp) {
                console.log('信息已过期');
                customEvent.trigger('local_remove', key);
            } else {
                var dataObjDatatoJson = dataObj.data
                return dataObjDatatoJson;
            }
        } else {
            customEvent.trigger('local_remove', key);
        }
    },
        this.remove = function (key) {
            localStorage.removeItem(key);
        }
};
// 动态处理 input 的 placeholder
function handleInputPlaceHolder (oType) {
    $('.search-promote').length > 0 && $('.search-promote').show();
    var oPlaceHolder = '';
    if (oType) {
        switch (oType) {
            case 'all': oPlaceHolder = '近期新增' + CONFIG['recentPhotoNum'] + '张，搜索发现更多'; break;
            case 'photo': oPlaceHolder = '从优质照片中找到你的灵感'; break;
            case 'chahua': oPlaceHolder = '有些画，我们只动了手，而你却动了心'; break;
            case 'originality': oPlaceHolder = '表达创意的方式不止一种'; break;
            case 'muban': oPlaceHolder = '设计探索未来'; break;
            case 'video': oPlaceHolder = '海量精选视频音频，让创意活起来'; $('.search-promote').length > 0 && $('.search-promote').hide();break;
            case 'PPT': oPlaceHolder = '高效办公不加班'; $('.search-promote').length > 0 && $('.search-promote').hide();break;
            case 'peitu': oPlaceHolder = '正版精品手机配图'; break;
            case 'yuansu': oPlaceHolder = '正版精品免抠元素'; break;
            case 'gif': oPlaceHolder = '让图片动起来'; break;
            case 'music': oPlaceHolder = '为创意注入BGM用听觉感动，搜索发现更多'; $('.search-promote').length > 0 && $('.search-promote').hide();break;
            case 'renxiang' : oPlaceHolder = '精选海内外高品质人像，搜索发现更多';break;
            case 'video' : oPlaceHolder = '海量优质视频素材让创意活起来，搜索发现更多';break;
            case 'shipai' : oPlaceHolder = '精选超清8k实拍视频，搜索发现更多';break;
            case 'ziti' : oPlaceHolder = '精选正版商用字体，搜索发现更多';break;
            default: oPlaceHolder = '近期新增' + CONFIG['recentPhotoNum'] + '张，搜索发现更多'; break;
        }
    } else {
        oPlaceHolder = '近期新增' + CONFIG['recentPhotoNum'] + '张，搜索发现更多';
    }
    $('#search-input').attr('placeholder', oPlaceHolder);
}
handleInputPlaceHolder($('#selfSearchMode').val());
// addEventListen 兼容写法
var addEvent = function (element, type, handler) {
    if (element.addEventListener) {
        addEvent = function (element, type, handler) {
            element.addEventListener(type, handler, false);
        };
    } else if (element.attachEvent) {
        addEvent = function (element, type, handler) {
            element.attachEvent('on' + type, handler);
        };
    } else {
        addEvent = function (element, type, handler) {
            element['on' + type] = handler;
        };
    }
    addEvent(element, type, handler);
};
// isArray POLYFILL
if (!Array.isArray) {
    Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
function stopDefault (e) {
    //阻止默认浏览器动作(W3C)
    if (e && e.preventDefault) {
        //火狐的 事件是传进来的e
        e.preventDefault();
    }
    //IE中阻止函数器默认动作的方式
    else {
        //ie 用的是默认的event
        event.returnValue = false;
    }
}
// -------GLOBAL Event Emit End-------

// Event Listener
$('body').on('click', '.search-top_navs p span', function(event) {
    event.preventDefault();
    var oValue = $('#search-input').val();
    $('#pic_form_search_model').val($(this).attr('data-type'));
    handleSearch(oValue);
});
$('body').on('click', '.header-search_tag .drop-box_content li', function (event) {
    if($(this).attr('data-type') == 'ziti'){
        window.open('/ziti/list.html')
        return ;
    };
    event.preventDefault();
    $('#pic_form_search_model').val($(this).attr('data-type'));
    $(this).parents('.drop-box_content').hide();
    $(this).hide().siblings().show();
    $(this).parents('.drop-box_item').find('.drop-box_top span').text($(this).find('span').text())
    handleInputPlaceHolder($(this).attr('data-type'));
});
$('body').on('click', '.result-search_release span, .result-bot_tip span', function (event) {
    event.preventDefault();
    var oValue = $(this).text();
    handleSearch(oValue);
});
var throttleBool = null;
var isSearchPage = $('#isSearchPage').val();
var needScrollHeight = $('.sea-nav-m').outerHeight() + 40 + 174;
$(window).resize(function (event) {
    needScrollHeight = $('.sea-nav-m').outerHeight() + 40 + 174;
});
$(window).scroll(function (event) {
    throttleBool && clearTimeout(throttleBool);
    throttleBool = setTimeout(function () {
        var scrollTop = $(this).scrollTop();
        if (scrollTop > needScrollHeight && isSearchPage == 2) {
            $('#sp-header').css('position', 'fixed');
            $('#sp-header').addClass("header_move");
        } else {
            $('#sp-header').css('position', 'absolute');
            $('#sp-header').removeClass("header_move");
        }
    }, 12)
});

$('.seek-select').hover(function () {
    $('.select-list').show()
}, function () {
    $('.select-list').hide()
});
$('body').on('mouseover', '.search-suggest_item', function (event) {
    $('.search-suggest_item').removeClass('active');
    $(this).addClass('active');
});
$('body').on('click', '.search-suggest_item', function (event) {
    event.preventDefault();
    event.stopPropagation();
    var oValue = $(this).find('.search-suggest_name').text();
    handleSearch(oValue);
});

var timerInputKeyup = '';
$('body').on('keyup', '#search-input', function (event) {
    event.preventDefault();
    var oValue = $.trim($(this).val());
    var keyCode = event.keyCode;
    var oActiveIndexHolder = $(".search-suggest_item.active ").index();
    var oActiveIndexHot = $(".search-hotwords_item.active ").index();
    if ($('.search-release').css("display") == "block") {
        if (keyCode == 38) {
            if (oActiveIndexHolder <= 0) {
                oActiveIndexHolder = $(".search-suggest_item").length;
            }
            oActiveIndexHolder--;
            $(this).val($(".search-suggest_item:eq(" + oActiveIndexHolder + ") .search-suggest_name").text());
            $(".search-suggest_item").removeClass('active');
            $(".search-suggest_item:eq(" + oActiveIndexHolder + ")").addClass('active');
            stopDefault(event);
            return
        } else if (keyCode == 40) {
            if (oActiveIndexHolder == $(".search-suggest_item").length - 1) {
                oActiveIndexHolder = -1;
            }
            oActiveIndexHolder++;
            $(this).val($(".search-suggest_item:eq(" + oActiveIndexHolder + ") .search-suggest_name").text());
            $(".search-suggest_item").removeClass('active');
            $(".search-suggest_item:eq(" + oActiveIndexHolder + ")").addClass('active');
            stopDefault(event);
            return
        }
    }

    if ($('.search-rec').css("display") == "block") {
        // keyCode 38 上 40 下
        if (keyCode == 38) {
            if (oActiveIndexHot <= 0) {
                oActiveIndexHot = $(".search-hotwords_item").length;
            }
            oActiveIndexHot--;
            $(this).val($(".search-hotwords_item:eq(" + oActiveIndexHot + ") .search-hotwords_name").text());
            $(".search-hotwords_item").removeClass('active');
            $(".search-hotwords_item:eq(" + oActiveIndexHot + ")").addClass('active');
            stopDefault(event);
            return
        } else if (keyCode == 40) {
            if (oActiveIndexHot == $(".search-hotwords_item").length - 1) {
                oActiveIndexHot = -1;
            }
            oActiveIndexHot++;
            $(this).val($(".search-hotwords_item:eq(" + oActiveIndexHot + ") .search-hotwords_name").text());
            $(".search-hotwords_item").removeClass('active');
            $(".search-hotwords_item:eq(" + oActiveIndexHot + ")").addClass('active');
            stopDefault(event);
            return
        }
    }
    timerInputKeyup && clearTimeout(timerInputKeyup);
    timerInputKeyup = setTimeout(function () {
        if (keyCode == 13) {
            var oBaiduKey = CONFIG['baiduCusKey'] || 'index-search';
            var oBaiduValue = CONFIG['baiduCusValue'] || '首页搜索';
            var oWebKey = CONFIG['webCusKey'] || 'index-search';
            var oWebValue = CONFIG['webCusValue'] || 'click';
            CONFIG['webCusKey'] && successDownTjV3(oWebKey, oWebValue);
            handleSearch(oValue);
            _hmt.push(['_trackEvent', oBaiduKey, 'submit', oBaiduValue]);
        }
        if (!oValue) {
            $('.search-release').hide();
            $('.search-rec').show();
            handleNoHolderWords();
            return
        }
        $('.search-rec').hide();
        ajaxSearchHolderWords(oValue, function (response) {
            renderSearchHolderWords(response);
        })
    }, 500)
});
$('body').on('click', '.header-search_btn', function (event) {
    event.preventDefault();
    var oValue = $.trim($('#search-input').val());
    var oBaiduKey = CONFIG['baiduCusKey'] || 'index-search';
    var oBaiduValue = CONFIG['baiduCusValue'] || '首页搜索';
    var oWebKey = CONFIG['webCusKey'] || 'index-search';
    var oWebValue = CONFIG['webCusValue'] || 'click';
    CONFIG['webCusKey'] && successDownTjV3(oWebKey, oWebValue);
    handleSearch(oValue);
    _hmt.push(['_trackEvent', oBaiduKey, 'submit', oBaiduValue]);
});
$('body').on('focus', '#search-input', function (event) {
    event.preventDefault();
    // if($('#sp-header').css('position') == 'fixed') {
    //     $('.result-toast').hide();
    // }
    if ($.trim($(this).val()) == '') {
        $('.search-rec').show();
        handleNoHolderWords();
    } else {
        $('.search-rec').hide();
        ajaxSearchHolderWords($.trim($(this).val()), function (response) {
            renderSearchHolderWords(response);
        })
    }
});
$('body').on('blur', '#search-input', function (event) {
    event.preventDefault();
    // if($('#sp-header').css('position') == 'fixed') {
    //     $('.result-toast').show();
    // }
    setTimeout(function () {
        $('.search-rec').hide();
        $('.search-release').hide();
    }, 180)
});
$('body').on('click', '.search-history span', function (event) {
    event.preventDefault();
    handleSearch($(this).text());
});

// -------Event Listener End-------
// AJAX Fn
/* 获取搜索词 推荐词
 * @word: 实时输入的字词
 * @callback: 获得数据后的回调
 */
function ajaxSearchHolderWords (word, callback) {
    var oType = $('#pic_form_search_model').val();
    $.ajax({
        url: devAjaxPrefix + '/word_completion.php',
        type: 'get',
        dataType: 'json',
        data: {
            keyword: word,
            type: oType
        },
        success: function (data) {
            if (data.status == 1) {
                callback && callback(data.data);
            }
        },
        error: function (error) {
            console.log(error);
        }
    })
}
/* 请求热门搜索词
 * @type: 分类 e.g: all / photo / chahua / originality / muban / video / PPT / peitu / yuansu
 * @callback: 获得数据后的回调
 */
function ajaxSearchHotWords (type, callback) {
    $.ajax({
        url: devAjaxPrefix + '/hot_search_word.php?type=' + type,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            if (data.status == 1) {
                var oData = JSON.parse(data.data);
                if (oData.length > 0) {
                    callback && callback(oData);
                } else {
                    callback && callback(null);
                }
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
}
// -------AJAX Fn End-------

// Render Fn
function renderSearchHolderWords (oData) {
    var oDom = '';
    if (oData) {
        if (Array.isArray(oData) && oData.length === 0) {
            $('.search-release').hide();
            return
        }
        for (var i in oData) {
            oDom += '<a class="search-suggest_item"><span class="search-suggest_name fl">' + i + '</span><span class="search-suggest_num fr">' + oData[i] + '结果</span></a>'
        }
        $('.search-suggest').html(oDom);
        $('.search-release').show();
    }
}
function renderSearchHotWords (data) {
    var oHotWords = '';
    if (data) {
        $.each(data, function (index, val) {
            var isFirstThree = '';
            if (index < 3) {
                isFirstThree = 'special ';
            }
            oHotWords += '<a href="' + val.url + '" class="search-hotwords_item"><span class="' + isFirstThree + 'rank-index">' + val.index + '</span><span class="search-hotwords_name">' + val.kw + '</span><span class="search-hotwords_num fr">' + val.result + '结果</span></a>'
        });
    } else {
        $('.search-rec').css({
            'border-radius': '10px',
            'overflow': 'hidden'
        });
        $('.search-hotwords').css('padding', '0');
    }
    $('.search-hotwords').html(oHotWords);
}
function renderRecentSearch () {
    var lastRecentSearch = window.localStorage.getItem('recent_search_data');
    if (lastRecentSearch) {
        $('.search-history').show();
        lastRecentSearch = JSON.parse(lastRecentSearch);
        var oDomSearch = '';
        if (lastRecentSearch && lastRecentSearch.length > 0) {
            $.each(lastRecentSearch, function (index, val) {
                oDomSearch += '<span>' + val + '</span>';
            });
            $('.search-history .search-recent_local').html(oDomSearch);
            return
        }
    } else {
        $('.search-history').hide();
    }
}
renderRecentSearch();
// -------Render Fn End-------


// Page content js
var customLocalStorage = new customLocalStorage();
var devAjaxPrefix = "";
function handleNoHolderWords () {
    if (CONFIG.is_index > 0) {
        var oType = $('#pic_form_search_model').val();
        var localKey = 'search_hot_words_' + oType;
        var response = customLocalStorage.get(localKey, 2 * 3600 * 1000);
        if (response) {
            if(oType == "renxiang" || oType == "shipai"  || oType == "music" || oType == "ziti"){
                renderSearchHotWords(null);
            }else{
                renderSearchHotWords(JSON.parse(response));
            }
        } else {
            renderSearchHotWords(null);
        }
    }
}
customEvent.on('local_remove', function (key) {
    // 删除对应的 localStorage item值
    customLocalStorage.remove(key);
    // ajaxNewData
    var oType = key.split('search_hot_words_')[1]
    ajaxSearchHotWords(oType, function (data) {
        if (data == null) {
            $('.search-hotwords').html(oHotWords);
            customLocalStorage.set(key, null);
            return
        }
        renderSearchHotWords(data);
        // then 重新设置 key值
        customLocalStorage.set(key, JSON.stringify(data));
    })
});

// 删除html标签
function delHtmlTag(str) {
    return str.replace(/<[^>]+>/g,"").replace(/ /g,'');
}
window.friendValue = {
    "大暑海报":"/tupian/muban-333520.html","小暑海报":"/tupian/muban-330067.html","夏至海报":"/tupian/muban-xiazhi.html","芒种海报":"/tupian/muban-mangzhong.html","小满海报":"/tupian/muban-xiaoman.html","立夏海报":"/tupian/muban-lixia.html","谷雨海报":"/tupian/muban-guyu.html","清明海报":"/tupian/muban-qingming.html","春分海报":"/tupian/muban-chunfen.html","惊蛰海报":"/tupian/muban-jingzhe.html","雨水海报":"/tupian/muban-yushui.html","立春海报":"/tupian/muban-lichun.html","大寒海报":"/tupian/muban-dahan.html","小寒海报":"/tupian/muban-xiaohan.html","冬至海报":"/tupian/muban-246167.html","大雪海报":"/tupian/muban-246167.html","小雪海报":"/tupian/muban-101325.html","立冬海报":"/tupian/muban-lidong.html","霜降海报":"/tupian/muban-shuangjiang.html","寒露海报":"/tupian/muban-hanlu.html","秋分海报":"/tupian/muban-qiufen.html","平安夜海报":"/tupian/muban-pinganye.html","淘宝手机端":"/tbsjmb.html","电商手机端":"/tbsjmb.html","双十一主图":"/tupian/muban-shuangshiyizhutu.html","双11主图":"/tupian/muban-shuang11zhutu.html","双十一电商首页":"/tupian/muban-shuangshiyi.html","双11电商首页":"/tupian/muban-247754.html","重阳节海报":"/tupian/muban-chongyangjie.html","建国70周年海报":"/tupian/muban-jianguo70zhounian.html","国庆节海报":"/tupian/muban-guoqingjie.html","国庆海报":"/tupian/muban-guoqing.html","中秋放假通知":"/tupian/muban-zhongqiufangjiatongzhi.html","中秋节海报":"/tupian/muban-zhongqiujie.html","中秋海报":"/tupian/muban-zhongqiu.html","web首页":"/webjiemian.html","web页面":"/webjiemian.html","web界面":"/webjiemian.html","APP界面":"/appjiemian.html","可视化数据界面":"/tupian/muban-dashuju.html","包装袋":"/muban-0-1258-1-0-1262-0-0-0-0.html","包装盒":"/muban-0-1258-1-0-1259-0-0-0-0.html","手提袋":"/muban-0-1258-1-0-1260-0-0-0-0.html","电商背景":"/dsbj.html","企业文化墙":"/tupian/muban-qiyewenhuaqiang.html","四件套挂画":"/muban-0-443-1-0-882-0-0-0-0.html","婚礼邀请函":"/tupian/muban-hunliyaoqinghan.html","年会邀请函":"/tupian/muban-nianhuiyaoqinghan.html","桌牌":"/tupian/muban-zhuopai.html","垃圾分类海报":"/tupian/muban-lajifenlei.html","海报背景":"/tupian/muban-haibaobeijing.html","电商banner":"/taobaobanner.html","直通车":"/zhitongche.html","淘宝详情":"/tbxqy.html","电商活动":"/dsjr.html","装饰画":"/zhuangshihua.html","背景墙":"/beijingqiang.html","公众号封面":"/peitu/gongzhonghao.html","公众号封面小图":"/tupian/peitu-52138.html","二维码配图":"/tupian/peitu-erweimapeitu.html","照片":"/tupian/photo-so.html","摄影":"/tupian/photo-sheying.html","三维模型":"/tupian/chuangyi-jianmo.html","建模":"/tupian/chuangyi-jianmo.html","c4d":"/tupian/chuangyi-531442.html","垃圾分类手抄报":"/office/word-lajifenlei.html","考勤表":"/office/excel-kaoqinbiao.html","ppt背景":"/ppt/pptbeijing.html","文档模板":"/office/word-wendang.html","信纸背景":"/office/word-xinzhi.html","动态图":"/tupian/gif-so.html","实景动图":"/gif/ziran.html","动态表情包":"/gif/katong.html","公众号动图":"/gif/xinmeiti.html","png":"/tupian/sucai-so.html","免抠素材":"/tupian/sucai-so.html","装饰素材":"/tupian/sucai-zhuangshisucai.html","装饰元素":"/tupian/sucai-so.html","矢量元素":"/sucai/shiliangyuansu.html","毛笔字":"/tupian/sucai-maobizi.html","数字":"/tupian/sucai-shuzi.html","免抠人像":"/sucai/miankourenxiang.html","大事记":"/media/video-185828.html","照片模板":"/media/video-434033.html","短视频":"/video/","ae字幕":"/video-sousuo-125753-2-1-0-0-0.html","pr字幕":"/video-sousuo-125753-5-1-0-0-0.html","ae":"/media/video-292257.html","视频":"/video/","edius":"/media/videoedius.html","小视频":"/media/videowx.html","快闪视频":"/media/video-kuaishan.html","实拍视频":"/media/videospbj.html","高速视频":"/media/videospbj.html","遮罩":"/media/video-919145.html","影视特效":"/media/videospys.html","配乐":"/music/so.html","影视配乐":"/music/so-so-0-0-0-0-0-complex-0-1-93-36.html","游戏配乐":"/music/so-so-0-0-0-0-0-complex-0-1-94-36.html","广告配乐":"/music/so-so-0-0-0-0-0-complex-0-1-95-36.html","宣传片配乐":"/music/so-so-0-0-0-0-0-complex-0-1-96-36.html","节日配乐":"/music/so-so-0-0-0-0-0-complex-0-1-97-36.html","短视频配乐":"/music/so.html","颁奖配乐":"/music/so-so-0-0-0-0-0-complex-0-1-100-36.html","年会配乐":"/music/nianhui.html","企业宣传配乐":"/music/qiyexuanchuan.html","blues":"/music/so-so-73-0-0-0-0-complex-0-1-0-36.html","hip-hop":"/music/so-so-74-0-0-0-0-complex-0-1-0-36.html","r&b":"/music/so-so-75-0-0-0-0-complex-0-1-0-36.html","乡村音乐":"/music/so-so-76-0-0-0-0-complex-0-1-0-36.html","交响乐":"/music/so-so-80-0-0-0-0-complex-0-1-0-36.html","民谣音乐":"/music/so-so-87-0-0-0-0-complex-0-1-0-36.html","民谣":"/music/so-so-87-0-0-0-0-complex-0-1-0-36.html","氛围音乐":"/music/so-so-88-0-0-0-0-complex-0-1-0-36.html","电子乐":"/music/so-so-91-0-0-0-0-complex-0-1-0-36.html","雷鬼":"/music/so-so-92-0-0-0-0-complex-0-1-0-36.html","雷鬼音乐":"/music/so-so-92-0-0-0-0-complex-0-1-0-36.html","欢快配乐":"/music/huankuai.html","音效":"/music/soundeffect-so.html","游戏音效":"/music/soundeffect-so-1-9-0-0.html","转场音效":"/music/soundeffect-783738.html","展板":"/tupian/muban-zhanban.html","展架":"/tupian/muban-zhanjia.html","画册":"/huace.html","动态海报":"/gif/jieri.html","gif":"/gif/","动图":"/gif/","gif动图":"/gif/","gif动图素材":"/gif/","动图素材":"/gif/","gif素材":"/gif/","动态配图":"/gif/","表情包":"/gif/katong.html","插画动图":"/gif/chahua.html","插画gif":"/gif/chahua.html","艺术字":"/sucai/zitiyuansu.html","艺术字体":"/sucai/zitiyuansu.html","漂浮素材":"/tupian/sucai-piaofusucai.html","漂浮元素":"/tupian/sucai-piaofusucai.html","效果素材":"/tupian/sucai-xiaoguo.html","效果元素":"/tupian/sucai-xiaoguoyuansu.html","促销标签":"/tupian/sucai-cuxiaobiaoqian.html","边框":"/tupian/sucai-biankuang.html","装饰图案":"/sucai/biankuangdiwen.html","光效":"/tupian/sucai-guangxiao.html","小报":"/word/xiaobao.html","手抄报":"/word/xiaobao.html","答辩":"/office/ppt-325046.html","信纸":"/office/word-xinzhi.html","汇聚":"/media/video-huiju.html","转场特效":"/media/video-783738.html","led背景":"/media/video-247924.html","文字特效":"/media/video-wenzitexiao.html","ae素材":"/media/videoae.html","倒计时10秒":"/media/video-daojishi10miao.html","ae文字":"/media/video-aezimu.html","ppt图表":"/office/ppt-377759.html","商业计划书":"/office/ppt-shangyejihuashu.html","工作总结":"/office/ppt-gongzuozongjie.html","工作计划":"/office/ppt-394663.html","工作汇报":"/office/ppt-gongzuohuibao.html","自我介绍":"/office/ppt-ziwojieshao.html","职业规划":"/office/ppt-zhiyeguihua.html","述职报告":"/office/ppt-shuzhibaogao.html","招聘ppt":"/office/ppt-zhaopinppt.html","年度总结":"/office/ppt-nianduzongjie.html","毕业论文":"/office/ppt-biyelunwen.html","岗位竞聘":"/office/ppt-gangweijingpin.html","个人述职":"/office/ppt-296177.html","个人总结":"/office/ppt-zongjie.html","幻灯片":"/office/ppt-so.html","计划书":"/office/ppt-jihuashu.html","家长会":"/office/ppt-jiazhanghui.html","开题报告":"/office/ppt-kaitibaogao.html","论文":"/office/ppt-biyedabian.html","年度计划":"/office/ppt-niandujihua.html","年终述职":"/office/ppt-nianzhongshuzhi.html","年终总结":"/office/ppt-nianzhongzongjie.html","新年计划":"/office/ppt-xinnianjihua.html","员工培训":"/office/ppt-yuangong.html","powerpoint":"/office/ppt-powerpoint.html","ppt年会":"/office/ppt-nianhui.html","wpsppt":"/office/ppt-so.html","办公ppt":"/office/ppt-so.html","ppt":"/office/ppt-so.html","ppt模板":"/office/ppt-so.html","ppt模版":"/office/ppt-so.html","科技ppt":"/office/ppt-keji.html","ppt背景":"/ppt/pptbeijing.html","免费ppt":"/office/ppt-so.html","ppt素材":"/office/ppt-so.html","ppt免费":"/office/ppt-so.html","免费ppt模板":"/office/ppt-so.html","红色ppt":"/office/ppt-hongse.html","ppt模板免费":"/office/ppt-so.html","年终总结ppt":"/office/ppt-nianzhongzongjie.html","ppt图标":"/tupian/sucai-tubiao.html","ppt封面":"/office/ppt-so.html","简约ppt":"/office/ppt-jianyue.html","科技感ppt":"/office/ppt-keji.html","快闪ppt":"/office/ppt-kuaishan.html","ppt科技":"/office/ppt-keji.html","颁奖ppt":"/office/ppt-banjiang.html","蓝色ppt":"/office/ppt-lanse.html","旅游ppt":"/office/ppt-lvxing.html","医疗ppt":"/office/ppt-yiliao.html","ppt背景图":"/ppt/pptbeijing.html","ppt图表":"/ppt/tubiao.html","动态ppt":"/office/ppt-so.html","中国风ppt":"/office/ppt-zhongguofeng.html","产品ppt":"/office/ppt-chanpin.html","企业ppt":"/office/ppt-shangwu.html","培训ppt":"/office/ppt-peixun.html","大气ppt":"/office/ppt-shangwu.html","ppt设计":"/office/ppt-so.html","教育ppt":"/office/ppt-jiaoyu.html","卡通ppt":"/office/ppt-katong.html","党建ppt":"/office/ppt-dangjian.html","大数据ppt":"/office/ppt-shuju.html","金融ppt":"/office/ppt-shangye.html","时尚ppt":"/office/ppt-shishang.html","公司介绍ppt":"/office/ppt-shangwu.html","招商ppt":"/office/ppt-shangwu.html","总结ppt":"/office/ppt-nianzhongzongjie.html","汽车ppt":"/office/ppt-qiche.html","美食ppt":"/office/ppt-canyin.html","绿色ppt":"/office/ppt-lvse.html","商业ppt":"/office/ppt-shangwu.html","述职ppt":"/office/ppt-shangwu.html","ppt简约":"/office/ppt-jianyue.html","产品介绍ppt":"/office/ppt-shangwu.html","创意ppt":"/office/ppt-so.html","ppt元素":"/tupian/sucai-pptyuansu.html","ppt蓝色":"/office/ppt-lanse.html","互联网ppt":"/office/ppt-shuju.html","工作汇报ppt":"/office/ppt-huibao.html","ppt商务":"/office/ppt-shangwu.html","公司简介ppt":"/office/ppt-shangwu.html","ppt红色":"/office/ppt-hongse.html","ppt目录":"/office/ppt-so.html","儿童ppt":"/office/ppt-ertong.html","汇报ppt":"/office/ppt-huibao.html","高端ppt":"/office/ppt-jianyue.html","欧美ppt":"/office/ppt-oumei.html","工作总结ppt":"/office/ppt-nianzhongzongjie.html","企业介绍ppt":"/office/ppt-shangwu.html","数据ppt":"/office/ppt-shuju.html","黑色ppt":"/office/ppt-heise.html","ppt快闪":"/office/ppt-kuaishan.html","答辩ppt":"/office/ppt-325046.html","设计ppt":"/office/ppt-jianyue.html","演讲ppt":"/office/ppt-yanjiang.html","古风ppt":"/office/ppt-zhongguofeng.html","ppt相册":"/office/ppt-xiangce.html","ppt动画":"/office/ppt-so.html","餐饮ppt":"/office/ppt-canyin.html","简洁ppt":"/office/ppt-jianyue.html","小清新ppt":"/office/ppt-qingxin.html","生日ppt":"/office/ppt-shengri.html","ppt表格":"/ppt/tubiao.html","公司ppt":"/office/ppt-shangwu.html","房地产ppt":"/office/ppt-fangdichan.html","ppt旅游":"/office/ppt-lvxing.html","黑金ppt":"/office/ppt-heijin.html","毕业答辩ppt":"/office/ppt-325046.html","商务ppt模板":"/office/ppt-shangwu.html","活动ppt":"/office/ppt-huodong.html","科技ppt模板":"/office/ppt-keji.html","图片ppt":"/office/ppt-so.html","相册ppt":"/office/ppt-xiangce.html","手绘ppt":"/office/ppt-katong.html","ppt中国风":"/office/ppt-zhongguofeng.html","发布会ppt":"/office/ppt-shangwu.html","简约ppt模板":"/office/ppt-jianyue.html","极简ppt":"/office/ppt-jianyue.html","会议ppt":"/office/ppt-huiyi.html","视频背景":"/media/videobjsp.html","图片展示":"/media/video-954790.html","led屏幕":"/media/videobjsp.html","春节视频":"/media/video-chunjie.html","喜庆视频":"/media/video-xiqingshipin.html","图片汇聚":"/media/video-tupianhuiju.html","图片视频":"/media/video-tupianshipin.html","新年视频":"/media/video-143090.html","舞台背景视频":"/media/video-164694.html","不打烊":"/tupian/muban-budayang.html","荣誉墙":"/tupian/muban-rongyubang.html","会员卡":"/tupian/muban-huiyuanka.html","vip卡":"/tupian/muban-vipka.html","字体设计":"/sucai/zitiyuansu.html","时间线":"/media/video-480062.html","pr视频模板":"/media/videopr.html","pr素材":"/media/videopr.html","led背景视频":"/media/video-ledbeijingshipin.html","edius模板":"/media/videoedius.html","新闻联播片头":"/media/video-xinwenlianbopiantou.html","婚礼相册":"/media/video-hunlixiangce.html","pr片头":"/video-sousuo-303190-5-1-0-0-0.html","ae视频":"/media/videoae.html","年会音乐":"/music/nianhui.html","视频模板":"/video/","颁奖视频":"/media/video-banjiang.html","动态背景":"/media/videobjsp.html","logo动画":"/media/video-245947.html","免费视频片头":"/media/video-piantou.html","手机海报":"/peitu/haibao.html","banner海报":"/taobaobanner.html","卡通海报":"/tupian/muban-351039.html","画册整套":"/tupian/muban-huacezhengtao.html","画册排版":"/huace.html","画册设计":"/huace.html","书籍封面":"/tupian/muban-shujifengmian.html","杂志封面":"/tupian/muban-zazhifengmian.html","单页":"/chuandan.html","店招":"/tupian/muban-dianzhao.html","温馨提示":"/tupian/muban-wenxintishi.html","中国风画册":"/tupian/muban-425188.html","旅游画册":"/tupian/muban-lvyouhuace.html","学校画册":"/tupian/muban-xuexiaohuace.html","宣传画册":"/tupian/muban-xuanchuanhuace.html","蓝色画册":"/tupian/muban-lansehuace.html","绿色画册":"/tupian/muban-lvsehuace.html","红色画册":"/tupian/muban-hongsehuace.html","招商手册":"/tupian/muban-zhaoshangshouce.html","电商首页":"/tbsy.html","促销banner":"/tupian/muban-324874.html","名片设计":"/tupian/muban-mingpian.html","商务名片":"/tupian/muban-mingpian.html","胸牌":"/tupian/muban-xiongpai.html","工牌":"/tupian/muban-gongpai.html","员工证":"/tupian/muban-yuangongzheng.html","挂牌":"/tupian/muban-guapai.html","科技展板":"/tupian/muban-kejizhanban.html","地产展板":"/tupian/muban-dichanzhanban.html","年会展板":"/tupian/muban-nianhuizhanban.html","围挡":"/tupian/muban-zhanban.html","详情页":"/tbxqy.html","婚礼海报":"/tupian/muban-hunli.html","冬天海报":"/tupian/muban-dongtian.html","冬季海报":"/tupian/muban-dongji.html","儿童海报":"/tupian/muban-ertong.html","简约海报":"/tupian/muban-jianyue.html","绿色海报":"/tupian/muban-lvse.html","护肤品海报":"/tupian/muban-hufupin.html","小清新海报":"/tupian/muban-xiaoqingxin.html","珠宝海报":"/tupian/muban-zhubao.html","海报模板":"/haibao.html","家具海报":"/tupian/muban-jiaju.html","邀请函海报":"/tupian/muban-yaoqinghan.html","健身海报":"/tupian/muban-jianshen.html","健身房海报":"/tupian/muban-jianshenfang.html","蔬菜海报":"/tupian/muban-shucai.html","酒吧海报":"/tupian/muban-jiuba.html","读书海报":"/tupian/muban-dushu.html","科技感海报":"/tupian/muban-keji.html","二维码海报":"/tupian/muban-erweima.html","车海报":"/tupian/muban-che.html","感恩海报":"/tupian/muban-ganen.html","感恩节海报":"/tupian/muban-ganenjie.html","圣诞海报":"/tupian/muban-shengdan.html","圣诞节海报":"/tupian/muban-shengdanjie.html","元旦海报":"/tupian/muban-yuandan.html","元旦节海报":"/tupian/muban-yuandan.html","年会海报":"/tupian/muban-nianhui.html","2019挂历":"/tupian/muban-guali.html","日历2019":"/tupian/muban-rili.html","台历2019":"/tupian/muban-taili.html","新年日历":"/tupian/muban-xinnianrili.html","产品单页":"/chuandan.html","app引导页":"/tupian/muban-252640.html","设计师简历":"/office/word-shejishijianli.html","合成":"/tupian/chuangyi-so.html","word":"/office/word-so.html","word模板":"/office/word-so.html","word文档":"/office/word-so.html","excel":"/excel/","excel模板":"/excel/","excel表格":"/excel/","ppt图表":"/ppt/tubiao.html","简历":"/office/word-jianli.html","个人简历":"/office/word-jianli.html","简历模板":"/office/word-jianli.html","求职简历":"/office/word-jianli.html","毕业答辩":"/office/ppt-biyedabian.html","论文答辩":"/office/ppt-biyedabian.html","教育课件":"/office/ppt-jiaoyukejian.html","海报设计":"/haibao.html","画册封面":"/tupian/muban-huacefengmian.html","名片":"/tupian/muban-mingpian.html","工作证":"/tupian/muban-gongzuozheng.html","证书":"/tupian/muban-zhengshu.html","传单":"/tupian/muban-chuandan.html","折页":"/tupian/muban-zheye.html","二折页":"/tupian/muban-erzheye.html","三折页":"/tupian/muban-sanzheye.html","淘宝海报":"/banners.html","淘宝banner":"/banners.html","淘宝主图":"/zhitongche.html","主图":"/zhitongche.html","淘宝首页":"/shouye.html","详情页":"/pages.html","淘宝详情页":"/pages.html","淘宝手机模板":"/mobile.html","片头":"/media/video-piantou.html","字幕":"/media/video-125753.html","快闪":"/media/video-kuaishan.html","视频片头":"/media/video-385290.html","片尾":"/media/video-pianwei.html","背景视频":"/media/video-beijingshipin.html","粒子特效":"/media/video-lizitexiao.html","转场":"/media/video-783738.html","开场":"/media/video-372267.html","会声会影":"/media/video-393550.html","ae":"/media/video-292257.html","字幕条":"/media/video-zimutiao.html","pr":"/media/video-439926.html","宣传片":"/media/video-xuanchuanpian.html","结尾":"/media/video-jiewei.html","新闻片头":"/media/video-xinwenpiantou.html","婚礼片头":"/media/video-hunlipiantou.html","开场视频":"/media/video-kaichangshipin.html","mg":"/media/videomg.html","时间轴":"/media/video-shijianzhou.html","启动仪式":"/media/video-qidongyishi.html","企业宣传片":"/media/video-509074.html","年会开场":"/media/video-nianhuikaichang.html","文字快闪":"/media/video-wenzikuaishan.html","绿幕":"/media/video-471477.html","元素":"/tupian/sucai-so.html","台历":"/tupian/muban-taili.html","宣传单":"/tupian/muban-xuanchuandan.html","彩页":"/chuandan.html","节目单":"/tupian/muban-jiemudan.html","贺卡":"/tupian/muban-heka.html","电商":"/tupian/muban-dianshang.html","万圣节海报":"/tupian/muban-wanshengjie.html","圣诞节海报":"/tupian/muban-shengdanjie.html","新年海报":"/tupian/muban-xinnian.html","猪年海报":"/tupian/muban-zhunian.html","春节海报":"/tupian/muban-chunjie.html","样机":"/yangjisucai.html","样机素材":"/yangjisucai.html","vi样机":"/tupian/muban-viyangji.html","手机样机":"/tupian/muban-shoujiyangji.html","电子设备样机":"/tupian/muban-dianzishebeiyangji.html","包装样机":"/tupian/muban-816207.html","海报样机":"/tupian/muban-775377.html","企业形象墙":"/tupian/qiyewenhuaqiang.html","文化墙":"/tupian/muban-wenhuaqiang.html","杂志排版":"/huace.html","文化展板":"/tupian/muban-wenhuazhanban.html","房地产广告":"/tupian/muban-fangdichan.html","商业海报":"/haibao.html","微商海报":"/tupian/muban-weishang.html","美容画册":"/tupian/muban-meironghuace.html","店铺装修":"/shouye.html","价目表":"/tupian/muban-143555.html","主图背景":"/tupian/muban-zhutubeijing.html","ae片头模板":"/media/video-303190.html","pr模板":"/media/videopr.html","视频":"/video/","ae模板":"/media/video-393891.html","相册模板":"/media/video-303279.html","延时视频":"/media/video-2816166.html","电影片头":"/media/video-dianyingpiantou.html","会声会影模板":"/media/video-1966971.html","视频素材":"/media/video-306707.html","婚礼视频":"/media/video-hunli.html","mg动画":"/media/videomg.html","会声会影x9":"/media/video-6078543.html","免费视频":"/media/video-mianfeishipin.html","婚礼背景视频":"/media/video-hunlibeijing.html","颁奖背景视频":"/media/video-banjiang.html","logo演绎":"/media/video-logoyanyi.html","ae片头":"/media/video-312834.html","年会倒计时":"/media/video-2027129.html","电影特效":"/media/video-dianyingtexiao.html","婚庆片头":"/media/video-2251329.html","年会视频":"/media/video-nianhui.html","片尾字幕":"/media/video-pianweizimu.html","字幕模板":"/media/video-125753.html","震撼片头":"/media/video-3045775.html","电子相册":"/media/video-xiangce.html","背景音乐":"/music/so.html","轻音乐":"/music/so.html","纯音乐":"/music/so.html","婚礼配乐":"/music/so-so-0-0-0-0-0-complex-0-1-98-36.html","音效":"/soundeffect/","生日ppt":"/office/ppt-shengri.html","婚礼ppt":"/office/ppt-hunli.html","快闪ppt":"/office/ppt-kuaishan.html","相册ppt":"/office/ppt-xiangce.html","小清新ppt":"/office/ppt-xiaoqingxin.html","中国风ppt":"/office/ppt-zhongguofeng.html","微立体ppt":"/office/ppt-734496.html","简约ppt":"/tupian/396509.html","党建ppt":"/office/ppt-dangjian.html","企业ppt":"/office/ppt-qiye.html","商务ppt":"/office/ppt-shangwu.html","商业计划书ppt":"/office/ppt-shangyejihuashu.html","企业宣传ppt":"/office/ppt-qiyexuanchuan.html","工作总结ppt":"/office/ppt-gongzuozongjie.html","工作计划ppt":"/office/ppt-394663.html","教育课件ppt":"/office/ppt-jiaoyukejian.html","课件ppt":"/office/ppt-313580.html","家长会ppt":"/office/ppt-jiazhanghui.html","毕业答辩ppt":"/office/ppt-biyedabian.html","答辩ppt":"/office/ppt-325046.html","2019ppt":"/office/ppt-2019.html","新年ppt":"/office/ppt-xinnian.html","年会ppt":"/office/ppt-nianhui.html","颁奖ppt":"/office/ppt-banjiang.html","手抄报":"/word/xiaobao.html","小报":"/word/xiaobao.html","字体下载":"/font/","字体设计":"/sucai/zitiyuansu.html","字体元素":"/sucai/zitiyuansu.html","摄影图":"/tupian/photo-so.html","建筑插画":"/tupian/chahua-jianzhu.html","公众号":"/peitu/gongzhonghao.html","促销海报":"/tupian/muban-cuxiao.html","节气海报":"/tupian/muban-jieqi.html","节日海报":"/tupian/muban-jieri.html","地产海报":"/tupian/muban-dichan.html","美食海报":"/tupian/muban-meishi.html","教育海报":"/tupian/muban-jiaoyu.html","招聘海报":"/tupian/muban-zhaopin.html","旅游海报":"/tupian/muban-lvyou.html","化妆品海报":"/tupian/muban-huazhuangpin.html","中国风海报":"/tupian/muban-zhongguofeng.html","健身海报":"/tupian/muban-jianshen.html","运动海报":"/tupian/muban-yundong.html","汽车海报":"/tupian/muban-qiche.html","公益海报":"/tupian/muban-246427.html","企业文化海报":"/tupian/muban-qiyewenhua.html","党建海报":"/tupian/muban-dangjian.html","医疗海报":"/tupian/muban-yiliao.html","美容海报":"/tupian/muban-meirong.html","美妆海报":"/tupian/muban-meizhuang.html","饮料海报":"/tupian/muban-yinliao.html","风景海报":"/tupian/muban-fengjing.html","中医海报":"/tupian/muban-zhongyi.html","册子":"/tupian/muban-cezi.html","公司画册":"/tupian/muban-gongsihuace.html","折页设计":"/tupian/muban-zheye.html","dm单":"/chuandan.html","dm单页":"/chuandan.html","双十一页面":"/tupian/muban-shuangshiyi.html","双十一承接页":"/tupian/muban-shuangshiyi.html","封皮":"/tupian/muban-fengmian.html","公司背景墙":"/tupian/muban-qiyewenhuaqiang.html","ae模版":"/media/videoae.html","绘声绘影":"/media/video-393550.html","pr模版":"/media/videopr.html","ae片头模版":"/media/video-303190.html","相册模版":"/media/video-303279.html","会声会影模版":"/media/video-1966971.html","字幕模版":"/media/video-3826783.html","启动页":"/tupian/muban-qidongye.html","开屏页":"/tupian/peitu-qidongye.html","引导页":"/tupian/peitu-qidongye.html","牛奶素材":"/tupian/sucai-niunai.html","专题":"/zhuanti.html","笔触":"/tupian/sucai-256859.html",'海报':'/haibao.html','易拉宝':'/zhanban.html','邀请函':'/tupian/muban-yaoqinghan.html','包装':'/bzsj.html','动画':'/media/videomg.html','插画':'/tupian/chahua-so.html','免抠元素':'/sucai/',
    "营销长图":"/yingxiaochangtu.html","微信长图":"/yingxiaochangtu.html","海报长图":"/yingxiaochangtu.html",
    "any": {"包装盒": '/muban-0-1258-1-0-1259-0-0-0-0.html'}
}
function handleSearch (word) {
    var searchMode = $('#pic_form_search_model').val();
    word = $.trim(word).toLowerCase();
    var isSpecialWords = false;
    var domain = "//699pic.com";
    var match_link = null;
    if (word) {
        var lastRecentSearch = window.localStorage.getItem('recent_search_data');
        if (lastRecentSearch) {
            lastRecentSearch = JSON.parse(lastRecentSearch);
            var tempLength = 0;
            $.each(lastRecentSearch, function (index, val) {
                if (val !== word) {
                    tempLength += 1;
                }
            });
            if (tempLength == lastRecentSearch.length) {
                var tempValue = delHtmlTag(word).slice(0, 10);
                tempValue && lastRecentSearch.unshift(tempValue);
            }
        } else {
            var tempArr = [];
            var tempValue = delHtmlTag(word).slice(0, 10);
            tempValue && tempArr.push(tempValue);
            lastRecentSearch = tempArr;
        }
        window.localStorage.setItem('recent_search_data', JSON.stringify(lastRecentSearch));
    } else {
        typeof saveSearchCookie == "function" && saveSearchCookie(9);
    }
    if (word.indexOf('小视频') != -1 || word.indexOf('短视频') != -1) {
        if (searchMode == 'all' && window.friendValue[word]) {
            location.href = domain + window.friendValue[word];
            return
        }
        if (window.friendValue['any'][word]) {
            location.href = domain + window.friendValue['any'][word];
            return
        }
    } else {
        // 匹配指定分类后缀词
        var match_result = matchWordCategory(word);
        if (match_result) {
            word = match_result['word'];
            match_link = match_result['link'];
        } else {
            if (searchMode == 'all' && window.friendValue[word]) {
                location.href = domain + window.friendValue[word];
                return
            }
            if (window.friendValue['any'][word]) {
                location.href = domain + window.friendValue['any'][word];
                return
            }
        }
    }
    var searchUrl = devAjaxPrefix + "/search/getKwInfo";
    $.get(searchUrl, { 'kw': word }, function (rep) {
        if (match_link) {
            location.href = domain + match_link.replace("%word%", rep.pinyin);
        } else if (searchMode == 'photo') {
            location.href = domain + "/tupian/photo-" + rep.pinyin + ".html";
        } else if (searchMode == 'chahua') {
            location.href = domain + "/tupian/chahua-" + rep.pinyin + ".html";
        } else if (searchMode == 'muban') {
            location.href = domain + "/tupian/muban-" + rep.pinyin + ".html ";
        } else if (searchMode == 'video') {
            if (word) {
                location.href = "/media/" + searchMode + "-" + rep.kwid + ".html";
            } else {
                location.href = '/video/';
            }
        } else if (searchMode == 'originality') {
            location.href = domain + "/tupian/chuangyi-" + rep.pinyin + ".html ";
        } else if (searchMode == 'ppt' || searchMode == 'PPT') {
            location.href = domain + "/office/ppt-" + rep.pinyin + ".html ";
        } else if (searchMode == 'word') {
            location.href = domain + "/office/word-" + rep.pinyin + ".html ";
        } else if (searchMode == 'excel') {
            location.href = domain + "/office/excel-" + rep.pinyin + ".html ";
        } else if (searchMode == 'peitu') {
            location.href = domain + "/tupian/peitu-" + rep.pinyin + ".html";
        } else if (searchMode == 'yuansu') {
            location.href = domain + "/tupian/sucai-" + rep.pinyin + ".html";
        } else if (searchMode == 'gif') {
            location.href = domain + "/tupian/gif-" + rep.pinyin + ".html";
        } else if (searchMode == 'soundeffect') {
            location.href = domain + "/media/soundeffect-" + rep.pinyin + ".html";
        } else if (searchMode == 'soundtrack') {
            location.href = domain + "/media/soundtrack-" + rep.pinyin + ".html";
        } else if (searchMode == 'ziti') {
            location.href = domain + "/font/";
        } else if (searchMode == 'gif') {
            location.href = domain + "/tupian/gif-" + rep.pinyin + ".html";
        } else if (searchMode == 'music') {
            location.href = domain + "/music/" + rep.pinyin + ".html";
        } else if (searchMode == 'renxiang') {
            location.href = domain + "/sousuo-" + rep.kwid + "-0-complex-all-0-all-all-1-0-0-0-0-0-0-all-has-all.html";
        }  else if (searchMode == 'shipai') {
            location.href = domain + "/video-sousuo-" + rep.kwid + "-18-0-0-0-1-all-complex-0-0-0-0-0-0.html";
        } else {
            location.href = domain + "/tupian/" + rep.pinyin + ".html";
        }
    });
}

function matchWordCategory(input_text) {
    if($('#pic_form_search_model').val() !== 'all') {
        return null
    }
    var links = {
        0: "/tupian/photo-%word%.html",
        1: "/media/video-%word%.html",
        2: "/tupian/chahua-%word%.html",
        3: "/tupian/sucai-%word%.html",
        4: "/tupian/gif-%word%.html",
        5: "/office/word-%word%.html",
        6: "/tupian/muban-%word%.html",
    };
    var wordMap = {
        0: ["\u7167\u7247", "\u6444\u5f71\u56fe"],  // 0 照片: ["照片", "摄影图"],
        1: ["\u0061\u0065", "\u4f1a\u58f0\u4f1a\u5f71", "\u89c6\u9891", "\u0070\u0072",
            "\u0065\u0064\u0069\u0075\u0073", "\u006d\u0067", "\u7247\u5934", "\u7247\u5c3e", "\u52a8\u753b"],
        // 1 视频: ["ae", "会声会影", "视频", "pr","edius", "mg", "片头", "片尾", "动画"],
        2: ["\u63d2\u753b"],    // 2 插画: ["插画"]
        3: ["\u514d\u62a0\u5143\u7d20", "\u0070\u006e\u0067", "\u5143\u7d20"],  // 3 元素: ["免抠元素","png","元素"]
        4: ["\u0067\u0069\u0066", "\u52a8\u56fe", "\u52a8\u6001\u56fe"],    // 4 gif动图: ["gif","动图","动态图"]
        5: ["\u7b80\u5386", "\u5c0f\u62a5", "\u624b\u6284\u62a5"],  // 5 word文档: ["简历","小报","手抄报"]
        6: ["\u6d77\u62a5", "\u5c55\u677f", "\u5c55\u67b6", "\u6613\u62c9\u5b9d", "\u540d\u7247", "\u9080\u8bf7\u51fd", "\u5ba3\u4f20\u5355",
            "\u8bc1\u4e66", "\u5de5\u4f5c\u8bc1", "\u0064\u006d\u5355", "\u5355\u9875", "\u8282\u76ee\u5355", "\u4e8c\u6298\u9875", "\u4e09\u6298\u9875",
            "\u56db\u6298\u9875", "\u753b\u518c", "\u6837\u673a", "\u5305\u88c5", "\u4e3b\u56fe", "\u76f4\u901a\u8f66", "\u9996\u9875",
            "\u8be6\u60c5\u9875", "\u88c5\u9970\u753b", "\u80cc\u666f\u5899"]
        // 6 设计模板: ["海报","展板","展架","易拉宝","名片","邀请函","宣传单","证书","工作证","dm单","单页","节目单",
        // "二折页","三折页","四折页","画册","样机","包装","主图","直通车","首页","详情页","装饰画","背景墙"]
    };

    input_text = input_text.toLowerCase().replace(new RegExp("[^\u4e00-\u9fa50-9a-z]", "g"), "");
    var redirect_uri = null;
    for (var item_key in wordMap) {
        for (var word_key in wordMap[item_key]) {
            var matchs = input_text.match(new RegExp("(.*?)" + wordMap[item_key][word_key] + "$"));
            if (matchs && matchs[1]) {
                return {"link":links[item_key],"word":matchs[1]}
            }
        }
    }
    return null;
}

function sendRecommend (type, uniqid) {

    $.ajax({
        url: '//ajax.699pic.com/index.php?c=ajaxPublic&a=recommend',
        type: 'post',
        dataType: 'json',
        data: {
            type: type,
            uniqid: uniqid
        },
        success: function (data) {
            if (data.status == 1) {
                callback && callback(data.data);
            }
        },
        error: function (error) {
            console.log(error);
        }
    })
}
$('.header-search .header-search_tag').hover(function () {
    $('.search-hint').fadeOut();
}, function () {
    $('.search-hint').fadeOut();
});
$("#photo_search").submit(function () {
    if (window.FormData) {
        var data = new window.FormData($("#photo_search")[0]);
    } else {
        return;
    }
    $.ajax({
        url: '//v0.api.upyun.com/sheyingtu-web-95',
        type: 'POST',
        data: data,
        cache: false,
        processData: false,
        contentType: false,
    }).done(function (data, textStatus) {
        var data = JSON.parse(data);
        window.location.href = '/shitu/search?url=' + data['url'];
    }).fail(function (res, textStatus, error) {
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
        shitu({ upload: 2 });
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
        data: data,
        dataType: "jsonp",
        success: function (data) { }
    });
}

// 下载 弹窗提示
var loadedAlert = {};
function doAlert (path, data) {
    console.log(loadedAlert[path]);
    if (loadedAlert[path]) {
        eval(loadedAlert[path].run)
        return;
    }
    $.post(path, data, function (response) {
        if (response.state) {
            loadedAlert[path] = response;
            $(response.doc).appendTo('body');
            eval(response.run);
        } else {

        }
    })
}
window.env.doAlert = doAlert;

function doAlertNoCache (path, data) {
    $.post(path, data, function (response) {
        if (response.state) {
            $(document).find('.faceCen,.alert-bg').remove();
            $(response.doc).appendTo('body');
            eval(response.run);
        } else {
        }
    })
}
window.env.doAlertNoCache = doAlertNoCache;