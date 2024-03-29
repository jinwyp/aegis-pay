requirejs.config({
    paths: {
      forgetValid: 'paypassword/blocks/forget-valid',
      forgetSet: 'paypassword/blocks/forget-set',
      modifyValid: 'paypassword/blocks/modify-valid',
      modifySet: 'paypassword/blocks/modify-set'
    }
});

require(['jquery', 'pay.smscode', 'forgetValid', 'modifyValid', 'forgetSet', 'modifySet'], function($, smscode, forgetValid, modifyValid, forgetSet, modifySet){
    if($('.mainWrapper').hasClass('forgetValid')){
        // require(['pay.smscode', 'forgetValid'], function(smscode, forgetValid){
            smscode.init('payPhone');
            forgetValid.init();
        // })
    }
    if($('.mainWrapper').hasClass('forgetSet')){
        // require(['forgetSet'], function(forgetSet){
            forgetSet.init();
        // })
    }
    if($('.mainWrapper').hasClass('modifyValid')){
        // require(['pay.smscode', 'modifyValid'], function(smscode, modifyValid){
            smscode.init();
            modifyValid.init();
        // })
    }
    if($('.mainWrapper').hasClass('modifySet')){
        // require(['modifySet'], function(modifySet){
            modifySet.init();
        // })
    }
    if($('.mainWrapper').hasClass('successPage')){
        var $countDown = $('.countDown'),
            sec = parseInt($countDown.text());
        var timer = setInterval(function(){
            (sec>0) ? $countDown.text(sec--) : (location.href="/account/accountSetting");
        }, 1000)
    }
})
