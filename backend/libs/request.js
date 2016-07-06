var request = require('request');
var _ = require('lodash');

var PageNotFoundError = require('../errors/PageNotFoundError');
var SystemError = require('../errors/SystemError');

var BusinessError = require('../errors/BusinessError');
var MethodArgumentNotValidError = require('../errors/MethodArgumentNotValidError');
var UnauthenticatedAccessError = require('../errors/UnauthenticatedAccessError');
var UnauthorizedAccessError = require('../errors/UnauthorizedAccessError');


function isObject(obj) {
    return obj === Object(obj);
}

function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

// organize params for post get
function initParams(uri, options, callback){
    if (typeof options === 'function') {
        callback = options;
    }

    var params = {}
    if (typeof options === 'object') {
        _.assign(params, options, {uri: uri});
    } else if (typeof uri === 'string') {
        _.assign(params, {uri: uri});
    } else {
        _.assign(params, uri)
    }

    params.callback = callback || params.callback;

    if(typeof params.callback === 'function'){
        var _cb = params.callback;
        params.callback = function(err, response, body){
            if (err){
                return _cb(err, response, body);
            }else if (response.statusCode === 200){
                return _cb(err, response, body);
            }else{
                var tempBody = {};
                if (isObject(response.body)){
                    tempBody = response.body;
                }else {
                    tempBody = JSON.parse(response.body);
                }

                var errMessage = tempBody.error + ". Url: " + tempBody.path + ". Reason: " + tempBody.message + ". Exception: " + tempBody.exception;

                if (response.statusCode === 400 || response.statusCode === 405) { // 参数错误
                    return _cb(new MethodArgumentNotValidError(400, errMessage) )

                }else if (response.statusCode === 401) { // 重新登录
                    return _cb(new UnauthenticatedAccessError(401, errMessage) )

                }else if (response.statusCode === 403) { // 没有权限访问
                    return _cb(new UnauthorizedAccessError(403, errMessage) )

                }else if (response.statusCode === 409) { // 业务逻辑错误
                    return _cb(new BusinessError(409, errMessage) )

                }else {
                    return _cb(new SystemError(500, errMessage, err) )
                }
            }
        }
    }
    return params;
}

/*
*  request('http://www.google.com', function (error, response, body){})
*  request('http://google.com/doodle.png').pipe(fs.createWriteStream('doodle.png'))
*  request.post('http://service.com/upload', {form:{key:'value'}})
*  request.post('http://service.com/upload').form({key:'value'})
*  request.post( {url:'http://service.com/upload', form: {key:'value'}}, function(err,httpResponse,body){})
*
*/

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

            var errMessage = tempBody.error + ". Url: " + tempBody.path + ". Reason: " + tempBody.message + ". Exception: " + tempBody.exception;

            if (response.statusCode === 400 || response.statusCode === 405) { // 参数错误
                return callback(new MethodArgumentNotValidError(400, errMessage) )

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


function verbFunc (verb) {
    var method = verb.toUpperCase()
    return function (uri, options, callback) {
        var params = initParams(uri, options, callback)
        params.method = method;
        return request(params, params.callback)
    }
}

function requestWithErrorHandler (uri, options, callback) {
    var params = initParams(uri, options, callback)
    return request(params);
}

requestWithErrorHandler.post = verbFunc('post');
requestWithErrorHandler.get = verbFunc('get');

module.exports = requestWithErrorHandler;