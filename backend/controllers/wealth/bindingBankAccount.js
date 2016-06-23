

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

    var url = api_config.bindingBankAccount+"?userId=15";
    var userId=req.session.user.id;
    request.get({
        url : url,
        userId:15
    }, function (err, data) {
        if (err) return next(err);
        if (data){
            var source  = JSON.parse(data.body);
            var content={
                userId:userId,
                pageTitle: "绑定银行账户",
                statusObj: statusObj,
                companyName:source.data.companyName,
                payPhone:source.data.payPhone,
                bankList:source.data.bankList,
                provinceList:source.data.provinceList
            }
            res.render('wealth/bindingBankAccount', content);
        }
    });
};
// 验证码
exports.verifyCode = function (req, res, next) {
    var data={
        success:true
    }
    res.send(data);
};

exports.cityList = function (req, res, next) {
    var province = req.query.province;

    var url = api_config.bindingBankAccountCityList+"/" + province;
    
    request.get({
        url : url
    }, function (err, data) {
        if (err) return next(err);
        if (data){
            var source  = JSON.parse(data.body);
            res.send({
                cityList:source
            });
        }
    });

};

exports.childBankName = function (req, res, next) {
    var cityCode = req.query.cityCode,
        bankCode = req.query.bankCode,
        childBankName = req.body.childBankName;
     var url = api_config.bindingBankAccountChildBankName+"/" + cityCode+"/"+bankCode;

    request.get({
        qs:{
            childBankName:childBankName
        },
        url : url
    }, function (err, data) {
        if (err) return next(err);
        if (data){
            var source  = JSON.parse(data.body);
            res.send({
                childBankName:source
            });
        }
    });

};

// 提交按钮
exports.bindingBankAccountSubmit = function (req, res, next) {
    var body = req.body;
    var url = api_config.bindingBankAccountSubmit;
    var userId=req.session.user.id;

    var formData = {
        "userId" : userId,
        "childBankCode" :req.body.childBankCode,
        "bankAccount" : req.body.bankAccount
    };
    request.post({
        form:formData,
        url : url
    }, function (err, data, body) {
        if (err) return next(err);

        var resultJson = JSON.parse(body);
        if (resultJson.success){
            return res.send(resultJson);
        }else{
            return res.send(resultJson);
        }
    });
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
    request({url : url+"?userId="+userId}, function (err, data) {

        if (err) return next(err);
        if (data){
            var source  = JSON.parse(data.body);
            var content={
                userId:userId,
                pageTitle: "绑定银行账户",
                statusObj: statusObj,
                userAccount:source.data.userAccount
            };
            res.render('wealth/bindingSuccess', content);
        }
    });


};
// 汇款金额校验
exports.remittance = function (req, res, next) {
    var body = req.body;
    var url = api_config.remittance;
    var userId=req.session.user.id;

    var formData = {
        userId:userId,
        confirmMoney:req.body.confirmMoney
    };
    request.post({
        form:formData,
        url : url
    }, function (err, data, body) {
        if (err) return next(err);
        var resultJson = JSON.parse(body);
        console.log(body+"???????????????????")
        return res.send(resultJson);
    });
};