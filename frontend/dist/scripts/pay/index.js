require.config({
  paths: {
    // sms_code: 'pay/blocks/sms_code',
    pay: 'pay/blocks/pay'
  }
});

require(['pay.smscode', 'pay'], function(sms_code, pay){
  sms_code.init();
  pay.init();
})
