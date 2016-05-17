var request = require('request');
var api_config = require('./api_config');
var co = require('co');
var _ = require('lodash');

exports.signCompact = function (req, res, next) {
	//api代理，去请求java接口
	request.post({url:api_config.uploadCompact}, function(error,data){
		return res.send(data.body);
	})
};
