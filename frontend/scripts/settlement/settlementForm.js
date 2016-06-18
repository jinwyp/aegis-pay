/*
* 开具结算单 页面脚本
* @id 订单Id
* @type 用户类型
* @status 订单状态
     WaitSettleAccounts	 	待结算.卖家开具结算单(卖)
     WaitVerifySettle	 	待审核.卖家编辑结算单(卖)
     WaitVerifySettle	 	待审核.买家审核结算单(买)
     ReturnedSettleAccounts	审核退回.卖家修改数据(卖)
     ReturnedSettleAccounts	审核退回.买家修改原因(买)
     WaitPayTailMoney	 	审核通过.待买家补款  (_)
     WaitPayRefundMoney	 	审核通过.待卖家退款  (_)
     WaitWriteReceipt	 	审核通过.待卖家开发票(_)   */


requirejs(['jquery', 'jquery.fancySelect', 'bootstrap', 'message'], function($, fancySelect, bootstrap, message){

    var apiHost = '/api';			                            // API域名
        uId = getUrlParam('id'),
        uType = getUrlParam('type'),
        uStatus = getUrlParam('status');


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
            $embedBox.hover(
                function() {
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

            var $but123124 = $('#but123124'),
                $btn22222 = $('#btn22222'),
                $btn33333 = $('#btn33333'),
                $reasonsReturn_view = $('.reasonsReturn_view'),
                $reasonsReturn_edit = $('.reasonsReturn_edit');

            // 显示编辑框
            $but123124.click(function() {
                $reasonsReturn_view.removeClass('show');
                $reasonsReturn_edit.addClass('show');
            });

            // 取消编辑
            $btn22222.click(function() {
                $reasonsReturn_edit.removeClass('show');
                $reasonsReturn_view.addClass('show');
            });

            // 提交编辑
            $btn33333.click(function() {
                message({
                    type: 'done',
                    title: '完成：',
                    detail: '提交原因成功'
                });
                $btn22222.click();
            });
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
