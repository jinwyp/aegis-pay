/**
 * 结算单.确认开票
 * 业务控制 (模板 & 数据请求)

 */

var request  = require('request');
//var checker  = require('../../libs/datachecker');			// 验证
var apiHost  = require('../../api/v1/api_config');          // 接口路径配置


// 页面路由.确认开票
exports.invoiceInfo = function (req, res, next) {
	var req_id = req.query.id,
		req_type = req.query.type,
		typeArr = ['none', 'buy', 'sell'];

	//checker.orderId(req_id);
	req.userId = req.session.user.id;

	if(!req_id) {
		res.send('<p>"请输入 订单编号!"</p>');
	} else {


		var url = apiHost.host + 'settlement/invoiceInfo?orderId=' + req_id +'&type='+ typeArr[req_type];
		console.log('-=-控制层-=-=-=-=-=-=-=-=-=- URL : '+ url );

		request(url, function (err, data) {
			if (err) return next(err);

			var replyData = JSON.parse(data.body);
			replyData.pageTitle = '结算_确认开票信息';
			replyData.headerTit = replyData.headerTit;
			replyData.templetUrl = true;
			return res.render('settlement/confirmTheInvoice', replyData);			// 渲染页面(指定模板, 数据)

		});
	}
};


// 页面路由.开票备注
exports.invoiceNotes = function (req, res, next) {
	var req_id = req.query.id,
		req_type = req.query.type,
		typeArr = ['none', 'buy', 'sell'];

	//checker.orderId(req_id);
	req.userId = req.session.user.id;

	if(!req_id) {
		res.send('<p>"请输入 订单编号!"</p>');
	} else {

		var url = apiHost.host + 'settlement/invoiceNotes?orderId=' + req_id +'&type='+ typeArr[req_type];
		console.log('-=-控制层-=-=-=-=-=-=-=-=-=- URL : '+ url );

		request(url, function (err, data) {
			if (err) return next(err);

			var replyData = JSON.parse(data.body);
			replyData.pageTitle = '结算_开票备注';
			replyData.headerTit = replyData.headerTit;
			return res.render('settlement/addInvoiceNotes', replyData);			// 渲染页面(指定模板, 数据)

		});
	}
};