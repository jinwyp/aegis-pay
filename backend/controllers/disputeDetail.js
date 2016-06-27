/*
 * 业务控制 (模板 & 数据请求)
 * */

var request = require('../libs/request');
var _       = require('lodash');
var api_config = require('../api/v1/api_config');
var logger     = require("../libs/logger");

exports.disputeDetail = function (req, res, next) {

    var url = api_config.disputeDetail;
    request({url : url}, function (err, data) {

        if (err) return next(err);

        logger.debug('获取到的错误是----------------------------' + err);
        logger.debug('获取到的结果是data----------------------------' + data.body);

        if (data) {
            var source  = JSON.parse(data.body);
            var content = _.assign({}, {headerTit: "纠纷申请详情",pageTitle: "纠纷申请详情"}, source);
            logger.debug('获取到的结果是content----------------------------' + content);
            //渲染页面,指定模板&数据
            res.render('dispute/disputeDetail', content);
        }

    });

};
exports.disputeCancel = function (req, res, next) {
    var data={
        success:true
    }
    res.send(data);
}

