/**
 * config
 */

var path = require('path');

var config = {
    port     : 3001, // 程序运行的端口
    domain   : 'pay-local.yimei180.com', // 域名
    homepage : 'http://pay-local.yimei180.com:3001',

    files_root : path.resolve(process.env.FILES_DIR + '/..'), // 上传文件的临时目录
    passport   : {
        member     : 'http://member-local.yimei180.com:3000',
        cookieName : 'passport'
    },
    member_address: 'http://127.0.0.1:3000',
    rest_address: 'http://127.0.0.1:8080/'
};

module.exports = config;

