/*
 *财务管理中心(个人中心) 页面
 *
 * */

var request = require('request');
var api_config = require('../../api/v1/api_config');


// 处理业务逻辑
exports.financialCenter = function (req, res, next) {
    var firstTab=req.query.firstTab;
    var secondTab=req.query.;
    //if(firstTab==null){
    //    //homePage,accountPage,transactionPage,settlementPage,contractPage
    //    firstTab="accountPage";
    //    secondTab=1;
    //}else{
    //    firstTab=firstTab;
    //    if(firstTab=="accountPage"){
    //        secondTab=1;
    //    }else{
    //
    //    }
    //}
    var content = {
        pageTitle : "财务管理中心",
        headerTit : "财务管理中心",
        tabObj : {
            firstTab : firstTab,
            secondTab : secondTab
        }
    };
    //渲染页面
    //res.render('global/header/financialCenterHeader',content);
    res.render('wealth/financialCenter',content);
};

