/*
* 页面脚本
* */


requirejs(['jquery', 'pay.upload', 'bootstrap'], function($, upload){

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


});


