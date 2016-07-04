/*
 * 业务控制 (模板 & 数据请求)
 * */

var request = require('../libs/request');

var api_config = require('../api/v1/api_config');
var logger     = require("../libs/logger");

exports.disputeComplete = function (req, res, next) {

    var sellerId=req.session.user.id;
    var params = {
        userId: req.session.user.id,
        orderId: req.query.orderId
    };
    var url=api_config.disputeComplete+"?userId="+params.userId+"&orderId="+params.orderId;
    request(url, params, function (err, data) {

        if (err) return next(err);

        var source  = JSON.parse(data.body);
        var content={
            userId:sellerId,
            orderId:source.data.order.id,
            headerTit: "纠纷申请页面",
            pageTitle: "纠纷申请页面",
            order:source.data.order,
            files:source.data.files
        }
        res.render('dispute/disputeComplete', content);

    });

};

