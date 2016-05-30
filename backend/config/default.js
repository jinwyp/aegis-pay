/**
 * config
 */



var config = {

    debug : true, // debug 为 true 时，用于本地调试
    mock  : process.env.MOCK === 'true' || process.env.MOCK === true ? true : false,

    get mini_assets() {
        return !this.debug;
    }, // 是否启用静态文件的合并压缩，详见视图中的Loader

    name        : 'NRient',
    description : '',
    keywords    : 'nodejs react redux webpack',
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
    sysFileDir : process.env.FILES_DIR
};

module.exports = config;
