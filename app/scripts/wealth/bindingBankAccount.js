/*
* 页面脚本
* */

requirejs(['jquery', 'bootstrap','jquery.fancySelect'], function($){


    var bindingBankAccount={

        "init" : function(){
            $("select").fancySelect();
        },
        "Verify" : function(){
        // 开户行校验
            var bankCode=$("#bankCode").val();
        }
    }
    bindingBankAccount.init();
});


