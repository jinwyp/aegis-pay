/*
 *财务管理中心(个人中心) 页面
 *
 * */
var path    = require('path');
var request = require('../../libs/request');
var ejs     = require('ejs');
var pdf     = require('html-pdf');

var excel      = require("../../libs/excel");
var api_config = require('../../api/v1/api_config');
var checker    = require('../../libs/datachecker');

var logger     = require("../../libs/logger");
var utils      = require('../../libs/utils');
var config     = require('../../config');

var excelSavePath = path.join(config.file_path.root, config.file_path.upload, '/financial-details');
utils.makeDir(excelSavePath);

var pdfSavePath = path.join(config.file_path.root, config.file_path.upload, '/financial-details');
var pdfHtmlTemplatePath = path.join(config.viewspdf, '/financialDetails/pdftemplate.ejs');







// 处理业务逻辑
exports.financialHome = function (req, res, next) {
    var firstTab  = req.query.firstTab || 1;
    var secondTab = req.query.secondTab || 1;
    logger.debug('userId----------------------------' + req.session.user.id);
    request.post({url:api_config.financialCenterHome,form:{userId:req.session.user.id}}, function (err, data) {
        if (err) return next(err);
        logger.debug('获取到的错误是----------------------------' + err);
        logger.debug('获取到的结果是----------------------------' + data.body);
        if (data) {
            var source = JSON.parse(data.body);
            if(source.success) {
                var content = {
                    pageTitle: "财务管理中心",
                    headerTit: "财务管理中心",
                    tabObj: {
                        firstTab: firstTab,
                        secondTab: secondTab
                    },
                    finance: source.data.finance,
                    recordList: source.data.recordList
                };
                //渲染页面
                logger.debug('获取到的finance是----------------------------' + JSON.stringify(source.data.finance));
                logger.debug('获取到的recordList是----------------------------' + JSON.stringify(source.data.recordList));
                res.render('wealth/financialCenterHome', content);
            }else{
                res.send(source.error);
            }
        }

    });
};





exports.financialDetails = function (req, res, next) {
    checker.menuTab(req.query.firstTab);
    checker.menuTab(req.query.secondTab);

    var category  = req.query.category || 0;

    var firstTab  = req.query.firstTab || 2;
    var secondTab = req.query.secondTab || 2;
    var content = {
        pageTitle : "财务管理中心 - 收支明细",
        headerTit : "财务管理中心 - 收支明细",
        tabObj : {
            firstTab : firstTab,
            secondTab : secondTab
        },
        userFundAccount : '',
        formSelectOrderCategory:[
            {id:'0', value:'0', text:'全部', selected:false},
            {id:'1', value:'1', text:'充值', selected:false},
            {id:'2', value:'2', text:'提现', selected:false},
            {id:'3', value:'3', text:'采购', selected:false},
            {id:'4', value:'4', text:'销售', selected:false}
        ],
        formSelectOrderSearchType:[
            {id:'1', value:'1', text:'交易流水号'},
            {id:'2', value:'2', text:'对方账户名称'},
            {id:'3', value:'3', text:'订单号'}
        ]
    };

    if (category) {
        content.formSelectOrderCategory[category].selected = true;
    }

    var url = api_config.financialDetailsAccount;
    var formData = {
        userId: req.session.user.id
        //userId: 2719
    };
    request.post({url:url, form:formData, json:true}, function (err, response, body) {

        if (err) return next(err);

        if (response.statusCode === 200 && body.success) {

            //if (body.data.payments.typeList.length > 0){
            //    body.data.payments.typeList.forEach(function(tradeType){
            //        content.formSelectOrderCategory.push({
            //            value : tradeType.sequence,
            //            text : tradeType.name
            //        })
            //    })
            //}

            content.userFundAccount = body.data.payments.userFundAccount;
            return res.render('wealth/financialDetails',content);
        }else {
            return res.render('wealth/financialDetails',content);
        }
    })

};






exports.financialDetailsToExcelAndPDF = function (req, res, next) {
    checker.paymentStartDate(req.query.orderDateFromDownload);
    checker.paymentStartDate(req.query.orderDateToDownload);


    if (req.query.filetype){

        var formData = {
            userId: req.session.user.id
            //userId: 2719
        };

        if (req.query.orderDateFromDownload) formData.startDate = req.query.orderDateFromDownload;
        if (req.query.orderDateToDownload) formData.endDate = req.query.orderDateToDownload

        var url = api_config.financialDetails;

        request.post({url: url, form: formData, json:true}, function (err, response, body) {

            if (err) return next(err);

            if (response.statusCode === 200 && body.success) {

                if (req.query.filetype === 'excel'){

                    var excelOptions = {
                        savePath : excelSavePath + '/financialdetails.xlsx',
                        titleList : [
                            '交易日期',
                            '交易流水号',
                            '金额',
                            '账户余额',
                            '交易类型',
                            '对方账号',
                            '对方账号名称'
                        ],
                        propertyList : [
                            'createDate',
                            'transactionNO',
                            'money',
                            'balanceMoney',
                            'type',
                            'otherFundAccount',
                            'otherCompanyName'
                        ],
                        dataList : body.data.payments.list
                    };

                    excel(excelOptions);
                    return res.download(excelOptions.savePath);

                }else if (req.query.filetype === 'pdf'){

                    ejs.renderFile(pdfHtmlTemplatePath, {orderList:body.data.payments.list}, function (err, resultHtml) {
                        if (err) return next(err);

                        var pdfOptions = {format : 'Letter'};
                        var pdfFileName = pdfSavePath + '/financialdetails.pdf';

                        pdf.create(resultHtml, pdfOptions).toFile(pdfFileName, function (err, resultPDF) {
                            if (err) return next(err);

                            return res.download(pdfFileName);
                        });

                    });
                }else {
                    return res.json([]);
                }


            }else {
                return res.json([]);
            }
        });
    }else{
        return res.json([]);
    }

};




