var nock = require('nock');
var API  = require('../../api/v1/api_config');
var bindingSuccess        = nock(API.host).log(console.log);
var bindingSuccessPersist = nock(API.host).persist();

bindingSuccessPersist.get('/wealth/bindingSuccess').reply(200,
{
    "userAccount" :{
        "status":2, //1没有汇款,2已经汇款
        "userFundBankName" : "中国人民银行",
        "userFundAccount" : "12345678123456",
        "userCompanyName" : "开户名称"
    }


});
module.exports = bindingSuccess;
