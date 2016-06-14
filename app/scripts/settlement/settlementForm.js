/*
* 开具结算单 页面脚本
* @id 订单Id
* @type 用户类型
* @status 订单状态
*
 //WaitSettleAccounts("待卖家结算"),         //1 待结算:卖家
 //WaitVerifySettle("待审核结算"),           //2 待审核:买家
 //ReturnedSettleAccounts("结算被退回"),     //3 审核不通过:退回,卖家重新结算
 //WaitPayTailMoney("待买家补款"),           //4 通过:已经审核结算-待买家补款
 //WaitPayRefundMoney("待卖家退款"),         //5 通过:结算完成-待卖家退款
 //WaitWriteReceipt("待卖家开发票"),         //6 通过:待卖家开发票
* */


requirejs(['jquery', 'jquery.fancySelect', 'bootstrap', 'message'], function($, fancySelect, bootstrap, message){

    var apiHost = '/api';			                            // API域名
        uId = getUrlParam('id'),
        uType = getUrlParam('type'),
        uStatus = getUrlParam('status');

    //var statusArr = ['', 'WaitSettleAccounts', 'WaitVerifySettle', 'ReturnedSettleAccounts',
    //        'WaitPayTailMoney', 'WaitPayRefundMoney', 'WaitWriteReceipt'];


    // 页面模块控制
    var settlementForm = {

        // 重要提示板块
        doubtPlateHandle: function() {

            var $embedBox = $('.embedBox'),                     // 提示框:嵌入
                $doubtInlet = $('.doubtInlet'),                 // 提示框:触发按钮
                $significantModal = $('#significantModal');     // 重要提示 模态框

            // 鼠标经过 显/隐 提示框
            $doubtInlet.hover(function() {
                $embedBox.css('display', 'block');
            });
            $embedBox.hover(function() {
                    $embedBox.css('display', 'block');
                },
                function() {
                    $embedBox.css('display', 'none');
                }
            );

            // 买家& 待审核, 显示模态框
            if($embedBox.attr('data-status') == 'WaitVerifySettle' && $embedBox.attr('data-type') == 'buy') {
                var closeHtml = '<span class="icn_cross close" data-dismiss="modal" aria-label="Close"></span>';
                $('.significantModalCon').html(closeHtml + $embedBox.html());
                $significantModal.modal('show');          // 手动打开模态框 toggle show hide
            }
        },

        // 退回原因
        reasonsReturnHandle: function() {

        },

        // 结算表单信息(基本/实际)
        settlementInfoHandle: function() {

        },

        // 清算货款信息
        clearPaymentHandle: function() {

        },

        // 补充协议文件
        supplyAgreementPlate: function() {

        },

        // 上传盖结算单
        upSealPlatePlate: function() {

        },

        // 操作按钮板块
        operationBtnPlate: function() {

        },

        // 初始化
        init: function() {
            this.doubtPlateHandle();
            this.reasonsReturnHandle();
            this.settlementInfoHandle();
            this.clearPaymentHandle();
            this.supplyAgreementPlate();
            this.upSealPlatePlate();
            this.operationBtnPlate();
        }
    };



    /* ---页面逻辑控制---------------------------------------- */
    settlementForm.init();


    //---退回原因.板块-------------------
    //var $reasonsReturnModal = $('#reasonsReturnModal');
    //var $operationInfoModal = $('#operationInfoModal');
    //if(true) {
    //    //$reasonsReturnModal.modal('show');
    //    //$operationInfoModal.modal('show');
    //}



    /**
     * 获取URL参数值
     * @param param 参数名
     * @param hrefStr 指定Url, 可选
     * @author wze
     */
    function getUrlParam (param, hrefStr) {
        var request = {
            QueryString: function (val) {
                var uri = hrefStr || window.location.search;
                var re = new RegExp("" + val + "=([^&?]*)", "ig");
                return ((uri.match(re)) ? (decodeURI(uri.match(re)[0].substr(val.length + 1))) : '');
            }
        };
        return request.QueryString(param);
    }

});
