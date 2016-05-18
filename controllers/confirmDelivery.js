/*
* 业务控制 (模板 & 数据请求)
* */

var request = require('request');
var apiHost = 'http://server.180.com/';			// 模拟域名


// 处理业务逻辑
exports.confirmDelivery = function (req, res, next) {

	// 订单状态 数据模拟
	var statusObj = {
		step: 2,        // 第几步
		stepList: [
			{
				stepName: '提交订单',
				stepDate: '2016-05-11 01:02:36'
			},
			{
				stepName: '签订合同',
				stepDate: '2016-05-12 01:02:36'
			},
			{
				stepName: '付款',
				stepDate: '2016-05-13 01:02:36'
			},
			{
				stepName: '确认提货',
				stepDate: '2016-05-14 01:02:36'
			},
			{
				stepName: '结算',
				stepDate: '2016-05-15 01:02:36'
			}
		]
	};
	// 静态数据
	res.render('confirmDelivery/confirmDelivery',{"headerTit":"确认下单",statusObj: statusObj});			// 指定模板路径 渲染


	// 异步调取Java数据
	//request(apiHost + 'listData', function(err, data) {
	//	// 渲染页面,指定模板&数据
	//	res.render('header/header', {listData: JSON.parse(data.body)});			// 指定模板路径 渲染
	//});

};
