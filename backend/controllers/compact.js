var request = require('request');
var api_config = require('../api/v1/api_config');
var logger     = require("../libs/logger");
var cache   = require('../libs/cache');
var checker = require('../libs/datachecker');


// fetch compact
exports.compact = function (req, res, next) {

    //checker.orderId(req.query.orderId);
    var orderId = req.query.orderId;

    // cache.del('compacts[' + orderId + ']');
    cache.get('compacts[' + orderId + ']', function (err, data) {
        if (err) return next(err);
        if (data) {
            return res.render('compact/compact', data);
        } else {
            var pageData = {
                pageTitle : '签订电子合同',
                orderId : orderId,
                headerTit : '签订电子合同',
                version: '',
                imgs : []
            };
            return res.render('compact/compact', pageData);
        }
    })
};


exports.compactDetail = function (req, res, next) {

    //checker.orderId(req.query.id);
    var orderId = req.query.id;
    var params  = '?orderId=' + orderId + "&userId=" + req.session.user.id;
    request(api_config.getCompact + params, function (err, data) {
        if (err) return next(err);
        logger.debug('获取到的错误是----------------------------' + err);
        logger.debug('获取到的结果是----------------------------' + data.body);
        if (data) {
            var source = JSON.parse(data.body);
            if(source.success) {
                var content = {
                    headerTit : '合同详情',
                    pageTitle : '合同详情',
                    "data" : source.data.compact
                };
                //渲染页面
                return res.render('compact/compactDetail', content);
            }
        }
    });


};
