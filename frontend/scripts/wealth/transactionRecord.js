/*
* 页面脚本
* */

requirejs(['jquery', 'jquery.fancySelect', 'jQuery.fn.datePicker', 'bootstrap'], function($, fancySelect){

    var transactionRecord={
        "datepicker" : function(){
            $(document).on("click",".startDate",function(){
                $(".startDate").each(function(i, item){
                    $(item).pickadate({}).pickadate('picker').set("max", [new Date($.now() + 86400000)]);
                });
            });
            $(document).on("click",".endDate",function(){
                $(".endDate").each(function(i, item){
                    $(item).pickadate({}).pickadate('picker').set("max", [new Date($.now() + 86400000)]);
                });
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

    $('[name=searchType]').fancySelect().on('change.fs', function() {
        $(this).trigger('change.$');
        console.log(this.value);
        //$subBtn.prop('disabled', $.trim(this.value)==='--');
    });

    $("#searchType").on("change", function(){
        transactionRecord.initContentInput();
    });



});


