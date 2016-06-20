/*
 *财务管理中心(个人中心) 页面
 *
 * */

var request = require('request');
var api_config = require('../../api/v1/api_config');
var logger     = require("../../libs/logger");


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
        pageTitle : "财务管理中心 - 交易明细",
        headerTit : "财务管理中心 - 交易明细",
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

exports.financialTransaction = function (req, res, next) {

    var firstTab  = req.query.firstTab || 3;
    var secondTab = req.query.secondTab || 1;
    request(api_config.financialTransaction, function (err, data) {
        if (err) return next(err);
        logger.debug('获取到的错误是----------------------------' + err);
        logger.debug('获取到的结果是----------------------------' + data.body);
        if (data) {
            var source = JSON.parse(data.body);
            var statusList=source.data.transactionRecord.statusList;
            for(var i in statusList) {
                logger.debug(i + ':' + statusList[i]);
            }
            if(source.success) {
                var content = {
                    pageTitle: "财务管理中心",
                    headerTit: "财务管理中心",
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

