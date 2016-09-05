requirejs.config({
  paths: {
    'pay-block': 'guarantee/pay/blocks/pay'
  }
});

require(['pay.smscode', 'pay-block'], function(sms_code, pay){
  sms_code.init();
  pay.init();
})
