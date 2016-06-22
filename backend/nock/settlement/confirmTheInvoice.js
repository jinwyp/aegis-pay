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


nkScopePersist.get("/finance/receipt")
	.query({userId: '213', orderId:'110000'})
	.reply(200, {
		success: true,
		error: '错误',
		errorCode: 30001,
		data: {
			orderId: 1234,
			receipt: {
				companyName:	'和略电子商务有限公司12345',
				companyAddress:     '用户公司地址',        //用户公司地址
				companyPhone:       '12345678900987',        //公司电话
				companyFax:         '021-1234567',          //公司传真
				identificationNumber:	'87653432354657',       //纳税人识别号
				bankNam:           '招商银行',          //开户银行名称
				bankAccount:        '1234567890098765',         //银行账号名称
				type:               '1',                //发票类型id
				templetUrl:         '/files/upload/3eb4d184-5c26-4a10-ba59-158807007a24.png'            //发票样板图片url
			},
			companyName: '公司名称',
			receiptTypeList: [{sequence: 1, name:'增值税发票'}]
		}
	});

nkScopePersist.get("/finance/receipt/addUpdate")
	.reply(200, {
		success: true,
		error: 'this is error msg',
		errorCode: 400
	});


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
