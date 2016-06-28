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


var __download = config.file_path.download;


// 处理业务逻辑
exports.returnDetail = function (req, res, next) {

    // checker.orderId(req.query.orderId);

    cache.get('qZips_' + req.query.orderId, function (err, zipurl) {
        var params = {
            sellerId: req.session.user.id,
            orderId: req.query.orderId
        };
        var userId = req.session.user.id;
        var url = api_config.orderReturn + "?sellerId="+params.sellerId+"&orderId="+params.orderId;

        var qualityZip = zipurl.qualityPath.replace(__download, '/download');
        var quantityZip = zipurl.quantityPath.replace(__download, '/download');

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