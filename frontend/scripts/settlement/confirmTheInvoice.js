/*
* 结算单.确认开票
*/


requirejs(['jquery', 'jquery.fancySelect', 'bootstrap', 'message'], function($, fancySelect, bootstrap, message){

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

            if( !that.validateForm()) {
                return
            }

            var param = $("#invoiceForm").serialize();
            $.post("", function() {

            }).fail(function(jqXHR, textStatus, errorThrown){
                if (jqXHR.status == 409) {
                    var errorCode = JSON.parse(jqXHR.responseText).errorCode;
                }
            });
            // if (this.validateForm()) {
                // $.post();
            // }
        }
    };

    invoiceApp.init();

    // var $type = $('#type');           //原因ID

    // var apiHost = '/api',			                            // API域名
    //     uId = getUrlParam('id'),
    //     uType = getUrlParam('type'),
    //     uStatus = getUrlParam('status');


    /**
     * 获取URL参数值
     * @param param 参数名
     * @param hrefStr 指定Url, 可选
     * @author wze
     */
    // function getUrlParam (param, hrefStr) {
    //     var request = {
    //         QueryString: function (val) {
    //             var uri = hrefStr || window.location.search;
    //             var re = new RegExp("" + val + "=([^&?]*)", "ig");
    //             return ((uri.match(re)) ? (decodeURI(uri.match(re)[0].substr(val.length + 1))) : '');
    //         }
    //     };
    //     return request.QueryString(param);
    // }

});
