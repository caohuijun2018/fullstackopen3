/* COMBO: filename = jquery.flex-images.min.1.0.4.js, type = application/javascript, resp = 200 */
// jQuery flexImages v1.0.4
// https://github.com/Pixabay/jQuery-flexImages
!function(t){function e(t,a,r,n){function o(t){r.maxRows&&d>r.maxRows||r.truncate&&t&&d>1?w[g][0].style.display="none":(w[g][4]&&(w[g][3].attr("src",w[g][4]),w[g][4]=""),w[g][0].style.width=l+"px",w[g][0].style.height=u+"px",w[g][0].style.display="block")}var g,l,s=1,d=1,f=t.width()-2,w=[],c=0,u=r.rowHeight;for(f||(f=t.width()-2),i=0;i<a.length;i++)if(w.push(a[i]),c+=a[i][2]+r.margin,c>=f){var m=w.length*r.margin;for(s=(f-m)/(c-m),u=Math.ceil(r.rowHeight*s),exact_w=0,l,g=0;g<w.length;g++)l=Math.ceil(w[g][2]*s),exact_w+=l+r.margin,exact_w>f&&(l-=exact_w-f),o();w=[],c=0,d++}for(g=0;g<w.length;g++)l=Math.floor(w[g][2]*s),h=Math.floor(r.rowHeight*s),o(!0);n||f==t.width()||e(t,a,r,!0)}t.fn.flexImages=function(a){var i=t.extend({container:".item",object:"img",rowHeight:180,maxRows:0,truncate:0},a);return this.each(function(){var a=t(this),r=t(a).find(i.container),n=[],o=(new Date).getTime(),h=window.getComputedStyle?getComputedStyle(r[0],null):r[0].currentStyle;for(i.margin=(parseInt(h.marginLeft)||0)+(parseInt(h.marginRight)||0)+(Math.round(parseFloat(h.borderLeftWidth))||0)+(Math.round(parseFloat(h.borderRightWidth))||0),j=0;j<r.length;j++){var g=r[j],l=parseInt(g.getAttribute("data-w")),s=l*(i.rowHeight/parseInt(g.getAttribute("data-h"))),d=t(g).find(i.object);n.push([g,l,s,d,d.data("src")])}e(a,n,i),t(window).off("resize.flexImages"+a.data("flex-t")),t(window).on("resize.flexImages"+o,function(){e(a,n,i)}),a.data("flex-t",o)})}}(jQuery);
/* COMBO: filename = common/verify.js, type = application/javascript, resp = 200 */
/* initGeetest 1.0.0
 * 用于加载id对应的验证码库，并支持宕机模式
 * 暴露 initGeetest 进行验证码的初始化
 * 一般不需要用户进行修改
 */
