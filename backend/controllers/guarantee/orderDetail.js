/*
 * 业务控制 (模板 & 数据请求)
 * */

var request = require('../../libs/request');

var checker    = require('../../libs/datachecker');
var api_config = require('../../api/guarantee/api_config');

// 处理业务逻辑
exports.getGuaranteeOrderDetail = function (req, res, next) {
    var type = (req.path.split('/').pop() == 'getBuyOrderDetail') ? 0 : 1;
    var params = { 
            url : api_config.guaranteeBuyOrderDetail, 
            form: {orderId:req.query.orderId, userId:req.session.user.id}
        };
    var view = 'guarantee/order/orderDetail';
    
    (type==1) ? (params.url = api_config.guaranteeSellOrderDetail) : "";
    
    request.post(params, function (err, data) {
        if (err) return next(err);
        if (data) {
            var source = JSON.parse(data.body);

            //headerTit:订单详情页面标题，pageTitle:浏览器标签名，type:显示卖家信息或者买家信息
            var statusObj = {"WaitFreeze4GTO":0, "WaitSellerSettle4GTO":1,"WaitBuyerSettle4GTO":1, "Complete4GTO":2, "Canceled4GTO":3};
            var content = {
                headerTit  : "订单详情",
                pageTitle  : "订单详情",
                type       : type,
                sellInfo   : source.data.sellInfo,
                order      : source.data.order,
                statusObj  : statusObj
            };
            res.render(view, content);
        } else {
            res.send(data.body);
        }
    });
};

exports.guaranteePrintDetail = function (req, res, next) {
    var params = {
            url : api_config.guaranteePrintOrderDetail,
            form:{orderId:req.query.orderId, userId:req.session.user.id}
        }
    request.post(params, function (err, data) {
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
                //渲染页面,指定模板&数据
                res.render('guarantee/order/printDetail', content);
            }else{
                res.send(source.error);
            }
        } else {
            res.send(data.body);
        }
    });
};