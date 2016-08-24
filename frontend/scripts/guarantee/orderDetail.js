require(['jquery', 'bootstrap'],function($){
    $('#order-table .supply-ico').remove();
    //取消订单
    $("#cancelOrderModal #cancel").click(function(){
        var orderId = $('input[name="orderId"]').val();
        $.post('/api/guarantee/order/cancel', {orderId:orderId}, function(data){
            $("#cancelOrderModal").modal('hide');
            if(data.success){
                location.reload();
                $('#btn-cancelTrade').siblings('.tipError').remove();
            }else{
                $('#btn-cancelTrade').after('<span class="tipError">取消订单失败，请稍后重试</span>');
            }
        })
    });

    // 卖家提交结算金额
    $('#submitSettle').click(function(){
        var val = $('input[name="settleMoney"]').val().replace(/\s+/g, "");
        if($.isNumeric(val)){
            $('#submitSettle').siblings('.tipError').remove();
            $.post('/api/guarantee/order/submitSettleMoney', {settleMoney: val, orderId: $('input[name="orderId"]').val()}, function(data){
                if(data.success){
                     var $nextWrapper = $('#submitSettle').parent().next('.state-item');
                     var nextHtml = '<span>2. 需支付货款</span><i>' + formatMoney(data.data.paymentMoney) + '</i>元 <i>未支付</i>';
                     if(data.data.tailMoney){
                         nextHtml += '，尾款<i>' + formatMoney(data.data.tailMoney) + '</i>元 <i>未支付</i>';
                     }
                     $nextWrapper.html(nextHtml);
                }else{
                    $('#submitSettle').after('<span class="tipError">提交失败，请稍后重试</span>');
                }
            })
        }else{
            $('#submitSettle').after('<span class="tipError">结算金额必须为数字</span>');
        }
    })
});
