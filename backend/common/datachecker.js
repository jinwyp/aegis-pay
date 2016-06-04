/**
 * Created by tttt on 6/1/16.
 */

var validator = require('validator');
var ValidationError = require('../errors/ValidationError');


function isFunction(fn) {
    return Object.prototype.toString.call(fn)=== '[object Function]';
}


function throwError (err, isNext){
    if (isFunction(isNext)) {
        return isNext(err);
    }else {
        throw(err);
    }
}




exports.orderId = function(orderId, next){
    if (!orderId || !validator.isLength(orderId, { min: 6, max: 100}) || !validator.isInt(orderId, { min: 100000, max: 90000000}) ) {
        return throwError(new ValidationError(ValidationError.code.order.orderIdWrong, 'Field validation error, orderId length should be 6 - 100', 'orderId'), next);
    }
};

exports.captchaType = function(captchaType, next){
    if (!captchaType || typeof captchaType !== 'string' || !validator.isLength(captchaType, { min: 2, max: 50}) ) {
        return throwError(new ValidationError(ValidationError.code.captcha.typeWrong, 'Field validation error, captcha type length should be 2 - 50', 'captchaType'), next);
    }
};

exports.captchaText = function(captchaText, next){
    if (!captchaText || typeof captchaText !== 'string' || !validator.isLength(captchaText, { min: 2, max: 10}) ) {
        return throwError(new ValidationError(ValidationError.code.captcha.textWrong, 'Field validation error, captcha text length should be 2 - 10', 'captchaText'), next);
    }
};

exports.captchaNotMatch = function(next){
    return throwError(new ValidationError(ValidationError.code.captcha.notMatch, 'Field validation error, captcha text not match', 'captchaText'), next);
};
