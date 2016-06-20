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


    var vm = {};
    var searchQuery = {
        orderCategory : '',
        orderDateFrom : '',
        orderDateTo : '',
        orderSearchType : '',
        orderSearchText : ''
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
                orderCurrentPage : '',
                orderList        : [],
                searchOrder : function(event){
                    event.preventDefault();
                    searchQuery.orderSearchText = vm.orderSearchText;
                    searchQuery.orderDateFrom = $formDateFrom.val();
                    searchQuery.orderDateTo = $formDateTo.val();

                    console.log(searchQuery);

                    app.getFinancialDetailsApi(searchQuery);
                }
            });
            //avalon.scan(document.body)
        },

        getFinancialDetailsApi : function(params){
            params = params || {};

            $.ajax({
                url:"/api/financial/order/details",
                method:"POST",
                data:params,
                success:function(data){

                    vm.orderList = data;
                }
            })
        }
    };

    $( document ).ready( function() {
        app.init();
        app.getFinancialDetailsApi()
    });


});


