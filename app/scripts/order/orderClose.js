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


    var $reasonId = $('[name=reasonId]'),           //原因ID
        $remarks = $('[name=remarks]'),             //备注
        $limitNum = $('.limitNum'),                 //剩余字数
        $subBtn = $('.subBtn'),                     //确认
        $btnSubClose = $('#btnSubClose');           //确认提交


    // 绑定 下拉框插件
    $reasonId.fancySelect();

    $reasonId.fancySelect().on('change.fs', function() {
        $(this).trigger('change.$');        //demand.fancySelect.trigger("update");
        console.log(this.value);

        $subBtn.prop('disabled', $.trim(this.value)==='--');
    });


    // 计算剩余字数
    $remarks.keyup(function () {
        var num = 500;
        num = num - parseInt(this.value.length);
        $limitNum.html(num);
    });


    // 确认提交
    $btnSubClose.click(function() {
        alert('订单关闭成功!');



        $('.modal .close').click();
    });


});
