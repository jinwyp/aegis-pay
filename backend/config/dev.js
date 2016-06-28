/**
 * config
 */
var config = {

    https    : true,
    domain   : 'pay-dev.yimei180.com', // 域名
    homepage : 'https://pay-dev.yimei180.com',

    redis      : {
        host : '10.100.10.2',
        port : '6379',
        db   : 0
    },

    passport: {
      member: 'https://member-dev.yimei180.com',
      cookieName: 'passport'
    },
    site_page: 'https://www-dev.yimei180.com'
};

module.exports = config;

