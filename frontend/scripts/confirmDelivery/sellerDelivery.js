require(['jquery', 'bootstrap'],function($, upload){
    $("#textInput").on("input",function(){
        var Len=$(this).val().length;
        var restNum=200-Len;
        $("#restNum").text(restNum)
    });
});
