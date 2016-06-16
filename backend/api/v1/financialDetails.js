/**
 * Created by tttt on 6/16/16.
 */


var request    = require('request');

var checker    = require('../../libs/datachecker');
var api_config = require('./api_config');


exports.financialDetailsApi = function (req, res, next) {

    //checker.orderId(req.body.orderId);
    //checker.payPassword(req.body.payPassword);

    var body = req.body;

    //var params = _.assign({}, {type: 1, userId: req.session.user.id}, body);
    var url = api_config.financialDetails;
    request.post(url, {body: {}, json:true}, function (err, data) {

        if (err) return next(err);

        var result = data.body;

        if (data && result.success) {
            return res.json(result);
        }else {
            result.errType = 'orderError';
            return res.json(result);
        }
    })

};
