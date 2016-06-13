var nock = require('nock');
var API  = require('../../api/v1/api_config');

var sellerDelivery        = nock(API.host).log(console.log);
var sellerDeliveryPersist = nock(API.host).persist();


sellerDeliveryPersist.get('/confirmDelivery/sellerDelivery').reply(200,
    {
        "deliveryAmount" : "300",
        "indexList"      : [{
            "批次" : "1",
            "检测时间" : "2016-03-27",
            "提货吨数（吨）" : "200",
            "热值" : "7500",
            "硫分" : "140",
            "挥发分" : "300",
            "全水分" : "33",
            "Y值" : "3.5",
            "G值" : "3.5",
            "2值" : "3.5",
            "3值" : "3.5",
            "4值" : "3.5",
            "5值" : "3.5",
            "6值" : "3.5",
            "7值" : "3.5",
            "8值" : "3.5",
            "9值" : "3.5"
        }, {
            "批次" : "2",
            "检测时间" : "2016-03-27",
            "提货吨数（吨）" : "200",
            "热值" : "7500",
            "硫分" : "140",
            "挥发分" : "300",
            "全水分" : "33",
            "Y值" : "3.5",
            "G值" : "3.5",
            "2值" : "3.5",
            "3值" : "3.5",
            "4值" : "3.5",
            "5值" : "3.5",
            "6值" : "3.5",
            "7值" : "3.5",
            "8值" : "3.5",
            "9值" : "3.5"
        }]
    });
module.exports = sellerDelivery;