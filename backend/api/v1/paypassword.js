var request    = require('request');
var _ = require('lodash');
var cache = require('../../libs/cache');

var api_config = require('./api_config');

// 忘记密码-验证身份
exports.forgetValid = function (req, res, next) {

    var body = req.body;

    var params = _.assign({}, { userId: req.session.user.id}, body);
    request.post(api_config.paypasswordForgetValid, {body:params, json:true}, function (err, data) {
        if (err) return next(err);
        var result = data.body;
        if (data && result.success) {
            cache.set('payPassword:'+req.session.user.id+':forgetvalid', 'true', 180);
            return res.json(result);
        }else {
            result.errType = 'cardID';
            return res.json(result);
        }
    })
};

// 忘记密码-重置密码
exports.forgetSubmit= function (req, res, next) {
    var body = req.body;
    var params = _.assign({}, { userId: req.session.user.id, }, body);

    request.post(api_config.paypasswordForgetSubmit, {body:params, json:true}, function (err, data) {
        if (err) return next(err);
        var result = data.body;
        if (result) {
            return res.json(result);
        }
    })
};
