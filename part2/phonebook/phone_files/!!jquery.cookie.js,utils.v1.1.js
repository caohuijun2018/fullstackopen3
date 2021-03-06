/* COMBO: filename = jquery.cookie.js, type = application/javascript, resp = 200 */
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

/* COMBO: filename = utils.v1.1.js, type = application/javascript, resp = 200 */
// GLOBAL Event Emit
var customEvent = (function () {
    var events = {}
    function on(evt, handler) {
        events[evt] = events[evt] || []
        events[evt].push({
            handler: handler
        })
    }
    function trigger(evt, args) {
        if(!events[evt]) {
            return
        }
        for (var i = 0; i < events[evt].length; i++) {
            events[evt][i].handler(args)
        }
    }
    return {
        on: on,
        trigger: trigger
    }
})();
// COOKIE ??? ????????????
/*
* name???  cookieName
* value:  cookieValue
* days:   ?????? ??????0,???????????????
* isZero: ???????????????
*/
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
				if (days < 1) {
					leftTime.setTime(leftTimeStamp + curTemp + days * 24 * 60 * 60 * 1000);
				} else {
					leftTime.setTime(leftTimeStamp + curTemp + (days-1) * 24 * 60 * 60 * 1000);
				}
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
	deleteCookie: function (name, domain) {
		// document.cookie = name + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
		var date = new Date();
		date.setTime(date.getTime()-10000); //????????????cookie?????????????????????????????????????????????????????????
		document.cookie = name + "= ' ' " + "; expires=" + date.toUTCString()+"; path=/"+(domain ? '; domain='+domain : '');
	}
}
// localStorage ??? ????????????
/*
* exp:      ?????????????????????,?????? 1560231213-156021194
* callback: ?????????????????????
*/
var localhostStorageFn = {
	set: function (key,value) {
		var curTime = new Date().getTime();
		localStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
	},
	get: function (key,exp, callback) {
		var data = localStorage.getItem(key);
		if (data) {
				var dataObj = JSON.parse(data);
				if(!exp) {
						var dataObjDatatoJson = dataObj.data
						return dataObjDatatoJson;
				}
				if (new Date().getTime() - dataObj.time>exp) {
						console.log('???????????????');
						this.remove(key);
						callback && callback();
						// your callbak here
				}else{
						var dataObjDatatoJson = dataObj.data
						return dataObjDatatoJson;
				}
		}
	},
	remove: function (key) {
		localStorage.removeItem(key);
	}
}

// addEventListen ????????????
var addEvent = function (element, type, handler) {
	if(element.addEventListener) {
		addEvent = function (element, type, handler) {
			element.addEventListener(type, handler, false);
		};
	} else if(element.attachEvent) {
		addEvent = function (element, type, handler) {
			element.attachEvent('on' + type, handler);
		};
	} else {
		addEvent = function (element, type, handler) {
			element['on' + type] = handler;
		};
	}
	addEvent(element, type, handler);
}
// ??????????????????
function stopDefault(e) {
	//???????????????????????????(W3C)
	if (e && e.preventDefault) {
		//????????? ?????????????????????e
		e.preventDefault();
	}
	//IE???????????????????????????????????????
	else {
		//ie ??????????????????event
		event.returnValue = false;
	}
}
// ??????URL??????????????????
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var search = window.location.search.split('?')[1] || '';
	var r = search.match(reg) || [];
	return r[2];
}
// ??????10????????????0
function paddingLeftZero(num) {
	if(num<10) {
		return '0'+num
	}else{
		return num
	}
}
// format: 0 => 2019-04-29
// 		1 => 2019-04-29 17:09
// 		2 => 2019-04-29 17:09:37
//    3 => 2019???04???29??? 17:09:37
function monment(timestamp, format, divide) {
	var tempDate = new Date(),
		result = '',
		divide = divide || '-';
	if (!timestamp) {
		timestamp = new Date().getTime();
	}
	if (String(timestamp).length == 10) {
		timestamp = timestamp * 1000;
	}
	tempDate.setTime(timestamp);
	var year = tempDate.getFullYear()
	var month = paddingLeftZero(tempDate.getMonth() + 1)
	var day = paddingLeftZero(tempDate.getDate())
	var hour = paddingLeftZero(tempDate.getHours())
	var minute = paddingLeftZero(tempDate.getMinutes())
	var second = paddingLeftZero(tempDate.getSeconds())
	switch (format) {
		case 0:
			result = year+divide+month+divide+day;
			break;
		case 1:
			result = year+divide+month+divide+day+' '+hour+':'+minute;
			break;
		case 2:
			result = year+divide+month+divide+day+' '+hour+':'+minute+':'+second;
			break;
		case 3:
			result = year+'???'+month+'???'+day+'??? '+hour+':'+minute+':'+second;
			break;
		case 4:
			result = year+'.'+month+'.'+day+'  '+hour+':'+minute+':'+second;
			break;
	}
	return result
}
// ????????????x???y?????????
function getScrollPosition(el) {
	el = el || window
	return ({x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft,y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop})
}
// ???????????? fn????????????????????????????????????, delay????????????????????????
function throttleFn (fn, delay) {
  // last?????????????????????????????????, timer????????????
  var last = 0, timer = null
  // ???throttle??????????????????????????????
  return function () {
    // ??????????????????this?????????
    var context = this
    // ??????????????????????????????
    var args = arguments
    // ?????????????????????????????????
    var now = +new Date()
    // ???????????????????????????????????????????????????????????????????????????????????????
    if (now - last < delay) {
    // ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
       clearTimeout(timer)
       timer = setTimeout(function () {
          last = now
          fn.apply(context, args)
        }, delay)
    } else {
        // ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
        last = now
        fn.apply(context, args)
    }
  }
}
/**
 * @desc ????????????
 * @param func ??????
 * @param wait ?????????????????????
 * @param immediate true ??????????????????false ??????????????????
 */
