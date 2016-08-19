var request    = require('../../libs/request');
var _ = require('lodash');
var cache = require('../../libs/cache');
var checker    = require('../../libs/datachecker');
var api_config = require('./api_config');

exports.submit = function (req, res, next) {

    checker.orderId(req.body.orderId);
    checker.payPassword(req.body.payPassword, function(err){
        return res.json({success: false, errType: 'payPassword'})
    });

    var body = req.body;

    var params = _.assign({}, {type: req.body.type, userId: req.session.user.id}, body);
    request.post({url: api_config.paySubmit, form:params}, function (err, data) {
        if (err) return next(err);
        var result = JSON.parse(data.body);

        if (data && result.success) {
            return res.json(result);
        }else {
            result.errType = 'payPassword';
            return res.json(result);
        }
    })

};
