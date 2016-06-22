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


    var postBody = req.body;
    var params = Object.assign({}, {userId: req.session.user.id}, postBody);

    var url = api_config.financialDetails;
    request.post(url, {body: params, json:true}, function (err, response, body) {

        if (err) return next(err);

        if (response.statusCode === 200 && body.success) {
            if (postBody.count){
                return res.json({count:body.data.length});
            }else{
                return res.json(body.data);
            }
        }else {
            return res.json([]);
        }
    })

};


