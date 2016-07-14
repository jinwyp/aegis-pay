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
};

exports.deliveryDetail = function (req, res, next) {
    var params = {
        userId: req.session.user.id,
        orderId: req.query.orderId
    };
    var userId = req.session.user.id;
    var url = api_config.deliveryDetail + "?userId="+params.userId+"&orderId="+params.orderId;

    var qualityZip = '/api/fetchQualityZips?orderId=' + params.orderId;
    var quantityZip = '/api/fetchQuantityZips?orderId=' + params.orderId;

    request(url, params, function (err, data) {

        if (err) return next(err);

        var source = JSON.parse(data.body);
        var statusObj = {
            step     : 4,
            stepList : [
                {
                    stepName : '提交订单',
                    stepDate : source.data.order.createTime
                },
                {
                    stepName : '签订合同',
                    stepDate : source.data.order.signContractTime
                },
                {
                    stepName : '付款',
                    stepDate : source.data.order.paymentTime
                },
                {
                    stepName : '确认提货',
                    stepDate : source.data.order.confirmDeliveryTime
                },
                {
                    stepName : '结算',
                    stepDate : ""
                }
            ]
        };
        var content = {
            headerTit: "提货详情页面",
            pageTitle: "提货详情页面",
            orderId: req.query.orderId,
            sellerId: userId,
            statusObj:statusObj,
            "order": source.data.order,
            "sellInfo": source.data.sellInfo,
            "deliveryAmount": source.data.order.deliveryAmount,
            "indexList": source.data.indexList,
            "qualityZip": qualityZip,
            "quantityZip": quantityZip,
            "qualityList":source.data.qualityList,
            "quantityList":source.data.quantityList,

        };
        content.data = JSON.parse(data.body).data;
        res.render('confirmDelivery/deliveryDetail', content);

    });

};

var zipurl = {};
exports.fetchQualityZips = function(req, res, next){
    (!zipurl.qualityPath) && (zipurl = fetchZips(req));
    console.log('--------zipurl----------------')
    console.log(zipurl)
    res.download(zipurl.qualityPath, 'quality.zip', function(err, data){
        if(err) {return next(err);}
    })
}
exports.fetchQuantityZips = function(req, res, next){
    (!zipurl.quantityPath) && (zipurl = fetchZips(req));
    res.download(zipurl.quantityPath, 'quantity.zip', function(err, data){
        if(err) {return next(err);}
    })
} 