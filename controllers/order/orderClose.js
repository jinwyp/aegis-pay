/*
* 业务控制 (模板 & 数据请求)
* */

var request = require('request');
var apiHost = 'http://server.180.com/';			// 模拟域名


// 订单信息
exports.orderInfo = function (req, res, next) {

	// 异步调取Java数据
	request(apiHost + 'infoObj', function (err, data) {



		// 订单状态 数据模拟
		var statusObj = {
			step: 4,        // 第几步
			stepList: [
				{
					stepName: '提交订单',
					stepDate: '2016-05-11 01:02:03'
				},
				{
					stepName: '签订合同',
					stepDate: '2016-05-12 01:02:03'
				},
				{
					stepName: '付款',
					stepDate: '2016-05-13 01:02:03'
				},
				{
					stepName: '确认提货',
					stepDate: '2016-05-14 01:02:03'
				},
				{
					stepName: '结算',
					stepDate: '2016-05-15 01:02:03'
				}
			]
		};


		var DATA = {
			infoObj: JSON.parse(data.body),
			statusObj: statusObj
		}


		res.render('order/orderClose', DATA);			// 渲染页面,指定模板&数据

	});



};




