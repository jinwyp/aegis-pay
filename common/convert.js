var fs = require('fs');
var path = require('path');
var pdf = require('html-pdf');
var PDFImage = require("pdf-image").PDFImage;
var ftl = require('node-ftl');

const __dirfiles = '/Users/beatacao/work/aegis-pay/';

exports.pdf2image = function(pdfpath){
  return new Promise(function(resolve, reject){
    var pdfImage = new PDFImage(pdfpath);
    var imgs = [];
    pdfImage.numberOfPages().then(function(pages){
      for(var i=0; i<pages; i++){
        (function(i){
          pdfImage.convertPage(i).then(function (imagePath) {
            fs.existsSync(__dirfiles + "static/compact-"+i+".png") // => true
            imgs.push(__dirfiles + "static/compact-"+i+".png");
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
    var pdfpath = __dirfiles + 'static/' + pdfname + '.pdf';
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

exports.ftl2html = function(data, ftlpath, htmlname){
  return new Promise(function(resolve, reject){
    ftl.processTemplate({
        data: data,
        settings: {
            encoding: 'utf-8',
            viewFolder: __dirfiles + 'static/html/';
        },
        filename: 'index.ftl'
    }).on('end', function(err, html) {
        fs.writeFileSync('index.html', html, 'utf8');
    });
  })
}
