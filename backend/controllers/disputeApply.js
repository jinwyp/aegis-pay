/*
 * 业务控制 (模板 & 数据请求)
 * */

var request = require('request');
var apiHost = 'http://server.180.com/';			// 模拟域名
var path = require('path');
var _ = require('lodash');
var api_config = require('../api/v1/api_config');


// 处理业务逻辑
exports.disputeApply = function (req, res, next) {
    var userId=req.session.user.id;
    // 暂时写死
    var url = api_config.disputeApply+"?userId=15&orderId=3621";

    var params = {
        userId: req.session.user.id,
        orderId: req.query.orderId
    };

    request(url, params, function (err, data) {

        if (err) return next(err);
        
        var source  = JSON.parse(data.body);
        // _.map(source.order.imgList, function(val, index){
        //     val.id = path.basename(val.path);
        //     val.url = '/files/upload/' + path.basename(val.path);
        // });
        var content={
            userId:userId,
            orderId:"3621",
            headerTit: "纠纷申请页面",
            pageTitle: "纠纷申请页面",
            sellInfo:source.data.sellInfo,
            order:source.data.order

        }
        res.render('dispute/disputeApply', content);

    });
};

exports.disputeApplySubmit = function (req, res, next) {
    var body = req.body;
    var url = api_config.disputeApplySubmit;
    var userId=req.session.user.id;

    var formData = {
        "userId" : userId,
        "orderId": "15",
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