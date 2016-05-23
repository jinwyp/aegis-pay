/*
* 关闭订单页面
* 业务控制 (模板 & 数据请求)
* */

var request = require('request');
var apiHost = 'http://server.180.com/';			// API域名


// 订单信息
exports.orderInfo = function (req, res, next) {

	// 异步调取Java数据
	request(apiHost + 'infoObj', function (err, data) {


		var replyData = JSON.parse(data.body);
		replyData.pageTitle = '关闭订单';
		res.render('order/orderClose', replyData);			// 渲染页面,指定模板&数据

	});



};




