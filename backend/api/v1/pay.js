var request    = require('request');
var _ = require('lodash');

var checker    = require('../../libs/datachecker');
var api_config = require('./api_config');


exports.submit = function (req, res, next) {

    checker.orderId(req.body.orderId);
    checker.payPassword(req.body.payPassword);

    var body = req.body;

    var params = _.assign({}, {type: 1, userId: req.session.user.id}, body);

    request.post(api_config.paySubmit, {body: params, json:true}, function (err, data) {

        if (err) return next(err);

        var result = data.body;

        if (data && result.success) {
            return res.json(result);
        }else {
            result.errType = 'payPassword';
            return res.json(result);
        }
    })

};
