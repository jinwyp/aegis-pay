/*
 * 页面脚本
 * */


require(['jquery','bootstrap', 'message'],function($, bootstrap, message){


    // 点击.未认证弹出框
    $("#open-btn").click(function(){
        var memberUrl = $("#memberUrl").val();
        $.post({
            url:    '/api/wealth/checkUserCompany',
            data:   {userId:$("#userId").val()},
            success: function(data){
                if(data.success) {
                    location.href = '/wealth/open-fund-account';
                } else {
                    if(data.error == "verifying"){                            //待审核
                        $(".modal_3").modal();
                        $("#modalInfo_3").html("贵公司企业认证正在审核中，<br />无法开通资金账户!");
                    }else if(data.error == "verifyNotPass" || data.error == "improve"){                  //审核未通过
                        $(".modal_2").modal();
                        $("#modalInfo_2").html("贵公司尚未通过认证，无法开通资金账户!");
                        $("#md_ok_2").val("前往认证公司信息");
                        $("#md_ok_2").click(function(){
                            location.href=memberUrl+" /account/companyDetail";
                        });
                    }else if(data.error  == "companyNotExists"){              //未认证
                        $(".modal_2").modal();
                        $("#modalInfo_2").html("贵公司尚未通过认证，无法开通资金账户!");
                        $("#md_ok_2").val("前往认证公司信息");
                        $("#md_ok_2").click(function(){
                            location.href=memberUrl+"/account/companyCreate";
                        })

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


