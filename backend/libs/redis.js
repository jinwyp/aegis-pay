var config = require('../config');
var Redis  = require('ioredis');
var logger = require('./logger');

var client = new Redis({
    port : config.redis.port,
    host : config.redis.host,
    db   : config.redis.db
});

var pub = new Redis({
    port: config.redis_notification.port,
    host: config.redis_notification.host,
    db: config.redis_notification.db,
});

client.on('error', function (err) {
    if (err) {
        logger.error('Connect to redis error, check your redis config', err);
        process.exit(1);
    }
});

pub.on('error', function (err) {
    if (err) {
        logger.error('connect to pub redis error, check your redis config', err);
        process.exit(1);
    }
});

exports.client = client;
exports.pub = pub;
