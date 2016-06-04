var request    = require('request');
var sms_code   = require('../../common/sms_code');
var api_config = require('./api_config');


exports.submit = function (req, res, next) {
    var reqbody = req.body,
        code    = reqbody.sms_code;
    var userInfo = req.user;
    sms_code.validate_sms(userInfo, code).then(function (val) {
        request.post(api_config.paySubmit, reqbody, function (err, data) {
            if (!err && data) {
                var databody = JSON.parse(data.body);
                if (!databody.success) {
                    databody.errType = 'payPassword';
                }
                return res.json(databody);
            } else {
                next(err);
            }
        })
    }).catch(function (err) {
        return res.json({"success" : false, "errType" : "sms_code"});
    })

};


