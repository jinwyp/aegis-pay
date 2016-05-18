var nock = require('nock');
var API = require('../api/v1/api_config');

var compact = nock(API.host);

compact
.get('/compact?orderid=1&action=get').reply(200, {
  "success": true,
  "compact":'/Users/beatacao/work/aegis-pay/servicestatic/compact.html'
})
.post('/upload-file').reply(200, {
  success: true,
  attach: [
    {'filename':'aaa.png', 'path': '1'},
    {'filename':'bbb.jpg', 'path': '2'},
    {'filename':'ccc.gif', 'path': '3'}
  ]
})
.post('/compact').reply(200, {
  success: true,
  orderid: 1
})
.post('/del-file').reply(200, {
  success: true
})

module.exports = compact;
