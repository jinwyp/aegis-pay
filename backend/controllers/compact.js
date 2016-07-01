var request = require('../libs/request');
var api_config = require('../api/v1/api_config');
var logger     = require("../libs/logger");
var cache   = require('../libs/cache');
var checker = require('../libs/datachecker');
var config = require('../config');
var utils = require('../libs/utils');

var pdfpath = config.file_path.root + config.file_path.pdf;
var imagespath = config.file_path.root + config.file_path.images;

// fetch compact
exports.compact = function (req, res, next) {
// { pageTitle: '签订电子合同',
//   orderId: '2020',
//   headerTit: '签订电子合同',
//   version: 1,
//   imgs: 
//    [ '/files/images/compact-2020-0.jpg',
//      '/files/images/compact-2020-1.jpg',
//      '/files/images/compact-2020-2.jpg' ],
//   pdfpath: '/download/compact-2020.pdf' }
    // checker.orderId(req.query.orderId);
    // var orderId = req.query.orderId;
    // var pageData = {
    //             pageTitle : '签订电子合同',
    //             orderId : orderId,
    //             headerTit : '签订电子合同',
    //             version: '',
    //             imgs : []
    //         };
    // var compact_pdffile = pdfpath + '/compact-' + req.query.orderId + '.pdf';
    // var compact_imagespath = imagespath + '/compact-' + req.query.orderId;
    // if(utils.isDirExistsSync(compact_imagespath) && utils.isFileExistsSync(compact_pdffile)){

    // }else{

    // }
    var pageData = {
            pageTitle : '签订电子合同',
            orderId : req.query.orderId,
            headerTit : '签订电子合同',
            version: '',
            imgs : []
        };
    return res.render('compact/compact', pageData);
    // cache.get('compacts[' + orderId + ']', function (err, data) {
    //     console.log(data)
    //     if (err) return next(err);
    //     if (data) {
    //         return res.render('compact/compact', data);
    //     } else {
    //         var pageData = {
    //             pageTitle : '签订电子合同',
    //             orderId : orderId,
    //             headerTit : '签订电子合同',
    //             version: '',
    //             imgs : []
    //         };
    //         return res.render('compact/compact', pageData);
    //     }
    // })
};


exports.compactDetail = function (req, res, next) {
    request.post({url:api_config.getCompact,form:{orderId:req.query.orderId,userId:req.session.user.id}}, function (err, data) {
        if (err) return next(err);
        if (data) {
            var source = JSON.parse(data.body);
            if(source.success) {
                var content = {
                    headerTit : '合同详情',
                    pageTitle : '合同详情',
                    "data" : source.data.contract
                };
                //渲染页面
                return res.render('compact/compactDetail', content);
            }else{
                res.send(source.data.error);
            }
        }
    });
};
