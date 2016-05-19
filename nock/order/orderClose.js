/*
* 数据模拟
* */


var nock = require('nock');
var orderInfo = nock('http://server.180.com/');		// 需要替换的请求域名

orderInfo
	.get('/infoObj').reply(200, {
		'article': {
			'title': '动态标题99999999999999'
		}
	})

	//.get('/orderInfo').reply(200, [
	//	{"id":"A01", "name":"北京1", "desc":"app desc11"},
	//	{"id":"A02", "name":"上海2", "desc":"app desc22"},
	//	{"id":"A03", "name":"杭州3", "desc":"app desc33"}
	//])


module.exports = orderInfo;