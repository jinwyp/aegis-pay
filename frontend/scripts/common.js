
require(['jquery', 'bootstrap'],function($, bootstrap){
	// data validator
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
            //console.log(hWindow, hBody, hWindow-hBody, isStick);
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
