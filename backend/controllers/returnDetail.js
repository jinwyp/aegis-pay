/*
 * 业务控制 (模板 & 数据请求)
 * */

var request = require('request');
var _       = require('lodash');

var cache      = require('../libs/cache');
var logger     = require("../libs/logger");
var checker    = require('../libs/datachecker');
var api_config = require('../api/v1/api_config');
var config     = require('../config');


var __dirfiles = config.file_path.root;


// 处理业务逻辑
exports.returnDetail = function (req, res, next) {

    // checker.orderId(req.query.orderId);

    cache.get('qualityZip_' + req.query.orderId, function(err, zipurl){

        // if (err) return next(err);
        //
        // // var qualityZip = req.protocol + '://' + req.hostname + ':' + config.port + zipurl.replace(__dirfiles+'/static', '/files');
        // // var quantityZip = req.protocol + '://' + req.hostname + ':' + config.port + zipurl.replace(__dirfiles+'/static', '/files');
        //
        // var url = api_config.orderReturn;
        //
        // request.post(
        //     {
        //         url : url,
        //         form:{
        //             orderId:req.query.orderId,
        //             sellerId:15
        //         }
        //     },
        //     function (err, data) {
        //     if (err) return next(err);
        //
        //     if (data){
        //         var source = JSON.parse(data.body);
        //         if(source.success) {
        //             logger.debug('dataBody------------------------------' + data.body);
        //             logger.debug('userId-----------------' + req.session.user.id);
        //             logger.debug('status-----------------' + source.data.order.status);
        //             logger.debug('order-----------------' + JSON.stringify(source.data.order));
        //             logger.debug('sellInfo-----------' + JSON.stringify(source.data.sellInfo));
        //             console.log(source + ">>>>>>>>>>>>>>>>>>>>>>>")
        //             var content = {
        //                 headerTit: "确认退回页面",
        //                 pageTitle: "确认退回页面",
        //                 orderId: "3621",
        //                 sellerId: "15",
        //                 type: "buy",
        //                 "order": source.data.order,
        //                 "sellInfo": source.data.sellInfo,
        //                 "deliveryAmount": source.data.order.deliveryAmount,
        //                 "indexList": source.data.indexList,
        //                 "qualityZip": source.qualityZip,
        //                 "quantityZip": source.quantityZip
        //
        //             };
        //             res.render('return/returnDetail', content);
        //         }else{
        //             res.send(source.error);
        //         }
        //     }
        // });

        var userId=req.session.user.id;
        // 暂时写死
        var url =  api_config.orderReturn+"?sellerId=15&orderId=3632";

        // console.log(req.session.user.id+"@!#!@#!@#!@#!@#!@#!@#!@#!@#!@#!@~~~~~~"+req.query.orderId)
        var params = {
            sellerId: req.session.user.id,
            orderId: req.query.orderId
        };

        request(url, params, function (err, data) {

            if (err) return next(err);

            var source  = JSON.parse(data.body);
            var content={
                headerTit: "确认退回页面",
                pageTitle: "确认退回页面",
                orderId:  req.query.orderId,
                sellerId: "15",
                type: "buy",
                "order": source.data.order,
                "sellInfo": source.data.sellInfo,
                "deliveryAmount": source.data.order.deliveryAmount,
                "indexList": source.data.indexList,
                "qualityZip": source.qualityZip,
                "quantityZip": source.quantityZip,
                 userType : 'buy'

            };
            //content.data = JSON.parse(data.body).data;
            content.data = {
                    order: {
                        id: 220000,
                        version: 2314231,

                        orderNO: '82793847398',						//订单编号
                        contractNO: '82793847398FGHJKL',			//合同编号
                        confirmDeliveryTime: '2016-06-20 16:11:48',	//确认提货时间
                        confirmSettleTime: '2016-06-20 16:11:48',	//结算时间
                        harbour: '上海港',							//港口
                        coalType: '动力煤',							//煤种
                        amount: 3000,								//合同吨位
                        price: 100, 								//合同单价
                        totalMoney: 1000,							//合同金额.付款金额
                        paymentTime: '2016-06-20 16:11:48',			//付款时间

                        buyerCompanyName: '购方公司11',				//购方公司
                        sellerCompanyName: '销方公司11',				//销方公司
                        status: 'WaitSettleAccounts',
                        statusName: '待结算'
                        //sellerSettleTime: '2016-06-20 16:11:48',	//*结算单创建时间
                        //settleAmount: 300,						//*结算吨数
                        //harbourDues: 555,							//*港务费
                        //settleMoney: 1000,						//*结算金额
                        //tailMoney: 100,							//*应补款
                        //refundMoney: 0,							//*应退款
                        //remarks: '说明11'
                    }
            };
            res.render('return/returnDetail', content);

        });
    });
};
