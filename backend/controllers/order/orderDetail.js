/*
 * 业务控制 (模板 & 数据请求)
 * */

var request = require('../../libs/request');

var checker    = require('../../libs/datachecker');
var api_config = require('../../api/v1/api_config');
var logger     = require("../../libs/logger");

// 处理业务逻辑
exports.getBuyOrderDetail = function (req, res, next) {
    request.post(
        {
            url : api_config.buyOrderDetail,
            form: {orderId:req.query.orderId, userId:req.session.user.id}
        },
        function (err, data) {
        if (err) return next(err);
        if (data) {
            var source = JSON.parse(data.body);
            logger.debug('userId-----------------'+req.session.user.id);
            logger.debug('status-----------------'+source.data.type);
            logger.debug('order-----------------'+JSON.stringify(source.data.order));
            logger.debug('sellInfo-----------'+JSON.stringify(source.data.sellInfo));
            var step = 0;
            switch (source.data.order.status) {
                case 'TradeClosed':
                case 'Canceled':
                    if(source.data.order.statusClose=='WaitPayment'){
                        step = 2;
                    }else{
                        step = 1;
                    }
                    break;
                case 'WaitSignContract':
                    step = 1;
                    break;
                case 'WaitPayment':
                    step = 2;
                    break;
                case 'WaitConfirmDelivery':
                case 'ReturnedDeliveryGoods':
                case 'WaitVerifyDeliveryGoods':
                    step = 3;
                    break;
                case 'WaitSettleAccounts':
                case 'WaitVerifySettle':
                case 'ReturnedSettleAccounts':
                case 'WaitPayRefundMoney':
                case 'WaitPayTailMoney':
                    step = 4;
                    break;
                case 'WaitReceiveReceipt':
                    step = 5;
                    break;
                default :
                    step=5;
            }
            var stepName='',stepDate='';
            if((source.data.order.status==='WaitSettleAccounts'
                ||source.data.order.status==='WaitVerifySettle'
                ||source.data.order.status==='ReturnedSettleAccounts'
                ||source.data.order.status==='WaitPayRefundMoney'
                ||source.data.order.status==='WaitPayTailMoney')&&source.data.order.confirmDeliveryTime===null){
                stepName='纠纷处理';
                stepDate=source.data.order.disputeCreateTime ||"";
            }else{
                stepName='确认提货';
                if(step==3){
                    stepDate="";
                }else{
                    stepDate=source.data.order.confirmDeliveryTime ||"";
                }
            }
            var statusObj = {
                step     : step,        // 第几步
                stepList : [
                    {
                        stepName : '提交订单',
                        stepDate : source.data.order.createTime||""
                    },
                    {
                        stepName : '签订合同',
                        stepDate : source.data.order.signContractTime ||""
                    },
                    {
                        stepName : '付款',
                        stepDate : source.data.order.paymentTime || ""
                    },
                    {
                        //stepName : '确认提货',
                        stepName : stepName,
                        stepDate : stepDate
                    },
                    {
                        stepName : '结算',
                        stepDate : source.data.order.settleAccountTime ||""
                    }
                ]
            };
            logger.debug("typeof:"+ typeof source.data.order.createTime);
            logger.debug('status-----------------'+source.data.order.createTime);
            logger.debug('status-----------------'+source.data.order.signContractTime);
            logger.debug('status-----------------'+source.data.order.paymentTime);
            logger.debug('status-----------------'+source.data.order.confirmDeliveryTime);
            logger.debug('status-----------------'+source.data.order.settleAccountTime);
            //headerTit:订单详情页面标题，pageTitle:浏览器标签名，type:显示卖家信息或者买家信息
            var content = {
                headerTit  : "订单详情",
                pageTitle  : "订单详情",
                //type       : source.data.order.type,
                type       : 0,
                statusObj  : statusObj,
                sellInfo   : source.data.sellInfo,
                order      : source.data.order,
                statusClose: source.data.order.statusClose
            };
            res.render('order/buyOrderDetail', content);
        } else {
            res.send(data.body);
        }
    });
};

