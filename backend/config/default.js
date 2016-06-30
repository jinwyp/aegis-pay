/**
 * config
 */
var path = require('path');


var config = {

    debug : true, // debug 为 true 时，用于本地调试
    mock  : process.env.MOCK === 'true' || process.env.MOCK === true ? true : false,

    site_logo   : '',
    site_icon   : '',

    https    : false,
    domain   : 'pay-local.yimei180.com',
    homepage : 'http://pay-local.yimei180.com:3000',
    port     : 3000, // 程序运行的端口

    session_secret   : 'this_is_yimeis_secret_key_node_redis__cache_long_',
    auth_cookie_name : 'signed_cookie_username',

    redis      : {
        host : '127.0.0.1',
        port : '6379',
        db   : 0
    },
    passport: {
      member: 'https://member-local.yimei180.com',
      cookieName: 'passport'
    },

    app_root: path.join(__dirname,'../'),
    logdir : '../logs/',

    // 文件目录配置
    file_path: {
        root        : '/app/files',
        upload_tmp  : '/upload_tmp_pay',
        upload      : '/upload',
        html        : '/html',
        images      : '/images',
        views       : '/app/backend/views',
        download    : '/app/backend/views/download',
        zips        : '/app/backend/views/download/zips',
        pdf         : '/app/backend/views/download/pdf'
    },
    
    member_address: 'http://10.100.20.3:3000',
    site_page: 'https://www.yimei180.com',
    rest_address: 'http://10.100.30.1:8080/'
};



module.exports = config;
