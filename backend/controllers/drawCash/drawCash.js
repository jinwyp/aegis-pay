 /*
    财务管理中心 --  账户通(初始化页面)    
*/
var request = require('request');
var api_config = require('../../api/v1/api_config');
var logger     = require("../../libs/logger");
 var uuid = require('node-uuid');


exports.drawCashUnbind = function(req,res,next){
    // 提现账户未绑定
    var firstTab  = req.query.firstTab || 2;
    var secondTab = req.query.secondTab || 1;
    var content = {
        pageTitle : "财务管理中心 - 账户通 - 提现",
        headerTit : "财务管理中心 - 账户通 - 提现",
        tabObj : {
            firstTab : firstTab,
            secondTab : secondTab
        },
        status:2
    };
    res.render('drawCash/drawCashUnbind',content);
}
exports.drawCash = function(req,res,next){
    // 提现已绑定
    var firstTab  = req.query.firstTab || 2;
    var secondTab = req.query.secondTab || 1;
 

    request(api_config.drawcash, function (err, resp) {
        if (err) return next(err);
        if (resp.success){

            //如果没有绑定取现银行卡
            if(!replyData.bankAccount||replyData.bankAccount=='') {
                res.render();
                return;
            }

            var replyData = JSON.parse(resp.body);
            var content = {
                balanceMoney:   replyData.balanceMoney,
                bankAccount:    replyData.bankAccount,
                bankName:       replyData.bankName,
                pageTitle:     "财务管理中心 - 账户通 - 提现",
                headerTit:     "财务管理中心 - 账户通 - 提现",
                tabObj:        {
                    firstTab : firstTab,
                    secondTab : secondTab
                },
                cashToken: uuid.v1()                //生成一个随机的token
            };
            res.render('drawCash/drawCash',content);
        }
    });
};
 
exports.drawCashCheck = function(req,res,next){
    // 提现 确认信息
    var firstTab  = req.query.firstTab || 2;
    var secondTab = req.query.secondTab || 1;
    var content = {
        pageTitle : "财务管理中心 - 账户通 - 提现",
        headerTit : "财务管理中心 - 账户通 - 提现",
        tabObj : {
            firstTab : firstTab,
            secondTab : secondTab
        },
        status:2
    };
    res.render('drawCash/drawCashCheck',content);
}

exports.drawCashStatus = function(req,res,next){
    // 提现 申请状态
    var firstTab  = req.query.firstTab || 2;
    var secondTab = req.query.secondTab || 1;
    var content = {
        pageTitle : "财务管理中心 - 账户通 - 提现",
        headerTit : "财务管理中心 - 账户通 - 提现",
        tabObj : {
            firstTab : firstTab,
            secondTab : secondTab
        },
        status:2
    };
    res.render('drawCash/drawCashStatus',content);
}
