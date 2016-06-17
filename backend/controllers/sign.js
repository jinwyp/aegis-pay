var config         = require('../config');
var api_config     = require('../api/v1/api_config');


exports.setSSOCookie = function(req, res, next){
    var passport = req.query.passport;
    var jsonpCallback = req.query.callback;
 /* var userName = req.query.userName;

  res.cookie('userName', userName, {
      secure: config.https,
      domain: config.domain,
      expires: new Date(Date.now() + 900000) // todo
  });*/
    res.cookie('passport', passport, {
        httpOnly: true,
        secure: config.https,
        domain: config.domain,
        expires: new Date(Date.now() + 900000) // todo
    });

    res.send(jsonpCallback + "({})");


};



exports.removeSSOCookie = function(req, res, next){
    delete req.session.user;
    /*res.clearCookie('userName', {
        domain: config.domain
    });*/
    res.clearCookie('passport', {
        domain: config.domain
    });
    res.send(jsonpCallback + "({})");
    //next();
};
