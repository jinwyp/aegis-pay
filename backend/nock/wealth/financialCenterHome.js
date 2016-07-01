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
                        "totalMoney": "3000.00",
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

financialCenterHomePersist
    .get('/finance/transaction/list')
    .reply(200,
    {
        success:true,
        error:"fdsfsdfsdfs",
        data:{
            transactionRecord:{
                type : 2,
                startDate : "2016-06-18",
                endDate : "2016-06-19",
                status : "WaitVerifyDeliveryGoods",
                searchType : 4,
                content : "fsadfafas",
                count:4,
                pagesize:10,
                page:1,
                totalPage:1,
                list: [
                    {
                        "createTime": "2016-06-18",
                        "type": "1",
                        "typeName": "采购",
                        "deliveryProvince": "上海市",
                        "deliveryPlace": "黄浦港",
                        "otherHarbour": null,
                        "coalType": "coalType",
                        "brandName": "brandName",
                        "NCV": 1000,
                        "NCV02": 2000,
                        "orderNO": "orderNO",
                        "contractNO": "contractNO",
                        "paymentTransaction": "paymentTransaction",
                        "tailMoneyTransaction": null,
                        "refundMoneyTransaction": "refundMoneyTransaction",
                        "totalMoney": 1300.00,
                        "status": "status",
                        "statusName": "statusName"
                    },
                    {
                        "createTime": "2016-06-18",
                        "type": "1",
                        "typeName": "采购",
                        "deliveryProvince": "deliveryProvince",
                        "deliveryPlace": "deliveryPlace",
                        "otherHarbour": "otherHarbour",
                        "coalType": "coalType",
                        "brandName": "brandName",
                        "NCV": 2000,
                        "NCV02": 3000,
                        "orderNO": "orderNO",
                        "contractNO": "contractNO",
                        "paymentTransaction": "paymentTransaction",
                        "tailMoneyTransaction": "tailMoneyTransaction",
                        "refundMoneyTransaction": "refundMoneyTransaction",
                        "totalMoney": 1300.00,
                        "status": "status",
                        "statusName": "statusName"
                    },
                    {
                        "createTime": "2016-06-18",
                        "type": "1",
                        "typeName": "采购",
                        "deliveryProvince": "deliveryProvince",
                        "deliveryPlace": "deliveryPlace",
                        "otherHarbour": "otherHarbour",
                        "coalType": "coalType",
                        "brandName": "brandName",
                        "NCV": 3000,
                        "NCV02": 4000,
                        "orderNO": "orderNO",
                        "contractNO": "contractNO",
                        "paymentTransaction": "paymentTransaction",
                        "tailMoneyTransaction": "tailMoneyTransaction",
                        "refundMoneyTransaction": "refundMoneyTransaction",
                        "totalMoney": 1300.00,
                        "status": "status",
                        "statusName": "statusName"
                    },
                    {
                        "createTime": "2016-06-18",
                        "type": "1",
                        "typeName": "采购",
                        "deliveryProvince": "deliveryProvince",
                        "deliveryPlace": "deliveryPlace",
                        "otherHarbour": "otherHarbour",
                        "coalType": "coalType",
                        "brandName": "brandName",
                        "NCV": 4000,
                        "NCV02": 5000,
                        "orderNO": "orderNO",
                        "contractNO": "contractNO",
                        "paymentTransaction": "paymentTransaction",
                        "tailMoneyTransaction": "tailMoneyTransaction",
                        "refundMoneyTransaction": "refundMoneyTransaction",
                        "totalMoney": 1300.00,
                        "status": "status",
                        "statusName": "statusName"
                    }
                ],
                statusList:{
                    WaitSignContract:"待签合同",
                    WaitPayment:"待付款",
                    WaitConfirmDelivery:"待确认提货",
                    ReturnedDeliveryGoods:"提货被退回",
                    WaitVerifyDeliveryGoods:"待审核提货"
                }
            }
        }
    });

