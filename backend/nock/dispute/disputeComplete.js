var nock = require('nock');
var API  = require('../../api/v1/api_config');
var disputeComplete        = nock(API.host).log(console.log);
var disputeCompletePersist = nock(API.host).persist();

disputeCompletePersist.get('/dispute/disputeComplete').reply(200, {

    
    });

module.exports = disputeComplete;