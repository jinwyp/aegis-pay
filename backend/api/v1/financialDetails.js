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

    var postBody = {
        //userId : req.session.user.id,
        userId :  2719,
        page : req.body.currentPage || 1
    };

    if (req.body.orderDateFrom) postBody.startDate = req.body.orderDateFrom;
    if (req.body.orderDateTo) postBody.startDate = req.body.endDate;
    if (req.body.orderCategory) postBody.type = req.body.orderCategory;
    if (req.body.orderSearchType) postBody.searchType = req.body.orderSearchType;
    if (req.body.orderSearchText) postBody.searchContent = req.body.orderSearchText;


    var url = api_config.financialDetails;
    request.post({url:url, form:params, json:true}, function (err, response, body) {

        if (err) return next(err);

        if (response.statusCode === 200 && body.success) {
            return res.json(body.data.payments);
        }else {
            return res.json([]);
        }
    });

};
