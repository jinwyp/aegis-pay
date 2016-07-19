var baseUrl    = '/static';
var libraryUrl = '/static/components';
require.config({
    baseUrl  : baseUrl + '/scripts',
    paths    : {
        'avalon'                            : libraryUrl + '/avalon/dist/avalon',
        'bootstrap'                         : libraryUrl + '/bootstrap/dist/js/bootstrap',
        "devbridge-autocomplete"            : libraryUrl + '/devbridge-autocomplete/dist/jquery.autocomplete',
        'eonasdan-bootstrap-datetimepicker' : libraryUrl + '/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
        'flexslider'                        : libraryUrl + '/flexslider/jquery.flexslider',
        'html5shiv'                         : libraryUrl + '/html5shiv/static/html5shiv',
        'jquery'                            : libraryUrl + '/jquery/dist/jquery',
        'lightbox'                          : libraryUrl + '/lightbox2/dist/js/lightbox',
        'moment'                            : libraryUrl + '/moment/moment',
        'moment-timezone'                   : libraryUrl + '/moment-timezone/builds/moment-timezone-with-data-2010-2020',
        'picker'                            : libraryUrl + '/pickadate/lib/picker',
        'picker.date'                       : libraryUrl + '/pickadate/lib/picker.date',
        'picker.time'                       : libraryUrl + '/pickadate/lib/picker.time',
        'validator'                         : libraryUrl + '/validator-js/validator',
        'jquery.fileupload'                 : libraryUrl + '/blueimp-file-upload/js/jquery.fileupload',
        'jquery.iframe-transport'           : libraryUrl + '/blueimp-file-upload/js/jquery.iframe-transport',
        'jquery.fileupload.ui'              : libraryUrl + '/blueimp-file-upload/js/jquery.fileupload-ui',
        'jquery.ui.widget'                  : libraryUrl + '/blueimp-file-upload/js/vendor/jquery.ui.widget',
        'jquery.fileupload-image'           : libraryUrl + '/blueimp-file-upload/js//jquery.fileupload-image',
        'jquery.fileupload-audio'           : libraryUrl + '/blueimp-file-upload/js//jquery.fileupload-audio',
        'jquery.fileupload-video'           : libraryUrl + '/blueimp-file-upload/js//jquery.fileupload-video',
        'jquery.fileupload-validate'        : libraryUrl + '/blueimp-file-upload/js/jquery.fileupload-validate',
        'jquery.fileupload-process'         : libraryUrl + '/blueimp-file-upload/js/jquery.fileupload-process',
        'tmpl'                              : libraryUrl + '/blueimp-tmpl/js/tmpl',
        'load-image'                        : libraryUrl + '/blueimp-load-image/js/load-image',
        'load-image-exif'                   : libraryUrl + '/blueimp-load-image/js/load-image-exif',
        'load-image-meta'                   : libraryUrl + '/blueimp-load-image/js/load-image-meta',
        'canvas-to-blob'                    : libraryUrl + '/blueimp-canvas-to-blob/js/canvas-to-blob.min',
        "jQuery.fn.datePicker"              : 'jquery_plugins/jQuery.fn.datePicker',
        'jquery.fancySelect'                : 'jquery_plugins/jQuery.fn.fancySelect',           // 下拉框插件
        'message'                           : 'business_components/message',
        'pay.upload'                        : 'business_components/upload',
        'pay.smscode'                       : 'business_components/sms-code',
        'datachecker'                       : 'business_components/datachecker',
        'avalon.pagination'                 : 'avalon_components/pagination'
    },
    packages : [],
    shim     : {
        "jQuery.fn.datePicker"   : {
            deps : ['jquery']
        },
        "flexslider"               : {
            deps : ['jquery'],
            exports : 'flexslider'
        },
        "devbridge-autocomplete" : {
            deps : ['jquery']
        },
        "lightbox"                 : {
            deps : ['jquery'],
            exports : 'lightbox'
        },
        "bootstrap"                : {
            deps : ['jquery'],
            exports : 'bootstrap'
        },
        "jquery.fancySelect"     : {
            deps : ['jquery']
        },
        "avalon"                   : {
            deps : ['jquery', 'jquery.fancySelect', 'jQuery.fn.datePicker'],
            exports : "avalon"
        }
    }
});


