/**
 * Created by tttt on 6/3/16.
 */

var ccap    = require('ccap');
var checker = require('./datachecker');
var cache   = require('./cache');
var logger  = require("./logger");
var co = require('co');

/**
 * 生成图形验证码
 * params: {type: 'number/mixed', length: 6}
 */

function generate_code (type, options) {
    var default_opt = {
        // width : 126,
        // height : 30,
        // offset : 18,
        // fontsize : 26,
        // quality : 200
    };

    if (options) {
        default_opt = _.assign({}, default_opt, options);
    }

    var length = default_opt.length || 6;

    if (type === 'number') {

        var txt = '';
        for (var i=0; i < length; i++) {
            txt += parseInt((Math.random()) * 10);
        }

        default_opt.generate = function (){
            return txt
        };

    }

    var ary = ccap(default_opt).get();
    var text = ary[0];
    var buf = ary[1];

    return ary;
}




// 生成图片验证码
exports.sendCode = function (type) {
    return function (req, res, next) {
        checker.captchaType(type); // _ccapimgtxt_pay

        var userInfo = req.session.user;
        var ary      = generate_code('mixed');

        logger.debug("----- Captcha key: ", userInfo.id+type, " Captcha Text: ", ary[0]);
        cache.set(userInfo.id + type, ary[0]);
        res.end(ary[1]);
    };

};



// 校验图片验证码
exports.verifyMiddleware = function (type) {
    return function (req, res, next) {
        var userInfo = req.session.user;
        var captchaText = req.body.captchaText;
        var result = { "success" : false, "errType":"imgcode" };

        var checkType = new Promise(function(resolve, reject){
            checker.captchaType(type, function(err){
                err && resolve(false);
                !err && resolve(true);
            })
        })

        var checkText = new Promise(function(resolve, reject){
            checker.captchaText(req.body.captchaText, function(err){
                err && resolve(false);
                !err && resolve(true);
            })
        })

        co(function* (){
            var checkTypeV = yield checkType;
            var checkTextV = yield checkText;
            if(checkTypeV && checkTypeV){
                //cache.del('yimei180_sms_' + userInfo.id)
                cache.get(userInfo.id + "_ccapimgtxt_pay", function (err, data) {
                    if (err) return next(err);

                    if (data && data.toLowerCase() === captchaText.toLowerCase()) {
                        return next();
                    } else {
                        return res.json(result);
                    }
                })
            }else{
                return res.json(result);
            }
        })


    }
};
