var fs       = require('fs');
var path     = require('path');
var archiver = require('archiver');
var pdf      = require('html-pdf');
var PDFImage = require("pdf-image").PDFImage;
var ftl      = require('node-ftl');
var config   = require('../config');
var _ = require('lodash');
var utils = require('./utils');

var __dirfiles = config.sysFileDir;




exports.pdf2image = function (pdfpath, options) {
    var imgname          = options && options.imgname || path.basename(pdfpath, '.pdf');
    var imgpath          = options && options.imgpath || path.join(__dirfiles, 'static/images/');
    var convertExtension = options && options.convertExtension || 'jpg';

    //if (!utils.isDirExistsSync(imgpath)) {
    //    fs.mkdirSync(imgpath);
    //}

    utils.makeDir(imgpath);

    return new Promise(function (resolve, reject) {

        var imageList = [];
        var promiseList = [];

        var pdfImage = new PDFImage(pdfpath, {
            'outputDirectory'  : imgpath,
            'convertExtension' : convertExtension
        });

        pdfImage.numberOfPages().then(function (pages) {
            for (var i = 0; i < pages; i++) {
                var imgfile = imgpath + imgname + '-' + i + "." + convertExtension;
                imageList.push(imgfile);

                if (!utils.isFileExistsSync(imgfile)){
                    promiseList.push(pdfImage.convertPage(i));
                }
            }

            if (promiseList.length > 0){
                Promise.all(promiseList).then(function(result){
                    resolve({'imgs' : imageList});
                }).catch(reject)
            }else{
                resolve({'imgs' : imageList});
            }
        }).catch(reject);
    })
};



exports.html2pdf = function (htmlpath, pdfname) {

    var pdfname = pdfname || path.basename(htmlpath, '.html');
    var pdfpath = path.join(__dirfiles, 'static/pdf/');
    var pdffile = pdfpath + pdfname + '.pdf';
    var options = {format : 'Letter'};

    //if (!utils.isDirExistsSync(pdfpath)) {
    //    fs.mkdirSync(pdfpath);
    //}

    utils.makeDir(pdfpath);

    return new Promise(function (resolve, reject) {

        if (utils.isFileExistsSync(pdffile)){
            resolve({'pdfpath' : pdffile});
        }else{
            fs.readFile(htmlpath, 'utf8', function(err, resultHtml){
                if (err) reject(err);

                if (resultHtml){

                    pdf.create(resultHtml, options).toFile(pdffile, function(err, resultPDF) {
                        if(err){
                            fs.stat(pdffile, function(err, stat){
                                if (err) reject(err);

                                if(stat && stat.isFile()){
                                    resolve({'pdfpath':pdffile});
                                }else{
                                    reject(err);
                                }
                            })
                        }else{
                            resolve({'pdfpath':pdfpath});
                        }
                    });

                }else{
                    resolve({'pdfpath' : 'notfound.html'});
                }
            });
        }
    })
};



exports.ftl2html = function (data, ftlpath, options) {
    var htmlname = options && options.htmlname || path.basename(ftlpath, '.ftl');

    var htmlpath = options && options.htmlpath || path.join(__dirfiles, 'static/html/');
    var htmlfile = htmlpath + htmlname + '.html';

    //if (!utils.isDirExistsSync(htmlpath)) {
    //    fs.mkdirSync(htmlpath);
    //}

    utils.makeDir(htmlpath);

    return new Promise(function (resolve, reject) {

        if (utils.isFileExistsSync(htmlfile)){
            resolve({'htmlpath' : htmlfile});
        }else{
            ftl.processTemplate({
                data     : data,
                settings : {
                    encoding   : 'utf-8',
                    viewFolder : path.dirname(ftlpath) + '/'
                },
                filename : path.basename(ftlpath)

            }).on('end', function (err, resultHtml) {
                if (err) reject(err);

                if (resultHtml) {
                    fs.writeFile(htmlfile, resultHtml, 'utf-8', function(err){
                        if (err) reject(err);
                        resolve({'htmlpath' : htmlfile});
                    });

                }else{
                    resolve({'htmlpath' : 'notfound.html'});
                }
            });
        }

    })

};







/**
 * 压缩文件
 *
 * @param type: zip/tar,  //default:zip
 * @param output: '输出路径', // default: __dirfiles + '/static/zips'
 * @param zipname: '压缩包名称', //默认：path最后一个路径名, 字符串或数组
 * @param path: 压缩文件路径, //必需参数，字符串或数组
 *
 */
exports.zipFile = function(options){
    var self = this;
    return new Promise(function(resolve, reject){
        if(!options || !options.path){
            // throw new Error('zipFile needs param path');
            reject('zipFile needs param path');
        }

        if(typeof options === 'string'){
            options = {path: [options]};
        }

        if(options && options.path && !_.isArray(options.path)){
            options.path = [options.path];
        }

        self.default = {type:'zip', output: __dirfiles + '/static/zips'};

        if(!options.zipname){
            if(fs.statSync(options.path[0]).isDirectory()){
                self.default.zipname = _.last(_.split(options.path[0], path.sep)) + '.' + self.default.type;
            }else if(fs.statSync(options.path[0]).isFile()){
                self.default.zipname = path.basename(options.path[0], path.extname(options.path[0])) + '.' + self.default.type;
            }
        }

        self.options = _.assign({}, self.default, options||{});

        utils.makeDir(self.options.output);

        var archive = archiver(self.options.type);

        var output = fs.createWriteStream(self.options.output + '/' + self.options.zipname);

        archive.on('error', function(err) {
            // throw new Error('archiver error');
            reject('archiver error')
        });

        output.on('close', function() {
          console.log(archive.pointer() + ' total bytes');
          console.log('archiver has been finalized and the output file descriptor has closed.');
          resolve(self.options.output + '/' + self.options.zipname);
        });

        archive.on('error', function(err) {
        //   throw err;
            reject(err);
        });

        archive.pipe(output);

        _.map(self.options.path, function(val, index){
            console.log(val)
            if(fs.statSync(val).isDirectory()){
                archive.directory(val, val.replace(val, ''));
            }else if(fs.statSync(val).isFile()){
                console.log(1111)
                archive.file(val, { name:  path.basename(val)});
            }
        })
        archive.finalize();
    })
};
