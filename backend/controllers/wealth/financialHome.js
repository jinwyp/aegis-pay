/*
 *财务管理中心(个人中心) 页面
 *
 * */

var request    = require('request');
var excel      = require("../../libs/excel");
var api_config = require('../../api/v1/api_config');
var checker    = require('../../libs/datachecker');
var logger     = require("../../libs/logger");
var path = require('path');

// 处理业务逻辑
exports.financialHome = function (req, res, next) {
    var firstTab  = req.query.firstTab || 2;
    var secondTab = req.query.secondTab || 1;

    request(api_config.financialCenterHome, function (err, data) {
        if (err) return next(err);
        logger.debug('获取到的错误是----------------------------' + err);
        logger.debug('获取到的结果是----------------------------' + data.body);
        if (data) {
            var source = JSON.parse(data.body);
            if(source.success) {
                var content = {
                    pageTitle: "财务管理中心",
                    headerTit: "财务管理中心",
                    tabObj: {
                        firstTab: firstTab,
                        secondTab: secondTab
                    },
                    finance: source.data.finance,
                    recordList: source.data.recordList
                };
                //渲染页面
                res.render('wealth/financialCenterHome', content);
            }
        }

    });
};

exports.financialDetails = function (req, res, next) {

    var firstTab  = req.query.firstTab || 2;
    var secondTab = req.query.secondTab || 2;
    var content = {
        pageTitle : "财务管理中心 - 收支明细",
        headerTit : "财务管理中心 - 收支明细",
        tabObj : {
            firstTab : firstTab,
            secondTab : secondTab
        },

        accountNumber : '1234567890',
        
        formSelectOrderCategory:[
            {id:'1', value:'1', text:'提现'},
            {id:'2', value:'2', text:'采购'},
            {id:'3', value:'3', text:'销售'}
        ],
        formSelectOrderSearchType:[
            {id:'1', value:'1', text:'交易流水号'},
            {id:'2', value:'2', text:'对方账户名称'},
            {id:'3', value:'3', text:'订单号'}
        ]
        
    };

    res.render('wealth/financialDetails',content);
};





exports.financialDetailsToExcelAndPDF = function (req, res, next) {
    //checker.orderId(req.body.orderDateFromDownload);
    //checker.orderId(req.body.orderDateToDownload);

    var body = req.body;
    console.log(body);

    options = {
        savePath : './views/download/financialDetails/financialdetails.xlsx',
        titleList : [
            '交易日期',
            '交易流水号',
            '金额',
            '账户余额',
            '交易类型',
            '对方账号',
            '对方账号名称',
            '对方开户行'
        ],
        propertyList : [],
        dataList : []
    };



    var params = Object.assign({}, {userId: req.session.user.id}, body);

    var url = api_config.financialDetails;
    request.post(url, {body: params, json:true}, function (err, response, body) {

        if (err) return next(err);

        if (response.statusCode === 200 && body.success) {

            options.dataList = body.data;

            excel(options);
            //return res.json(body.data);
            return res.download(options.savePath);
        }else {
            return res.json([]);
        }
    });

};




exports.financialTransaction = function (req, res, next) {

    var firstTab  = req.query.firstTab || 3;
    var secondTab = req.query.secondTab || 1;
    request(api_config.financialTransaction, function (err, data) {
        if (err) return next(err);
        logger.debug('获取到的错误是----------------------------' + err);
        logger.debug('获取到的结果是----------------------------' + data.body);
        if (data) {
            var source = JSON.parse(data.body);
            if(source.success) {
                var content = {
                    pageTitle: "交易管理",
                    headerTit: "交易管理",

                    tabObj: {
                        firstTab: firstTab,
                        secondTab: secondTab
                    },
                    type: source.data.transactionRecord.type,
                    startDate: source.data.transactionRecord.startDate,
                    endDate: source.data.transactionRecord.endDate,
                    status: source.data.transactionRecord.status,
                    searchType: source.data.transactionRecord.searchType,
                    content: source.data.transactionRecord.content,
                    statusList: source.data.transactionRecord.statusList,
                    recordList: source.data.transactionRecord.list
                };
                //渲染页面
                res.render('wealth/transactionRecord',content);
            }
        }
    });
};

exports.financialContract = function (req, res, next) {

    var firstTab  = req.query.firstTab || 3;
    var secondTab = req.query.secondTab || 1;
    request(api_config.contractList, function (err, data) {
        if (err) return next(err);
        logger.debug('获取到的错误是----------------------------' + err);
        logger.debug('获取到的结果是----------------------------' + data.body);
        if (data) {
            var source = JSON.parse(data.body);
            if(source.success) {
                var content = {
                    pageTitle: "合同管理",
                    headerTit: "合同管理",
                    tabObj: {
                        firstTab: firstTab,
                        secondTab: secondTab
                    },
                    startDate: source.data.contract.startDate,
                    endDate: source.data.contract.endDate,
                    type: source.data.contract.type,
                    content: source.data.contract.content,
                    contractList: source.data.contract.list
                };
                //渲染页面
                res.render('wealth/contractList',content);
            }
        }
    });

};

exports.financialSettlement = function (req, res, next) {

    var firstTab  = req.query.firstTab || 3;
    var secondTab = req.query.secondTab || 1;
    request(api_config.settlementList, function (err, data) {
        if (err) return next(err);
        logger.debug('获取到的错误是----------------------------' + err);
        logger.debug('获取到的结果是----------------------------' + data.body);
        if (data) {
            var source = JSON.parse(data.body);
            if(source.success) {
                var content = {
                    pageTitle: "结算管理",
                    headerTit: "结算管理",
                    tabObj: {
                        firstTab: firstTab,
                        secondTab: secondTab
                    },

                    startDate: source.data.settleOrder.startDate,
                    endDate: source.data.settleOrder.endDate,
                    searchType: source.data.settleOrder.type,
                    content: source.data.settleOrder.content,
                    settlementList: source.data.settleOrder.list

                };
                //渲染页面
                res.render('wealth/settlementList',content);
            }
        }
    });

};

