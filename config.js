/**
 * config
 */
var config = {
  // debug 为 true 时，用于本地调试
  debug: true,
  get mini_assets() { return !this.debug; }, // 是否启用静态文件的合并压缩，详见视图中的Loader
  name: 'NRient',
  description: '',
  keywords: 'nodejs react redux webpack',
  site_logo: '',
  site_icon: '',
  // 程序运行的端口
  port: 8800,
  // 域名
  host: '',
  session_secret: 'this_is_yimeis_secret_key_node_redis__cache_long_',
  auth_cookie_name: 'signed_cookie_username',
  redis:{
  	host: '127.0.0.1',
  	port: '6379',
  	db: 0
  }
};

module.exports = config;
