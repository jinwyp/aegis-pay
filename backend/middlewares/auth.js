var config     = require('../config');
var eventproxy = require('eventproxy');

function generateSession(user, res) {
    var auth_token = user._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
    var opts       = {
        path     : '/',
        maxAge   : 1000 * 60 * 60 * 24 * 30,
        signed   : true,
        httpOnly : true
    };
    res.locals.currentUserInfo = {"userId": 123, "userName":"peach", "phone":18678782323, "ip":"198.168.23.123"}
    res.cookie(config.auth_cookie_name, auth_token, opts); //cookie 有效期30天
}

exports.generateSession = generateSession;

// 验证用户是否登录
exports.authUser = function (req, res, next) {
    var ep = new eventproxy();
    ep.fail(next);

    // 添加测试用户
    if(config.debug){
        generateSession({_id:123}, res);
    }

    // Ensure current_user always has defined.
    res.locals.current_user = null;

    ep.all('get_user', function (user) {
        if (!user) {
            return next();
        }
        res.locals.current_user = req.session.user = user;
        next();
    });

    if (req.session.user) {
        ep.emit('get_user', req.session.user);
    } else {
        var auth_token = req.signedCookies[config.auth_cookie_name];
        if (!auth_token) {
            return next();
        }

        var auth    = auth_token.split('$$$$');
        var user_id = auth[0];
        ep.emit('get_user', user_id);
    }
};
