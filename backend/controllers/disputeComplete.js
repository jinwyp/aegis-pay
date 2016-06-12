/*
 * 业务控制 (模板 & 数据请求)
 * */

var request    = require('request');

var api_config = require('../api/v1/api_config');
var logger = require("../libs/logger");

exports.disputeComplete = function (req, res, next) {
    
    var url = api_config.disputeComplete;
    request({url : url}, function (err, data) {

        if (err) return next(err);

        logger.debug('获取到的错误是----------------------------' + err);
        logger.debug('获取到的结果是data----------------------------' + data.body);

        if (data){
            var source  = JSON.parse(data.body);
            var content = {
                headerTit   : "纠纷申请完成",
                pageTitle   : "纠纷申请完成"
            };
            logger.debug('获取到的结果是content----------------------------' + content);
            //渲染页面,指定模板&数据
            res.render('dispute/disputeComplete', content);
        }

    });

};

