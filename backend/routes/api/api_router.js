var express = require('express');
var router = express.Router();

var sms = require('../../libs/sms_code');
var captcha = require('../../libs/captcha');


var siteController    = require('../../api/v1/site');
var compactApi        = require('../../api/v1/compact');
var orderCloseApi     = require('../../controllers/order/orderClose');                  // 关闭订单 模块(文件路径)
var settlementFormApi = require('../../controllers/settlement/settlementForm');         // 结算单页面 模块(控制文件路径)
var confirmDelivery   = require('../../api/v1/confirmDelivery');
var confirmComplete   = require('../../controllers/confirmComplete');
var disputeApply      = require('../../controllers/disputeApply');
var disputeCancel     = require('../../controllers/disputeDetail');
var payApi            = require('../../api/v1/pay');
var payPasswordApi    = require('../../api/v1/paypassword');
var bindingBankAccount = require('../../controllers/wealth/bindingBankAccount');


var financialApi    = require('../../api/v1/financialDetails');

// demo
router.get('/user', siteController.user);
router.get('/test-cache', siteController.test_cache);
router.get('/async-merge', siteController.asyncMerge);
router.get('/cogen-merge', siteController.cogenMerge);
router.get('/products', siteController.products);
router.get('/zips', siteController.zips);

// product
router.post('/upload-file', compactApi.uploadFile);
router.post('/del-file', compactApi.delFile);
router.post('/sign-compact', compactApi.signCompact);
router.get('/generate_compact', compactApi.generate_compact);

router.get('/order/orderInfo_api', orderCloseApi.orderInfo_api);				// 关闭订单: 订单信息Api
router.get('/order/closeOrder_api', orderCloseApi.closeOrder_api);				// 关闭订单: 提交关闭Api (路由, 控制模块)
router.get('/settlement/sellerView', settlementFormApi.sellerView);             // 结算单: 卖家.查看结算单
router.get('/settlement/sellerSubmit', settlementFormApi.sellerSubmit);         // 结算单: 卖家.提交结算单
router.get('/settlement/buyersView', settlementFormApi.buyersView);             // 结算单: 买家.查看结算单
router.get('/settlement/buyersReturn', settlementFormApi.buyersReturn);         // 结算单: 买家.退回结算单
router.get('/settlement/buyersEditReason', settlementFormApi.buyersEditReason); // 结算单: 买家.修改退回原因
router.get('/settlement/buyersAuditing', settlementFormApi.buyersAuditing);     // 结算单: 买家.结算审核通过
router.get('/settlement/downPrint', settlementFormApi.downPrint);               // 结算单: 下载打印结算单

router.post('/confirmDelivery/confirmDeliveryIndex', confirmDelivery.confirmDeliveryIndex);
router.get('/confirmComplete/test', confirmComplete.confirmComplete);
router.post('/disputeApply', disputeApply.dispute);
router.post('/disputeCancel', disputeCancel.disputeCancel);



router.get('/imgcode', captcha.sendCode('_ccapimgtxt_pay'));
router.post('/validImgcode', captcha.verifyMiddleware('_ccapimgtxt_pay'), sms.sendCode);
router.post('/pay/submit', sms.verifyMiddleware(), payApi.submit);


router.post('/paypassword/forget/valid', sms.verifyMiddleware(), payPasswordApi.forgetValid);
router.post('/paypassword/forget/submit', payPasswordApi.forgetSubmit);
router.post('/paypassword/modify/valid', sms.verifyMiddleware(), payPasswordApi.modifyValid);
router.post('/paypassword/modify/submit', payPasswordApi.modifySubmit);

router.post('/account/fund/bankCard/verify/submit',bindingBankAccount.remittance); //汇款金额确认

router.post('/financial/order/details', financialApi.financialDetailsApi);
router.post('/verifyCode', sms.verifyMiddleware(), bindingBankAccount.verifyCode);   //验证码确认

router.get('/bank/loadBankSiteCities',bindingBankAccount.cityList);   //城市下拉确认

router.post('/bank/bindingBankAccountChildBankName',bindingBankAccount.childBankName);   //开户行支行名称检索

router.post('/account/fund/bankCard/add/submit',bindingBankAccount.childBankNameSubmit);   //绑定银行卡提交




router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

module.exports = router;
