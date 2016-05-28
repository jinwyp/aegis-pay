require.config({
  paths: {
    sms_code: 'pay/blocks/sms_code',
    pay: 'pay/blocks/pay'
  }
});

require(['sms_code', 'pay'], function(sms_code, pay){
  sms_code.init();
  pay.init();
})
