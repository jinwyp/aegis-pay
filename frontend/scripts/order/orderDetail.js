require(['jquery','jQuery.fn.datePicker'],function($){

    //打印订单
    $(".btn-print").click(function(){
        window.open('/printDetail?orderId='+$("#orderId").val());
    });

    //提醒签订合同
    $(".notice-signContract").click(function(){
        alert("测试");
        $("#modal_title_2").text("温馨提示");
        $("#modalInfo_2").text("您的请求已通过短信的方式通知对方,请您耐心等待");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        console.log(host+"/toNoticeSellerToSettle");
        $.ajax({
            url:host+"/toNoticeSellerToSettle",
            data:{orderId:$("#orderId").val()},
            success:function(data){
                if(data){
                    alert('请求成功了');
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

    //提醒付款
    $(".notice-payMoney").click(function(){
        alert("测试");
        $("#modal_title_2").text("温馨提示");
        $("#modalInfo_2").text("您的请求已通过短信的方式通知对方,请您耐心等待");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        console.log(host+"/toNoticeSellerToSettle");
        $.ajax({
            url:host+"/toNoticeSellerToSettle",
            data:{orderId:$("#orderId").val()},
            success:function(data){
                if(data){
                    alert('请求成功了');
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
        location.href="/pay?id="+$("#orderId").val();
    });

    //提醒买家确认提货
    $(".notice-confirmDelivery").click(function(){
        alert("测试");
        $("#modal_title_2").text("温馨提示");
        $("#modalInfo_2").text("您的请求已通过短信的方式通知对方,请您耐心等待");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        console.log(host+"/toNoticeSellerToSettle");
        $.ajax({
            url:host+"/toNoticeSellerToSettle",
            data:{orderId:$("#orderId").val()},
            success:function(data){
                if(data){
                    alert('请求成功了');
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
        alert("测试");
        location.href="/confirmDelivery?orderId="+$("#orderId").val();
    });

    //查看提货详情
    $(".btn-deliveryDetail").click(function(){
        alert("测试");
        window.open(host+"/getBuyOrderDetail?orderId="+$("#orderId").val());
    });

    //查看退货详情
    $(".btn-returnDetail").click(function(){
        alert("测试");
        window.open(host+"/getBuyOrderDetail?orderId="+$("#orderId").val());
    });

    //审核提货
    $(".btn-auditDelivery").click(function(){
        alert("测试");
        window.open(host+"/getBuyOrderDetail?orderId="+$("#orderId").val());
    });

    //提醒开具结算单
    $(".notice-settleAccounts").click(function(){
        alert("测试");
        $("#modal_title_2").text("温馨提示");
        $("#modalInfo_2").text("您的请求已通过短信的方式通知对方,请您耐心等待");
        $('#md_ok_2').val("确定");
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        console.log(host+"/toNoticeSellerToSettle");
        $.ajax({
            url:host+"/toNoticeSellerToSettle",
            data:{orderId:$("#orderId").val()},
            success:function(data){
                if(data){
                    alert('请求成功了');
                    //if(data.success){
                    //  $(".modal_2").modal('show');
                    //}else{
                    //  alert(data.error);
                    //}
                }
            }
        });
    });

    //开具结算单
    $(".btn-settleAccounts").click(function(){
        alert("测试");
        window.open(host+"/getBuyOrderDetail?orderId="+$("#orderId").val());
    });

    //确认结算单
    $(".btn-confirmSettle").click(function(){
        alert("测试");
        window.open(host+"/getBuyOrderDetail?orderId="+$("#orderId").val());
    });

    //查看结算单
    $(".btn-lookSettle").click(function(){
        alert("测试");
        window.open(host+"/settlement/settlementForm?id="+$("#orderId").val());
    });

    //修改结算单
    $(".btn-updateSettle").click(function(){
        alert("测试");
        window.open(host+"/settlement/settlementForm?id="+$("#orderId").val());
    });

    //提醒卖家结算
    $(".notice-sellerSettle").click(function(){
        alert("测试");
        $("#modal_title_2").text("温馨提示");
        $("#modalInfo_2").text("您的请求已通过短信的方式通知对方,请您耐心等待");
        $('#md_ok_2').val("确定");
        $(".modal_2").modal('show');
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        //$.ajax({
        //  url:host+"toNoticeSellerToSettle",
        //  data:{orderId:aaaa,userId:2222},
        //  success:function(data){
        //    if(data){
        //
        //    }
        //  }
        //});
    });

    //提醒卖家退款
    $(".notice-sellerRetrunMoney").click(function(){
        alert("测试");
        $("#modal_title_2").text("温馨提示");
        $("#modalInfo_2").text("您的请求已通过短信的方式通知对方,请您耐心等待");
        $('#md_ok_2').val("确定");
        $(".modal_2").modal('show');
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        //$.ajax({
        //  url:host+"toNoticeSellerToSettle",
        //  data:{orderId:aaaa,userId:2222},
        //  success:function(data){
        //    if(data){
        //
        //    }
        //  }
        //});
    });

    //退款
    $(".btn-retrunMoney").click(function(){
        alert("测试");
        window.open(host+"/settlement/settlementForm?id="+$("#orderId").val());
    });

    //提醒卖家开发票
    $(".notice-sellerWriteReceipt").click(function(){
        alert("测试");
        $("#modal_title_2").text("温馨提示");
        $("#modalInfo_2").text("您的请求已通过短信的方式通知对方,请您耐心等待");
        $('#md_ok_2').val("确定");
        $(".modal_2").modal('show');
        $("#md_ok_2").off("click").on("click",function(){
            $(".modal_2").modal('hide');
        });
        //$.ajax({
        //  url:host+"toNoticeSellerToSettle",
        //  data:{orderId:aaaa,userId:2222},
        //  success:function(data){
        //    if(data){
        //
        //    }
        //  }
        //});
    });

    //确认已开发票
    $(".btn-writeReceipt").click(function(){
        alert("测试");
        //window.open(host+"/settlement/settlementForm?id="+$(this).data(orderid));
    });

    //确认收到发票
    $(".btn-receiveReceipt").click(function(){
        alert("测试");
        //window.open(host+"/settlement/settlementForm?id="+$(this).data(orderid));
    });

    //完善开票信息
    $(".btn-improveReceipt").click(function(){
        alert("测试");
        //window.open(host+"/settlement/settlementForm?id="+$(this).data(orderid));
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
        alert("测试");
        //window.open(host+"/settlement/settlementForm?id="+$(this).data(orderid));
    });
    //关闭交易
    $(".btn-closeTrade").click(function(){
        location.href="/order/orderClose?id="+$("#orderId").val();
    });
});
