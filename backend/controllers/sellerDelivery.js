/*
 * 业务控制 (模板 & 数据请求)
 * */

var request = require('request');
var api_config = require('../api/v1/api_config');
var logger     = require("../libs/logger");

// 处理业务逻辑
exports.sellerDelivery = function (req, res, next) {

    var url = api_config.confirmDeliverySellerDelivery;
    request({url : url}, function (err, data) {
        if (err) return next(err);

        logger.debug('获取到的错误是----------------------------' + err);
        logger.debug('获取到的结果是data----------------------------' + data.body);

        if (data){
            var source = JSON.parse(data.body);
            var content = {
                headerTit        : "提货确认审核",
                pageTitle        : "提货确认审核",
                "deliveryAmount" : source.deliveryAmount,
                "indexList"      : source.indexList
            };
            logger.debug('获取到的结果是content----------------------------' + content);
            //渲染页面,指定模板&数据
            res.render('confirmDelivery/sellerDelivery', content);
        }

    });

    // 异步调取Java数据
    //request(apiHost + 'listData', function(err, data) {
    //	// 渲染页面,指定模板&数据
    //	res.render('header/header', {listData: JSON.parse(data.body)});			// 指定模板路径 渲染
    //});

};