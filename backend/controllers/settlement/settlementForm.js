/*
* 开具结算单 页面
* 业务控制 (模板 & 数据请求)
* */

var request = require('request');
var checker    = require('../../common/datachecker');
var api_config = require('../../api/v1/api_config');

/**
 * type: 订单状态, 1
 * id: 订单ID
 * url: 买家/买家, '_buyer / _seller'
 *
 */

// 页面路由
exports.orderInfo = function (req, res, next) {
	checker.orderId(req.query.id);
	req.userId = req.session.user.id;

	var url = api_config.orderInfo;
	request(url, function (err, data) {
		if (err) return next(err);

		if (data){
			var replyData = JSON.parse(data.body);
			replyData.pageTitle = '结算单_页面标题';
			replyData.headerTit = '开具结算单';
			res.render('settlement/settlementForm', replyData);			// 渲染页面,(指定模板, 数据)  *** 路径不能加加'/', 默认在views下
		}
	});
};