exports.getSellOrderDetail = function (req, res, next) {
    request.post(
        {
            url : api_config.sellOrderDetail,
            //form: {orderId:req.query.orderId, sellerId:req.query.sellerId}
            form: {orderId:req.query.orderId, userId:req.session.user.id}
        },
        function (err, data) {
            if (err) return next(err);
            if (data) {
                var source = JSON.parse(data.body);
                logger.debug('userId-----------------'+req.session.user.id);
                logger.debug('order-----------------'+JSON.stringify(source.data.order));
                logger.debug('sellInfo-----------'+JSON.stringify(source.data.sellInfo));
                var step = 0;
                switch (source.data.order.status) {
                    case 'WaitSignContract':
                        step = 1;
                        break;
                    case 'WaitPayment':
                        step = 2;
                        break;
                    case 'WaitConfirmDelivery':
                    case 'ReturnedDeliveryGoods':
                    case 'WaitVerifyDeliveryGoods':
                        step = 3;
                        break;
                    case 'WaitSettleAccounts':
                    case 'WaitVerifySettle':
                    case 'ReturnedSettleAccounts':
                        step = 4;
                        break;
                    case 'WaitReceiveReceipt':
                        step = 5;
                        break;
                    default :
                        step=5;
                }
                var statusObj = {
                    step     : step,        // 第几步
                    stepList : [
                        {
                            stepName : '提交订单',
                            stepDate : source.data.order.createTime == null ? "" : source.data.order.createTime
                        },
                        {
                            stepName : '签订合同',
                            stepDate : source.data.order.signContractTime == null ? "" : source.data.order.signContractTime
                        },
                        {
                            stepName : '付款',
                            stepDate : source.data.order.paymentTime == null ? "" : source.data.order.paymentTime
                        },
                        {
                            stepName : '确认提货',
                            stepDate : source.data.order.confirmDeliveryTime == null ? "" : source.data.order.confirmDeliveryTime
                        },
                        {
                            stepName : '结算',
                            stepDate : source.data.order.settleAccountTime == null ? "" : source.data.order.settleAccountTime
                        }
                    ]
                };
                //headerTit:订单详情页面标题，pageTitle:浏览器标签名，type:显示卖家信息或者买家信息
                var content = {
                    headerTit  : "订单详情",
                    pageTitle  : "订单详情",
                    //type       : source.data.order.type,
                    type       : 1,
                    statusObj  : statusObj,
                    "sellInfo" : source.data.sellInfo,
                    "order"    : source.data.order
                };
                res.render('order/sellOrderDetail', content);
            } else {
                res.send(data.body);
            }
        });
};

exports.printDetail = function (req, res, next) {
    request.post(
        {
            url : api_config.printOrderDetail,
            form:{orderId:req.query.orderId, userId:req.session.user.id}
        },
        function (err, data) {
        if (err) return next(err);
        if (data) {
            var source  = JSON.parse(data.body);
            if(source.success){
                //headerTit:订单详情页面标题，pageTitle:浏览器标签名，type:显示卖家信息或者买家信息
                var content = {
                    headerTit  : "打印订单详情",
                    pageTitle  : "打印订单详情",
                    "sellInfo" : source.data.sellInfo,
                    "order"    : source.data.order
                };
                logger.debug('printDetail获取到的结果是----------------------------' + content);
                //渲染页面,指定模板&数据
                res.render('order/printDetail', content);
            }else{
                res.send(source.error);
            }
        } else {
            res.send(data.body);
        }
    });
};

exports.sureReceiveReceipt = function (req, res, next) {
    logger.debug("---------data---------"+req.query.orderId+"-------"+req.query.version);
    request.post(
        {
            url : api_config.sureReceiveReceipt,
            form:{orderId:req.query.orderId, userId:req.session.user.id, version:req.query.version}
        },
        function (err, data) {
            if (err) return next(err);
            logger.debug("------------------"+data.body);
            if (data) {
                var source  = JSON.parse(data.body);
                if(source.success){
                    res.send(source);
                }else{
                    res.send(source.error);
                }
            } else {
                res.send(data.body);
            }
        });
};

exports.buyDeleteOrder = function (req, res, next) {
    request.post(
        {
            url : api_config.sureReceiveReceipt,
            form:{orderId:req.query.orderId, userId:req.session.user.id, version:req.query.version}
        },
        function (err, data) {
            if (err) return next(err);
            if (data) {
                var source  = JSON.parse(data.body);
                if(source.success){
                    res.send(source);
                }else{
                    res.send(source.error);
                }
            } else {
                res.send(data.body);
            }
        });
};

exports.orderTest = function (req, res, next) {
    logger.debug('服务器被请求了' + req.query.id);
    res.send('fdsfsdfsdf');
};