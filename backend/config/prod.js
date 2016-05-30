/**
 * config
 */
var config = {

    https    : true,
    domain   : 'pay.yimei180.com', // 域名
    homepage : 'https://pay.yimei180.com',
    port     : 80, // 程序运行的端口

    redis : {
        host : '10.0.10.2',   // 这个应该不是这个地址
        port : '6379',
        db   : 0
    },

    sysFileDir : process.env.FILES_DIR

};

module.exports = config;

