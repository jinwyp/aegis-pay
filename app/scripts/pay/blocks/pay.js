define(['jquery'],function($){
  return {
      init: function(){
        this.els = {
          $code: $('input[name="sms_code"]'),
          $pass: $('input[name="payPassword"]'),
          $codeTipErr: $('input[name="sms_code"]').parent().find('.tip-error'),
          $passTipErr: $('input[name="payPassword"]').parent().find('.tip-error')
        }
        this.eventBind();
      },
      eventBind: function(){
        var self = this;
        $('#payBtn').click(function(){
          var sms_code = self.els.$code.val(),
              payPassword = self.els.$pass.val();
          if(!sms_code){
            self.els.$codeTipErr.text('请输入校验码').show();
            return;
          }
          if(!payPassword){
            self.els.$passTipErr.text('请输入支付密码').show();
            return;
          }
          self.els.$codeTipErr.hide();
          self.els.$passTipErr.hide();
          self.submit();
        })
      },
      submit: function(){
        var self = this;
        var params = $('#pay').serialize();
        $.post('api/pay/submit', params, function(data){
          if(data.success){
            // 跳转到付款成功提示页面
          }else{
            if(data.errType && (data.errType=='sms_code')){
              self.els.$codeTipErr.text('校验码错误').show();
            }else if(data.errType && (data.errType=='payPassword')){
              self.els.$passTipErr.text('支付密码错误').show();
            }
          }
        })
      }
  }
})
