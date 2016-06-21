/*
* 结算单.确认开票
*/


requirejs(['jquery', 'jquery.fancySelect', 'bootstrap', 'message', 'pay.upload'], function($, fancySelect, bootstrap, message, upload){


    var $reasonId = $('[name=reasonId]');           //原因ID

    // 绑定 下拉框插件
    $reasonId.fancySelect().on('change.fs', function() {
        $(this).trigger('change.$');        //demand.fancySelect.trigger("update");
        console.log(this.value);
        $subBtn.prop('disabled', $.trim(this.value)==='--');
    });




    var apiHost = '/api',			                            // API域名
        uId = getUrlParam('id'),
        uType = getUrlParam('type'),
        uStatus = getUrlParam('status');


    // 页面模块控制
    var settlementForm = {

        // 重要提示板块
        doubtPlateHandle: function() {

            var $embedBox = $('.embedBox'),                     // 提示框:嵌入
                $doubtInlet = $('.doubtInlet'),                 // 提示框:触发按钮
                $significantModal = $('#significantModal');     // 重要提示 模态框

            // 鼠标经过 显/隐 提示框
            $doubtInlet.hover(function() {
                $embedBox.css('display', 'block');
            });
            $embedBox.hover(
                function() {
                    $embedBox.css('display', 'block');
                },
                function() {
                    $embedBox.css('display', 'none');
                }
            );

            // 买家& 待审核, 显示模态框
            if($embedBox.attr('data-status') == 'WaitVerifySettle' && $embedBox.attr('data-type') == 'buy') {
                var closeHtml = '<span class="icn_cross close" data-dismiss="modal" aria-label="Close"></span>';
                $('.significantModalCon').html(closeHtml + $embedBox.html());
                $significantModal.modal('show');          // 手动打开模态框 toggle show hide
            }
        },


        // 初始化
        init: function() {
            this.doubtPlateHandle();
        }
    };



    /* ---页面逻辑控制---------------------------------------- */
    settlementForm.init();



    /**
     * 获取URL参数值
     * @param param 参数名
     * @param hrefStr 指定Url, 可选
     * @author wze
     */
    function getUrlParam (param, hrefStr) {
        var request = {
            QueryString: function (val) {
                var uri = hrefStr || window.location.search;
                var re = new RegExp("" + val + "=([^&?]*)", "ig");
                return ((uri.match(re)) ? (decodeURI(uri.match(re)[0].substr(val.length + 1))) : '');
            }
        };
        return request.QueryString(param);
    }



    /* ---附件交互---------------------------------------- */
    var $tempAdd = $('#tempAdd'),
        $tempEdit = $('#tempEdit'),
        $tempDel = $('#tempDel'),
        $fileId = $('#fileId'),
        $fileViewImg = $('.fileViewImg'),
        $fBox_1 = $('.fBox_1'),
        $fBox_2 = $('.fBox_2');

    //添加附件
    $tempAdd.click(function() {
        //var $tag = $(this);

        upload.ajaxFileUpload($tempAdd, '', function(data) {
            var fileObj = {};

            if(data.success) {
                $.each(data.attach, function(ind, file) {
                    fileObj = file;
                });
                $fileViewImg.attr('src', fileObj.url);
                $fileId.val(fileObj.url);
                $fBox_1.show();
                $fBox_2.hide();
            }
        });
    });

    //移除附件
    $tempDel.click(function() {
        upload.ajaxFileRemove($(this), '', function() {
            $fBox_1.hide();
            $fBox_2.show();
            $fileViewImg.attr('src', '');
        });
    });

    //修改附件
    $tempEdit.click(function() {

        upload.ajaxFileUpload($tempEdit, '', function(data) {
            var fileObj = {};
            if(data.success) {
                $.each(data.attach, function(ind, file) {
                    fileObj = file;
                });
                $fileViewImg.attr('src', fileObj.url);
                $fileId.val(fileObj.url);
            }
        });
    });









});
