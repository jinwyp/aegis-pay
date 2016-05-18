/*
 * 页面脚本
 * */

requirejs.config({
    baseUrl: '../scripts',
    paths: {
        components: '../components',
        libs: '../libs',
        jquery: '../libs/jquery-2.2.3.min'
    }
});



requirejs(['./common', 'jquery'], function(common, $){



});
