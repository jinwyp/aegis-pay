require(['jquery', 'bootstrap'],function($){
    $("#remindSeller").on("click",function(){
        $.ajax({
            url:"/api/confirmComplete/test",
            type:"get",
            data:{userId:1,orderId:2},
            success:function(data){
                if(data.success){
                    $(".modal_2").modal("show");
                    $(".modal_2 .bg_img").addClass("yes");
                    $("#modalInfo_2").text("发送成功").css({fontSize:"18px"});
                }
            }
        })
    });
    $("#md_ok_2").on("click",function(){
        $(".modal_2").modal("hide");
    });
});
