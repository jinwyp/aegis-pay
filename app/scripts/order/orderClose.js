/*
* 关闭订单 页面脚步
* */

requirejs.config({
    baseUrl: 'scripts',
    paths: {
        components: '/components',
        common: '/scripts/common',
        libs: '/libs',
        jquery: '/libs/jquery-2.2.3.min'
    }
});



requirejs(['common', 'jquery'], function(common, $){

    var $tab = $('.title');

    $tab.on('click', function() {
        console.log( $(this).html() );
    });

});
