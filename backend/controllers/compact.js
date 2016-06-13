var cache   = require('../libs/cache');
var checker = require('../libs/datachecker');


// fetch compact
exports.compact = function (req, res, next) {

    checker.orderId(req.query.orderId);
    var orderId = req.query.orderId;

    // cache.del('compacts[' + orderId + ']');
    cache.get('compacts[' + orderId + ']', function (err, data) {
        if (err) return next(err);
        if (data) {
            return res.render('compact/compact', data);
        } else {
            var pageData = {
                pageTitle : '签订电子合同',
                orderId : orderId,
                headerTit : '签订电子合同',
                version: '',
                imgs : []
            };
            return res.render('compact/compact', pageData);
        }
    })
};
exports.compactDetail = function (req, res, next) {

    checker.orderId(req.query.id);
    var id = req.query.id;


};
