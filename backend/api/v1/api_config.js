// @flow

// api
var config = require('../../config');

var host = config.rest_address;

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
     * params: {orderId: 1, userId: 121, type:1}
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
    // user can send sms again after 120s
    smsResend: 120,


    /**
     * 支付－确认付款
     * method: post
     * params: {version:'', userId:'',orderId:'',payPassword:'',type:1}
     */
    paySubmit     : host + 'mall/order/payment/submit',


    /**
     * 支付－付款成功
     * method: get
     * params: {orderId:'', userId:, type}
     */
    orderProgress : host + 'mall/order/payment/success',

    orderDetail : host + 'getOrderDetail',
    confirmDelivery : host + 'confirmDelivery',
    confirmDeliverySellerDelivery : host + 'confirmDelivery/sellerDelivery',
    confirmDeliveryConfirmComplete : host + 'confirmDelivery/confirmComplete',
    orderInfo : host + 'order/orderInfo',
    orderSettlement : host + 'settlement',
    orderCloseAPI : host + '/order/orderInfo_api',
    orderReturn : host + 'return',
    disputeApply : host + 'dispute/disputeApply',
    disputeComplete : host + 'dispute/disputeComplete',
    disputeDetail : host + 'dispute/disputeDetail',
    disputeComplete : host + 'dispute/disputeComplete',
    /**
     * 账户设置
     * method: get
     *
     */
    accountSetting : host + 'account/accountSetting',
    notice : host + 'account/notice',

    // 获取用户资金账号
    fetchFundAccount: host + 'account/fund/payPwd',
    // 获取支付手机号
    fetchPayPhone: host + 'account/fund/payPwd/forget/first',
    // 忘记密码 - 验证身份 - 下一步
    paypasswordForgetValid: host + 'account/fund/payPwd/forget/next',
    // 忘记密码 － 重置密码 - 提交
    paypasswordForgetSubmit: host + 'account/fund/payPwd/forget/submit',
    // 记得密码 - 修改密码 - 提交
    paypasswordModifySubmit: host + 'account/fund/payPwd/rem/submit',

    financialDetails : host + 'financial/order/details'

};

module.exports = api_config;
