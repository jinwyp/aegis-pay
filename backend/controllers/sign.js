var validator      = require('validator');
var eventproxy     = require('eventproxy');
var config         = require('../config');
var api_config     = require('../api/v1/api_config');
var authMiddleware = require('../middlewares/auth');
var request        = require('request');

// sign out
exports.signout = function (req, res, next) {
    req.session.destroy();
    res.clearCookie(config.auth_cookie_name, {path : '/'});
    res.redirect('/');
};

//sign in
exports.signin = function (req, res, next) {
    var loginname = validator.trim(req.body.loginname).toLowerCase();
    var pass      = validator.trim(req.body.pass);
    var ep        = new eventproxy();

    ep.fail(next);

    if (!loginname || !pass) {
        res.status(422);
        //重定向到登录
        return res.redirect('/');
    }

    ep.on('login_error', function (login_error) {
        res.status(403);
        //重定向到登录
        return res.redirect('/');
    });

    //验证用户成功后，设置session
    request(api_config.signin, {username : loginname, password : pass}, function (err, user) {
        if (err) return next(err);

        authMiddleware.generateSession(user, res);
    })

};
exports.setSSOCookie = function(req, res, next){
  var passport = req.query.passport;
  var userName = req.query.userName;

  res.cookie('userName', userName, {
      secure: config.https,
      domain: config.domain,
      expires: new Date(Date.now() + 900000) // todo
  });
  res.cookie('passport', passport, {
      secure: config.https,
      domain: config.domain,
      expires: new Date(Date.now() + 900000) // todo
  });

  next();
},
exports.removeSSOCookie = function(req, res, next){
    req.session.user = null;
    res.clearCookie('userName', {
        domain: config.domain
    });
    res.clearCookie('passport', {
        domain: config.domain
    });
    next();
}
