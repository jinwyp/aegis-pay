/**
 * Created by JinWYP on 6/16/16.
 */


var request    = require('../../libs/request');

var checker    = require('../../libs/datachecker');
var api_config = require('./api_config');

var ejsHelper  = require('../../libs/ejshelper')({locals: {}});



exports.financialDetailsApi = function (req, res, next) {

    //checker.orderId(req.body.orderCategory);
    //checker.orderId(req.body.orderDateFrom);
    //checker.orderId(req.body.orderDateTo);
    //checker.orderId(req.body.orderSearchType);
    //checker.payPassword(req.body.orderSearchText);
    //checker.payPassword(req.body.currentPage);
    //checker.payPassword(req.body.limit);

    var postBody = {
        userId : req.session.user.id,
        //userId :  2719,
        page : req.body.currentPage || 1,
        pagesize : 10
    };

    if (req.body.orderDateFrom) postBody.startDate = req.body.orderDateFrom;
    if (req.body.orderDateTo) postBody.startDate = req.body.endDate;
    if (req.body.orderCategory) postBody.type = req.body.orderCategory;
    if (req.body.orderSearchType) postBody.searchType = req.body.orderSearchType;
    if (req.body.orderSearchText) postBody.searchContent = req.body.orderSearchText;


    var url = api_config.financialDetails;
    request.post({url:url, form:postBody, json:true}, function (err, response, body) {

        if (err) return next(err);

        if (response.statusCode === 200 && body.success) {

            body.data.payments.list.forEach(function(order){
                //order.createDate = order.createDate.substr(0,4) + '.' + order.createDate.substr(4,2) + '.' + order.createDate.substr(6,2)
                order.createDate = order.createDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1.$2.$3");
                
                if (order.type === 1){order.type = '充值'}
                if (order.type === 2){order.type = '提现'; order.money = -order.money;}
                if (order.type === 3){order.type = '销售'}
                if (order.type === 4){order.type = '采购'; order.money = -order.money;}

            });

            return res.json(body.data.payments);
        }else {
            return res.json([]);
        }
    });

};


exports.financialDetailsPrintApi = function (req, res, next) {

    //checker.payPassword(req.query.fundAccount);
    //checker.payPassword(req.query.printCode);

    var getQuery = {
        userId : req.session.user.id,
        //userId :  2719,
        fundAccount : req.query.fundAccount,
        printCode : req.query.printCode
    };


    var url = api_config.financialDetailsPrint ;
    request.get({url:url, qs:getQuery, json:true}, function (err, response, body) {

        if (err) return next(err);

        if (response.statusCode === 200 && body.success) {
            return res.json(body);
        }else {
            return res.json([]);
        }
    });

};
