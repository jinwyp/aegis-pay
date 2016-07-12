define(['jquery', 'datachecker'],function($, datachecker){
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
            if($(this).hasClass('disable')) return;
            var sms_code = self.els.$code.val(),
                payPassword = self.els.$pass.val();
            if(!datachecker.smsText(sms_code)){
                var msg = !sms_code ? '请输入验证码' : '验证码无效，请输入正确格式的验证码！';
                self.els.$codeTipErr.text(msg).show();
                self.els.$code.focus();
                return;
            }else{
                self.els.$codeTipErr.hide();
            }
            if(!datachecker.payPassword(payPassword)){
                var msg = !payPassword ? '请输入支付密码' : '支付密码格式错误，请输入正确的支付密码！';
                self.els.$passTipErr.text(msg).show();
                self.els.$pass.focus();
                return;
            }else{
                self.els.$passTipErr.hide();
            } 
            $(this).addClass('disable');
            $('.layer-shade').show();
            self.submit();
        })
      },
      submit: function(){
        var self = this;
        var params = $('#pay').serialize();
        $.post('/api/pay/submit', params, function(data){
          if(data.success){
            // 跳转到付款成功提示页面
            location.href = '/pay/success?orderId=' + $('input[name="orderId"]').val() + '&type=' + $('input[name="type"]').val();
          }else{
            $('#payBtn').removeClass('disable');
            $('.layer-shade').hide();
            if(data.errType && (data.errType=='sms_code')){
              self.els.$codeTipErr.text('验证码错误！').show();
              self.els.$code.focus();
            }else if(data.errType && (data.errType=='payPassword')){
              if(data.errorCode==1004){
                  $('#passErrModal').modal();
                  $('#payBtn').attr('id','').addClass('disable');
              }else{
                  self.els.$passTipErr.text('密码输入错误，请重新输入，您有3次输入密码的机会，若三次输入错误，密码将被锁定').show();
                  self.els.$pass.focus();
              }
            }
          }
        })
      }
  }
})
