


var request = require('request');
//var apiHost = 'http://server.180.com/';			// 模拟域名
var path = require('path');
var _ = require('lodash');
var api_config = require('../../api/v1/api_config');
var convert = require('../../libs/convert');
var config = require('../../config');
var cache = require('../../libs/cache');

var tableEjs    = config.file_path.views + '/settlement/settleTable.ejs';
var downloadPath = config.file_path.download;
var SystemError = require('../../errors/SystemError');

// 处理业务逻辑
exports.settleDetails = function (req, res, next) {

    var user = req.session.user;
    var orderId = req.query.orderId;
    // cache.del('settleDetails:settleDetails_'+req.query.orderId)
    cache.get('settleDetails:settleDetails_'+req.query.orderId, function(err, data){
        if(data){
            return res.render('settlement/settleDetails', data);
        }else{

            request({url : api_config.billCenterView+'?sellerId=' + user.id +'&orderId=' + orderId}, function (err, data) {

                if (err || data.statusCode != 200) {
                    next(new SystemError());
                    return;
                }

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
                        receiptOrder:source.data.receiptOrder,
                        data:{
                            order:source.data.order,
                            receipt:source.data.receipt,
                            orderReceiptRemarks:source.data.orderReceiptRemarks
                            }

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

    var user = req.session.user;
    var orderId = req.query.orderId;
    
    request({url : api_config.billCenterView+'?sellerId=' + req.session.user.id +'&orderId=' + req.query.orderId}, function (err, data) {
        
        if (err || data.statusCode != 200) {
            next(new SystemError());
            return;
        }
        
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
                htmlpath:source.data.htmlpath,
                receiptOrder:source.data.receiptOrder,
                data:{
                    order:source.data.order,
                    receipt:source.data.receipt,
                    orderReceiptRemarks:source.data.orderReceiptRemarks
                }
            };
            convert.ejs2html(content, tableEjs, {pathname: 'settleDetails_'+req.query.orderId, htmlpath: downloadPath + '/'}).then(function(result){
                var htmlpath = '/download/' + path.basename(result.htmlpath);
                content.htmlpath = htmlpath;
                
                cache.set('settleDetails:settleDetails_'+req.query.orderId, content);
                return res.json({htmlpath:htmlpath});

            })
        }
    })

};
