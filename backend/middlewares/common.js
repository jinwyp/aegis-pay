var sms_code   = require('../common/sms_code');

exports.send_sms = function (req, res, next) {
    var userInfo = res.locals.currentUserInfo;
    sms_code.send_sms(userInfo).then(function (data) {
        if(!data.success){
            data.errType = data.errType || "sms";
        }
        return res.json(data);
    }).catch(next);
};
