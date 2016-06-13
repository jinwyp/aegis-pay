requirejs.config({
    paths: {
      forgetValid: 'paypassword/blocks/forget-valid'
    }
});

require(['jquery', 'pay.smscode', 'forgetValid'], function($, smscode, forgetValid){
  smscode.init();
  forgetValid.init();
})
