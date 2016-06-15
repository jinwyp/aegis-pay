/*
* 页面脚本
* */


requirejs(['jquery', 'pay.upload', 'bootstrap', 'message'], function($, upload, bootstrap, message){

    var returnDetail={
        modifyReasons : function(){
            
        },
        "init" : function(){
          this.modifyReasons();
        }
    }
    returnDetail.init();

});


