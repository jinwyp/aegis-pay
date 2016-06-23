requirejs.config({
    paths: {
      forgetValid: 'paypassword/blocks/forget-valid',
      forgetSet: 'paypassword/blocks/forget-set',
      modifyValid: 'paypassword/blocks/modify-valid',
      modifySet: 'paypassword/blocks/modify-set'
    }
});

require(['jquery'], function($){
    if($('.mainWrapper').hasClass('forgetValid')){
        require(['pay.smscode', 'forgetValid'], function(smscode, forgetValid){
            smscode.init('payPhone');
            forgetValid.init();
        })
    }
    if($('.mainWrapper').hasClass('forgetSet')){
        require(['forgetSet'], function(forgetSet){
            forgetSet.init();
        })
    }
    if($('.mainWrapper').hasClass('modifyValid')){
        require(['pay.smscode', 'modifyValid'], function(smscode, modifyValid){
            smscode.init();
            modifyValid.init();
        })
    }
    if($('.mainWrapper').hasClass('modifySet')){
        require(['modifySet'], function(modifySet){
            modifySet.init();
        })
    }
})
