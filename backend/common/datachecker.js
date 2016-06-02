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
        return throwError(new ValidationError(ValidationError.code.order.orderIdWrong, 'Field validation error, orderId length should be 6 - 100'), next);
    }
};

