var request    = require('../../libs/request');
var _ = require('lodash');
var checker    = require('../../libs/datachecker');
var api_config = require('./api_config');

exports.guaranteeOrderCancel = function (req, res, next) {
    var orderId = req.body.orderId,
        userId = req.session.user.id;

    checker.orderId(orderId);

    request.post({url: api_config.guaranteeOrderCancel, form:{orderId: orderId, userId: userId}}, function (err, data) {
        if (err) return next(err);
        
        var result = JSON.parse(data.body);
        if (result) {
            return res.json(result);
        }
    })

};

exports.guaranteeSubmitSettle = function(req, res, next){
    var orderId = req.body.orderId,
        settleMoney = req.body.settleMoney,
        userId = req.session.user.id;

    checker.orderId(orderId);

    request.post({url: api_config.guaranteeSubmitSettle, form:{orderId: orderId, settleMoney: settleMoney, userId: userId}}, function (err, data) {
        if (err) return next(err);
        
        var result = JSON.parse(data.body);
        if (result) {
            return res.json(result);
        }
    })
}
