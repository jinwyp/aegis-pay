/**
 * config
 */
var config = {

  mock:  process.env.MOCK == 'true' ? true : false,
  // debug 为 true 时，用于本地调试
  debug: process.env.MOCK == 'true' ? true : false,

  get mini_assets() { return !this.debug; }, // 是否启用静态文件的合并压缩，详见视图中的Loader
  name: 'NRient',
  description: '',
  keywords: 'nodejs react redux webpack',
  site_logo: '',
  site_icon: '',
  // 程序运行的端口
  port: 3000,

  https: false,

  // 域名
  host: 'pay-local.yimei180.com',

  session_secret: 'this_is_yimeis_secret_key_node_redis__cache_long_',
  auth_cookie_name: 'signed_cookie_username',
  redis:{
  	host: '127.0.0.1',
  	port: '6379',
  	db: 0
  },
  sysFileDir: '/Users/beatacao/work/aegis-pay/backend/files/'
};

module.exports = config;
