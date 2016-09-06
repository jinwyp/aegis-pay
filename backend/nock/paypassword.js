var nock = require('nock');
var API = require('../api/v1/api_config');
var _ = require('lodash');

var paypasswordPersist = nock(API.host).persist();

paypasswordPersist
.post('/account/fund/payPwd/forget/next').reply(200, function(uri, requestBody){
    if(requestBody.companyUniqueCode.length<10){
        return { 'success': false };
    }
    return {'success': true};
})
// .get('/account/fund/payPwd?userId=123').reply(200, {'success':true, 'data':{'userFundAccount':18623232323}})
.get('/account/fund/payPwd?userId=213').reply(409, {'success':false, errorCode:409, error:'用户不存在', 'data':{'userFundAccount':18623232323}})
.get('/account/fund/payPwd/forget/first').reply(200, {'success':false, 'data':{'payPhone':18623232323}})
.post('/account/fund/payPwd/forget/submit').reply(200, {'success':true})
// errorCode: 1004 原支付密码错误
.post('/account/fund/payPwd/rem/submit').reply(200, {'success':true, 'errorCode':1004})

module.exports = paypasswordPersist;
