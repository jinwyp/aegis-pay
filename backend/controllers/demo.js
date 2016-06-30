/*
* 业务控制 (模板 & 数据请求)
* */

var config = require('../config');
var request = require('../libs/request');
var apiHost = 'http://server.180.com/';			// 模拟域名


// 处理业务逻辑
exports.demo = function (req, res, next) {
	// 静态数据
	//var dataObj = {
	//	'article': {
	//		'title': '静态标题'
	//	}
	//};
    //return res.send(dataObj);

	// 异步调取Java数据
	request(apiHost + 'listData', function (err, data) {

		if (err) return next (err);

		if (data && data.body) {
			// 订单状态 数据模拟
            var statusObj = {
                step: 3,        // 第几步
                total: 4,		// 总步数
                stepList: [
                    {
                        stepName: '提交订单',
                        stepDate: '2016-05-11 01:02:36'
                    },
                    {
                        stepName: '签订合同',
                        stepDate: '2016-05-12 01:02:36'
                    },
                    {
                        stepName: '付款',
                        stepDate: '2016-05-13 01:02:36'
                    },
                    {
                        stepName: '确认提货',
                        stepDate: '2016-05-14 01:02:36'
                    },
                    {
                        stepName: '结算1111',
                        stepDate: '2016-05-15 01:02:36'
                    }
                ]
            };


			var DATA = {
				pageTitle: 'Demo_页面标题',
				headerTit: '开具结算单',
				listData: JSON.parse(data.body),		//服务器端 数据模拟
				statusObj: statusObj,					//NODE端 数据模拟

                userType: 'buy',                        //结算单 审核不通过.买家修改退回原因
                success: true,
                data: {
                    order: {
                        id: 220000,
                        version: 2314231,

                        orderNO: '82793847398',						//订单编号
                        contractNO: '82793847398FGHJKL',			//合同编号
                        confirmDeliveryTime: '2016-06-20 16:11:48',	//确认提货时间
                        confirmSettleTime: '2016-06-20 16:11:48',	//结算时间
                        harbour: '上海港',							//港口
                        coalType: '动力煤',							//煤种
                        amount: 3000,								//合同吨位
                        price: 100, 								//合同单价
                        totalMoney: 1000,							//合同金额.付款金额
                        paymentTime: '2016-06-20 16:11:48',			//付款时间

                        buyerCompanyName: '购方公司11',				//购方公司
                        sellerCompanyName: '销方公司22',				//销方公司
                        status: 'WaitVerifySettle',
                        statusName: '待结算',
                        sellerSettleTime: '2016-06-20 16:11:48',	//*结算单创建时间

                        settleAmount: 300,							//*结算吨数
                        harbourDues: 555,							//*港务费
                        settleMoney: 1000,							//*结算金额
                        tailMoney: 100,								//*应补款
                        refundMoney: 0,								//*应退款
                        remarks: '说明33',

                        currentTime: '2016-06-22 00:00:00',			//当前时间
                        settleReturnTime: '2016-06-22 00:00:00',    //结算退回时间
                        returnReason: '结算退回原因 结算退回原因'
                    }
                }

            };

			// 渲染页面,指定模板&数据
			res.render('demo/demo', DATA);				// 指定模板路径 渲染
		}else{
            res.render('demo/demo', {
                pageTitle: 'Demo_页面标题',
                headerTit: '开具结算单',
                listData: [],		//服务器端 数据模拟
                statusObj: {}					//NODE端 数据模拟
            });				// 指定模板路径 渲染
        }
	});



};



// main page
exports.home = function (req, res, next) {
    return res.render('index',{});
};



exports.test = function (req, res, next) {
    return res.render('test', {});
}