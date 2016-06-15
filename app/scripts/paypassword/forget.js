requirejs.config({
    paths: {
      forgetValid: 'paypassword/blocks/forget-valid',
      forgetSet: 'paypassword/blocks/forget-set'
    }
});

require(['jquery', 'pay.smscode', 'forgetValid', 'forgetSet'], function($, smscode, forgetValid, forgetSet){
  smscode.init();
  forgetValid.init();
  forgetSet.init();
})
