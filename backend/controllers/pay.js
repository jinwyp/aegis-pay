var request    = require('request');
var _          = require('lodash');
var checker    = require('../common/datachecker');
var api_config = require('../api/v1/api_config');


exports.page = function (req, res, next) {
    checker.orderId(req.query.orderId);
    var userInfo = req.user;

    request(api_config.payPage + '?orderId=' + req.query.orderId + '&userId=' + userInfo.userId, function (err, data) {
        if (err) return next(err);

        var phone = _.toString(userInfo.phone).replace(/(\d{3})(\d{4})(\d{4})/, "$1****$2");
        return res.render('pay/index', _.assign({},
            {
                headerTit : '支付货款',
                pageTitle : '支付货款'
            },
            {"user" : {"phone" : phone}},
            JSON.parse(data.body).data));
    })
};


exports.success = function (req, res, next) {
    var params = {orderId : req.query.orderId};
    request(api_config.orderProgress, params, function (err, data) {
        if (!err && data) {
            var data = JSON.parse(data.body);
            // 构造符合业务逻辑的statusObj数据结构
            // statusObj: {step: 3, stepList:[{"stepName": name , "stepDate": data[name]}]
            var statusName = ['提交订单', '签订合同', '付款', '确认提货', '结算'];
            var timeName   = ['createtime', 'signContractTime', 'paymentTime', 'confirmDeliveryTime', 'settleAccountTime'];
            var statusObj  = {step : 0, stepList : []};
            _.map(timeName, function (name, index) {
                var time = '';
                if (data[name]) {
                    statusObj.step = index + 1;
                    time           = data[name];
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

}
