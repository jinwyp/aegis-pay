var request = require('request');
var api_config = require('./api_config');
var co = require('co');
var _ = require('lodash');
var fs = require('fs');
var formidable = require('formidable');

exports.uploadFile = function (req, res, next) {
	//api代理，去请求java接口
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		var params = {'path':files.files.path};
		request.post({url:api_config.uploadFile}, function(error,data){
			return res.send(data.body);
		})
  });
};

// del file
exports.delFile = function (req, res, next) {
	//api代理，去请求java接口
	request.post({url:api_config.delFile}, function(error,data){
		return res.send(JSON.parse(data.body));
	})
};

// sign compact
exports.signCompact = function(req, res, next){
	var params = req.body;
	request.post(api_config.signCompact, params, function(err, data){
		if(!err && data){
			return res.send(JSON.parse(data.body));
		}
	})
}
