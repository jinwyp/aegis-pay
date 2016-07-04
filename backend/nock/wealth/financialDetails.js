var nock = require('nock');
var API  = require('../../api/v1/api_config');

var intercept        = nock(API.host).log(console.log);
var interceptPersist = nock(API.host).log(console.log).persist();


var result1 = {
    "payments": {
        "page": 1,
        "pagesize": 10,
        "rowNum": 10,
        "totalCount": null,
        "totalPage": null,
        "list": [
            {createDate:'2016-05-12', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-13', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-14', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-15', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-16', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-17', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-18', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-19', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-20', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-21', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-22', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-23', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-24', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-25', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'}
        ],
        "indexNum": 0,
        "count": 200,
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



var result2 = {
    "payments": {
        "page": 1,
        "pagesize": 10,
        "rowNum": 10,
        "totalCount": null,
        "totalPage": null,
        "list": [
            {createDate:'2016-05-12', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-13', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-14', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-15', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-16', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-17', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-18', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-19', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'}
        ],
        "indexNum": 0,
        "count": 100,
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

var result3 = {
    "payments": {
        "page": 1,
        "pagesize": 10,
        "rowNum": 10,
        "totalCount": null,
        "totalPage": null,
        "list": [
            {createDate:'2016-05-12', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-13', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-14', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'},
            {createDate:'2016-05-19', transactionNO: 123456789012345678, money : 1000000000, balanceMoney: 12345678, type:'提现', otherFundAccount : '12345678901234', otherCompanyName:'和略电子商务公司'}
        ],
        "indexNum": 0,
        "count": 60,
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


var result = {
    "payments": {
        "page": 1,
        "pagesize": 1,
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
                "orderId": null,
                "type" : 1
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
                "orderId": "0",
                "type" : 1
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
                "orderId": "3636",
                "type" : 1
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
                "orderId": "3635",
                "type" : 1
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
                "orderId": "3636",
                "type" : 1
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
                "orderId": "3635",
                "type" : 1
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
                "orderId": "3636",
                "type" : 1
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
                "orderId": "3635",
                "type" : 1
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
                "orderId": "3636",
                "type" : 1
            }
        ],
        "indexNum": 0,
        "count": 20,
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
.post('/finance/payments/paymentAccount', { userId: "213" }).reply(200, {
    success:true,
    error:"",
    data:result
})
.post('/finance/payments/list', { type: '1' }).reply(200, {
    success : true,
    data : result2
})
.post('/finance/payments/list', { type: '2' }).reply(200, {
    success:true,
    error:"",
    data:result3
})
.post('/finance/payments/list', { userId: "2719" }).reply(200, {
    success:true,
    error:"",
    data:result1
})
.post('/finance/payments/list', { userId: "213", page:5 }).reply(200, {
    success:true,
    error:"",
    data:result3
})
.post('/finance/payments/list', { userId: "213" }).reply(200, {
    success:true,
    error:"",
    data:result1
});


module.exports = interceptPersist;
