/*
* 页面脚本
* */

requirejs(['jquery', 'bootstrap'], function($){

    var financialHeader = {
        "initFirstTab":function(){

        }
    }

    //$(".financialHeader li").click(function(){
    //
    //});

    $(".a-option").click(function(){
        var newIndex=$(this).data('value');
        var selectedObj=$(".firstTab li a.selected");
        selectedObj.removeClass("selected");
        var index=selectedObj.data("value");
        $(".arrow-blue").removeClass("tab-step-"+index);
        $(this).addClass("selected");
        $(".arrow-blue").addClass("tab-step-"+newIndex);
    });

});


