/*
 * 关闭订单页面
 * 业务控制 (模板 & 数据请求)
 * */
var request = require('../../libs/request');
var checker    = require('../../libs/datachecker');			// 验证
var apiHost  = require('../../api/v1/api_config');          // 接口路径配置


// 页面路由
exports.orderInfo = function (req, res, next) {
	var apiUrl 	= '',
		orderId = req.query.id,
		userId 	= req.session.user.id;						//checker.orderId(req_id);

	if(!orderId) {
		res.send('<p>"请输入 订单编号!"</p>');
	} else {
		apiUrl = apiHost.orderCloseView + '?orderId='+ orderId +'&userId='+ userId;
		//apiUrl = apiHost.host + 'order/orderInfo?orderId='+ req_id;			// TODO: 本地模拟

		request(apiUrl, function (err, data) {
			if (err) return next(err);

			var replyData = {
				pageTitle : '关闭订单页',
				headerTit : '关闭订单',
				subTitle  : '关闭交易'
			};

			replyData.data = JSON.parse(data.body).data;
			console.log('_+_关闭订单-查看信息_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+');
			console.log(replyData);
			res.render('order/orderClose', replyData);		// 渲染页面,(指定模板, 数据)
		});
	}
};



// +_+_API部分_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_

// API路由: 查看订单信息 - - - - - - - - - - - - - - - - - - - - - - -
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


// API路由: 订单提交关闭 - - - - - - - - - - - - - - - - - - - - - - -
exports.orderCloseSubmit = function(req, res, next) {
	var apiUrl = apiHost.orderCloseSubmit;				// 异步调取Java数据
		//apiUrl = apiHost.host + 'order/orderCloseSubmit?orderId='+ req.query.id;

	req.body.userId = req.session.user.id;
	request.post(apiUrl, {formData:req.body, json:true}, function (err, data) {
		if (err) return next(err);
		if (data && data.body){
			var replyData = data.body;
			return res.send(replyData);
		}else{
			return next(new Error('Nock error!'))
		}
	});
};