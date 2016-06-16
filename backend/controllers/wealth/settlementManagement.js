/*
 *结算管理中心 发票中心页面
 *
 * */


var request = require('request');
//var apiHost = 'http://server.180.com/';			// 模拟域名
//var path = require('path');
//var _ = require('lodash');


// 处理业务逻辑
exports.settlementManagement = function (req, res, next) {

    //头部
    var firstTab=req.query.firstTab==undefined?4:req.query.firstTab;
    var secondTab=req.query.secondTab==undefined?2:req.query.secondTab;

    var accountSideBar = {
        current : "1",
        secCurrent:'',
        sideBarList : [
            {
                listName : '全部发票',
                listLink : '',
                secListName  :{
                    waitSettle:"待开票",
                    hadSettle:"已开票"
                }
            },
            {
                listName : '开票设置',
                listLink : '',
                secListName:''
            }
        ]
    };
    var content = {
        pageTitle   : "结算管理",
        headerTit   : "结算管理",
        tabObj         : {
            firstTab   : firstTab,
            secondTab  : secondTab
        },
        accountSideBar:accountSideBar,
        waitSettleNum:8,
        hadSettleNum:4,

    };
    //渲染页面
    res.render('wealth/settlementManagement',content);
};

