/*
* 关闭订单页面 脚本
* */


requirejs(['jquery', 'jquery.fancySelect', 'bootstrap', 'message'], function($, fancySelect, bootstrap, message){

    var apiHost = '/api';                           //API域名

    var $reason =       $('[name=reason]'),         //原因ID
        $remarks =      $('[name=remarks]'),        //备注
        $limitNum =     $('.limitNum'),             //剩余字数
        $subBtn =       $('.subBtn'),               //确认
        $btnSubClose =  $('#btnSubClose');          //确认提交


    // 绑定 下拉框插件
    $reason.fancySelect().on('change.fs', function() {
        $(this).trigger('change.$');        //demand.fancySelect.trigger("update");
        $subBtn.prop('disabled', $.trim(this.value)==='--');
    });

    // 计算剩余字数
    $remarks.keyup(function () {
        var num = 500,
            $tag = $(this);
        num = num - parseInt($tag.val().length);

        if(num < 1) {
            $tag.val($tag.val().substr(0, 500));
            num = 0;
        }
        $limitNum.html(num);
    });

    $subBtn.click(function () {
        var remarks = $('[name=remarks]').val();
        if(remarks.length>500) {
            message({
                type: 'error',
                title: '错误：',
                detail: '输入内容超过长度限制!!'
            });
            return;
        }else {
            $('#orderModal').modal('show');
        }
    });

    // 确认提交
    $btnSubClose.click(function() {

        var param = {
            orderId:    $('[name=id]').val(),
            version:    $('[name=version]').val(),
            reason:     $('[name=reason]').val(),
            remarks:    $('[name=remarks]').val()
        };

        $.post({
            url: apiHost + '/order/orderCloseSubmit',
            data: param,            //$("#closeForm").serialize()
            success: function(data){
                if(data.success) {
                    $('.modal .close').click();
                    message({
                        type: 'done',
                        title: '完成：',
                        detail: '操作成功'
                    });
                    setTimeout(function() {
                        location.href = '/getBuyOrderDetail?orderId='+ param.orderId;
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


});
