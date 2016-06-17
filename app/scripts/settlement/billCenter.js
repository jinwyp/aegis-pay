/*
 * 页面脚本
 * */


require(['jquery','bootstrap'],function($){
    //未认证弹出框
    $("#settle").click(function(){
        $(".modal_1").modal();
        $("#modalImg_1").addClass("yes").removeClass("attention");
        $("#modalInfo_1").html("短信通知买家开票?");
        $("#modalInfo_1").css({fontSize:"16px"});
    });
    $("#md_ok_1").click(function(){
        location.href="/"
    })


});


