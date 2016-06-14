/*
 *账户设置 页面
 *
 * */


var request = require('request');
//var apiHost = 'http://server.180.com/';			// 模拟域名
// var path = require('path');
// var _ = require('lodash');
// var request    = require('request');
//
// var api_config = require('../api/v1/api_config');
var logger = require("../libs/logger");

// 处理业务逻辑
exports.accountSetting = function (req, res, next) {
    //头部
    var firstTab=req.query.firstTab==undefined?2:req.query.firstTab;
    var secondTab=req.query.secondTab==undefined?3:req.query.secondTab;
    // sideBar
    var accountSideBar = {
        current : "1",
        sideBarList : [
            {
                listName : '基本信息',
                listLink : 'accountSetting'
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
        accountSideBar :accountSideBar,
        tabObj : {
            firstTab : firstTab,
            secondTab : secondTab
        }
        // accountInfo    :source.accountInfo

    };


    logger.debug('获取到的结果是content----------------------------' + content);
    //渲染页面
    res.render('account/accountSetting',content);
};

