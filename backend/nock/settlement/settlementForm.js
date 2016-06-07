/*
* 开具结算单 页面数据模拟
* */

var nock = require('nock');
var API  = require('../../api/v1/api_config');

var orderInfo        = nock(API.host).log(console.log);
var orderInfoPersist = nock(API.host).persist();

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

// 提交关闭 返回信息
var closeData = {
	success: false,
	error: '提交失败!',
	errorcode: 123
};


// 查询订单 'infoObj'
orderInfoPersist.get('/orderInfo').reply(200, replyData);	// *** 路径必须加'/'



// 查询订单:接口
// http://localhost:3000/api/order/orderInfo_api
orderInfoPersist.get('/order/orderInfo_api').reply(200, replyData);


// 关闭订单:接口
// http://localhost:3000/api/order/closeOrder_api
// orderInfoPersist.get('/order/closeOrder_api').reply(200, closeData);

module.exports = orderInfo;












