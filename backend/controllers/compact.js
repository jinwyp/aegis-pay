var request = require('../libs/request');
var api_config = require('../api/v1/api_config');
var logger     = require("../libs/logger");
var cache   = require('../libs/cache');
var checker = require('../libs/datachecker');
var config = require('../config');
var utils = require('../libs/utils');
var archiver = require('archiver');
var fs = require('fs');
var _ = require('lodash');

var BusinessError = require('../errors/BusinessError');

var pdfpath = config.file_path.root + config.file_path.pdf;
var imagespath = config.file_path.root + config.file_path.images;

// fetch compact
exports.compact = function (req, res, next) {
    request({url: api_config.checkOrderStatus + '?orderId=' + req.query.orderId + '&userId=' + req.session.user.id}, function(err, data){
        if(err) {return next(err); }
        var result = JSON.parse(data.body);
        if(result.data && (result.data.status === 'WaitSignContract')){
            var pageData = {
                pageTitle : '签订电子合同',
                orderId : req.query.orderId,
                headerTit : '签订电子合同',
                version: '',
                imgs : []
            };
            return res.render('compact/compact', pageData);
        }else{
            return next(new BusinessError(409, '当前订单不处于签订合同状态！'));
        }
    })
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

exports.downloadContract = function (req, res, next) {
    request.post({url:api_config.downloadContract,form:{orderId:req.query.orderId,userId:req.session.user.id}}, function (err, data) {
        if (err) return next(err);
        logger.debug("----------downloadContract----------"+data.body);
        if (data) {
            var source = JSON.parse(data.body);
            if(source.success) {
                //被打包文件
                var files = source.data.files;
                var archive = Archiver('zip');
                archive.on('error', function(err) {
                    res.status(500).send({error: err.message});
                });
                //on stream closed we can end the request
                res.on('close', function() {
                    logger.debug('Archive wrote %d bytes', archive.pointer());
                    return res.status(200).send('OK').end();
                });
                //set the archive name
                res.attachment('file-txt.zip');
                //this is the streaming magic
                archive.pipe(res);
                for (var i = 0; i < files.length; i++) {
                    archive.append(fs.createReadStream(files[i].path), { name: files[i].name });
                }
                archive.append(fs.createReadStream('mydir/file.txt'), {name:'file.txt'});
                //you can add a directory using directory function
                //archive.directory(dirPath, false);
                archive.finalize();

            }else{
                res.send(source.data.error);
            }
        }
    });
    //res.send("正在处理合同逻辑中。。。");
};
