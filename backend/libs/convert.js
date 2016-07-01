var fs   = require('fs');
var path = require('path');
var _    = require('lodash');

var archiver = require('archiver');
var pdf      = require('html-pdf');
var PDFImage = require("pdf-image").PDFImage;
var ejs      = require('ejs');
var config   = require('../config');
var utils    = require('./utils');
var logger   = require("./logger");

var __dirfiles = config.file_path.root;
var images_path = config.file_path.root + config.file_path.images + '/';
var html_path = config.file_path.root + config.file_path.html + '/';
var pdf_path = config.file_path.pdf + '/';
var zips_path = config.file_path.zips;


exports.pdf2image = function (pdfpath, options) {
    var imgname          = options && options.imgname || path.basename(pdfpath, '.pdf');
    var imgpath          = options && options.imgpath || images_path;
    var convertExtension = options && options.convertExtension || 'jpg';

    //if (!utils.isDirExistsSync(imgpath)) {
    //    fs.mkdirSync(imgpath);
    //}

    utils.makeDir(imgpath);

    return new Promise(function (resolve, reject) {

        var imageList   = [];
        var promiseList = [];

        var pdfImage = new PDFImage(pdfpath, {
            'outputDirectory'  : imgpath,
            'convertExtension' : convertExtension
        });

        pdfImage.numberOfPages().then(function (pages) {
            for (var i = 0; i < pages; i++) {
                var imgfile = imgpath + imgname + '-' + i + "." + convertExtension;
                imageList.push(imgfile);

                if (!utils.isFileExistsSync(imgfile)) {
                    promiseList.push(pdfImage.convertPage(i));
                }
            }

            if (promiseList.length > 0) {
                Promise.all(promiseList).then(function (result) {
                    resolve({'imgs' : imageList});
                }).catch(reject)
            } else {
                resolve({'imgs' : imageList});
            }
        }).catch(reject);
    })
};


exports.html2pdf = function (htmlpath, options) {

    var pdfname = options.pdfname || path.basename(htmlpath, '.html');
    var pdfpath = options.pdfpath || pdf_path;
    var pdffile = pdfpath + pdfname + '.pdf';
    var options = {format : 'Letter'};
    // if (!utils.isDirExistsSync(pdfpath)) {
    //    fs.mkdirSync(pdfpath);
    // }
    utils.makeDir(pdfpath);

    return new Promise(function (resolve, reject) {

        // if (utils.isFileExistsSync(pdffile)) {
        //     resolve({'pdfpath' : pdffile});
        // } else {
            fs.readFile(htmlpath, 'utf8', function (err, resultHtml) {
                if (err) reject(err);

                if (resultHtml) {
                    fs.writeFileSync(pdffile, '');
                    console.log('start-------------------------')
                    pdf.create(resultHtml, options).toFile(pdffile, function (err, resultPDF) {
                        console.log('-----------')
                        console.log(err)
                        if (!err) {
                            fs.stat(pdffile, function (err, stat) {
                                console.log('2222222222222222')
                                console.log(err)
                                if (err) reject(err);

                                if (stat && stat.isFile()) {
                                    resolve({'pdfpath' : pdffile});
                                } else {
                                    reject(err);
                                }
                            })
                        } else {
                            resolve({'pdfpath' : pdfpath});
                        }
                    });

                } else {
                    resolve({'pdfpath' : 'notfound.html'});
                }
            });
        // }
    })
};


exports.ejs2html = function (data, ejspath, options) {
    var htmlname = options && options.htmlname || path.basename(ejspath, '.ejs');

    var htmlpath = options && options.htmlpath || html_path;
    var htmlfile = htmlpath + htmlname + '.html';

    utils.makeDir(htmlpath);

    return new Promise(function (resolve, reject) {

        if (utils.isFileExistsSync(htmlfile)) {
            resolve({'htmlpath' : htmlfile});
        } else {
            ejs.renderFile(ejspath, data, function (err, resulthtml) {
                if (err) reject(err);

                if (resulthtml) {
                    fs.writeFile(htmlfile, resulthtml, 'utf-8', function (err) {
                        if (err) reject(err);
                        resolve({'htmlpath' : htmlfile});
                    });
                } else {
                    resolve({'htmlpath' : 'notfound.html'});
                }
            })
        }

    })
};


/**
 * 压缩文件
 *
 * @param options.type: zip/tar,  //default:zip
 * @param options.output: '输出路径', // default: __dirfiles + '/static/zips'
 * @param options.zipname: '压缩包名称', //默认：path最后一个路径名, 字符串或数组
 * @param options.path: 压缩文件路径, //必需参数，字符串或数组
 *
 */
exports.zipFile = function (options) {
    return new Promise(function (resolve, reject) {
        if (!options || !options.path) {
            // throw new Error('zipFile needs param path');
            reject('zipFile needs param path');
        }

        if (typeof options === 'string') {
            options = {path : [options]};
        }

        if (options && options.path && !_.isArray(options.path)) {
            options.path = [options.path];
        }

        var defaultOptions = {type : 'zip', output : zips_path};

        if (!options.zipname) {
            if (utils.isDirExistsSync(options.path[0])) {
                defaultOptions.zipname = _.last(_.split(options.path[0], path.sep)) + '.' + defaultOptions.type;
            } else {
                defaultOptions.zipname = path.basename(options.path[0], path.extname(options.path[0])) + '.' + defaultOptions.type;
            }
        }

        options = _.assign({}, defaultOptions, options || {});

        utils.makeDir(options.output);

        var archive = archiver(options.type, {});

        var output = fs.createWriteStream(options.output + '/' + options.zipname);

        archive.on('error', reject);

        output.on('close', function () {
            logger.debug(archive.pointer() + ' total bytes');
            logger.debug('archiver has been finalized and the output file descriptor has closed.');
            resolve(options.output + '/' + options.zipname);
        });


        archive.pipe(output);

        _.each(options.path, function (val) {
            if (utils.isDirExistsSync(val)) {
                archive.directory(val, val.replace(val, ''));
            } else if (utils.isFileExistsSync(val)) {
                archive.file(val, {name : path.basename(val)});
            }else{
                logger.debug('archiver nothing')
            }
        });
        archive.finalize();
    })
};
