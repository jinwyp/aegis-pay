require(['jquery', 'bootstrap'],function($, upload){
    $("#textInput").on("input",function(){
        var Len=$(this).val().length;
        var restNum=200-Len;
        $("#restNum").text(restNum)
    });
    $("#btnSubmit").on("click",function(){
        $.ajax({
            url:'/api/sellerDelivery/reasonSubmit',
            type:'POST',
            data:{
                "orderId" : $("#orderId").val(),
                "version" : $("#version").val(),
                "sellerId" : $("#sellerId").val(),
                "returnReason" : $("#textInput").val()
            },
            success : function(data){
                if(data.success){
                    location.href='/return?orderId='+$("#orderId").val()
                }
            }
        })
    })
});
