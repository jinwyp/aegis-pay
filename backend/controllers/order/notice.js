/*
 * 业务控制 (模板 & 数据请求)
 * */

var request = require('request');

var checker    = require('../../libs/datachecker');
var api_config = require('../../api/v1/api_config');
var logger     = require("../../libs/logger");

//卖家提醒买家签订电子合同
exports.toNoticeBuyerSignContract = function (req, res, next) {
    request.post(
        {
            url : api_config.noticeToSignContract,
            form: {orderId:req.query.orderId, sellerId:req.session.user.id}
        },
        function (err, data) {
            if (err) return next(err);
            logger.debug('order-----------------'+data.body);
            if (data) {
                var source = JSON.parse(data.body);
                res.send(source);
            } else {
                res.send(data.body);
            }
        }
    );
};

//卖家提醒买家付款
exports.toNoticeBuyerPayMoney = function (req, res, next) {
    request.post(
        {
            url : api_config.noticeToPayMoney,
            form: {orderId:req.query.orderId, sellerId:req.session.user.id}
        },
        function (err, data) {
            if (err) return next(err);
            logger.debug('order-----------------'+data.body);
            if (data) {
                var source = JSON.parse(data.body);
                res.send(source);
            } else {
                res.send(data.body);
            }
        }
    );
};

//卖家催买家确认提货
exports.toNoticeBuyerToDelivery = function (req, res, next) {
    request.post(
        {
            url : api_config.noticeToDelivery,
            form: {orderId:req.query.orderId, sellerId:req.session.user.id}
        },
        function (err, data) {
            if (err) return next(err);
            logger.debug('order-----------------'+data.body);
            if (data) {
                var source = JSON.parse(data.body);
                res.send(source);
            } else {
                res.send(data.body);
            }
        }
    );
};

//买家催卖家进行结算订单
exports.toNoticeSellerToSettle = function (req, res, next) {
    logger.debug('-------orderId----------'+req.query.orderId);
    request.post(
        {
            url : api_config.noticeToSettle,
            form: {orderId:req.query.orderId, userId:req.session.user.id}
        },
        function (err, data) {
            if (err) return next(err);
            logger.debug('order-----------------'+data.body);
            if (data) {
                var source = JSON.parse(data.body);
                res.send(source);
            } else {
                res.send(data.body);
            }
        }
    );
};

//买家提醒卖家支付退款
exports.toNoticeSellerReturnMoney = function (req, res, next) {
    request.post(
        {
            url : api_config.noticeToReturnMoney,
            form: {orderId:req.query.orderId, userId:req.session.user.id}
        },
        function (err, data) {
            if (err) return next(err);
            logger.debug('order-----------------'+data.body);
            if (data) {
                var source = JSON.parse(data.body);
                res.send(source);
            } else {
                res.send(data.body);
            }
        });
};

//买家提醒卖家开发票
exports.toNoticeSellerWriteReceipt = function (req, res, next) {
    request.post(
        {
            url : api_config.noticeToWriteReceipt,
            form: {orderId:req.query.orderId, userId:req.session.user.id}
        },
        function (err, data) {
            if (err) return next(err);
            logger.debug('order-----------------'+data.body);
            if (data) {
                var source = JSON.parse(data.body);
                res.send(source);
            } else {
                res.send(data.body);
            }
        });
};

//卖家短信提醒买家已经开发票
exports.toNoticeReceiveReceipt = function (req, res, next) {
    request.post(
        {
            url : api_config.noticeToReceiveReceipt,
            form: {orderId:req.query.orderId, sellerId:req.session.user.id ,version:req.query.version}
        },
        function (err, data) {
            if (err) return next(err);
            logger.debug('order-----------------'+data.body);
            if (data) {
                var source = JSON.parse(data.body);
                res.send(source);
            } else {
                res.send(data.body);
            }
        });
};

