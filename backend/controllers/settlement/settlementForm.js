/*
* 开具结算单 页面
* 业务控制 (模板 & 数据请求)
* */

var request = require('request');
var apiHost = 'http://server.180.com';						// API域名

/**
 * type: 订单状态, 1
 * id: 订单ID
 * url: 买家/买家, '_buyer / _seller'
 *
 */

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
			replyData.pageTitle = '结算单_页面标题';
			replyData.headerTit = '开具结算单';
			res.render('settlement/settlementForm', replyData);			// 渲染页面,(指定模板, 数据)  *** 路径不能加加'/', 默认在views下
		});
	}
};


// API路由: 订单信息
exports.orderInfo_api = function (req, res, next) {

	// 异步调取Java数据
	request(apiHost + '/order/orderInfo_api', function (err, data) {

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

