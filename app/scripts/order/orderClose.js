/*
* 关闭订单页面 脚本
* */


requirejs(['jquery', 'jquery.fancySelect', 'bootstrap'], function($){

    var apiHost = '/api';			// API域名

    var $reasonId = $('[name=reasonId]'),           //原因ID
        $remarks = $('[name=remarks]'),             //备注
        $limitNum = $('.limitNum'),                 //剩余字数
        $subBtn = $('.subBtn'),                     //确认
        $btnSubClose = $('#btnSubClose');           //确认提交


    // 绑定 下拉框插件
    $reasonId.fancySelect();

    $reasonId.fancySelect().on('change.fs', function() {
        $(this).trigger('change.$');        //demand.fancySelect.trigger("update");
        console.log(this.value);

        $subBtn.prop('disabled', $.trim(this.value)==='--');
    });


    // 计算剩余字数
    $remarks.keyup(function () {
        var num = 500;
        num = num - parseInt(this.value.length);
        $limitNum.html(num);
    });


    // 确认提交
    $btnSubClose.click(function() {

        // 请求参数 $("#closeForm").serialize()
        var param = {
            userId: 'admin',
            orderId: $('[name=id]').val(),
            version: $('[name=version]').val(),
            reasonId: $('[name=reasonId]').val(),
            remarks: $('[name=remarks]').val()
        };

        console.dir(param);

        $.ajax({
            url: apiHost + '/order/closeOrder_api',
            data: param,        //$("#closeForm").serialize(),
            success: function(data){
                if(data.success) {
                    alert('订单关闭成功!');
                    $('.modal .close').click();
                } else {
                    alert('error');
                }
            }
        });
    });


});
