var request    = require('request');
var _          = require('lodash');
var cache      = require('../../common/cache');
var sms_code   = require('../../common/sms_code');
var api_config = require('./api_config');

exports.submit = function (req, res, next) {
    var reqbody = req.body,
        code    = reqbody.sms_code;
    var userInfo = res.locals.currentUserInfo;
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

}

// 生成图片验证码
exports.ccapimg = function (req, res, next) {
    var userInfo = res.locals.currentUserInfo;
    var ary  = sms_code.generate_code('img');
    console.log(ary[0])
    cache.set(userInfo.userId + "_ccapimgtxt_pay", ary[0]);
    res.end(ary[1]);
}

// 校验图片验证码
exports.validImgcode = function (req, res, next) {
    var userInfo = res.locals.currentUserInfo;
    var imgcode = req.body.code;
    cache.get(userInfo.userId + "_ccapimgtxt_pay", function (err, data) {
        if (err) return next(err);

        if (!err && data && (data == imgcode)) {
            return next();
        } else {
            res.json({"success" : false, "errType":"imgcode"});
        }
    })
}
