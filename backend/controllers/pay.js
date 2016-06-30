var request    = require('../libs/request');
var _          = require('lodash');
var checker    = require('../libs/datachecker');
var api_config = require('../api/v1/api_config');
var cache = require('../libs/cache');

var getOrderStatus = function(orderId){
    return new Promise(function(resolve, reject){
        request(api_config.orderDetail + '?orderId=' + orderId, function(err, data){
            if(err) reject(err);
            if(!err && data){
                var status = JSON.parse(data.body).data.order.status;
                var step = 0;
                var statusObj = {
                    'WaitSignContract': 1,
                    'WaitPayment': 2,
                    'WaitConfirmDelivery': 3,
                    'WaitSettleAccounts':4,
                    'ReturnedDeliveryGoods':4,
                    'WaitReceiveReceipt':5
                }
                resolve(statusObj[status]);
            }
        })
    })
}

exports.page = function (req, res, next) {
        checker.orderId(req.query.orderId);
        var userInfo = req.session.user;

        var query = '?orderId=' + req.query.orderId + '&userId=' + userInfo.id + '&type=' + req.query.type;
        request(api_config.payPage + query, function (err, data) {
            if (err) return next(err);
            var result = JSON.parse(data.body);
            if(result.errorCode === '1009'){
                // 订单不处于支付状态
                 res.redirect('/getBuyOrderDetail?orderId=' + req.query.orderId);
            }else{
                var pageData = _.assign({},{headerTit : '支付货款', pageTitle : '支付货款' },
                                            result.data);
                // 未开通资金账号
                var view = (result.errorCode==='1001') ? 'pay/open-account' : 'pay/index';
                return res.render(view, pageData);
            }

        })
};


exports.success = function (req, res, next) {
    var params = '?orderId=' + req.query.orderId + '&userId=' + req.session.user.id + '&type=1';
    request(api_config.orderProgress + params, function (err, data) {
        if (!err && data) {
            var body = JSON.parse(data.body);
            var data = body.data;
            // 构造符合业务逻辑的statusObj数据结构
            // statusObj: {step: 3, stepList:[{"stepName": name , "stepDate": data[name]}]
            var statusName = ['提交订单', '签订合同', '付款', '确认提货', '结算'];
            var timeName   = ['createTime', 'signContractTime', 'paymentTime', 'confirmDeliveryTime', 'settleAccountTime'];
            var statusObj  = {step : 0, stepList : []};
            _.map(timeName, function (name, index) {
                var time = '';
                if (data.order[name]) {
                    statusObj.step = index + 1;
                    time           = data.order[name];
                }
                statusObj.stepList.push({"stepName" : statusName[index], "stepDate" : time});
            })
            // order对象添加orderId
            var order   = _.assign({}, {orderId : req.query.orderId}, data.order);
            var resData = _.assign({headerTit : '付款', pageTitle : '付款'}, {'statusObj' : statusObj}, {'order' : order});
            return res.render('pay/success', resData);
        } else {
            next(err);
        }
    })
};
