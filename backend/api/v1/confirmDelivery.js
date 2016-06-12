var request    = require('request');
var _          = require('lodash');

var api_config = require('./api_config');
var config     = require('../../config');
var checker    = require('../../common/datachecker');
var convert    = require('../../common/convert');
var cache      = require('../../common/cache');


const uploadPath = config.sysFileDir + '/static/upload/';


exports.confirmDeliveryIndex = function (req, res, next) {
    checker.orderId(req.body.orderId);
    checker.deliveryAmount(req.body.deliveryAmount);
    var params   = req.body;

    var qualityArray = [];
    var qualityPathArray = [];

    _.each(params.qualityList, function (value, index) {
        qualityArray.push({id : uploadPath + index, name : uploadPath + value});
        qualityPathArray.push(uploadPath + value); // 需要压缩文件的绝对路径数组
    });

    var quantityArray = [];
    var quantityPathArray = [];

    _.each(params.quantityList, function (value, index) {
        quantityArray.push({id : uploadPath + index, name : uploadPath + value});
        quantityPathArray.push(uploadPath + value); // 需要压缩文件的绝对路径数组
    });


    convert.zipFile({path : qualityPathArray}).then(function (val) {
        cache.set('qualityZip_' + req.body.orderId, val);
    }).catch(next);

    convert.zipFile({path : quantityPathArray}).then(function (val) {
        cache.set('quantityZip_' + req.body.orderId, val);
    }).catch(next);


    res.json({
        'qualityList' : qualityArray,
        "quantityList" : quantityArray
    });


    //request.post(url, {}, function(err, data){
    //	res.json()
    //})
};
