var request = require('./request');
var ccap    = require('ccap');
var _       = require('lodash');

var logger     = require("./logger");
var checker    = require('./datachecker');
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
        cache.get('yimei180_sms_' + userInfo.id, function(err, data){
            if(err){ return reject(err); }

            data = data || [];
            data.push(smsData);
            cache.set('yimei180_sms_' + userInfo.id, data, 86400);
            resolve(data);
        })
    })
};


//
var cacheGet = function(userInfo, validTime){
    validTime = validTime || false;

    return new Promise(function(resolve, reject){
        var result = {"readyToSend": true};
        
        cache.get('yimei180_sms_' + userInfo.id, function(err, data){
            if(err){ return reject(err); }

            if(!data || (data&&data.length === 0)){
                result.readyToSend = true;
                return resolve(result);
            }


            var now = new Date().getTime();
            var minTime = 0,
                hourTime = 0,
                dayTime = 0;
            var minSms = [];

            var fivemin = 300,
            hour = 3600,
            day = 86400;

            _.map(data, function(val, index){
                var s = (now - val.createtime)/1000;

                if(s<fivemin){
                    minTime++;
                    minSms.push(val)
                }
                (s<hour)&&(hourTime++);
                (s<day)&&(dayTime++);
            });

            if(minTime>0 && validTime){
                return resolve({"sms":minSms[minSms.length-1].sms, payPhone:minSms[minSms.length-1].payPhone});
            }
            if(hourTime>=30){
                result = {"readyToSend":false, "errType":"hourTimes"};
            }
            if(dayTime>=30){
                result = {"readyToSend":false, "errType":"dayTimes"};
            }

            return resolve(result);
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
    var txt = '';
    var length = default_opt.length || 6;

    if (type == 'num') {
        var i   = 0;
        var txt = '';
        for (i; i < length; i++) {
            txt += parseInt((Math.random()) * 10);
        }
        return txt
    }

    var ary = ccap(default_opt).get();

    var buf = ary[1];
    txt = ary[0];

    if (type == 'mix') {
        return txt;
    }
    if (type == 'img') {
        return ary;
    }
    return txt;
};







exports.sendCode = function (req, res, next) {
    var payPhone = req.body.payPhone;
    var amount = req.body.amount;

    var userInfo = _.assign({}, req.session.user, {payPhone: payPhone});
    var smsType  = smsType || 'mix';

    cacheGet(userInfo).then(function(data){

        var result = {
            success : false,
            errType : 'sms'
        };
        if(!data.readyToSend){
            result.errType = data.errType || 'sms';
            return res.json(result);
        }

        // var sms    = data.sms || generate_code(smsType);
        var sms    = generate_code(smsType);
        var message = '';
        if(typeof(amount) == "undefined"){
                message = '校验码：' + sms + '，请按照页面提示提交验证码，确保信息安全，切勿将校验码泄露与他人，唯一热线:4009601180!';
        }else{
            message = '您的易煤网资金账户正在发生' + amount + '元的交易，校验码：' + sms + '，请确保信息安全，切勿泄露！唯一热线：4009601180.';
        }
        var params = {
            "phone" : payPhone,
            "message" : message
        };

        request.post({url: api_config.sendSMSCode, form: params}, function (err, data) {
            if (err) return next(err);
            var dataSMS = JSON.parse(data.body);
            dataSMS.time = api_config.smsResend;

            if (dataSMS.success) {
                cacheSet(userInfo, sms).then(function(data){
                    // isUsed = false;
                    logger.debug('----- Send SMS Success: ' + sms);
                    return res.json(dataSMS);
                }).catch(next);

            } else {
                return res.json(dataSMS);
            }
        })

    }).catch(next);

};



/**
 * 验证校验码
 * params: {sms}
 */
exports.verifyMiddleware = function (option) {
    return function (req, res, next) {

        var sms  = req.body.sms_code;
        var userInfo = req.session.user;

        if (option && option.fromSession){
            var payPhone = req.session.user.payPhone;
        }else{
            var payPhone = req.body.payPhone;
        }

        var result = {"success" : false, "errType" : "sms_code"};

        checker.smsText(req.body.sms_code, function(err){
            if(err){
                return res.json(result);
            }else{
                cacheGet(userInfo, true).then(function(data){
                    logger.info("前台传入sms:",sms);
                    logger.info("缓存中的数据:",data);
                    if(data && data.sms && (data.payPhone === payPhone) && (data.sms.toLowerCase() === sms.toLowerCase())){
                        logger.info("验证成功!");
                        // isUsed = true;
                        return next();
                    }else{
                        logger.info("验证失败!");
                        return res.json(result);
                    }
                }).catch(next)
            }
        });
    }
};
