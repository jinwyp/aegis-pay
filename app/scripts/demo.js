/*
* 页面脚本
* */

requirejs(['./common'], function(){

    var $tab = $('.listBox');

    $tab.on('click', 'th', function() {
        console.log( $(this).html() );
    });

});
