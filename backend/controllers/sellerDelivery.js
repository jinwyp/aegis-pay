/*
 * 业务控制 (模板 & 数据请求)
 * */

var request = require('../libs/request');
var api_config = require('../api/v1/api_config');
var cache      = require('../libs/cache');
var config     = require('../config');
var logger     = require("../libs/logger");

// 处理业务逻辑
exports.sellerDelivery = function (req, res, next) {
    var sellerId = req.session.user.id;
    var url = api_config.confirmDeliverySellerDelivery + "?sellerId="+sellerId+"&orderId="+req.query.orderId;

    var qualityZip = '/api/fetchQuality?orderId=' + req.query.orderId;
    var quantityZip = '/api/fetchQuantity?orderId=' + req.query.orderId;
    
    request.get({
        url: url,
        userId: sellerId,
        orderId: req.query.orderId
    }, function (err, data) {
        if (err) return next(err);
        if (data) {
            var source = JSON.parse(data.body);
            var statusObj = {
                step: 4,
                stepList: [
                    {
                        stepName: '提交订单',
                        stepDate: source.data.order.createTime
                    },
                    {
                        stepName: '签订合同',
                        stepDate: source.data.order.signContractTime
                    },
                    {
                        stepName: '付款',
                        stepDate: source.data.order.paymentTime
                    },
                    {
                        stepName: '确认提货',
                        stepDate: ""
                    },
                    {
                        stepName: '结算',
                        stepDate: ""
                    }
                ]
            };
            var content = {
                sellerId: sellerId,
                orderId: req.query.orderId,
                headerTit: "确认提货页面",
                pageTitle: "确认提货页面",
                statusObj: statusObj,
                "sellInfo": source.data.sellInfo,
                "order": source.data.order,
                "indexList": source.data.indexList,
                "deliveryAmount": source.data.order.deliveryAmount,
                "indexDataList": source.data.indexDataList,
                "qualityZip": qualityZip,
                "quantityZip": quantityZip,
                "qualityList": source.data.qualityList,
                "quantityList": source.data.qualityList
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