/*
* 关闭订单页面 脚本
* */

requirejs.config({
    baseUrl: 'scripts',
    paths: {
        components: '/components',
        common: '/scripts/common',
        libs: '/libs',
        jquery: '/libs/jquery-2.2.3.min',
        modal: '/scripts/Plugins/modal',          // 模态框
        fancySelect: '/scripts/Plugins/jQuery.fn.fancySelect'       // 下拉框插件
    },
    shim: {
        "fancySelect": {
            deps: [
                "jquery"
            ]
        }
    }
});



requirejs(['common', 'jquery', 'fancySelect'], function(common, $){


    // 下拉框 引用
    //var demand = {
    //    "initFancySelectListener" : function () {
    //        this.fancySelect = $("select").fancySelect().on('change.fs', function() {
    //            $(this).trigger('change.$');
    //            demand.fancySelect.trigger("update");
    //        }); // trigger the DOM's change event when changing FancySelect
    //    },
    //    "setIndexCon" : function(){
    //        var newType  = this.coalTypeMapper[$("#coaltype").val()];
    //        if (newType != this.exType) {
    //            this.changeCoalType(newType);
    //        }
    //        demand.fancySelect.trigger("update.fs");
    //    },
    //    "init": function () {
    //        this.initFancySelectListener();
    //        this.setIndexCon();
    //    }
    //};


    //根据省份名称获取子集-获取港口
    //$("#deliveryprovince").bind("change", function(){
    //    $.ajax({
    //        url:"/sell/getPortsByParentname",
    //        data:{id:$("#deliveryprovince").val()},
    //        success:function(data) {
    //            if (null != data) {
    //                $("#deliveryplace").html("");
    //                var json = "";
    //                $.each(data, function (n, value) {
    //                    json += "<option value="+value.name+">" + value.name + "</option>";
    //                });
    //                $("#deliveryplace").html(json);
    //                demand.fancySelect.trigger("update.fs");
    //            }
    //        }
    //    });
    //});





    var $tab = $('.title');

    $tab.on('click', function() {
        console.log( $(this).html() );
    });



    var $closeSel = $('#closeSel');

    // 绑定 下拉框插件
    $("select").fancySelect();

    $closeSel.fancySelect().on('change.fs', function() {
        $(this).trigger('change.$');
        //demand.fancySelect.trigger("update");
        console.log(this.value+'-|=|-');
    });
    //
    //$closeSel.change(function() {
    //    console.log(this.value);
    //});


});
