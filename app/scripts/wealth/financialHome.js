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
        }
    };

    app.init()



});


