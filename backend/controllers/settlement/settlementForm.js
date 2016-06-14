/**
 * 开具结算单 [及类型, 页面状态]
 * 业务控制 (模板 & 数据请求)
 * 备注: 根据不同的订单, 返回不同的订单状态, 根据不同的状态显示不同的内容
 *
 * type: buy 1买家; sell 2卖家
 * status:
	 WaitSettleAccounts	 	待结算.卖家开具结算单(卖)
	 WaitVerifySettle	 	待审核.卖家编辑结算单(卖)
	 WaitVerifySettle	 	待审核.买家审核结算单(买)
	 ReturnedSettleAccounts	审核退回.卖家修改数据(卖)
	 ReturnedSettleAccounts	审核退回.买家修改原因(买)
	 WaitPayTailMoney	 	审核通过.待买家补款  (_)
	 WaitPayRefundMoney	 	审核通过.待卖家退款  (_)
	 WaitWriteReceipt	 	审核通过.待卖家开发票(_)  */

var request = require('request');
var checker    = require('../../libs/datachecker');			// 验证
var apiHost  = require('../../api/v1/api_config');          // 接口路径配置


// 页面路由
exports.orderSettlement = function (req, res, next) {

	var req_id = req.query.id,
		req_type = req.query.type,
		typeArr = ['none', 'buy', 'sell'];

	//checker.orderId(req_id);
	req.userId = req.session.user.id;

	if(!req_id) {
		res.send('<p>"请输入 订单编号!"</p>');
	} else {
		console.log('-=-控制层-=-=-=-=-=-=-=-=-=-id: '+ req_id+' ,type: '+ typeArr[req_type]);

		var url = apiHost.host + 'settlement/settlementForm?orderId=' + req_id +'&type='+ typeArr[req_type];
		request(url, function (err, data) {
			if (err) return next(err);

			var replyData = JSON.parse(data.body);
			replyData.pageTitle = '结算单_页面标题';
			replyData.headerTit = replyData.headerTit;
			return res.render('settlement/settlementForm', replyData);			// 渲染页面(指定模板, 数据)

		});
	}
};




// API路由: 查看结算单_卖家 ------------------------------------
exports.sellerView = function (req, res, next) {

	var req_id = req.query.id;

	//checker.orderId(req_id);
	req.userId = req.session.user.id;

	// 异步调取Java数据
	var url = apiHost.host + 'settlement/sellerView?orderId='+ req_id +'&sellerId='+ req.userId;
	request(url, function (err, data) {
		if (err) return next(err);

		if (data && data.body){
			var replyData = JSON.parse(data.body);
			return res.send(replyData);
		}else{
			return next(new Error('Nock error!'))
		}
	});
};
