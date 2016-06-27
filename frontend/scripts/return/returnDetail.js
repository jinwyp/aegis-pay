/*
* 页面脚本
* */


requirejs(['jquery', 'pay.upload', 'bootstrap', 'message'], function($, upload, bootstrap, message){

    var returnDetail={
        modifyReasons : function(){
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
        "init" : function(){
          this.modifyReasons();
        }
    }
    returnDetail.init();

});


