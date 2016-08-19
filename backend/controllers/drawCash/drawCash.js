 /*
    财务管理中心 --  账户通(初始化页面)
*/
 var request = require('../../libs/request');
 var api_config = require('../../api/v1/api_config');
 var uuid = require('node-uuid');
 var UnauthenticatedAccessError = require('../../errors/UnauthenticatedAccessError');
 var logger = require('../../libs/logger');



exports.drawCash = function(req,res,next){
    res.setHeader('Cache-Control', 'no-store, must-revalidate');
    res.setHeader('Expires', "Thu, 01 Jan 1970 00:00:01 GMT");
    var firstTab  = req.query.firstTab || 2;
    var secondTab = req.query.secondTab || 1;


    api_config.fetchPayPhone(req.session.user.id).then(function(payPhone){
        
        req.session.user.payPhone = payPhone;
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
                return;
            } else {
                //todo 错误处理
                logger.error(req.ip+" request drawCash error");
                next(new UnauthenticatedAccessError());
            }
        });
    }).catch(next);
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

    console.log("!!!!!------"+cash+"-------!!!!")    ;
    if( !(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(cash)) ){
      next(new ValidationError());
      return;
    }else if( /^\s*$/.test(companyName) ){
      next(new ValidationError());
      return;
    }
    //token不相同
    if(!cashToken || cashToken!==req.session.cashToken) {
        logger.error(req.ip+" drawCash token error");
        next(new UnauthenticatedAccessError(401,"Token验证失败"));
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
         errMessage:'',
         payPhone:req.session.user.payPhone
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

    if( !(/^\d+(\.?\d{1,2})$/.test(cash)) ){
      next(new UnauthenticatedAccessError());
      return;
    }
    //confirmToken不相同
    if(!confirmToken || confirmToken!=req.session.confirmToken) {
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


    var content = {
        pageTitle : "财务管理中心 - 账户通 - 提现",
        headerTit : "财务管理中心 - 账户通 - 提现",
        tabObj : {
            firstTab : firstTab,
            secondTab : secondTab
        },
        status:2
    };

    var date = new Date();
    var str = '';
    var year = date.getFullYear();
    var month = formatHandler(date.getMonth()+1);
    var day = formatHandler(date.getDate());
    var time = formatHandler(date.getHours());
    var minutes = formatHandler(date.getMinutes());
    var second = date.getSeconds();
    var secondMinutes = '';
    if(second<=58){
        secondFront = formatHandler(second);
        secondBank = formatHandler(second+2);
        secondMinutes = minutes;
    }else{
        secondFront = second;
        secondBank = formatHandler(secondFront+2-60);
        secondMinutes  = minutes+1;   
    }
    function formatHandler(num){
        if(num<10){
            return '0'+num;
        }else{
            return num;
        }
    }

    content.firstCashTime = year+'-'+month+'-'+day+' '+time+':'+minutes+':'+secondFront;
    content.secondCashTime = year+'-'+month+'-'+day+' '+time+':'+secondMinutes+':'+secondBank;
    
    res.render('drawCash/drawCashStatus',content);
 }
