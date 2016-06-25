/*
 * 页面脚本
 * */


require(['jquery','bootstrap'],function($){

    //删除
    $("#delete").click(function () {
        $.ajax({
            url:"/settlement/billDelete",
            type: 'post',
            success:function(data){
                if(data.success){
                    location.reload();
                }
                else{

                }
            }
        });
    })

    //sideBar切换

    $(".sideBar li a").click(function(){
        var dl = $(this).siblings('dl');
        if( dl.length>0){
            dl.toggle();
            if(dl.css("display") == "block"){
                $(this).children(".triangle").removeClass("ico_triangle_right").addClass("ico_triangle_down");
            }else{
                $(this).children(".triangle").removeClass("ico_triangle_down").addClass("ico_triangle_right");
            }
        }
    })


});


