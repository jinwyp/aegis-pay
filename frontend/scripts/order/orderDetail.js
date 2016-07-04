require(['jquery','jQuery.fn.datePicker'],function($){

    //打印订单
    $(".btn-print").click(function(){
        window.open('/printDetail?orderId='+$("#orderId").val());
    });

    //提醒签订合同
    $(".notice-signContract").click(function(){
        $("#modal_title_2").text("温馨提示");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        var orderId=$("#orderId").val();
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
    });

    //签订合同
    $(".btn-signContract").click(function(){
        location.href="/compact?orderId="+$("#orderId").val();
    });

    //提醒买家确认提货
    $(".notice-confirmDelivery").click(function(){
        $("#modal_title_2").text("温馨提示");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        var orderId=$("#orderId").val();
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
    });

    //付款
    $(".btn-payMoney").click(function(){
        location.href="/pay?type=1&orderId="+$("#orderId").val();
    });

    //提醒买家确认提货
    $(".notice-confirmDelivery").click(function(){
        $("#modal_title_2").text("温馨提示");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        var orderId=$("#orderId").val();
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
    });

    //确认提货/重新确认提货
    $(".btn-deliveryGoods").click(function(){
        location.href="/confirmDelivery?orderId="+$("#orderId").val();
    });

    //查看提货详情
    $(".btn-deliveryDetail").click(function(){
        location.href="/getBuyOrderDetail?orderId="+$("#orderId").val();
    });

    //查看退货详情
    $(".btn-returnDetail").click(function(){
        location.href="/return?orderId="+$("#orderId").val();
    });

    //审核提货
    $(".btn-auditDelivery").click(function(){
        location.href="/getBuyOrderDetail?orderId="+$("#orderId").val();
    });

    //开具结算单
    $(".btn-settleAccounts").click(function(){
        location.href="/settlement/settlementForm?type=2&id="+$("#orderId").val();
    });

    //确认结算单
    $(".btn-confirmSettle").click(function(){
        location.href="/settlement/settlementForm?type=1&id="+$("#orderId").val();
    });

    //买家查看结算单
    $(".btn-buyerLookSettle").click(function(){
        location.href="/settlement/settlementForm?type=1&id="+$("#orderId").val();
    });
    //卖家查看结算单
    $(".btn-sellerLookSettle").click(function(){
        location.href="/settlement/settlementForm?type=2&id="+$("#orderId").val();
    });

    //买家修改结算单
    $(".btn-buyerUpdateSettle").click(function(){
        location.href="/settlement/settlementForm?type=1&id="+$("#orderId").val();
    });

    //卖家修改结算单
    $(".btn-sellerUpdateSettle").click(function(){
        location.href="/settlement/settlementForm?type=2&id="+$("#orderId").val();
    });

    //提醒卖家结算
    $(".notice-sellerSettle").click(function(){
        $("#modal_title_2").text("温馨提示");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        var orderId=$("#orderId").val();
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
    });

    //提醒卖家退款
    $(".notice-sellerRetrunMoney").click(function(){
        $("#modal_title_2").text("温馨提示");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        var orderId=$("#orderId").val();
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
    });

    //退款
    $(".btn-retrunMoney").click(function(){
        location.href="/pay?type=3&orderId="+$("#orderId").val();
    });

    //补款
    $(".btn-tailMoney").click(function(){
        location.href="/pay?type=2&orderId="+$("#orderId").val();
    });

    //提醒卖家开发票
    $(".notice-sellerWriteReceipt").click(function(){
        $("#modal_title_2").text("温馨提示");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        var orderId=$("#orderId").val();
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
    });

    //完善开票信息
    $(".btn-improveReceipt").click(function(){
        location.href="/settlement/confirmTheInvoice?orderId＝"+$("#orderId").val();
    });

    //确认已开发票
    $(".btn-writeReceipt").click(function(){
        $("#modal_title_2").text("温馨提示");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        var orderId=$("#orderId").val();
        var version=$("#version").val();
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
    });

    //确认收到发票
    $(".btn-receiveReceipt").click(function(){
        $("#modal_title_3").text("温馨提示");
        $('#md_ok_3').val("确定");

        $("#modal_title_2").text("温馨提示");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
            location.reload();
        });
        var orderId=$("#orderId").val();
        var version=$("#version").val();
        $.ajax({
            url:"/settlement/sureReceiveReceipt?orderId="+orderId+"&version="+version,
            success:function(data){
                if(data&&data.success){
                    $("#modalInfo_2").text("您的请求已通过短信的方式通知对方,请您耐心等待");
                    $(".modal_2").modal('show');
                }else{
                    $("#modalInfo_3").text(data.error);
                    $(".modal_3").modal('show');
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
    });
    //关闭交易
    $(".btn-closeTrade").click(function(){
        location.href="/order/orderClose?id="+$("#orderId").val();
    });
});
