/**
 * Created by tttt on 6/1/16.
 */

var validator = require('validator');
var code = require('./validationCode');

var ValidationError = require('../errors/ValidationError');
var UnauthenticatedAccessError = require('../errors/UnauthenticatedAccessError');
var UnauthorizedAccessError = require('../errors/UnauthorizedAccessError');


function isFunction(fn) {
    return Object.prototype.toString.call(fn)=== '[object Function]';
}


function throw409 (code, message, field, isNext){
    field = field || '';

    if (isFunction(isNext)) {
        return isNext(new ValidationError(code, message, field));
    }else {
        throw(new ValidationError(code, message, field));
    }
}

function throw401 (code, message, field, isNext){
    field = field || '';

    if (isFunction(isNext)) {
        return isNext(new UnauthenticatedAccessError(code, message, field));
    }else {
        throw(new UnauthenticatedAccessError(code, message, field));
    }
}

function throw403 (code, message, field, isNext){
    field = field || '';

    if (isFunction(isNext)) {
        return isNext(new UnauthorizedAccessError(code, message, field));
    }else {
        throw(new UnauthorizedAccessError(code, message, field));
    }
}




exports.menuTab = function(tab, next){
    if ( !validator.isInt(tab, { min: 1, max: 20}) ) {
        return throw409(code.order.menuTabNumberWrong.code, code.order.menuTabNumberWrong.message, code.order.menuTabNumberWrong.field, next);
    }
};


exports.orderId = function(orderId, next){
    // if (!orderId || !validator.isLength(orderId, { min: 6, max: 100}) ) {
    //     return throw409(code.order.orderIdWrong.code, code.order.orderIdWrong.message, code.order.orderIdWrong.field, next);
    // }
};

exports.captchaType = function(captchaType, next){
    if (!captchaType || typeof captchaType !== 'string' || !validator.isLength(captchaType, { min: 2, max: 50})  ) {
        return throw409(code.captcha.typeWrong.code, code.captcha.typeWrong.message, code.captcha.typeWrong.field, next);
    }else{
        isFunction(next) && next();
    }
};

exports.captchaText = function(captchaText, next){
    if (!captchaText || typeof captchaText !== 'string' || !validator.isLength(captchaText, { min: 6, max: 10})) {
        return throw409(code.captcha.textWrong.code, code.captcha.textWrong.message, code.captcha.textWrong.field, next);
    }else{
        isFunction(next) && next();
    }
};

exports.captchaNotMatch = function(next){
    return throw409(code.captcha.notMatch.code, code.captcha.notMatch.message, code.captcha.notMatch.field, next);
};


exports.smsText = function(smsText, next){
    if (!smsText || typeof smsText !== 'string' || !validator.isLength(smsText, { min: 6, max: 6})) {
        return throw409(code.sms.textWrong.code, code.sms.textWrong.message, code.sms.textWrong.field, next);
    }else{
        isFunction(next) && next();
    }
};




exports.payPassword = function(password, next){
    if (!password || typeof password !== 'string' || !validator.isLength(password, { min: 6, max: 20})) {
        return throw409(code.user.payPasswordWrong.code, code.user.payPasswordWrong.message, code.user.payPasswordWrong.field, next);
    }
};



exports.deliveryAmount = function(deliveryAmount, next){
    if (!deliveryAmount || !validator.isInt(deliveryAmount, { min: 1, max: 999999999}) ) {
        return throw409(code.order.deliveryAmountWrong.code, code.order.deliveryAmountWrong.message, code.order.deliveryAmountWrong.field, next);
    }
};



