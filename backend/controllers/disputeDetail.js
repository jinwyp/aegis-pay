/*
 * 业务控制 (模板 & 数据请求)
 * */

var request = require('../libs/request');
var _       = require('lodash');
var api_config = require('../api/v1/api_config');
var logger     = require("../libs/logger");

exports.disputeDetail = function (req, res, next) {
    var userId=req.session.user.id;
    var params = {
        userId: req.session.user.id,
        orderId: req.query.orderId
    };
    var url = api_config.disputeDetail+"?userId="+params.userId+"&orderId="+params.orderId;
    request(url, params, function (err, data) {
        if (err) return next(err);
        var source  = JSON.parse(data.body);
        var content={
            userId:userId,
            orderId:source.data.order.id,
            headerTit: "纠纷申请详情",
            pageTitle: "纠纷申请详情",
            sellInfo:source.data.sellInfo,
            order:source.data.order
        };
        res.render('dispute/disputeDetail', content);

    });
};
exports.disputeCancel = function (req, res, next) {
    var body = req.body;
    var url = api_config.disputeCancel;
    var userId=req.session.user.id;

    var formData = {
        "userId" : userId,
        "orderId": req.body.orderId,
        "version" : req.body.version,
        deliveryGoods:req.body.deliveryGoods,
        returnGoods:req.body.returnGoods,
        disputeRemarks:req.body.disputeRemarks,
        imgList:req.body.imgList
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
