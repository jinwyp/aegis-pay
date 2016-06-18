var nock = require('nock');
var API  = require('../../api/v1/api_config');
var financialCenterHome        = nock(API.host).log(console.log);
var financialCenterHomePersist = nock(API.host).log(console.log).persist();

financialCenterHomePersist
    .get('/account/finance/center')
    .reply(200,
        {
            success:true,
            error:"fdsfsdfsdfs",
            data:{
                "finance": {
                    "userId": 1,
                    "companyName": "易煤网",
                    "userFundAccount": "1111111111",
                    "balanceMoney": 222000.00,
                    "cashBankName": "建设银行",
                    "cashBankAccount": "621488888888",
                    "cashBankCode": "3555555"
                },
                "recordList": [
                    {
                        "id": "1",
                        "version": "1",
                        "createTime": "2016-06-18",
                        "typeName": "采购",
                        "totalMoney": "1000000.00",
                        "status": "WaitPayment",
                        "statusName": "等待付款"
                    },
                    {
                        "id": "2",
                        "version": "1",
                        "createTime": "2016-06-18",
                        "typeName": "销售",
                        "totalMoney": "2000000.00",
                        "status": "交易失败",
                        "statusName": "交易失败"
                    },
                    {
                        "id": "3",
                        "version": "1",
                        "createTime": "2016-06-18",
                        "typeName": "采购",
                        "totalMoney": "3000000.00",
                        "status": "交易成功",
                        "statusName": "交易成功"
                    },
                    {
                        "id": "4000",
                        "version": "1",
                        "createTime": "2016-06-18",
                        "typeName": "销售",
                        "totalMoney": "4000000.00",
                        "status": "交易失败",
                        "statusName": "交易失败"
                    }
                ]
            }
        });

module.exports = financialCenterHomePersist;