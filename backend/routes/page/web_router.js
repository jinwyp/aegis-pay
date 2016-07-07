/*!
 * yimei - route.js
 * Module dependencies.
 */

// @flow

var express                   = require('express');
var router                    = express.Router();

var authMiddleware            = require('../../middlewares/auth');
var demoController            = require('../../controllers/demo');                              //引入 控制模块

var compactController         = require('../../controllers/compact');
var headerController          = require('../../controllers/header');
var footerController          = require('../../controllers/footer');
var orderController           = require('../../controllers/order/orderDetail');
var noticeController           = require('../../controllers/order/notice');
var confirmDeliveryController = require('../../controllers/confirmDelivery');
var subHeaderController       = require('../../controllers/subHeader');
var orderCloseControl         = require('../../controllers/order/orderClose');                  //关闭订单 模块(控制文件路径)
var settlementFormControl     = require('../../controllers/settlement/settlementForm');         //结算单开具页面 模块(控制文件路径)
var billCenter                = require('../../controllers/settlement/billCenter');
var billSetting               = require('../../controllers/settlement/billSetting');
var waitSettle                = require('../../controllers/settlement/billCenter');
var hadSettle                 = require('../../controllers/settlement/billCenter');
var settleDetails             = require('../../controllers/settlement/settleDetails');
var settlementInfo            = require('../../controllers/settlement/settlementInfo');
var disputeApply              = require('../../controllers/disputeApply');                      //纠纷申请
var confirmTheInvoiceControl  = require('../../controllers/settlement/confirmTheInvoice');      //结算单.确认开票
var sellerDeliveryController  = require('../../controllers/sellerDelivery');
var returnDetailController    = require('../../controllers/returnDetail');
var disputeComplete           = require('../../controllers/disputeComplete');                   //纠纷申请完成页面
var disputeDetail             = require('../../controllers/disputeDetail');                     //纠纷详情页
var disputeSellerDetail       = require('../../controllers/disputeSellerDetail');               //卖家查看纠纷详情页
var disputeSuccess            = require('../../controllers/disputeSuccess');                    //卖家查看纠纷详情页

var signCtrl                  = require('../../controllers/sign');                              //支付模块
var confirmComplete           = require('../../controllers/confirmComplete');                   //确认完成页面
var payCtl                    = require('../../controllers/pay');
var wealthCenter              = require('../../controllers/wealth/wealthCenter');               //财富管理
var financialHome             = require('../../controllers/wealth/financialHome');              //财富管理
var accountSetting            = require('../../controllers/accountSetting');                    //账户设置
var securitySetting            = require('../../controllers/securitySetting');                  //安全设置
var paypasswordCtl            = require('../../controllers/paypassword/index');                 //paypassword
var wealthAccount             = require('../../controllers/wealth/wealthAccount');              //账户通
var drawCash                  = require('../../controllers/drawCash/drawCash');
var bindingBankAccount        = require('../../controllers/wealth/bindingBankAccount');         //绑定银行卡


//=========================测试路由================================
router.get('/demo', demoController.demo);                                                       //公用控件页面路由
router.get('/test', demoController.test);                                                       
router.get('/home', demoController.home);                                                       //项目主页路由
router.get('/header', headerController.header);                                                 //网页头部路由
router.get('/subHeader', subHeaderController.subHeader);                                        //网页页面头部路由
router.get('/footer', footerController.footer);                                                 //网页底部路由


//=========================下单流程路由================================

//登录
// setSSOCookie
router.get('/setSSOCookie', signCtrl.setSSOCookie);
router.get('/removeSSOCookie', signCtrl.removeSSOCookie);


//签订合同
router.get('/compact', compactController.compact);
router.get('/downloadContract', compactController.downloadContract);                            //下载合同

//付款
router.get('/pay', payCtl.page);
router.get('/pay/success', payCtl.success);

