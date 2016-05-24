/*
* 业务控制 (模板 & 数据请求)
* */

var request = require('request');
var apiHost = 'http://server.180.com/';			// 模拟域名


// 处理业务逻辑
exports.confirmDelivery = function (req, res, next) {

	// 订单状态 数据模拟
	var statusObj = {
		step: 4,        // 第几步
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
	//res.render('confirmDelivery/confirmDelivery',{"headerTit":"确认下单",statusObj: statusObj});			// 指定模板路径 渲染
	request({url:'http://localhost:8800/confirmDelivery'}, function(err, data) {
		console.log('获取到的错误是----------------------------'+err);
		console.log('获取到的结果是data----------------------------'+data.body);
		var source=JSON.parse(data.body);
		var content={headerTit:"待签电子合同",pageTitle:"确认提货页面",type : "sell",statusObj:statusObj,"sellInfo":source.sellInfo,"order":source.order,"indexList":source.indexList};
		console.log('获取到的结果是content----------------------------'+content);
		//渲染页面,指定模板&数据
		res.render('confirmDelivery/confirmDelivery',content);
	});

	// 异步调取Java数据
	//request(apiHost + 'listData', function(err, data) {
	//	// 渲染页面,指定模板&数据
	//	res.render('header/header', {listData: JSON.parse(data.body)});			// 指定模板路径 渲染
	//});

};

exports.test = function (req, res, next) {
	res.send('success');
}
