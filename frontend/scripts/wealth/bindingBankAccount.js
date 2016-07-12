/*
* 页面脚本
* */

require.config({
    paths: {
        sms_code: 'business_components/sms-code'
    }
});

requirejs(['jquery','sms_code','devbridge-autocomplete','bootstrap','jquery.fancySelect'], function($,sms_code){

    sms_code.init("");
    // pay.init();
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
            });
            $("select").change(function () {
                $(this).trigger("update.fs");
            })
        },
        "Verify" : function(){
                var bankCode=$.trim($("#bankCode").val()),
            provinceCode=$.trim($("#provinceCode").val()),
                cityCode=$.trim($("#cityCode").val()),
                childBankName=$.trim($("#childBankName").val()),
                    account=$.trim($("#account").val()),
                    vertifyCode=$.trim($("#vertifyCode").val());


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
            //开户行支行
            if(childBankName==""){
                $(".childBankName").find(".errorMsg").text("请填写开户行支行名称");
                $('.submitTotal').find(".errorMsg").text("请按红色错误提示修改您填写的内容");
                return false;
            } else{
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
                $(".vertifyCode").find(".errorMsg").text("请输入验证码");
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
            var payPhone= $('input[name="payPhone"]').val();
            return  $.ajax({
                url: '/api/verifyCode',
                type: 'POST',
                data: {'sms_code': vertifyCode,
                        'payPhone':payPhone
                }
            });
        },
        "provinceCode": function(){
            var provinceCode= $("#provinceCode").val();
            return $.ajax({
                url: '/api/bank/loadBankSiteCities/?province='+$("#provinceCode").val(),
                type:"GET"
            });
        },
        "childBankName":function(){
            var childBankName= $("#childBankName").val();
            return $.ajax({
                url: '/api/bank/bindingBankAccountChildBankName?cityCode='+$("#cityCode").val()+'&bankCode='+$("#bankCode").val(),
                type:"POST",
                data:{childBankName:$("#childBankName").val()}
            });
        },
        "childAllBankName":function(){
            return $.ajax({
                url:'/api/bank/childAllBankName?cityCode='+$("#cityCode").val()+'&bankCode='+$("#bankCode").val(),
                type:'POST'
            });
        },
        "changeSelect" : function(){
            var that=this;
            function clearChildBank(){
                $('#childBankName').val("");
                $('#childBankName').attr("data-selectdata","");
            }
            $("#bankCode").on('change', function() {
                clearChildBank();
                that.Verify();
            });
            $("#provinceCode").on('change', function() {
                clearChildBank();
                $("#cityCode").html('');
                that.provinceCode().done(function(data){
                    data.cityList.forEach(function(value,i){
                        $("#cityCode").append('<option value='+data.cityList[i].cityCode+'>'+data.cityList[i].cityName+'</option>')
                    });
                    $("#cityCode").trigger("update.fs");
                });
                that.Verify();
            });
            $("#cityCode").on("change",function(){
                clearChildBank();
            });

            // ie8以下数组indexof不兼容
            if (!Array.prototype.indexOf){
                // ie8 新增 indexOf 方法
                Array.prototype.indexOf = function(elt){
                    var len = this.length >>> 0;
                    var from = Number(arguments[1]) || 0;
                    from = (from < 0)
                        ? Math.ceil(from)
                        : Math.floor(from);
                    if (from < 0)
                        from += len;
                    for (; from < len; from++)
                    {
                        if (from in this &&
                            this[from] === elt)
                            return from;
                    }
                    return -1;
                };
            }


            $("#childBankName").on("focus",function(){
                $(".childBankNameWrap").addClass("open");
            });
            $("#childBankName").on("blur",function(){
                $(".childBankNameWrap").removeClass("open");
                // childBankNameList=[];
            });
            $("#childBankName").change(function(){
                $("#childBankName").attr("data-selectData","");
            });

            $("#childBankName").autocomplete({
                mustMatch:true,
                minChars:0,
                lookup:function (query,done) {

                    var childBankNameList=[];
                    var childBankIndex = [];
                    var timer = null;

                    if($("#childBankName").val()==""){
                        that.childAllBankName().done(function (data) {

                            data.childBankName.forEach(function (value, i) {
                                if (childBankIndex.indexOf(data.childBankName[i].childBankCode) < 0) {
                                    childBankIndex.push(data.childBankName[i].childBankCode);
                                    childBankNameList.push({
                                        value: data.childBankName[i].childBankName,
                                        data: data.childBankName[i].childBankCode
                                    })
                                }
                            });
                            var result = {
                                suggestions:childBankNameList
                            }
                            done(result);
                        });
                    }else{
                        if($("#bankCode").val()!="" && $("#cityCode").val()!="") {

                            if (timer) {
                                clearTimeout(timer);
                            }
                            timer = setTimeout(function () {

                                that.childBankName().done(function (data) {
                                    data.childBankName.forEach(function (value, i) {
                                        if (childBankIndex.indexOf(data.childBankName[i].childBankCode) < 0) {
                                            childBankIndex.push(data.childBankName[i].childBankCode);
                                            childBankNameList.push({
                                                value: data.childBankName[i].childBankName,
                                                data: data.childBankName[i].childBankCode
                                            })
                                        }

                                    });
                                    var result = {
                                        suggestions:childBankNameList
                                    }
                                    done(result);
                                });

                            }, 400);
                        }
                    }

                },
                onSelect: function (suggestion) {
                    $("#childBankName").attr("data-selectData",suggestion.data)
                }
            });

            $("#account").on('blur', function() {
                that.Verify();
            });
            $("#vertifyCode").on('blur', function() {
                that.Verify();
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

        },

        "submit" : function(){
            var that=this;
            $("#submitInfo").on("click",function(){
                var flag = that.Verify();
                if(flag){
                // 开户行支行名称code
                    if($("#childBankName").attr("data-selectdata")==""){
                        $(".childBankName").find(".errorMsg").text("请输入关键字，在下拉结果中选择开户银行支行名称");
                        $('.submitTotal').find(".errorMsg").text("请按红色错误提示修改您填写的内容");
                        return false;
                    }
                    if(finalResult!="undefined" && finalResult){

                        $.ajax({
                            url:'/api/account/fund/bankCard/add/submit',
                            type:'POST',
                            data:{
                                "userId" : $("#userId").val(),
                                "childBankCode" : $("#childBankName").attr("data-selectdata"),
                                "bankAccount" : $("#account").val()
                            },
                            success : function(data){
                                if(data.success){
                                    location.href='/wealth/bindingSuccess?userId='+$("#userId").val();
                                }else{
                                    $('.submitTotal').find(".errorMsg").text(data.error);
                                }
                            }
                        })
                    }
                }

            })
        }
    }
    bindingBankAccount.init();
});


