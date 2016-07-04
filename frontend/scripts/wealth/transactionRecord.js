/*
* 页面脚本
* */

requirejs(['jquery', 'jquery.fancySelect', 'jQuery.fn.datePicker', 'avalon', 'avalon.pagination'], function($, fancySelect, datePicker, avalon){

    var $content = $("#content");
    var $searchType = $("#searchType");

    var transactionRecord={
        "datepicker" : function(){
            var pickerStart, pickerEnd,
                day_1=86400000,
                startObj=$(".startDate"),
                endObj=$(".endDate"),
                datePackerSettings = {
                    //monthsFull: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    //monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    //weekdaysFull: ['星期日','星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                    //weekdaysShort: ['日','一', '二', '三', '四', '五', '六'],
                    format: 'yyyy-mm-dd',
                    clear: '清空'
                };
            pickerStart=startObj.pickadate(datePackerSettings).pickadate('picker');
            pickerEnd=endObj.pickadate(datePackerSettings).pickadate('picker');
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
            if($searchType.val()==0){
                $content.val("");
                $content.attr("disabled",true);
                $content.addClass("disabled-bg");
                $content.attr("placeholder","");
            }else if($searchType.val()==1){
                $content.attr("disabled",false);
                $content.removeClass("disabled-bg");
                $content.attr("placeholder","请输入订单编号");
            }else if($searchType.val()==2){
                $content.attr("disabled",false);
                $content.removeClass("disabled-bg");
                $content.attr("placeholder","请输入合同编号");
            }else if($searchType.val()==3){
                $content.attr("disabled",false);
                $content.removeClass("disabled-bg");
                $content.attr("placeholder","请输入交易流水号");
            }else if($searchType.val()==4){
                $content.attr("disabled",false);
                $content.removeClass("disabled-bg");
                $content.attr("placeholder","请输入公司名称");
            }
        }
    };

    transactionRecord.datepicker();
    transactionRecord.initContentInput();

    // 绑定 下拉框插件
    $('[name=type]').fancySelect().on('change.fs', function() {
        $(this).trigger('change.$');
        //$subBtn.prop('disabled', $.trim(this.value)==='--');
    });

    $('[name=status]').fancySelect().on('change.fs', function() {
        $(this).trigger('change.$');
        //$subBtn.prop('disabled', $.trim(this.value)==='--');
    });

    $searchType.fancySelect().on('change.fs', function() {
        $(this).trigger('change.$');
        //$subBtn.prop('disabled', $.trim(this.value)==='--');
    });

    $searchType.on("change", function(){
        transactionRecord.initContentInput();
    });

    //--------------------------合同管理模块的操作-----------------------------
    //下载
    $(".btn-download").click(function(){
        var id = $(this).data('value');
        alert('暂无配置下载路径');
        //location.href='';
    });

    //--------------------------结算管理模块的操作-----------------------------
    //修改结算
    $(".btn-updateSettle").click(function(){
        window.open(host+"/order/orderClose?id="+$(this).data("value"));
    });
    //确认结算
    $(".btn-confirmSettle").click(function(){
        window.open(host+"/order/orderClose?id="+$(this).data("value"));
    });
    //补款
    $(".btn-pay").click(function(){
        window.open(host+"/order/orderClose?id="+$(this).data("value"));
    });
    //完善开票信息
    $(".btn-updateInfo").click(function(){
        window.open(host+"/order/orderClose?id="+$(this).data("value"));
    });
    //结算
    $(".btn-settle").click(function(){
        window.open(host+"/order/orderClose?id="+$(this).data("value"));
    });
    //退款
    $(".btn-returnMoney").click(function(){
        window.open(host+"/order/orderClose?id="+$(this).data("value"));
    });



    //搜索form表单提交
    $("#submitSearch").on("click",function(event, pageno){
        // alert(pageno);
        pageno = pageno || 1;
        $("#page").val(pageno);
        $("#searchForm").submit();
    });

    //分页相关
    var vm = {};
    var app = {
        init :function (){
            vm = avalon.define({
                $id: "financialPaginationController",

                configPagination : {
                    totalPages : 10,
                    currentPage : 1,
                    inputCurrentPages : 1,
                    changePageNo : function(page){
                        $("#submitSearch").trigger("click",[page]);
                    }
                }
            });
        }
    };

    $( document ).ready( function() {
        app.init();

        vm.configPagination.currentPage = Number($("#page").val());
        vm.configPagination.inputCurrentPages = Number($("#page").val());
        vm.configPagination.totalPages = Math.ceil($("#count").val() / $("#pagesize").val());

    });


});


