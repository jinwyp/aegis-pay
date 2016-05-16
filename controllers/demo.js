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
	request(apiHost + 'listData', function(err, data) {
		// 渲染页面,指定模板&数据
		res.render('demo/demo', {listData: JSON.parse(data.body)});			// 指定模板路径 渲染
	});

};
