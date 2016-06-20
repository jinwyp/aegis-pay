/*
    财务管理中心 --  账户通(初始化页面)    
*/
var request = require('request');
var api_config = require('../../api/v1/api_config');
var logger     = require("../../libs/logger");
var UnauthenticatedAccessError = require('../../errors/UnauthenticatedAccessError');


exports.addAccount = function(req,res,next){
    var firstTab  = req.query.firstTab || 2;
    var secondTab = req.query.secondTab || 1;

    // request(api_config.drawcash,function(err,response){
        // if (err) return next(err);
        // if (resp.success){
            var content = {
                pageTitle : "财务管理中心 - 添加账户",
                headerTit : "财务管理中心 - 添加账户",
                tabObj : {
                    firstTab : firstTab,
                    secondTab : secondTab
                },
                status:0  // 是否已绑定银行卡的状态
            };
            res.render('wealth/addAccount',content);
        // }else{
        //     logger.error(req.ip+" addAccount error");
        //     next(new UnauthenticatedAccessError());
        // }
    // });
   
}