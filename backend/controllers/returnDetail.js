/*
 * 业务控制 (模板 & 数据请求)
 * */

var request = require('request');
var _       = require('lodash');

var cache      = require('../libs/cache');
var logger     = require("../libs/logger");
var checker    = require('../libs/datachecker');
var api_config = require('../api/v1/api_config');
var config     = require('../config');


var __dirfiles = config.file_path.root;


// 处理业务逻辑
exports.returnDetail = function (req, res, next) {

    // checker.orderId(req.query.orderId);

    cache.get('qualityZip_' + req.query.orderId, function (err, zipurl) {
        // /Users/gaoleo/Downloads/Project/aegis-all/aegis-pay/files/static/zips/outDate.zip
        var userId = req.session.user.id;
        // 暂时写死
        var url = api_config.orderReturn + "?sellerId=15&orderId=3632";
        var qualityZip = zipurl.replace(__dirfiles, '/files');
        var quantityZip = zipurl.replace(__dirfiles, '/files');
        
        var params = {
            userId: req.session.user.id,
            sellerId: req.query.orderId
        };

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
                "quantityList":source.data.qualityList,
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

    console.log("11111111212312312312312312312312321312312312312")
    // var formData = {
    //     "sellerId" : userId,
    //     "orderId" : res.body.orderId
    //
    // };
    console.log(111+"~~~~~~~~~~~~~~~~~~~~~~")
    request.post({
        form: req.body,
        url : url
    }, function (err, data, body) {
        if (err) return next(err);
        console.log("@222222222222222222222")
        var resultJson = JSON.parse(body);
        return res.send(resultJson);
    });
};