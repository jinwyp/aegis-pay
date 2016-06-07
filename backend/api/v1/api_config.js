// @flow

// api

var host = 'http://service.yimei180.com/';

var api_config = {
    host          : host,
    test          : host + "test",
    apps          : host + 'apps',
    apps2         : host + 'apps2',
    signin        : host + 'signin',
    signout       : host + 'signout',
    products      : host + 'products',
    uploadFile    : host + 'upload-file',
    delFile       : host + 'del-file',
    /**
     * 提交已盖章电子合同
     * method: post
     * params: {orderId: 1, userId:1, version: 1, files:'电子合同文件path'}
     */
    signCompact   : host + 'mall/order/signcontract',
    /**
     * fetch未盖章电子合同
     * method: get
     * params: {orderId: 1, userId:12}
     */
    getCompact    : host + 'mall/order/contract',
    /**
     * 付款页面, 页面展示数据
     * method: get
     * params: {orderId: 1, userId: 121}
     * response: {success: true,	error:'', errorCode: '',
	 *							data: {
							    	order: {
								        id
								        version
								        sellerCompanyName:’卖家公司名称’,
								        sellerFundAccount: ‘卖家资金账户’,
								        totalMoney: 订单总金额,
								        sellerBalanceMoney: 余额,
								     }
								 }
							}
     */
    payPage       : host + 'mall/order/payment',


    /**
     * 发送短信
     * method: post
     * params: {phone: 18611111111, message: '343434'}
     */
    sendSMSCode   : host + 'sendSMSCode',


    /**
     * 支付－确认付款
     * method: post
     * params: {version:'', userId:'',orderId:'',payPassword:''}
     */
    paySubmit     : host + 'mall/order/payment/submit',


    /**
     * 支付－付款成功
     * method: get
     * params: {orderId:''}
     */
    orderProgress : host + 'mall/order/progress',

    orderDetail : host + 'getOrderDetail',
    confirmDelivery : host + 'confirmDelivery'

};

module.exports = api_config;
