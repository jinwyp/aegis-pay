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

            //avalon.config({debug: false})
            vm = avalon.define({
                $id: "financialDetailsController",
                orderSearchText  : '',
                orderList        : [],

                configPagination : {
                    totalPages : 10,
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
                        alert('打印成功!')
                    }else{
                        alert('打印失败!')
                    }
                }
            })
        }

    };

    $( document ).ready( function() {
        app.init();
        app.getFinancialDetailsApi();
    });

    //签订合同
    $(".btn-signContract").click(function(){
        window.open("/compact?orderId="+$(this).data("id"));
    });

    //付款
    $(".btn-payMoney").click(function(){
        window.open("/pay?type=1&orderId="+$(this).data("id"));
    });

    //退款
    $(".btn-retrunMoney").click(function(){
        window.open("/pay?type=3&orderId="+$(this).data("id"));
    });

    //补款
    $(".btn-tailMoney").click(function(){
        window.open("/pay?type=2&orderId="+$(this).data("id"));
    });

    //确认提货/重新确认提货
    $(".btn-deliveryGoods").click(function(){
        window.open("/confirmDelivery?orderId="+$(this).data("id"));
    });

    //确认收到发票
    $(".btn-receiveReceipt").click(function(){
        $("#modal_title_1").text("温馨提示");
        $("#modalInfo_1").text("您将通过短信的方式通知买方已经开票,请您耐心等待");
        $('#md_ok_1').val("确定");
        $("#md_ok_1").off("click").on("click",function(){
            $(".modal_1").modal('hide');
        });
        var orderId=$(this).data("id");
        var version=$(this).data("version");
        $.ajax({
            url:"/mall/order/complete/submit",
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

    //完善开票信息
    $(".btn-improveReceipt").click(function(){
        window.open("/settlement/confirmTheInvoice?orderId＝"+$(this).data(orderid));
    });

    //审核提货
    $(".btn-auditDelivery").click(function(){
        window.open("/getBuyOrderDetail?orderId="+$(this).data("id"));
    });

    //开具结算单
    $(".btn-settleAccounts").click(function(){
        window.open("/settlement/settlementForm?type=2&id="+$(this).data("id"));
    });

    //确认已开发票
    $(".btn-writeReceipt").click(function(){
        $("#modal_title_1").text("温馨提示");
        $("#modalInfo_1").text("您将通过短信的方式通知买方已经开票,请您耐心等待");
        $('#md_ok_1').val("确定");
        $("#md_ok_1").off("click").on("click",function(){
            $(".modal_1").modal('hide');
        });
        var orderId=$(this).data("id");
        var version=$(this).data("version");
        $.ajax({
            url:"/mall/order/seller/notice/receiveReceipt",
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


});


