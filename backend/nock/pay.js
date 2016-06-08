var nock = require('nock');
var API = require('../api/v1/api_config');
var _ = require('lodash');

var pay = nock(API.host);
var payPersist = nock(API.host).persist();

payPersist
.get(function(uri){
  var ismatch = /mall\/order\/payment\?orderId=\d+&userId=\d+&type=1/.test(uri);
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
                    "sellerBalanceMoney": 29889000900,
                 }
              }
            }
})
.post('/sendSMSCode').reply(200, {"success":true})
.post('/mall/order/payment/submit').reply(200, {'success':true, "error":"times"})
.get('/mall/order/payment/success').reply(200, {'success':true, 'data': {
        "order": {
            "paymentMoney": 2000000000,
            "deliveryAddress": "提货地址",
            "dealerName":"卖家姓名",
            "dealerPhone":18698989899,
            "signContractTime": "1465356905881",
            "paymentTime": "1465356905881",
            "createTime": "1465356905881"
        }
    }
});

module.exports = pay;
