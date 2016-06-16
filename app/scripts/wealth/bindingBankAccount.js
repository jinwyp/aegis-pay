/*
* 页面脚本
* */

requirejs(['jquery', 'bootstrap','jquery.fancySelect'], function($){
    function commonError(status,info){
        if(status==false){
            $(this).parent("accountInfoLi").find("errorMsg").text(info);
            return;
        }else{
            $(this).parent("accountInfoLi").find("errorMsg").text("")
        }
    }
    var bindingBankAccount={


        "init" : function(){
            $("select").fancySelect();
            this.submit();
        },
        "Verify" : function(){

            var bankCode=$("#bankCode").val(),
            provinceCode=$("#provinceCode").val(),
                cityCode=$("#cityCode").val();
            // 开户行校验
            if(bankCode==""){
                $(".bankName").find(".errorMsg").text("开户行不能为空");
                return;
            }
            // 省份
            if(provinceCode==""){
                $(".region").find(".errorMsg").text("请选择省份");
                return;
            }
            //市
            if(cityCode==""){
                $(".region").find(".errorMsg").text("请选择城市");
                return;
            }

            $("#bankCode").on("change.fs",function(){
                $(this).trigger("change.$")
                console.log(bankCode)
                // if(bankCode!=""){
                //     console.log(bankCode)
                //     commonError(true,"")
                // }
            });


        },
        "submit" : function(){
            var that=this
            $("#submitInfo").on("click",function(){
                that.Verify();

            })
        }
    }
    bindingBankAccount.init();
});


