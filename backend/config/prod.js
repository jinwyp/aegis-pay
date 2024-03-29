/**
 * config
 */
var config = {
    debug : false,
    mock  : false,
    
    https    : true,
    domain   : 'pay.yimei180.com', // 域名
    homepage : 'https://pay.yimei180.com',
    finance_page: 'https://finance.yimei180.com',
    passport: {
        member: 'https://member.yimei180.com',
        cookieName: 'passport'
    },
    ymIndexUrl: 'https://info.yimei180.com',
    logdir:'../logs/',
    redis      : {
        host : process.env.redis_host,   // 这个应该不是这个地址
        port : process.env.redis_port,
        db   : 0
    },
    redis_notification: {
        host: process.env.notification_redis_host,
        port: process.env.notification_redis_port,
        db: 0
    },
    // 生产为负载均衡地址
    rest_address: process.env.SERVICE_ADDRESS,
    bidUrl: 'https://bid.yimei180.com'
};

module.exports = config;

