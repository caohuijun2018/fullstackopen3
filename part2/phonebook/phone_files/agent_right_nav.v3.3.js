 //*代理功能相关js*/

 //关闭代理提示
        if (window.localStorage &&  localStorage.getItem("agentHint") == 'true'){
            $('.agent-hint').hide();
        }
        $('.confirm-hint').click(function(){
            $('.agent-hint').fadeOut(200);
            window.localStorage && localStorage.setItem("agentHint",true)
        });
        $('body').on('click', '.agent-account .size', function () {
            $('.Rigmidle-ovflblick').get(0).click();
        })

        $('body').on('click', '.all-accounts li', function () {
            clearInterval(window.changeAccountTimer);
            $(this).addClass('active').siblings('li').removeClass('active');
            // 倒计时后完成自动跳转
            changeAccountClock();
        });
        $('body').on('keyup', '.change-account-search input', function (e) {
            var oValue = $.trim($(this).val());
            if(!oValue) {
                renderProxyAccount(window.allAccountData);
            }
            var result = [];
            $.each(window.allAccountData, function (index, value) {
                var tempTitle = value.customer;
                if (tempTitle.indexOf(oValue) != -1) {
                    result.push(window.allAccountData[index]);
                }
            });
            renderProxyAccount(result);
        });
        function renderProxyAccount (data) {
            var oHtml = '';
            $.each(data, function (index, value) {
                oHtml += '<li class="'+(value.com_uid == CONFIG['uid'] ? "active" : "")+'" data-uid="'+value.com_uid+'">'+(value.com_uid == CONFIG['uid'] ? "<em>当前账号</em>" : "")+'<p>'+value.customer+'</p><span class="account-select"><i class="iconfont icon-tongyong-duiquan"></i></span></li>';
            });
            $(".all-accounts ul").html(oHtml);
        };
        function changeAccountClock () {
            $('.change-account-clock span').text(3);
            $('.change-account-clock').show();
            var countNum = 3;
            var url   = '/agent/changeUser';
            var uid   = $('.all-accounts li.active').attr('data-uid');
            window.changeAccountTimer = setInterval(function () {
                countNum--;
                if(countNum < 0) {
                    clearInterval(window.changeAccountTimer);
                    $.get(url,{uid:uid},function (res){
                        if (res['status']) {
                            location.reload();
                        }
                    });
                    return
                }
                $('.change-account-clock span').text(countNum);
            }, 1000);
        };
        $('body').on('click', '.Rigmidle-ovflblick', function() {
            var url = '/agent/getCustomers';
            var uid = $(this).attr('data-uid');
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json',
                data: {
                  uid: uid
                },
                success: function (res) {
                    $(".all-accounts ul").empty();
                    if(res.data.length>0) {
                        window.allAccountData = res.data;
                        renderProxyAccount(res.data);
                        $(".change-account").show();
                        $(".winpopbg").show().addClass('justForAccount');
                    }
                }
            })
        });
        $('body').on('click', '.winpopbg.justForAccount', function () {
            clearInterval(window.changeAccountTimer);
            $('.change-account').hide();
            $(".winpopbg").hide().removeClass('justForAccount');
            $('.change-account-clock').hide();
        });
    // $(".account-number").click(function (){
    //     var url = '/agent/getCustomers';
    //     var uid = $(this).attr('data-uid');
    //     var str = '';
    //     var login_uid = CONFIG['uid'];
    //     $("#append-company").empty();
    //     $.get(url,{uid:uid},function (res){
    //         for(var i in res['data']) {
    //             if (res['data'][i]['com_uid'] == login_uid) {
    //                 str += '<li class="on" data-uid="'+res['data'][i]['com_uid']+'">'+res['data'][i]['customer']+'<i></i></li>';
    //             } else {
    //                 str += '<li data-uid="'+res['data'][i]['com_uid']+'">'+res['data'][i]['customer']+'<i></i></li>';
    //             }
    //         }
    //         $("#append-company").html(str);
    //         $(".agency-pop").show();
    //         $(".winpopbg").show();

    //     },'json');
    // });

    // $(".Rigmidle-ovflblick").click(function (){
    // //$(".agent-show,.agent-account").click(function (){
    //     var url = '/agent/getCustomers';
    //     var uid = $(this).attr('data-uid');
    //     var str = '';
    //     var login_uid = CONFIG['uid'];
    //     $("#append-company").empty();
    //     $.get(url,{uid:uid},function (res){
    //         for(var i in res['data']) {
    //             if (res['data'][i]['com_uid'] == login_uid) {
    //                 str += '<li class="on" data-uid="'+res['data'][i]['com_uid']+'">'+res['data'][i]['customer']+'<i></i></li>';
    //             } else {
    //                 str += '<li data-uid="'+res['data'][i]['com_uid']+'">'+res['data'][i]['customer']+'<i></i></li>';
    //             }
    //         }
    //         $("#append-company").html(str);
    //         $(".winpopbg").show();
    //         $(".agency-pop").show();

    //     },'json');
    // });

    // // 鍒囨崲鐧诲綍鐢ㄦ埛
    // var agentSwitch = true;
    // $(document).on('click','#append-company li',function () {
    // 	if (agentSwitch) {
	//     	agentSwitch = false;
	//         $('#append-company li').removeClass();
	//         $(this).addClass('on');
	//         $("#change-msg").show();
	//         var url   = '/agent/changeUser';
	//         var uid   = $(this).attr('data-uid');
	//         var count = 3;
	//         var timer1 = setInterval(function  () {
	//             count--;
	//             $("#change-msg").html(' '+count+" 秒后切换到该账号");
	//         },1000);
	//         var timer = setTimeout(function () {
	//             clearInterval(timer1);
	//             $.get(url,{uid:uid},function (res){
	//                 if (res['status']) {
	//                     location.reload();
	//                 }
	//             });
	//         },3000);
    // 	}
    // });
    // $(".agency-pop .fr").click(function () {
    //     $(".agency-pop").hide();
    //     $(".winpopbg").hide();
    // });

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var company = '';
if (company) {
    $(".agent-company a").html(decodeURI(company));
    $(".agent-company a").attr('title', decodeURI(company));
} else {
    uid = CONFIG['uid'];
    $.get('/agent/getCompany', _defineProperty({ uid: uid }, "uid", uid), function (res) {
        if (res['status'] == 1) {
            $(".agent-company a,.agent-account .size").html(res['user']['customer']);
        }
    });
}