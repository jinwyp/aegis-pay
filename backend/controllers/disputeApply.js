/*
 * 业务控制 (模板 & 数据请求)
 * */

var request = require('../libs/request');
var apiHost = 'http://server.180.com/';			// 模拟域名
var path = require('path');
var _ = require('lodash');
var api_config = require('../api/v1/api_config');
var config     = require('../config');

// 处理业务逻辑
exports.disputeApply = function (req, res, next) {
    var userId=req.session.user.id;
    var params = {
        userId: req.session.user.id,
        orderId: req.query.orderId
    };
    var url = api_config.disputeApply+"?userId="+params.userId+"&orderId="+params.orderId;
    request(url, params, function (err, data) {

        if (err) return next(err);
        
        var source  = JSON.parse(data.body);
        var content={
            userId:userId,
            orderId:source.data.order.id,
            headerTit: "纠纷申请页面",
            pageTitle: "纠纷申请页面",
            sellInfo:source.data.sellInfo,
            order:source.data.order,
            files:source.data.files
        };
        if(source.data.files.length>0){
            req.flash('disputeImg',source.data.files); //返回修改图片路径
        }

        res.render('dispute/disputeApply', content);

    });
};

exports.disputeApplySubmit = function (req, res, next) {
    var body = req.body;
    var url = api_config.disputeApplySubmit;
    var userId=req.session.user.id;

    var formData = {
        "userId" : userId,
        "orderId": req.body.orderId,
        "version" : req.body.version,
        deliveryGoods:req.body.deliveryGoods,
        returnGoods:req.body.returnGoods,
        disputeRemarks:req.body.disputeRemarks,
        files:[]
    };

    if(req.body.files){
        for(var i=0;i<req.body.files.length;i++) {
            var file = req.body.files[i];
            formData.files.push({
                name: file.name,
                path: file.path = config.file_path.root + config.file_path.compact + '/' + file.path
            });
        }
    }
    console.log("#########");
    console.log(formData);
    request.post({
        form:formData,
        url : url,
        qsStringifyOptions:{allowDots:true}
    }, function (err, data, body) {
        if (err) return next(err);

        var resultJson = JSON.parse(body);
        return res.send(resultJson);
    });
};
// 修改页面图片
exports.disputeImg = function (req, res, next) {
    var imgId = req.query.imgid;
    var disputeImg = req.flash('disputeImg');
    var imgSrc = '';
    imgSrc = disputeImg[imgId].path;
    res.download(imgSrc, path.basename(imgSrc), function(err,data){
        if(err) return next(err);
    });

};