var request    = require('request');
var api_config = require('./api_config');
var _          = require('lodash');
var fs         = require('fs');
var formidable = require('formidable');
var uuid       = require('node-uuid');
var path       = require('path');
var config     = require('../../config');
var utils      = require('../../libs/utils');

var convert = require('../../libs/convert');
var cache   = require('../../libs/cache');
var checker = require('../../libs/datachecker');


const uploadPath = config.files_root + config.upload + '/';
const ejsTemplatePath    = path.join(__dirname, '../../views/global/compact.ejs');
const uploadTmp = config.files_root + config.upload_tmp;

exports.uploadFile = function (req, res, next) {
    utils.makeDir(uploadTmp);
    //api代理，去请求java接口
    var form = new formidable.IncomingForm();

    form.uploadDir = uploadTmp;
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
            res.send({'success' : true, 'attach' : [{'filename' : files.files.name, 'id' : newFile, url:'/files/upload/'+newFile}]})
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
    params.files = newids;
    _.unset(params, 'file_id');
    request.post(api_config.signCompact, {body:params, json:true}, function (err, data) {
        if (!err && data) {
            return res.send(data.body);
        }
    })
};






// 接收service数据，转化数据为客户端需要的格式
var convertData = function (compactdata, compactejs, orderId) {
    var data = {
        'pdfpath' : '',
        'imgs' : []
    };

    return convert.ejs2html(compactdata, compactejs, {htmlname: path.basename(compactejs, '.ejs') + '-' + orderId}).then(function(resultHtml){
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
    var params  = '?orderId=' + orderId + "&userId=" + req.session.user.id;

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
                convertData({data: data.data.compact}, ejsTemplatePath, orderId).then(function (result) {
                    pageData = _.assign(pageData, {version: data.data.version}, result);

                    cache.set('compacts[' + orderId + ']', pageData, function () {
                        return res.render('compact/blocks/compact', pageData);
                    });
                }).catch(next);
            } else {
                return res.render('compact/blocks/compact', pageData);
            }

        }
    })
};
