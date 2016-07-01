


var request = require('../../libs/request');
//var apiHost = 'http://server.180.com/';			// 模拟域名
var path = require('path');
var _ = require('lodash');
var api_config = require('../../api/v1/api_config');
var convert = require('../../libs/convert');
var config = require('../../config');
var cache = require('../../libs/cache');

var SystemError = require('../../errors/SystemError');


var utils   = require('../../libs/utils');
var ejs     = require('ejs');
var pdf     = require('html-pdf');
var pdfSavePath = path.join(config.file_path.root, config.file_path.upload, '/settleDetails');
var pdfHtmlTemplatePath = path.join(config.views, '/settlement/settleTable.ejs');



// 处理业务逻辑
exports.settleDetails = function (req, res, next) {

    var user = req.session.user;
    var orderId = req.query.orderId;
    cache.del('settleDetails:settleDetails_'+req.query.orderId);
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
                        subTitle: "查看开票信息",
                        userType: 'buy',     //用户类型: buy, sell
                        editable:"false",
                        userId: user.id,
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
// /api//fetch-settle-html?orderId=3630&userId=15
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
                subTitle: "查看开票信息",
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

            // 文件转换处理
            ejs.renderFile(pdfHtmlTemplatePath, content, function (err, resultHtml) {
                if (err) return next(err);
                var pdfOptions = {width : '1000px',height: "1413px"};
                var pdfFileName = pdfSavePath + '/settleDetails.pdf';

                pdf.create(resultHtml, pdfOptions).toFile(pdfFileName, function (err, resultPDF) {
                    if (err) return next(err);
                    return res.download(pdfFileName);
                });
            });



        }
    })

};
