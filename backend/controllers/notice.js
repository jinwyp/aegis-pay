/*
 *账户设置 页面
 *
 * */


var request = require('request');
//var apiHost = 'http://server.180.com/';			// 模拟域名
//var path = require('path');
//var _ = require('lodash');


// 处理业务逻辑
exports.notice = function (req, res, next) {
    //  数据模拟
    var statusObj = {
        step     : 2,
        total    : 3,
        stepList : [
            {
                stepName : '退款发往银行',
                stepDate : '2016-05-11 01:02:36'
            },
            {
                stepName : '银行受理',
                stepDate : '2016-05-12 01:02:36'
            },
            {
                stepName : '银行已入账',
                stepDate : '2016-05-13 01:02:36'
            }
        ]
    };
    // sideBar
    var accountSideBar = {
        current : "3",
        sideBarList : [
            {
                listName : '基本信息',
                listLink : 'accountSetting'
            },
            {
                listName : '安全设置',
                listLink : ''
            },
            {
                listName : '消息提醒',
                listLink : 'notice'
            }
        ]
    };

    var content = {
        headerTit      : "消息提醒",
        pageTitle      : "消息提醒",
        accountSideBar : accountSideBar,
        statusObj      : statusObj

    };
    //渲染页面
    res.render('account/notice',content);
};

