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

    //搜索form表单提交
    $("#submit").on("click",function(event,pageno){
       // alert(pageno);
        pageno = pageno || 1;
        $("#page").val(pageno);
        $("#billSearch").submit();
    });

   /* $( "#pagechange" ).on( "click", "a", function() {

    });
*/
    var vm = {};

    //分页相关
    var app = {
        init : function(){
            vm = avalon.define({
                $id: "billController",
                billSearchText  : '',
                billList        : [],
                type            : undefined,

                _currentPages : 1,
                _totalPages : 10,
                _inputCurrentPages : 1,
                _pageArrayLeft : [],
                _pageArrayRight : [],
                _pageArrayMiddle : [],

                _ellipsisLeft : false,
                _ellipsisRight : false,

                _changePage : function(pageNo, event){
                    //event.preventDefault();
                    var tempNo = Number(pageNo);
                    //alert(pageNo);
                    if (tempNo < 1){
                        tempNo = 1
                    }else if (tempNo > vm._totalPages){
                        tempNo = vm._totalPages
                    }

                    vm._currentPages = tempNo;
                    //$("#page").val(tempNo);
                    $("#submit").trigger("click",[tempNo]);

                    //alert(vm._currentPages);
                },

                _showPagination : function () {

                    vm._pageArrayLeft = [];
                    vm._pageArrayRight = [];
                    vm._pageArrayMiddle = [];

                    vm._ellipsisLeft = false;
                    vm._ellipsisRight = false;

                    var paginationShowNumberLimit = 8;
                    var paginationLeftShowNumber = 2;
                    var paginationRightShowNumber = 2;
                    var paginationMiddleShowNumber = 3;

                    var currentPageShowLeftNumber = paginationMiddleShowNumber + 1;
                    var currentPageShowMiddleNumber = Math.ceil(paginationMiddleShowNumber / 2) ;

                    for (var i=1; i<= vm._totalPages; i++){

                        if (vm._totalPages <= paginationShowNumberLimit){
                            vm._pageArrayMiddle.push({value:i});
                        }else{

                            //创建左部分的分页 例如 1,2
                            if ( i <= paginationLeftShowNumber ){ vm._pageArrayLeft.push({value:i}); }

                            //创建右部分的分页 例如 99,100
                            if ( i >= vm._totalPages - (paginationRightShowNumber - 1) ){ vm._pageArrayRight.push({value:i}); }

                            //创建中间部分的分页 例如 49,50,51
                            if (i > paginationLeftShowNumber  && i < vm._totalPages - (paginationRightShowNumber - 1) ) {

                                if (vm._currentPages <= currentPageShowLeftNumber && i <= (currentPageShowLeftNumber + 1) ) {
                                    vm._ellipsisRight = true;
                                    vm._pageArrayMiddle.push({value:i});
                                }

                                if ( vm._currentPages > currentPageShowLeftNumber && vm._currentPages < vm._totalPages - paginationMiddleShowNumber) {
                                    vm._ellipsisLeft = true;
                                    vm._ellipsisRight = true;

                                    if ( i > vm._currentPages - currentPageShowMiddleNumber && i < vm._currentPages + currentPageShowMiddleNumber){
                                        vm._pageArrayMiddle.push({value:i});
                                    }
                                }

                                if ( vm._currentPages >= vm._totalPages - paginationMiddleShowNumber && i >= vm._totalPages - paginationMiddleShowNumber - 1) {
                                    vm._ellipsisLeft = true;
                                    vm._pageArrayMiddle.push({value:i});
                                }
                            }
                        }
                    }
                }
            });


        }

    };

    $( document ).ready( function() {
        app.init();
       // alert($("#count").val());
       // alert($("#pagesize").val());
        vm._totalPages = Math.ceil($("#count").val()/ $("#pagesize").val());
      //  alert(vm._totalPages);
        vm._currentPages = Number($("#page").val());
        vm._showPagination();
    });




});


