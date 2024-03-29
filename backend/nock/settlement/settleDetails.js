var nock = require('nock');
var API  = require('../../api/v1/api_config');
var settleDetails = nock(API.host).log(console.log);
var settleDetailsPersist = nock(API.host).log(console.log).persist();

settleDetailsPersist.get('/settlement/settleDetails').reply(200,
    {
        "settleInfo":[
            {
                "money"        : 100000000,
                "changeNumber" :'0000001',
                "settleDate"   :'2016.05.10',
                "account"      :"和略电子商务有限公司",
                "settleStatus" :1,

            },
            {
                "money"        : 2345645,
                "changeNumber" :2345,
                "settleDate"   :'2016.05.10',
                "account"      :"和略电子商务有限公司",
                "settleStatus" :0,

            },
            {
                "money"        : 2345645,
                "changeNumber" :2345,
                "settleDate"   :'2016.05.10',
                "account"      :"和略电子商务有限公司",
                "settleStatus" :1,

            },
            {
                "money"        : 2345645,
                "changeNumber" :2345,
                "settleDate"   :'2016.05.10',
                "account"      :"和略电子商务有限公司",
                "settleStatus" :0,

            }

        ],




    })

module.exports = settleDetails;