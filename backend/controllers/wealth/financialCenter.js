/*
 *财务管理中心(个人中心) 页面
 *
 * */

var request = require('request');


// 处理业务逻辑
exports.financialCenter = function (req, res, next) {

    var content = {
        pageTitle   : "账户管理中心"
        
    };
    //渲染页面
    //res.render('global/header/financialCenterHeader',content);
    res.render('wealth/financialCenter',content);
};

