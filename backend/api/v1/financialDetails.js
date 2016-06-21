/**
 * Created by tttt on 6/16/16.
 */


var request    = require('request');

var checker    = require('../../libs/datachecker');
var api_config = require('./api_config');



exports.financialDetailsApi = function (req, res, next) {

    //checker.orderId(req.body.orderCategory);
    //checker.orderId(req.body.orderDateFrom);
    //checker.orderId(req.body.orderDateTo);
    //checker.orderId(req.body.orderSearchType);
    //checker.payPassword(req.body.orderSearchText);
    //checker.payPassword(req.body.currentPage);
    //checker.payPassword(req.body.limit);
    //checker.payPassword(req.body.skip);


    var body = req.body;
    console.log(body);

    var params = Object.assign({}, {userId: req.session.user.id}, body);

    var url = api_config.financialDetails;
    request.post(url, {body: params, json:true}, function (err, response, body) {

        if (err) return next(err);

        var result = response.body;
        if (response && result.success) {
            if (body.count){
                return res.json({count:result.data.length});
            }else{
                return res.json(result.data);
            }
        }else {
            return res.json([]);
        }
    })

};