require(['jquery', 'bootstrap'], function($){
	/**
	 * Common ajax error handler
	 * This handler is not called for cross-domain script and cross-domain JSONP requests.
	 * Created by enoy on 6/20/16.
	 */
	$( document ).ajaxError(function(event, jqxhr, settings, exception) {
		var xhrStatus = jqxhr.status;

		var errorStatus = [400, 409, 403, 404, 500];

		if(xhrStatus == 401){
			location.href = $("#sso").val() + "/login?gotoURL=" + encodeURIComponent(location.href);
		} else if($.inArray(xhrStatus, errorStatus) >=0) {
			var msg = (xhrStatus == 409) ? (JSON.parse(jqxhr.responseText).message) : '';
			showServerError(xhrStatus, msg);  //handle errors in errorStatus
		}else{
			showServerError(500, ""); 
		}
	});

	/** server ajax error msg */
	var showServerError = function(status,message) {
		var errorMsg = {
			401: "请重新登录...",
			403: "您没有权限访问...",
			404: "您请求的数据不存在...",
			400: "参数传入错误，请稍后重试...",
			500: "服务器出错，请稍后重试...",
			409:  message   //业务逻辑错误
		};
		$("#server-error-msg").text(errorMsg[status]);
		$('#modal-server-error').modal(true);
	};

// 底部吸底
    function throttle(fn, threshhold, scope) {
        threshhold || (threshhold = 300);
        var last,
            deferTimer;
        return function () {
            var context = scope || this;

            var now = +new Date,
                args = arguments;
            if (last && now < last + threshhold) {
                // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, threshhold + last - now);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    }

    var isStick = false;
	var bottomStyle = {
		init : function(){
			this.judge();
			$(window).scroll(throttle(this.judge)).resize(throttle(this.judge));
		},
		judge : function(){
			var hBody=$('body').height();
            var hWindow=$(window).height();
            if (isStick){
                if(hWindow - 150 < hBody){ //除去footer的高度在计算
                    isStick = false;
                    $("#paymentFooter").removeClass('bottomAbsolute');
                }
            }else{
                if(hWindow>hBody){
                    isStick = true;
                    $("#paymentFooter").addClass('bottomAbsolute');
                }
            }
		}
	};
	bottomStyle.init();

});

if (!Array.prototype.some){
  Array.prototype.some = function(fun /*, thisArg */)
  {
    'use strict';

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function')
      throw new TypeError();

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t && fun.call(thisArg, t[i], i, t))
        return true;
    }

    return false;
  };
}

//数字转大写
function switchTxt(n) {
	if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
		return "数据非法";
	if(n==0){
		return  "零元整" ;
	}
	var unit = "千百拾亿千百拾万千百拾元角分", str = "";
	n += "00";
	var p = n.indexOf('.');
	if (p >= 0)
		n = n.substring(0, p) + n.substr(p+1, 2);
	unit = unit.substr(unit.length - n.length);
	for (var i=0; i < n.length; i++)
		str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);

	return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
}
//数字千分符
function formatNum (num , deg) {
	return (num.toFixed(deg || 2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}


/**
 * 获取URL参数值
 * @param param 参数名
 * @param hrefStr 指定Url, 可选
 * @author wze
 */
function getUrlParam (param, hrefStr) {
	var request = {
		QueryString: function (val) {
			var uri = hrefStr || window.location.search;
			var re = new RegExp("" + val + "=([^&?]*)", "ig");
			return ((uri.match(re)) ? (decodeURI(uri.match(re)[0].substr(val.length + 1))) : '');
		}
	};
	return request.QueryString(param);
}

