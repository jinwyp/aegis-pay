/*
* 页面脚本
* */

requirejs(['jquery', 'bootstrap'], function($){

    $(".recharge").click(function(){
        $(".bubble").removeClass("bubble-hidden");
    });

    $(".close").click(function(){
        $(".bubble").addClass("bubble-hidden");
    });


});


