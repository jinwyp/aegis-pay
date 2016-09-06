requirejs.config({
  paths: {
    'guarantee-pay-block': 'guarantee/pay/blocks/pay'
  }
});

require(['pay.smscode', 'guarantee-pay-block'], function(sms_code, pay){
  sms_code.init();
  pay.init();
})
