/**
 * config
 */

var path = require('path');

var config = {

    domain   : 'pay-local.yimei180.com', // 域名
    homepage : 'http://pay-local.yimei180.com:3000',

    files_root : path.resolve(process.env.FILES_DIR + '/..'), // 上传文件的临时目录
    passport   : {
        member     : 'http://member-local.yimei180.com:7777',
        cookieName : 'passport'
    }
};

module.exports = config;
