/*
* 页面脚本
* */


requirejs(['jquery', 'pay.upload', 'bootstrap', 'message'], function($, upload, bootstrap, message){

    var apiHost = 'http://server.180.com/';			// 模拟域名



    var $tab = $('#listBox');

    $tab.on('click', 'th', function() {
        console.log( $(this).html() );
    });



    // ---上传操作----->->->->->->->->->->->->->->->->----------
    var $fileList = $('.fileList'),         //附件列表
        $upFile = $('#upFile');           //上传控件


    //上传操作
    $upFile.click(function() {
        var $tag = $(this);

        upload.ajaxFileUpload($tag, '', function(data) {
            var htmlStr = '';

            if(data.success) {
                $.each(data.attach, function(ind, file) {
                    htmlStr += '<p class="fileLab"><span class="fileLab_name">'+ file.filename +'</span><span class="fileLab_del" data-id="'+ file.id +'"></span></p>';
                });
                $fileList.append(htmlStr);
            }
        });
    });

    //删除操作
    $fileList.on('click', '.fileLab_del', function(e) {
        upload.ajaxFileRemove($(this));
    });
    // ---上传操作-----<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<----------



    // ---操作提示----->->->->->->->->->->->->->->->->----------
    var $msg_err = $('#msg_err'),           //错误框
        $msg_alt = $('#msg_alt'),           //警告框
        $msg_info = $('#msg_info'),         //信息框
        $msg_done = $('#msg_done');         //完成框


    $msg_err.click(function () {
        message({
            type: 'error',
            title: '错误：',
            detail: '输入格式错误, 请重新输入!'
        });
        return false;
    });

    $msg_alt.click(function () {
        message({
            type: 'alert',
            title: '警告：',
            detail: '上传文件必须小于5Mb!'
        });
        return false;
    });

    $msg_info.click(function () {
        message({
            type: 'info',
            title: '信息：',
            detail: '还可以在上传2个文件!'
        });
        return false;
    });

    $msg_done.click(function () {
        message({
            type: 'done',
            title: '完成：',
            detail: '新增操作成功'
        });
        return false;
    });
    // ---操作提示-----<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<----------


});


