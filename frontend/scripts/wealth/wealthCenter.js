/*
 * 页面脚本
 * */


require(['jquery','bootstrap', 'message'],function($, bootstrap, message){


    // 点击.未认证弹出框
    $("#open-btn").click(function(){
        $.post({
            url:    '/api/wealth/checkUserCompany',
            success: function(data){
                if(data.success) {

                        location.href = '/wealth/open-fund-account';

                } else {
                    // setTimeout(function() {
                        $(".modal_2").modal();
                        $("#modalInfo_2").html("贵公司尚未通过认证，无法开通资金账户");
                        $("#md_ok_2").val("前往认证公司信息");
                    // }, 800);
                }
            }
        });
    });


    // 点击.前往认证公司
    $("#md_ok_2").click(function(){
        var memberUrl = $("#memberUrl").val();

        $.post({
            url:    '/api/wealth/checkUserCompany',
            data:   {userId:$("#userId").val()},
            // type: 'json',
            success: function(data){
                if(data.success) {

                } else {
                    if(data.error == "verifying"){                            //待审核
                        location.href=memberUrl+" /account/companyDetail";     //查看页面
                    }else if(data.error == "verifyNotPass"){                  //审核未通过
                        location.href=memberUrl+" /account/companyDetail";      //查看页面
                    }else if(data.error.indexOf("companyNotExists") !== -1){      //审核未通过
                        location.href=memberUrl+"/account/companyCreate";       //新建页面
                    }


                }
            }
        });

    });


    // 切换.是否同意协议
    $(".checkbox").click(function(){
        if($(this).hasClass("check")){
            $(this).removeClass("check");
            $("#checkbox").attr("checked");
            $(".open-btn").addClass("closeAccount").removeClass("openAccount");
            $("#open-btn").prop("disabled",true);

        }else{
            $(this).addClass("check");
            $("#checkbox").removeAttr("checked");
            $(".open-btn").addClass("openAccount").removeClass("closeAccount");
            $("#open-btn").prop("disabled",false);
        }
    });


    // 点击.打开协议页面
    $("#agreement").click(function () {
        $(".modal_agreement").modal();
    })

});


