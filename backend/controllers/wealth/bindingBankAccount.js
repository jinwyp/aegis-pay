

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
        if (data){
            var source  = JSON.parse(data.body);
            var content=_.assign({}, {pageTitle: "绑定银行账户",statusObj: statusObj}, source);
            res.render('wealth/bindingBankAccount', content);
        }
    });
};

exports.verifyCode = function (req, res, next) {
    var data={
        success:true
    }
    res.send(data);
};







exports.bindingSuccess = function (req, res, next) {

    // 订单状态 数据模拟
    var statusObj = {
        step     : 2,
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


    var url = api_config.bindingSuccess;
    var userId=req.session.user.id
    request({url : url}, function (err, data) {

        if (err) return next(err);
        if (data){
            var source  = JSON.parse(data.body);
            var content=_.assign({}, {pageTitle: "绑定银行账户",statusObj: statusObj,userId:userId}, source);
            res.render('wealth/bindingSuccess', content);
        }
    });


};
// 汇款金额校验
exports.remittance = function (req, res, next) {
    var data={
        success:true,
        errorCode:'1008'
    }
    res.send(data);
};