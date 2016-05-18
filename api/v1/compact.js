var request = require('request');
var api_config = require('./api_config');
var co = require('co');
var _ = require('lodash');

exports.uploadCompact = function (req, res, next) {
	//api代理，去请求java接口
	request.post({url:api_config.uploadCompact}, function(error,data){
		return res.send(data.body);
	})
};

// sign compact
exports.signCompact = function(req, res, next){
	var params = req.body;
	request.post(api_config.signCompact, params, function(err, data){
		console.log(err)
		console.log(data)
		if(!err && data){
			return res.send(JSON.parse(data.body));
		}
	})
}
