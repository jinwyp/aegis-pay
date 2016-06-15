var express = require('express');
var router = express.Router();

var sms = require('./libs/sms_code');
var captcha = require('./libs/captcha');

var siteController = require('./api/v1/site');
var compactApi = require('./api/v1/compact');
var orderCloseApi = require('./controllers/order/orderClose');                  // 关闭订单 模块(文件路径)
var settlementFormApi = require('./controllers/settlement/settlementForm');     // 结算单页面 模块(控制文件路径)
var confirmDelivery = require('./api/v1/confirmDelivery');
var confirmComplete = require('./controllers/confirmComplete');
var disputeApply = require('./controllers/disputeApply');
var disputeCancel = require('./controllers/disputeDetail');
var payApi          = require('./api/v1/pay');



var payApi = require('./api/v1/pay');
var paypasswordApi = require('./api/v1/paypassword');

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
router.get('/order/closeOrder_api', orderCloseApi.closeOrder_api);				// 关闭订单: 提交关闭Api
router.get('/settlement/sellerView', settlementFormApi.sellerView);             // 结算单: 查看结算单_卖家
router.post('/confirmDelivery/confirmDeliveryIndex', confirmDelivery.confirmDeliveryIndex);
router.get('/confirmComplete/test', confirmComplete.confirmComplete);
router.post('/disputeApply', disputeApply.dispute);
router.post('/disputeCancel', disputeCancel.disputeCancel);



router.get('/imgcode', captcha.sendCode('_ccapimgtxt_pay'));
router.post('/validImgcode', captcha.verifyMiddleware('_ccapimgtxt_pay'), sms.sendCode);
router.post('/pay/submit', sms.verifyMiddleware(), payApi.submit);

router.post('/paypassword/forget/valid', sms.verifyMiddleware(), paypasswordApi.forgetValid);
router.post('/paypassword/forget/submit', paypasswordApi.forgetSubmit);

router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

module.exports = router;
