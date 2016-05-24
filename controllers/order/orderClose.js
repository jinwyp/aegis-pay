/*
* 关闭订单页面
* 业务控制 (模板 & 数据请求)
* */

var request = require('request');
var apiHost = 'http://server.180.com/';						// API域名


// 订单信息
exports.orderInfo = function (req, res, next) {

	// 异步调取Java数据
	request(apiHost + 'orderInfo', function (err, data) {

		var req_id = req.query.id;

		console.log('控制台');
		var replyData = JSON.parse(data.body);
		replyData.pageTitle = '关闭订单页面标题';
		replyData.headerTit = '关闭订单';

		res.render('order/orderClose', replyData);			// 渲染页面,指定模板&数据

	});
};



// 关闭订单
exports.closeOrder = function() {
	// 异步调取Java数据
	request(apiHost + 'closeOrder', function (err, data) {

		var closeData = JSON.parse(data.body);
		res.render('order/orderClose', closeData);			// 渲染页面,指定模板&数据

	});
};


