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
.get('/account/fund/payPwd').reply(200, {'success':true, 'data':{'userFundAccount':18623232323}})
.get('/account/fund/payPwd/forget/first').reply(200, {'success':true, 'data':{'payPhone':18623232323}})
.post('/account/fund/payPwd/forget/submit').reply(200, {'success':true})

module.exports = paypasswordPersist;
