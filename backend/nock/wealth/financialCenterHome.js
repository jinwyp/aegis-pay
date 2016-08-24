var nock = require('nock');
var API  = require('../../api/v1/api_config');
var financialCenterHome        = nock(API.host).log(console.log);
var financialCenterHomePersist = nock(API.host).log(console.log).persist();

financialCenterHomePersist
    .post('/finance/center')
    .reply(200,
        {
            success:true,
            error:"wrong",
            data:{
                fundAccountStatus:1,
                "finance": {
                    "userId": 1,
                    "companyName": "易煤网",
                    "userFundAccount": "1111111111",
                    "balanceMoney": 222000.00,
                    //"cashBankName": "建设银行",
                    "cashBankName": null,
                    "frozenMoney": 20000,   //担保交易，冻结金额
                    //"cashBankAccount": "6214830211655658",
                    "cashBankAccount": null,
                    "cashBankCode": "3555555"
                },
                "recordList": [
                    {
                        "id": "1",
                        "version": "1",
                        "createTime": "2016-06-18",
                        "type":0,
                        "typeName": "采购",
                        "totalMoney": "1000000.00",
                        "status": "waitFrozen",
                        "payMode": 5,   //担保交易
                        // "statusName": "等待付款"
                    },
                    {
                        "id": "2",
                        "version": "1",
                        "createTime": "2016-06-18",
                        "type":1,
                        "typeName": "销售",
                        "totalMoney": "2000000.00",
                        "status": "waitSettle",
                        "payMode": 5
                        // "statusName": "交易失败"
                    },
                    {
                        "id": "3",
                        "version": "1",
                        "createTime": "2016-06-18",
                        "type":0,
                        "typeName": "采购",
                        "totalMoney": "3000.00",
                        "status": "orderCompleted",
                        "payMode": 5,   //担保交易
                        // "statusName": "交易成功"
                    },
                    {
                        "id": "4000",
                        "version": "1",
                        "createTime": "2016-06-18",
                        "type":1,
                        "typeName": "销售",
                        "totalMoney": "4000000.00",
                        "status": "orderCancel",
                        "payMode": 5
                        // "statusName": "交易失败"
                    },
                    {
                        "id": "1",
                        "version": "1",
                        "createTime": "2016-06-18",
                        "type":0,
                        "typeName": "采购",
                        "totalMoney": "1000000.00",
                        "status": "WaitImproveReceipt",
                        "statusName": "等待付款"
                    },
                    {
                        "id": "2",
                        "version": "1",
                        "createTime": "2016-06-18",
                        "type":1,
                        "typeName": "销售",
                        "totalMoney": "2000000.00",
                        "status": "交易失败",
                        "statusName": "交易失败"
                    },
                    {
                        "id": "3",
                        "version": "1",
                        "createTime": "2016-06-18",
                        "type":0,
                        "typeName": "采购",
                        "totalMoney": "3000.00",
                        "status": "交易成功",
                        "statusName": "交易成功"
                    },
                    {
                        "id": "4000",
                        "version": "1",
                        "createTime": "2016-06-18",
                        "type":1,
                        "typeName": "销售",
                        "totalMoney": "4000000.00",
                        "status": "交易失败",
                        "statusName": "交易失败"
                    }
                ]
            }
        });

