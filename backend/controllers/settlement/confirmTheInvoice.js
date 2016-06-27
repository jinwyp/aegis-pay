/**
 * 结算单.确认开票
 * 业务控制 (模板 & 数据请求)

 */

var request  = require('../../libs/request');
var _ = require('lodash');
var config = require('../../config');
var SystemError = require('../../errors/SystemError');

var logger     = require("../../libs/logger");
var checker  = require('../../libs/datachecker');			// 验证
var apiHost  = require('../../api/v1/api_config');          // 接口路径配置


// // test data
// var addInvoiceInfoTestData = {
// 	success: true,
// 	error: '错误msg',
// 	errorCode: 30001,
// 	data: {
// 		orderId: 1234,
// 		receipt: {
// 			companyName:	'和略电子商务有限公司12345',
// 			companyAddress:     '用户公司地址',        //用户公司地址
// 			companyPhone:       '12345678900987',        //公司电话
// 			companyFax:         '021-1234567',          //公司传真
// 			identificationNumber:	'87653432354657',       //纳税人识别号
// 			bankNam:           '招商银行',          //开户银行名称
// 			bankAccount:        '1234567890098765',         //银行账号名称
// 			type:               '1',                //发票类型id
// 			templetUrl:         '/files/upload/3eb4d184-5c26-4a10-ba59-158807007a24.png'            //发票样板图片url
// 		},
// 		companyName: '公司名称',
// 		receiptTypeList: [{sequence: 1, name:'增值税发票'}]
// 	}
// }


/**
 * 各发票流程:
 * 1. (结算) 确认开票信息： (参数: userId orderId)
 * 新增发票(载入已有发票数据 userId orderId) —> 填写order备注 (userId, orderId) --> (结算)结算完成 /getOrderDetail?orderId=
 * 
 * 2. 开票设置列表:	(参数:  userId)
 * 新增：新增发票	userId  —> 开票设置列表 /settlement/billSetting
 * 修改：修改发票(载入已有发票数据) userId —> 开票设置列表 /settlement/billSetting
 */

// 页面路由.确认开票, 新建开票
exports.addInvoiceInfo = function (req, res, next) {
	var orderId = _.trim(req.query.orderId),
        userId = req.session.user.id;

	// if(!orderId) {
	// 	return res.json({success: false, error: '请输入订单编号!'});
	// }
	//ToDo:
    // userId = 213;
	var url = apiHost.host + 'finance/receipt?userId=' + userId;
    if (orderId != "") {
        checker.orderId(orderId);
        url += "&orderId=" + orderId;
    }
	// var url = apiHost.host + '/finance/receipt?orderId=' + req_id +'&userId=213';
	console.log('-=-控制层-=-=-=-=-=-=-=-=-=- URL : '+ url );

	request.get(url, function (err, httpResponse, body) {
		if (err) return next(err);
		
		var resBody = JSON.parse(body);
		if (resBody.success == false) {
			//ToDo: throw error: service error.
			logger.error("addInvoiceInfo: 确认开票 service 错误");
			return next(new SystemError(resBody.status, resBody.error));
			// return res.json ({
			// 	"success": resBody.success,
			// 	"error": resBody.error,
			// 	"errorCode": resBody.errorCode});
		};

		var replyData = {
			headerTit: '结算单.获取开票信息',
			subTitle: '确认开票信息',
			pageTitle: '结算_确认开票信息'
		};
		
		Object.assign(replyData, resBody);

		console.log('/* ---replyData---------------------------------------- */');
		console.log(replyData);
		return res.render('settlement/confirmTheInvoice', replyData);			// 渲染页面(指定模板, 数据)

	});

};


