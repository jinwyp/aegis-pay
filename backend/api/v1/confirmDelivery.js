var request    = require('request');
var _          = require('lodash');

var api_config = require('./api_config');
var config     = require('../../config');
var checker    = require('../../libs/datachecker');
var convert    = require('../../libs/convert');
var cache      = require('../../libs/cache');


const uploadPath = config.file_path.root + config.file_path.upload + '/';


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
// 提交按钮
exports.confirmDeliverySubmit = function (req, res, next) {
    var body = req.body;
    var url = api_config.confirmDeliverySubmit;
    var userId=req.session.user.id;

    var formData = {
        "userId" : userId,
        "orderId":req.body.deliveryAmount,
        "version":req.body.version,
        "deliveryAmount":req.body.deliveryAmount,
        "indexList":req.body.indexList,
        "qualityList":req.body.qualityList,
        "quantityList":req.body.quantityList
    };

    _.map(req.body.qualityList, function(val, index){
        val.name = val.file_name;
        val.path = uploadPath + val.file_id;
        _.unset(val, 'file_id');
        _.unset(val, 'file_name');
    })
    _.map(req.body.quantityList, function(val, index){
        val.name = val.file_name;
        val.path = uploadPath + val.file_id;
        _.unset(val, 'file_id');
        _.unset(val, 'file_name');
    })
    console.log('===============confrm========');
    console.log(formData)
    console.log(req.body)
    var formData = _.assign({}, {userId: userId, orderId:'250', version:'1'}, req.body);
    request.post({
        form:formData,
        url : url,
        qsStringifyOptions:{allowDots:true}
        
    }, function (err, data, body) {
        console.log(data)
        if (err) return next(err);

        var resultJson = JSON.parse(body);
        return res.send(resultJson);
    });
};