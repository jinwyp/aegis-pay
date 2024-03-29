/*
 *财务管理中心(个人中心) 页面
 *
 * */
var path    = require('path');
var request = require('../../libs/request');
var ejs     = require('ejs');
var pdf     = require('html-pdf');

var ejsHelper  = require('../../libs/ejshelper')({locals: {}});
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

        if (data) {
            var source = JSON.parse(data.body);
            var content = {
                pageTitle: "财务管理中心",
                headerTit: "财务管理中心",
                tabObj: {
                    firstTab: firstTab,
                    secondTab: secondTab
                },
                finance: {
                    companyName : '',
                    userFundAccount : '',
                    balanceMoney : 0,
                    cashBankAccount : '',
                    cashBankName : ''
                },
                recordList: [],
                error :''
            };

            if(source.success) {

                //渲染页面
                logger.debug('获取到的finance是----------------------------' + JSON.stringify(source.data.finance));
                logger.debug('获取到的recordList是----------------------------' + JSON.stringify(source.data.recordList));
                content.finance = source.data.finance;
                content.recordList = source.data.recordList;
                content.cashAccount = source.data.cashAccount;
                content.fundAccountStatus = source.data.fundAccountStatus;

                return res.render('wealth/financialCenterHome', content);
            }else{
                content.error = source.error;
                content.finance.userFundAccount = source.error;
                content.cashAccount = source.data.cashAccount;
                return res.render('wealth/financialCenterHome', content);
            }
        }

    });
};


// 检查是否绑定银行卡
exports.checkCashBank = function (req, res, next) {
    logger.debug('userId----------------------------' + req.session.user.id);
    request.post({url:api_config.checkCashBank,form:{userId:req.session.user.id}}, function (err, data) {
        if (err) return next(err);
        logger.debug('获取到的结果是----------------------------' + data.body);
        if (data) {
            var source=JSON.parse(data.body);
            res.send(source);
        }
    });
};


// 检查是否绑定银行卡
exports.checkDrawCash = function (req, res, next) {
    logger.debug('userId----------------------------' + req.session.user.id);
    request.post({url:api_config.checkDrawBank,form:{userId:req.session.user.id}}, function (err, data) {
        if (err) return next(err);
        logger.debug('获取到的结果是----------------------------' + data.body);
        if (data) {
            var source=JSON.parse(data.body);
            res.send(source);
        }
    });
};

// 买家删除
exports.buyerDelete = function (req, res, next) {
    logger.debug('userId----------------------------' + req.session.user.id);
    request.post({url:api_config.buyerDelete,form:{orderId:req.query.id,version:req.query.version,userId:req.session.user.id}}, function (err, data) {
        if (err) return next(err);
        logger.debug('获取到的结果是----------------------------' + data.body);
        if (data) {
            var source=JSON.parse(data.body);
            res.send(source);
        }
    });
};

