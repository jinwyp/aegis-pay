/*
 *财富管理中心 页面
 *
 * */


var request = require('request');
//var apiHost = 'http://server.180.com/';			// 模拟域名
//var path = require('path');
//var _ = require('lodash');


// 处理业务逻辑
exports.wealthCenter = function (req, res, next) {

    var content = {
        pageTitle   : "账户管理中心",
        headerTit   : "账户管理中心"

    };
        //渲染页面
        res.render('wealth/wealthCenter',content);
    };

