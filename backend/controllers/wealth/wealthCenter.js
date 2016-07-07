/*
 *财富管理中心 页面
 *
 * */


var request = require('../../libs/request');
var api_config = require('../../api/v1/api_config');
var cache = require('../../libs/cache');
var logger = require('../../libs/logger');
var _ = require('lodash');
//var apiHost = 'http://server.180.com/';			// 模拟域名
//var path = require('path');
var app = require('../../app');
var BusinessError = require('../../errors/BusinessError');


// 处理业务逻辑
exports.checkFundAccount = function (req, res, next) {
    var url = api_config.checkFundAccount;
    var user = req.session.user;
    var param = {
        userId : req.session.user.id
    };
    request.post(url,{formData: param, json: true},function (err,data) {
        if(err) {return next(err);}
        var content = {
            pageTitle   : "账户管理中心",
            headerTit   : "账户管理中心"
    
        };
        console.dir(data.body.success);
        if(data.body.success&&data.body.data.success){
            res.redirect('wealth/financialHome');

        }else{
            //渲染页面
            res.render('wealth/wealthCenter',content);
        }

    })
};

// 检查用公司信息 审核情况
// http://localhost:3001/api/wealth/checkUserCompany
exports.checkUserCompany = function (req, res, next) {
    var url = api_config.checkUserCompany;
    //url = api_config.host + 'wealth/checkUserCompany';			// TODO: 本地
    var user = req.session.user;    // req.session.user.id;
   

    var param = {
      userId : req.session.user.id
    };

    request.post(url, {formData: param, json: true}, function (err, data) {
        if (err) return next(err);
        if (data && data.body){
            var replyData = data.body;

            replyData.headerTit = '后台返回数据__财务管理首页.检查公司信息';
            return res.send(replyData);
        }else{
            return next(new Error('Nock error!'))
        }
    });
};

exports.isFundAccountExist = function(req, res, next){
    request.post({url: api_config.checkFundAccount, form: {userId: req.session.user.id}}, function(err, data){
        var result = JSON.parse(data.body);
        if(result.data.success){
            return next(new BusinessError(409, '您已经存在易煤网资金账户！'));
        }else{
            //渲染页面
            return next();
        }
    }) 
}

// 开通资金账户 - 设置密码&绑定手机号
exports.openFundAccount = function (req, res, next) {
    var pageData = {
        pageTitle   : "开通易煤网资金账户",
        headerTit   : "开通易煤网资金账户"
    };
    //渲染页面
    res.render('wealth/openFundAccount',pageData);    
};

// 开通资金账户 - 设置密码&绑定手机号 - 等待开通
exports.openFundAccountWait = function (req, res, next) {
    var pageData = {
        pageTitle   : "开通易煤网资金账户",
        headerTit   : "开通易煤网资金账户"
    };
    res.render('wealth/openFundAccountWait',pageData);
};

// 开通资金账户 - 设置密码&绑定手机号 - 等待开通
exports.openFundAccountSuccess = function (req, res, next) {
    var pageData = {
        pageTitle   : "开通易煤网资金账户",
        headerTit   : "开通易煤网资金账户"
    };
    cache.get('openFundAccount:fundAccount_' + req.session.user.id, function(err, data){
        if(!err && data){
            pageData.userAcccount = data.userAcccount;
            res.render('wealth/openFundAccountSuccess',pageData);
        }else{
            request.post({url: api_config.fetchOpenStatus, form: {userId: req.session.user.id}}, function(err, data){
                if(err) return next(err);
                if(!err && data){
                    var result = JSON.parse(data.body);
                    var status = result.data.success;
                    if(status === 1){
                        // 开通成功
                        pageData.userAcccount = result.data.userAcccount;
                        res.render('wealth/openFundAccountSuccess',pageData);
                    }else{
                        res.redirect('/wealth/open-fund-account');
                    }
                }
            })
        }
    })
};
