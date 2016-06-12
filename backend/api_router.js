var express = require('express');
var router  = express.Router();

var sms = require('./common/sms_code');
var captcha = require('./middlewares/captcha');

var siteController      = require('./api/v1/site');
var compactApi          = require('./api/v1/compact');
var orderCloseApi       = require('./controllers/order/orderClose');                 // 关闭订单 模块(文件路径)
var settlementFormApi   = require('./controllers/settlement/settlementForm');        // 结算单页面 模块(控制文件路径)
var confirmDelivery     = require('./api/v1/confirmDelivery');
var confirmComplete     = require('./controllers/confirmComplete');
var payApi              = require('./api/v1/pay');




// demo
router.get('/apps', siteController.apps);
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
router.get('/order/orderInfo_api', orderCloseApi.orderInfo_api);				    // 关闭订单: 订单信息Api
router.get('/order/closeOrder_api', orderCloseApi.closeOrder_api);				    // 关闭订单: 提交关闭Api
router.get('/confirmDelivery/test', confirmDelivery.test);
router.get('/confirmComplete/test', confirmComplete.cp);
router.post('/pay/submit', payApi.submit);
router.get('/imgcode', captcha.genCaptcha('_ccapimgtxt_pay'));
router.post('/validImgcode', captcha.verifyCaptcha('_ccapimgtxt_pay'), sms.send_sms2);
router.get('/settlement/sellerView', settlementFormApi.sellerView);                 // 结算单: 查看结算单_卖家






router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

module.exports = router;
