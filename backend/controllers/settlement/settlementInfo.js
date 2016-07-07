/*
 *结算管理中心 发票中心页面
 *
 * */


var request = require('../../libs/request');
//var apiHost = 'http://server.180.com/';			// 模拟域名
var path = require('path');
var _ = require('lodash');
var api_config = require('../../api/v1/api_config');
var SystemError = require('../../errors/SystemError');

// 处理业务逻辑
exports.settlementInfo = function (req, res, next) {
    var user = req.session.user;
    request({url : api_config.billView+"?userId="+user.id}, function (err, data) {
        if (err || data.statusCode != 200) {
            next(new SystemError());
            return;
        }

        if(data) {
            var source = JSON.parse(data.body);
            var content = {
                pageTitle: "结算管理",
                headerTit: "结算管理",
                subTitle: "查看开票信息",
                data: {
                    receipt:source.data.receipt
                }

            };

            //渲染页面
            //req.flash('imgs', content.data.receipt.templateUrl);           // 读取
            
            return res.render('settlement/settlementInfo', content);
        }
    })

};

