/*
 * 业务控制 (模板 & 数据请求)
 * */

var path       = require('path');
var _          = require('lodash');
var request    = require('../libs/request');

var api_config = require('../api/v1/api_config');
var logger = require("../libs/logger");

// 处理业务逻辑
exports.confirmComplete = function (req, res, next) {

    // 订单状态 数据模拟
    var statusObj = {
        step     : 4,        // 第几步
        stepList : [
            {
                stepName : '提交订单',
                stepDate : '2016-05-11 01:02:36'
            },
            {
                stepName : '签订合同',
                stepDate : '2016-05-12 01:02:36'
            },
            {
                stepName : '付款',
                stepDate : '2016-05-13 01:02:36'
            },
            {
                stepName : '确认提货',
                stepDate : '2016-05-14 01:02:36'
            },
            {
                stepName : '结算',
                stepDate : '2016-05-15 01:02:36'
            }
        ]
    };
    
    var url = api_config.confirmDeliveryConfirmComplete+"orderId=3632&userId=15";
    request({url : url}, function (err, data) {

        if (err) return next(err);

        logger.debug('获取到的错误是----------------------------' + err);
        logger.debug('获取到的结果是data----------------------------' + data.body);

        if (data){
            var source  = JSON.parse(data.body);
            var content = {
                headerTit   : "确认完成页面",
                pageTitle   : "确认完成页面",
                type        : "sell",
                statusObj   : statusObj,
                "sellInfo"  : source.data.sellInfo,
                "order"     : source.data.order,
                "indexList" : source.indexList,
                "deliveryAmount" : source.data.deliveryAmount,
                "indexDataList" : source.data.indexDataList,
                "qualityList" : source.data.qualityList,
                "quantityList" : source.data.quantityList
            };

            _.map(content.qualityList, function(val, index){
                val.file_id = path.basename(val.path);
            });
            _.map(content.quantityList, function(val, index){
                val.file_id = path.basename(val.path);
            });

            logger.debug('获取到的结果是content----------------------------' + content);
            //渲染页面,指定模板&数据
            res.render('confirmDelivery/confirmComplete', content);
        }

    });
};
