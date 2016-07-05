var rq = require('request');
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


// organize params for post get
function initParams(uri, options){
    var params = {};
    if (typeof options === 'object') {
        _.assign(params, options, {uri: uri});
    } else if (typeof uri === 'string') {
        _.assign(params, {uri: uri});
    } else {
        _.assign(params, uri)
    }

    return params;
}


var customCallback = function(callback){

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


function verbFunc(verb) {
    var method = verb.toUpperCase()
    return function (uri, options, callback) {
        if (typeof options === 'function') {
            callback = options;
        }

        var params      = initParams(uri, options);
        params.method   = method;
        params.callback = customCallback(callback);
        return request(params);
    }
}

function request (uri, options, callback) {
    var params = initParams(uri, options, callback)
    return rq(params);
}

request.post = verbFunc('post');
request.get = verbFunc('get');

module.exports =request;