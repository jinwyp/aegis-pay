/**
 * config
 */

var path = require('path');

var config = {
    port     : 3001, // 程序运行的端口
    domain   : 'pay-local.yimei180.com', // 域名
    homepage : 'http://pay-local.yimei180.com:3001',

    file_path: {
        root : path.join(__dirname, '../../../files'),
        upload_tmp  : '/upload_tmp_pay',
        upload      : '/upload',
        html        : '/html',
        images      : '/images',
        views       : path.join(__dirname, '../views'),
        download    : path.join(__dirname, '../views/download'),
        zips        : path.join(__dirname, '../views/download/zips'),
        pdf         : path.join(__dirname, '../views/download/pdf')
    },
    
    passport   : {
        member     : 'http://member-local.yimei180.com:3000',
        cookieName : 'passport'
    },
    member_address: 'http://127.0.0.1:3000',
    rest_address: 'http://127.0.0.1:9091/'
};

module.exports = config;
