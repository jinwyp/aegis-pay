var request = require('request');

var config                     = require('../config');
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

    if (process.env.NODE_ENV == 'local'||process.env.NODE_ENV=='self') {
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
