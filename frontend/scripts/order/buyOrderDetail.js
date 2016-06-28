require(['jquery','jQuery.fn.datePicker'],function($){
    $(".btn-pay").click(function(){
        alert(11111);
    });
    $(".btn-take-good").click(function(){
        location.href='/closeTrade';
    });

    //打印订单
    $(".btn-print").click(function(){
        window.open('/printDetail?orderId='+$("#orderId").val());
    });
    //签订电子合同
    $(".btn-sign").click(function(){
        window.open("/compact?id="+$("#orderId").val());
    });
    //关闭交易
    $(".btn-sign").click(function(){
        window.open("/compact?id="+$("#orderId").val());
    });
    //签订点子合同
    $(".btn-sign").click(function(){

    });
    $(".btn-print").click(function(){
        window.open('/printDetail?orderId='+$(this).data("value"));
    });
});
