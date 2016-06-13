/*
* 业务控制 (模板 & 数据请求)
* */

var request = require('request');
var apiHost = 'http://server.180.com/';			// 模拟域名


// 处理业务逻辑
exports.demo = function (req, res, next) {
	// 静态数据
	//var dataObj = {
	//	'article': {
	//		'title': '静态标题'
	//	}
	//};
	//res.render('demo/demo', dataObj);			// 指定模板路径 渲染

	// 异步调取Java数据
	request(apiHost + 'listData', function (err, data) {
		if (err) return next (err);

		if (data && data.body) {
			// 订单状态 数据模拟
            var statusObj = {
                step: 4,        // 第几步
                total: 5,		// 总步数
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
				statusObj: statusObj					//NODE端 数据模拟
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

