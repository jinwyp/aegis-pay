/**
 * config
 */
var config = {
    debug : false,
    mock  : false,
    
    https    : true,
    domain   : 'pay.yimei180.com', // 域名
    homepage : 'https://pay.yimei180.com',

    redis      : {
        host : '10.0.10.2',   // 这个应该不是这个地址
        port : '6379',
        db   : 0
    }
};

module.exports = config;

