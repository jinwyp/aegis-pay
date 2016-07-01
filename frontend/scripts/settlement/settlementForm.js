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

    var apiHost = '/api';	// API域名


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
                $reason = $('#inpReasonEdit'),                  // 输入框
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
            $reason.keyup(function () {
                var num = 500;
                num = num - parseInt(this.value.length);
                $('.reasonSize').html(num);
            });

            // 提交修改. - - - - - - - - - - - - - - - - - - -
            $subEditReason.click(function() {

                //表单验证
                if(! $.trim($reason.val())) {
                    message({
                        type: 'error',
                        title: '错误：',
                        detail: '请简要填写退回原因!'
                    });
                    return false;
                }

                var param = {
                    version:    $('[name=version]').val(),
                    userId:     $('[name=userId]').val(),
                    orderId:    $('[name=orderId]').val(),
                    reason:     $reason.val()
                };

                $.post({
                    url: apiHost + '/settlement/buyersEditReason',
                    data: param,
                    success: function(data){
                        if(data.success) {
                            $('.modal .close').click();
                            message({
                                type: 'done',
                                title: '操作完成：',
                                detail: '退回原因 已更新!'
                            });

                            $('.labReturnReason').html(data.data.reason);
                            $('.labReturnTime').html(data.data.lastEditReasonTime);

                            setTimeout(function() {
                                $btnCancelTrigger.click();
                            }, 800);
                        } else {
                            message({
                                type: 'error',
                                title: '错误：',
                                detail: '操作失败!!'
                            });
                        }
                    }
                });
            });

        },

        // 结算表单信息(基本/实际)
        settlementInfoHandle: function() { },

        // 清算货款信息
        clearPaymentHandle: function() {
            var $totalMoney     = $('.totalMoney'),                 //已付款金额.text
                $settleAmount   = $('[name=ins_ettleAmount]'),      //总结算吨位 *
                $harbourDues    = $('[name=ins_harbourDues]'),      //港务费 *
                $settleMoney    = $('[name=ins_settleMoney]'),      //总结算金额.val *
                $refundMoney    = $('.refundMoney'),                //退补款金额.text
                $refundMoneyTit = $('.refundMoneyTit');             //退补款标题.text

            // 输入 格式|范围 控制
            $settleAmount.keyup(numberFormatValidation);
            $harbourDues.keyup(numberFormatValidation);
            $settleMoney.keyup(numberFormatValidation);

            // 退补款 控制
            $settleMoney.change(function() {
                if($.isNumeric(this.value)) {
                    var totalMoney = parseFloat($totalMoney.attr('data-num')),          //已交总
                        refundMoney = parseFloat($refundMoney.attr('data-num')),        //找零
                        settleMoney = parseFloat($settleMoney.val()),                   //实际总
                        tempNum = 0;
                    if(settleMoney > totalMoney) {
                        $refundMoneyTit.text('应补货款金额（元）');
                        tempNum = mathTool.theDifference(settleMoney, totalMoney);
                        $refundMoney.text( mathTool.formatMoney(tempNum, 2)).attr('data-num', mathTool.formatDecimal(tempNum, 2));
                    } else {
                        $refundMoneyTit.text('应退货款金额（元）');
                        tempNum = mathTool.theDifference(totalMoney, settleMoney);
                        $refundMoney.text( mathTool.formatMoney(tempNum, 2) ).attr('data-num', mathTool.formatDecimal(tempNum, 2));
                    }
                }
            });

            // 数字格式验证
            function numberFormatValidation(event) {
                var valStr = this.value, valNum = 0;  //event.keyCode
                if($.isNumeric(valStr)) {
                    valNum = parseFloat(valStr);
                    if(valNum <= 0) {
                        this.value = '';
                    }
                } else {
                    this.value = '';
                }
            }
        },

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
                            htmlStr += '<p class="fileLab mb10"><span class="fileLab_name">'+ file.filename +'</span><span class="fileLab_del" data-name="'+ file.filename +'" data-id="'+ file.url +'"></span></p>';
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
                            htmlStr += '<p class="fileLab mb10"><span class="fileLab_name">'+ file.filename +'</span><span class="fileLab_del" data-name="'+ file.filename +'" data-id="'+ file.url +'"></span></p>';
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

        // 开具结算 操作
        issueSettleHandle: function() {

            var $btnSubSettlement = $('#btnSubSettlement');         //开具结算

            //卖家.开具结算单 - - - - - - - - - - - - - - - - - - - - - - - - - - -
            $btnSubSettlement.click(function() {

                // 表单验证 处理
                if(formValidation()) {
                    return false;
                }

                var param = {
                    version:        $('[name=version]').val(),
                    sellerId:       $('[name=sellerId]').val(),
                    orderId:        $('[name=orderId]').val(),
                    settleAmount:   $('[name=ins_ettleAmount]').val(),
                    harbourDues:    $('[name=ins_harbourDues]').val(),
                    settleMoney:    $('[name=ins_settleMoney]').val(),
                    remarks:        $('[name=ins_remarks]').val(),
                    files:          fileListCollector($('.supplyFileList .fileLab_del') )
                };

                $.post({
                    url: apiHost + '/settlement/sellerSubmit',
                    data: param,
                    success: function(data){
                        if(data.success) {
                            //message({type: 'done', title: '完成：', detail: '确认审核 操作成功'});
                            //setTimeout(function() {
                            //    location.href = '/account/order/sell';
                            //}, 1500);

                            var $operationInfoModal = $('#operationInfoModal'),
                                $option_info = $('.option_info'),
                                arrInfo = '结算单已提交待买家确认！',
                                $counterNum = $('.counterNum'),
                                counterNum = 3;

                            if($('[name=orderStatus]').val() == 'ReturnedSettleAccounts') {
                                arrInfo = '结算单已重新提交待买家确认！';
                            }

                            $option_info.html(arrInfo);
                            $operationInfoModal.modal('show');

                            setInterval(function() {
                                if(counterNum < 1) {
                                    location.href = $('.site_page').val() + '/account/order/sell';
                                }

                                $counterNum.html(counterNum+'S');
                                counterNum -= 1;
                            }, 1000);
                        } else {
                            message({
                                type: 'error',
                                title: '错误：',
                                detail: '操作失败!!'
                            });
                        }
                    }
                });
            });
        },

        // 审核退回 操作(第一次)
        auditingReturnHandle: function() {

            var $subReturnReason = $('#subReturnReason'),           //审核退回.第一次
                $reason = $('#oneRemarks');                         //退回原因

            // 输入数量计算
            $reason.keyup(function () {
                var num = 500;
                num = num - parseInt(this.value.length);
                $('.reasonSize_md').html(num);
            });

            $subReturnReason.click(function() {

                //表单验证
                if(! $.trim($reason.val())) {
                    message({
                        type: 'error',
                        title: '错误：',
                        detail: '请简要填写退回原因!'
                    });
                    return false;
                }

                var param = {
                    version:    $('[name=version]').val(),
                    userId:     $('[name=userId]').val(),
                    orderId:    $('[name=orderId]').val(),
                    reason:     $reason.val()
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
                                detail: '退回结算 操作成功'
                            });
                            setTimeout(function() {
                                location.href = $('.site_page').val() + '/account/order/buy';
                            }, 1500);
                        } else {
                            message({
                                type: 'error',
                                title: '错误：',
                                detail: '操作失败!!'
                            });
                        }
                    }
                });
            });
        },


        // 确认结算 操作(审核通过)
        auditingAdoptHandle: function() {
            var $btnSubAuditing = $('#btnSubAuditing');             //确认审核.通过

            //买家.审核通过
            $btnSubAuditing.click(function() {

                // 表单验证 处理
                if(auditingPassValidation()) {
                    return false;
                }

                var param = {
                    version:    $('[name=version]').val(),
                    userId:     $('[name=userId]').val(),
                    orderId:    $('[name=orderId]').val(),
                    files:      fileListCollector($('.upSealFileList .fileLab_del') )
                };

                $.post({
                    url: apiHost + '/settlement/buyersAuditing',
                    data: param,
                    type: 'json',
                    success: function(data){
                        if(data.success) {
                            message({
                                type: 'done',
                                title: '完成：',
                                detail: '审核通过 操作成功'
                            });
                            setTimeout(function() {
                                if(data.data.result) {
                                    location.href = '/settlement/confirmTheInvoice?orderId='+ param.orderId;
                                } else {
                                    location.href = '/pay?userId='+ param.userId +'&type=2&orderId='+ param.orderId;       // 补款
                                }
                            }, 1500);
                        } else {
                            message({
                                type: 'error',
                                title: '错误：',
                                detail: '操作失败!!'
                            });
                        }
                    }
                });
            });
        },


        // 初始化
        init: function() {
            this.doubtPlateHandle();
            this.reasonsReturnHandle();
            this.settlementInfoHandle();
            this.clearPaymentHandle();
            this.supplyAgreementPlate();
            this.upSealPlatePlate();
            this.issueSettleHandle();
            this.auditingReturnHandle();
            this.auditingAdoptHandle();
        }
    };

    settlementForm.init();


    // 表单验证.审核通过
    function auditingPassValidation() {
        var results = false,
            $fileList = $('.upSealFileList .fileLab_del');

        if($fileList.length < 1) {
            message({
                type: 'error',
                title: '错误：',
                detail: '请上传 盖章结算单!'
            });
            return results = true;
        }

        return results;
    }

    // 表单验证.开具结算
    function formValidation() {
        var results = false,

            $settleAmount = $('[name=ins_ettleAmount]'),
            $harbourDues = $('[name=ins_harbourDues]'),
            $settleMoney = $('[name=ins_settleMoney]'),
            $fileList = $('.supplyFileList .fileLab_del');

        if(!$.trim($settleAmount.val()) ) {
            isShowErrorBox($settleAmount, true, '结算吨位 不能为空!');
            return results = true;
        } else {
            isShowErrorBox($settleAmount, false);
        }

        if(!$.trim($harbourDues.val()) ) {
            isShowErrorBox($harbourDues, true, '港务费 不能为空!');
            return results = true;
        } else {
            isShowErrorBox($harbourDues, false);
        }

        if(!$.trim($settleMoney.val()) ) {
            isShowErrorBox($settleMoney, true, '总结算金额 不能为空!');
            return results = true;
        } else {
            isShowErrorBox($settleMoney, false);
        }

        if($fileList.length < 1) {
            message({
                type: 'error',
                title: '错误：',
                detail: '请上传 补充协议文件!'
            });
            return results = true;
        }

        return results;
    }

    // 显示, 隐藏错误框
    function isShowErrorBox($tag, show, errInfo) {
        var $errBox = $tag.next('.errInfo');
        errInfo = errInfo || '';

        if(show) {
            $errBox.html(errInfo).addClass('err');
        } else {
            $errBox.html(errInfo).removeClass('err');
        }
    }

    // 附件值采集(附件节点对象)
    function fileListCollector($files) {
        var arrFile = [];

        $files = $files || [];
        for(var i = 0, s = $files.length; i < s; i++) {
            arrFile.push({
                name: $files[i].getAttribute('data-name'),
                path: $files[i].getAttribute('data-id')
            });
        }
        return arrFile;
    }

    // 工具函数 数值处理
    var mathTool = {
        // 格式化数字(两位小数)
        formatDecimal: function (num, deg) {
            return (num.toFixed(deg || 2) + '');
        },

        // 数字千分符
        formatMoney: function (num, deg) {
            return (num.toFixed(deg || 2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
        },

        // 两数求差
        theDifference: function(num1, num2) {
            var difNum = 0;
            num1 = parseFloat(num1);
            num2 = parseFloat(num2);
            num1 = Math.round(num1 * 10000);
            num2 = Math.round(num2 * 10000);
            difNum = (num1 - num2) / 10000;
            return difNum;
        }
    };


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
