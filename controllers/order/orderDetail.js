/*
* 业务控制 (模板 & 数据请求)
* */

var request = require('request');
var apiHost = 'http://localhost:8888/mall/order/';			// 域名

//var co = require('co');
//var restler = require('restler-bluebird');


// 处理业务逻辑
exports.getOrderDetail = function (req, res, next) {
	// 异步调取Java数据
	console.log('获取到的参数是------------1111----------------'+req.query.id);
	request({url:'http://localhost:7777/getOrderDetail'}, function(err, data) {
		var source=JSON.parse(data.body);
		var step=0;
		switch (source.data.order.status){
			case 'WaitSignContract':
				step=1;
				break;
			case 'WaitPayment':
				step=2;
				break;
			case 'WaitConfirmDelivery':
				step=3;
				break;
			case 'WaitSettleAccounts':
				step=4;
				break;
			case 'WaitReceiveReceipt':
				step=5;
				break;
		}
		var statusObj = {
			step: step,        // 第几步
			stepList: [
				{stepName: '提交订单', stepDate: source.data.order.createtime==null?"":source.data.order.createtime},
				{stepName: '签订合同', stepDate: source.data.order.signContractTime==null?"":source.data.order.signContractTime},
				{stepName: '付款', stepDate: source.data.order.paymentTime==null?"":source.data.order.paymentTime},
				{stepName: '确认提货', stepDate: source.data.order.confirmDeliveryTime==null?"":source.data.order.confirmDeliveryTime},
				{stepName: '结算', stepDate: source.data.order.settleAccountTime==null?"":source.data.order.settleAccountTime}
			]
		};

		console.log('获取到的错误是----------------------------'+err);
		//headerTit:订单详情页面标题，pageTitle:浏览器标签名，type:显示卖家信息或者买家信息
		var content={headerTit:"待签电子合同",pageTitle:"订单详情",type : "buy",statusObj:statusObj,"sellInfo":source.data.sellInfo,"order":source.data.order};
		console.log('获取到的结果是----------------------------'+content);
		//渲染页面,指定模板&数据
		res.render('order/buyOrderDetail',content);
	});

	//var id=req.query.id;
	//console.log('获取到的参数是------------1111----------------'+id);
	//restler.get(apiHost+id).then(function (data) {
	//	console.log('获取到的参数是------------2222----------------'+JSON.stringify(data));
	//	var value={statusObj:statusObj,sellinfo:data.sellinfo,order:data.order};
	//	console.log('获取到的参数是------------3333----------------'+JSON.stringify(value));
	//	res.render("order/orderDetail", {"headerTit":"待签电子合同","statusObj":statusObj,"sellInfo":data.sellInfo,"order":data.order});
	//});


	//co((function* (tres) {
	//	var content = yield restler.get(apiHost + id);
	//	//console.log('获取到的错误是----------------------------'+err);
	//	console.log('获取到的结果是----------------------------'+content.body);
	//	tres.render("compact/orderDetail", content);
	//})(res));

};
exports.orderTest = function (req, res, next) {
	console.log('服务器被请求了'+req.query.id);
	res.send('fdsfsdfsdf');
};