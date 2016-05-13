var nock = require('nock');
var API = require('../api/v1/api_config');

var compact = nock(API.host);

compact
.get('/compact?orderid=1&action=get').reply(200, {
  "success": true,
  "compact":'/Users/beatacao/work/aegis-pay/servicestatic/compact.html'
})

module.exports = compact;
