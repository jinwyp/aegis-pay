/*
* 页面脚本
* */


requirejs(['jquery', 'bootstrap'], function($){

    var apiHost = 'http://server.180.com/';			// 模拟域名



    var $tab = $('#listBox');

    $tab.on('click', 'th', function() {
        console.log( $(this).html() );
    });

});


