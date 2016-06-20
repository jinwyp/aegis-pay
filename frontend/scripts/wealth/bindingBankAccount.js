/*
* 页面脚本
* */

require.config({
    paths: {
        sms_code: 'pay/blocks/sms_code',
        pay: 'pay/blocks/pay'
    }
});

requirejs(['jquery','pay.smscode','pay','bootstrap','jquery.fancySelect'], function($,sms_code,pay){

    sms_code.init();
    pay.init();
    var finalResult
    var bindingBankAccount={

        "init" : function(){
            $("select").fancySelect();
            this.initFancySelectListener(),
            this.changeSelect(),
            this.submit();
        },
        "initFancySelectListener": function() {
            $("select").fancySelect().on("change.fs", function() {
                $(this).trigger("change.$");
            })
        },
        "Verify" : function(){
                var bankCode=$("#bankCode").val(),
            provinceCode=$("#provinceCode").val(),
                cityCode=$("#cityCode").val(),
                childBankName=$("#childBankName").val(),
                    account=$("#account").val(),
                    vertifyCode=$("#vertifyCode").val();


            // 开户行校验
            if(bankCode==""){
                $(".bankName").find(".errorMsg").text("开户行不能为空");
                $('.submitTotal').find(".errorMsg").text("请按红色错误提示修改您填写的内容");
                return false;
            }else{
                $(".bankName").find(".errorMsg").text("");
                $('.submitTotal').find(".errorMsg").text("");
            }
            // 省份
            if(provinceCode==""){
                $(".region").find(".errorMsg").text("请选择省份");
                $('.submitTotal').find(".errorMsg").text("请按红色错误提示修改您填写的内容");
                return false;
            }else{
                $(".region").find(".errorMsg").text("");
                $('.submitTotal').find(".errorMsg").text("");
            }
            //市
            if(cityCode==""){
                $(".region").find(".errorMsg").text("请选择城市");
                $('.submitTotal').find(".errorMsg").text("请按红色错误提示修改您填写的内容");
                return false;
            }else{
                $(".region").find(".errorMsg").text("");
                $('.submitTotal').find(".errorMsg").text("");
            }
            //开户行支行
            if(childBankName==""){
                $(".childBankName").find(".errorMsg").text("请填写开户行支行名称");
                $('.submitTotal').find(".errorMsg").text("请按红色错误提示修改您填写的内容");
                return false;
            }else{
                $(".childBankName").find(".errorMsg").text("");
                $('.submitTotal').find(".errorMsg").text("");
            }

            //企业对公账户
            if(account==""){
                $(".account").find(".errorMsg").text("请填写企业对公账户");
                $('.submitTotal').find(".errorMsg").text("请按红色错误提示修改您填写的内容");
                return false;
            }else if(isNaN(account)){
                $(".account").find(".errorMsg").text("企业对公账户只能是数字");
                $('.submitTotal').find(".errorMsg").text("请按红色错误提示修改您填写的内容");
                return false;
            }else if(account.length>25)
            {
                $(".account").find(".errorMsg").text("企业对公账户不能大于25位");
                $('.submitTotal').find(".errorMsg").text("请按红色错误提示修改您填写的内容");
                return false;
            }else{
                $(".account").find(".errorMsg").text("");
                $('.submitTotal').find(".errorMsg").text("");
            }
            // 验证码
            if(vertifyCode==""){
                $(".vertifyCode").find(".errorMsg").text("请填写验证码");
                $('.submitTotal').find(".errorMsg").text("请按红色错误提示修改您填写的内容");
                return false;
            }else{
                $(".vertifyCode").find(".errorMsg").text("");
                $('.submitTotal').find(".errorMsg").text("");
            }
            if(!finalResult){
                $(".vertifyCode").find(".errorMsg").text("校验码错误");
                $('.submitTotal').find(".errorMsg").text("请按红色错误提示修改您填写的内容");
                return false;
            }else{
                $(".vertifyCode").find(".errorMsg").text("");
                $('.submitTotal').find(".errorMsg").text("");
            }
            return true;
        },
        "checkVCode": function(){
            var vertifyCode=$("#vertifyCode").val();
            return  $.ajax({
                url: '/api/verifyCode',
                type: 'POST',
                data: {'sms_code': vertifyCode}
            });
        },
        "changeSelect" : function(){
            var that=this
            $("#bankCode").on('change', function() {
                that.Verify();
            });
            $("#provinceCode").on('change', function() {
                that.Verify();
            });
            $("#cityCode").on('change', function() {
                that.Verify();
            });
            $("#childBankName").on('blur', function() {
                that.Verify();
            });
            $("#account").on('blur', function() {
                that.Verify();
            });
            $("#vertifyCode").on('blur', function() {
                that.Verify();
            });
            $("#childBankName").on("click",function(){
                $(".childBankList").show();
            });
            $("#vertifyCode").on('blur', function() {
                var vertifyCode=$("#vertifyCode").val();
                that.checkVCode().done(function(data){
                    if (data.success) {
                        $(".successIcon").css({visibility: "visible"});
                        $(".vertifyCode .errorMsg").text('');
                        finalResult = true;
                    } else {
                        if (data.errType && (data.errType == 'sms_code')) {
                            finalResult = false;
                            $(".vertifyCode .errorMsg").text('校验码错误');
                            $(".successIcon").css({visibility: "hidden"});
                            $('.submitTotal').find(".errorMsg").text("请按红色错误提示修改您填写的内容");
                            return false;
                        }
                    }
                });
            });

            $(document).on("click",function(e){
                if(e.target.className!="accountInfoInput" && e.target.className!="accountInfoInput"){
                    $(".childBankList").hide();
                }
            });
            // 开户行支行选择
            $(document).on("click",".bankNameList",function(){
                $("#childBankName").val($(this).text())
            })
        },

        "submit" : function(){
            var that=this;
            $("#submitInfo").on("click",function(){
                var flag = that.Verify();
                if(flag){
                // 跳转
                    if(finalResult!="undefined" && finalResult){
                        // 跳转
                        location.href='/wealth/bindingSuccess';
                    }
                }

            })
        }
    }
    bindingBankAccount.init();
});


