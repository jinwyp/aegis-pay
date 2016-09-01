var nock = require('nock');
var API = require('../../api/guarantee/api_config');
var _ = require('lodash');

var guarantee_pay = nock(API.host);
var guarantee_payPersist = nock(API.host).persist();

guarantee_payPersist
.get(function(uri){
  var ismatch = /guarantee\/order\/payment\?orderId=\d+&userId=\d+&type=\d/.test(uri);
  return ismatch;
}).reply(200, function(uri){
    var orderId = _.split(_.split(_.split(uri,'?')[1],'&')[0], '=')[1];
    var result = {
      "success": true,
      "errorCode": '',
      "data": {"order": {
                      "id": _.split(_.split(_.split(uri,'?')[1],'&')[0], '=')[1],
                      "version": 2,
                      "sellerCompanyName":"易煤网",
                      "sellerFundAccount": "8098098099897387",
                      "totalMoney": 2000000000,
                      "buyerBalanceMoney": 5008889000900,
                        "settleMoney": 23000000, //type = 1
                        "freezeMoney":20000000,
                        "unfrozenMoney": 20000000,//type=1
                        "payMoney": 3000000    //type = 1
                   }
                }
            };
    if(orderId > 200000){
        result.errorCode = 1001;
    }
    return result;
})
// 1001  -- errCode , "您还没有开通易煤网资金账户"  -- error
// UserFundAccount_NotOpen("1001", "您还没有开通易煤网资金账户"),
// UserFundAccount_Opening("1002", "您的资金账户正在开通"),
// UserFundAccount_Disabled("1003", "您的资金账户已被禁用"),
// UserFundAccount_Locked("1004", "您的资金账户已被锁定"),
// UserFundAccount_Error("1005", "您的资金账户不能使用"),
// PayPasswordError("1006", "支付密码填写错误")
.post('/guarantee/order/payment/submit').reply(200, {'success':false, "errorCode":1004})
.get(function(uri){
    var isMatch = /account\/fund\/payPwd\/forget\/first\?userId=\d/.test(uri);
    return isMatch;
}).reply(200, {"success":true, "data":{"payPhone":18610073652}})
.get(function(uri){
    var isMatch = /guarantee\/order\/payment\/success\?orderId=\d+&userId=\d+&type=\d/.test(uri);
    return isMatch;
}).reply(200, {'success':true, 'data': {
        "order": {
            "paymentMoney": 2000000000,
            "deliveryProvince": "提货地址",
            "deliveryPlace": "",
            "otherHarbour":"",
            "dealerName":"卖家姓名",
            "dealerPhone":18698989899,
            "freezeMoney": 1000000000,
            "unfrozenMoney": 1000000000
        }
    }
});

module.exports = guarantee_payPersist;
