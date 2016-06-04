var config                     = require('../config');
var UnauthenticatedAccessError = require('../errors/UnauthenticatedAccessError');
var url = require('url');

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

// 验证用户是否登录
exports.authUser = function (req, res, next) {

    var auth_token = req.signedCookies[config.auth_cookie_name];
    var auth    = auth_token && auth_token.split('$$$$');

    var user_id = req.session.user || (auth && auth[0]);

    if (!user_id){
        // next(new UnauthenticatedAccessError(401, 'user token not found', config.auth_cookie_name);
        // var gotoURL = req.protocol + '://' + req.headers.host + req.originalUrl;
        // res.redirect(config.site.member+'/login?gotoURL=' + gotoURL);
    }

    if (user_id) {

        var user = null;

        // 添加测试用户
        if(config.debug){
            user = {"userId": 123, "userName":"peach", "phone":18678782323, "ip":"198.168.23.123"}
        }else{
            // 验证user_id 是否合法

            // 通过验证后  从redis 取出用户信息
            user = req.session.user
        }

        req.user = user;
        res.locals.user = user;
    }

    next();
};
