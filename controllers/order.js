/*
* 业务控制 (模板 & 数据请求)
* */

var request = require('request');
var api_config = require('../api/v1/api_config');
var apiHost = 'http://localhost:8888/mall/order/';			// 域名
//var apiHost = 'http://localhost:8800/getOrderDetail';			// 域名

var co = require('co');
var restler = require('restler-bluebird');

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


// 处理业务逻辑
exports.getOrderDetail = function (req, res, next) {
	// 异步调取Java数据
	//request(api_config.getOrderDetail, function(err, data) {
	//request(apiHost, function(err, data) {
	//	console.log('获取到的错误是----------------------------'+err);
	//	console.log('获取到的结果是----------------------------'+data.body);
		// 渲染页面,指定模板&数据
		//res.render('compact/orderDetail',JSON.parse(data.body));			// 指定模板路径 渲染
		//res.render('compact/orderDetail',{'sellInfo':{'pname':'签订电子合同'}});			// 指定模板路径 渲染
	//});

	var id=req.query.id;
	console.log('获取到的参数是------------1111----------------'+id);
	//request(apiHost + id, function(err, data) {
	//	//res.header("Access-Control-Allow-Origin", "*");
	//	console.log('获取到的错误是----------------------------'+err);
	//	console.log('获取到的结果是----------------------------'+data);
	//	// 渲染页面,指定模板&数据
	//	res.render('compact/orderDetail');			// 指定模板路径 渲染
	//});

	restler.get(apiHost+id).then(function (data) {
		console.log('获取到的参数是------------2222----------------'+JSON.stringify(data));
		var value={statusObj:statusObj,sellinfo:data.sellinfo,order:data.order};
		console.log('获取到的参数是------------3333----------------'+JSON.stringify(value));
		res.render("compact/orderDetail", {statusObj:statusObj,sellInfo:data.sellInfo,order:data.order});
	});


	//co((function* (tres) {
	//	var content = yield restler.get(apiHost + id);
	//	//console.log('获取到的错误是----------------------------'+err);
	//	console.log('获取到的结果是----------------------------'+content.body);
	//	tres.render("compact/orderDetail", content);
	//})(res));

};
