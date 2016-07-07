/**
 * config
 */

var path = require('path');

var config = {
    port     : 3001, // 程序运行的端口
    domain   : 'pay-local.yimei180.com', // 域名
    homepage : 'http://pay-local.yimei180.com:3001',

    file_path: {
        root : path.join(__dirname, '../../../files/pay'),
        adminroot: path.join(__dirname, '../../../files/pay'),
        upload_tmp  : '/upload_tmp_pay',
        upload      : '/upload',
        html        : '/html',
        images      : '/images',
        download    : '/download',
        zips        : '/download/zips',
        pdf         : '/download/pdf',
        compact     : '/compact'
    },
    
    views       : path.join(__dirname, '../views'),
    viewspdf    : path.join(__dirname, '../views/global/pdftemplate'),
    view_file   : path.join(__dirname, '../../../files/pay/compact/'),             // 图片实际地址

    passport   : {
        member     : 'http://member-local.yimei180.com:3000',
        cookieName : 'passport'
    },
    member_address: 'http://127.0.0.1:3000',
    rest_address: 'http://127.0.0.1:9091/',
    site_page: 'http://www-local.yimei180.com:8080'
};

module.exports = config;
