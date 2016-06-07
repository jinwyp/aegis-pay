var config                     = require('../config');
var UnauthenticatedAccessError = require('../errors/UnauthenticatedAccessError');
var url = require('url');
var request = require('request');

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
exports.passport = function(req, res, next) {
    if(req.path.indexOf('setSSOCookie')>=0){
        return next();
    }

    if(process.env.MODE == 'local'){
        req.session.user = {
            id: 213,
            securephone: 18634343434,
            nickname: 'peach',
            isactive: true,
            verifystatus: true,
            qq: 34343434,
            telephone: 18765656565,
            clienttype: 0,
            email: '12324@aa.com',
            verifyuuid: 'dkfi234',
            userFrom: 'userfrom',
            traderid: 'traderid'
        };
        return next();
    }

    if( !req.session || !req.session.user ) {
        var gotoURL = req.protocol + '://' + req.headers.host + req.originalUrl;

        if ( !req.cookies[config.passport.cookieName]) {
            res.redirect(config.passport.member+'/login?gotoURL=' + gotoURL + '&from=' + config.domain);
        } else {
            request.post(config.passport.member+'/auth', {
                data:{
                    passport:req.cookies[config.passport.cookieName]
                }
            }, function(err, auth){
                "use strict";
                if(err){
                    return next(err);
                }
                var auth = JSON.parse(auth.body);
                if(auth.success) {
                    req.session.user = auth.user;
                    return next();
                } else {
                    res.redirect(config.passport.member+'/login' + '?gotoURL=' + gotoURL + "&from=" + config.domain);
                }
            });
        }
    } else {
        return next();
    }
};
