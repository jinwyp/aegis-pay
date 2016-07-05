var request = require('../libs/request');
var api_config = require('../api/v1/api_config');
var logger     = require("../libs/logger");
var cache   = require('../libs/cache');
var checker = require('../libs/datachecker');
var config = require('../config');
var utils = require('../libs/utils');
var _ = require('lodash');

var pdfpath = config.file_path.root + config.file_path.pdf;
var imagespath = config.file_path.root + config.file_path.images;

// fetch compact
exports.compact = function (req, res, next) {
    request({url: api_config.checkOrderStatus + '?orderId=' + req.query.orderId + '&userId=' + req.session.user.id}, function(err, data){
        if(err) {return next(err); }
        var result = JSON.parse(data.body);
        if(result.data && (result.data.status === 'WaitSignContract')){
            var pageData = {
                pageTitle : '签订电子合同',
                orderId : req.query.orderId,
                headerTit : '签订电子合同',
                version: '',
                imgs : []
            };
            return res.render('compact/compact', pageData);
        }else{
            var errMsg = '当前订单不处于签订合同状态！';
            var er = new Error(errMsg);
            _.assign(er, {'customCode': 409, 'customMsg': errMsg, 'customType': 'service-request'});
            return next(er);
        }
    })
};


exports.compactDetail = function (req, res, next) {
    request.post({url:api_config.getCompact,form:{orderId:req.query.orderId,userId:req.session.user.id}}, function (err, data) {
        if (err) return next(err);
        if (data) {
            var source = JSON.parse(data.body);
            if(source.success) {
                var content = {
                    headerTit : '合同详情',
                    pageTitle : '合同详情',
                    "data" : source.data.contract
                };
                //渲染页面
                return res.render('compact/compactDetail', content);
            }else{
                res.send(source.data.error);
            }
        }
    });
};

exports.downloadContract = function (req, res, next) {
    var orderId=req.query.orderId;
    res.send("正在处理合同逻辑中。。。");
    //res.send(config.file_path.root+config.file_path.pdf,"compact-"+orderId+".pdf",function(err){
    //    if(err){
    //        next(err);
    //    }else{
    //
    //    }
    //});
};
