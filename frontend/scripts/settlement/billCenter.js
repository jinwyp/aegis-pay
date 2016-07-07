/*
 * 页面脚本
 * */


require(['jquery', 'jQuery.fn.datePicker', 'avalon', 'avalon.pagination'],function($, datePicker, avalon){

    //datePicker
    var transactionRecord= {
        "datepicker": function () {
            var pickerStart, pickerEnd,
                day_1 = 86400000,
                startObj = $(".startDate"),
                endObj = $(".endDate");
                datePackerSettings = {
                    //monthsFull: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    //monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    //weekdaysFull: ['星期日','星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                    //weekdaysShort: ['日','一', '二', '三', '四', '五', '六'],
                    format: 'yyyy-mm-dd',
                    clear: '清空'
                };
            pickerStart = startObj.pickadate(datePackerSettings).pickadate('picker');
            pickerEnd = endObj.pickadate(datePackerSettings).pickadate('picker');
            pickerStart.set("disable", [{from: [1970, 1, 1]}]);
            pickerEnd.set("disable", [{from: [1970, 1, 1]}]);

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
    });

    
    //未认证弹出框
    $(".sureSettle").click(function(){
        //alert("1234")
        $(this).prop("disabled",true);
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
                    $(this).prop("disabled",false);
                }
            }
        });
    });

    //搜索form表单提交
    $("#submitSearch").on("click",function(event,pageno){
       // alert(pageno);
        pageno = pageno || 1;
        $("#page").val(pageno);
        $("#searchForm").submit();
    });


    //分页相关
    var vm = {};

    var app = {
        init : function(){
            vm = avalon.define({
                $id: "paginationController",

                configPagination : {
                    totalPages : 0,
                    currentPage : 1,
                    inputCurrentPages : 1,
                    isShowPagination : true,
                    changePageNo : function(page){
                        $("#submitSearch").trigger("click",[page]);
                    }
                }
            });
        }
    };

    $( document ).ready( function() {
        app.init();

        vm.configPagination.currentPage = Number($("#page").val());
        vm.configPagination.inputCurrentPages = Number($("#page").val());
        vm.configPagination.totalPages = Math.ceil($("#count").val() / $("#pagesize").val());

        if (Number($("#count").val()) < 8) {vm.configPagination.isShowPagination = false}
    });




});


