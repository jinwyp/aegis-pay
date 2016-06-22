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
    var user = req.session.user;
    request(api_config.fundinfo,{
        qs:{
            userId:user.id
        }},function (err, resp) {
        if(err){ next(err); }
        var replyData = JSON.parse(resp.body);
        console.log(1)
        console.dir(replyData);
        //后台返回正确,展现页面
        if(replyData.success) {
            var content = {
                fundAccount:    replyData.data.fundAccount,
                pageTitle :     "财务管理中心 - 添加账户",
                headerTit :     "财务管理中心 - 添加账户",
                tabObj : {
                    firstTab : firstTab,
                    secondTab : secondTab
                }
            };
            var cashAccount = replyData.data.cashAccount;
            //有银行卡绑定的情况下
            if(cashAccount.companyName && cashAccount.companyName.length>1) {
                content.status = 1;
                content.cashAccount = cashAccount;
            } else {
                content.status = 0;
                content.cashAccount = undefined;
            }

            res.render('wealth/addAccount',content);
        } else {
            logger.error(req.ip+" request fundAccount failed");
            next(new UnauthenticatedAccessError());
            return;
        }
    });

};

exports.accountDel = function(req,res,next){
    // 删除银行账户功能
    var firstTab  = req.query.firstTab || 2;
    var secondTab = req.query.secondTab || 1;
    var password = req.body.password;
    var bankAccount = req.body.bankAccount;
    var bankName = req.body.bankName;
    
    request(api_config.drawcash,{
        qs:{
            userId:req.session.user.id,
            password:password,
            bankAccount:bankAccount,
            bankName:bankName
        }
    },function(err,resp){
        if (err) return next(err);
        var replyData = JSON.parse(resp.body);
        if( replyData.success ){
            res.json({success:true,tryChance:'3'});
        }else{
            res.json({success:false,tryChance:'1'});
        }
    });       
}

