/*
* 关闭订单页面 脚本
* */


requirejs(['jquery', 'jquery.fancySelect', 'bootstrap'], function($){


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
    //    }//demand.fancySelect.trigger("update.fs");
    //};




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
