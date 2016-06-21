/*
 * 页面脚本
 * */


require(['jquery','bootstrap'],function($){
    if($('input[name="nohtmlpath"]').size() > 0){
        $.get('/api/fetch-settle-html', function(data){
            $('.download').attr('href', data.htmlpath);
        })
    }
});
