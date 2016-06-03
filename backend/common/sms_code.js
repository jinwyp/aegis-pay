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
// cache sms
var cacheSet = function(userInfo, sms){
    var smsData = _.assign({}, userInfo, {"sms":sms, "createtime": new Date().getTime()});
    return new Promise(function(resolve, reject){
        cache.get('yimei180_sms_' + userInfo.userId, function(err, data){
            if(err){ return reject(err); }
            data = data || [];
            data.push(smsData);
            cache.set('yimei180_sms_' + userInfo.userId, data, 86400);
            resolve(data);
        })
    })
};
//
var cacheGet = function(userInfo, validTime){
    var validTime = validTime || false;
    return new Promise(function(resolve, reject){
        var result;
        cache.get('yimei180_sms_' + userInfo.userId, function(err, data){
            if(err){ return reject(err); }
            if(!data || (data&&data.length==0)){
                result = {"isSend": true};
                return resolve(result);
            }
            var now = new Date().getTime();
            var minTime = 0,
                hourTime = 0,
                dayTime = 0;
            var minSms = [];
            _.map(data, function(val, index){
                var s = (now - val.createtime)/1000,
                    fmin = 300,
                    hour = 3600,
                    day = 86400;
                if(s<fmin){
                    minTime++;
                    minSms.push(val)
                }
                (s<hour)&&(hourTime++);
                (s<day)&&(dayTime++);
            })
            if(minTime>0){
                result = {"isSend":true ,"sms": minSms[minSms.length-1].sms};
                if(validTime){
                    return resolve(result);
                }
            }
            if(hourTime>=3){
                result = {"isSend":false, "errType":"hourTimes"};
            }
            if(dayTime>=30){
                result = {"isSend":false, "errType":"dayTimes"};
            }
            result || (result={"isSend": true})
            return resolve(result);
        })
    })
};

exports.send_sms = function (userInfo, smsType) {
    var smsType  = smsType || 'mix';
    var userInfo = userInfo;

    return new Promise(function (resolve, reject) {
        cacheGet(userInfo).then(function(data){
            if(!data.isSend){
                data.success = false;
                return resolve(data);
            }
            var sms    = data.sms || generate_code(smsType);
            var params = {"phone" : userInfo.phone, "message" : sms};
            request.post(api_config.sendSMSCode, params, function (err, data) {
                if (err){
                    return reject(err);
                }else{
                    var res = JSON.parse(data.body);
                    if (res.success) {
                        // cache sms
                        cacheSet(userInfo, sms).then(function(data){
                            console.log('----- Send SMS: ' + sms)
                            return resolve(res);
                        }).catch(function(err){
                            throw(err);
                        });
                    } else {
                        return reject(res);
                    }
                }
            })
        }).catch(function(err){
            throw(err);
        })
    })
};

/**
 * 生成校验码
 * params: {type: 'num/mix/img', length: 6}
 */
var generate_code = exports.generate_code = function (type, options) {
    var default_opt = {width : 126, height : 30, offset : 18, fontsize : 26, quality: 200};
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
        // cache.get('yimei180_sms_' + userInfo.userId, function (err, data) {
        //     if (!err && data && (data == sms)) {
        //         resolve(true);
        //     } else {
        //         reject(false);
        //     }
        // })
        cacheGet(userInfo, true).then(function(data){
            console.log('valid')
            console.log(data)
            if(data && data.sms && (data.sms == sms)){
                return resolve(true);
            }else{
                return reject(false);
            }
        }).catch(function(err){throw(err);})
    });
}



exports.send_sms2 = function (req, res, next) {
    var userInfo = req.user;
    exports.send_sms(userInfo).then(function (data) {
        if(!data.success){
            data.errType = data.errType || "sms";
        }
        return res.json(data);
    }).catch(next);
};
