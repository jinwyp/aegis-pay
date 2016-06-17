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
    var content = {
        pageTitle : "财务管理中心",
        headerTit : "财务管理中心",
        tabObj : {
            firstTab : firstTab,
            secondTab : secondTab
        }
    };
    //渲染页面
    res.render('wealth/financialCenterHome',content);
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

        accoutNumber : '1234567890',
        
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
    var content = {
        pageTitle : "财务管理中心 - 交易明细",
        headerTit : "财务管理中心 - 交易明细",
        tabObj : {
            firstTab : firstTab,
            secondTab : secondTab
        }
    };

    res.render('wealth/transactionRecord',content);
};