// 页面路由.提交开票信息
exports.submitInvoiceInfo = function (req, res, next) {
	// res.status(409);
	var templetUrl = _.trim(req.body.templetUrl),
		companyAddress = _.trim(req.body.companyAddress),
		companyPhone = _.trim(req.body.companyPhone),
		companyFax = _.trim(req.body.companyFax),
		identificationNumber= _.trim(req.body.identificationNumber),
		bankName = _.trim(req.body.bankName),
		bankAccount = _.trim(req.body.bankAccount),
		type = _.trim(req.body.type),
		userId = req.session.user.id;

	// var url = config.rest_address + "/finance/receipt/addUpdate";
	var url = config.rest_address + "finance/receipt/addUpdate";

	var param = {
		companyAddress : companyAddress,
		companyPhone : companyPhone,
		companyFax : companyFax,
		identificationNumber: identificationNumber,
		bankName : bankName,
		bankAccount : bankAccount,
		type : type,
		templetUrl : templetUrl,
		userId: userId
	}

	// for in obj, trim & validate
	// var param = Object.assign(param, req.body)

	// request.post(url, {form: param}, function(err,httpResponse,body) {
	// 	if (err) return next(err);
	// });

	// console.log(param);

	request.post(url, {form: param}, function(err,httpResponse,body) {
		if (err) return next(err);
		console.log("-------------- succ ---------------");
		var resBody = JSON.parse(body);

		// console.log(resBody);

		if (resBody.success == false) {
			//ToDo: throw error: service error.
			logger.error("submitInvoiceInfo: 提交开票信息 service 错误");
			return next(new SystemError(500, resBody.error));
		};

		console.log("-------------- resp ---------------");
		console.log(req.body);

		// console.log("templetUrl", "companyAddress", "companyPhone", "companyFax", "identificationNumber", "bankName", "bankAccount", "type")
		// console.log(templetUrl,  companyAddress,  companyPhone,  companyFax,  identificationNumber,  bankName,  bankAccount,  type);

        return res.json({success: true});
	})




}

// 页面路由.开票备注
exports.invoiceNotes = function (req, res, next) {
	var orderId = req.query.orderId,
		userId = req.session.user.id;

	checker.orderId(orderId);

	var url = apiHost.host + "finance/receipt?orderId=" + orderId + "&userId=" + userId;
	// var url = apiHost.host + "/finance/receipt?orderId=" + orderId + "&userId=" + userId;

	console.log('-=-控制层-=-=-=-=-=-=-=-=-=- URL : '+ url );

	request.get(url, function (err,httpResponse,body) {
		if (err) return next(err);

		var resBody = JSON.parse(body);
		var replyData = {
			headerTit: '添加开票备注',
			pageTitle : '开票信息',
			editable : true
		}
		Object.assign(replyData, resBody);

		console.log("-------------- replyData ---------------");
		console.dir(replyData);

		return res.render('settlement/addInvoiceNotes', replyData);			// 渲染页面(指定模板, 数据)

	});
};

// 提交开票备注
exports.submitInvoiceNotes = function (req, res, next) {
	var orderId = _.trim(req.body.orderId),
		version = _.trim(req.body.version),
		requirement = _.trim(req.body.requirement),
		specialRequirement = _.trim(req.body.specialRequirement),
		userId = req.session.user.id;

	console.log("-------------- waht the fuck??? ---------------");
	checker.orderId(orderId);
	// ToDo: validation
	// ToDo: change url
	var url = apiHost.host + "mall/order/receiptRemarks/addUpdate";
	// var url = apiHost.host + "/mall/order/receiptRemarks/addUpdate";
	// console.log(url);

	var param = {
		"userId": userId,
		"orderId": orderId,
		"requirement": requirement,
		"specialRequirement": specialRequirement,
		"version": version
	}

	// console.log(param);
	request.post(url, {form: param}, function(err,httpResponse,body) {
		if (err) return next(err);
		console.log("-------------- succ ---------------");

		var resBody = JSON.parse(body);

		// console.log(resBody);
		if (resBody.success == false) {
			//ToDo: throw error: service error.
			logger.error("submitInvoiceNotes: 提交开票备注 service 错误");
			return next(new SystemError(500, resBody.error));
		};

		return res.json({success: true});
	})
}