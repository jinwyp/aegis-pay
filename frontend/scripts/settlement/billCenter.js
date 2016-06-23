/*
 * 页面脚本
 * */


require(['jquery','bootstrap','jQuery.fn.datePicker','avalon'],function($){

    //datePicker
    var transactionRecord= {
        "datepicker": function () {
            var pickerStart, pickerEnd,
                day_1 = 86400000,
                startObj = $(".startDate"),
                endObj = $(".endDate");
            pickerStart = startObj.pickadate({}).pickadate('picker');
            pickerEnd = endObj.pickadate({}).pickadate('picker');
            //pickerStart.set("disable", [{from: [1970, 1, 1]}]);
            //pickerEnd.set("disable", [{from: [1970, 1, 1]}]);

            startObj.on("change", function () {
                if (new Date(startObj.val()).getTime() > new Date(endObj.val()).getTime()) {
                    endObj.val("");
                }
                pickerEnd.set("enable", true);
                pickerEnd.set("disable", [
                    {from: [1970, 1, 1], to: new Date(new Date(startObj.val()).getTime() - day_1)}
                ]);
            });
        },
        //sidebar
        "sideBar":function(){
            var type = $("#type").val();
            if(!type){
                $(".sideBar .dd_0").addClass("current");
            }else if(type == 1){
                $(".sideBar .dd_1").addClass("current");
            }else if(type == 2){
                $(".sideBar .dd_2").addClass("current");
            }
        }
    }

    transactionRecord.datepicker();
    transactionRecord.sideBar();

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




    //未认证弹出框
    $(".sureSettle").click(function(){
        $.ajax({
            url:"/settlement/receiveReceipt",
            type: 'post',
            data:{orderId:$(".sureSettle").attr("name")},
            success:function(data){
                if(data.success){
                    $(".modal_2").modal();
                    $("#modalImg_2").addClass("yes").removeClass("attention");
                    $("#modalInfo_2").html("发票开具完成，已短信通知买家！");
                    $("#modalInfo_2").css({fontSize:"16px"});
                    $("#md_ok_2").click(function(){
                        $(".modal_2").modal("hide");
                        location.reload();
                    })
                }
                else{

                }
            }
        });

    });



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


    $("#submit").click(function(){
        $("#billSearch").submit();
    })
    

});


