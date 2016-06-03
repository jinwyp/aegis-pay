var request    = require('request');
var api_config = require('./api_config');
var _          = require('lodash');
var fs         = require('fs');
var formidable = require('formidable');
var uuid       = require('node-uuid');
var path       = require('path');
var config     = require('../../config');
var utils = require('../../common/utils');

var convert = require('../../common/convert');
var cache   = require('../../common/cache');
var checker = require('../../common/datachecker');


const uploadPath = config.sysFileDir + '/static/upload/';
const ftlpath    = config.sysFileDir + '/servicefiles/fs.ftl';

exports.uploadFile = function (req, res, next) {
    //api代理，去请求java接口
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) return next(err);
        var extName = /\.[^\.]+/.exec(files.files.name);
        var ext     = Array.isArray(extName)
            ? extName[0]
            : '';
        var newFile = uuid() + ext;
        var newPath = uploadPath + newFile;

        utils.makeDir(uploadPath);

        fs.rename(files.files.path, newPath, function (err) {
            if (err) return next(err);
            res.send({'success' : true, 'attach' : [{'filename' : files.files.name, 'id' : newFile}]})
        })

    });
};

// del file
exports.delFile = function (req, res, next) {
    fs.unlink(uploadPath + req.body.id, function (err) {
        res.send({"success" : true});
    })
};

// sign compact

exports.signCompact = function (req, res, next) {
    var params     = req.body;
    var newids     = _.map(params.file_id, function (id) {
        return uploadPath + id;
    })
    params.file_id = newids;
    request.post(api_config.signCompact, params, function (err, data) {
        if (!err && data) {
            return res.send(JSON.parse(data.body));
        }
    })
};






// 接收service数据，转化数据为客户端需要的格式
var convertData = function (compactdata, compactftl) {
    var data = {
        'pdfpath' : '',
        'imgs' : []
    };

    return convert.ftl2html(compactdata, compactftl).then(function(resultHtml){
        return convert.html2pdf(resultHtml.htmlpath)
    })
    .then(function(resultPDF){
        data.pdfpath = '/files/pdf/' + path.basename(resultPDF.pdfpath);
        return convert.pdf2image(resultPDF.pdfpath)
    })
    .then(function(resultImgs){
        resultImgs.imgs.forEach(function (img) {
            data.imgs.push('/files/images/' + path.basename(img));
        });
        return data
    });

};



// generate compact
exports.generate_compact = function (req, res, next) {
    checker.orderId(req.query.orderId);
    var orderId = req.query.orderId;
    var params  = '?orderId=' + orderId + '&action=get';

    request(api_config.getCompact + params, function (err, result) {
        if (err) return next(err);

        if (result) {
            var data = JSON.parse(result.body);

            var pageData = _.assign({}, {
                'pageTitle' : '签订电子合同',
                'orderId'   : orderId,
                'headerTit' : '签订电子合同'
            });

            if (data.success) {
                convertData(data.compact, ftlpath).then(function (result) {
                    pageData = _.assign(pageData, result);
                    return res.render('compact/blocks/compact', pageData);
                    //cache.set('compacts[' + orderId + ']', pageData, function () {
                    //
                    //});
                }).catch(next);
            } else {
                return res.render('compact/blocks/compact', pageData);
            }

        }
    })
};
