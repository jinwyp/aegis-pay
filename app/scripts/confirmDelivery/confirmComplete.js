require(['jquery', 'bootstrap'],function($){
    $("#remindSeller").on("click",function(){
        $(".modal_2").modal("show");
        $(".modal_2 .bg_img").addClass("yes");
        $("#modalInfo_2").text("发送成功");
    });
    $("#md_ok_2").on("click",function(){
        $(".modal_2").modal("hide");
    });
});
