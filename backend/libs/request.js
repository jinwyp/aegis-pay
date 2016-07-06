var request = require('request');
var _ = require('lodash');

var PageNotFoundError = require('../errors/PageNotFoundError');
var SystemError = require('../errors/SystemError');

var BusinessError = require('../errors/BusinessError');
var MethodArgumentNotValidError = require('../errors/MethodArgumentNotValidError');
var UnauthenticatedAccessError = require('../errors/UnauthenticatedAccessError');
var UnauthorizedAccessError = require('../errors/UnauthorizedAccessError');


function isObject(val) {
    if (val === null) { return false;}
    return (typeof val === 'object') ;
}

function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}





var callbackWithErrorHandler = function(callback){

    return function(err, response, body){
        if (err){
            return callback(err, response, body);
        }else if (response.statusCode === 200){
            return callback(err, response, body);
        }else{
            var tempBody = {};
            if (isObject(response.body)){
                tempBody = response.body;
            }else {
                tempBody = JSON.parse(response.body);
            }

            var errMessage = tempBody.error + ".";
            if(tempBody.path) { errMessage = errMessage + ' Url: "' + tempBody.path + '".'}
            if(tempBody.message) { errMessage = errMessage + " Reason: " + tempBody.message + '.'}
            //if(tempBody.exception) { errMessage = errMessage + " Exception: " + tempBody.exception + '.'}

            if (response.statusCode === 400 || response.statusCode === 405) { // 参数错误
                return callback(new MethodArgumentNotValidError(response.statusCode, errMessage) )

            }else if (response.statusCode === 401) { // 重新登录
                return callback(new UnauthenticatedAccessError(401, errMessage) )

            }else if (response.statusCode === 403) { // 没有权限访问
                return callback(new UnauthorizedAccessError(403, errMessage) )

            }else if (response.statusCode === 409) { // 业务逻辑错误
                return callback(new BusinessError(409, errMessage) )

            }else {
                return callback(new SystemError(500, errMessage, err) )
            }
        }
    }
};


/**
 *  request 参数有以下几种形式
 *  request('http://www.google.com', function (error, response, body){})
 *  request('http://google.com/doodle.png').pipe(fs.createWriteStream('doodle.png'))
 *  request.post('http://service.com/upload', {form:{key:'value'}})
 *  request.post('http://service.com/upload').form({key:'value'})
 *  request.post( {url:'http://service.com/upload', form: {key:'value'}}, function(err,httpResponse,body){})
 *
 */

function verbFunc (verb) {
    var method = verb.toUpperCase();
    return function (uri, options, callback) {
        if (isObject(options)){
            console.log('1111111')
            options.method = method;
        }else if (isObject(uri)){
            console.log('222222')
            uri.method = method;
        }
        return requestWithErrorHandler(uri, options, callback)
    }
}

function requestWithErrorHandler (uri, options, callback) {
    if (isFunction(options)){
        options = callbackWithErrorHandler(options);
    }else if (isFunction(callback)){
        callback = callbackWithErrorHandler(callback);
    }else if (isObject(uri)){
        if (typeof uri.callback !== 'undefined' && isFunction(uri.callback)){
            uri.callback = callbackWithErrorHandler(uri.callback)
        }
    }

    return request(uri, options, callback);
}

// define like this to please codeintel/intellisense IDEs
requestWithErrorHandler.get = verbFunc('get');
requestWithErrorHandler.head = verbFunc('head');
requestWithErrorHandler.post = verbFunc('post');
requestWithErrorHandler.put = verbFunc('put');
requestWithErrorHandler.patch = verbFunc('patch');
requestWithErrorHandler.del = verbFunc('delete');
requestWithErrorHandler['delete'] = verbFunc('delete');

requestWithErrorHandler.jar = request.jar;

requestWithErrorHandler.cookie = request.cookie;

requestWithErrorHandler.defaults = request.defaults;
requestWithErrorHandler.forever = request.forever;
requestWithErrorHandler.Request = request.Request;

module.exports = requestWithErrorHandler;