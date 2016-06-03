var request    = require('request');
var api_config = require('./api_config');
var config     = require('../../config');
var _          = require('lodash');
var request = require('request');
var convert = require('../../common/convert');
var cache = require('../../common/cache');

const uploadPath = config.sysFileDir + '/static/upload/';
exports.test = function (req, res, next) {
	var params = req.query;
	console.log(params.file_id)
	var newids = _.map(params.qualityList, function(id,name){
		return {id: uploadPath + id, name: uploadPath + name}
	});
	var newids1 = _.map(params.quantityList, function(id,name){
		return {id: uploadPath + id, name: uploadPath + name}
	});
	params.qualityList = newids;
	params.quantityList = newids1;

console.log(newids,newids1)
    res.json({'qualityList' : params.qualityList, "quantityList" : params.quantityList})
	//request.post(url, {}, function(err, data){
	//	res.json()
	//})
	req.body.orderId = 100;
	console.log(newids);
	convert.zipFile(newids).then(function(val){
		cache.set('qualityZip_' + req.body.orderId, val);
	}).catch(next);


};
