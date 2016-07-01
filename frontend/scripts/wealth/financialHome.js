/*
* 页面脚本
* */

requirejs([ 'jquery', 'jquery.fancySelect', 'jQuery.fn.datePicker', 'avalon'], function( $, fancySelect, datePicker, avalon){

    $(".recharge").click(function(){
        $(".bubble").removeClass("bubble-hidden");
    });

    $(".close").click(function(){
        $(".bubble").addClass("bubble-hidden");
    });
    //$(".btn-pay").click(function(){
    //    //windown.open="/pay?orderId=100000&userId=123&type=1";
    //    alert("32423423");
    //});
    $(".btn-pay").on("click", function(){
        alert("32423423");
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
            var $formDateTo = $('.orderDateTo').pickadate({min:1});

            var $formDownloadDateFrom = $('[name=orderDownloadDateFrom]').pickadate({format:'yyyy-mm-dd', max:true});
            var $formDownloadDateTo = $('[name=orderDownloadDateTo]').pickadate({min:1});


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

                _currentPages : 1,
                _totalPages : 10,
                _inputCurrentPages : 1,
                _pageArrayLeft : [],
                _pageArrayRight : [],
                _pageArrayMiddle : [],

                _ellipsisLeft : false,
                _ellipsisRight : false,

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
                },


                _changePage : function(pageNo, event){
                    event.preventDefault();
                    var tempNo = Number(pageNo);

                    if (tempNo < 1){
                        tempNo = 1
                    }else if (tempNo > vm._totalPages){
                        tempNo = vm._totalPages
                    }

                    vm._currentPages = tempNo;
                    searchQuery.currentPage = tempNo;
                    app.getFinancialDetailsApi(searchQuery);
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
                    vm._totalPages = Math.ceil(data.count / data.pagesize);
                    vm._showPagination()
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

    $(".btn-buyOrderDetail").click(function(){
        window.open(host+"/getBuyOrderDetail?orderId="+$(this).data("id"));
    });

    //卖货订单详情
    $(".btn-sellOrderDetail").click(function(){
        window.open(host+"/getSellOrderDetail?orderId="+$(this).data("id"));
    });

    //签订合同
    $(".btn-signContract").click(function(){
        window.open(host+"/compact?orderId="+$(this).data("id"));
    });

    //付款
    $(".btn-payMoney").click(function(){
        window.open(host+"/pay?type=1&orderId="+$(this).data("id"));
    });

    //退款
    $(".btn-retrunMoney").click(function(){
        window.open(host+"/pay?type=3&orderId="+$(this).data("id"));
    });

    //补款
    $(".btn-tailMoney").click(function(){
        window.open(host+"/pay?type=2&orderId="+$(this).data("id"));
    });

    //确认提货/重新确认提货
    $(".btn-deliveryGoods").click(function(){
        window.open(host+"/confirmDelivery?orderId="+$(this).data("id"));
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
        window.open(host+"/settlement/confirmTheInvoice?orderId＝"+$(this).data(orderid));
    });

    //审核提货
    $(".btn-auditDelivery").click(function(){
        window.open(host+"/getBuyOrderDetail?orderId="+$(this).data("id"));
    });

    //开具结算单
    $(".btn-settleAccounts").click(function(){
        window.open(host+"/settlement/settlementForm?type=2&id="+$(this).data("id"));
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


