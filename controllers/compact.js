var cache = require('../common/cache');

// fetch compact
exports.compact = function(req, res, next){
	var orderid = req.query.orderid;

// cache.del('compacts['+ orderid + ']')
	cache.get('compacts['+ orderid + ']', function(err ,data){
		if(!err && data){
			return res.render('compact/compact', data);
		}else{
			var pageData = {'article':{'title':'签订电子合同'}, 'orderid':orderid, 'headerTit':'签订电子合同', 'imgs':[]};
			res.render('compact/compact', pageData);
		}
	})
}
