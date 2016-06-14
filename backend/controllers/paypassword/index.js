var request = require('request');
var _ = require('lodash');
var api_config = require('../../api/v1/api_config');

exports.reset = function(req, res, next){
    var pageData = {
        pageTitle : '安全设置 —— 支付密码',
        headerTit : '安全设置',
        subHeaderTit: '支付密码',
        userFundAccount: ''
    };
    request(api_config.fetchFundAccount, {userId: req.session.user.id}, function(err, data){
        if(err) {return next(err);}
        var data = JSON.parse(data.body);
        if(data && data.success){
            pageData.userFundAccount = data.data.userFundAccount;
        }
        res.render('paypassword/reset', pageData);
    })
}

exports.validCard = function(req, res, next){
    var pageData = {
        pageTitle : '安全设置 —— 设置支付密码',
        headerTit : '安全设置',
        subHeaderTit: '设置支付密码',
        user: {
            phone: req.session.user.securephone
        }
    };
    request(api_config.fetchPayPhone, {userId: req.session.user.id}, function(err, data){
        if(err) {return next(err);}
        var data = JSON.parse(data.body);
        if(data && data.success){
            pageData.user.phone = data.data.payPhone;
        }
        res.render('paypassword/forget-valid', pageData);
    })
}
