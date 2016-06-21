/**
 * 结算单.确认开票
 * 数据模拟
 * type: buy 1买家; sell 2卖家
 * status:

  */

var API  = require('../../api/v1/api_config');              		// 接口路径配置
var nock = require('nock');
var nkScope = nock(API.host).log(console.log);		        		// 执行一次
var nkScopePersist = nock(API.host).log(console.log).persist();		// 执行多次



// 页面数据.确认开票
nkScopePersist.get('/settlement/invoiceInfo')
	.query({userId: '213', orderId:'110000'})
	.reply(200, {
		headerTit: '结算单.获取开票信息 11111111234',
		subTitle: '确认开票信息',
		userType: 'sell',
		order: {
			status: 'WaitSettleAccounts'
		}
	});


// 页面数据.开票备注
nkScopePersist.get('/settlement/invoiceNotes')
	.query({type: 'sell', orderId:'220000'})
	.reply(200, {
		headerTit: '结算单.添加开票备注 2222222',
		subTitle: '开票备注信息',
		userType: 'sell',
		order: {
			status: 'WaitSettleAccounts'
		}
	});

// +_+_API部分_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_





module.exports = nkScopePersist;
