var request    = require('../../libs/request');
var requestdebug = require('request-debug');
var _          = require('lodash');

var api_config = require('./api_config');
var config     = require('../../config');
var checker    = require('../../libs/datachecker');
var convert    = require('../../libs/convert');
var cache      = require('../../libs/cache');
var path       = require('path');

var co = require('co');

requestdebug(request);

const uploadPath = config.file_path.download + '/';

// 提交按钮
exports.confirmDeliverySubmit = function (req, res, next) {
    var body = req.body;
    var url = api_config.confirmDeliverySubmit;
    var userId=15 || req.session.user.id;

    var formData = {
        "userId" : userId,
        "orderId":req.body.deliveryAmount,
        "version":req.body.version,
        "deliveryAmount":req.body.deliveryAmount,
        "indexList":req.body.indexList,
        "qualityList":req.body.qualityList,
        "quantityList":req.body.quantityList
    };

    _.map(req.body.qualityList, function(val, index){
        val.name = val.file_name;
        val.path = uploadPath + val.file_id;
        _.unset(val, 'file_id');
        _.unset(val, 'file_name');
    })
    _.map(req.body.quantityList, function(val, index){
        val.name = val.file_name;
        val.path = uploadPath + val.file_id;
        _.unset(val, 'file_id');
        _.unset(val, 'file_name');
    })
    console.log('===============confrm========');
    console.log(formData)
    console.log(req.body)
    var formData = _.assign({}, {userId: userId, orderId:'250', version:'1'}, req.body);
    request.post({
        form:formData,
        url : url,
        qsStringifyOptions:{allowDots:true}
        
    }, function (err, data, body) {
        console.log(data)
        if (err) return next(err);

        var resultJson = JSON.parse(body);
        if(resultJson.success){
            zipFile(req, res, next);
        }
        return res.send(resultJson);
    });
};
var zipFile = exports.zipFile = function (req, res, next) {
   return new Promise(function(resolve, reject){
        var params   = req.body;

        var qualityArray = [];
        var qualityPathArray = [];
       var quantityArray = [];
       var quantityPathArray = [];
       
        _.each(params.qualityList, function (value, index) {
            qualityArray.push({id : uploadPath + index, name : uploadPath + value});
            qualityPathArray.push(uploadPath + 'zips/' + path.basename(value.path)); // 需要压缩文件的绝对路径数组
            console.log("chen~~~~~~~~~~~~~~~~~1")
            console.log(qualityPathArray);
        });

        _.each(params.quantityList, function (value, index) {
            quantityArray.push({id : uploadPath + index, name : uploadPath + value});
            quantityPathArray.push(uploadPath + 'zips/' + path.basename(value.path)); // 需要压缩文件的绝对路径数组
            console.log("chen~~~~~~~~~~~~~~~~~2")
            console.log(quantityPathArray)
        });

       var zips = [
           convert.zipFile({path : qualityPathArray}),
           convert.zipFile({path : quantityPathArray})
       ]

       Promise.all(zips).then(function(result){
           console.log('==============promisezips===============')
           console.log(result)
           var obj = {'qualityPath': result[0], 'quantityPath': result[1]};
           cache.set('qZips_' + req.body.orderId, obj);
           console.log(req.body+"fffffffffffffffffffffffffffffffff")
       }).catch(next);

   })

};