/*
* 关闭订单页面..数据模拟
* */


var nock = require('nock');
var orderInfo = nock('http://server.180.com/');		// 需要替换的请求域名


// 订单信息 模拟
var replyData = {
		headerTit: '关闭订单',		// 页面副标题
		orderInfo: {
			version: '239849859328450',
			orderNo: '239849859328450',
			contractNumber: 3333333,
			orderTime: '2016-05-18',
			paymentTime: '2016-05-18',
			orderStatus: '待付款',
			goodsMoney: 44444
		},
		reasonList: [
			{
				id: 555,
				name: '下错单'
			},
			{
				id: 666,
				name: '不想要了'
			},
			{
				id: 777,
				name: '没原因'
			}
		]
	}

// 提交关闭 返回信息
var closeData = {
		success: false,
		error: '提交失败!'
	}


// 接口名称 'infoObj'
orderInfo.get('/infoObj').reply(200, replyData);


orderInfo.get();		//


module.exports = orderInfo;