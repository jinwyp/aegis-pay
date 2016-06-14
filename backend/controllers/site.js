var config = require('../config');
// main page
exports.home = function (req, res, next) {
	var signin = config.passport.member + '/login?gotoURL=' + res.locals.currentLocation + '&from=' + config.domain;
	var signout = config.passport.member + '/logout?gotoURL=' + res.locals.currentLocation + '&from=' + config.domain;
	var register = config.passport.member + '/register?gotoURL=' + res.locals.currentLocation + '&from=' + config.domain;
	var home = [
        '<ul>',
        '	<h1>产品无关调试的页面</h1><hr/>',
        '	<li><a href="/api/user">user session（fetch：req.session.user)</a></li>',
        '	<li><a href="/demo">demo</a></li>',
        '	<li><a href="/newdemo">newdemo</a></li>',
        '	<li><a href="/header">header</a></li>',
        '	<li><a href="/subHeader">subHeader</a></li>',
        '	<li><a href="/footer">footer</a></li>',
		'	<li><a href="api/zips">zip压缩</a></li>',

        '	<h1>产品需要正在做的页面</h1><hr/>',

        '	<li><a href="/compact?orderId=100006">签订电子合同</a> > <a href="/pay?orderId=100000&userId=123&type=1">支付</a> > <a href="/pay/success?orderId=121212&type=1">付款成功</a></li>',
		'	<li><a href="/ucenter/paypassword/reset">重置支付密码</a></li>',
		'	<li><a href="/getOrderDetail?orderId=100000">订单详情</a></li>',
        '	<li><a href="/confirmDelivery">确认提货</a></li>',
        '	<li><a href="/settlement/settlementForm?type=2&id=11" target="_blank">结算单:待结算.卖家开具结算单</a></li>',
        '	<li><a href="/settlement/settlementForm?type=2&id=21" target="_blank">结算单:待审核.卖家编辑结算单</a></li>',
        '	<li><a href="/settlement/settlementForm?type=1&id=22" target="_blank">结算单:待审核.买家审核结算单</a></li>',
        '	<li><a href="/settlement/settlementForm?type=2&id=31" target="_blank">结算单:审核退回.卖家修改数据</a></li>',
        '	<li><a href="/settlement/settlementForm?type=1&id=32" target="_blank">结算单:审核退回.买家修改退回原因</a></li>',
        '	<li><a href="/order/orderClose?id=222000" target="_blank">关闭订单(待签合同)</a></li>',
        '	<li><a href="/order/orderClose?id=111000" target="_blank">关闭订单(待付款)</a></li>',
        '	<li><a href="/return?orderId=100000" target="_blank">退货详情页</a></li>',

        '	<li><a href="/confirmDelivery/sellerDelivery" target="_blank">卖家审核提货</a> &gt; <a href="/confirmDelivery/confirmComplete">确认完成页面</a></li>',
        '	<li><a href="/dispute/disputeApply">纠纷处理申请</a> &gt; <a href="/dispute/disputeComplete">纠纷处理申请完成</a></li>',
        '	<li><a href="/wealth/wealthCenter">wealthCenter</a> </li>',
        '	<li><a href="/confirmDelivery/sellerDelivery">卖家审核提货</a> > <a href="/confirmDelivery/confirmComplete">确认完成页面</a></li>',
        '	<li><a href="/settlement/settlementForm_seller?id=100000&type=1">卖家结算单</a></li>',
        '	<li><a href="/settlement/settlementForm_buyer?id=100000&type=1">买家结算单</a></li>',
        '	<li><a href="/return?orderId=100000">退货详情页</a></li>',
        '	<li><a href="/order/orderClose?id=100000">关闭订单</a></li>',
        '	<li><a href="/confirmDelivery/sellerDelivery">卖家审核提货</a> &gt; <a href="/confirmDelivery/confirmComplete">确认完成页面</a></li>',
        '	<li><a href="/dispute/disputeApply">纠纷处理申请</a> &gt; <a href="/dispute/disputeComplete">纠纷处理申请完成</a> &gt; <a href="/dispute/disputeDetail">纠纷详情</a></li>',

        '</ul>'
    ].join('');
	res.send(home);
};
