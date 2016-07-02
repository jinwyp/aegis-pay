require(['jquery','jQuery.fn.datePicker'],function($){

    //打印订单
    $(".btn-print").click(function(){
        window.open('/printDetail?orderId='+$("#orderId").val());
    });

    //提醒签订合同
    $(".notice-signContract").click(function(){
        $("#modal_title_2").text("温馨提示");
        $("#modalInfo_2").text("您的请求已通过短信的方式通知对方,请您耐心等待");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        var orderId=$("#orderId").val();
        $.ajax({
            url:"/toNoticeBuyerSignContract",
            data:{orderId:orderId},
            success:function(data){
                if(data){
                    $(".modal_2").modal('show');
                    //alert('请求成功了');
                    //if(data.success){
                    //  $(".modal_2").modal('show');
                    //}else{
                    //  alert(data.error);
                    //}
                }
            }
        });
    });

    //签订合同
    $(".btn-signContract").click(function(){
        location.href="/compact?orderId="+$("#orderId").val();
    });

    //提醒买家确认提货
    $(".notice-confirmDelivery").click(function(){
        $("#modal_title_2").text("温馨提示");
        $("#modalInfo_2").text("您的请求已通过短信的方式通知对方,请您耐心等待");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        var orderId=$("#orderId").val();
        $.ajax({
            url:"/toNoticeBuyerPayMoney",
            data:{orderId:orderId},
            success:function(data){
                if(data){
                    $(".modal_2").modal('show');
                    //alert('请求成功了');
                    //if(data.success){
                    //  $(".modal_2").modal('show');
                    //}else{
                    //  alert(data.error);
                    //}
                }
            }
        });
    });

    //付款
    $(".btn-payMoney").click(function(){
        location.href="/pay?type=1&orderId="+$("#orderId").val();
    });

    //提醒买家确认提货
    $(".notice-confirmDelivery").click(function(){
        $("#modal_title_2").text("温馨提示");
        $("#modalInfo_2").text("您的请求已通过短信的方式通知对方,请您耐心等待");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        var orderId=$("#orderId").val();
        $.ajax({
            url:"/toNoticeBuyerToDelivery",
            data:{orderId:orderId},
            success:function(data){
                if(data){
                    $(".modal_2").modal('show');
                    //alert('请求成功了');
                    //if(data.success){
                    //  $(".modal_2").modal('show');
                    //}else{
                    //  alert(data.error);
                    //}
                }
            }
        });
    });

    //确认提货/重新确认提货
    $(".btn-deliveryGoods").click(function(){
        location.href="/confirmDelivery?orderId="+$("#orderId").val();
    });

    //查看提货详情
    $(".btn-deliveryDetail").click(function(){
        window.open("/getBuyOrderDetail?orderId="+$("#orderId").val());
    });

    //查看退货详情
    $(".btn-returnDetail").click(function(){
        window.open("/return?orderId="+$("#orderId").val());
    });

    //审核提货
    $(".btn-auditDelivery").click(function(){
        window.open("/getBuyOrderDetail?orderId="+$("#orderId").val());
    });

    //开具结算单
    $(".btn-settleAccounts").click(function(){
        window.open("/settlement/settlementForm?type=2&id="+$("#orderId").val());
    });

    //确认结算单
    $(".btn-confirmSettle").click(function(){
        window.open("/settlement/settlementForm?type=1&id="+$("#orderId").val());
    });

    //买家查看结算单
    $(".btn-buyerLookSettle").click(function(){
        window.open("/settlement/settlementForm?type=1&id="+$("#orderId").val());
    });
    //卖家查看结算单
    $(".btn-sellerLookSettle").click(function(){
        window.open("/settlement/settlementForm?type=2&id="+$("#orderId").val());
    });

    //买家修改结算单
    $(".btn-buyerUpdateSettle").click(function(){
        window.open(host+"/settlement/settlementForm?type=1&id="+$("#orderId").val());
    });

    //卖家修改结算单
    $(".btn-sellerUpdateSettle").click(function(){
        window.open(host+"/settlement/settlementForm?type=2&id="+$("#orderId").val());
    });

    //提醒卖家结算
    $(".notice-sellerSettle").click(function(){
        $("#modal_title_2").text("温馨提示");
        $("#modalInfo_2").text("您的请求已通过短信的方式通知对方,请您耐心等待");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        var orderId=$("#orderId").val();
        $.ajax({
            url:"/toNoticeSellerToSettle",
            data:{orderId:orderId},
            success:function(data){
                if(data){
                    $(".modal_2").modal('show');
                    //alert('请求成功了');
                    //if(data.success){
                    //  $(".modal_2").modal('show');
                    //}else{
                    //  alert(data.error);
                    //}
                }
            }
        });
    });

    //提醒卖家退款
    $(".notice-sellerRetrunMoney").click(function(){
        $("#modal_title_2").text("温馨提示");
        $("#modalInfo_2").text("您的请求已通过短信的方式通知对方,请您耐心等待");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        var orderId=$("#orderId").val();
        $.ajax({
            url:"/toNoticeSellerReturnMoney",
            data:{orderId:orderId},
            success:function(data){
                if(data){
                    $(".modal_2").modal('show');
                    //alert('请求成功了');
                    //if(data.success){
                    //  $(".modal_2").modal('show');
                    //}else{
                    //  alert(data.error);
                    //}
                }
            }
        });
    });

    //退款
    $(".btn-retrunMoney").click(function(){
        window.open(host+"/pay?type=3&orderId="+$("#orderId").val());
    });

    //补款
    $(".btn-tailMoney").click(function(){
        window.open(host+"/pay?type=2&orderId="+$("#orderId").val());
    });

    //提醒卖家开发票
    $(".notice-sellerWriteReceipt").click(function(){
        $("#modal_title_2").text("温馨提示");
        $("#modalInfo_2").text("您的请求已通过短信的方式通知对方,请您耐心等待");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        var orderId=$("#orderId").val();
        $.ajax({
            url:"/toNoticeSellerWriteReceipt",
            data:{orderId:orderId},
            success:function(data){
                if(data){
                    $(".modal_2").modal('show');
                    //alert('请求成功了');
                    //if(data.success){
                    //  $(".modal_2").modal('show');
                    //}else{
                    //  alert(data.error);
                    //}
                }
            }
        });
    });

    //完善开票信息
    $(".btn-improveReceipt").click(function(){
        window.open(host+"/settlement/confirmTheInvoice?orderId＝"+$(this).data(orderid));
    });

    //确认已开发票
    $(".btn-writeReceipt").click(function(){
        $("#modal_title_1").text("温馨提示");
        $("#modalInfo_1").text("您将通过短信的方式通知买方已经开票,请您耐心等待");
        $('#md_ok_1').val("确定");
        $("#md_ok_1").off("click").on("click",function(){
            $(".modal_1").modal('hide');
        });
        var orderId=$("#orderId").val();
        var version=$("#version").val();
        $.ajax({
            url:"/toNoticeReceiveReceipt",
            data:{orderId:orderId,version:version},
            success:function(data){
                if(data){
                    $(".modal_1").modal('show');
                    //alert('请求成功了');
                    //if(data.success){
                    //  $(".modal_2").modal('show');
                    //}else{
                    //  alert(data.error);
                    //}
                }
            }
        });
    });

    //确认收到发票
    $(".btn-receiveReceipt").click(function(){
        $("#modal_title_1").text("温馨提示");
        $("#modalInfo_1").text("您将通过短信的方式通知买方已经开票,请您耐心等待");
        $('#md_ok_1').val("确定");
        $("#md_ok_1").off("click").on("click",function(){
            $(".modal_1").modal('hide');
        });
        var orderId=$("#orderId").val();
        var version=$("#version").val();
        $.ajax({
            url:"/settlement/sureReceiveReceipt",
            data:{orderId:orderId,version:version},
            success:function(data){
                if(data){
                    $(".modal_1").modal('show');
                    //alert('请求成功了');
                    //if(data.success){
                    //  $(".modal_2").modal('show');
                    //}else{
                    //  alert(data.error);
                    //}
                }
            }
        });
    });

    //申请纠纷处理
    $(".btn-applyDispute").click(function(){
        location.href="/dispute/disputeApply?orderId="+$("#orderId").val();
    });
    //纠纷处理
    $(".btn-dealDispute").click(function(){
        location.href="/dispute/disputeDetail?orderId="+$("#orderId").val();
    });
    //查看纠纷详情
    $(".btn-lookDispute").click(function(){
        location.href="/dispute/disputeComplete?orderId="+$("#orderId").val();
    });
    //删除
    $(".btn-delete").click(function(){
        //window.open("/settlement/settlementForm?id="+$(this).data(orderid));
    });
    //关闭交易
    $(".btn-closeTrade").click(function(){
        location.href="/order/orderClose?id="+$("#orderId").val();
    });
});
