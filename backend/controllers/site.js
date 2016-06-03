// main page
exports.home = function (req, res, next) {
	var home = [
        '<ul>',
        '	<h1>产品无关调试的页面</h1><hr/>',
        '	<li><a>signin: post</a></li>',
        '	<li><a>signout: post</a></li>',
        '	<li><a href="/api/apps">apps</a></li>',
        '	<li><a href="/api/test-cache">test_cache</a></li>',
        '	<li><a href="/api/async-merge">async merge</a></li>',
        '	<li><a href="/api/cogen-merge">co+genrator merge</a></li>',
        '	<li><a href="/demo">demo</a></li>',
        '	<li><a href="/header">header</a></li>',
        '	<li><a href="/subHeader">subHeader</a></li>',
        '	<li><a href="/footer">footer</a></li>',
		'	<li><a href="api/zips">zip压缩</a></li>',

        '	<h1>产品需要正在做的页面</h1><hr/>',
        '	<li><a href="/compact?orderId=100000">签订电子合同</a> > <a href="/pay?orderId=1">支付</a> > <a href="/order/progress">付款成功</a></li>',
		'	<li><a href="/getOrderDetail?orderId=1">订单详情</a></li>',
        '	<li><a href="/confirmDelivery">确认提货</a></li>',
        '	<li><a href="/confirmDelivery/sellerDelivery">卖家审核提货</a></li>',
        '	<li><a href="/settlement/settlementForm_seller?id=222&type=1">卖家结算单</a></li>',
        '	<li><a href="/settlement/settlementForm_buyer?id=111&type=1">买家结算单</a></li>',
        '	<li><a href="/return">退货详情页</a></li>',
        '	<li><a href="/order/orderClose?id=111">关闭订单</a></li>',
        '	<li><a href="/confirmDelivery/confirmComplete">确认完成页面</a></li>',
        '</ul>'
    ].join('');
	res.send(home);
};
