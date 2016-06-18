var nock = require('nock');
var API  = require('../../api/v1/api_config');
var bindingBankAccount        = nock(API.host).log(console.log);
var bindingBankAccountPersist = nock(API.host).persist();

bindingBankAccountPersist.get('/wealth/bindingBankAccount').reply(200,
{
    "bankList" : [{bankName:"中国华夏银行",bankCode:"3002123"},{bankName:"中国工商银行",bankCode:"123456"}],
    "proviceList" : [{provinceName:"黑龙江省",provinceCode:"10201"},{provinceName:"辽宁省",provinceCode:"39201"}]
});

module.exports = bindingBankAccount;