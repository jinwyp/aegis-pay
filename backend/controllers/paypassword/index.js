var request = require('request');
var _ = require('lodash');
var api_config = require('../../api/v1/api_config');
var cache = require('../../libs/cache');

var _getUserFundAccount = exports.getUserFundAccount = function(userId){
    return new Promise(function(resolve, reject){
        cache.get('payPassword:'+userId+':userFundAccount', function(cerr, cdata){
            if(cerr) return reject(cerr);
            if(!cerr && cdata){
                return resolve(cdata);
            }else{
                request(api_config.fetchFundAccount, {userId: userId}, function(err, data){
                    if(err) {return reject(err);}
                    var data = JSON.parse(data.body);
                    if(data && data.success){
                        cache.set('payPassword:'+userId+':userFundAccount', data.data.userFundAccount, 180);
                        return resolve(data.data.userFundAccount);
                    }
                })
            }
        })
    })
}

exports.reset = function(req, res, next){
    var pageData = {
        pageTitle : '安全设置 —— 支付密码',
        headerTit : '安全设置',
        subHeaderTit: '支付密码',
        userFundAccount: ''
    };
    _getUserFundAccount(req.session.user.id).then(function(data){
        pageData.userFundAccount = data;
        res.render('paypassword/reset', pageData);
    }).catch(next);
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

exports.isValidMidware = function(req, res, next){
    cache.get('payPassword:'+req.session.user.id+':forgetvalid', function(err, data){
        if(err) {return res.redirect('/ucenter/paypassword/fg/vl');}
        if(!err && data){
            return next();
        }else{
            return res.redirect('/ucenter/paypassword/fg/vl');
        }
    });
}

exports.forgetReset = function(req, res, next){
    var pageData = {
        pageTitle : '安全设置 —— 设置支付密码',
        headerTit : '安全设置',
        subHeaderTit: '设置支付密码',
        user: {
            userFundAccount: ''
        }
    };
    _getUserFundAccount(req.session.user.id).then(function(data){
        pageData.user.userFundAccount = data;
        res.render('paypassword/forget-set', pageData);
    }).catch(next);
}

exports.forgetSuccess = function(req, res, next){
    var pageData = {
        pageTitle : '安全设置 —— 设置支付密码',
        headerTit : '安全设置',
        subHeaderTit: '设置支付密码',
        // user: {
        //     id: req.session.user.id
        // }
    };
    res.render('paypassword/forget-success', pageData);
}
