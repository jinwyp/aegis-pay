var nock = require('nock');
var API  = require('../../api/v1/api_config');

var intercept        = nock(API.host).log(console.log);
var interceptPersist = nock(API.host).log(console.log).persist();


var details = [
    {date:'2016-05-12', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-13', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-14', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-15', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-16', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-17', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-18', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-19', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-20', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-21', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-22', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-23', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-24', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-25', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'}
];

var details2 = [
    {date:'2016-05-12', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-13', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-14', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-15', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-16', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-17', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-18', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-19', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'}
];

var details3 = [
    {date:'2016-05-12', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-13', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-14', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'},
    {date:'2016-05-19', orderNo: 123456789012345678, amoumt : 1000000000, account: 12345678, tradeType:'提现', toPersonAccount : '12345678901234', toPersonAccountName:'和略电子商务公司', toPersonBankName:'中国银行'}
];


var result = {
    "success": true,
    "data": {
        "payments": {
            "page": 1,
            "pagesize": 10,
            "rowNum": 10,
            "totalCount": null,
            "totalPage": null,
            "list": [],
            "indexNum": 0,
            "count": 0,
            "userId": 2719,
            "type": null,
            "startDate": null,
            "endDate": null,
            "searchType": 0,
            "searchContent": null,
            "userFundAccount": "3110710001261001468",
            "typeList": [
                {
                    "type": "paymentstypelist",
                    "sequence": 1,
                    "name": "充值"
                },
                {
                    "type": "paymentstypelist",
                    "sequence": 2,
                    "name": "提现"
                },
                {
                    "type": "paymentstypelist",
                    "sequence": 3,
                    "name": "销售"
                },
                {
                    "type": "paymentstypelist",
                    "sequence": 4,
                    "name": "采购"
                }
            ]
        }
    }
};

result.data.payments.list = details;

interceptPersist

.post('/finance/payments/list', { orderCategory: '2' }).reply(200, {
    success:true,
    error:"",
    data:result
})
.post('/finance/payments/list', { orderCategory: '1' }).reply(200, {
    success : true,
    data : result
})
.post('/finance/payments/list', { userId: "2719" }).reply(200, {
    success:true,
    error:"",
    data:result
});

module.exports = interceptPersist;
