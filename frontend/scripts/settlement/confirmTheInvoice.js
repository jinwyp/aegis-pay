/*
* 结算单.确认开票
*/


requirejs(['jquery', 'jquery.fancySelect', 'bootstrap', 'message', 'pay.upload'], function($, fancySelect, bootstrap, message, upload){

    var invoiceApp = {
        init: function(){
            var that = this;
            $("select").fancySelect();
            this.initFancySelectListener();
            $("#submitBtn").click(function(){that.submitForm(that)});
        },

        initFancySelectListener : function () {
            this.fancySelect = $("select").fancySelect().on('change.fs', function() {
                $(this).trigger('change.$');
                invoiceApp.fancySelect.trigger("update");
            }); // trigger the DOM's change event when changing FancySelect
        },
        validateCompanyAddress: function() {
            var $companyAddress = $("#companyAddress"),
                companyAddress = $.trim($companyAddress.val());
            console.log(companyAddress.length);
            if (companyAddress.length == 0 || companyAddress.length > 100) {
                this.showErrMsg($companyAddress, "请输入合法的公司地址,最多为100个字");
            } else if (true) {
                this.showErrMsg($companyAddress, "公司地址最多为100个字");
            }
            return true;
        },

        validateForm: function() {
            this.validateCompanyAddress();
            return false;
        },

        showErrMsg : function($ele, errMsg){
            $ele.siblings(".errorMsg").text(errMsg);
        },

        submitForm: function(that){

            /**
             * 各发票流程:
             * 1. (结算) 确认开票信息： (参数: orderId)
             * 新增发票(载入已有发票数据 userId orderId) —> 填写order备注 (userId, orderId) --> (结算)结算完成 /getOrderDetail?orderId=
             *
             * 2. 开票设置列表:	(参数:  无)
             * 新增：新增发票	userId  —> 开票设置列表 /settlement/billSetting
             * 修改：修改发票(载入已有发票数据) userId —> 开票设置列表 /settlement/billSetting
             */

            // set redirect url
            var redirectUrl = "";
            if ($.trim($("#orderId").val()) != "") {
                redirectUrl = "/settlement/addInvoiceNotes"; //结算完成
            } else {
                redirectUrl = "/settlement/billSetting";     //开票设置列表
            }

            // validation
            // if( !that.validateForm()) {
            //     return $("#totalError").val("请按提示信息修改错误");
            // }

            var param = $("#invoiceForm").serialize();
            $.post("/settlement/submitInvoice", param, function(data) {
                if (data.success == false) {
                    return $("#totalError").val(data.error);
                }
                $("#totalError").val("");
                console.log('------------- submit success -------------');

                //    redirect
                location.href = redirectUrl;

            }).fail(function(jqXHR, textStatus, errorThrown){
                if (jqXHR.status == 409) {
                    // ToDo: error handling
                    var errorCode = JSON.parse(jqXHR.responseText).errorCode;
                    console.log('this is 409 ....');
                    $("#totalError").val(errorCode);
                }
            });
        }
    };

    invoiceApp.init();


    /* ---附件交互---------------------------------------- */
    var $tempAdd = $('#tempAdd'),
        $tempEdit = $('#tempEdit'),
        $tempDel = $('#tempDel'),
        // $fileId = $('#fileId'),
        $fileId = $('#templetUrl'),
        $fileViewImg = $('.fileViewImg'),
        $fBox_1 = $('.fBox_1'),
        $fBox_2 = $('.fBox_2');


    //上传文件格式：jpg、png.文件大小：小于400k
    function uploadWrapper ($ele, cb) {
        // ToDo: 图片大小校验
        upload.ajaxFileUpload($ele, {fileSize: 400, maxSize: 400, fileType: ["jpg", "jpeg", "png"]}, cb);
    }

    //添加附件
    $tempAdd.click(function() {
        //var $tag = $(this);

        uploadWrapper ($tempAdd, function(data) {
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

    //修改附件
    $tempEdit.click(function() {

        uploadWrapper ($tempEdit, function(data) {
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

    //移除附件
    $tempDel.click(function() {
        upload.ajaxFileRemove($(this), '', function() {
            $fBox_1.hide();
            $fBox_2.show();
            $fileViewImg.attr('src', '');
        });
    });

});
