
require(['jquery', 'bootstrap'],function($){
	
	/**
	 * Common ajax error handler
	 * This handler is not called for cross-domain script and cross-domain JSONP requests.
	 */
	$( document ).ajaxError(function(event, jqxhr, settings, exception) {
		var xhrStatus = jqxhr.status;

		var errorStatus = [400, 403, 404, 500];

		if(xhrStatus == 401){
			location.href = $("#sso").val() + "/login?gotoURL=" + encodeURIComponent(location.href);

		} else if (xhrStatus == 409) {
			// handle 409 error
			// var message = JSON.parse(jqxhr.responseText).message;
			// showServerError(xhrStatus, message);

		} else if($.inArray(xhrStatus, errorStatus) >=0) {
			showServerError(xhrStatus, "");  //handle errors in errorStatus
		}else{

		}
	});

	/** server ajax error msg */
	var showServerError = function(status,message) {
		var errorMsg = {
			401: "请重新登录...",
			403: "您没有权限访问该网页...",
			404: "您访问的网页不存在...",
			400: "参数传入错误，请稍后重试...",
			500: "服务器出错，请稍后重试...",
			409:  message
		};
		$("#server-error-msg").text(errorMsg[status]);
		$('#modal-server-error').modal(true);
	};
});


//数字转大写
function switchTxt(n) {
	if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
		return "数据非法";
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