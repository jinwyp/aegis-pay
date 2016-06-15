/**
 * 结算单.确认开票
 * 数据模拟
 * type: buy 1买家; sell 2卖家
 * status:

  */

var API  = require('../../api/v1/api_config');              // 接口路径配置
var nock = require('nock');
var nkScope = nock(API.host).log(console.log);		        // 执行一次
var nkScopePersist = nock(API.host).log(console.log).persist();		        // 执行多次



// 结算单.开票信息
nkScopePersist.get('/settlement/confirmTheInvoice')
	.query({type: 'sell', orderId:'11'})
	.reply(200, {
		headerTit: '结算单.获取开票信息 11111111',
		subTitle: '开票信息.s',
		userType: 'sell',
		order: {
			status: 'WaitSettleAccounts'
		}
	});

// +_+_API部分_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_





module.exports = nkScopePersist;
