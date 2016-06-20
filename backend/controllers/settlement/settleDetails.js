


var request = require('request');
//var apiHost = 'http://server.180.com/';			// 模拟域名
var path = require('path');
var _ = require('lodash');
var api_config = require('../../api/v1/api_config');

// 处理业务逻辑
exports.settleDetails = function (req, res, next) {


    request({url : api_config.billCenter}, function (err, data) {
        if (err) return next(err);

        if(data) {
            var source = JSON.parse(data.body);
            var content = {
                pageTitle: "结算管理",
                headerTit: "结算管理",

                //"settleInfo":source.settleInfo

            };
            //渲染页面
            return res.render('settlement/settleDetails', content);
        }
    })

};

