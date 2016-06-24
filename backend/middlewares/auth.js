var request = require('request');
var api_config = require('../api/v1/api_config');

var config                     = require('../config');
var SystemError                = require('../errors/SystemError');
var UnauthenticatedAccessError = require('../errors/UnauthenticatedAccessError');


function generateSession(user, res) {
    var auth_token = user._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
    var opts       = {
        path     : '/',
        maxAge   : 1000 * 60 * 60 * 24 * 30,
        signed   : true,
        httpOnly : true
    };

    res.cookie(config.auth_cookie_name, auth_token, opts); //cookie 有效期30天
}

exports.generateSession = generateSession;

// 验证用户是否登录，获取并存储用户信息
// user: {
//     id: 213,
//     securephone: 18634343434,
//     nickname: 'peach',
//     isactive: true,
//     verifystatus: true,
//     qq: 34343434,
//     telephone: 18765656565,
//     clienttype: 0,
//     email: '12324@aa.com',
//     verifyuuid: 'dkfi234',
//     userFrom: 'userfrom',
//     traderid: 'traderid'
// }
exports.passport = function (req, res, next) {
    if (req.path.indexOf('setSSOCookie') >= 0) {
        return next();
    }

    if (process.env.NODE_ENV == 'local') {
        req.session.user = res.locals.user = {
            id           : 213,
            securephone  : 18634343434,
            nickname     : 'peach',
            isactive     : true,
            verifystatus : true,
            qq           : 34343434,
            telephone    : 18765656565,
            clienttype   : 0,
            email        : '12324@aa.com',
            verifyuuid   : 'dkfi234',
            userFrom     : 'userfrom',
            traderid     : 'traderid'
        };
        return next();
    }

    if (!req.session || !req.session.user) {
        var gotoURL = req.protocol + '://' + req.headers.host + req.originalUrl;
        if (!req.cookies[config.passport.cookieName]) {
            res.redirect(config.passport.member + '/login?gotoURL=' + encodeURIComponent(gotoURL) + '&from=' + config.domain);
            return;
        } else {
            request.post(config.member_address + '/auth', {form: {
                passport : req.cookies[config.passport.cookieName]
            }}, function (err, auth) {
                "use strict";
                if (err) {
                    return next(err);
                }
                var auth =  JSON.parse(auth.body);
                if (auth.id) {
                    req.session.user = res.locals.user = auth;
                    return next();
                } else {
                    res.redirect(config.passport.member + '/login' + '?gotoURL=' + encodeURIComponent(gotoURL) + "&from=" + config.domain);
                    return;
                }
            });
        }
    } else {
        res.locals.user = req.session.user;
        return next();
    }
};

// 获取支付手机
exports.fetchPayPhone = function(req, res, next){

    if (req.path.indexOf('setSSOCookie') >= 0) {
        return next();
    }

    if (process.env.NODE_ENV == 'local') {
        res.locals.user.phone = '13030303030';
        return next();
    }

    if(res.locals.user.phone){
        return next();
    }
    request(api_config.fetchPayPhone+'?userId=' + req.session.user.id, function(err, data){
        if(err) { return next(err);}
        var data = JSON.parse(data.body);
        if(data && data.success){
            res.locals.user.phone = data.data.payPhone;
            return next()
        }else{
            return next(new SystemError(data.status, data.error));
            // return next(data)
        }
    })
}
