
requirejs(['jquery'], function($,sms_code,pay){

    $("#bindingConfirmSubmit").on("click",function(){
        var remittance=$("#remittance").val();
        if(remittance==""){
            $(".errorMsg").text("汇款金额不能为空");
            return;
        }else{
            $(".errorMsg").text("");
        }

        $.ajax({
            url:'/api/account/fund/bankCard/verify/submit',
            type:'POST',
            data:{userId:"250",confirmMoney:remittance},
            success:function(){
                if(data.success){
                    alert("Asd")
                }
            }
        });
    });
});