;(function (global, factory) {
    "use strict";
    if (typeof module === "object" && typeof module.exports === "object") {
        // CommonJS
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("Geetest requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    "use strict";
    if (typeof window === 'undefined') {
        throw new Error('Geetest requires browser environment');
    }
    var document = window.document;
    var Math = window.Math;
    var head = document.getElementsByTagName("head")[0];

    function _Object(obj) {
        this._obj = obj;
    }

    _Object.prototype = {
        _each: function (process) {
            var _obj = this._obj;
            for (var k in _obj) {
                if (_obj.hasOwnProperty(k)) {
                    process(k, _obj[k]);
                }
            }
            return this;
        }
    };
    function Config(config) {
        var self = this;
        new _Object(config)._each(function (key, value) {
            self[key] = value;
        });
    }

    Config.prototype = {
        api_server: 'api.geetest.com',
        protocol: 'http://',
        type_path: '/gettype.php',
        fallback_config: {
            slide: {
                static_servers: ["static.geetest.com", "dn-staticdown.qbox.me"],
                type: 'slide',
                slide: '/static/js/geetest.0.0.0.js'
            },
            fullpage: {
                static_servers: ["static.geetest.com", "dn-staticdown.qbox.me"],
                type: 'fullpage',
                fullpage: '/static/js/fullpage.0.0.0.js'
            }
        },
        _get_fallback_config: function () {
            var self = this;
            if (isString(self.type)) {
                return self.fallback_config[self.type];
            } else if (self.new_captcha) {
                return self.fallback_config.fullpage;
            } else {
                return self.fallback_config.slide;
            }
        },
        _extend: function (obj) {
            var self = this;
            new _Object(obj)._each(function (key, value) {
                self[key] = value;
            })
        }
    };
    var isNumber = function (value) {
        return (typeof value === 'number');
    };
    var isString = function (value) {
        return (typeof value === 'string');
    };
    var isBoolean = function (value) {
        return (typeof value === 'boolean');
    };
    var isObject = function (value) {
        return (typeof value === 'object' && value !== null);
    };
    var isFunction = function (value) {
        return (typeof value === 'function');
    };
    var callbacks = {};
    var status = {};
    var random = function () {
        return parseInt(Math.random() * 10000) + (new Date()).valueOf();
    };
    var loadScript = function (url, cb) {
        var script = document.createElement("script");
        script.charset = "UTF-8";
        script.async = true;
        script.onerror = function () {
            cb(true);
        };
        var loaded = false;
        script.onload = script.onreadystatechange = function () {
            if (!loaded &&
                (!script.readyState ||
                "loaded" === script.readyState ||
                "complete" === script.readyState)) {

                loaded = true;
                setTimeout(function () {
                    cb(false);
                }, 0);
            }
        };
        script.src = url;
        head.appendChild(script);
    };
    var normalizeDomain = function (domain) {
        return domain.replace(/^https?:\/\/|\/$/g, '');
    };
    var normalizePath = function (path) {
        path = path.replace(/\/+/g, '/');
        if (path.indexOf('/') !== 0) {
            path = '/' + path;
        }
        return path;
    };
    var normalizeQuery = function (query) {
        if (!query) {
            return '';
        }
        var q = '?';
        new _Object(query)._each(function (key, value) {
            if (isString(value) || isNumber(value) || isBoolean(value)) {
                q = q + encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
            }
        });
        if (q === '?') {
            q = '';
        }
        return q.replace(/&$/, '');
    };
    var makeURL = function (protocol, domain, path, query) {
        domain = normalizeDomain(domain);

        var url = normalizePath(path) + normalizeQuery(query);
        if (domain) {
            url = protocol + domain + url;
        }

        return url;
    };
    var load = function (protocol, domains, path, query, cb) {
        var tryRequest = function (at) {

            var url = makeURL(protocol, domains[at], path, query);
            loadScript(url, function (err) {
                if (err) {
                    if (at >= domains.length - 1) {
                        cb(true);
                    } else {
                        tryRequest(at + 1);
                    }
                } else {
                    cb(false);
                }
            });
        };
        tryRequest(0);
    };
    var jsonp = function (domains, path, config, callback) {
        if (isObject(config.getLib)) {
            config._extend(config.getLib);
            callback(config);
            return;
        }
        if (config.offline) {
            callback(config._get_fallback_config());
            return;
        }
        var cb = "geetest_" + random();
        window[cb] = function (data) {
            if (data.status === 'success') {
                callback(data.data);
            } else if (!data.status) {
                callback(data);
            } else {
                callback(config._get_fallback_config());
            }
            window[cb] = undefined;
            try {
                delete window[cb];
            } catch (e) {
            }
        };
        load(config.protocol, domains, path, {
            gt: config.gt,
            callback: cb
        }, function (err) {
            if (err) {
                callback(config._get_fallback_config());
            }
        });
    };
    var throwError = function (errorType, config) {
        var errors = {
            networkError: '网络错误'
        };
        if (typeof config.onError === 'function') {
            config.onError(errors[errorType]);
        } else {
            throw new Error(errors[errorType]);
        }
    };
    var detect = function () {
        return !!window.Geetest;
    };
    if (detect()) {
        status.slide = "loaded";
    }
    var initGeetest = function (userConfig, callback) {
        var config = new Config(userConfig);
        if (userConfig.https) {
            config.protocol = 'https://';
        } else if (!userConfig.protocol) {
            config.protocol = window.location.protocol + '//';
        }
        jsonp([config.api_server || config.apiserver], config.type_path, config, function (newConfig) {
            var type = newConfig.type;
            var init = function () {
                config._extend(newConfig);
                callback(new window.Geetest(config));
            };
            callbacks[type] = callbacks[type] || [];
            var s = status[type] || 'init';
            if (s === 'init') {
                status[type] = 'loading';
                callbacks[type].push(init);
                load(config.protocol, newConfig.static_servers || newConfig.domains, newConfig[type] || newConfig.path, null, function (err) {
                    if (err) {
                        status[type] = 'fail';
                        throwError('networkError', config);
                    } else {
                        status[type] = 'loaded';
                        var cbs = callbacks[type];
                        for (var i = 0, len = cbs.length; i < len; i = i + 1) {
                            var cb = cbs[i];
                            if (isFunction(cb)) {
                                cb();
                            }
                        }
                        callbacks[type] = [];
                    }
                });
            } else if (s === "loaded") {
                init();
            } else if (s === "fail") {
                throwError('networkError', config);
            } else if (s === "loading") {
                callbacks[type].push(init);
            }
        });
    };
    window.initGeetest = initGeetest;
    return initGeetest;
});

