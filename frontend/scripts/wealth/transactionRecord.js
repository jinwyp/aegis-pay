/*
* 页面脚本
* */

requirejs(['jquery', 'jquery.fancySelect', 'jQuery.fn.datePicker', 'bootstrap'], function($, fancySelect){

    var transactionRecord={
        "datepicker" : function(){
            var pickerStart, pickerEnd,
                day_1=86400000,
                startObj=$(".startDate"),
                endObj=$(".endDate");
            pickerStart=startObj.pickadate({}).pickadate('picker');
            pickerEnd=endObj.pickadate({}).pickadate('picker');
            pickerStart.set("disable", [{ from: [1970,1,1] }]);
            pickerEnd.set("disable", [{ from: [1970,1,1]}]);

            startObj.on("change",function(){
                if(new Date(startObj.val()).getTime() > new Date(endObj.val()).getTime()){
                    endObj.val("");
                }
                pickerEnd.set("enable", true);
                pickerEnd.set("disable", [
                    { from: [1970,1,1], to:  new Date(new Date(startObj.val()).getTime()-day_1)}
                ]);
            });
        },
        "initContentInput": function () {
            if($("#searchType").val()==0){
                $("#content").val("");
                $("#content").attr("disabled",true);
                $("#content").addClass("disabled-bg");
                $("#content").attr("placeholder","");
            }else if($("#searchType").val()==1){
                $("#content").attr("disabled",false);
                $("#content").removeClass("disabled-bg");
                $("#content").attr("placeholder","请输入订单编号");
            }else if($("#searchType").val()==2){
                $("#content").attr("disabled",false);
                $("#content").removeClass("disabled-bg");
                $("#content").attr("placeholder","请输入合同编号");
            }else if($("#searchType").val()==3){
                $("#content").attr("disabled",false);
                $("#content").removeClass("disabled-bg");
                $("#content").attr("placeholder","请输入交易流水号");
            }else if($("#searchType").val()==4){
                $("#content").attr("disabled",false);
                $("#content").removeClass("disabled-bg");
                $("#content").attr("placeholder","请输入公司名称");
            }
        },
    };

    transactionRecord.datepicker();
    transactionRecord.initContentInput();

    // 绑定 下拉框插件
    $('[name=type]').fancySelect().on('change.fs', function() {
        $(this).trigger('change.$');
        console.log(this.value);
        //$subBtn.prop('disabled', $.trim(this.value)==='--');
    });

    $('[name=status]').fancySelect().on('change.fs', function() {
        $(this).trigger('change.$');
        console.log(this.value);
        //$subBtn.prop('disabled', $.trim(this.value)==='--');
    });

    $('#searchType').fancySelect().on('change.fs', function() {
        $(this).trigger('change.$');
        console.log(this.value);
        //$subBtn.prop('disabled', $.trim(this.value)==='--');
    });

    $("#searchType").on("change", function(){
        transactionRecord.initContentInput();
    });



});


