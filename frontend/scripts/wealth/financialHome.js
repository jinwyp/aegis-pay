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
            var $formDateFrom = $('.orderDateFrom');
            var $formDateTo = $('.orderDateTo');


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


            $formDateFrom.pickadate({format:'yyyy-mm-dd', max:true});
            $formDateTo.pickadate({min:1});


            //avalon.config({debug: false})
            //avalon.config({loader: false})
            vm = avalon.define({
                $id: "financialDetailsController",
                orderSearchText: "",
                orderList: [],
                searchOrder : function(){
                    searchQuery.orderSearchType = this.orderSearchText;

                    console.log(searchQuery);
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


