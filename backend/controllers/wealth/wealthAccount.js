/*
    财务管理中心 --  账户通(初始化页面)    
*/
var request = require('request');
var api_config = require('../../api/v1/api_config');
var logger     = require("../../libs/logger");

exports.addAccount = function(req,res,next){
    var firstTab  = req.query.firstTab || 2;
    var secondTab = req.query.secondTab || 1;
    var content = {
        pageTitle : "财务管理中心 - 添加账户",
        headerTit : "财务管理中心 - 添加账户",
        tabObj : {
            firstTab : firstTab,
            secondTab : secondTab
        }
    };
    res.render('wealth/addAccount',content);
}