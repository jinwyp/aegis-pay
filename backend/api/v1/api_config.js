// @flow

// api
var config = require('../../config');
var request = require('../../libs/request');

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
    /**订单状态
     * params: userId; orderId
     * res: {data: {status: ''} }
     */
    checkOrderStatus: host + 'mall/order/status',
    /**
     * 提交已盖章电子合同
     * method: post
     * params: {orderId: 1, userId:1, version: 1, files:'电子合同文件path'}
     */
    signCompact   : host + 'mall/order/signContract',
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
    sendSMSCode   : host + 'sendSMS',
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

    buyOrderDetail : host + 'mall/order',
    sellOrderDetail : host + 'mall/seller/order',
    downloadContract : host + 'mall/order/contract/files',
    printOrderDetail : host + 'mall/order/print',
    buyDeleteOrder : host + 'mall/order/print',
    sellDeleteOrder : host + 'mall/order/print',

    noticeToSignContract : host + 'mall/order/remindBuyer/toSignContract',
    noticeToPayMoney : host + 'mall/order/remindBuyer/toPayment',
    noticeToDelivery : host + 'mall/order/remindBuyer/toDelivery',
    noticeToSettle : host + 'mall/order/remindSeller/toSettle',
    noticeToReturnMoney : host + 'mall/order/remindSeller/payRefundMoney',
    noticeToWriteReceipt : host + 'mall/order/remindSeller/writeReceipt',
    noticeToReceiveReceipt : host + 'mall/order/seller/notice/receiveReceipt',
    sureReceiveReceipt : host + 'mall/order/complete/submit',

    confirmDelivery : host + 'mall/order/deliveryConfirm',
    confirmDeliverySubmit : host + 'mall/order/deliveryConfirm/submit',
    confirmDeliverySellerDelivery : host + 'mall/order/seller/verifyDelivery',
    confirmDeliveryConfirmComplete : host + 'mall/order/seller/verifyDelivery/return',
    returnDetailSubmit:host + 'mall/order/seller/verifyDelivery/return/editReason',
    sellerDeliveryReasonSubmit : host + 'mall/order/seller/verifyDelivery/return',
    orderInfo : host + 'order/orderInfo',
    orderSettlement : host + 'settlement',
    settleDetails : host + 'finance/receipt',
    orderCloseAPI : host + 'order/orderInfo_api',
    orderReturnSeller : host + 'mall/order/seller/verifyDelivery',
    orderReturnBuyer : host + 'mall/order/delivery/return',
    
    disputeApply : host + 'mall/order/dispute',
    disputeApplySubmit : host+ 'mall/order/dispute/submit',
    disputeCancel:host+'mall/order/dispute/cancel',
    disputeDetail : host + 'mall/order/dispute/detail',
    disputeSellerDetail : host + 'mall/order/seller/dispute',
    disputeBackReason : host + 'mall/order/seller/dispute/submit',
    disputeComplete : host + 'mall/order/dispute/detail',
    disputeSuccess : host + 'mall/order/seller/dispute/complete',
    financialCenterHome : host + 'finance/center',
    checkCashBank : host + 'account/fund/checkCashBank',
    checkDrawBank : host + 'account/fund/checkDrawCash',
    financialTransaction : host + 'finance/transaction/list',
    contractList : host + 'finance/contract/list',
    settlementList : host + 'finance/order/settle',


    /**
     * 财务管理
     * checkUserCompany     检查用公司信息 审核情况
     */
    checkUserCompany:       host + 'checkUserCompanyStatus',
    checkFundAccount:       host + 'account/fund/checkFundAccount',


    /**
     * 账户设置
     * method: get
     *
     */
    accountSetting : host + 'account/accountSetting',   //基本信息
    securitySetting : host + 'account/securitySetting',   //安全设置
    //notice : host + 'account/notice',   //消息提醒暂时不做

    // 获取用户资金账号
    fetchFundAccount: host + 'account/fund/payPwd',
    // 获取支付手机号
    fetchPayPhone: host + 'account/fund/payPwd/forget/first',
    // 忘记密码 - 验证身份 - 下一步
    paypasswordForgetValid: host + 'account/fund/payPwd/forget/next',
    // 忘记密码 － 重置密码 - 提交
    paypasswordForgetSubmit: host + 'account/fund/payPwd/forget/submit',
    //开票中心
    billCenter : host + 'finance/order/seller/receipt',
    billCenterView : host + 'finance/order/seller/receipt/view',
    billSetting : host + 'finance/receipt',
    billDelete : host + 'finance/receipt/delete',
    billView : host + 'finance/receipt/view',
    receiveReceipt : host + 'mall/order/seller/notice/receiveReceipt',
    paypasswordForgetSubmit: host + 'account/fund/payPwd/forget/submit',
    // 记得密码 - 修改密码 - 提交
    paypasswordModifySubmit: host + 'account/fund/payPwd/rem/submit',

    financialDetails : host + 'finance/payments/list',
    financialDetailsAccount : host + 'finance/payments/paymentAccount',
    financialDetailsPrint : host + 'finance/payments/print',
    bindingBankAccount : host + 'account/fund/bankCard/add',
    bindingBankAccountCityList : host + 'bank/loadBankSiteCities',
    bindingBankAccountChildBankName : host + 'bank/loadChildBanks',
    childAllBankName : host + 'bank/loadAllChildBanks',
    bindingSuccess : host + 'account/fund/bankCard/verify',
    bindingBankAccountSubmit : host + 'account/fund/bankCard/add/submit',
    bankCardConfirm : host + 'account/fund/bankCard/submit/success',
    remittance:host+ 'account/fund/bankCard/verify/submit',

    // open fund account
    openFundAccount: host + 'account/fund/create',
    payPhoneExist:host + '/account/fund/Payphone',

    /**
     * 是否已经开通了资金账户
     * params: userId
     * res: {success: true, data: {success:true/false}} 
     */ 
    checkFundAccount: host + 'account/fund/checkFundAccount',
    /** fetch status
     * params: {userId}
     * response:
     {
       success:
       error:
       errorCode:
       data {
           success: (备注)   // 1： 开通成功，2： 正在开通中，继续请求 3： 开通失败，不再需要请求
           userAcccount{
                  accountName: 账户名称
                  accountBank: 开户行
                  account:  账户号
                  accountType: 账户类型
         }
       }
    }
     */
    fetchOpenStatus: host + 'account/fund/create/checkStatus',
    drawcash: host + 'account/withDrawCash',
    drawcashSubmit: host + 'account/DrawCash',
    fundinfo: host + 'account/fund/info',
    checkFundPassword: host + 'account/fund/checkPayPwd',


    /**
     * 开具结算单 系列Api
     * sellerView       卖家查看
     * sellerSubmit     卖家提交
     * buyersView       买家查看
     * buyersReturn     买家退回
     * buyersEditReason     买家修改退回原因
     * buyersAuditing       买家审核
     * downPrintSettle      打印下载
     */
    sellerView:         host + 'mall/order/seller/settle',
    sellerSubmit:       host + 'mall/order/seller/settle/submit',
    buyersView:         host + 'mall/order/settle',
    buyersReturn:       host + 'mall/order/settle/return',
    buyersEditReason:   host + 'mall/order/settle/return/editReason',
    buyersAuditing:     host + 'mall/order/settle/submit',
    downPrintSettle:    host + 'mall/order/print/settle',

    /**
     * 关闭订单 Api
     * orderCloseView   查看订单信息
     * orderCloseSubmit 提交关闭原因
     */
    orderCloseView:     host + 'mall/order/close',
    orderCloseSubmit:   host + 'mall/order/close/submit'


};

api_config.fetchPayPhone = function(userId){
    return new Promise(function(resolve, reject){
        request(host + 'account/fund/payPwd/forget/first?userId=' + userId, function(err, data){
            if(err) { return reject(err);}
            var data = JSON.parse(data.body);
            if(data && data.success){
                return resolve(data.data.payPhone)
            }else{
                return reject(new SystemError(data.status, data.error));
            }
        })
    })
}

module.exports = api_config;
