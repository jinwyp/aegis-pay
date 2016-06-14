/*
 *账户设置 页面
 *
 * */


var request = require('request');
//var apiHost = 'http://server.180.com/';			// 模拟域名
//var path = require('path');
//var _ = require('lodash');


// 处理业务逻辑
exports.accountSetting = function (req, res, next) {

    // sideBar
    var accountSideBar = {
        current : "1",
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
        headerTit      : "基本信息",
        pageTitle      : "账户设置",
        accountSideBar :accountSideBar

    };
    //渲染页面
    res.render('account/accountSetting',content);
};

