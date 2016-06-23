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
            "contract" : {
                "orderContractNO" : _.split(_.split(_.split(uri, '?')[1], '&')[0], '=')[1],
                buyerCompanyName: '易煤网技术部测试账号',
                buyerCompanyAddress: '323456789012345678901234',
                buyerCompanyLegalPersonName: '刘新杰',
                buyerCompanyPhone: '021-88888888',
                buyerCompanyOpeningBank: '平安银行上海闸北支行',
                buyerCompanyAccount: '22222',
                buyerCompanyFax: '021-88888866',
                buyerCompanyZipCode: '200000',
                orderContractNO: 'HT201606090002',
                contractSignDate: '2016-06-22',
                orderAmount: '50',
                orderPrice: '333.00',
                orderDeliveryRegion: '华北地区',
                orderDeliveryProvince: '天津',
                orderDeliveryPlace: '天津港',
                orderOtherHarbour: null,
                orderDeliveryHarbour: '天津港',
                orderDeliveryDate1: '2016 年 06 月 09 日',
                orderDeliveryDate2: '2016 年 06 月 10 日',
                productNO: 'CP201606050003',
                productNCV01: 2,
                productNCV02: 2,
                productNCV: '2',
                productRS01: 2,
                productRS02: 2,
                productRS: '2.00',
                productInspectOrg: '中国检验认证(集团)有限公司(CCIC)',
                productOtherInspectOrg: null
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
