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

    var bindingBankAccount={

        "init" : function(){
            $("select").fancySelect();
            this.initFancySelectListener(),
            this.changeSelect(),
            this.submit();
        },
        initFancySelectListener: function() {
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
                return;
            }else{
                $(".bankName").find(".errorMsg").text("");
                $('.submitTotal').find(".errorMsg").text("");
            }
            // 省份
            if(provinceCode==""){
                $(".region").find(".errorMsg").text("请选择省份");
                $('.submitTotal').find(".errorMsg").text("请按红色错误提示修改您填写的内容");
                return;
            }else{
                $(".region").find(".errorMsg").text("");
                $('.submitTotal').find(".errorMsg").text("");
            }
            //市
            if(cityCode==""){
                $(".region").find(".errorMsg").text("请选择城市");
                $('.submitTotal').find(".errorMsg").text("请按红色错误提示修改您填写的内容");
                return;
            }else{
                $(".region").find(".errorMsg").text("");
                $('.submitTotal').find(".errorMsg").text("");
            }
            //开户行支行
            if(childBankName==""){
                $(".childBankName").find(".errorMsg").text("请填写开户行支行名称");
                $('.submitTotal').find(".errorMsg").text("请按红色错误提示修改您填写的内容");
                return;
            }else{
                $(".childBankName").find(".errorMsg").text("");
                $('.submitTotal').find(".errorMsg").text("");
            }

            //企业对公账户
            if(account==""){
                $(".account").find(".errorMsg").text("请填写企业对公账户");
                $('.submitTotal').find(".errorMsg").text("请按红色错误提示修改您填写的内容");
                return;
            }else if(isNaN(account)){
                $(".account").find(".errorMsg").text("企业对公账户只能是数字");
                $('.submitTotal').find(".errorMsg").text("请按红色错误提示修改您填写的内容");
                return;
            }else{
                $(".account").find(".errorMsg").text("");
                $('.submitTotal').find(".errorMsg").text("");
            }
            // 验证码
            if(vertifyCode==""){
                $(".vertifyCode").find(".errorMsg").text("请填写验证码");
                $('.submitTotal').find(".errorMsg").text("请按红色错误提示修改您填写的内容");
                return;
            }else{
                $(".vertifyCode").find(".errorMsg").text("");
                $('.submitTotal').find(".errorMsg").text("");
            }
            // 同意协议
            if(!$("#haveRead").prop("checked")){
                $('.submitTotal').find(".errorMsg").text("请阅读《易煤网出金服务协议》并同意");
                return;
            }else{
                $('.submitTotal').find(".errorMsg").text("");
            }

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

            // 验证码判断

            $("#vertifyCode").on("input",function(){
                var codeVal=$(this).val();
                $.ajax({
                    url:'/api/verifyCode',
                    type:'POST',
                    data:{'sms_code': codeVal},
                    success:function(data){
                        if(data.success){
                            $(".successIcon").css({visibility:"visible"});
                            $(".vertifyCode .errorMsg").text('');
                        }else{
                            if(data.errType && (data.errType=='sms_code')){
                                $(".vertifyCode .errorMsg").text('校验码错误');
                                $(".successIcon").css({visibility:"hidden"});
                                $('.submitTotal').find(".errorMsg").text("请按红色错误提示修改您填写的内容");
                                return false;
                            }
                        }
                    }

                })
            })
        },

        "submit" : function(){
            var that=this
            $("#submitInfo").on("click",function(){
                that.Verify();
                // 跳转
                // location.href=''
            })
        }
    }
    bindingBankAccount.init();
});


