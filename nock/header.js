var nock = require('nock');
var API = require('../api/v1/api_config');

var compact = nock(API.host);

compact
    .get('/header').reply(200, {
      "success": true
    })

module.exports = compact;
