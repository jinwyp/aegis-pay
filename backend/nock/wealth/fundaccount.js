var nock = require('nock');
var API  = require('../../api/v1/api_config');

var fundAccountPersist = nock(API.host).persist();
var times = 0;
fundAccountPersist
.post('/account/fund/create').reply(200, {success:true})
.post('/account/fund/create/checkStatus').reply(200, function(uri){
    times++;
    var result = {success:true, data:{
        'success':2,
        'userAcccount': {
            'accountName': '中信银行',
            'accountBank': '闸北分行',
            'account':  '3434565678781212',
            'accountType': '账户类型'
        }
    }}
    if(times>=3){
        result.data.success = 3;
        times = 0;
    }
    return result;
})
.post('/account/fund/checkFundAccount').reply(200, {success:true, data:{success:true}})
.get(/\/account\/fund\/info\?userId=\d/).reply(200, {"success":true, "data":{
    "fundAccount": {"accountType": 1,
            "accountBankName": 332323232323232,
            "account": 232321212121212,
            "createTime": 8989898999990,
            "payPhone": 18798989898},
    "userFundAccountStatus": '2',
    "cashAccount":{
        "companyName":'公司名称xxx'
    }
}})

module.exports = fundAccountPersist;
