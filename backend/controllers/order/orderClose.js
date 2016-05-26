/*
* 关闭订单页面
* 业务控制 (模板 & 数据请求)
* */

var request = require('request');
var apiHost = 'http://localhost:8800';						// API域名


// 页面路由
exports.orderInfo = function (req, res, next) {

	var req_id = req.query.id;
	req.userId = '1111111111';

	if(!req_id) {
		res.send('<script>alert("请输入 订单编号!")</script>');
	} else {
		request(apiHost + '/orderInfo', function (err, data) {
			console.log('---------------orderInfo----------------  '+ err);

			var replyData = JSON.parse(data.body);
			replyData.pageTitle = '关闭订单页面标题';
			replyData.headerTit = '关闭订单';
			res.render('order/orderClose', replyData);			// 渲染页面,(指定模板, 数据)  *** 路径不能加加'/', 默认在views下
		});
	}
};


// API路由: 订单信息
exports.orderInfo_api = function (req, res, next) {

	// 异步调取Java数据
	request(apiHost + 'order/orderInfo_api', function (err, data) {

		var req_id = req.query.id;
		console.log('---------------orderInfo_api----------------  '+ err);

		var replyData = JSON.parse(data.body);
		replyData.pageTitle = '关闭订单页面标题';
		replyData.headerTit = '关闭订单';

		return res.send(replyData);
	});
};



// API路由: 提交关闭
exports.closeOrder_api = function(req, res, next) {
	//api代理，请求java接口
	request({url:apiHost + 'order/closeOrder_api'}, function(err, data){
		console.log('---------------closeOrder_api----------------  '+ err);
		return res.send(data.body);
	});
};

