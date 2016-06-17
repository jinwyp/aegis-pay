/*
* 页面脚本
* */

requirejs([ 'jquery', 'bootstrap', 'jquery.fancySelect', 'jQuery.fn.datePicker', 'avalon'], function( $, bootstrap, fancySelect, datePicker, avalon){

    $(".recharge").click(function(){
        $(".bubble").removeClass("bubble-hidden");
    });

    $(".close").click(function(){
        $(".bubble").addClass("bubble-hidden");
    });

    var vm = {};
    var app = {
        init : function(){
            var $formSelectOrderCategory = $('[name=orderCategory]');
            var $formSelectOrderStatus = $('[name=orderStatus]');
            var $formSelectOrderNo = $('[name=orderNo]');
            var $formDateFrom = $('.orderDateFrom');
            var $formDateTo = $('.orderDateTo');

            
            $formSelectOrderCategory.fancySelect().on('change.fs', function() {
                $(this).trigger('change.$');        //demand.fancySelect.trigger("update");
                console.log(this.value);
            });
            $formSelectOrderStatus.fancySelect().on('change.fs', function() {
                $(this).trigger('change.$');        //demand.fancySelect.trigger("update");
                console.log(this.value);
            });
            $formSelectOrderNo.fancySelect().on('change.fs', function() {
                $(this).trigger('change.$');        //demand.fancySelect.trigger("update");
                console.log(this.value);
            });


            $formDateFrom.pickadate({format:'yyyy-mm-dd', max:true});
            $formDateTo.pickadate({min:1});

            vm = avalon.define({
                $id: "financialDetailsController",
                name: "司徒正美",
                orderList: []
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
        app.getFinancialDetailsApi();
    });


});


