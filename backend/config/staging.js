/**
 * config
 */
var config = {

    https    : true,
    domain   : 'pay-staging.yimei180.com',   // 域名
    homepage : 'https://pay-staging.yimei180.com',
    port     : 80,
    
    redis      : {
        host : '10.0.10.2',
        port : '6379',
        db   : 0
    },
    sysFileDir : '/Users/beatacao/work/aegis-pay/backend/files/'
};

module.exports = config;