financialCenterHomePersist
    .get('/finance/transaction/list')
    .reply(200,
    {
        success:true,
        error:"fdsfsdfsdfs",
        data:{
            transactionRecord:{
                type : 2,
                startDate : "2016-06-18",
                endDate : "2016-06-19",
                status : "WaitVerifyDeliveryGoods",
                searchType : 4,
                content : "fsadfafas",
                count:4,
                pagesize:10,
                page:1,
                totalPage:1,
                list: [
                    {
                        "createTime": "2016-06-18",
                        "type": "1",
                        "typeName": "采购",
                        "deliveryProvince": "上海市",
                        "deliveryPlace": "黄浦港",
                        "otherHarbour": null,
                        "coalType": "coalType",
                        "brandName": "brandName",
                        "NCV": 1000,
                        "NCV02": 2000,
                        "orderNO": "orderNO",
                        "contractNO": "contractNO",
                        "paymentTransaction": "paymentTransaction",
                        "tailMoneyTransaction": null,
                        "refundMoneyTransaction": "refundMoneyTransaction",
                        "totalMoney": 1300.00,
                        "status": "status",
                        "statusName": "statusName"
                    },
                    {
                        "createTime": "2016-06-18",
                        "type": "1",
                        "typeName": "采购",
                        "deliveryProvince": "deliveryProvince",
                        "deliveryPlace": "deliveryPlace",
                        "otherHarbour": "otherHarbour",
                        "coalType": "coalType",
                        "brandName": "brandName",
                        "NCV": 2000,
                        "NCV02": 3000,
                        "orderNO": "orderNO",
                        "contractNO": "contractNO",
                        "paymentTransaction": "paymentTransaction",
                        "tailMoneyTransaction": "tailMoneyTransaction",
                        "refundMoneyTransaction": "refundMoneyTransaction",
                        "totalMoney": 1300.00,
                        "status": "status",
                        "statusName": "statusName"
                    },
                    {
                        "createTime": "2016-06-18",
                        "type": "1",
                        "typeName": "采购",
                        "deliveryProvince": "deliveryProvince",
                        "deliveryPlace": "deliveryPlace",
                        "otherHarbour": "otherHarbour",
                        "coalType": "coalType",
                        "brandName": "brandName",
                        "NCV": 3000,
                        "NCV02": 4000,
                        "orderNO": "orderNO",
                        "contractNO": "contractNO",
                        "paymentTransaction": "paymentTransaction",
                        "tailMoneyTransaction": "tailMoneyTransaction",
                        "refundMoneyTransaction": "refundMoneyTransaction",
                        "totalMoney": 1300.00,
                        "status": "status",
                        "statusName": "statusName"
                    },
                    {
                        "createTime": "2016-06-18",
                        "type": "1",
                        "typeName": "采购",
                        "deliveryProvince": "deliveryProvince",
                        "deliveryPlace": "deliveryPlace",
                        "otherHarbour": "otherHarbour",
                        "coalType": "coalType",
                        "brandName": "brandName",
                        "NCV": 4000,
                        "NCV02": 5000,
                        "orderNO": "orderNO",
                        "contractNO": "contractNO",
                        "paymentTransaction": "paymentTransaction",
                        "tailMoneyTransaction": "tailMoneyTransaction",
                        "refundMoneyTransaction": "refundMoneyTransaction",
                        "totalMoney": 1300.00,
                        "status": "status",
                        "statusName": "statusName"
                    }
                ],
                statusList:{
                    WaitSignContract:"待签合同",
                    WaitPayment:"待付款",
                    WaitConfirmDelivery:"待确认提货",
                    ReturnedDeliveryGoods:"提货被退回",
                    WaitVerifyDeliveryGoods:"待审核提货"
                }
            }
        }
    });

financialCenterHomePersist
    .get('/account/finance/contract/list')
    .reply(200,
    {
        success:true,
        error:"fdsfsdfsdfs",
        data:{
            contract:{
                startDate : "2016-06-20",
                endDate : "2016-06-21",
                type : 1,
                content : "合同管理",
                count:4,
                pagesize:10,
                page:1,
                totalPage:1,
                list: [
                    {
                        orderId:1,
                        signContractTime: "2016-06-18",
                        orderNO: "orderNO",
                        contractNO: "contractNO",
                        sellerCompanyName: "对方公司名称"
                    },
                    {
                        orderId:1,
                        "signContractTime": "2016-06-18",
                        "orderNO": "orderNO",
                        "contractNO": "contractNO",
                        "sellerCompanyName": "对方公司名称"
                    },
                    {
                        orderId:1,
                        "signContractTime": "2016-06-18",
                        "orderNO": "orderNO",
                        "contractNO": "contractNO",
                        "sellerCompanyName": "对方公司名称"
                    },
                    {
                        orderId:1,
                        "signContractTime": "2016-06-18",
                        "orderNO": "orderNO",
                        "contractNO": "contractNO",
                        "sellerCompanyName": "对方公司名称"
                    }
                ]
            }
        }
    });


financialCenterHomePersist
    .post('/finance/contract/list')
    .reply(200,
    {
        success:true,
        error:"fdsfsdfsdfs",
        data:{

            settleOrder:{
                startDate : "2016-06-20",
                endDate : "2016-06-21",
                searchType : 1,

                content : "合同管理",
                count:4,
                pagesize:10,
                page:1,
                totalPage:1,
                list: [
                    {
                        orderId:1,
                        createTime: "2016-06-18",
                        orderNO: "orderNO",
                        transactionNO: "transactionNO",
                        otherCompanyName: "对方公司名称",
                        settleAmount: 3000,
                        totalMoney: 20000.00,
                        status: "WaitSettleAccounts",
                        statusName: "待结算"
                    },
                    {
                        orderId:1,
                        createTime: "2016-06-18",
                        orderNO: "orderNO",
                        transactionNO: "transactionNO",
                        otherCompanyName: "对方公司名称",
                        settleAmount: 3000,
                        totalMoney: 20000.00,
                        status: "WaitVerifySettle",
                        statusName: "待审核结算"
                    },
                    {
                        orderId:1,
                        createTime: "2016-06-18",
                        orderNO: "orderNO",
                        transactionNO: "transactionNO",
                        otherCompanyName: "对方公司名称",
                        settleAmount: 3000,
                        totalMoney: 20000.00,
                        status: "ReturnedSettleAccounts",
                        statusName: "结算被退回"
                    },
                    {
                        orderId:1,
                        createTime: "2016-06-18",
                        orderNO: "orderNO",
                        transactionNO: "transactionNO",
                        otherCompanyName: "对方公司名称",
                        settleAmount: 3000,
                        totalMoney: 20000.00,
                        status: "WaitPayTailMoney",
                        statusName: "待付补款"
                    },
                    {
                        orderId:1,
                        createTime: "2016-06-18",
                        orderNO: "orderNO",
                        transactionNO: "transactionNO",
                        otherCompanyName: "对方公司名称",
                        settleAmount: 3000,
                        totalMoney: 20000.00,
                        status: "WaitPayRefundMoney",
                        statusName: "代付退款"
                    },
                    {
                        orderId:1,
                        createTime: "2016-06-18",
                        orderNO: "orderNO",
                        transactionNO: "transactionNO",
                        otherCompanyName: "对方公司名称",
                        settleAmount: 3000,
                        totalMoney: 20000.00,
                        status: "WaitImproveReceipt",
                        statusName: "待完善开票信息"
                    }
                ]
            }
        }
    });

module.exports = financialCenterHomePersist;