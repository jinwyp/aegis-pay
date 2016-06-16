

var path       = require('path');
var _          = require('lodash');
var request    = require('request');

var api_config = require('../../api/v1/api_config');
var logger = require("../../libs/logger");

// 处理业务逻辑
exports.bindingBankAccount = function (req, res, next) {

    // 订单状态 数据模拟
    var statusObj = {
        step     : 1,
        total    : 4,
        stepList : [
            {
                stepName : '填写账户信息',
                stepDate : ''
            },
            {
                stepName : '银行汇款',
                stepDate : ''
            },
            {
                stepName : '确认银行汇款',
                stepDate : ''
            },
            {
                stepName : '添加成功',
                stepDate : ''
            }
        ]
    };

    // 静态数据
    var url = api_config.bindingBankAccount;
    request({url : url}, function (err, data) {

        if (err) return next(err);

        logger.debug('获取到的错误是----------------------------' + err);
        logger.debug('获取到的结果是data----------------------------' + data.body);

        if (data){

            var source  = JSON.parse(data.body);
            var content = {
                pageTitle   : "绑定银行账户",
                statusObj   : statusObj
            };
            logger.debug('获取到的结果是content----------------------------' + content);

            //渲染页面,指定模板&数据
            res.render('wealth/bindingBankAccount', content);
        }

    });

    // 异步调取Java数据
    //request(apiHost + 'listData', function(err, data) {
    //	// 渲染页面,指定模板&数据
    //	res.render('header/header', {listData: JSON.parse(data.body)});			// 指定模板路径 渲染
    //});

};