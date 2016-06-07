/*
* 关闭订单页面
* 业务控制 (模板 & 数据请求)
* */

var request = require('request');
var checker    = require('../../common/datachecker');
var api_config = require('../../api/v1/api_config');


// 页面路由
exports.orderInfo = function (req, res, next) {
	checker.orderId(req.query.id);
	req.userId = req.session.user.id;

	var url = api_config.orderInfo;
	request(url, function (err, data) {
		if (err) return next(err);

		if (data){
			var replyData = JSON.parse(data.body);
			replyData.pageTitle = '关闭订单页面标题';
			replyData.headerTit = '关闭订单';
			res.render('order/orderClose', replyData);			// 渲染页面,(指定模板, 数据)  *** 路径不能加加'/', 默认在views下
		}
	});
};


// API路由: 订单信息
exports.orderInfo_api = function (req, res, next) {

	checker.orderId(req.query.id);

	// 异步调取Java数据
	var url = api_config.orderCloseAPI;
	request(url, function (err, data) {
		if (err) return next(err);

		if (data){
			var replyData = JSON.parse(data.body);
			replyData.pageTitle = '关闭订单页面标题';
			replyData.headerTit = '关闭订单';

			return res.send(replyData);
		}
	});
};







// API路由: 提交关闭
exports.closeOrder_api = function(req, res, next) {
	// 关闭订单返回: 静态模拟
	var closeData = {
		success: false,
		error: '提交失败!',
		errorcode: 234235
	};
	res.send(closeData);


	//api代理，请求java接口
	//request({url:apiHost + '/order/closeOrder_api'}, function(err, data){
	//	console.log('---------------closeOrder_api----------------  '+ err);
	//	return res.send(data.body);
	//});
};

