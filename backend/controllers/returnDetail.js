/*
 * 业务控制 (模板 & 数据请求)
 * */

var request = require('../libs/request');
var _       = require('lodash');

var cache      = require('../libs/cache');
var logger     = require("../libs/logger");
var checker    = require('../libs/datachecker');
var api_config = require('../api/v1/api_config');
var config     = require('../config');
var utils = require('../libs/utils');
var BusinessError = require('../errors/BusinessError');
var path = require('path');


var __download = config.file_path.root + config.file_path.download;
var zipsPath = config.file_path.root + config.file_path.zips + '/';

var fetchZips = function(req){
    var zipurlPath = zipsPath + req.session.user.id + '/' + req.query.orderId + '/';
    var qualityZipName = 'confirmDelivery_quality_'+ req.session.user.id + '_' + req.query.orderId + '.zip';
    var quantityZipName = 'confirmDelivery_' +
        'quantity_'+ req.session.user.id + '_' + req.query.orderId + '.zip';
    var zipurl = {
        qualityPath:  zipurlPath + qualityZipName,
        quantityPath: zipurlPath + quantityZipName
    }
    return zipurl;
}

// 处理业务逻辑
exports.returnSeller = function (req, res, next) {

    // checker.orderId(req.query.orderId);
    var params = {
        sellerId: req.session.user.id,
        orderId: req.query.orderId
    };

    var userId = req.session.user.id;
    var url = api_config.orderReturnSeller + "?sellerId="+params.sellerId+"&orderId="+params.orderId;

    var qualityZip = '/api/fetchQuality?orderId=' + params.orderId;
    var quantityZip = '/api/fetchQuantity?orderId=' + params.orderId;

    request(url, params, function (err, data) {

        if (err) return next(err);

        var source = JSON.parse(data.body);
        var content = {
            headerTit: "确认退回页面",
            pageTitle: "确认退回页面",
            orderId: req.query.orderId,
            sellerId: userId,
            type: "buy",
            "order": source.data.order,
            "sellInfo": source.data.sellInfo,
            "deliveryAmount": source.data.order.deliveryAmount,
            "indexList": source.data.indexList,
            "qualityZip": qualityZip,
            "quantityZip": quantityZip,
            "qualityList":source.data.qualityList,
            "quantityList":source.data.quantityList,
            userType: 'buy'

        };
        content.data = JSON.parse(data.body).data;
        res.render('return/returnDetail', content);

    });

};
exports.returnBuyer = function (req, res, next) {
    var params = {
        userId: req.session.user.id,
        orderId: req.query.orderId
    };
    var userId = req.session.user.id;
    var url = api_config.orderReturnBuyer + "?userId="+params.userId+"&orderId="+params.orderId;

    var qualityZip = '/api/fetchQualityZips?orderId=' + params.orderId;
    var quantityZip = '/api/fetchQuantityZips?orderId=' + params.orderId;

    request(url, params, function (err, data) {

        if (err) return next(err);

        var source = JSON.parse(data.body);
        var content = {
            headerTit: "提货退回页面",
            pageTitle: "提货退回页面",
            orderId: req.query.orderId,
            sellerId: userId,
            type: "buy",
            "order": source.data.order,
            "sellInfo": source.data.sellInfo,
            "deliveryAmount": source.data.order.deliveryAmount,
            "indexList": source.data.indexList,
            "qualityZip": qualityZip,
            "quantityZip": quantityZip,
            "qualityList":source.data.qualityList,
            "quantityList":source.data.quantityList,
            userType: 'buy'

        };
        content.data = JSON.parse(data.body).data;
        res.render('return/returnDetail', content);

    });

};
exports.returnDetailSubmit = function (req, res, next) {
    var body = req.body;
    var url = api_config.returnDetailSubmit;
    var userId=req.session.user.id;
    
    request.post({
        form: req.body,
        url : url
    }, function (err, data, body) {
        if (err) return next(err);
        var resultJson = JSON.parse(body);
        return res.send(resultJson);
    });
};

var zipurl = {};
exports.fetchQualityZips = function(req, res, next){
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Expires', "Thu, 01 Jan 1970 00:00:01 GMT");
    res.setHeader('Pragma', 'no-cache');
    res.setHeader("Pragma", "private");
    (!zipurl.qualityPath) && (zipurl = fetchZips(req));
    if(!utils.isFileExistsSync(zipurl.qualityPath)){
        return next(new BusinessError(409, '文件正在生成中...'));
    }
    res.download(zipurl.qualityPath, 'quality.zip', function(err, data){
        if(err) {return next(err);}
    })
}
exports.fetchQuantityZips = function(req, res, next){
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Expires', "Thu, 01 Jan 1970 00:00:01 GMT");
    res.setHeader('Pragma', 'no-cache');
    res.setHeader("Pragma", "private");
    (!zipurl.quantityPath) && (zipurl = fetchZips(req));
    if(!utils.isFileExistsSync(zipurl.quantityPath)){
        return next(new BusinessError(409, '文件正在生成中...'));
    }
    res.download(zipurl.quantityPath, 'quantity.zip', function(err, data){
        if(err) {return next(err);}
    })
} 