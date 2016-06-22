


var request = require('request');
//var apiHost = 'http://server.180.com/';			// 模拟域名
var path = require('path');
var _ = require('lodash');
var api_config = require('../../api/v1/api_config');
var convert = require('../../libs/convert');
var config = require('../../config');
var cache = require('../../libs/cache');

var tableEjs    = process.cwd() + '/views/settlement/settleTable.ejs';

// 处理业务逻辑
exports.settleDetails = function (req, res, next) {

    cache.get('settleDetails:settleDetails_'+req.query.orderId, function(err, data){
        if(data){
            return res.render('settlement/settleDetails', data);
        }else{
            request({url : api_config.settleDetails}, {userId: user}, function (err, data) {
                if (err) return next(err);

                if(data) {
                    var source = JSON.parse(data.body);
                    var content = {
                        pageTitle: "结算管理",
                        headerTit: "结算管理",
                        userType: 'buy',     //用户类型: buy, sell
                        editable:"false",
                        order: {
                            status: 'ReturnedSettleAccounts'
                        },

                        "settleInfo":source.settleInfo

                    };
                    //渲染页面
                    return res.render('settlement/settleDetails', content);
                }
            })
        }
    })

};

// 生成html
exports.generate_settle = function (req, res, next) {


    request({url : api_config.billCenter}, function (err, data) {
        if (err) return next(err);

        if(data) {
            var source = JSON.parse(data.body);
            var content = {
                pageTitle: "结算管理",
                headerTit: "结算管理",
                userType: 'buy',     //用户类型: buy, sell
                editable:"false",
                order: {
                    status: 'ReturnedSettleAccounts'
                }
            };
            convert.ejs2html(data, tableEjs, {pathname: 'settleDetails_'+req.query.orderId, htmlpath: config.download + '/'}).then(function(result){
                var htmlpath = '/download/' + path.basename(result.htmlpath);
                content.htmlpath = htmlpath;
                cache.set('settleDetails:settleDetails_'+req.query.orderId, content);
                return res.json({htmlpath:htmlpath});
            })
        }
    })

};
