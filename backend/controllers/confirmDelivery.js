/*
 * 业务控制 (模板 & 数据请求)
 * */

var request = require('../libs/request');
var path = require('path');
var _ = require('lodash');

var checker    = require('../libs/datachecker');
var api_config = require('../api/v1/api_config');


// 处理业务逻辑
exports.confirmDelivery = function (req, res, next) {


    var userId=req.session.user.id;
    var params = {
        userId: req.session.user.id,
        orderId: req.query.orderId
    };
    var url = api_config.confirmDelivery+"?userId="+params.userId+"&orderId="+params.orderId;
    request.get({
        url : url,
        userId:userId,
        orderId:req.query.orderId
    }, function (err, data) {
        if (err) return next(err);
        if (data){
            var source  = JSON.parse(data.body);
            var statusObj = {
                step     : 3,
                stepList : [
                    {
                        stepName : '提交订单',
                        stepDate : source.data.order.createTime
                    },
                    {
                        stepName : '签订合同',
                        stepDate : source.data.order.signContractTime
                    },
                    {
                        stepName : '付款',
                        stepDate : source.data.order.paymentTime
                    },
                    {
                        stepName : '确认提货',
                        stepDate : ""
                    },
                    {
                        stepName : '结算',
                        stepDate : ""
                    }
                ]
            };
            var content={
                userId:userId,
                orderId:params.orderId,
                headerTit   : "确认提货页面",
                pageTitle   : "确认提货页面",
                statusObj: statusObj,
                "sellInfo"  : source.data.sellInfo,
                "order"     :  source.data.order,
                "indexList" :  source.data.indexList,
                "deliveryAmount" :  source.data.deliveryAmount,
                "indexDataList" :  source.data.indexDataList,
                "qualityList" :  source.data.qualityList,
                "quantityList" :  source.data.quantityList
            }

            res.render('confirmDelivery/confirmDelivery', content);
        }
    });

};



