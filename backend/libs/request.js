var rq = require('request');
var _ = require('lodash');

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
            var statusCode = response && response.statusCode;
            if(err || (statusCode === 200)){
                _cb(err, response, body);
            }else{
                var errMsg = response&&response.body
                            && ((typeof response.body == 'object') ? response.body.error : JSON.parse(response.body).error)
                            || response.statusMessage;
                var er = new Error(errMsg);
                _.assign(er, {'customCode': statusCode, 'customMsg': errMsg, 'customType': 'service-request'});
                _cb(er);
            }
        }
    }
    return params;
}

function verbFunc (verb) {
  var method = verb.toUpperCase()
  return function (uri, options, callback) {
    var params = initParams(uri, options, callback)
    params.method = method
    return request(params, params.callback)
  }
}

function request (uri, options, callback) {
    var params = initParams(uri, options, callback)
    return rq(params);
}

request.post = verbFunc('post');
request.get = verbFunc('get');

module.exports =request;