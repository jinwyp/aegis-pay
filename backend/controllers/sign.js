var config         = require('../config');
var api_config     = require('../api/v1/api_config');


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
};



exports.removeSSOCookie = function(req, res, next){
    req.session.user = null;
    res.clearCookie('userName', {
        domain: config.domain
    });
    res.clearCookie('passport', {
        domain: config.domain
    });
    next();
};
