// @flow

// api
var _ = require('lodash');
var config = require('../../config');
var request = require('../../libs/request');
var host = config.rest_address;

var api_config = require('../v1/api_config');

var guarantee_api_config = _.assign(api_config, {  
    /**
     * 付款页面, 页面展示数据
     * method: get
     * params: {orderId: 1, userId: 121, type:1}
     * errorCode: 1001 资金账户未开通
     * response: {success: true,	error:'', errorCode: '1001',
            data: {
                    order: {
                        id
                        version
                        sellerCompanyName:’卖家公司名称’,
                        sellerFundAccount: ‘卖家资金账户’,
                        totalMoney: 订单总金额,
                        sellerBalanceMoney: 余额,
                        settleMoney: 结算金额， //type = 3
                        unfrozenMoney: 解冻金额，//type=3
                        payMoney: 支付金额    //type = 3

                    }
                }
            }
     */
    payPage       : host + 'guarantee/order/payment',

    /**
     * 支付－确认付款
     * method: post
     * params: {version:'', userId:'',orderId:'',payPassword:'',type:1}
     */
    paySubmit     : host + 'guarantee/order/payment/submit',


    /**
     * 支付－付款成功
     * method: get
     * params: {orderId:'', userId:, type}
     */
    paySuccess : host + 'guarantee/order/payment/success',

    buyOrderDetail : host + 'guarantee/order',
    sellOrderDetail : host + 'guarantee/seller/order',
    printOrderDetail : host + 'guarantee/order/print',

    /**
     * 关闭订单 Api
     * orderCloseView   查看订单信息
     * orderCloseSubmit 提交关闭原因
     */
    orderCloseView:     host + 'guarantee/order/close',
    orderCloseSubmit:   host + 'guarantee/order/close/submit'


});
module.exports = guarantee_api_config;
