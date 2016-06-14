var request    = require('request');
var _ = require('lodash');

var api_config = require('./api_config');


exports.forgetValid = function (req, res, next) {

    var body = req.body;

    var params = _.assign({}, { userId: req.session.user.id}, body);
    request.post(api_config.paypasswordForgetValid, {body:params, json:true}, function (err, data) {
        if (err) return next(err);
        var result = data.body;
        if (data && result.success) {
            return res.json(result);
        }else {
            result.errType = 'cardID';
            return res.json(result);
        }
    })
};
