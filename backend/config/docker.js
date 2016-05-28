/**
 * config
 */
var config = {

  host: 'pay.yimei180'  + process.env.DOMAIN, // 域名
  port: 3000, // 程序运行的端口
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

