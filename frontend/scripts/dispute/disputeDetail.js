require(['jquery','bootstrap'],function($){
    // 撤销纠纷点击
    $("#disputeCancel").on("click",function(){
        $(".modal_1").modal("show");
        $("#modalInfo_1").text("请确定是否要撤销纠纷处理申请？").css({fontSize:"18px",color:"#666"});
        $(".modalInfo").html('<span id="modalInfo_1" style="font-size: 18px; color: rgb(102, 102, 102);">请确定是否要撤销纠纷处理申请？</span><p style="font-size: 12px; color:#ff6e27;margin-top:10px;text-align: center">友情提示：撤消后，本次申请将关闭，您可以再次发起。</p>')

    });
    // 点击确认撤销
    $("#md_ok_1").off("click").on("click",function(){

        $.ajax({
            url:"/api/disputeCancel",
            data:{
                orderId:$("#orderId").val(),
                version:$("#version").val(),
                userId:$("#userId").val()
            },
            type:'POST',
            success : function(data){
                if(data.success){
                    //跳转个人中心买货列表页面
                    location.href=$("#configUrl").val()+'/account/order/buy'
                }
            }

        })
    });
});