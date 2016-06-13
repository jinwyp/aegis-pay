/*
* 页面脚本
* */

requirejs(['jquery', 'bootstrap'], function($){

    var financialHeader = {
        "initFirstTab":function(){

        }
    }

    $(".firstTab li a").click(function(){
        var firstTab=$(this).data("value");
        var secondTab=$(".secondTab li.selected a").data("value");
        location.href="/wealth/financialHome?firstTab="+firstTab+"&secondTab="+secondTab;
    });

    $(".secondTab li a").click(function(){
        var firstTab=$(".firstTab li a.selected").data("value");
        var secondTab=$(this).data("value");
        location.href="/wealth/financialHome?firstTab="+firstTab+"&secondTab="+secondTab;
    });

});


