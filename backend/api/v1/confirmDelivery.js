var request    = require('../../libs/request');
// var requestdebug = require('request-debug');
var _          = require('lodash');

var api_config = require('./api_config');
var config     = require('../../config');
var checker    = require('../../libs/datachecker');
var convert    = require('../../libs/convert');
var cache      = require('../../libs/cache');
var logger     = require('../../libs/logger');
var path       = require('path');

var co = require('co');

const conPath=(config.file_path.root + config.file_path.compact).substr(4);
const uploadPath = conPath + '/';
const appUploadPath = config.file_path.root + config.file_path.compact + '/';
const zipsPath = config.file_path.root + config.file_path.zips + '/';

// 提交按钮
exports.confirmDeliverySubmit = function (req, res, next) {
    var body = req.body;
    var url = api_config.confirmDeliverySubmit;
    var userId=req.session.user.id;

    var formData = {
        "userId" : userId,
        "orderId":req.body.orderId,
        "version":req.body.version,
        "deliveryAmount":req.body.deliveryAmount,
        "indexList":req.body.indexList,
        "qualityList":req.body.qualityList,
        "quantityList":req.body.quantityList
    };

    _.map(req.body.qualityList, function(val, index){
        val.name = val.file_name;
        val.path = uploadPath + val.file_id;
        console.log("smmmmmmmm1~~~~~~~~~~~~~~~~~")
        console.log(val.path)
        console.log(val.file_id)
        _.unset(val, 'file_id');
        _.unset(val, 'file_name');

    })
    _.map(req.body.quantityList, function(val, index){
        val.name = val.file_name;
        val.path = uploadPath + val.file_id;
        _.unset(val, 'file_id');
        _.unset(val, 'file_name');
    })
    
    request.post({
        form:formData,
        url : url,
        qsStringifyOptions:{allowDots:true}
        
    }, function (err, data, body) {
        if (err) return next(err);

        var resultJson = JSON.parse(body);
        if(resultJson.success){
            zipFile(req, res, next);
        }
        return res.send(resultJson);
    });
};
var zipFile = exports.zipFile = function (req, res, next) {
   return new Promise(function(resolve, reject){
        var params   = req.body;
        var qualityPathArray = [];
        var quantityPathArray = [];
        var output = zipsPath + req.session.user.id + '/' + req.body.orderId + '/';
        var qualityZipName = 'confirmDelivery:quality_'+ req.session.user.id + '_' + req.body.orderId + '.zip';
        var quantityZipName = 'confirmDelivery:quantity_'+ req.session.user.id + '_' + req.body.orderId + '.zip';
    
        _.each(params.qualityList, function (value, index) {
            qualityPathArray.push(appUploadPath + path.basename(value.path)); // 需要压缩文件的绝对路径数组
        });

        _.each(params.quantityList, function (value, index) {
            quantityPathArray.push(appUploadPath  + path.basename(value.path)); // 需要压缩文件的绝对路径数组
        });
       var zips = [
           convert.zipFile({path : qualityPathArray, output:output, zipname: qualityZipName}),
           convert.zipFile({path : quantityPathArray, output:output, zipname: quantityZipName})
       ];



       Promise.all(zips).then(function(result){
           logger.info('-------------zipFile success---------------------')
       }).catch(next);

   })

};
