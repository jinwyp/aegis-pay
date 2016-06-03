/*
 * 业务控制 (模板 & 数据请求)
 * */

var request = require('request');
var apiHost = 'http://server.180.com/';			// 模拟域名
var config     = require('../config');
var cache = require('../common/cache');
var __dirfiles = config.sysFileDir;
var _ = require('lodash');

// 处理业务逻辑
exports.returnDetail = function (req, res, next) {

    // 静态数据
    //res.render('confirmDelivery/confirmDelivery',{"headerTit":"确认下单",statusObj: statusObj});			// 指定模板路径 渲染
    req.query.orderId = 100;
    cache.get('qualityZip_' + req.query.orderId, function(err, zipurl){
        var qualityZip = req.protocol + '://' + req.host + ':' + config.port + zipurl.replace(__dirfiles+'/static', '/files');

        request({url : 'http://localhost:8800/return'}, function (err, data) {
            console.log('获取到的错误是----------------------------' + err);
            console.log('获取到的结果是data----------------------------' + data.body);
            var source = JSON.parse(data.body);
            //var content = {
            //    headerTit        : "确认提货页面",
            //    pageTitle        : "确认提货页面",
            //    type             : "sell",
            //    "deliveryAmount" : source.deliveryAmount,
            //    "sellInfo"       : source.sellInfo,
            //    "order"          : source.order,
            //    "orderId"          :source.orderId,
            //    "indexList"      : source.indexList,
            //    "qualityZip": zipurl
            //};
            var content = _.assign({}, {headerTit: "确认提货页面",pageTitle: "确认提货页面",type: "sell", "qualityZip": qualityZip}, source);
            console.log('获取到的结果是content----------------------------' + content);
            //渲染页面,指定模板&数据
            res.render('return/returnDetail', content);
        });
    })

    // 异步调取Java数据
    //request(apiHost + 'listData', function(err, data) {
    //	// 渲染页面,指定模板&数据
    //	res.render('header/header', {listData: JSON.parse(data.body)});			// 指定模板路径 渲染
    //});

};

exports.test = function (req, res, next) {
    res.send('success');
}
