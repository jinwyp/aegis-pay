var nock = require('nock');
var API = require('../api/v1/api_config');

var site = nock(API.host);

site
.get('/test').reply(200, {"just":{"for":"test"}})
.get('/apps').reply(200, [
	{"id":1, "name":"app1", "desc":"app desc"},
	{"id":2, "name":"app2", "desc":"app desc"},
	{"id":3, "name":"app3", "desc":"app desc"}
])
.get('/apps2').reply(200, [
	{"id":1, "name":"北京", "desc":"app desc"},
	{"id":2, "name":"上海", "desc":"app desc"},
	{"id":3, "name":"杭州", "desc":"app desc"}
])
.get('/products').reply(200, [
	{"category": 'Sporting Goods', "price": '$49.99', "stocked": true, "name": 'Football'},
	{"category": 'Sporting Goods', "price": '$9.99', "stocked": true, "name": 'Baseball'},
	{"category": 'Sporting Goods', "price": '$29.99', "stocked": false, "name": 'Basketball'},
	{"category": 'Electronics', "price": '$99.99', "stocked": true, "name": 'iPod Touch'},
	{"category": 'Electronics', "price": '$399.99', "stocked": false, "name": 'iPhone 5'},
	{"category": 'Electronics', "price": '$199.99', "stocked": true, "name": 'Nexus 7'}
])

module.exports = site; 