var request    = require('request');
var ccap       = require('ccap');
var _          = require('lodash');
var cache      = require('./cache');
var api_config = require('../api/v1/api_config');

/**
 * 发送校验码
 * method: post
 * params: {phone: 18611111111, sms: ''}
 * 30times/day ; 3times/hour ;
 * 5mins有效：发送相同验证码
 */
exports.send_sms = function (userInfo, smsType) {
    var smsType  = smsType || 'mix';
    var userInfo = userInfo;
    var isSend   = true;

    // var smsUser = cache.get('sms_'+userInfo.userId);

    return new Promise(function (resolve, reject) {
        if (isSend) {
            var sms    = generate_code(smsType);
            var params = {"phone" : userInfo.phone, "message" : sms};

            request.post(api_config.sendSMSCode, function (err, data) {
                if (err){
                    reject(res);
                }else{
                    var res = JSON.parse(data.body);
                    if (res.success) {
                        // sms period: 5mins
                        cache.set('yimei180_sms_' + userInfo.userId, sms, 300);
                        console.log('smssmssmssms:' + sms)
                        resolve(res);
                    } else {
                        reject(res);
                    }
                }

            })
        } else {
            reject({"success" : false})
        }
    })
};

/**
 * 生成校验码
 * params: {type: 'num/mix/img', length: 6}
 */
var generate_code = exports.generate_code = function (type, options) {
    var default_opt = {width : 126, height : 30, offset : 18, fontsize : 28};
    if (options) {
        default_opt = _.assign({}, default_opt, options);
    }
    var length = default_opt.length || 6;
    if (type == 'num') {
        var i   = 0;
        var txt = '';
        for (i; i < length; i++) {
            txt += parseInt((Math.random()) * 10);
        }
        return txt
    }

    var ary = ccap(default_opt).get(),
        txt = ary[0],
        buf = ary[1];
    if (type == 'mix') {
        return txt;
    }
    if (type == 'img') {
        return ary;
    }
    return txt;
}

/**
 * 验证校验码
 * params: {sms}
 */
exports.validate_sms = function (userInfo, sms) {
    return new Promise(function (resolve, reject) {
        cache.get('yimei180_sms_' + userInfo.userId, function (err, data) {
            if (!err && data && (data == sms)) {
                resolve(true);
            } else {
                reject(false);
            }
        })
    });
}
