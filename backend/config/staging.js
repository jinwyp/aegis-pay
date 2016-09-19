/**
 * config
 */
var config = {

    https    : true,
    domain   : 'pay-staging.yimei180.com',   // 域名
    homepage : 'https://pay-staging.yimei180.com',
    finance_page: 'https://finance-staging.yimei180.com',

    passport: {
        member: 'https://member-staging.yimei180.com',
        cookieName: 'passport'
    },
    ymIndexUrl: 'https://info-staging.yimei180.com',
    redis      : {
        host : '10.100.10.2',
        port : '6379',
        db   : 0
    },
    site_page: 'https://www-staging.yimei180.com',
    redis_notification: {
        host: '10.100.10.1',
        port: 6379,
        db: 0
    },
    bidUrl: 'https://bid-staging.yimei180.com'
};

module.exports = config;

