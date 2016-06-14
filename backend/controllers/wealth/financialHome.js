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
    res.render('wealth/financialCenter',content);
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
        }
    };

    res.render('wealth/financialDetails',content);
};

