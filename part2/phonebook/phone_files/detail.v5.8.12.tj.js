/* COMBO: filename = tj.new.v2.4.js, type = application/javascript, resp = 200 */

var newVersionConfig = {
    url : '//ajax.699pic.com/?c=AjaxPublicNew&a=newVersionTj',
    oldUrl : '//ajax.699pic.com/?c=AjaxPublic&a=index',
    doName : '',
    position : '',
    uniqid : 0,
    event : 'click',
    model : '',
    kw : ''
};

var uniqid = $.cookie('user_uniqid');
if(!uniqid)
{
    var uniqid = genID(16);
    $.cookie('user_uniqid',uniqid,{expires:365,path:'/'})
}

function genID(len){
    var radix=16;
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
    if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
        var r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random()*16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}

newVersionConfig.uniqid = uniqid;

//查看更多（推荐内容）
$('body').on('click', '.xiangqing', function () {
    successDownTjV3($(this).attr('data-position'), 'click');
});

//详情（专辑推荐）
$('body').on('click', '.SimilarRecommend-list li', function () {
    successDownTjV3($(this).attr('data-position'), 'click');
});

// 详情页统计（推荐内容）
$('body').on('click', '.data-postion', function () {
    successDownTjV3($(this).attr('data-position'), 'click');
});

//更多（专辑推荐）
$('body').on('click', '.zhuanji', function () {
    successDownTjV3($(this).attr('data-position'), 'click');
});


//推荐搜索词统计
$('body').on('click','.hotSearch',function(){
    successDownTjV3($(this).attr('data-position'), 'click');
}) ;


var successDownTjV3 = function(data_position, sucess){
    newVersionConfig.doName = 'postionClick';
    newVersionConfig.position = data_position;
    newVersionConfig.event = sucess;
    $.ajax({
        type: "get",
        url: newVersionConfig.url,
        jsonp: "callback",
        data:{
            aname:newVersionConfig.doName,
            uniqid:newVersionConfig.uniqid,
            position:newVersionConfig.position,
            page_type:CONFIG['newpage'],
            event : newVersionConfig.event,
            uid : CONFIG['uid']
        },
        dataType: "jsonp",
        success: function (){}
    })
}

