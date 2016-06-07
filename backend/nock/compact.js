var nock = require('nock');
var API  = require('../api/v1/api_config');
var _    = require('lodash');

var compact        = nock(API.host);
var compactPersist = nock(API.host).persist();

compactPersist
.get(function (uri) {
        var ismatch = /\/mall\/order\/contract\?orderId=\d+&userId=\d/.test(uri);
        return ismatch;
    }).reply(200, function (uri) {
    return {
        "success" : true,
        "data": {
            "version": 1,
            "compact" : {
                "orderContractNO" : _.split(_.split(_.split(uri, '?')[1], '&')[0], '=')[1],
                "contractSignDate" : "2015-12-05",
                "buyerCompanyName": "买方名称",
                "buyerCompanyAddress": "买方住所",
                "buyerCompanyLegalPersonName": "法定代表人",
                "buyerCompanyName": "买方公司名称",
                "productNO": "产品编号",
                "orderAmount": "数量 吨",
                "productNCV": "NCV",
                "orderPrice": "10000", //元/吨
                "orderDeliveryRegion": "orderDeliveryRegion",
                "orderDeliveryProvince": "orderDeliveryProvince",
                "orderDeliveryHarbour": "orderDeliveryHarbour",
                "orderDeliveryDate1": "orderDeliveryDate1",
                "orderDeliveryDate2": "orderDeliveryDate2",
                "buyerCompanyPhone": 'buyerCompanyPhone',
                "buyerCompanyOpeningBank": "buyerCompanyOpeningBank",
                "buyerCompanyAccount": "buyerCompanyAccount",
                "buyerCompanyFax": 'buyerCompanyFax',
                "buyerCompanyZipCode": "buyerCompanyZipCode"
            }
        }
    }
})
.post('/upload-file', {'path' : /.?/gi}).reply(200, {
    success : true
})
.post('/mall/order/signcontract').reply(200, {
    success : true
})
.post('/del-file').reply(200, {
    success : true
});

module.exports = compact;
