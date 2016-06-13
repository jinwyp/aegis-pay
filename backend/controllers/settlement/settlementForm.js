/**
 * 开具结算单 [及类型, 页面状态]
 * 业务控制 (模板 & 数据请求)
 * type: buy 1买家; sell 2卖家
 * status:
 *   1.待结算 (开具结算单)
 *   2.待审核;
 *   3.审核不通过;
 *   4.审核完成;
 *   5.结算完成;
 WaitSettleAccounts("待卖家结算"),         	//1 待结算:卖家
 WaitVerifySettle("待审核结算"),           	//2 待审核:买家
 ReturnedSettleAccounts("结算被退回"),     	//3 审核不通过:退回,卖家重新结算
 WaitPayTailMoney("待买家补款"),           	//4 通过:已经审核结算-待买家补款
 WaitPayRefundMoney("待卖家退款"),         	//5 通过:结算完成-待卖家退款
 WaitWriteReceipt("待卖家开发票"),         	//6 通过:待卖家开发票

 查看结算单.卖家 	settlement/sellerView 			../mall/order/seller/settle
 提交结算单.卖家 	settlement/sellerSubmit 		../mall/order/seller/settle/submit
 查看结算单.买家 	settlement/buyersView 			../mall/order/settle
 退回结算单.买家 	settlement/buyersReturn 		../mall/order/settle/return
 修改退回原因买家 	settlement/buyersEditReason 	../mall/order/settle/return/editreason
 审核结算单.买家 	settlement/buyersAuditing 		../mall/order/settle/submit
 下载打印结算单: 	settlement/downPrint 			..

 备注: 根据不同的订单, 返回不同的订单状态, 根据不同的状态显示不同的内容
 */
var request = require('request');
var checker    = require('../../libs/datachecker');			// 验证
var apiHost  = require('../../api/v1/api_config');          // 接口路径配置


// 页面路由
exports.orderSettlement = function (req, res, next) {

	var req_id = req.query.id,
		req_type = req.query.type,
		typeArr = ['none', 'buy', 'sell'];

	checker.orderId(req_id);
	req.userId = req.session.user.id;

	if(!req_id) {
		res.send('<p>请输入 订单编号!</p>');
	} else {
		console.log('-=-控制层-=-=-=-=-=-=-=-=-=-id: '+ req_id+' ,type: '+ req_type);

		var url = apiHost.host + '/settlement/settlementForm?orderId=' + req_id +'&type='+ typeArr[req_type];
		request(url, function (err, data) {
			if (err) return next(err);

			var replyData = JSON.parse(data.body);
			replyData.pageTitle = '结算单_页面标题';
			replyData.headerTit = replyData.headerTit;
			res.render('settlement/settlementForm', replyData);			// 渲染页面(指定模板, 数据)

		});
	}
};




// API路由: 查看结算单_卖家 ------------------------------------
exports.sellerView = function (req, res, next) {

	var req_id = req.query.id;

	checker.orderId(req_id);
	req.userId = req.session.user.id;

	// 异步调取Java数据
	var url = apiHost.host + '/settlement/sellerView?orderId='+ req_id +'&sellerId='+ req.userId;
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
