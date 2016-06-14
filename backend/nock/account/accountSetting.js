var nock = require('nock');
var API  = require('../../api/v1/api_config');
var accountSetting        = nock(API.host).log(console.log);
var accountSettingPersist = nock(API.host).persist();

accountSettingPersist.get('/account/accountSetting').reply(200,
    {
        "accountInfo":{
            "name"   : "Lily",
            "work"   : "员工"
        }
    

})

module.exports = accountSetting;