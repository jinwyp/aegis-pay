require(['jquery','jQuery.fn.datePicker'],function($){
    $(".btn-sign").click(function(){
        //location.href='/compact?orderid=1';
        //$.ajax({
        //    url:'/orderTest?id=1234',
        //    type:'GET',
        //    success:function(data){
        //        alert(data);
        //    }
        //});
        //alert("fdsfsfsdfds");
    });
    $(".btn-pay").click(function(){
        alert(11111);
    });
    $(".btn-take-good").click(function(){
        location.href='/closeTrade';
    });
});
