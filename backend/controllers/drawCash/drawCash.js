 /*
    财务管理中心 --  账户通(初始化页面)    
*/
var request = require('request');
var api_config = require('../../api/v1/api_config');
var logger     = require("../../libs/logger");

exports.drawCash = function(req,res,next){
    var firstTab  = req.query.firstTab || 2;
    var secondTab = req.query.secondTab || 1;

    request(api_config.drawcash, function (err, resp) {
        if (err) return next(err);

        if (resp.success){
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
                                }
            };
            res.render('drawCash/drawCash',content);
        }
    });
};