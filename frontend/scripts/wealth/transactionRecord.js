/*
* 页面脚本
* */

requirejs(['jquery', 'jquery.fancySelect', 'bootstrap'], function($, fancySelect){

    // 绑定 下拉框插件
    $('[name=orderType]').fancySelect().on('change.fs', function() {
        $(this).trigger('change.$');
        console.log(this.value);
        //$subBtn.prop('disabled', $.trim(this.value)==='--');
    });


});


