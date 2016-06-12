/**
 * config
 */
var config = {

    https    : true,
    domain   : 'pay.yimei180.com', // 域名
    homepage : 'https://pay.yimei180.com',

    redis      : {
        host : process.env.REDIS_HOST,   // 这个应该不是这个地址
        port : process.env.REDIS_PORT,
        db   : 0
    }
};

module.exports = config;

