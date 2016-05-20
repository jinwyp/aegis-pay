var request = require('request');
var co = require('co');
var path = require('path');
var convert = require('../common/convert');
var _ = require('lodash');
var cache = require('../common/cache');

var host = 'http://service.yimei180.com/';
var requestUrl = {
  /**
	 * fetch未盖章电子合同
	 * method: get
	 * params: {orderid: 1, action: 'get'}
	 */
	getCompact: host + 'compact',
	/**
	 * 提交已盖章电子合同
	 * method: post
	 * params: {orderid: 1, action: 'post', compact:'电子合同内容'}
	 */
	signCompact: host + 'compact'
}

// 接收service数据，转化数据为客户端需要的格式
var convertData = function(compactdata, compactftl){
  return co(function* (){
		var html = yield convert.ftl2html(compactdata, compactftl);
    var pdf = yield convert.html2pdf(html.htmlpath);
		console.log(pdf)
    var imgs = yield convert.pdf2image(pdf.pdfpath);
		console.log(imgs)
		var newImgs = [];
		_.forEach(imgs.imgs, function(img){
			newImgs.push('/static/images/'+path.basename(img));
		})
    return {'pdfpath':'/static/pdf/' + path.basename(pdf.pdfpath), 'imgs': newImgs};
  })
}
// fetch compact
exports.compact = function(req, res, next){
	var orderid = req.query.orderid;
  var params = '?orderid=' + orderid + '&action=get';
// cache.del('compacts['+ orderid + ']')
	cache.get('compacts['+ orderid + ']', function(err ,data){
		if(!err && data){
			console.log(data)
			return res.render('compact/compact', data);
		}else{
			request(requestUrl.getCompact + params, function(err, data){
		    if(!err){
					var data = JSON.parse(data.body);
					var ftlpath= '/Users/beatacao/work/aegis-pay/servicestatic/fs.ftl';
		      if(data.success){
		        convertData(data.compact, ftlpath).then(function(result){
							var pageData = _.assign({}, {'article':{'title':'签订电子合同'}, 'orderid':orderid, 'headerTit':'签订电子合同'}, result);
							cache.set('compacts['+orderid+']', pageData, function(){
								return res.render('compact/compact', pageData);
							});
		        })
		      }else{
		        // console.log(data.error);
		      }
		    }else{
		      // console.log(err);
		    }
		  })
		}
	})
}