exports.financialTransaction = function (req, res, next) {

    var firstTab  = req.query.firstTab || 3;
    var secondTab = req.query.secondTab || 1;


    var getQuery = {
        userId : req.session.user.id,
        //userId :  2719,
        page : req.query.page || 1,
        pagesize : 10
    };

    if (req.query.type) getQuery.type = req.query.type;
    if (req.query.startDate) getQuery.startDate = req.query.startDate;
    if (req.query.endDate) getQuery.startDate = req.query.endDate;
    if (req.query.status) getQuery.status = req.query.status;
    if (req.query.searchType) getQuery.searchType = req.query.searchType;
    if (req.query.content) getQuery.content = req.query.content;

    request.post({
        url  : api_config.financialTransaction,
        form : getQuery,
        json : true
    }, function (err, response, body) {
        if (err) return next(err);

        var content = {
            pageTitle: "交易管理",
            headerTit: "交易管理",

            tabObj: {
                firstTab: firstTab,
                secondTab: secondTab
            },
            pagesize : 10,
            page : 1,
            count : 10,

            type: 0,
            startDate: '',
            endDate: '',
            status: '',
            searchType: 0,
            content: '',
            statusList: {},
            recordList: []
        };

        if(response.statusCode === 200 && body.success) {

            content.type = body.data.transactionRecord.type;
            content.startDate = body.data.transactionRecord.startDate;
            content.endDate = body.data.transactionRecord.endDate;
            content.status = body.data.transactionRecord.status;
            content.searchType = body.data.transactionRecord.searchType;
            content.statusList = body.data.transactionRecord.statusList;
            content.recordList = body.data.transactionRecord.list;

            content.pagesize = body.data.transactionRecord.pagesize;
            content.page = body.data.transactionRecord.page;
            content.count = body.data.transactionRecord.count;

            return res.render('wealth/transactionRecord',content);
        }else{
            return res.render('wealth/transactionRecord',content);
        }
    });
};




exports.financialContract = function (req, res, next) {

    var firstTab  = req.query.firstTab || 5;
    var secondTab = req.query.secondTab || 1;
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;
    var type = req.query.type;
    var content = req.query.content;
    logger.debug('获取到的userId是----------------------------' + req.session.user.id);
    logger.debug("获取到的表单数据是：startDate=="+startDate+" endDate=="+endDate+" type=="+type+" content=="+content);

    request.post(
        {
            url:api_config.contractList,
            form: {
                userId:req.session.user.id,
                startDate:startDate,
                endDate:endDate,
                type:type,
                content:content
            },
            json:true
        },
        function (err, response, body) {
            if (err) return next(err);

            logger.debug('获取到的错误是----------------------------' + err);
            logger.debug('获取到的结果是----------------------------' + body);


            var content = {
                pageTitle: "合同管理",
                headerTit: "合同管理",
                tabObj: {
                    firstTab: firstTab,
                    secondTab: secondTab
                },
                startDate: [],
                endDate: [],
                type: [],
                content: [],
                contractList: []
            };

            if (response.statusCode === 200 && body.success) {

                content.startDate= body.data.contract.startDate;
                content.endDate= body.data.contract.endDate;
                content.type= body.data.contract.searchType;
                content.content= body.data.contract.content;
                content.contractList= body.data.contract.list;

                //渲染页面
                return res.render('wealth/contractList',content);
            }else {
                return res.render('wealth/contractList',content);
            }
        }
    );

};

exports.financialSettlement = function (req, res, next) {

    var firstTab  = req.query.firstTab || 4;
    var secondTab = req.query.secondTab || 1;
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;
    var searchType = req.query.searchType;
    var content = req.query.content;
    request.post(
        {
            url:api_config.settlementList,
            form: {
                userId:req.session.user.id,
                startDate:startDate,
                endDate:endDate,
                searchType:searchType,
                content:content
            }
        }
        , function (err, data) {
        if (err) return next(err);
        logger.debug('获取到的错误是----------------------------' + err);
        logger.debug('获取到的结果是----------------------------' + data.body);
        if (data) {
            var source = JSON.parse(data.body);
            if(source.success) {
                var content = {
                    pageTitle: "结算管理",
                    headerTit: "结算管理",
                    tabObj: {
                        firstTab: firstTab,
                        secondTab: secondTab
                    },
                    startDate: source.data.settleOrder.startDate,
                    endDate: source.data.settleOrder.endDate,
                    searchType: source.data.settleOrder.searchType,
                    content: source.data.settleOrder.content,
                    settlementList: source.data.settleOrder.list
                };
                //渲染页面
                logger.debug('获取到的settlementList结果是----------------------------' + JSON.stringify(source.data.settleOrder.list));
                res.render('wealth/settlementList',content);
            }
        }
    });

};
