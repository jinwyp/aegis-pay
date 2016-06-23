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

/**
 * 各发票流程:
 * 1. (结算) 确认开票信息： (参数: userId orderId)
 * 新增发票(载入已有发票数据 userId orderId) —> 填写order备注 (userId, orderId) --> (结算)结算完成 /getOrderDetail?orderId=
 *
 * 2. 开票设置列表:	(参数:  userId)
 * 新增：新增发票	userId  —> 开票设置列表 /settlement/billSetting
 * 修改：修改发票(载入已有发票数据) userId —> 开票设置列表 /settlement/billSetting
 */

	//没有发票数据, 无orderId
nkScopePersist.get("/finance/receipt")
	.query({userId: '213'})
	.reply(200, {
		success: true,
		error: '',
		errorCode: 0,
		data: {
			companyName: '公司名称',
			receiptTypeList: [{sequence: 1, name:'增值税发票'}]
		}
	});

////有发票数据, 无orderId
// nkScopePersist.get("/finance/receipt")
// 	.query({userId: '213'})
// 	.reply(200, {
// 		success: true,
// 		error: '',
// 		errorCode: 0,
// 		data: {
// 			receipt: {
// 				companyName:	'和略电子商务有限公司12345',
// 				companyAddress:     '用户公司地址',        //用户公司地址
// 				companyPhone:       '12345678900987',        //公司电话
// 				companyFax:         '021-1234567',          //公司传真
// 				identificationNumber:	'87653432354657',       //纳税人识别号
// 				bankName:           '招商银行',          //开户银行名称
// 				bankAccount:        '1234567890098765',         //银行账号名称
// 				type:               '1',                //发票类型id
// 				templetUrl:         '/files/upload/3eb4d184-5c26-4a10-ba59-158807007a24.png'            //发票样板图片url
// 			},
// 			companyName: '公司名称',
// 			receiptTypeList: [{sequence: 1, name:'增值税发票'}]
// 		}
// 	});

// //有orderId, 无发票数据
nkScopePersist.get("/finance/receipt")
	.query({userId: '213', orderId:'220000'})
	.reply(200, {
		success: true,
		error: '错误',
		errorCode: 30001,
		data: {
			orderId: 110000,
			version: 123,
			companyName: '公司名称',
			receiptTypeList: [{sequence: 1, name:'增值税发票'}]
		}
	});

//有orderId, 有发票数据
nkScopePersist.get("/finance/receipt")
	.query({userId: '213', orderId:'110000'})
	.reply(200, {
		success: true,
		error: '错误',
		errorCode: 30001,
		data: {
			orderId: 110000,
			version: 123,
			receipt: {
				companyName:	'和略电子商务有限公司12345',
				companyAddress:     '用户公司地址',        //用户公司地址
				companyPhone:       '12345678900987',        //公司电话
				companyFax:         '021-1234567',          //公司传真
				identificationNumber:	'87653432354657',       //纳税人识别号
				bankName:           '招商银行',          //开户银行名称
				bankAccount:        '1234567890098765',         //银行账号名称
				type:               '1',                //发票类型id
				typeName:			'增值税发票',			//typeName:  发票类型Name
				templetUrl:         '/files/upload/8faef5c8-0b5e-4757-be0c-81728b7f461f.jpg'            //发票样板图片url
			},
			companyName: '公司名称',
			receiptTypeList: [{sequence: 1, name:'增值税发票'}]
		}
	});

nkScopePersist.post("/finance/receipt/addUpdate")
	.reply(200, {
		success: true,
		error: 'this is error msg',
		errorCode: 400
	});


// // 页面数据.确认开票
// nkScopePersist.get('/settlement/invoiceInfo')
// 	.query({userId: '213', orderId:'110000'})
// 	.reply(200, {
// 		headerTit: '结算单.获取开票信息 11111111234',
// 		subTitle: '确认开票信息',
// 		userType: 'sell',
// 		order: {
// 			status: 'WaitSettleAccounts'
// 		}
// 	});


// 页面数据.开票备注
nkScopePersist.post('/mall/order/receiptRemarks/addUpdate')
	.reply(200, {
		success: true,
		error: '错误信息',
		errorCode: '错误码'
	});

// +_+_API部分_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_+_





module.exports = nkScopePersist;
