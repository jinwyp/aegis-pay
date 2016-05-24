//api
var host = 'http://service.yimei180.com/';

var api_config = {
	host:host,
	test: host + "test",
	apps: host + 'apps',
	apps2: host + 'apps2',
	signin: host + 'signin',
	signout: host + 'signout',
	products: host + 'products',
	uploadFile: host + 'upload-file',
	delFile: host + 'del-file',
	/**
	 * 提交已盖章电子合同
	 * method: post
	 * params: {orderid: 1, action: 'post', compact:'电子合同内容'}
	 */
	signCompact: host + 'compact',
	/**
	 * fetch未盖章电子合同
	 * method: get
	 * params: {orderid: 1, action: 'get'}
	 */
	getCompact: host + 'compact',
}

module.exports = api_config;
