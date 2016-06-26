var request = require('request');
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
            var statusCode = response.statusCode;
            if(err || (statusCode === 200)){
                _cb(err, response, body);
            }else{
                var errMsg = response&&response.body&&JSON.parse(response.body).error || response.statusMessage;
                var er = new Error('Service request error: ' + errMsg);
                er.customCode = statusCode;
                er.customMsg = errMsg;
                er.customType = 'service-request';
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

var rq = _.assign(rq, request);

rq.post = verbFunc('post');
rq.get = verbFunc('get');

module.exports =rq;