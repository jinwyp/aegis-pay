 /*
    财务管理中心 --  账户通(初始化页面)    
*/
var request = require('request');
var api_config = require('../../api/v1/api_config');
var logger     = require("../../libs/logger");
 var uuid = require('node-uuid');

exports.drawCash = function(req,res,next){
    var firstTab  = req.query.firstTab || 2;
    var secondTab = req.query.secondTab || 1;

    request(api_config.drawcash, function (err, resp) {
        if (err) return next(err);
        if (resp.success){
            var replyData = JSON.parse(resp.body);
            //如果没有绑定取现银行卡
            if(!replyData.bankAccount||replyData.bankAccount=='') {
                res.render();
                return;
            }

            //在session中的token
            var cashToken = uuid.v1();
            req.session.cashToken = cashToken;

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
                cashToken: cashToken
            };
            res.render('drawCash/drawCash',content);
        }
    });
};
 
 exports.drawCashConfirm = function (req, res, next) {
     var firstTab  = req.query.firstTab || 2;
     var secondTab = req.query.secondTab || 1;
     var cashToken = req.body.cashToken;

     if(cashToken != req.session.cashToken) {

     }




 };

