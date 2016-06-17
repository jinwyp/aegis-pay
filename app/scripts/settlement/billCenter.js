/*
 * 页面脚本
 * */


require(['jquery','bootstrap'],function($){
    //sideBar切换

    $(".sideBar li a").click(function(){
        var dl = $(this).siblings('dl');
        if( dl.length>0){
            dl.toggle();
            if(dl.css("display") == "block"){
                $(this).children(".triangle").removeClass("ico_triangle_right").addClass("ico_triangle_down");
            }else{
                $(this).children(".triangle").removeClass("ico_triangle_down").addClass("ico_triangle_right");
            }
        }
        return false;
    })




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


