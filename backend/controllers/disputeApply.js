/*
 * 业务控制 (模板 & 数据请求)
 * */

var request = require('request');
var apiHost = 'http://server.180.com/';			// 模拟域名
var path = require('path');
var _ = require('lodash');


// 处理业务逻辑
exports.disputeApply = function (req, res, next) {
    request({url : 'http://localhost:8800/dispute/disputeApply'}, function (err, data) {

        if (err) return next(err);
        
        var source  = JSON.parse(data.body);
        var content = _.assign({}, {headerTit: "纠纷申请页面",pageTitle: "纠纷申请页面"}, source)
        res.render('dispute/disputeApply', content);
    });

    // 异步调取Java数据
    //request(apiHost + 'listData', function(err, data) {
    //	// 渲染页面,指定模板&数据
    //	res.render('header/header', {listData: JSON.parse(data.body)});			// 指定模板路径 渲染
    //});

};

exports.dispute = function (req, res, next) {
    var data={
        success:true
    }
    res.send(data);
}
