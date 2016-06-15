var nock = require('nock');
var API  = require('../../api/v1/api_config');
var notice = nock(API.host).log(console.log);
var noticePersist = nock(API.host).log(console.log).persist();

noticePersist.get('/account/notice').reply(200,
    {
        "noticeInfo":[
            {
                "operation"     : "退款到附属账户",
                "account"       : "99009",
                "money"        : 2345645
            },
            {
                "operation"     : "充值到附属账户",
                "account"       : "92329",
                "money"        : 300000
            }
        ]



    })

module.exports = notice;