require(['jquery','bootstrap'],function($,upload){
    // 纠纷处理结果
    $("#disputeResult").on("click",function(){
        $("#disputeModal").modal('show')
    });
    $("#btnSubmit").on("click",function(){
        if($("#textInput").val().length>1000){
            $(".errorMsg").text("不能超过1000个字");
            return;
        }else{
            $(".errorMsg").text("");
        }
        $.ajax({
            url:'/api/disputeBackReason',
            type:'POST',
            data:{
                "orderId" : $("#orderId").val(),
                "version" : $("#version").val(),
                "sellerId" : $("#sellerId").val(),
                "textInput":$("#textInput").val()
            },
            success: function(data){
                if(data.success){
                    // 成功页面
                    location.href='/dispute/disputeSuccess?orderId='+$("#orderId").val()+"&sellerId="+$("#sellerId").val()
                }
            }
        })
    })
});
