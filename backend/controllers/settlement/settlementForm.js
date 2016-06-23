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
  	WaitWriteReceipt	 	审核通过.待卖家开发票(_)

	查看结算单:卖家 		settlement/sellerView 			../mall/order/seller/settle
	提交结算单:卖家 		settlement/sellerSubmit 		../mall/order/seller/settle/submit
	查看结算单:买家 		settlement/buyersView 			../mall/order/settle
	退回结算单:买家 		settlement/buyersReturn 		../mall/order/settle/return ;
	修改退回原因买家 		settlement/buyersEditReason 	../mall/order/settle/return/editreason ;
	审核结算单:买家 		settlement/buyersAuditing 		../mall/order/settle/submit
	下载打印结算单: 		settlement/downPrint 			..     */


var request  = require('request');
var checker  = require('../../libs/datachecker');			// 验证
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
			replyData.headerTit = '结算单';

			if(req_type == 1) {
				replyData.subTitle = '结算单详情';
				replyData.userType = 'buy';
			} else if(req_type == 2) {
				replyData.subTitle = '开具结算单';
				replyData.userType = 'sell';
			}

			return res.render('settlement/settlementForm', replyData);			// 渲染页面(指定模板, 数据)

		});
	}

};








// +_+_API部分_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_

// API路由: *卖家.查看结算单.待结算 --------- http://localhost:3001/api/settlement/sellerView?id=110000
var sellerView = exports.sellerView = function (req, res, next) {
	var orderId = req.query.id,
		userId = req.session.user.id;

	var param = {
		orderId: orderId,
		sellerId: userId
	};

	var url = apiHost.host + 'settlement/sellerView';
	request(url, param, function (err, data) {
		if (err) return next(err);

		if (data && data.body){
			var replyData = JSON.parse(data.body);

			replyData.headerTit = '待结算.卖家开具结算单 211';
			replyData.subTitle = '开具结算单.s';
			replyData.userType = 'sell';

			return res.send(replyData);
		}else{
			return next(new Error('Nock error!'))
		}
	});
};

// API路由: *卖家.查看结算单.待审核 --------- http://localhost:3001/api/settlement/sellerView?id=210000
// API路由: *卖家.查看结算单.已退回 --------- http://localhost:3001/api/settlement/sellerView?id=310000


// API路由: *买家.查看结算单.待审核 --------- http://localhost:3001/api/settlement/buyersView?id=220000
var buyersView = exports.buyersView = function (req, res, next) {
	var orderId = req.query.id,
		userId = req.session.user.id;

	var param = {
		orderId: orderId,
		userId: userId
	};

	var url = apiHost.host + 'settlement/buyersView';
	request(url, param, function (err, data) {
		if (err) return next(err);

		if (data && data.body){
			var replyData = JSON.parse(data.body);

			replyData.headerTit = '待审核.买家审核结算单 2222222222';
			replyData.subTitle = '审核结算单.b';
			replyData.userType = 'buy';

			return res.send(replyData);
			//return res.render('settlement/settlementForm', replyData);	//渲染到模板
		}else{
			return next(new Error('Nock error!'))
		}
	});
};

// API路由: *买家.查看结算单.已退回 --------- http://localhost:3001/api/settlement/buyersView?id=320000


// API路由: *下载打印结算单 --------- http://localhost:3001/api/settlement/downPrint?id=110101
var downPrintSettle = exports.downPrintSettle = function (req, res, next) {
	var orderId = req.query.id,
		userId = req.session.user.id;

	var param = {
		orderId: orderId,
		sellerId: userId
	};

	var url = apiHost.host + 'settlement/downPrintSettle';
	request(url, param, function (err, data) {
		if (err) return next(err);

		if (data && data.body){
			var replyData = JSON.parse(data.body);

			replyData.headerTit = '打印下载结算单.9999';
			replyData.subTitle = '打印下载结算单.s';
			replyData.userType = 'sell';

			return res.send(replyData);
		}else{
			return next(new Error('Nock error!'))
		}
	});
};


// API路由: 卖家.提交结算单 --------- http://localhost:3001/api/settlement/sellerSubmit
var sellerSubmit = exports.sellerSubmit = function (req, res, next) {
	//var req_id = req.query.id,
	//	userId = req.session.user.id;

	var url = apiHost.host + 'settlement/sellerSubmit';
	request.post(url, {body:req.body, json:true}, function (err, data) {
		if (err) return next(err);

		if (data && data.body){
			var replyData = data.body;

			replyData.headerTit = '待结算.卖家开具结算单 11111111';
			return res.send(replyData);
		}else{
			return next(new Error('Nock error!'))
		}
	});
};


// API路由: 买家.退回结算单 --------- http://localhost:3001/api/settlement/buyersReturn
var buyersReturn = exports.buyersReturn = function (req, res, next) {

	var url = apiHost.host + 'settlement/sellerSubmit';
	request.post(url, {body:req.body, json:true}, function (err, data) {
		if (err) return next(err);

		if (data && data.body){
			var replyData = data.body;

			replyData.headerTit = '待审核.买家退回结算单 220000';
			return res.send(replyData);
		}else{
			return next(new Error('Nock error!'))
		}
	});
};


// API路由: 买家.修改退回原因 --------- http://localhost:3001/api/settlement/buyersEditReason
var buyersEditReason = exports.buyersEditReason = function (req, res, next) {
	var url = apiHost.host + 'settlement/buyersEditReason';
	//var url = apiHost.buyersEditReason;
	request.post(url, {body:req.body, json:true}, function (err, data) {
		if (err) return next(err);

		if (data && data.body){
			var replyData = data.body;

			replyData.headerTit = '审核不通过.买家修改退回原因 320000';
			return res.send(replyData);
		}else{
			return next(new Error('Nock error!'))
		}
	});
};


// API路由: 买家.结算审核通过 --------- http://localhost:3001/api/settlement/buyersAuditing
var buyersAuditing = exports.buyersAuditing = function (req, res, next) {
	var url = apiHost.host + 'settlement/buyersAuditing';
	request.post(url, {body:req.body, json:true}, function (err, data) {
		if (err) return next(err);

		if (data && data.body){
			var replyData = data.body;

			replyData.headerTit = '待审核_买:WaitVerifySettle.买家.结算审核通过 220000';
			return res.send(replyData);
		}else{
			return next(new Error('Nock error!'))
		}
	});
};


