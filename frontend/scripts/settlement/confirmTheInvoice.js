/*
* 结算单.确认开票
*/


requirejs(['jquery', 'jquery.fancySelect', 'bootstrap', 'message', 'pay.upload'], function($, fancySelect, bootstrap, message, upload){

    var numRegX = /^\d*$/;

    var invoiceApp = {
        init: function(){
            var that = this;
            $("select").fancySelect();
            this.initFancySelectListener();

            //结算单.获取开票信息
            $("#submitBtn").click(function(){that.submitForm(that)});

            //结算单.添加开票备注
            $("#cancelBtn").click(function(){ history.go(-1)});
            $("#submitInvoiceNoteBtn").click(function(){ that.submitInvoiceNotesForm(that)});
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
                return this.showErrMsg($companyAddress, "请输入合法的公司地址,最多为100个字");
            } else {
                return this.showErrMsg($companyAddress, "");
            }
            return true;
        },

        validateIdNum: function(){
            var $identificationNumber = $("#identificationNumber"),
                identificationNumber = $.trim($identificationNumber.val());
            if ( identificationNumber.length == 0 ) {
                return this.showErrMsg($identificationNumber, "请输入纳税人识别号");
            } else if ( identificationNumber.length > 20 ) {
                return this.showErrMsg($identificationNumber, "纳税人识别号最多为20位");
            } else if ( ! numRegX.test(identificationNumber) ) {
                return this.showErrMsg($identificationNumber, "请输入正确的纳税人识别号");
            } else {
                return this.showErrMsg($identificationNumber, "");
            }
        },

        validateCompanyPhone: function() {
            var $companyPhone = $("#companyPhone"),
                companyPhone = $.trim($companyPhone.val());
            if ( companyPhone.length == 0 ) {
                return this.showErrMsg($companyPhone, "请输入公司电话");
            } else if ( companyPhone.length > 13 ) {
                return this.showErrMsg($companyPhone, "请输入正确的公司电话,最多13位");
            } else if ( ! /^[\d-]*$/.test(companyPhone) ) {
                return this.showErrMsg($companyPhone, "请输入正确的公司电话,如021-66787788");
            } else {
                return this.showErrMsg($companyPhone, "");
            }
        },

        validateFax: function() {
            var $companyFax = $("#companyFax"),
                companyFax = $.trim($companyFax.val());
            if ( companyFax.length == 0 ) {
                return this.showErrMsg($companyFax, "请输入公司传真");
            } else if ( companyFax.length > 13 ) {
                return this.showErrMsg($companyFax, "请输入正确的公司纯真,最多13位");
            } else if ( ! /^[\d-]*$/.test(companyFax) ) {
                return this.showErrMsg($companyFax, "请输入正确的公司传真,如021-66787788");
            } else {
                return this.showErrMsg($companyFax, "");
            }
        },

        validateBankName: function() {
            var $bankName = $("#bankName"),
                bankName = $.trim($bankName.val());
            if ( bankName.length == 0 ) {
                return this.showErrMsg($bankName, "请输入银行名称");
            } else if ( bankName.length > 50 ) {
                return this.showErrMsg($bankName, "请输入正确的银行名称,最多50位");
            } else if ( ! /^[a-zA-Z\u4e00-\u9fa5]*$/.test(bankName) ) {
                return this.showErrMsg($bankName, "请输入正确的银行名称");
            } else {
                return this.showErrMsg($bankName, "");
            }
        },

        validateBankNo: function() {
            var $bankAccount = $("#bankAccount"),
                bankAccount = $.trim($bankAccount.val());
            if ( bankAccount.length == 0 ) {
                return this.showErrMsg($bankAccount, "请输入银行账号");
            } else if ( bankAccount.length > 25 ) {
                return this.showErrMsg($bankAccount, "请输入正确的银行账号,最多25位");
            } else if ( ! numRegX.test(bankAccount) ) {
                return this.showErrMsg($bankAccount, "请输入正确的银行账号,只可输入数字");
            } else {
                return this.showErrMsg($bankAccount, "");
            }
        },

        validateType: function() {
            var $type = $("#type"),
                type = $.trim($type.val());
            if ( type.length == 0 ) {
                return this.showErrMsg($type, "请选择发票类型");
            } else {
                return this.showErrMsg($type, "");
            }
        },

        validateImg: function() {
            var $templateUrl = $("#templateUrl"),
                templateUrl = $.trim($templateUrl.val());
            if ( templateUrl.length == 0 ) {
                return this.showErrMsg($templateUrl, "请上传开票信息");
            } else {
                return this.showErrMsg($templateUrl, "");
            }
        },


        validateForm: function() {
            var flag = true;
            flag = this.validateCompanyAddress() && flag;
            flag = this.validateIdNum() && flag;
            flag = this.validateCompanyPhone() && flag;
            flag = this.validateFax() && flag;
            flag = this.validateBankName() && flag;
            flag = this.validateBankNo() && flag;
            flag = this.validateType() && flag;
            flag = this.validateImg() && flag;

            return flag;
        },

        showErrMsg : function($ele, errMsg){
            $ele.siblings(".errorMsg").text(errMsg);
            return $.trim(errMsg) == "" ? true : false;
        },

        submitForm: function(that){

            if (!this.validateForm()) {
                $(".totalError").val("请按提示修复上面的错误");
                return false;
            } else {
                $(".totalError").val("");
            }
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
            var redirectUrl = "",
                orderId = $.trim($("#orderId").val());
            if ( orderId != "") {
                redirectUrl = "/settlement/addInvoiceNotes?orderId=" + orderId; //结算完成
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
                    return $("#totalError").val(data.message);
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
        },

        // 结算单.添加开票备注form提交
        submitInvoiceNotesForm : function (that) {
            // that.
            var requirement = $.trim($("#requirement").val()),
                specialRequirement = $.trim($("#specialRequirement").val()),
                version = $.trim($("#version").val()),
                orderId = $.trim($("#orderId").val());

            $.post("/settlement/submitInvoiceNotes",
                {
                    "requirement": requirement,
                    "specialRequirement": specialRequirement,
                    "version": version,
                    "orderId": orderId
                },
                function (data) {
                    if (data.success == false) {
                        return $("#totalError").val(data.message);
                    }
                    $("#totalError").val("");
                    location.href = "/getBuyOrderDetail?orderId=" + orderId;
                    console.log('------------- submit success -------------');
                }
            );
        }

    };

    invoiceApp.init();


    /* ---附件交互---------------------------------------- */
    var $tempAdd = $('#tempAdd'),
        $editFile = $('#editFile'),         //file input
        $tempEdit = $('#tempEdit'),
        $tempDel = $('#tempDel'),
        // $fileId = $('#fileId'),
        $fileId = $('#templateUrl'),        //file id
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
                $fileId.val(fileObj.id);
                $fBox_1.show();
                $fBox_2.hide();
            }
        });
    });

    //修改附件
    $tempEdit.click(function() {
        $editFile.trigger("click");
    });
    $editFile.click(function() {
        uploadWrapper ($editFile, function(data) {
            var fileObj = {};
            if(data.success) {
                $.each(data.attach, function(ind, file) {
                    fileObj = file;
                });
                $fileViewImg.attr('src', fileObj.url);
                $fileId.val(fileObj.id);
            }
        });
    });

    //移除附件
    $tempDel.click(function() {
        upload.ajaxFileRemove($(this), '', function() {
            $fBox_1.hide();
            $fBox_2.show();
            $fileViewImg.attr('src', '');
            $fileId.val('');
        });
    });

});
