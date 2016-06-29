var request = require('request');
var _       = require('lodash');
var api_config = require('../api/v1/api_config');
var logger     = require("../libs/logger");

exports.disputeSuccess = function (req, res, next) {
    var userId=req.session.user.id;
    var params = {
        sellerId: req.session.user.id,
        orderId: req.query.orderId
    };
    var url = api_config.disputeSuccess+"?sellerId="+params.sellerId+"&orderId="+params.orderId;
    request(url, params, function (err, data) {
        if (err) return next(err);
        var source  = JSON.parse(data.body);
        var content={
            userId:userId,
            orderId:source.data.order.id,
            headerTit: "纠纷处理完成",
            pageTitle: "纠纷处理完成",
            sellInfo:source.data.sellInfo,
            order:source.data.order,
            dispute:source.data.dispute
        };
        res.render('dispute/disputeSuccess', content);

    });
};