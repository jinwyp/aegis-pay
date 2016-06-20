/**
 * 开具结算单 [及类型, 页面状态]
 * 数据模拟
 * type: buy 1买家; sell 2卖家
 * status:
	 WaitSettleAccounts	 	待结算.卖家开具结算单(卖)
	 WaitVerifySettle	 	待审核.卖家编辑结算单(卖)
	 WaitVerifySettle	 	待审核.买家审核结算单(买)
	 ReturnedSettleAccounts	审核退回.卖家修改数据(卖)
	 ReturnedSettleAccounts	审核退回.买家修改原因(买)
	 WaitPayTailMoney	 	审核通过.待买家补款  (_)
	 WaitPayRefundMoney	 	审核通过.待卖家退款  (_)
	 WaitWriteReceipt	 	审核通过.待卖家开发票(_)  */

var API  = require('../../api/v1/api_config');              				// 接口路径配置
var nock = require('nock');
var nkScope = nock(API.host).log(console.log);		        				// 执行一次
var nkScopePersist = nock(API.host).log(console.log).persist();		        // 执行多次



// 待结算_卖:WaitSettleAccounts
nkScopePersist.get('/settlement/settlementForm').query({type: 'sell', orderId:'110000'})
	.reply(200, {
		headerTit: '待结算.卖家开具结算单 11111111',
		subTitle: '开具结算单.s',
		userType: 'sell',
		order: {
			status: 'WaitSettleAccounts'
		}
	});

// 待审核_卖:WaitVerifySettle
nkScopePersist.get('/settlement/settlementForm').query({type: 'sell', orderId:'110000'})
	.reply(200, {
		headerTit: '待审核.卖家查看结算单 121212121212',
		subTitle: '查看结算单.s',
		userType: 'sell',
		order: {
			status: 'WaitVerifySettle'
		}
	});

// 待审核_买:WaitVerifySettle
nkScopePersist.get('/settlement/settlementForm').query({type: 'buy', orderId:'220000'})
	.reply(200, {
		headerTit: '待审核.买家审核结算单 2222222222',
		subTitle: '审核结算单.b',
		userType: 'buy',
		order: {
			status: 'WaitVerifySettle'
		}
	});

// 结算被退回_卖:ReturnedSettleAccounts
nkScopePersist.get('/settlement/settlementForm').query({type: 'sell', orderId:'310000'})
	.reply(200, {
		headerTit: '审核不通过.卖家修改数据 31313131313131313131',
		subTitle: '编辑结算单.s',
		userType: 'sell',
		order: {
			status: 'ReturnedSettleAccounts'
		}
	});

// 结算被退回_买:ReturnedSettleAccounts
nkScopePersist.get('/settlement/settlementForm').query({type: 'buy', orderId:'320000'})
	.reply(200, {
		headerTit: '审核不通过.买家修改退回原因 32323232323232323232',
		subTitle: '结算单详情.b',
		userType: 'buy',
		order: {
			status: 'ReturnedSettleAccounts'
		}
	});














// +_+_API部分_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_
// API路由: 卖家.查看结算单 (待结算_卖:WaitSettleAccounts  待审核_卖:WaitVerifySettle)
nkScopePersist.get('/settlement/sellerView').query({sellerId: '213', orderId:'110000'})
	.reply(200, {
		success: true,
		data: {
			order: {
				id: 110000,
				version: 2314231,
				orderNO: '82793847398',
				contractNO: '82793847398FGHJKL',
				confirmDeliveryTime: '2016-06-20 16:11:48',		//确认提货时间
				confirmSettleTime: '2016-06-20 16:11:48',		//结算时间
				paymentTime: '2016-06-20 16:11:48',				//付款时间
				harbour: '上海港',					//港口
				coalType: '动力煤',					//煤种
				amount: 3000,						//合同吨位
				status: 'WaitSettleAccounts',		//状态
				statusName: '待结算',
				totalMoney: 1000,					//货品金额
				settleMoney: 900,					//总结算金额
				tailMoney: 100,						//应补款
				refundMoney: 0,						//应退款
				remarks: '备注信息',
				buyerCompanyName: '购方公司',
				sellerCompanyName: '销方公司asldfjlasf'
			}
		}
	});


// API路由: 卖家.提交结算单 (待结算_卖:WaitSettleAccounts  or  结算被退回_卖:ReturnedSettleAccounts)
nkScopePersist.post('/settlement/sellerSubmit')//.query({sellerId: '213', orderId:'110000'})
	.reply(200, {
		success: true
	});


//API路由: 买家.查看结算单 ()
nkScopePersist.get('/settlement/sellerView').query({sellerId: '213', orderId:'110000'})
	.reply(200, {
		success: true,
		data: {
			order: {
				id: 110000,
				version: 2314231,
				orderNO: '82793847398',
				contractNO: '82793847398FGHJKL',
				confirmDeliveryTime: '2016-06-20 16:11:48',		//确认提货时间
				confirmSettleTime: '2016-06-20 16:11:48',		//结算时间
				paymentTime: '2016-06-20 16:11:48',				//付款时间
				harbour: '上海港',					//港口
				coalType: '动力煤',					//煤种
				amount: 3000,						//合同吨位
				status: 'WaitSettleAccounts',		//状态
				statusName: '待结算',
				totalMoney: 1000,					//货品金额
				settleMoney: 900,					//总结算金额
				tailMoney: 100,						//应补款
				refundMoney: 0,						//应退款
				remarks: '备注信息',
				buyerCompanyName: '购方公司',
				sellerCompanyName: '销方公司asldfjlasf'
			}
		}
	});


module.exports = nkScopePersist;
