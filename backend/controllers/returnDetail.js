/*
 * 业务控制 (模板 & 数据请求)
 * */

var request = require('../libs/request');
var _       = require('lodash');

var cache      = require('../libs/cache');
var logger     = require("../libs/logger");
var checker    = require('../libs/datachecker');
var api_config = require('../api/v1/api_config');
var config     = require('../config');


var __dirfiles = config.file_path.root;


// 处理业务逻辑
exports.returnDetail = function (req, res, next) {

    checker.orderId(req.query.orderId);

    cache.get('qualityZip_' + req.query.orderId, function(err, zipurl){

        if (err) return next(err);

        var qualityZip = req.protocol + '://' + req.hostname + ':' + config.port + zipurl.replace(__dirfiles+'/static', '/files');
        var quantityZip = req.protocol + '://' + req.hostname + ':' + config.port + zipurl.replace(__dirfiles+'/static', '/files');

        var url = api_config.orderReturn;

        request({url : url}, function (err, data) {
            if (err) return next(err);

            if (data){
                var source = JSON.parse(data.body);
                var content = _.assign({}, {headerTit: "确认提货页面",pageTitle: "确认提货页面",type: "sell", "qualityZip": qualityZip,"quantityZip":quantityZip}, source);
                logger.debug('获取到的结果是content----------------------------' + content);
                //渲染页面,指定模板&数据
                res.render('return/returnDetail', content);
            }
        });
    });


    // 异步调取Java数据
    //request(apiHost + 'listData', function(err, data) {
    //	// 渲染页面,指定模板&数据
    //	res.render('header/header', {listData: JSON.parse(data.body)});			// 指定模板路径 渲染
    //});

};
