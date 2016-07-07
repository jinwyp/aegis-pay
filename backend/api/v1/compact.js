var request    = require('../../libs/request');
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


const uploadPath = config.file_path.root + config.file_path.compact + '/';
const adminUploadPath = config.file_path.adminroot + config.file_path.compact + '/';
const ejspath    = config.viewspdf +'/compact.ejs';
const uploadTmp = config.file_path.root + config.file_path.upload_tmp + '/';
const downloadPath = config.file_path.root + config.file_path.download;

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
            req.flash('file_id_'+req.session.user.id, newFile);
            res.send({'success' : true, 'attach' : [{'filename' : files.files.name, 'id' : newFile, url:'/api/thumbnail?t=' + new Date().getTime()}]})
        })

    });
};

exports.thumbnail = function(req, res, next){
    var fid = req.flash('file_id_'+req.session.user.id)[0];
    var path = uploadPath + fid;
    res.download(path, fid, function(err, data){
        if(err) {return next(err); }
    })
}
// del file
exports.delFile = function (req, res, next) {
    fs.unlink(uploadPath + req.body.id, function (err) {
        res.send({"success" : true});
    })
};

// sign compact
var delFile = function(path){
    if(!path) throw new Error('delFile need a path param');
    var pArr = [];
    _.isString(path) ? pArr.push(path) : '';
    _.isArray(path) ? (pArr=path) : '';

    var del = function(path){
         _.forEach(path, function(val, index){
            if(_.isArray(val)){
                del(val);
            }else{
                fs.unlink(val, function(err){
                    if(err) { throw new Error('del failed'); }
                })
            }
        })
    }
    del(path);
}

exports.signCompact = function (req, res, next) {
    var params     = req.body;

    var files = [];
    if(typeof params.file_id === 'string'){
        params.file_id = [params.file_id];
        params.file_name = [params.file_name];
    }
    _.forEach(params.file_id, function(id, index){
        files.push({'name': params.file_name[index], 'path':adminUploadPath + id});
    })

    params.files = files;
    _.unset(params, 'file_id');
    _.unset(params, 'file_name');

    request.post({url: api_config.signCompact, form:params, qsStringifyOptions:{allowDots:true}}, function (err, data) {
        if(err){ return next(err); }
        if (!err && data) {
            if(data.success){
                delFile([compactData.html, compactData.pdf, compactData.imgs]);
            }
            return res.send(JSON.parse(data.body));
        }
    })
};



// 接收service数据，转化数据为客户端需要的格式
var compactData = {};
var convertData = function (compactdata, compactejs, orderId) {
    var data = {
        'pdfpath' : '',
        'imgs' : []
    };

    return convert.ejs2html(compactdata, compactejs, {htmlname: path.basename(compactejs, '.ejs') + '-' + orderId}).then(function(resultHtml){
        compactData.html = resultHtml.htmlpath;
        console.log('resultHtml')
        console.log(resultHtml.htmlpath)
        return convert.html2pdf(resultHtml.htmlpath, {pdfpath: downloadPath+"/"})
    })
    .then(function(resultPDF){
        compactData.pdf = resultPDF.pdfpath;
        data.pdfpath = '/download/' + path.basename(resultPDF.pdfpath);
        console.log('resultPDF')
        console.log(resultPDF.pdfpath);
        return convert.pdf2image(resultPDF.pdfpath);
    })
    .then(function(resultImgs){
        compactData.imgs = resultImgs.imgs;
        resultImgs.imgs.forEach(function (img) {
            data.imgs.push('/files/images/' + path.basename(img));
        });
        return data;
    });
};


// generate compact
exports.generate_compact = function (req, res, next) {
    // checker.orderId(req.query.orderId);
    var orderId = req.query.orderId;
    var params  = '?orderId=' + orderId + "&userId=" + req.session.user.id;

    request(api_config.getCompact + params, function (err, result) {
        if (err) return next(err);

        if (result) {
            var data = JSON.parse(result.body);

            var pageData = _.assign({}, {
                'pageTitle' : '签订电子合同',
                'orderId'   : orderId,
                'headerTit' : '签订电子合同',
                'version': '',
                'imgs' : []
            });

            if (data.success) {
                convertData({data: data.data.contract}, ejspath, orderId).then(function (result) {
                    pageData = _.assign(pageData, {version: data.data.version}, result);

                    // cache.set('compacts[' + orderId + ']', pageData, function () {
                        return res.render('compact/blocks/compact', pageData);
                    // });
                }).catch(next);
            } else {
                return res.render('compact/blocks/compact', pageData);
            }

        }
    })
};

exports.compactpdf = function (req, res, next) {
    res.download(compactData.pdf, 'compact.pdf', function(err){
        if(err) return next(err);
    });
}

exports.compactimg = function (req, res, next) {
    var index = req.query.index;
    res.download(compactData.imgs[index], function(err){
        if(err) return next(err);
    });
}