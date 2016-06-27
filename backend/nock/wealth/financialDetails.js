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
    "payments": {
        "page": 1,
        "pagesize": 10,
        "rowNum": 10,
        "totalCount": null,
        "totalPage": null,
        "list": [
            {
                "fundAccount": "3110710001261037605",
                "createTime": "111003",
                "createDate": "20160627",
                "transactionNO": "J0000000001268",
                "money": 2.00,
                "balanceMoney": 7.00,
                "remarks": null,
                "otherFundAccount": "3110710001261032452",
                "otherCompanyName": "测试1",
                "otherBankName": null,
                "printCode": "20160624111106752611",
                "orderId": null
            },
            {
                "fundAccount": "3110710001261037605",
                "createTime": "111042",
                "createDate": "20160624",
                "transactionNO": "J0000000001267",
                "money": 1.00,
                "balanceMoney": 7.00,
                "remarks": "weqwewqe trasactionNo:1111111111",
                "otherFundAccount": "3110710001261032452",
                "otherCompanyName": "测试1",
                "otherBankName": null,
                "printCode": "20160624111106752650",
                "orderId": "0"
            },
            {
                "fundAccount": "3110710001261037605",
                "createTime": "092640",
                "createDate": "20160624",
                "transactionNO": "J0000000001094",
                "money": 3.00,
                "balanceMoney": 5.00,
                "remarks": "123456789",
                "otherFundAccount": "3110710001261001470",
                "otherCompanyName": "资金初始化--上海念瞳半导体科技有限公司",
                "otherBankName": null,
                "printCode": "20160624105430228207",
                "orderId": "3636"
            },
            {
                "fundAccount": "3110710001261037605",
                "createTime": "111042",
                "createDate": "20160624",
                "transactionNO": "J0000000001266",
                "money": 1.00,
                "balanceMoney": 6.00,
                "remarks": "222222222",
                "otherFundAccount": "3110710001261032452",
                "otherCompanyName": "测试1",
                "otherBankName": null,
                "printCode": "20160624111106777601",
                "orderId": "3635"
            },
            {
                "fundAccount": "3110710001261037605",
                "createTime": "174838",
                "createDate": "20160623",
                "transactionNO": "J0000000001206",
                "money": 2.00,
                "balanceMoney": 2.00,
                "remarks": "123456789",
                "otherFundAccount": "3110710001261032452",
                "otherCompanyName": "测试1",
                "otherBankName": null,
                "printCode": "20160623175612277120",
                "orderId": "3636"
            }
        ],
        "indexNum": 0,
        "count": 5,
        "userId": 2719,
        "type": null,
        "startDate": null,
        "endDate": null,
        "searchType": 0,
        "searchContent": null,
        "userFundAccount": "3110710001261037605",
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
        ],
        "content": null
    }
};


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
})
.post('/finance/payments/list', { userId: "213" }).reply(200, {
    success:true,
    error:"",
    data:result
});

module.exports = interceptPersist;
