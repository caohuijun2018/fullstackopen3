$(window).scroll(function(){
    var win_top = $(this).scrollTop();
    var _top = $(".infor-message").offset().top;
    if(win_top >= _top){
        $(".fixedtop-infobar").fadeIn().show();
    }else{
        $(".fixedtop-infobar").fadeOut().hide();
    }
})

$("#fixedtop-downloadbtn").click(function(){
    $("#detail_free_download_btn").trigger("click");
})
$(".fixed-collecbtn").click(function(){
    $(".shoucang").trigger("click");
})
$(".fixed-collecbtned").click(function(){
    $(".quitColl").trigger("click");
})
function getSelectDownloadItem() {
    var downloadListArr = [];
    $.each($('#_event-set li'), function(index, item) {
        downloadListArr.push({
            id: $(item).find('i').attr('data-id'),
            name: $(item).find('.set-width1').text(),
            desc: $(item).find('.set-width2').text(),
            is_checked: $(item).find('i').hasClass('on-set')
        })
    })
    renderFixDownloadListArr(downloadListArr)
}
function renderFixDownloadListArr(oData) {
    var oDom = '';
    if(oData.length > 1){
        $.each(oData, function(index, item) {
            oDom += '<li class="'+(item.is_checked ? "on-set" : "")+'" data-id="'+item.id+'"><span>'+item.name+'：</span><span>'+item.desc+'</span></li>';
            if(item.is_checked) {
                $('.fixedtop-infotype p span').text(item.name+"："+item.desc).attr('data-id', item.id);
            }
        });
        $('.fixedtop-infotypelist').html(oDom);
    }else{
        $('.fixedtop-infotype p').hide();
    }
    
}
getSelectDownloadItem();

$('body').on('click', '.img-set>li', function() {
    getSelectDownloadItem();
});
$('body').on('click', '.fixedtop-infotype p', function(event) {
    event.preventDefault();
    if(!$(this).hasClass("clicked-show")){
        $(this).addClass("clicked-show");
        $(".fixedtop-infotypelist").show();
    }else{
        $(this).removeClass("clicked-show");
        $(".fixedtop-infotypelist").hide();
    }
});
$('body').on('click', '.fixedtop-infotypelist li', function(event) {
    event.preventDefault();
    $('.fixedtop-infotypelist li').removeClass('on-set');
    $(this).addClass('on-set');
    var oClickItem = {
        id: $(this).attr('data-id'),
        name: $(this).find('span:eq(0)').text(),
        desc: $(this).find('span:eq(1)').text()
    }
    $('.fixedtop-infotype p span').text(oClickItem.name+oClickItem.desc).attr('data-id', oClickItem.id);
    $.each($('#_event-set li'), function(index, item) {
        if ($(item).find('i').attr('data-id') == oClickItem.id) {
            $('#_event-set li i').removeClass('on-set');
            $('#_event-set li:eq('+index+') i').addClass('on-set');
        }
    })
    $('.fixedtop-infotypelist').fadeOut();
    $(".fixedtop-infotype p").removeClass("clicked-show");
});
// 点击查看大图
$(".showallbtn").click(function(){
    $(this).hide();
    $(".moreimg").show();
})
$(window).load(function(){
    $(".help").on({
        mouseover: function(){
            $(".help .icon").css({'border-color':'#2CAEFF','color':'#2CAEFF'});
            $(".help .help-cacr").css({'opacity':'1','visibility':'visible'});
        },
        mouseout: function(){
            $(".help .icon").css({'border-color':'#999999','color':'#999999'});
            $(".help .help-cacr").css({'opacity':'0','visibility':'hidden'});
        }
    })
})
$("body").on("click",".bdsharebuttonbox a i",function(event){
    event.preventDefault();
    $(this).parent('a').get(0).click()
})
$(".photo-view i").on({
    'mouseover':function(){
        $(".photo-view .titleicon-tips").removeClass("titleicon-tips-xie");
        if(!$(this).hasClass("icon-xiangqing-xie")){
            $(".photo-view .titleicon-tips").text("摄图网享独家版权，商用有保障");
        }else{
            $(".photo-view .titleicon-tips").text("VRF授权协议，范围最广的全用途授权");
            $(".photo-view .titleicon-tips").addClass("titleicon-tips-xie");
        }
        $(".photo-view .titleicon-tips").show();
    },
    'mouseout':function(){
        $(".photo-view .titleicon-tips").hide();
    }
})
$(".fixedtop-infotitle i").on({
    'mouseover':function(){
        $(".fixedtop-infotitle .titleicon-tips").removeClass("titleicon-tips-xie");
        if(!$(this).hasClass("icon-xiangqing-xie")){
            $(".fixedtop-infotitle .titleicon-tips").text("摄图网享独家版权，商用有保障");
        }else{
            $(".fixedtop-infotitle .titleicon-tips").text("VRF授权协议，范围最广的全用途授权");
            $(".fixedtop-infotitle .titleicon-tips").addClass("titleicon-tips-xie");
        }
        $(".fixedtop-infotitle .titleicon-tips").show();
    },
    'mouseout':function(){
        $(".fixedtop-infotitle .titleicon-tips").hide();
    }
})