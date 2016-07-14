
requirejs(['jquery'], function($,sms_code,pay){

    // 账户发送确认金额确认
    $(document).ready(function(){
        $.ajax({
            url:'/api/account/fund/bankCard/submit/success',
            type:'POST',
            data:{
                userId:$("#userId").val(),
            },
            success: function(data){
                if(data.success && $("#userAccountStatus").val()==1) {
                    var timer=setInterval(function(){
                        location.href=location.href;
                    },10000)
                }
            }
        })
    });

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
            data:{
                userId:$("#userId").val(),
                confirmMoney:remittance
            },
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


