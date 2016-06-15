var nock = require('nock');
var API = require('../api/v1/api_config');
var _ = require('lodash');

var paypasswordPersist = nock(API.host).persist();

paypasswordPersist
.post('/paypassword/forget/valid').reply(200, function(uri, requestBody){
    if(requestBody.cardID.length<10){
        return { 'success': false };
    }
    return {'success': true};
})
.get('/account/payPwd').reply(200, {'success':true, 'data':{'userFundAccount':23243435}})
.get('/account/payPwd/forget/first').reply(200, {'success':true, 'data':{'payPhone':18623232323}})

module.exports = paypasswordPersist;
