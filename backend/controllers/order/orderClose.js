/*
* 关闭订单页面
* 业务控制 (模板 & 数据请求)
* */

var request = require('request');
var apiHost = 'http://server.180.com';						// API域名


// 页面路由
exports.orderInfo = function (req, res, next) {
	var req_id = req.query.id;
	req.userId = '1111111111';

	if(!req_id) {
		res.send('<p>"请输入 订单编号!"</p>');
	} else {
		request(apiHost + '/order/orderInfo?orderId='+ req_id, function (err, data) {
			var replyData = JSON.parse(data.body);
			replyData.pageTitle = '关闭订单页面标题';
			replyData.headerTit = '关闭订单';

			res.render('order/orderClose', replyData);			// 渲染页面,(指定模板, 数据)  *** 路径不能加加'/', 默认在views下
		});
	}
};


// API路由: 提交关闭
exports.closeOrder_api = function(req, res, next) {
	// 关闭订单返回: 静态模拟
	var closeData = {
		success: true,
		error: '提交成功!'
		//,errorcode: 234235
	};
	res.send(closeData);

};




// API路由: 订单信息 ---------------------------------------------
exports.orderInfo_api = function (req, res, next) {

	var req_id = req.query.id;
	var req_type = req.query.type;

	// 异步调取Java数据
	request(apiHost + '/order/orderInfo_api?id='+ req_id +'&type='+ req_type, function (err, data) {

		if (err) return next(err);

		if (data && data.body){
			var replyData = JSON.parse(data.body);
			return res.send(replyData);
		}else{
			next(new Error('Nock error!'))
		}

	});
};
