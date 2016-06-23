/*
 *结算管理中心 发票中心页面
 *
 * */


var request = require('request');
//var apiHost = 'http://server.180.com/';			// 模拟域名
var path = require('path');
var _ = require('lodash');
var api_config = require('../../api/v1/api_config');
var SystemError = require('../../errors/SystemError');

// 处理业务逻辑
exports.billCenter = function (req, res, next) {
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;
    var content = req.query.content;
    var user = req.session.user;
    var type = req.query.type;

    var queryString = '?userId='+ user.id +(startDate?'&startDate='+startDate:'')+ (endDate?'&endDate='+endDate:'')+(content?'&content='+content:'')+(type?'&type='+type:'');
    request({url : api_config.billCenter+queryString}, function (err, data) {

        if (err || data.statusCode != 200) {
            next(new SystemError());
            return;
        }

        var source = JSON.parse(data.body);

        //头部
        var firstTab=req.query.firstTab==undefined?4:req.query.firstTab;
        var secondTab=req.query.secondTab==undefined?2:req.query.secondTab;

        var accountSideBar = {
            current : "",
            secCurrent:type,
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
                            secListLink:"waitSettle?type=1",
                            secListNum:source.data.receiptOrder.waitCount

                        },
                        {
                            secListName:'已开票',
                            secListLink:"hadSettle?type=2",
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
            //return res.render('settlement/billCenter', content);
            if(!type){
                return res.render('settlement/billCenter', content);
            }else if(type == 1){
                return res.render('settlement/waitSettle', content);
            }else if(type == 2){
                return res.render('settlement/hadSettle', content);
            }
        }
    })

};

exports.receiveReceipt = function (req, res, next) {
    var user = req.session.user;
    var orderId = req.body.orderId;

    request({url : api_config.receiveReceipt+'?sellerId=' + user.id +'&orderId=' + orderId}, function (err, data) {

        if (err) return next(err);
        var replayDate = JSON.parse(data.body);
        if(replayDate.success) {
            res.json({success:true});

        }else{
            res.json({success:false});
        }
    })
}

