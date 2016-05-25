// main page
exports.home = function (req, res, next) {
	var home = ['<ul>',
					'<li><a>signin: post</a></li>',
					'<li><a>signout: post</a></li>',
					'<li><a href="/api/apps">apps</a></li>',
					'<li><a href="/api/test-cache">test_cache</a></li>',
					'<li><a href="/api/async-merge">async merge</a></li>',
					'<li><a href="/api/cogen-merge">co+genrator merge</a></li>',
					'<li><a href="/compact?orderid=1">签订电子合同</a></li>',
					'<li><a href="/demo">demo</a></li>',
					'<li><a href="/header">header</a></li>',
					'<li><a href="/subHeader">subHeader</a></li>',
					'<li><a href="/footer">footer</a></li>',
					'<li><a href="/confirmDelivery">确认订单</a></li>',
				'</ul>'].join('');
	res.send(home);
};
