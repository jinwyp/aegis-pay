var config = require('../config');
// main page
exports.home = function (req, res, next) {
	// var signin = config.passport.member + '/login?gotoURL=' + res.locals.currentLocation + '&from=' + config.domain;
	// var signout = config.passport.member + '/logout?gotoURL=' + res.locals.currentLocation + '&from=' + config.domain;
	// var register = config.passport.member + '/register?gotoURL=' + res.locals.currentLocation + '&from=' + config.domain;


    res.render('index',{});
    

};
