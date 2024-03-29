/*
 *账户设置 页面
 *
 * */


var request = require('../libs/request');
//var apiHost = 'http://server.180.com/';			// 模拟域名
// var path = require('path');
// var _ = require('lodash');
var api_config = require('../api/v1/api_config');
var logger = require("../libs/logger");
var SystemError = require('../errors/SystemError');


// 处理业务逻辑
exports.accountSetting = function (req, res, next) {

    var user = req.session.user;


    request({url : api_config.accountSetting+'?userId='+ user.id}, function (err, data) {

        if (err || data.statusCode != 200) {
            next(new SystemError());
            return;
        }
        
        //头部
        var firstTab=req.query.firstTab==undefined?2:req.query.firstTab;
        var secondTab=req.query.secondTab==undefined?3:req.query.secondTab;
        // sideBar
        var accountSideBar = {
            current : 1,
            sideBarList : [
                {
                    listName : '基本信息',
                    listLink : 'accountSetting',
                    secList:''
                },
                {
                    listName : '安全设置',
                    listLink : 'securitySetting',
                    secList:''
                }
            ]
        };
        
        if(data){
            var source = JSON.parse(data.body);
            var content = {
                headerTit      : "基本信息",
                pageTitle      : "账户设置",
                accountSideBar :accountSideBar,
                tabObj : {
                    firstTab : firstTab,
                    secondTab : secondTab
                },
                registerTime:   user.registertime,
                fundStatus:     source.data.fundStatus,
                cashAccount:    source.data.cashAccount
            };
            logger.debug('获取到的结果是content----------------------------' ,content);
            //渲染页面
            return res.render('account/accountSetting',content);
        }
    })

};

