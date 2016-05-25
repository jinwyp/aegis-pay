/*!
 * yimei - route.js
 * Module dependencies.
 */

var express = require('express');
var demoController = require('./controllers/demo');                             // 引入 控制模块
var siteController = require('./controllers/site');
// var staticController = require('./controllers/static');
// var signController = require('./controllers/sign');
var compactController = require('./controllers/compact');
var headerController = require('./controllers/header');
var footerController = require('./controllers/footer');
var orderController = require('./controllers/order/orderDetail');
var confirmDeliveryController = require('./controllers/confirmDelivery');
var subHeaderController = require('./controllers/subHeader');
var orderCloseContr = require('./controllers/order/orderClose');                // 关闭订单 模块(控制文件路径)


var router = express.Router();
router.get('/demo', demoController.demo);                                       // 添加路由
router.get('/', siteController.home);
// router.post('/signout', signController.signout);
// router.post('/signin', signController.signin);
router.get('/compact', compactController.compact);
router.get('/header', headerController.header);
router.get('/subHeader', subHeaderController.subHeader);
router.get('/footer', footerController.footer);
router.get('/confirmDelivery', confirmDeliveryController.confirmDelivery);
router.get('/confirmDelivery/test', confirmDeliveryController.test);
router.get('/getOrderDetail', orderController.getOrderDetail);
router.get('/orderTest', orderController.orderTest);
router.get('/order/orderClose', orderCloseContr.orderInfo);                     // 关闭订单 路由
router.get('/orderTest', orderController.orderTest);


module.exports = router;
