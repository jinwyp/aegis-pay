var request    = require('request');

var checker    = require('../../common/datachecker');
var api_config = require('./api_config');


exports.submit = function (req, res, next) {

    checker.orderId(req.body.orderId);
    checker.payPassword(req.body.payPassword);

    var body = req.body;
    
    request.post(api_config.paySubmit, body, function (err, data) {

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


