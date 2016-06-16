var nock = require('nock');
var API  = require('../../api/v1/api_config');
var bindingBankAccount        = nock(API.host).log(console.log);
var bindingBankAccountPersist = nock(API.host).persist();

bindingBankAccountPersist.get('/wealth/bindingBankAccount').reply(200,
{
        
});

module.exports = bindingBankAccount;