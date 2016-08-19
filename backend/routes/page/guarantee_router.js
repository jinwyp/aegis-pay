/*!
 * yimei - route.js
 * Module dependencies.
 */
var express                   = require('express');
var router                    = express.Router();

var guaranteePayCtl = require('../../controllers/guarantee/pay');
var guaranteeOrderCtl = require('../../controllers/guarantee/orderDetail');

//冻结/解冻
router.get('/guarantee/pay', guaranteePayCtl.page);
router.get('/guarantee/pay/success', guaranteePayCtl.success);


//详情页面
router.get('/guarantee/getBuyOrderDetail', guaranteeOrderCtl.getBuyOrderDetail);                            //买货订单详情页面路由
router.get('/guarantee/getSellOrderDetail', guaranteeOrderCtl.getSellOrderDetail);                          //卖货订单详情页面路由

module.exports = router;
