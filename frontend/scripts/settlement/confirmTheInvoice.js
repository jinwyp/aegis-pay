/*
* 结算单.确认开票
*/


requirejs(['jquery', 'jquery.fancySelect', 'bootstrap', 'message'], function($, fancySelect, bootstrap, message){

    var apiHost = '/api';			                            // API域名
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

});
