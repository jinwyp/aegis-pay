var request = require('./request');
var _       = require('lodash');
var redis   = require('./redis').client;
var logger  = require('./logger');
var redis_pub = require('./redis').pub;


var get = function (key, callback){
    var t = new Date();

    redis.get(key, function (err, data) {
        if (err) return callback(err);

        if (!data) {
            logger.debug('Redis get nothing for key:' + key);
            return callback(null, null);
        }else {
            data         = JSON.parse(data);
            var duration = (new Date() - t);
            logger.debug('Cache', 'get', key, (duration + 'ms').green);
            return callback(null, data);
        }
    });
};

exports.get = get;



// time 参数可选，秒为单位
var set = function (key, value, time, callback) {
    var t = new Date();

    if (typeof time === 'function') {
        callback = time;
        time     = null;
    }
    callback = callback || _.noop;
    value    = JSON.stringify(value);

    if (!time) {
        redis.set(key, value, callback);
    } else {
        redis.setex(key, time, value, callback);
    }


    var duration = (new Date() - t);
    logger.debug("Cache", "set", key, (duration + 'ms').green);
};

exports.set = set;



//删除
var del = function () {
    var key;
    var length = arguments.length;

    if (length > 0) {
        for (key in arguments) {
            redis.del(arguments[key]);
        }
    }
};

exports.del = del;


var pub = function (channel,message) {
    var t = new Date();
    redis_pub.publish(channel,message);
    //data = JSON.parse(channel);
    var duration = (new Date() - t);
    logger.debug('Cache', 'pub', channel,message, (duration + 'ms').green);
};

exports.pub = pub;