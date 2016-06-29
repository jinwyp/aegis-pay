var querystring = require('querystring');
var nock = require('nock');
var API  = require('../../api/v1/api_config');
var billCenter = nock(API.host).log(console.log);
var billCenterPersist = nock(API.host).log(console.log).persist();


var result = {
    "success" : true,
    "data"    : {
        "receiptOrder" : {
            "page"          : 1,
            "pagesize"      : 10,
            "rowNum"        : 10,
            "totalCount"    : null,
            "totalPage"     : null,
            "list"          : [
                {
                    "orderId"           : 3705,
                    "version"           : 13,
                    "type"              : 1,
                    "typeName"          : "销售",
                    "orderNO"           : "ZY201606090002",
                    "transactionNO"     : null,
                    "totalMoney"        : 16650.00,
                    "otherCompanyName"  : null,
                    "status"            : "WaitReceiveReceipt",
                    "statusName"        : "待收发票",
                    "createTime"        : null,
                    "settleAccountTime" : null
                },
                {
                    "orderId"           : 3701,
                    "version"           : 10,
                    "type"              : 1,
                    "typeName"          : "销售",
                    "orderNO"           : "ZY201606090002",
                    "transactionNO"     : null,
                    "totalMoney"        : 16650.00,
                    "otherCompanyName"  : null,
                    "status"            : "WaitReceiveReceipt",
                    "statusName"        : "待收发票",
                    "createTime"        : null,
                    "settleAccountTime" : null
                },
                {
                    "orderId"           : 3700,
                    "version"           : 10,
                    "type"              : 1,
                    "typeName"          : "销售",
                    "orderNO"           : "ZY201606090002",
                    "transactionNO"     : null,
                    "totalMoney"        : 16650.00,
                    "otherCompanyName"  : null,
                    "status"            : "WaitReceiveReceipt",
                    "statusName"        : "待收发票",
                    "createTime"        : null,
                    "settleAccountTime" : null
                },
                {
                    "orderId"           : 3703,
                    "version"           : 10,
                    "type"              : 1,
                    "typeName"          : "销售",
                    "orderNO"           : "ZY201606090002",
                    "transactionNO"     : null,
                    "totalMoney"        : 16650.00,
                    "otherCompanyName"  : null,
                    "status"            : "WaitReceiveReceipt",
                    "statusName"        : "待收发票",
                    "createTime"        : null,
                    "settleAccountTime" : null
                },
                {
                    "orderId"           : 3702,
                    "version"           : 11,
                    "type"              : 1,
                    "typeName"          : "销售",
                    "orderNO"           : "ZY201606090002",
                    "transactionNO"     : null,
                    "totalMoney"        : 16650.00,
                    "otherCompanyName"  : null,
                    "status"            : "WaitReceiveReceipt",
                    "statusName"        : "待收发票",
                    "createTime"        : null,
                    "settleAccountTime" : null
                },
                {
                    "orderId"           : 3639,
                    "version"           : 11,
                    "type"              : 1,
                    "typeName"          : "销售",
                    "orderNO"           : "ZY201606090002",
                    "transactionNO"     : "123456789",
                    "totalMoney"        : 16650.00,
                    "otherCompanyName"  : null,
                    "status"            : "WaitReceiveReceipt",
                    "statusName"        : "待收发票",
                    "createTime"        : null,
                    "settleAccountTime" : "2015-08-26 09:20:26"
                },
                {
                    "orderId"           : 3638,
                    "version"           : 10,
                    "type"              : 1,
                    "typeName"          : "销售",
                    "orderNO"           : "ZY201606090002",
                    "transactionNO"     : "222222222",
                    "totalMoney"        : 16650.00,
                    "otherCompanyName"  : null,
                    "status"            : "WaitReceiveReceipt",
                    "statusName"        : "待收发票",
                    "createTime"        : null,
                    "settleAccountTime" : "2015-08-26 08:42:19"
                },
                {
                    "orderId"           : 3637,
                    "version"           : 10,
                    "type"              : 1,
                    "typeName"          : "销售",
                    "orderNO"           : "ZY201606090002",
                    "transactionNO"     : "333333333",
                    "totalMoney"        : 16650.00,
                    "otherCompanyName"  : null,
                    "status"            : "WaitReceiveReceipt",
                    "statusName"        : "待收发票",
                    "createTime"        : null,
                    "settleAccountTime" : "2015-08-25 21:32:56"
                },
                {
                    "orderId"           : 3636,
                    "version"           : 10,
                    "type"              : 1,
                    "typeName"          : "销售",
                    "orderNO"           : "ZY201606090002",
                    "transactionNO"     : "123456789",
                    "totalMoney"        : 16650.00,
                    "otherCompanyName"  : null,
                    "status"            : "WaitReceiveReceipt",
                    "statusName"        : "待收发票",
                    "createTime"        : null,
                    "settleAccountTime" : "2015-08-26 09:20:26"
                },
                {
                    "orderId"           : 3712,
                    "version"           : 11,
                    "type"              : 1,
                    "typeName"          : "销售",
                    "orderNO"           : "ZY201606090002",
                    "transactionNO"     : null,
                    "totalMoney"        : 16650.00,
                    "otherCompanyName"  : null,
                    "status"            : "WaitReceiveReceipt",
                    "statusName"        : "待收发票",
                    "createTime"        : null,
                    "settleAccountTime" : null
                }
            ],
            "indexNum"      : 0,
            "count"         : 20,
            "userId"        : 2718,
            "type"          : null,
            "status"        : null,
            "waitCount"     : 0,
            "openCount"     : 18,
            "allCount"      : 18,
            "startDate"     : null,
            "endDate"       : null,
            "content"       : null,
            "searchContent" : null
        }
    }
};

billCenterPersist.get('/finance/order/seller/receipt').query(true).reply(200, function(uri, requestBody) {
    var query = querystring.parse(uri);

    if(query && query.page){
        result.data.receiptOrder.page = Number(query.page);
    }
    return result;
});

module.exports = billCenterPersist;