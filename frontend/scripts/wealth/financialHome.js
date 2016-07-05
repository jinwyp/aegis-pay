/*
* 页面脚本
* */

requirejs([ 'jquery', 'jquery.fancySelect', 'jQuery.fn.datePicker', 'avalon', 'avalon.pagination'], function( $, fancySelect, datePicker, avalon){

    $(".recharge").click(function(){
        $(".bubble").removeClass("bubble-hidden");
    });

    $(".close").click(function(){
        $(".bubble").addClass("bubble-hidden");
    });


    var vm = {};
    var searchQuery = {
        orderCategory : '',
        orderDateFrom : '',
        orderDateTo : '',
        orderSearchType : '',
        orderSearchText : '',
        currentPage : 1
    };
    var app = {
        init : function(){
            var $formSelectOrderCategory = $('[name=orderCategory]');
            var $formSelectOrderSearchType = $('[name=orderSearchType]');

            var $formDateFrom = $('.orderDateFrom').pickadate({format:'yyyy-mm-dd', max:true});
            var $formDateTo = $('.orderDateTo').pickadate({max:true});

            var $formDownloadDateFrom = $('[name=orderDownloadDateFrom]').pickadate({format:'yyyy-mm-dd', max:true});
            var $formDownloadDateTo = $('[name=orderDownloadDateTo]').pickadate({max:true});


            $formSelectOrderCategory.fancySelect().on('change.fs', function() {
                $(this).trigger('change.$');        //demand.fancySelect.trigger("update");
                searchQuery.orderCategory = this.value;
            });
            $formSelectOrderSearchType.fancySelect().on('change.fs', function() {
                $(this).trigger('change.$');        //demand.fancySelect.trigger("update");
                searchQuery.orderSearchType = this.value;
            });

            $('#downloadExcel').on('show.bs.modal', function (e) {
                console.log( $formDateTo.val());
                console.log( $formDateTo.pickadate('picker').get());

                $formDownloadDateFrom.pickadate('picker').set('select', $formDateFrom.val(), { format: 'yyyy-mm-dd' });
                $formDownloadDateTo.pickadate('picker').set('select', $formDateTo.val(), { format: 'yyyy-mm-dd' });
            });


            $( ".button_pdf" ).click(function() {
                window.open('/wealth/financialDetailsDownload?filetype=pdf&orderDateFromDownload=' + $formDownloadDateFrom.val() + '&orderDateToDownload=' + $formDownloadDateTo.val(), '_blank');
            });

            $( ".button_xls" ).click(function() {
                window.open('/wealth/financialDetailsDownload?filetype=excel&orderDateFromDownload=' + $formDownloadDateFrom.val() + '&orderDateToDownload=' + $formDownloadDateTo.val(), '_blank');
            });

            avalon.config({debug: false});
            vm = avalon.define({
                $id: "financialDetailsController",
                orderSearchText  : '',
                orderList        : [],

                configPagination : {
                    totalPages : 1,
                    changePageNo : function(page){
                        searchQuery.currentPage = page;
                        app.getFinancialDetailsApi(searchQuery);
                    }
                },

                searchOrder : function(event){
                    event.preventDefault();
                    searchQuery.orderSearchText = vm.orderSearchText;
                    searchQuery.orderDateFrom = $formDateFrom.val();
                    searchQuery.orderDateTo = $formDateTo.val();

                    console.log(searchQuery);
                    app.getFinancialDetailsApi(searchQuery);
                },

                printOrder : function (fundAccount, printCode) {
                    app.getFinancialDetailPrintApi(fundAccount, printCode);
                }


            });


            //avalon.scan(document.body)
        },

        getFinancialDetailsApi : function(params){
            var params1 = $.extend({}, params);

            $.ajax({
                url    : "/api/financial/order/details",
                method : "POST",
                data   : params1,
                success:function(data){
                    vm.orderList = data.list;
                    vm.configPagination.totalPages = Math.ceil(data.count / data.pagesize);
                }
            })
        },

        getFinancialDetailPrintApi : function(fundAccount, printCode){
            var url = '/api/financial/order/details/print?' + 'fundAccount=' + fundAccount + '&printCode=' + printCode;

            $.ajax({
                url    : url,
                method : "GET",
                dataType : "json",
                success:function(data){
                    if(data.success){
                        alert('打印成功,打印码已发送到您手机,请查收!')
                    }else{
                        alert('打印码发送失败!')
                    }
                }
            })
        }

    };

    $( document ).ready( function() {
        app.init();
        app.getFinancialDetailsApi();
    });

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
    });

    //签订合同
    $(".btn-signContract").click(function(){
        location.href="/compact?orderId="+$(this).data("id");
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
    });

    //付款
    $(".btn-payMoney").click(function(){
        location.href="/pay?type=1&orderId="+$(this).data("id");
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
    });

    //确认提货/重新确认提货
    $(".btn-deliveryGoods").click(function(){
        location.href="/confirmDelivery?orderId="+$(this).data("id");
    });

    //查看提货详情
    $(".btn-deliveryDetail").click(function(){
        location.href="/getBuyOrderDetail?orderId="+$(this).data("id");
    });

    //查看退货详情
    $(".btn-returnDetail").click(function(){
        location.href="/return?orderId="+$(this).data("id");
    });

    //审核提货
    $(".btn-auditDelivery").click(function(){
        location.href="/getBuyOrderDetail?orderId="+$(this).data("id");
    });

    //开具结算单
    $(".btn-settleAccounts").click(function(){
        location.href="/settlement/settlementForm?type=2&id="+$(this).data("id");
    });

    //确认结算单
    $(".btn-confirmSettle").click(function(){
        location.href="/settlement/settlementForm?type=1&id="+$(this).data("id");
    });

    //买家查看结算单
    $(".btn-buyerLookSettle").click(function(){
        location.href="/settlement/settlementForm?type=1&id="+$(this).data("id");
    });
    //卖家查看结算单
    $(".btn-sellerLookSettle").click(function(){
        location.href="/settlement/settlementForm?type=2&id="+$(this).data("id");
    });

    //买家修改结算单
    $(".btn-buyerUpdateSettle").click(function(){
        location.href="/settlement/settlementForm?type=1&id="+$(this).data("id");
    });

    //卖家修改结算单
    $(".btn-sellerUpdateSettle").click(function(){
        location.href="/settlement/settlementForm?type=2&id="+$(this).data("id");
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
    });

    //退款
    $(".btn-retrunMoney").click(function(){
        location.href="/pay?type=3&orderId="+$(this).data("id");
    });

    //补款
    $(".btn-tailMoney").click(function(){
        location.href="/pay?type=2&orderId="+$(this).data("id");
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
    });

    //完善开票信息
    $(".btn-improveReceipt").click(function(){
        location.href="/settlement/confirmTheInvoice?orderId＝"+$(this).data("id");
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
    });

    //申请纠纷处理
    $(".btn-applyDispute").click(function(){
        location.href="/dispute/disputeApply?orderId="+$(this).data("id");
    });
    //纠纷处理
    $(".btn-dealDispute").click(function(){
        location.href="/dispute/disputeDetail?orderId="+$(this).data("id");
    });
    //查看纠纷详情
    $(".btn-lookDispute").click(function(){
        location.href="/dispute/disputeComplete?orderId="+$(this).data("id");
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
        location.href="/order/orderClose?id="+$(this).data("id");
    });


});