//提货
router.get('/confirmDelivery', confirmDeliveryController.confirmDelivery);                      //确认提货
router.get('/confirmDelivery/confirmComplete', confirmComplete.confirmComplete);                //确认完成页面
router.get('/confirmDelivery/sellerDelivery', sellerDeliveryController.sellerDelivery);         //提货确认审核
router.get('/returnSeller', returnDetailController.returnSeller);                               //确认提货被退回
router.get('/returnBuyer', returnDetailController.returnBuyer);                                 //确认提货被退回

//结算
router.get('/settlement/settlementForm', settlementFormControl.orderSettlement);                //结算单－页面路由
router.get('/settlement/settlementInfoDownload', settlementFormControl.settlementInfoDownload); //结算单－下载打印结算信息
router.get('/settlement/confirmTheInvoice', confirmTheInvoiceControl.addInvoiceInfo);           //结算单.开票－确认(添加)开票
router.post('/settlement/submitInvoice', confirmTheInvoiceControl.submitInvoiceInfo);           //结算单.开票－提交开票
router.get('/settlement/addInvoiceNotes', confirmTheInvoiceControl.invoiceNotes);               //结算单.开票－开票备注 页面路由
router.post('/settlement/submitInvoiceNotes', confirmTheInvoiceControl.submitInvoiceNotes);     //结算单.开票－提交开票备注
router.get('/settlement/downInvoiceTemplate', confirmTheInvoiceControl.downInvoiceTemplate);    //结算单.开票－下载开票模板
router.get('/settlement/imgViewApi', confirmTheInvoiceControl.imgViewApi);                      //结算单.开票－图片预览 #公用, 多张传?key=imgId
router.get('/settlement/sureReceiveReceipt', orderController.sureReceiveReceipt);               //结算-确认收到发票

//纠纷
router.get('/dispute/disputeApply', disputeApply.disputeApply);                                 //纠纷申请
router.get('/dispute/disputeComplete', disputeComplete.disputeComplete);                        //纠纷申请完成
router.get('/dispute/disputeDetail', disputeDetail.disputeDetail);                              //纠纷详情
router.get('/dispute/disputeSellerDetail', disputeSellerDetail.disputeSellerDetail);            //纠纷详情
router.get('/dispute/disputeSuccess', disputeSuccess.disputeSuccess);                           //纠纷详情

//交易结束
router.get('/order/orderClose', orderCloseControl.orderInfo);                                   //关闭订单路由

//详情页面
router.get('/getBuyOrderDetail', orderController.getBuyOrderDetail);                            //买货订单详情页面路由
router.get('/getSellOrderDetail', orderController.getSellOrderDetail);                          //卖货订单详情页面路由

router.get('/toNoticeBuyerSignContract', noticeController.toNoticeBuyerSignContract);           //卖家提醒买家签订电子合同
router.get('/toNoticeBuyerPayMoney', noticeController.toNoticeBuyerPayMoney);                   //卖家提醒买家付款
router.get('/toNoticeBuyerToDelivery', noticeController.toNoticeBuyerToDelivery);               //卖家催买家确认提货
router.get('/toNoticeSellerToSettle', noticeController.toNoticeSellerToSettle);                 //买家催卖家进行结算订单
router.get('/toNoticeSellerReturnMoney', noticeController.toNoticeSellerReturnMoney);           //买家提醒卖家支付退款
router.get('/toNoticeSellerWriteReceipt', noticeController.toNoticeSellerWriteReceipt);         //买家提醒卖家开发票
router.get('/toNoticeReceiveReceipt', noticeController.toNoticeReceiveReceipt);                 //卖家短信提醒买家已经开发票
router.get('/printDetail', orderController.printDetail);                                        //打印订单
router.get('/compactDetail', compactController.compactDetail);                                  //合同详情页面




//=========================财富管理中心路由================================
//首页
router.get('/', wealthCenter.checkFundAccount);                                                 //财富管理中心－初始化
router.get('/wealth/open-fund-account', wealthCenter.isFundAccountExist, wealthCenter.openFundAccount);                 //开通资金账户
router.get('/wealth/open-fund-account/waiting', wealthCenter.openFundAccountWait);              //正在开通资金账户页面
router.get('/wealth/open-fund-account/success', wealthCenter.openFundAccountSuccess);           //开通成功页面
router.get('/wealth/financialHome', financialHome.financialHome);                               //财务管理中心－首页
router.get('/wealth/checkCashBank', financialHome.checkCashBank);                               //财务管理中心－首页

