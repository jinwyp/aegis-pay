/**
 * config
 */
var config = {

  // debug 为 true 时，用于本地调试
  mock: process.env.MOCK == 'true' ? true : false,

  debug: process.env.DEBUG == 'true' ? true : false,

  get mini_assets() { return !this.debug; }, // 是否启用静态文件的合并压缩，详见视图中的Loader
  name: 'NRient',
  description: '',
  keywords: 'nodejs react redux webpack',
  site_logo: '',
  site_icon: '',

  // 程序运行的端口
  port: 3000,

  https: true,

  // 域名
  domain: 'pay-dev.yimei180.com',
  homepage: 'https://pay-dev.yimei180.com',
  port: 3000,

  session_secret: 'this_is_yimeis_secret_key_node_redis__cache_long_',
  auth_cookie_name: 'signed_cookie_username',

  redis:{
  	host: '10.0.10.2',
  	port: '6379',
  	db: 0
  },
  sysFileDir: '/Users/beatacao/work/aegis-pay/backend/files/'

};

module.exports = config;

