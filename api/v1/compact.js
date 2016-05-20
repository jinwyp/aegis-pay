var request = require('request');
var api_config = require('./api_config');
var co = require('co');
var _ = require('lodash');
var fs = require('fs');
var formidable = require('formidable');
var uuid = require('node-uuid');

const uploadPath = '/Users/beatacao/work/aegis-pay/static/upload/';

exports.uploadFile = function (req, res, next) {
	//api代理，去请求java接口
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		if(err) return next(err);
		var extName = /\.[^\.]+/.exec(files.files.name);
		var ext = Array.isArray(extName)
				? extName[0]
				: '';
		var newFile = uuid() + ext;
		var newPath = uploadPath + newFile;
		fs.rename(files.files.path, newPath, function(err){
			if (err) return next(err);
			res.send({'success':true, 'attach':[{'filename':files.files.name, 'id':newFile}]})
		})

  });
};

// del file
exports.delFile = function (req, res, next) {
	//api代理，去请求java接口
	// request.post(api_config.delFile, {id: req.body.id},function(error,data){
	// 	return res.send(JSON.parse(data.body));
	// })
	fs.unlink(uploadPath + req.body.id, function(err){
		res.send({"success":true});
	})
};

// sign compact
exports.signCompact = function(req, res, next){
	var params = req.body;
	var newids = _.map(params.id, function(id){
		return uploadPath + id;
	})
	params.id = newids;

	request.post(api_config.signCompact, params, function(err, data){
		if(!err && data){
			return res.send(JSON.parse(data.body));
		}
	})
}
