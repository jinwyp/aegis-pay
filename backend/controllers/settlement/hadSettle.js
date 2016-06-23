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
exports.hadSettle = function (req, res, next) {
    request({url : api_config.billCenter+'?userId=' + 15+'&type='+2}, function (err, data) {
        var userId = req.session.user.id;
        var source = JSON.parse(data.body);
        //头部
        var firstTab=req.query.firstTab==undefined?4:req.query.firstTab;
        var secondTab=req.query.secondTab==undefined?2:req.query.secondTab;

        var accountSideBar = {
            current : "",
            secCurrent:'3',
            sideBarList : [
                {
                    listName : '发票管理',
                    listLink : 'javascript:void(0);',
                    secList  :[
                        {
                            secListName:"全部发票",
                            secListLink:"billCenter",
                            secListNum:source.data.receiptOrder.count
                        },
                        {
                            secListName:'待开票' ,
                            secListLink:"waitSettle",
                            secListNum:source.data.receiptOrder.waitCount

                        },
                        {
                            secListName:'已开票',
                            secListLink:"hadSettle",
                            secListNum:source.data.receiptOrder.openCount
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


        if (err) return next(err);

        if(data) {

            var content = {
                pageTitle: "结算管理",
                headerTit: "结算管理",
                tabObj: {
                    firstTab: firstTab,
                    secondTab: secondTab
                },
                accountSideBar: accountSideBar,
                receiptOrder:source.data.receiptOrder
            };
            //渲染页面
            return res.render('settlement/hadSettle', content);
        }
    })

};

