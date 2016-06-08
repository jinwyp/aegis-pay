/*
 * 页面脚本
 * */


require(['jquery','bootstrap'],function($){
    //未认证弹出框
    $("#open-btn").click(function(){
        $(".modal_2").modal();
        $("#modalInfo_2").html("贵公司尚未通过认证，无法开通资金账户");
        $("#md_ok_2").val("前往认证公司信息")
    });

    //checkbox change
    $(".checkbox").click(function(){
        if($(this).hasClass("check")){
            $(this).removeClass("check");
            $("#checkbox").attr("checked");
            $("#open-btn").addClass("closeAccount").removeClass("openAccount");

        }else{
            $(this).addClass("check");
            $("#checkbox").removeAttr("checked");
            $("#open-btn").addClass("openAccount").removeClass("closeAccount");

        }
    })

});


