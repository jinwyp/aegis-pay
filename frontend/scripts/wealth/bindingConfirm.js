
requirejs(['jquery'], function($,sms_code,pay){

    $("#bindingConfirmSubmit").on("click",function(){
        var remittance=$("#remittance").val();
        if(remittance==""){
            $(".errorMsg").text("汇款金额不能为空");
            return;
        }else{
            $(".errorMsg").text("");
        }
        if(isNaN(remittance)){
            $(".errorMsg").text("请输入数字");
            return;
        }else{
            $(".errorMsg").text("");
        }

        $.ajax({
            url:'/api/account/fund/bankCard/verify/submit',
            type:'POST',
            data:{userId:"250",confirmMoney:remittance},
            success:function(data){
                if(data.success){
                    $(".errorMsg").text("");
                    $(".bindingSuccessInfoWrap,.bankConfirmWrap").hide();
                    $(".accountSuccess").show();
                }else{
                    if(data.errorCode=="1007"){
                        $(".errorMsg").text("汇款金额有误,请重新输入");
                    }
                    if(data.errorCode=="1008"){
                        // 汇款金额核对次数超过3次
                        $(".bindingSuccessInfoWrap,.bankConfirmWrap").hide();
                        $(".accountError").show();
                    }
                }
            }
        });
    });
});


