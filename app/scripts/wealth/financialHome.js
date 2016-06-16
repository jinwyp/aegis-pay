/*
* 页面脚本
* */

requirejs(['jquery', 'bootstrap', 'jquery.fancySelect', 'jQuery.fn.datePicker'], function($, bootstrap, fancySelect, datePicker){

    $(".recharge").click(function(){
        $(".bubble").removeClass("bubble-hidden");
    });

    $(".close").click(function(){
        $(".bubble").addClass("bubble-hidden");
    });


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
        },

        getFinancialDetailsApi : function(params){
            params = params || {};

            $.ajax({
                url:"/api/financial/order/details",
                method:"POST",
                data:params,
                success:function(data){
                    console.log(data)
                    //if(data.success){
                    //    $(".modal_2").modal("show");
                    //    $(".modal_2 .bg_img").addClass("yes");
                    //    $("#modalInfo_2").text("发送成功").css({fontSize:"18px"});
                    //}
                }
            })
        }
    };

    app.init();
    app.getFinancialDetailsApi();



});


