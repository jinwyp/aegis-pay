/*
 * 关闭订单页面
 * 业务控制 (模板 & 数据请求)
 * */
var request = require('request');
var checker    = require('../../libs/datachecker');			// 验证
var apiHost  = require('../../api/v1/api_config');          // 接口路径配置


// 页面路由
exports.orderInfo = function (req, res, next) {
	var apiUrl = '',
		req_id = req.query.id;

	//req.userId = req.session.user.id;
	//checker.orderId(req_id);
	if(!req_id) {
		res.send('<p>"请输入 订单编号!"</p>');
	} else {

		var url = apiHost.orderCloseView + '?orderId='+ req_id +'&userId='+ 15;
		//var url = apiHost.host + 'order/orderInfo?orderId='+ req_id;			// TODO: 本地模拟

		request(url, function (err, data) {
			if (err) return next(err);

			var replyData = {
				pageTitle : '关闭订单 页面标题',
				headerTit : '关闭订单'
			};

			replyData.data = JSON.parse(data.body).data;
			res.render('order/orderClose', replyData);							// 渲染页面,(指定模板, 数据)  *** 路径不能加加'/', 默认在views下
		});

	}
};



// +_+_API部分_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_

// API路由: 关闭订单.查看信息 - - - - - - - - - - - - - - - - - - - - - - -
exports.orderCloseView = function (req, res, next) {
	var req_id = req.query.id;
	var req_type = req.query.type;

	// 异步调取Java数据
	var url = apiHost.host + 'order/orderCloseView?id='+ req_id +'&type='+ req_type;
	request(url, function (err, data) {

		if (err) return next(err);
		if (data && data.body){
			var replyData = JSON.parse(data.body);
			return res.send(replyData);
		}else{
			next(new Error('Nock error!'))
		}
	});
};


// API路由: 关闭订单.提交关闭 - - - - - - - - - - - - - - - - - - - - - - -
exports.orderCloseSubmit = function(req, res, next) {
	//checker.orderId(req.query.id);

	// 异步调取Java数据
	var url = apiHost.host + 'order/orderCloseSubmit?orderId='+ req.query.id;
	request(url, function (err, data) {
		if (err) return next(err);

		if (data){
			var replyData = JSON.parse(data.body);
			return res.send(replyData);						// 发送Json数据
		}
	});
};