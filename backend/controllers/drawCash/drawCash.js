 /*
    财务管理中心 --  账户通(初始化页面)    
*/
 var request = require('request');
 var api_config = require('../../api/v1/api_config');
 var uuid = require('node-uuid');
 var UnauthenticatedAccessError = require('../../errors/UnauthenticatedAccessError');
 var logger = require('../../libs/logger');



exports.drawCash = function(req,res,next){
    res.setHeader('Cache-Control', 'no-store, must-revalidate');
    res.setHeader('Expires', "Thu, 01 Jan 1970 00:00:01 GMT");
    // 提现已绑定
    var firstTab  = req.query.firstTab || 2;
    var secondTab = req.query.secondTab || 1;
 

    request(api_config.drawcash, {
        qs:{
            userId:req.session.user.id
        }
    }, function (err, resp) {
        if (err) return next(err);
        var replyData = JSON.parse(resp.body);
        if (replyData.success){
            //如果没有绑定取现银行卡
            if(!replyData.data.bankAccount||replyData.data.bankAccount=='') {
                var content = {
                    pageTitle : "财务管理中心 - 账户通 - 提现",
                    headerTit : "财务管理中心 - 账户通 - 提现",
                    tabObj : {
                        firstTab : firstTab,
                        secondTab : secondTab
                    }
                };
                res.render('drawCash/drawCashUnbind',content);
                return;
            }

            //在session中的token
            var cashToken = uuid.v1();
            req.session.cashToken = cashToken;

            var content = {
                balanceMoney:   replyData.data.balanceMoney,
                bankAccount:    replyData.data.bankAccount,
                bankName:       replyData.data.bankName,
                pageTitle:     "财务管理中心 - 账户通 - 提现",
                headerTit:     "财务管理中心 - 账户通 - 提现",
                tabObj:        {
                    firstTab : firstTab,
                    secondTab : secondTab
                },
                cashToken: cashToken
            };
            res.render('drawCash/drawCash',content);
        } else {
            //todo 错误处理
            logger.error(req.ip+" request drawCash error");
            next(new UnauthenticatedAccessError());
        }
    });
};
 

exports.drawCashCheck = function(req,res,next){
    res.setHeader('Cache-Control', 'no-store, must-revalidate');
    res.setHeader('Expires', "Thu, 01 Jan 1970 00:00:01 GMT");
    // 提现 确认信息
    
    var firstTab  = req.query.firstTab || 2;
    var secondTab = req.query.secondTab || 1;
    var content;
    var cashToken = req.body.cashToken;
    //todo 校验
    var cash = req.body.cash;
    var companyName = req.session.user.companyName;
    var bankAccount = req.body.bankAccount;
    var bankName = req.body.bankName;

    //token不相同
    if(!cashToken && cashToken!=req.session.cashToken) {
        logger.error(req.ip+" drawCash token error");
        next(new UnauthenticatedAccessError());
        return;
    }

    //确认页面token,为了支持回退按键,多以需要两个token
    var confirmToken = uuid.v1();
    req.session.confirmToken = confirmToken;

    content = {
         confirmToken:   confirmToken,
         companyName:    companyName,
         cash:           cash,
         bankAccount:    bankAccount,
         bankName:       bankName,
         pageTitle :    "财务管理中心 - 账户通 - 提现",
         headerTit :     "财务管理中心 - 账户通 - 提现",
         tabObj : {
            firstTab : firstTab,
            secondTab : secondTab
         },
         errMessage:''
    };
    res.render('drawCash/drawCashCheck',content);
}

exports.drawCashStatus = function(req,res,next){
    res.setHeader('Cache-Control', 'no-store, must-revalidate');
    res.setHeader('Expires', "Thu, 01 Jan 1970 00:00:01 GMT");
    // 提现 申请状态

    var password = req.body.password;
    var confirmToken = req.body.confirmToken;
    var cash = req.body.cash;
    var userId = req.session.user.id;
    
    //confirmToken不相同
    if(!confirmToken && confirmToken!=req.session.confirmToken) {
        logger.error(req.ip+" drawCash token error");
        next(new UnauthenticatedAccessError());
        return;
    }
    request({
        url:api_config.drawcashSubmit,
        qs:{
            cash:       cash,
            userId:     userId,
            password:   password
            },
        method: 'GET'
        },
        function(err,response){
            if(err){return next(err);}
            var replyData = JSON.parse(response.body);

            if(response.statusCode!=200||!replyData.success){
                res.json(replyData);
            }else{
                //res.json(replyData);
                //提现成功后,显示成功页面,并且删除session中的值,防止回退.
                delete req.session.confirmToken;
                delete req.session.cashToken;
                res.json(replyData);
            }
        });
};


exports.cashSuccess = function(req,res,next){
    var firstTab  = req.query.firstTab || 2;
    var secondTab = req.query.secondTab || 1;

    var confirmToken = req.body.confirmToken;
    
    //confirmToken不相同
    if(!confirmToken && confirmToken!=req.session.confirmToken) {
        logger.error(req.ip+" drawCash status error");
        next(new UnauthenticatedAccessError());
        return;
    }

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
