/*
 *结算管理中心 发票中心页面
 *
 * */


var request = require('request');
//var apiHost = 'http://server.180.com/';			// 模拟域名
var path = require('path');
var _ = require('lodash');
var api_config = require('../../api/v1/api_config');

// 处理业务逻辑
exports.billSetting = function (req, res, next) {

    //头部
    var firstTab=req.query.firstTab==undefined?4:req.query.firstTab;
    var secondTab=req.query.secondTab==undefined?2:req.query.secondTab;

    var accountSideBar = {
        current : "2",
        secCurrent:'',
        sideBarList : [
            {
                listName : '发票管理',
                listLink : 'billCenter',
                secList  :[
                    {
                        secListName:"全部发票",
                        secListLink:""
                    },
                    {
                        secListName:'待开票' ,
                        secListLink:""
                    },
                    {
                        secListName:'已开票',
                        secListLink:""
                    }
                ]
            },
            {
                listName : '开票设置',
                listLink : 'billSetting',
                secList:''
            }
        ]
    };

    request({url : api_config.billSetting}, function (err, data) {
        if (err) return next(err);

        if(data) {
            var source = JSON.parse(data.body);
            var content = {
                pageTitle: "结算管理",
                headerTit: "结算管理",
                tabObj: {
                    firstTab: firstTab,
                    secondTab: secondTab
                },
                accountSideBar: accountSideBar,
                waitSettleNum: 8,
                hadSettleNum: 4,
                "settleInfo":source.settleInfo

            };
            //渲染页面
            return res.render('settlement/billSetting', content);
        }
    })

};

