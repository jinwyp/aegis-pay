/*
* 数据模拟
* */


var nock = require('nock');
var listData = nock('http://server.180.com/').persist();		// 需要替换的请求域名

listData
	.get('/pageTitle').reply(200, {
		'article': {
			'title': '动态标题'
		}
	})

	.get('/listData').reply(200, [
		{"id":"A01", "name":"北京1", "desc":"app desc91"},
		{"id":"A02", "name":"上海2", "desc":"app desc92"},
		{"id":"A03", "name":"杭州3", "desc":"app desc93"}
	]);


module.exports = listData;