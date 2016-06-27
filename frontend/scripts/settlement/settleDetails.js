/*
 * 页面脚本
 * */


require(['jquery','bootstrap'],function($){
    if($('input[name="nohtmlpath"]').size() > 0){
        var arr = location.search.substr(1).split('&');
        var orderId = '';
        arr.forEach(function(val, index){
            if(val.split('=')[0] === 'orderId'){
                orderId = val.split('=')[1];
            }
        })
        $.get('/api/fetch-settle-html?orderId=' + orderId, function(data){
            $('.download').attr('href', data.htmlpath);
        })
    }
});