financialCenterHomePersist
    .post('/finance/transaction/list')
    .reply(200,
    {
        success:true,
        error:"fdsfsdfsdfs",
        data: {
            transactionRecord:
            {
                page: 1,
                pagesize: 10,
                rowNum: 10,
                totalCount: null,
                totalPage: null,
                list: [
                    {
                        id: 139,
                        version: 2,
                        type: 0,
                        typeName: '采购',
                        orderNO: 'ZY201607210001',
                        contractNO: null,
                        paymentTransaction: null,
                        tailMoneyTransaction: null,
                        refundMoneyTransaction: null,
                        createTime: '2016-07-21',
                        buyerCompanyName: '上海新共赢信息科技有限公司',
                        sellerCompanyName: '上海瑞易供应链管理有限公司',
                        otherCompanyName: '上海瑞易供应链管理有限公司',
                        totalMoney: 0.67,
                        status: 'waitFrozen',
                        payMode: 5,
                        statusName: '待付款',
                        deliveryProvince: '安徽',
                        deliveryPlace: '安庆港',
                        otherHarbour: null,
                        originPlace: '安庆',
                        coalType: '喷吹煤',
                        brandName: 'huites',
                        ncv: 1,
                        ncv02: 1
                    },
                    {
                        id: 107,
                        version: 8,
                        type: 1,
                        typeName: '采购',
                        orderNO: 'ZY201607180017',
                        contractNO: 'HT201607180017',
                        paymentTransaction: '1022016071804194657101',
                        tailMoneyTransaction: null,
                        refundMoneyTransaction: null,
                        createTime: '2016-07-18',
                        buyerCompanyName: '上海新共赢信息科技有限公司',
                        sellerCompanyName: '上海瑞易供应链管理有限公司',
                        otherCompanyName: '上海瑞易供应链管理有限公司',
                        totalMoney: 0.5,
                        status: 'waitSettle',
                        payMode: 5,
                        statusName: '待卖家退款',
                        deliveryProvince: '安徽',
                        deliveryPlace: '安庆港',
                        otherHarbour: null,
                        originPlace: '山西',
                        coalType: '无烟煤',
                        brandName: '李媛测试',
                        ncv: 2435,
                        ncv02: 5635
                    },
                    {
                        id: 134,
                        version: 4,
                        type: 0,
                        typeName: '采购',
                        orderNO: 'ZY201607190006',
                        contractNO: 'HT201607190006',
                        paymentTransaction: 'zz2016071910260262',
                        tailMoneyTransaction: null,
                        refundMoneyTransaction: null,
                        createTime: '2016-07-19',
                        buyerCompanyName: '上海新共赢信息科技有限公司',
                        sellerCompanyName: '上海瑞易供应链管理有限公司',
                        otherCompanyName: '上海瑞易供应链管理有限公司',
                        totalMoney: 0.5,
                        status: 'orderCompleted',
                        payMode: 5,
                        statusName: '待卖家审核提货',
                        deliveryProvince: '天津',
                        deliveryPlace: '天津港',
                        otherHarbour: null,
                        originPlace: '山西',
                        coalType: '喷吹煤',
                        brandName: '灌灌灌灌',
                        ncv: 2435,
                        ncv02: 5654
                    },
                    {
                        id: 128,
                        version: 6,
                        type: 1,
                        typeName: '采购',
                        orderNO: 'ZY201607180037',
                        contractNO: 'HT201607180037',
                        paymentTransaction: 'zz2016071808123492',
                        tailMoneyTransaction: null,
                        refundMoneyTransaction: null,
                        createTime: '2016-07-18',
                        buyerCompanyName: '上海新共赢信息科技有限公司',
                        sellerCompanyName: '上海瑞易供应链管理有限公司',
                        otherCompanyName: '上海瑞易供应链管理有限公司',
                        totalMoney: 0.5,
                        status: 'orderCancel',
                        payMode: 5,
                        statusName: '待卖家审核提货',
                        deliveryProvince: '天津',
                        deliveryPlace: '天津港',
                        otherHarbour: null,
                        originPlace: '山西',
                        coalType: '喷吹煤',
                        brandName: '灌灌灌灌',
                        ncv: 2435,
                        ncv02: 5654
                    },
                    {
                        id: 111,
                        version: 6,
                        type: 0,
                        typeName: '采购',
                        orderNO: 'ZY201607180021',
                        contractNO: 'HT201607180021',
                        paymentTransaction: '1022016071805004792101',
                        tailMoneyTransaction: null,
                        refundMoneyTransaction: null,
                        createTime: '2016-07-18',
                        buyerCompanyName: '上海新共赢信息科技有限公司',
                        sellerCompanyName: '上海瑞易供应链管理有限公司',
                        otherCompanyName: '上海瑞易供应链管理有限公司',
                        totalMoney: 1,
                        status: 'WaitVerifyDeliveryGoods',
                        statusName: '待卖家审核提货',
                        deliveryProvince: '安徽',
                        deliveryPlace: '安庆港',
                        otherHarbour: null,
                        originPlace: '山西',
                        coalType: '无烟煤',
                        brandName: '李媛测试',
                        ncv: 2435,
                        ncv02: 5635
                    },
                    {
                        id: 97,
                        version: 8,
                        type: 0,
                        typeName: '采购',
                        orderNO: 'ZY201607180007',
                        contractNO: 'HT201607180007',
                        paymentTransaction: '1022016071802572534101',
                        tailMoneyTransaction: null,
                        refundMoneyTransaction: null,
                        createTime: '2016-07-18',
                        buyerCompanyName: '上海新共赢信息科技有限公司',
                        sellerCompanyName: '上海瑞易供应链管理有限公司',
                        otherCompanyName: '上海瑞易供应链管理有限公司',
                        totalMoney: 0.5,
                        status: 'WaitVerifyDeliveryGoods',
                        statusName: '待卖家审核提货',
                        deliveryProvince: '安徽',
                        deliveryPlace: '安庆港',
                        otherHarbour: null,
                        originPlace: '山西',
                        coalType: '无烟煤',
                        brandName: '李媛测试',
                        ncv: 2435,
                        ncv02: 5635
                    },
                    {
                        id: 106,
                        version: 5,
                        type: 0,
                        typeName: '采购',
                        orderNO: 'ZY201607180016',
                        contractNO: 'HT201607180016',
                        paymentTransaction: '1022016071804091238101',
                        tailMoneyTransaction: null,
                        refundMoneyTransaction: null,
                        createTime: '2016-07-18',
                        buyerCompanyName: '上海新共赢信息科技有限公司',
                        sellerCompanyName: '上海瑞易供应链管理有限公司',
                        otherCompanyName: '上海瑞易供应链管理有限公司',
                        totalMoney: 0.5,
                        status: 'WaitSettleAccounts',
                        statusName: '待卖家结算',
                        deliveryProvince: '安徽',
                        deliveryPlace: '安庆港',
                        otherHarbour: null,
                        originPlace: '山西',
                        coalType: '无烟煤',
                        brandName: '李媛测试',
                        ncv: 2435,
                        ncv02: 5635
                    },
                    {
                        id: 135,
                        version: 13,
                        type: 0,
                        typeName: '采购',
                        orderNO: 'ZY201607190007',
                        contractNO: 'HT201607190007',
                        paymentTransaction: 'zz2016071906270534',
                        tailMoneyTransaction: 'zz2016072003300984',
                        refundMoneyTransaction: null,
                        createTime: '2016-07-19',
                        buyerCompanyName: '上海新共赢信息科技有限公司',
                        sellerCompanyName: '上海瑞易供应链管理有限公司',
                        otherCompanyName: '上海瑞易供应链管理有限公司',
                        totalMoney: 0.5,
                        status: 'WaitWriteReceipt',
                        statusName: '待卖家开发票',
                        deliveryProvince: '天津',
                        deliveryPlace: '天津港',
                        otherHarbour: null,
                        originPlace: '山西',
                        coalType: '喷吹煤',
                        brandName: '灌灌灌灌',
                        ncv: 2435,
                        ncv02: 5654
                    },
                    {
                        id: 117,
                        version: 11,
                        type: 0,
                        typeName: '采购',
                        orderNO: 'ZY201607180026',
                        contractNO: 'HT201607180026',
                        paymentTransaction: 'zz2016071806132113',
                        tailMoneyTransaction: 'zz2016071807055637',
                        refundMoneyTransaction: null,
                        createTime: '2016-07-18',
                        buyerCompanyName: '上海新共赢信息科技有限公司',
                        sellerCompanyName: '上海瑞易供应链管理有限公司',
                        otherCompanyName: '上海瑞易供应链管理有限公司',
                        totalMoney: 1,
                        status: 'WaitWriteReceipt',
                        statusName: '待卖家开发票',
                        deliveryProvince: '天津',
                        deliveryPlace: '天津港',
                        otherHarbour: null,
                        originPlace: 'ewttr',
                        coalType: '无烟煤',
                        brandName: '',
                        ncv: 1222,
                        ncv02: 3222
                    },
                    {
                        id: 115,
                        version: 15,
                        type: 0,
                        typeName: '采购',
                        orderNO: 'ZY201607180024',
                        contractNO: 'HT201607180024',
                        paymentTransaction: 'zz2016071805440383',
                        tailMoneyTransaction: null,
                        refundMoneyTransaction: 'zz2016071806024188',
                        createTime: '2016-07-18',
                        buyerCompanyName: '上海新共赢信息科技有限公司',
                        sellerCompanyName: '上海瑞易供应链管理有限公司',
                        otherCompanyName: '上海瑞易供应链管理有限公司',
                        totalMoney: 0.5,
                        status: 'WaitWriteReceipt',
                        statusName: '待卖家开发票',
                        deliveryProvince: '安徽',
                        deliveryPlace: '安庆港',
                        otherHarbour: null,
                        originPlace: '山西',
                        coalType: '无烟煤',
                        brandName: '李媛测试',
                        ncv: 2435,
                        ncv02: 5635
                    }
                ],
                indexNum: 0,
                count: 18,
                userId: 2773,
                type: 0,
                startDate: null,
                endDate: null,
                status: null,
                searchType: 0,
                content: null,
                searchContent: null,
                statusList: {
                    WaitPayment: '待付款',
                    WaitPayRefundMoney: '待卖家退款',
                    WaitVerifyDeliveryGoods: '待卖家审核提货',
                    WaitSettleAccounts: '待卖家结算',
                    WaitWriteReceipt: '待卖家开发票',
                    TradeClosed: '交易关闭',
                    TradeFinished: '交易结束'
                }
            }
        }
    });

