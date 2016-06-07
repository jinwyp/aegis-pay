/*!
 * yimei - route.js
 * Module dependencies.
 */

var express        = require('express');
var router = express.Router();

var authMiddleware = require('./middlewares/auth');

var demoController = require('./controllers/demo');                                         // 引入 控制模块
var siteController = require('./controllers/site');
// var staticController = require('./controllers/static');
// var signController = require('./controllers/sign');
var compactController         = require('./controllers/compact');
var headerController          = require('./controllers/header');
var footerController          = require('./controllers/footer');
var orderController           = require('./controllers/order/orderDetail');
var confirmDeliveryController = require('./controllers/confirmDelivery');
var subHeaderController       = require('./controllers/subHeader');
var orderCloseContr           = require('./controllers/order/orderClose');                            // 关闭订单 模块(控制文件路径)
var settlementFormContr       = require('./controllers/settlement/settlementForm');               // 结算单开具页面 模块(控制文件路径)
var sellerDeliveryController  = require('./controllers/sellerDelivery');                     // 关闭订单 模块(控制文件路径)
var returnDetailController    = require('./controllers/returnDetail');
var confirmComplete           =require('./controllers/confirmComplete');            //确认完成页面
var payCtl                    = require('./controllers/pay');
var signCtrl = require('./controllers/sign');                                                 //支付模块



router.get('/demo', demoController.demo);                                                   // 添加路由
router.get('/', siteController.home);
// router.post('/signout', signController.signout);
// router.post('/signin', signController.signin);

router.get('/header', headerController.header);
router.get('/subHeader', subHeaderController.subHeader);
router.get('/footer', footerController.footer);
router.get('/confirmDelivery', confirmDeliveryController.confirmDelivery);
router.get('/confirmDelivery/test', confirmDeliveryController.test);
router.get('/getOrderDetail', orderController.getOrderDetail);

router.get('/orderTest', orderController.orderTest);
router.get('/printDetail', orderController.printDetail);
router.get('/order/orderClose', orderCloseContr.orderInfo);                                 // 关闭 订单路由
router.get('/settlement/settlementForm_buyer', settlementFormContr.orderInfo);              // 结算单 买家 页面路由
router.get('/settlement/settlementForm_seller', settlementFormContr.orderInfo);             // 结算单 卖家 页面路由
router.get('/confirmDelivery/sellerDelivery', sellerDeliveryController.sellerDelivery);
router.get('/confirmDelivery/confirmComplete', confirmComplete.confirmComplete);    //确认完成页面


router.get('/return', returnDetailController.returnDetail);

router.get('/compact', compactController.compact);
router.get('/order/progress', payCtl.success);
router.get('/pay', payCtl.page);

// setSSOCookie
router.get('/setSSOCookie', signCtrl.setSSOCookie);
router.get('/removeSSOCookie', signCtrl.removeSSOCookie);

module.exports = router;
