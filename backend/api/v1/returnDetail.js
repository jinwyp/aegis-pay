var PromiseB   = require('bluebird');
var request    = require("request");
var requestP   = PromiseB.promisify(require("request"));
var api_config = require('./api_config');
var cache      = require('../../common/cache');
var co         = require('co');
var _          = require('lodash');
var convert = require('../../common/convert');
var config = require('../../config');
var archiver = require('archiver');
var fs =  require('fs');
var path     = require('path');
var __dirfiles = config.sysFileDir;


exports.qualityList = function(req, res, next){

}
exports.quantityList = function(req, res, next){
	convert.zipFile({path:[__dirfiles + '/static/images']}).then(function(val){
		res.redirect('http://localhost:3000' + val.replace(__dirfiles+'/static', '/files'));
	}).catch(next);
}

