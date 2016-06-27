/*
 * 业务控制 (模板 & 数据请求)
 * */

var request = require('request');
var api_config = require('../api/v1/api_config');
var cache      = require('../libs/cache');
var config     = require('../config');
var logger     = require("../libs/logger");

var zipFilePath = config.file_path.root;

// 处理业务逻辑
exports.sellerDelivery = function (req, res, next) {

    // cache.get('qualityZip_' + req.query.orderId, function(err, zipurl) {
    //     var url = api_config.confirmDeliverySellerDelivery;
    //     request({url: url}, function (err, data) {
    //         if (err) return next(err);
    //         var qualityZip = req.protocol + '://' + req.hostname + ':' + config.port + zipurl.replace(zipFilePath + '/static', '/files');
    //         var quantityZip = req.protocol + '://' + req.hostname + ':' + config.port + zipurl.replace(zipFilePath + '/static', '/files');
    //         logger.debug('获取到的错误是----------------------------' + err);
    //         logger.debug('获取到的结果是data----------------------------' + data.body);
    //
    //         if (data) {
    //             var source = JSON.parse(data.body);
    //             var content={
    //                 sellerId:'15',
    //                 orderId:'3632',
    //                 headerTit   : "提货确认审核",
    //                 pageTitle   : "提货确认审核",
    //                 statusObj: statusObj,
    //                 "sellInfo"  : source.data.sellInfo,
    //                 "order"     :  source.data.order,
    //                 "indexList" :  source.data.indexList,
    //                 "deliveryAmount" :  source.data.deliveryAmount,
    //                 "indexDataList" :  source.data.indexDataList,
    //                 "qualityList" :  source.data.qualityList,
    //                 "quantityList" :  source.data.quantityList
    //             }
    //             logger.debug('获取到的结果是content----------------------------' + content);
    //             //渲染页面,指定模板&数据
    //             res.render('confirmDelivery/sellerDelivery', content);
    //         }
    //
    //     });
    // });

    // 异步调取Java数据
    //request(apiHost + 'listData', function(err, data) {
    //	// 渲染页面,指定模板&数据
    //	res.render('header/header', {listData: JSON.parse(data.body)});			// 指定模板路径 渲染
    //});




    var url = api_config.confirmDeliverySellerDelivery+"?sellerId=15&orderId=3632";
    var sellerId=req.session.user.id;
    request.get({
        url : url,
        userId:'15',
        orderId:'3632'
    }, function (err, data) {
        if (err) return next(err);
        if (data){
            var source  = JSON.parse(data.body);
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
                        stepDate : ""
                    },
                    {
                        stepName : '结算',
                        stepDate : ""
                    }
                ]
            };
            var content={
                sellerId:'15',
                orderId:'3632',
                headerTit   : "确认提货页面",
                pageTitle   : "确认提货页面",
                statusObj: statusObj,
                "sellInfo"  : source.data.sellInfo,
                "order"     :  source.data.order,
                "indexList" :  source.data.indexList,
                "deliveryAmount" :  source.data.order.deliveryAmount,
                "indexDataList" :  source.data.indexDataList,
                "qualityList" :  source.data.qualityList,
                "quantityList" :  source.data.quantityList
            }
            res.render('confirmDelivery/sellerDelivery', content);
        }
    });

};
// 退回原因

exports.reasonSubmit = function (req, res, next) {
    var body = req.body;
    var url = api_config.sellerDeliveryReasonSubmit;
    var sellerId=req.session.user.id;

    var formData = {
        "orderId" : req.body.orderId,
        "sellerId": req.body.sellerId,
        "version" : req.body.version,
        "returnReason" : req.body.returnReason
    };
    request.post({
        form:formData,
        url : url
    }, function (err, data, body) {
        if (err) return next(err);

        var resultJson = JSON.parse(body);
        return res.send(resultJson);
    });
};