financialCenterHomePersist.post('/finance/order/settle').reply(200,
    {
        success:true,
        error:"fdsfsdfsdfs",
        data:{

            settleOrder:{
                startDate : "2016-06-20",
                endDate : "2016-06-21",
                searchType : 1,

                content : "",
                count:160,
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


financialCenterHomePersist.post('/finance/contract/list').reply(200,
    {
        success:true,
        error:"wrong",
        data:{
            contract:{
                startDate : "2016-06-20",
                endDate : "2016-06-21",
                type : 1,
                content : "",
                count:100,
                pagesize:10,
                page:1,
                totalPage:1,
                list: [
                    {
                        "orderId":1,
                        "signContractTime": "2016-06-12",
                        "orderNO": "orderNO",
                        "contractNO": "contractNO",
                        "sellerCompanyName": "对方公司名称11"
                    },
                    {
                        "orderId":2,
                        "signContractTime": "2016-06-13",
                        "orderNO": "orderNO",
                        "contractNO": "contractNO",
                        "sellerCompanyName": "对方公司名称22"
                    },
                    {
                        "orderId":3,
                        "signContractTime": "2016-06-14",
                        "orderNO": "orderNO",
                        "contractNO": "contractNO",
                        "sellerCompanyName": "对方公司名称33"
                    },
                    {
                        "orderId":4,
                        "signContractTime": "2016-06-18",
                        "orderNO": "orderNO",
                        "contractNO": "contractNO",
                        "sellerCompanyName": "对方公司名称44"
                    }
                ]
            }
        }
    });

module.exports = financialCenterHomePersist;