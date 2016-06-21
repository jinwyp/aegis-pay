var nock = require('nock');
var API  = require('../../api/v1/api_config');
var billSetting = nock(API.host).log(console.log);
var billSettingPersist = nock(API.host).log(console.log).persist();

billSettingPersist.get('/settlement/billSetting').reply(200,
    {
        "settleInfo":[
            {
                "account"      :"和略电子商务有限公司",
                "taxpayerID" :'234567898765434567',
                "addDate"   :'2016.05.10',
                "settleStatus" :1,

            },
            {
                "account"      :"和略电子商务有限公司",
                "taxpayerID" :'9876543234567876543',
                "addDate"   :'2016.05.10',
                "settleStatus" :0,

            }

        ],




    })

module.exports = billSetting;