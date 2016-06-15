/*
* 页面脚本
* */

requirejs(['jquery', 'bootstrap', 'jquery.fancySelect'], function($, bootstrap, fancySelect){

    $(".recharge").click(function(){
        $(".bubble").removeClass("bubble-hidden");
    });

    $(".close").click(function(){
        $(".bubble").addClass("bubble-hidden");
    });

    var $formSelectOrderCategory = $('[name=orderCategory]');
    var $formSelectOrderStatus = $('[name=orderStatus]');
    var $formSelectOrderNo = $('[name=orderNo]');
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

});


