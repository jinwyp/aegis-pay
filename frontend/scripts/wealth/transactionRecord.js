/*
* 页面脚本
* */

requirejs(['jquery', 'jquery.fancySelect', 'jQuery.fn.datePicker', 'avalon', 'avalon.pagination'], function($, fancySelect, datePicker, avalon){

    var $content = $("#content");
    var $searchType = $("#searchType");

    var transactionRecord={
        "datepicker" : function(){
            var pickerStart, pickerEnd,
                day_1=86400000,
                startObj=$(".startDate"),
                endObj=$(".endDate"),
                datePackerSettings = {
                    //monthsFull: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    //monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    //weekdaysFull: ['星期日','星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                    //weekdaysShort: ['日','一', '二', '三', '四', '五', '六'],
                    format: 'yyyy-mm-dd',
                    clear: '清空'
                };
            pickerStart=startObj.pickadate(datePackerSettings).pickadate('picker');
            pickerEnd=endObj.pickadate(datePackerSettings).pickadate('picker');
            pickerStart.set("disable", [{ from: [1970,1,1] }]);
            pickerEnd.set("disable", [{ from: [1970,1,1]}]);

            startObj.on("change",function(){
                if(new Date(startObj.val()).getTime() > new Date(endObj.val()).getTime()){
                    endObj.val("");
                }
                pickerEnd.set("enable", true);
                pickerEnd.set("disable", [
                    { from: [1970,1,1], to:  new Date(new Date(startObj.val()).getTime()-day_1)}
                ]);
            });
        },
        "initContentInput": function () {
            if($searchType.val()==0){
                $content.val("");
                $content.attr("disabled",true);
                $content.addClass("disabled-bg");
                $content.attr("placeholder","");
            }else if($searchType.val()==1){
                $content.attr("disabled",false);
                $content.removeClass("disabled-bg");
                $content.attr("placeholder","请输入订单编号");
            }else if($searchType.val()==2){
                $content.attr("disabled",false);
                $content.removeClass("disabled-bg");
                $content.attr("placeholder","请输入合同编号");
            }else if($searchType.val()==3){
                $content.attr("disabled",false);
                $content.removeClass("disabled-bg");
                $content.attr("placeholder","请输入交易流水号");
            }else if($searchType.val()==4){
                $content.attr("disabled",false);
                $content.removeClass("disabled-bg");
                $content.attr("placeholder","请输入公司名称");
            }
        }
    };

    transactionRecord.datepicker();
    transactionRecord.initContentInput();

    // 绑定 下拉框插件
    $('[name=type]').fancySelect().on('change.fs', function() {
        $(this).trigger('change.$');
        //$subBtn.prop('disabled', $.trim(this.value)==='--');
    });

    $('[name=status]').fancySelect().on('change.fs', function() {
        $(this).trigger('change.$');
        //$subBtn.prop('disabled', $.trim(this.value)==='--');
    });

    $searchType.fancySelect().on('change.fs', function() {
        $(this).trigger('change.$');
        //$subBtn.prop('disabled', $.trim(this.value)==='--');
    });

    $searchType.on("change", function(){
        transactionRecord.initContentInput();
    });

    //--------------------------交易管理模块的操作-----------------------------

    //提醒签订合同
    $(".notice-signContract").click(function(){
        $("#modal_title_2").text("温馨提示");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        var orderId= $(this).data("id");
        $.ajax({
            url:"/toNoticeBuyerSignContract?orderId="+orderId,
            success:function(data){
                if(data&&data.success){
                    $("#modalInfo_2").text("您的请求已通过短信的方式通知对方,请您耐心等待");
                }else{
                    $("#modalInfo_2").text(data.error);
                }
                $(".modal_2").modal('show');
            }
        });
        return false;
    });

    //签订合同
    $(".btn-signContract").click(function(){
        location.href="/compact?orderId="+$(this).data("id");
        return false;
    });

    //提醒买家确认提货
    $(".notice-confirmDelivery").click(function(){
        $("#modal_title_2").text("温馨提示");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        var orderId=$(this).data("id");
        $.ajax({
            url:"/toNoticeBuyerPayMoney?orderId="+orderId,
            success:function(data){
                if(data&&data.success){
                    $("#modalInfo_2").text("您的请求已通过短信的方式通知对方,请您耐心等待");
                }else{
                    $("#modalInfo_2").text(data.error);
                }
                $(".modal_2").modal('show');
            }
        });
        return false;
    });

    //付款
    $(".btn-payMoney").click(function(){
        location.href="/pay?type=1&orderId="+$(this).data("id");
        return false;
    });

    //提醒买家确认提货
    $(".notice-confirmDelivery").click(function(){
        $("#modal_title_2").text("温馨提示");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        var orderId=$(this).data("id");
        $.ajax({
            url:"/toNoticeBuyerToDelivery?orderId="+orderId,
            success:function(data){
                if(data&&data.success){
                    $("#modalInfo_2").text("您的请求已通过短信的方式通知对方,请您耐心等待");
                }else{
                    $("#modalInfo_2").text(data.error);
                }
                $(".modal_2").modal('show');
            }
        });
        return false;
    });

    //确认提货/重新确认提货
    $(".btn-deliveryGoods").click(function(){
        location.href="/confirmDelivery?orderId="+$(this).data("id");
        return false;
    });

    //查看提货详情
    $(".btn-deliveryDetail").click(function(){
        location.href="/getBuyOrderDetail?orderId="+$(this).data("id");
        return false;
    });

    //查看退货详情
    $(".btn-returnDetail").click(function(){
        location.href="/return?orderId="+$(this).data("id");
        return false;
    });

    //审核提货
    $(".btn-auditDelivery").click(function(){
        location.href="/getBuyOrderDetail?orderId="+$(this).data("id");
        return false;
    });

    //开具结算单
    $(".btn-settleAccounts").click(function(){
        location.href="/settlement/settlementForm?type=2&id="+$(this).data("id");
        return false;
    });

    //确认结算单
    $(".btn-confirmSettle").click(function(){
        location.href="/settlement/settlementForm?type=1&id="+$(this).data("id");
    });

    //买家查看结算单
    $(".btn-buyerLookSettle").click(function(){
        location.href="/settlement/settlementForm?type=1&id="+$(this).data("id");
        return false;
    });
    //卖家查看结算单
    $(".btn-sellerLookSettle").click(function(){
        location.href="/settlement/settlementForm?type=2&id="+$(this).data("id");
        return false;
    });

    //买家修改结算单
    $(".btn-buyerUpdateSettle").click(function(){
        location.href="/settlement/settlementForm?type=1&id="+$(this).data("id");
        return false;
    });

    //卖家修改结算单
    $(".btn-sellerUpdateSettle").click(function(){
        location.href="/settlement/settlementForm?type=2&id="+$(this).data("id");
        return false;
    });

    //提醒卖家结算
    $(".notice-sellerSettle").click(function(){
        $("#modal_title_2").text("温馨提示");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        var orderId=$(this).data("id");
        $.ajax({
            url:"/toNoticeSellerToSettle?orderId="+orderId,
            success:function(data){
                if(data&&data.success){
                    $("#modalInfo_2").text("您的请求已通过短信的方式通知对方,请您耐心等待");
                }else{
                    $("#modalInfo_2").text(data.error);
                }
                $(".modal_2").modal('show');
            }
        });
        return false;
    });

    //提醒卖家退款
    $(".notice-sellerRetrunMoney").click(function(){
        $("#modal_title_2").text("温馨提示");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        var orderId=$(this).data("id");
        $.ajax({
            url:"/toNoticeSellerReturnMoney?orderId="+orderId,
            success:function(data){
                if(data&&data.success){
                    $("#modalInfo_2").text("您的请求已通过短信的方式通知对方,请您耐心等待");
                }else{
                    $("#modalInfo_2").text(data.error);
                }
                $(".modal_2").modal('show');
            }
        });
        return false;
    });

    //退款
    $(".btn-retrunMoney").click(function(){
        location.href="/pay?type=3&orderId="+$(this).data("id");
        return false;
    });

    //补款
    $(".btn-tailMoney").click(function(){
        location.href="/pay?type=2&orderId="+$(this).data("id");
        return false;
    });

    //提醒卖家开发票
    $(".notice-sellerWriteReceipt").click(function(){
        $("#modal_title_2").text("温馨提示");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        var orderId=$(this).data("id");
        $.ajax({
            url:"/toNoticeSellerWriteReceipt?orderId="+orderId,
            success:function(data){
                if(data&&data.success){
                    $("#modalInfo_2").text("您的请求已通过短信的方式通知对方,请您耐心等待");
                }else{
                    $("#modalInfo_2").text(data.error);
                }
                $(".modal_2").modal('show');
            }
        });
        return false;
    });

    //完善开票信息
    $(".btn-improveReceipt").click(function(){
        location.href="/settlement/confirmTheInvoice?orderId="+$(this).data("id");
        return false;
    });

    //确认已开发票
    $(".btn-writeReceipt").click(function(){
        $("#modal_title_1").text("温馨提示");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        var orderId=$(this).data("id");
        var version=$(this).data("version");
        $.ajax({
            url:"/toNoticeReceiveReceipt?orderId="+orderId+"&version="+version,
            success:function(data){
                if(data&&data.success){
                    $("#modalInfo_2").text("您的请求已通过短信的方式通知对方,请您耐心等待");
                }else{
                    $("#modalInfo_2").text(data.error);
                }
                $(".modal_2").modal('show');
            }
        });
        return false;
    });

    //确认收到发票
    $(".btn-receiveReceipt").click(function(){
        $("#modal_title_3").text("温馨提示");
        $('#md_ok_3').val("确定");

        $("#modal_title_1").text("温馨提示");
        $('#md_ok_1').val("确定");
        $("#md_ok_1").off("click").on("click",function(){
            $(".modal_2").modal('hide');
            location.reload();
        });
        var orderId=$(this).data("id");
        var version=$(this).data("version");
        $.ajax({
            url:"/settlement/sureReceiveReceipt?orderId="+orderId+"&version="+version,
            success:function(data){
                if(data&&data.success){
                    $("#modalInfo_1").text("您的请求已通过短信的方式通知对方,请您耐心等待");
                    $(".modal_1").modal('show');
                }else{
                    $("#modalInfo_3").text(data.error);
                    $(".modal_3").modal('show');
                }
            }
        });
        return false;
    });

    //申请纠纷处理
    $(".btn-applyDispute").click(function(){
        location.href="/dispute/disputeApply?orderId="+$(this).data("id");
        return false;
    });
    //纠纷处理
    $(".btn-dealDispute").click(function(){
        location.href="/dispute/disputeDetail?orderId="+$(this).data("id");
        return false;
    });
    //查看纠纷详情
    $(".btn-lookDispute").click(function(){
        location.href="/dispute/disputeComplete?orderId="+$(this).data("id");
        return false;
    });
    //删除
    $(".btn-delete").click(function(){
        $("#modal_title_1").text("温馨提示");
        $("#modalInfo_1").text("您确认删除该订单吗");
        $('#md_ok_1').val("确定");
        $(".modal_1").modal('show');
        var id=$(this).data("id"),
            version=$(this).data("version");
        $("#md_ok_1").off("click").on("click",function(){
            $.ajax({
                url:"/account/deleteOrder",
                data:{id:id,version:version},
                success:function(data){
                    if(data){
                        $(".modal_1").modal('hide');
                        location.reload();
                    }else{
                        $("#modal_title_3").text("温馨提示");
                        $("#modalInfo_3").text(data.error);
                        $(".modal_3").modal('show');
                    }
                }
            });
        });
        return false;
    });
    //关闭交易
    $(".btn-closeTrade").click(function(){
        location.href="/order/orderClose?id="+$(this).data("id");
        return false;
    });

    //--------------------------合同管理模块的操作-----------------------------
    //下载
    $(".btn-download").click(function(){
        var id = $(this).data('value');
        location.href="/downloadContract?orderId="+$(this).data("id");
        //alert('暂无配置下载路径');
    });

    //--------------------------结算管理模块的操作-----------------------------
    ////修改结算
    //$(".btn-updateSettle").click(function(){
    //    window.open(host+"/order/orderClose?id="+$(this).data("value"));
    //});
    ////确认结算
    //$(".btn-confirmSettle").click(function(){
    //    window.open(host+"/order/orderClose?id="+$(this).data("value"));
    //});
    ////补款
    //$(".btn-pay").click(function(){
    //    window.open(host+"/order/orderClose?id="+$(this).data("value"));
    //});
    ////完善开票信息
    //$(".btn-updateInfo").click(function(){
    //    window.open(host+"/order/orderClose?id="+$(this).data("value"));
    //});
    ////结算
    //$(".btn-settle").click(function(){
    //    window.open(host+"/order/orderClose?id="+$(this).data("value"));
    //});
    ////退款
    //$(".btn-returnMoney").click(function(){
    //    window.open(host+"/order/orderClose?id="+$(this).data("value"));
    //});



    //搜索form表单提交
    $("#submitSearch").on("click",function(event, pageno){
        // alert(pageno);
        pageno = pageno || 1;
        $("#page").val(pageno);
        $("#searchForm").submit();
    });

    //分页相关
    var vm = {};
    var app = {
        init :function (){
            vm = avalon.define({
                $id: "financialPaginationController",

                configPagination : {
                    totalPages : 1,
                    currentPage : 1,
                    inputCurrentPages : 1,
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

    });


});


