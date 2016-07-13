var request    = require('../../libs/request');
var _ = require('lodash');
var cache = require('../../libs/cache');

var api_config = require('./api_config');

// 忘记密码-验证身份
exports.forgetValid = function (req, res, next) {

    var body = req.body;

    var params = _.assign({}, { userId: req.session.user.id}, body);
    request.post({url: api_config.paypasswordForgetValid, form:params}, function (err, data) {
        if (err) return next(err);
        var result = JSON.parse(data.body);
        if (data && result.success) {
            cache.set('payPassword:'+req.session.user.id+':forgetvalid', 'true', 30);
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
    request.post({url:api_config.paypasswordForgetSubmit, form:params}, function (err, data) {
        if (err) return next(err);
        var result = JSON.parse(data.body);
        if (result) {
            if(result.success){
                cache.set('payPassword:'+req.session.user.id+':forgetset', 'true', 30);
            }
            return res.json(result);
        }
    })
};

// valid phone
exports.modifyValid = function (req, res, next) {
    cache.set('payPassword:'+req.session.user.id+':modifyvalid', 'true', 30);
    return res.json({'success':true});
};

exports.modifySubmit= function (req, res, next) {
    var body = req.body;
    var params = _.assign({}, { userId: req.session.user.id, }, body);

    request.post({url:api_config.paypasswordModifySubmit, form:params}, function (err, data) {
        if (err) return next(err);
        var result = JSON.parse(data.body);
        if (result) {
            if(result.success){
                cache.set('payPassword:'+req.session.user.id+':modifyset', 'true', 30);
            }
            return res.json(result);
        }
    })
};
