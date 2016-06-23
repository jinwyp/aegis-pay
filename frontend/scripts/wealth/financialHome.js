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
                console.log(this.value);
            });
            $formSelectOrderSearchType.fancySelect().on('change.fs', function() {
                $(this).trigger('change.$');        //demand.fancySelect.trigger("update");
                searchQuery.orderSearchType = this.value;
                console.log(this.value);
            });

            $('#downloadExcel').on('show.bs.modal', function (e) {
                console.log( $formDateFrom.val());
                console.log( $formDateTo.val());
                console.log( $formDateTo.pickadate('picker').get());

                $formDownloadDateFrom.pickadate('picker').set('select', $formDateFrom.val(), { format: 'yyyy-mm-dd' });
                $formDownloadDateTo.pickadate('picker').set('select', $formDateTo.val(), { format: 'yyyy-mm-dd' });
            });

            //avalon.config({debug: false})
            //avalon.config({loader: false})
            vm = avalon.define({
                $id: "financialDetailsController",
                orderSearchText  : "",
                orderDateFrom    : '',
                orderDateTo      : '',
                orderEllipsisLeft : false,
                orderEllipsisRight : false,
                orderCurrentPage : 1,
                orderList        : [],
                orderListTotalPages : 1,
                orderListTotalPagesArray : [],
                orderListTotalPagesArrayLeft : [],
                orderListTotalPagesArrayRight : [],

                searchOrder : function(event){
                    event.preventDefault();
                    searchQuery.orderSearchText = vm.orderSearchText;
                    searchQuery.orderDateFrom = $formDateFrom.val();
                    searchQuery.orderDateTo = $formDateTo.val();

                    console.log(searchQuery);

                    app.getFinancialDetailsApi(searchQuery);
                },

                changePagination : function(pageNo, event){
                    var tempNo = Number(pageNo);
                    if (tempNo < 1){
                        tempNo = 1
                    }else if (tempNo > vm.orderListTotalPages){
                        tempNo = vm.orderListTotalPages
                    }

                    event.preventDefault();
                    searchQuery.currentPage = tempNo;
                    vm.orderCurrentPage = tempNo;
                    app.showPagination();
                    app.getFinancialDetailsApi(searchQuery);
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
                    vm.orderListTotalPages = Math.ceil(data.totalPage );
                    app.showPagination();
                }
            })
        },


        showPagination : function () {
            vm.orderListTotalPagesArrayLeft = [];
            vm.orderListTotalPagesArrayRight = [];
            vm.orderListTotalPagesArray = [];

            vm.orderEllipsisLeft = false;
            vm.orderEllipsisRight = false;

            for (var i=1; i<= vm.orderListTotalPages; i++){

                if (vm.orderListTotalPages <= 8){
                    vm.orderListTotalPagesArray.push({value:i});
                }else{

                    if ( i <= 2 ){
                        vm.orderListTotalPagesArrayLeft.push({value:i});
                    }

                    if ( i >= vm.orderListTotalPages - 1 ){
                        vm.orderListTotalPagesArrayRight.push({value:i});
                    }

                    if (i>2 && i < vm.orderListTotalPages - 1){
                        if (vm.orderCurrentPage <=4 && i <=5){
                            vm.orderEllipsisRight = true;
                            vm.orderListTotalPagesArray.push({value:i});
                        }

                        if ( vm.orderCurrentPage > 4 && vm.orderCurrentPage < vm.orderListTotalPages - 3) {
                            vm.orderEllipsisLeft = true;
                            vm.orderEllipsisRight = true;

                            if ( i > vm.orderCurrentPage -2 && i < vm.orderCurrentPage + 2){
                                vm.orderListTotalPagesArray.push({value:i});
                            }
                        }

                        if ( vm.orderCurrentPage >= vm.orderListTotalPages - 3 && i >= vm.orderListTotalPages - 4) {
                            vm.orderEllipsisLeft = true;
                            vm.orderListTotalPagesArray.push({value:i});
                        }
                    }

                }

            }
        }
    };

    $( document ).ready( function() {
        app.init();
        app.getFinancialDetailsApi();

    });


});


