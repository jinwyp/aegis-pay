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

var _redirect = function(cacheId, res, next, gotoUrl){
    cache.get(cacheId, function(err, data){
        if(err) {return res.redirect(gotoUrl);}
        if(!err && data){
            return next();
        }else{
            return res.redirect(gotoUrl);
        }
    });
}
exports.isValidMidware = function(req, res, next){
    if(req.path.indexOf('modify') === -1){
        _redirect('payPassword:'+req.session.user.id+':forgetvalid', res, next, '/ucenter/paypassword/fg/vl');
    }else{
        _redirect('payPassword:'+req.session.user.id+':modifyvalid', res, next, '/ucenter/paypassword/modify/vl');
    }
}
exports.isSetMidware = function(req, res, next){
    if(req.path.indexOf('modify') === -1){
        _redirect('payPassword:'+req.session.user.id+':forgetset', res, next, '/ucenter/paypassword/fg/vl');
    }else{
        _redirect('payPassword:'+req.session.user.id+':modifyset', res, next, '/ucenter/paypassword/modify/vl');
    }
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
    if(req.path.indexOf('modify') === -1){
        res.render('paypassword/forget-success', pageData);
    }else{
        res.render('paypassword/modify-success', pageData);
    }

}

exports.fetchPayPhone = function(req, res, next){
    var pageData = {
        pageTitle : '安全设置 —— 修改支付密码',
        headerTit : '安全设置',
        subHeaderTit: '修改支付密码',
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
        if(req.path.indexOf('modify') === -1){
            res.render('paypassword/forget-valid', pageData);
        }else{
            res.render('paypassword/modify-valid', pageData);
        }

    })
}

exports.modifyReset = function(req, res, next){
    var pageData = {
        pageTitle : '安全设置 —— 修改支付密码',
        headerTit : '安全设置',
        subHeaderTit: '修改支付密码'
    };
    res.render('paypassword/modify-set', pageData);
}
