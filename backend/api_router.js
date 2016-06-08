var express = require('express');
var router  = express.Router();

var sms = require('./common/sms_code');
var captcha = require('./common/captcha');

var siteController  = require('./api/v1/site');
var compactApi      = require('./api/v1/compact');
var orderCloseApi   = require('./controllers/order/orderClose');                 // 关闭订单 模块(文件路径)
var confirmDelivery = require('./api/v1/confirmDelivery');
var confirmComplete = require('./controllers/confirmComplete');
var disputeApply = require('./controllers/disputeApply');
var payApi          = require('./api/v1/pay');




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
router.get('/confirmDelivery/test', confirmDelivery.test);
router.get('/confirmComplete/test', confirmComplete.confirmComplete);

router.post('/disputeApply', disputeApply.dispute);



router.get('/imgcode', captcha.sendCode('_ccapimgtxt_pay'));
router.post('/validImgcode', captcha.verifyMiddleware('_ccapimgtxt_pay'), sms.sendCode);
router.post('/pay/submit', sms.verifyMiddleware(), payApi.submit);




router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

module.exports = router;
