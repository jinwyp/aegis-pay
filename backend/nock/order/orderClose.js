/*
* 关闭订单页面..数据模拟
* */


var nock = require('nock');
var apiHost = nock('http://server.180.com/');		// 需要替换的请求域名


// 订单信息 模拟
var replyData = {
	order: {
		version: '123',
		id: '11',
		orderNO: '239849859328450',
		contractNO: 3333333,
		createTime: '2016-05-18',
		payTime: '2016-05-18',
		status: '待付款',
		totalMoney: 44444
	},
	shutdownReasonList: [
		{
			sequence: 555,
			name: '下错单'
		},
		{
			sequence: 666,
			name: '不想要了'
		},
		{
			sequence: 777,
			name: '没原因'
		}
	]
};

// 查询订单 'infoObj'
apiHost.get('/orderInfo').reply(200, replyData);



// 提交关闭 返回信息
var closeData = {
	success: false,
	error: '提交失败!',
	errorcode: 123
};
// 关闭订单 'closeOrder'
apiHost.get('/closeOrder').reply(200, closeData);

module.exports = apiHost;