function debounce(func,wait,immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait)
      if (callNow) func.apply(context, args)
    } else {
      timeout = setTimeout(function(){
        func.apply(context, args)
      }, wait);
    }
  }
}
// ???????????? -- MadeBy SunPing
function shuffle(arr){
	var result = [],
			random;
	while(arr.length>0){
			random = Math.floor(Math.random() * arr.length);
			result.push(arr[random])
			arr.splice(random, 1)
	}
	return result;
}
// ???????????????
function secToTIme(sec) {
	var result = '';
	if(sec>0) {
		var min = Math.floor(sec/60) % 60;
		var second = Math.floor(sec) % 60;
		var hour = (sec / 3600 >= 1) ? Math.floor(sec / 3600) : '';
		if (hour) {
			result = paddingLeftZero(hour) + ':';
		}
		result += paddingLeftZero(min)+':'+paddingLeftZero(second);
	}
	return result
}

/**
 * ??? new Date() ???????????????(????????? ???????????????) ?????????
 *
 * @param {*} time new Date() ?????? 1590131660 ?????? 1548221490638
 * @param {*} cFormat ?????? '{y}???{m}???{d}??? {h}:{i} ???{a}'
 * @returns @String
 */
function parseTimeFn (time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  var date = ''
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if (time.length === 10) { time = time * 1000 }
      if ((/^[0-9]+$/.test(time))) {
        time = parseInt(time)
      } else {
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  var formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  var time_str = format.replace(/{([ymdhisa])+}/g, function (result, key) {
    var value = formatObj[key]
    if (key === 'a') { return ['???', '???', '???', '???', '???', '???', '???'][value] }
    return paddingLeftZero(value.toString())
  })
  return time_str
}

// TOAST ??????
(function ($) {
	$.fn.extend({
		// toast ???????????? jQuery
		"toast": function (options) {
			var oHtml = '',
					oTime = (new Date().getTime());
			if ( typeof options === "string" ) {
				if (options) {
					oHtml = '<div class="toast-custom" oindex="'+oTime+'"><p>'+options+'</p></div>'
				} else {
					return false
				}
			} else if ( typeof options === "object" ) {
				oHtml = '<div class="toast-custom" oindex="'+oTime+'">'+(options.icon && "<i class=\"iconfont icon-"+options.icon+"\"></i>")+'<p>'+options.msg+'</p></div>'
			}
			$('body').append(oHtml);
			var fadeout = setTimeout(function () {
				$('.toast-custom[oindex='+oTime+']').fadeOut()
				clearTimeout(fadeout);
			}, 5000);
		}
	})
})(jQuery);
/*
    * jsSrc js???????????????
    * callback ??????????????????
    * id ?????????id
 */
function appendJs (jsSrc,callback,id) {
  var new_element = document.createElement('script');
  new_element.setAttribute('type', 'text/javascript');
  new_element.setAttribute('src', jsSrc);
  new_element.charset = 'UTF-8';
  if(id){
    new_element.id = id;
  };
  if(typeof callback == 'function'){
    if (new_element.addEventListener) {
      new_element.addEventListener('load', function () {
       callback();
      }, false);
     } else if (new_element.attachEvent) {
      new_element.attachEvent('onreadystatechange', function () {
       var target = window.event.srcElement;
       if (target.readyState == 'loaded') {
        callback();
       }
      });
     }
  }
  document.body.appendChild(new_element);
}
