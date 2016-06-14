var request = require('request');
var _ = require('lodash');
// var api_config = require('../')
exports.reset = function(req, res, next){
    var pageData = {
        pageTitle : '安全设置 —— 支付密码',
        headerTit : '安全设置',
        subHeaderTit: '支付密码',
        userName: req.session.user.nickname
    };
    res.render('paypassword/reset', pageData);
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
    res.render('paypassword/forget-valid', pageData);
}
