var request = require('request');
var _ = require('lodash');
var api_config = require('../api/v1/api_config');

exports.page = function(req, res, next){
  request(api_config.payPage+'?orderId='+req.query.orderId+'&userId='+1, function(err, data){
    res.render('pay/index', _.assign({}, {headerTit: '支付货款', pageTitle:'支付货款'}, {"user":{"phone":"186****3232"}}, JSON.parse(data.body).data));
  })
}
