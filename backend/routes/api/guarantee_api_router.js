var express = require('express');
var router = express.Router();

var sms = require('../../libs/sms_code');
var captcha = require('../../libs/captcha');


var guaranteePayApi            = require('../../api/guarantee/pay');

router.post('/guarantee/pay/submit', sms.verifyMiddleware(), guaranteePayApi.submit);

router.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

module.exports = router;
