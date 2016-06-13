var nock = require('nock');
var API = require('../api/v1/api_config');
var _ = require('lodash');

var paypasswordPersist = nock(API.host).persist();

paypasswordPersist
.post('/paypassword/forget/valid').reply(200, {"success":true})

module.exports = paypasswordPersist;
