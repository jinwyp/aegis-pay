var express = require('express');
var router = express.Router();

var sms = require('../../libs/sms_code');
var captcha = require('../../libs/captcha');


var guaranteePayApi            = require('../../api/guarantee/pay');
var guaranteeOrderApi            = require('../../api/guarantee/order');

router.post('/guarantee/pay/submit', sms.verifyMiddleware(), guaranteePayApi.submit);
router.post('/guarantee/order/cancel', guaranteeOrderApi.guaranteeOrderCancel);
router.post('/guarantee/order/submitSettleMoney', guaranteeOrderApi.guaranteeSubmitSettle);

router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

module.exports = router;