// 卖家删除
exports.sellerDelete = function (req, res, next) {
    logger.debug('userId----------------------------' + req.session.user.id);
    request.post({url:api_config.sellerDelete,form:{orderId:req.query.id,version:req.query.version,userId:req.session.user.id}}, function (err, data) {
        if (err) return next(err);
        logger.debug('获取到的结果是----------------------------' + data.body);
        if (data) {
            var source=JSON.parse(data.body);
            res.send(source);
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
            {id:'3', value:'3', text:'销售', selected:false},
            {id:'4', value:'4', text:'采购', selected:false},
            {id:'5', value:'5', text:'验卡打款', selected:false},
            {id:'6', value:'6', text:'退款', selected:false},

            {id:'8', value:'8', text:'冻结', selected:false},
            {id:'9', value:'9', text:'解冻并支付', selected:false},
            {id:'10', value:'10', text:'解冻', selected:false},
            {id:'11', value:'11', text:'支付尾款', selected:false},
        ],
        formSelectOrderSearchType:[
            {id:'0', value:'0', text:'全部'},
            {id:'1', value:'1', text:'交易流水号'},
            {id:'2', value:'2', text:'对方账号名称'},
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
    checker.paymentStartDate(req.query.orderDateFromDownload, 'orderDateFromDownload');
    checker.paymentEndDate(req.query.orderDateToDownload, 'orderDateToDownload');


    if (req.query.filetype){

        var formData = {
            pagesize : 10000,
            userId: req.session.user.id
            //userId: 2719
        };

        if (req.query.orderDateFromDownload) formData.startDate = req.query.orderDateFromDownload;
        if (req.query.orderDateToDownload) formData.endDate = req.query.orderDateToDownload

        var url = api_config.financialDetails;

        request.post({url: url, form: formData, json:true}, function (err, response, body) {

            if (err) return next(err);

            if (response.statusCode === 200 && body.success) {

                body.data.payments.list.forEach(function(order){
                    //order.createDate = order.createDate.substr(0,4) + '.' + order.createDate.substr(4,2) + '.' + order.createDate.substr(6,2)
                    order.createDate = order.createDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");

                    if (!order.orderId){order.orderId = '-'}
                    if (order.loanFlag === 'D') { order.money = -order.money;}

                    if (order.type === 1){order.type = '充值'; }
                    if (order.type === 2){order.type = '提现'; }
                    if (order.type === 3){order.type = '销售'; order.type = order.type + ' 订单号:' + order.orderId;}
                    if (order.type === 4){order.type = '采购';  order.type = order.type + ' 订单号:' + order.orderId;}
                    if (order.type === 5){order.type = '验卡打款'; }
                    if (order.type === 6){order.type = '退款'; order.type = order.type + ' 订单号:' + order.orderId;}

                    if (order.type === 8){order.type = '冻结'; order.type = order.type + ' 订单号:' + order.orderId;}
                    if (order.type === 9){order.type = '解冻并支付'; order.type = order.type + ' 订单号:' + order.orderId;}
                    if (order.type === 10){order.type = '解冻'; order.type = order.type + ' 订单号:' + order.orderId;}
                    if (order.type === 11){order.type = '支付尾款'; order.type = order.type + ' 订单号:' + order.orderId;}
                });

                if (req.query.filetype === 'excel'){

                    var excelOptions = {
                        savePath : excelSavePath + '/financialdetails.xlsx',
                        titleList : [
                            '交易日期',
                            '交易流水号',
                            '金额',
                            '账户余额',
                            '摘要',
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

                    ejs.renderFile(pdfHtmlTemplatePath, {orderList:body.data.payments.list, helper:ejsHelper.locals}, function (err, resultHtml) {
                        if (err) return next(err);

                        var pdfOptions = {
                            "format" : "A4",
                            "orientation": "landscape"
                        };
                        var pdfFileName = pdfSavePath + '/financialdetails.pdf';

                        //return res.send(resultHtml);
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
    if (req.query.endDate) getQuery.endDate = req.query.endDate;
    if (req.query.status !== "#") getQuery.status = req.query.status;
    if (req.query.searchType) getQuery.searchType = req.query.searchType;
    if (req.query.content) getQuery.content = req.query.content.replace(/^\s+|\s+$/g,"");
    //if (req.query.content&&req.query.content.replace(/^\s+|\s+$/g,"")=="")
    //    getQuery.content = "";
    //else if(req.query.content)
    //    getQuery.content = req.query.content.replace(/\s+/g,"");

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

    var getQuery = {
        userId : req.session.user.id,
        //userId :  2719,
        page : req.query.page || 1,
        pagesize : 10
    };

    if (req.query.type) getQuery.type = req.query.type;
    if (req.query.startDate) getQuery.startDate = req.query.startDate;
    if (req.query.endDate) getQuery.endDate = req.query.endDate;
    if (req.query.content) getQuery.content = req.query.content.replace(/^\s+|\s+$/g,"");
    //if (req.query.content&&req.query.content.replace(/\s+/g,"")=="")
    //    getQuery.content = "";
    //else if(req.query.content)
    //    getQuery.content = req.query.content.replace(/\s+/g,"");

    request.post(
        {
            url:api_config.contractList,
            form: getQuery,
            json:true
        },
        function (err, response, body) {
            if (err) return next(err);

            var content = {
                pageTitle: "合同管理",
                headerTit: "合同管理",
                tabObj: {
                    firstTab: firstTab,
                    secondTab: secondTab
                },

                pagesize : 10,
                page : 1,
                count : 10,

                startDate: '',
                endDate: '',
                type: '',
                content: '',
                contractList: []
            };

            if (response.statusCode === 200 && body.success) {

                content.startDate= body.data.contract.startDate;
                content.endDate= body.data.contract.endDate;
                content.type= body.data.contract.type;
                content.content= body.data.contract.content;
                content.contractList= body.data.contract.list;

                content.pagesize = body.data.contract.pagesize;
                content.page = body.data.contract.page;
                content.count = body.data.contract.count;

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

    var getQuery = {
        userId : req.session.user.id,
        //userId :  2719,
        page : req.query.page || 1,
        pagesize : 10
    };

    if (req.query.startDate) getQuery.startDate = req.query.startDate;
    if (req.query.endDate) getQuery.endDate = req.query.endDate;
    if (req.query.searchType) getQuery.searchType = req.query.searchType;
    if (req.query.content) getQuery.content = req.query.content.replace(/^\s+|\s+$/g,"");
    //if (req.query.content&&req.query.content.replace(/\s+/g,"")=="")
    //    getQuery.content = "";
    //else if(req.query.content)
    //    getQuery.content = req.query.content.replace(/\s+/g,"");


    request.post(
        {
            url:api_config.settlementList,
            form: getQuery,
            json:true
        },
        function (err, response, body) {
            if (err) return next(err);

            var content = {
                pageTitle: "结算管理",
                headerTit: "结算管理",

                tabObj: {
                    firstTab: firstTab,
                    secondTab: secondTab
                },

                pagesize : 10,
                page : 1,
                count : 10,

                startDate: '',
                endDate: '',
                searchType: '',
                content: '',
                settlementList: []
            };

            if (response.statusCode === 200 && body.success) {
                content.startDate= body.data.settleOrder.startDate;
                content.endDate= body.data.settleOrder.endDate;
                content.searchType= body.data.settleOrder.searchType;
                content.content= body.data.settleOrder.content;
                content.settlementList= body.data.settleOrder.list;

                content.pagesize = body.data.settleOrder.pagesize;
                content.page = body.data.settleOrder.page;
                content.count = body.data.settleOrder.count;

                return res.render('wealth/settlementList',content);
            }else{
                return res.render('wealth/settlementList',content);
            }

    });

};
