/*!
 * yimei - route.js
 * Module dependencies.
 */

// @flow

var express        = require('express');
var router = express.Router();

var authMiddleware = require('./middlewares/auth');

var demoController = require('./controllers/demo');                                         // 引入 控制模块
var siteController = require('./controllers/site');
// var staticController = require('./controllers/static');

var compactController         = require('./controllers/compact');
var headerController          = require('./controllers/header');
var footerController          = require('./controllers/footer');
var orderController           = require('./controllers/order/orderDetail');
var confirmDeliveryController = require('./controllers/confirmDelivery');
var subHeaderController       = require('./controllers/subHeader');
var orderCloseControl         = require('./controllers/order/orderClose');                      // 关闭订单 模块(控制文件路径)
var settlementFormControl     = require('./controllers/settlement/settlementForm');             // 结算单开具页面 模块(控制文件路径)
var confirmTheInvoiceControl  = require('./controllers/settlement/confirmTheInvoice');          // 结算单.确认开票
var sellerDeliveryController  = require('./controllers/sellerDelivery');
var returnDetailController    = require('./controllers/returnDetail');

var disputeApply    = require('./controllers/disputeApply');   //纠纷申请
var disputeComplete = require('./controllers/disputeComplete');   //纠纷申请完成页面
var disputeDetail   = require('./controllers/disputeDetail');     //纠纷详情页
var confirmComplete = require('./controllers/confirmComplete'); //确认完成页面
var payCtl          = require('./controllers/pay');
var signCtrl        = require('./controllers/sign');                                                 //支付模块
var wealthCenter    = require('./controllers/wealth/wealthCenter');       //财富管理
var financialHome   = require('./controllers/wealth/financialHome');       //财富管理
var accountSetting  = require('./controllers/accountSetting');       //账户设置
var notice          = require('./controllers/notice');       //账户设置消息提醒

var paypasswordCtl = require('./controllers/paypassword/index');    // paypassword


router.get('/demo', demoController.demo);                                                       // 添加路由
router.get('/', siteController.home);

router.get('/header', headerController.header);
router.get('/subHeader', subHeaderController.subHeader);
router.get('/footer', footerController.footer);




router.get('/getOrderDetail', orderController.getOrderDetail);
router.get('/confirmDelivery', confirmDeliveryController.confirmDelivery);

router.get('/settlement/settlementForm', settlementFormControl.orderSettlement);                  // 结算单 页面路由
router.get('/settlement/confirmTheInvoice', confirmTheInvoiceControl.invoiceInfo);                // 结算单.确认开票 页面路由



router.get('/orderTest', orderController.orderTest);
router.get('/printDetail', orderController.printDetail);
router.get('/order/orderClose', orderCloseControl.orderInfo);                                     // 关闭 订单路由

router.get('/return', returnDetailController.returnDetail);

router.get('/confirmDelivery/sellerDelivery', sellerDeliveryController.sellerDelivery);
router.get('/confirmDelivery/confirmComplete', confirmComplete.confirmComplete);    //确认完成页面
router.get('/dispute/disputeApply', disputeApply.disputeApply);
router.get('/dispute/disputeComplete', disputeComplete.disputeComplete);
router.get('/dispute/disputeDetail', disputeDetail.disputeDetail);

router.get('/wealth/wealthCenter', wealthCenter.wealthCenter);    //财富管理
router.get('/wealth/financialHome', financialHome.financialHome);    //财务管理中心 账户管理
router.get('/wealth/financialDetails', financialHome.financialDetails);    //财务管理中心 交易明细
router.get('/account/accountSetting', accountSetting.accountSetting);    //账户设置
router.get('/account/notice', notice.notice);    //账户设置消息提醒




router.get('/compact', compactController.compact);
router.get('/compactDetail', compactController.compactDetail);
router.get('/pay', payCtl.page);
router.get('/pay/success', payCtl.success);


// paypassword
router.get('/ucenter/paypassword/reset', paypasswordCtl.reset);
router.get('/ucenter/paypassword/fg/vl', paypasswordCtl.validCard);
router.get('/ucenter/paypassword/fg/set', paypasswordCtl.isValidMidware, paypasswordCtl.forgetReset);

// setSSOCookie
router.get('/setSSOCookie', signCtrl.setSSOCookie);
router.get('/removeSSOCookie', signCtrl.removeSSOCookie);

module.exports = router;
