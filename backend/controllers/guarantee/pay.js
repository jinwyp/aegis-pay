var request    = require('../../libs/request');
var _          = require('lodash');
var checker    = require('../../libs/datachecker');
var api_config = require('../../api/guarantee/api_config');
var cache = require('../../libs/cache');
var logger = require('../../libs/logger');
var BusinessError = require('../../errors/BusinessError');

exports.page = function (req, res, next) {
        checker.orderId(req.query.orderId);
        var userInfo = req.session.user;
        // api_config.fetchPayPhone(userInfo.id).then(function(payPhone){
        //     res.locals.user.payPhone = payPhone;
            res.locals.user.payPhone = 18610073652;
            var query = '?orderId=' + req.query.orderId + '&userId=' + userInfo.id + '&type=' + req.query.type;
            request(api_config.payPage + query, function (err, data) {
                if (err) return next(err);
                var result = JSON.parse(data.body);
                if(result.errorCode === '1009'){
                    // 订单不处于支付状态
                    res.redirect('guarantee/getBuyOrderDetail?orderId=' + req.query.orderId);
                }else if(result.errorCode === '1003'){
                    //资金账户被禁用
                    return next(new BusinessError(409, '资金账户被禁用'));
                }else if(result.errorCode === '1004'){
                    //资金账户被锁定
                    return next(new BusinessError(409, '资金账户被锁定'));
                }else if(result.errorCode === '1005'){
                    //资金账户不能使用
                    return next(new BusinessError(409, '资金账户不能使用'));
                }else{
                    var pageData = _.assign({},{headerTit : '冻结货款', pageTitle : '冻结货款', type:req.query.type },
                                                result.data);
                    // 未开通资金账号
                    var view = (result.errorCode==='1001') ? 'guarantee/pay/open-account' : 'guarantee/pay/index';
                    return res.render(view, pageData);
                }

            })
        // }).catch(next);
};


exports.success = function (req, res, next) {
    var params = '?orderId=' + req.query.orderId + '&userId=' + req.session.user.id + '&type=' + req.query.type;
    request(api_config.paySuccess + params, function (err, data) {
        if(err){ return next(err); }
        if (!err && data) {
            var body = JSON.parse(data.body);
            var data = body.data;
            // order对象添加orderId
            var order   = _.assign({}, {orderId : req.query.orderId}, data.order);
            var resData = _.assign({headerTit : '付款', pageTitle : '付款', type: req.query.type}, {'order' : order});
            return res.render('guarantee/pay/success', resData);
        } else {
            next(err);
        }
    })
};
