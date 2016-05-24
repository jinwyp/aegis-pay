var fs = require('fs');
var path = require('path');
var pdf = require('html-pdf');
var PDFImage = require("pdf-image").PDFImage;
var ftl = require('node-ftl');
var config = require('../config');

const __dirfiles = config.sysFileDir;

exports.pdf2image = function(pdfpath, options){
  var imgname = options&&options.imgname || path.basename(pdfpath, '.pdf');
  var convertExtension = options&&options.convertExtension || 'jpg';
  var imgpath = options&&options.imgpath || __dirfiles + 'static/images/';
  return new Promise(function(resolve, reject){
    var pdfImage = new PDFImage(pdfpath, {
      'outputDirectory':imgpath,
      'convertExtension':convertExtension}
    );
    var imgs = [];
    pdfImage.numberOfPages().then(function(pages){
      for(var i=0; i<pages; i++){
        (function(i){
          pdfImage.convertPage(i).then(function() {
            imgs.push(imgpath + imgname + '-' + i + "." + convertExtension);
            if(imgs.length>=pages) resolve({'imgs':imgs});
          });
        })(i)
      }
    });
  })
}

exports.html2pdf = function(htmlpath, pdfname){
  return new Promise(function(resolve, reject){
    var html = fs.readFileSync(htmlpath, 'utf8');
    var options = { format: 'Letter' };
    var pdfname = pdfname || path.basename(htmlpath, '.html');
    var pdfpath = __dirfiles + 'static/pdf/' + pdfname + '.pdf';
    pdf.create(html, options).toFile(pdfpath, function(err, res) {
      if(err){
        fs.stat(pdfpath, function(err, stat){
          if(stat && stat.isFile()){
            resolve({'pdfpath':pdfpath});
          }else{
            reject(err);
          }
        })
      }else{
        resolve({'pdfpath':pdfpath});
      }
    });
  })
}

exports.ftl2html = function(data, ftlpath, options){
  var htmlname = options&&options.htmlname || path.basename(ftlpath, '.ftl');
  var htmlpath = options&&options.htmlpath || __dirfiles + 'static/html/';

  return new Promise(function(resolve, reject){
    ftl.processTemplate({
        data: data,
        settings: {
            encoding: 'utf-8',
            viewFolder: path.dirname(ftlpath) + '/'
        },
        filename: path.basename(ftlpath)
    }).on('end', function(err, html) {
      if(!err){
        var htmlfile = htmlpath + htmlname + '.html';
        fs.writeFileSync(htmlfile, html, 'utf-8');
        resolve({'htmlpath':htmlfile});
      }else{
        reject(err);
      }
    });
  })
}
