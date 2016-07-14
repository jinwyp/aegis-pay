requirejs.config({
  paths: {
    'pay-block': 'pay/blocks/pay'
  }
});

require(['pay.smscode', 'pay-block'], function(sms_code, pay){
  sms_code.init();
  pay.init();
})
