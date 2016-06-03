var fs       = require('fs');
var path     = require('path');
var pdf      = require('html-pdf');
var PDFImage = require("pdf-image").PDFImage;
var ftl      = require('node-ftl');
var config   = require('../config');

const __dirfiles = config.sysFileDir;



function isDirExistsSync(dirPath) {
    try {
        return fs.statSync(dirPath).isDirectory();
    } catch (e) {
        if (e.code === 'ENOENT') {
            return false;
        } else {
            throw e;
        }
    }
}

function isFileExistsSync(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (e) {
        if (e.code === 'ENOENT') {
            return false;
        } else {
            throw e;
        }
    }
}


exports.pdf2image = function (pdfpath, options) {
    var imgname          = options && options.imgname || path.basename(pdfpath, '.pdf');
    var imgpath          = options && options.imgpath || path.join(__dirfiles, 'static/images/');
    var convertExtension = options && options.convertExtension || 'jpg';
    console.log('------', pdfpath);
    if (!isDirExistsSync(imgpath)) {
        fs.mkdirSync(imgpath);
    }

    return new Promise(function (resolve, reject) {

        var imageList = [];
        var pdfImage = new PDFImage(pdfpath, {
            'outputDirectory'  : imgpath,
            'convertExtension' : convertExtension
        });


        pdfImage.numberOfPages().then(function (pages) {
            for (var i = 0; i < pages; i++) {

                var imgfile = imgpath + imgname + '-' + i + "." + convertExtension;
                var promiseList = [];

                if (!isFileExistsSync(imgfile)){
                    //promiseList.push(pdfImage.convertPage(i));
                }
                //imageList.push(imgfile);

                if (promiseList.length > 0){
                    Promise.all(promiseList).then(function(result){
                        console.log(result);
                        resolve({'imgs' : imageList});
                    }).catch(reject)
                }else{
                    resolve({'imgs' : imageList});
                }
            }
        }).catch(reject);
    })
};



exports.html2pdf = function (htmlpath, pdfname) {

    var pdfname = pdfname || path.basename(htmlpath, '.html');
    var pdfpath = path.join(__dirfiles, 'static/pdf/');
    var pdffile = pdfpath + pdfname + '.pdf';
    var options = {format : 'Letter'};

    //if (!isDirExistsSync(pdfpath)) {
    //    fs.mkdirSync(pdfpath);
    //}


    return new Promise(function (resolve, reject) {

        if (isFileExistsSync(pdffile)){
            resolve({'pdfpath' : pdffile});
        }else{

            fs.readFile(htmlpath, 'utf8', function(err, resultHtml){
                //if (err) resolve(err);

                if (resultHtml){

                    pdf.create(resultHtml, options).toFile(pdfpath, function(err, resultPDF) {
                        if(err){
                            console.log("-----PDF ERR:", resultPDF);
                            resolve({'pdfpath' : 'notfound.html'});
                            fs.stat(pdfpath, function(err, stat){
                                if(stat && stat.isFile()){
                                    resolve({'pdfpath':pdfpath});
                                }else{
                                    reject(err);
                                }
                            })
                        }else{
                            console.log("-----PDF SUCCESS", resultPDF);
                            resolve({'pdfpath':pdfpath});
                        }
                    });



                    //pdf.create(resultHtml, options).toFile(pdffile, function (err, resultPDF) {
                    //    //console.log(typeof err)
                    //    //console.log( JSON.stringify(err))
                    //
                    //    if (resultPDF) {
                    //        console.log("-----PDF11:", resultPDF);
                    //        resolve({'pdfpath' : pdffile});
                    //    }else {
                    //        //if (err) {reject(err)};  // here is bug for err , err should be null but here is {}
                    //
                    //        console.log("-----PDF22:", resultPDF);
                    //        resolve({'pdfpath' : 'notfound.pdf'});
                    //    }
                    //});
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

    if (!isDirExistsSync(htmlpath)) {
        fs.mkdirSync(htmlpath);
    }

    return new Promise(function (resolve, reject) {

        if (isFileExistsSync(htmlfile)){
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
