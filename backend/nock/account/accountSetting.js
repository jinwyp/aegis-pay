var nock = require('nock');
var API  = require('../../api/v1/api_config');
var accountSetting        = nock(API.host).log(console.log);
var accountSettingPersist = nock(API.host).log(console.log).persist();

accountSettingPersist.get('/account/accountSetting').reply(200,
    {
        "accountInfo":{
            "name"          : "Lily",
            "work"          : "员工",
            "phone"         : "18000000002",
            "registerDate"  : "2016.01.02",
            "email"         : "wudan@yimei180.com",
            "accountStatus" : "3"
        }
    

})

module.exports = accountSetting;