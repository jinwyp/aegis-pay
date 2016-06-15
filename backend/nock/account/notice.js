var nock = require('nock');
var API  = require('../../api/v1/api_config');
var notice = nock(API.host).log(console.log);
var noticePersist = nock(API.host).log(console.log).persist();

noticePersist.get('/account/notice').reply(200,
    {
        "noticeInfo":[
            {
                "operation"     : "退款到附属账户11",
                "account"       : "99009",
                "money"        : 2345645
            },
            {
                "operation"     : "充值到附属账户22",
                "account"       : "92329",
                "money"        : 125215
            },
            {
                "operation"     : "充值到附属账户33",
                "account"       : "12343125",
                "money"        : 1235235
            }
        ],
        



    })

module.exports = notice;