//账户管理
router.get('/wealth/addAccount', wealthAccount.addAccount);                                     //账户管理－账户通－初始化
router.post('/accountDel', wealthAccount.accountDel);                                           //账户管理－账户通－账户删除
router.get('/drawCash', drawCash.drawCash);                                                     //账户管理－账户通－提现已绑定
router.post('/drawCashCheck', drawCash.drawCashCheck);                                          //账户管理－账户通－提现确认信息
router.post('/drawCashStatus', drawCash.drawCashStatus);                                        //账户管理－账户通－提现确认信息
router.post('/cashSuccess', drawCash.cashSuccess);                                              //账户管理－账户通－提现成功
router.get('/account/accountSetting', accountSetting.accountSetting);
router.get('/account/securitySetting', securitySetting.securitySetting);
//router.get('/account/notice', notice.notice);                                                 //账户设置－消息提醒
router.get('/wealth/bindingBankAccount',bindingBankAccount.bindingBankAccount);                 //账户设置－绑定银行卡
router.get('/wealth/bindingSuccess',bindingBankAccount.bindingSuccess);                         //账户设置－绑定银行卡成功

router.get('/wealth/financialDetails', financialHome.financialDetails);                         //账户管理-收支明细
router.get('/wealth/financialDetailsDownload', financialHome.financialDetailsToExcelAndPDF);    //账户管理-收支明细-下载
router.get('/ucenter/paypassword/reset', paypasswordCtl.reset);                                 //重置密码页面(选择方式：是否记得密码)
router.get(/^\/ucenter\/paypassword\/(fg|modify)\/vl/, paypasswordCtl.fetchPayPhonePage);       //修改或忘记密码身份验证
router.get('/ucenter/paypassword/fg/set', paypasswordCtl.isValidMidware, paypasswordCtl.forgetReset);           //忘记密码－设置密码
router.get(/^\/ucenter\/paypassword\/(fg|modify)\/success/, paypasswordCtl.isSetMidware, paypasswordCtl.forgetSuccess); //重置密码成功
// router.get('/ucenter/paypassword/modify/set', paypasswordCtl.isValidMidware, paypasswordCtl.modifyReset);       //修改密码－设置密码
router.get('/ucenter/paypassword/modify/set', paypasswordCtl.modifyReset); 

//交易管理
router.get('/wealth/financialTransaction', financialHome.financialTransaction);                 //交易记录

//结算管理
router.get('/wealth/financialSettlement', financialHome.financialSettlement);                   //结算管理－结算
router.get('/settlement/billCenter', billCenter.billCenter);                                    //结算管理－发票中心
router.get('/settlement/billSetting', billSetting.billSetting);                                 //结算管理－开票设置
router.post('/settlement/billDelete', billSetting.billDelete);                                  //结算管理－开票设置删除按钮
router.get('/settlement/billView', billSetting.billView);                                       //结算管理－开票设置删除按钮
router.get('/settlement/billCenterView', billCenter.billCenterView);                            //结算管理－开票设置删除按钮
router.post('/settlement/receiveReceipt', billCenter.receiveReceipt);                           //结算页面－通知短信发送
router.get('/settlement/waitSettle', billCenter.billCenter);                                    //结算管理－开票设置(代开票)
router.get('/settlement/hadSettle', billCenter.billCenter);                                     //结算管理－开票设置(已开票)
router.get('/settlement/settleDetails', settleDetails.settleDetails);                           //结算管理－发票查看详情
router.get('/settlement/settlementInfo', settlementInfo.settlementInfo);                        //结算管理－发票设置查看详情

//合同管理
router.get('/wealth/financialContract', financialHome.financialContract);

module.exports = router;
