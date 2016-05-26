var nock = require('nock');
var API = require('../api/v1/api_config');
var _ = require('lodash');

var pay = nock(API.host);

pay
.get(function(uri){
  var ismatch = /mall\/order\/payment\?orderId=\d&userId=\d/.test(uri);
  return ismatch;
}).reply(200, function(uri){
  return {
    "success": true,
    "data": {"order": {
                    "id": _.split(_.split(_.split(uri,'?')[1],'&')[0], '=')[1],
                    "version": 2,
                    "sellerCompanyName":"易煤网",
                    "sellerFundAccount": "8098098099897387",
                    "totalMoney": 2000000000,
                    "sellerBalanceMoney": 29889000900 ,
                 }
              }
            }
})
.post('/sendSMSCode').reply(200, {"success":true, "time":120})
.post('/mall/order/payment/submit').reply(200, {'success':false})

module.exports = pay;
