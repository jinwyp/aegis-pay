/**
 * 结算单.开发票流程:
 * 1. (结算) 确认开票信息： (参数: userId orderId)
 * 新增发票(载入已有发票数据 userId orderId) —> 填写order备注 (userId, orderId) --> (结算)结算完成 /getOrderDetail?orderId=
 *
 * 2. 开票设置列表:	(参数:  userId)
 * 新增：新增发票	userId  —> 开票设置列表 /settlement/billSetting
 * 修改：修改发票(载入已有发票数据) userId —> 开票设置列表 /settlement/billSetting
 */


var request  	= require('../../libs/request');
var _ 			= require('lodash');
var path	 	= require('path');
var config	 	= require('../../config');
var SystemError = require('../../errors/SystemError');
var logger     	= require("../../libs/logger");
var checker  	= require('../../libs/datachecker');			// 验证
var apiHost  	= require('../../api/v1/api_config');           // 接口路径配置



// 页面路由.确认开票, 新建开票
exports.addInvoiceInfo = function (req, res, next) {
	var orderId = _.trim(req.query.orderId),
        userId = req.session.user.id;

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
		}

		var replyData = {
			pageTitle: '结算.编辑开票信息页',
			headerTit: '开票信息',
			subTitle: '确认开票信息',
			orderId: orderId
		};
		
		Object.assign(replyData, resBody);
		console.log('/* ---replyData-99988888--------------------------------------- */');
		//replyData.data.receiptTypeList = [
		//	{ type: 'type_001', sequence: 1, name: '增值税专用发票' },
		//	{ type: 'type_002', sequence: 2, name: '增值税专用发票_2' },
		//	{ type: 'type_003', sequence: 3, name: '增值税专用发票_3' },
		//	{ type: 'type_004', sequence: 4, name: '增值税专用发票_4' }];
		console.dir(replyData.data.receiptTypeList);
		console.dir(replyData);
		//console.log(replyData.receipt.companyName);
		return res.render('settlement/confirmTheInvoice', replyData);			// 渲染页面(指定模板, 数据)
	});
};


// 页面路由.提交开票信息
exports.submitInvoiceInfo = function (req, res, next) {
	var templateUrl = _.trim(req.body.templateUrl),
		companyAddress = _.trim(req.body.companyAddress),
		companyPhone = _.trim(req.body.companyPhone),
		companyFax = _.trim(req.body.companyFax),
		identificationNumber= _.trim(req.body.identificationNumber),
		bankName = _.trim(req.body.bankName),
		bankAccount = _.trim(req.body.bankAccount),
		type = _.trim(req.body.type),
		userId = req.session.user.id;

	var url = config.rest_address + "finance/receipt/addUpdate";
	var param = {
		companyAddress : companyAddress,
		companyPhone : companyPhone,
		companyFax : companyFax,
		identificationNumber: identificationNumber,
		bankName : bankName,
		bankAccount : bankAccount,
		type : type,
		templateUrl : config.file_path.root + config.file_path.compact + '/' + templateUrl,
		userId: userId
	};

	console.log(param);
	request.post(url, {form: param}, function(err,httpResponse,body) {
		if (err) return next(err);
		console.log("-------------- succ ---------------");

		var resBody = JSON.parse(body);

		if (resBody.success == false) {
			//ToDo: throw error: service error.
			logger.error("submitInvoiceInfo: 提交开票信息 service 错误");
			return next(new SystemError(500, resBody.error));
		}

		console.log("-------------- resp ---------------");
		console.log(req.body);

        return res.json({success: true});
	});
};


// 页面路由.开票备注
exports.invoiceNotes = function (req, res, next) {
	var orderId = req.query.orderId,
		userId = req.session.user.id;

	checker.orderId(orderId);
	var url = apiHost.host + "finance/receipt?orderId=" + orderId + "&userId=" + userId;

	request.get(url, function (err,httpResponse,body) {
		if (err) return next(err);

		var resBody = JSON.parse(body);
		var replyData = {
			pageTitle : '结算.查看开票信息页',
			headerTit: '开票信息',
			subTitle: '确认开票信息',
			editable : true
		};
		Object.assign(replyData, resBody);
		console.log("-------------- replyData -246--------------");
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

	var url = apiHost.host + "mall/order/receiptRemarks/addUpdate";
	var param = {
		"userId": userId,
		"orderId": orderId,
		"requirement": requirement,
		"specialRequirement": specialRequirement,
		"version": version
	};

	request.post(url, {form: param}, function(err,httpResponse,body) {
		if (err) return next(err);
		console.log("-------------- succ ---------------");

		var resBody = JSON.parse(body);

		if (resBody.success == false) {
			//ToDo: throw error: service error.
			logger.error("submitInvoiceNotes: 提交开票备注 service 错误");
			return next(new SystemError(500, resBody.error));
		}

		return res.json({success: true});
	});
};


// 下载模板.路由
exports.downInvoiceTemplate = function (req, res, next) {
	var fileUrl = config.viewspdf + '/downInvoiceTemplate.docx';

	res.download(fileUrl, function(err, data){
		console.log('-----下载模板-成功---------views/global/pdftemplate/invoiceTemplate.jpg  ');
	});
};


// 图片预览.路由
exports.imgViewApi = function (req, res, next) {
	var key = req.query.key || '';
	var imgSrc = config.view_file + key;

	console.log('---imgViewApi-----------------------------------');
	console.log(key);
	console.log(imgSrc);

	if(key) {
		res.download(imgSrc, path.basename(imgSrc), function(err,data){
			if(err) return next(err);
		});
	}
};