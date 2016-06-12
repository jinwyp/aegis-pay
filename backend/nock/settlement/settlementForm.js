/** 开具结算单 [及类型, 页面状态]
 * 数据模拟
 * type: buy 1买家; sell 2卖家
 * status:
 *   1.待结算 (开具结算单)
 *   2.待审核;
 *   3.审核不通过;
 *   4.审核完成;
 *   5.结算完成;

 /settlement/settlementForm?type=2&id=11		待结算.卖家开具结算单(卖 WaitSettleAccounts)
 /settlement/settlementForm?type=2&id=21		待审核.卖家编辑结算单(卖 WaitVerifySettle)
 /settlement/settlementForm?type=1&id=22		待审核.买家审核结算单(买 WaitVerifySettle)
 /settlement/settlementForm?type=2&id=31		审核退回.卖家修改数据(卖 ReturnedSettleAccounts)
 /settlement/settlementForm?type=1&id=32		审核退回.买家修改原因(买 ReturnedSettleAccounts)

 /settlement/settlementForm?type=1&id=44		审核通过.待买家补款  (无 WaitPayTailMoney)
 /settlement/settlementForm?type=2&id=55		审核通过.待卖家退款  (无 WaitPayRefundMoney)
 /settlement/settlementForm?type=2&id=66		审核通过.待卖家开发票(无 WaitWriteReceipt)
 */

var nock = require('nock');
var nkScope = nock('http://server.180.com').persist().log(console.log);				// 请求域名 server.180.com



// 待结算_卖:WaitSettleAccounts
nkScope.get('/settlement/settlementForm').query({type: 'sell', orderId:'11'})
	.reply(200, {
		headerTit: '待结算.卖家开具结算单 11111111',
		subTitle: '开具结算单.s',
		userType: 'sell',
		order: {
			status: 'WaitSettleAccounts'
		}
	});

// 待审核_卖:WaitVerifySettle
nkScope.get('/settlement/settlementForm').query({type: 'sell', orderId:'21'})
	.reply(200, {
		headerTit: '待审核.卖家编辑结算单 121212121212',
		subTitle: '编辑结算单.s',
		userType: 'sell',
		order: {
			status: 'WaitVerifySettle'
		}
	});

// 待审核_买:WaitVerifySettle
nkScope.get('/settlement/settlementForm').query({type: 'buy', orderId:'22'})
	.reply(200, {
		headerTit: '待审核.买家审核结算单 2222222222',
		subTitle: '审核结算单.b',
		userType: 'buy',
		order: {
			status: 'WaitVerifySettle'
		}
	});

// 结算被退回_卖:ReturnedSettleAccounts
nkScope.get('/settlement/settlementForm').query({type: 'sell', orderId:'31'})
	.reply(200, {
		headerTit: '审核不通过.卖家修改数据 31313131313131313131',
		subTitle: '编辑结算单.s',
		userType: 'sell',
		order: {
			status: 'ReturnedSettleAccounts'
		}
	});

// 结算被退回_买:ReturnedSettleAccounts
nkScope.get('/settlement/settlementForm').query({type: 'buy', orderId:'32'})
	.reply(200, {
		headerTit: '审核不通过.买家修改退回原因 32323232323232323232',
		subTitle: '结算单详情.b',
		userType: 'buy',
		order: {
			status: 'ReturnedSettleAccounts'
		}
	});



// 待买家补款:WaitPayTailMoney
//nkScope.get('/settlement/settlementForm').query({type: 'buy', orderId:'44'})
//	.reply(200, {
//		headerTit: '审核通过.待买家补款.下一步 4444444444',
//		subTitle: '结算单详情.b',
//		userType: 'buy',
//		order: {
//			status: 'WaitPayTailMoney'
//		}
//	});
// 待卖家退款:WaitPayRefundMoney
//nkScope.get('/settlement/settlementForm').query({type: 'sell', orderId:'55'})
//	.reply(200, {
//		headerTit: '审核通过.待卖家退款 555555555555',
//		subTitle: '结算单详情.s',
//		userType: 'sell',
//		order: {
//			status: 'WaitPayRefundMoney'
//		}
//	});
// 待卖家开发票:WaitWriteReceipt
//nkScope.get('/settlement/settlementForm').query({type: 'sell', orderId:'66'})
//	.reply(200, {
//		headerTit: '审核通过.待卖家开发票 66666666666',
//		subTitle: '结算单详情.b',
//		userType: 'sell',
//		order: {
//			status: 'WaitWriteReceipt'
//		}
//	});

// +_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_














module.exports = nkScope;












