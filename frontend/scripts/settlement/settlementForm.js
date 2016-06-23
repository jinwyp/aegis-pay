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


requirejs(['jquery', 'jquery.fancySelect', 'bootstrap', 'message', 'pay.upload'], function($, fancySelect, bootstrap, message, upload){

    var apiHost = '/api';			                            // API域名

        // apiHost  = require('../../api/v1/api_config');       // 接口路径配置

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

            // ---- 更新 倒计时 ------


        },

        // 编辑退回原因
        reasonsReturnHandle: function() {

            var $btnTriggerEdit = $('#btnTriggerEdit'),         // 触发编辑框
                $btnCancelTrigger = $('#btnCancelTrigger'),     // 取消编辑
                $subEditReason = $('#subEditReason'),           // 提交修改
                $inpReasonEdit = $('#inpReasonEdit'),           // 输入框
                $reasonsReturn_view = $('.reasonsReturn_view'),
                $reasonsReturn_edit = $('.reasonsReturn_edit');

            // 显示编辑框
            $btnTriggerEdit.click(function() {
                $reasonsReturn_view.removeClass('show');
                $reasonsReturn_edit.addClass('show');
            });

            // 取消编辑
            $btnCancelTrigger.click(function() {
                $reasonsReturn_edit.removeClass('show');
                $reasonsReturn_view.addClass('show');
            });

            // 输入数量计算
            $inpReasonEdit.keyup(function () {
                var num = 200;
                num = num - parseInt(this.value.length);
                $('.reasonSize').html(num);
            });

            // 提交修改. - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            $subEditReason.click(function() {

                if( !$.trim($inpReasonEdit.val()) ) {
                    message({
                        type: 'error',
                        title: '错误提示：',
                        detail: '请填写 退回原因!'
                    });
                    return false;
                }

                //session.user.id;
                var param = {
                    version: 123,
                    userId: '213',
                    orderId: $('[name=orderId]').val(),
                    reason: $inpReasonEdit.val()      // 退回原因
                };

                $.post({
                    url: apiHost + '/settlement/buyersEditReason',
                    data: param,                  //$("#closeForm").serialize(),
                    success: function(data){
                        if(data.success) {
                            $('.modal .close').click();
                            message({
                                type: 'done',
                                title: '操作完成：',
                                detail: '退回原因 已更新!'
                            });
                            $btnCancelTrigger.click();
                            $('.labReturnReason').html(data.reason);
                            $('.labReturnTime').html(data.settleReasonTime);
                        } else {
                            message({
                                type: 'done',
                                title: '完成：',
                                detail: '操作失败!'
                            });
                        }
                    }
                });
            });

        },

        // 结算表单信息(基本/实际)
        settlementInfoHandle: function() { },

        // 清算货款信息
        clearPaymentHandle: function() { },

        // 补充协议文件
        supplyAgreementPlate: function() {

            var $fileList = $('.supplyFileList'),         //补充协议附件列表
                $upFile = $('#supplyFile');               //上传控件

            //上传操作
            $upFile.click(function() {
                var $tag = $(this);

                upload.ajaxFileUpload($tag, '', function(data) {
                    var htmlStr = '';

                    if(data.success) {
                        $.each(data.attach, function(ind, file) {
                            htmlStr += '<p class="fileLab"><span class="fileLab_name">'+ file.filename +'</span><span class="fileLab_del" data-id="'+ file.url +'"></span></p>';
                        });
                        $fileList.append(htmlStr);
                    }
                });
            });

            //删除操作
            $fileList.on('click', '.fileLab_del', function(e) {
                upload.ajaxFileRemove($(this));
            });

            //下载补充协议


        },

        // 上传盖结算单
        upSealPlatePlate: function() {
            var $fileList = $('.upSealFileList'),         //补充协议附件列表
                $upFile = $('#upSealFile');               //上传控件

            //上传操作
            $upFile.click(function() {
                var $tag = $(this);

                upload.ajaxFileUpload($tag, '', function(data) {
                    var htmlStr = '';

                    if(data.success) {
                        $.each(data.attach, function(ind, file) {
                            htmlStr += '<p class="fileLab"><span class="fileLab_name">'+ file.filename +'</span><span class="fileLab_del" data-id="'+ file.url +'"></span></p>';
                        });
                        $fileList.append(htmlStr);
                    }
                });
            });

            //删除操作
            $fileList.on('click', '.fileLab_del', function(e) {
                upload.ajaxFileRemove($(this));
            });
        },

        // 审核退回 操作
        auditingReturnHandle: function() {
            var $subReturnReason = $('#subReturnReason');                 //审核退回.第一次


            $subReturnReason.click(function() {

                var param = {
                    version: 123,
                    userId: '213',
                    orderId: '210000',
                    reason: ''      // 退回原因
                };

                $.post({
                    url: apiHost + '/settlement/buyersReturn',
                    data: param,
                    success: function(data){
                        if(data.success) {
                            $('.modal .close').click();
                            message({
                                type: 'done',
                                title: '完成：',
                                detail: '退回结算 操作成功1212'
                            });
                            console.log('');
                        } else {
                            message({
                                type: 'done',
                                title: '完成：',
                                detail: '操作失败!!'
                            });
                        }
                    }
                });

            });

        },


        // 确认结算 操作
        auditingAdoptHandle: function() {

        },

        // 开具结算 操作
        issueSettleHandle: function() {

        },


        // 操作按钮板块
        operationBtnPlate: function() {
            var $btnSubSettlement = $('#btnSubSettlement'),         //开具结算
                $btnSubAuditing = $('#btnSubAuditing');             //确认审核


            //$('.supplyFileList .fileLab_del')
            //卖家.提交结算单 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            //$btnSubSettlement.click(function() {
            //    var param = {
            //        version: 123,
            //        sellerId: '213',
            //        orderId: '210000',
            //        settleAmount: 222,      // 结算吨数
            //        harbourDues: '',        //港务费
            //        settleMoney: '',        //结算金额
            //        remarks: '',            //备注
            //        files: [                //补充协议列表
            //            {name: 'name', path: 'xx.jpg'}
            //        ]
            //    };
            //
            //    $.post({
            //        url: apiHost + '/settlement/sellerSubmit',
            //        data: param,        //$("#closeForm").serialize(),
            //        success: function(data){
            //            if(data.success) {
            //                $('.modal .close').click();
            //                message({
            //                    type: 'done',
            //                    title: '完成：',
            //                    detail: '确认审核 操作成功'
            //                });
            //                console.log('');
            //            } else {
            //                message({
            //                    type: 'done',
            //                    title: '完成：',
            //                    detail: '操作失败!!'
            //                });
            //            }
            //        }
            //    });
            //});

            //买家.退回结算单 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            //$btnSubReason.click(function() {

            //});




            ////买家.审核通过
            //$btnSubAuditing.click(function() {
            //    var param = {
            //        version: 123,
            //        userId: '213',
            //        orderId: '320000',
            //        files: [                //补充协议列表
            //            {name: 'name', path: 'xx.jpg'}
            //        ]
            //    };
            //
            //    $.post({
            //        url: apiHost + '/settlement/buyersAuditing',
            //        data: param,                  //$("#closeForm").serialize(),
            //        success: function(data){
            //            if(data.success) {
            //                $('.modal .close').click();
            //                message({
            //                    type: 'done',
            //                    title: '完成：',
            //                    detail: '审核通过 操作成功'
            //                });
            //                console.log('');
            //            } else {
            //                message({
            //                    type: 'done',
            //                    title: '完成：',
            //                    detail: '操作失败!!'
            //                });
            //            }
            //        }
            //    });
            //});

        },

        // 初始化
        init: function() {
            this.doubtPlateHandle();
            this.reasonsReturnHandle();
            this.settlementInfoHandle();
            this.clearPaymentHandle();
            this.supplyAgreementPlate();
            this.upSealPlatePlate();
            this.auditingReturnHandle();
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
