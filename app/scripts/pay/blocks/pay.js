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
            if($(this).hasClass('disable')) return;
            var sms_code = self.els.$code.val(),
                payPassword = self.els.$pass.val();
            if(!sms_code){
                self.els.$codeTipErr.text('请输入校验码').show();
                self.els.$code.focus();
                return;
            }
            if(!payPassword){
                self.els.$passTipErr.text('请输入支付密码').show();
                self.els.$pass.focus();
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
            location.href = '/order/progress?orderId=' + $('input[name="orderId"]').val();
          }else{
            if(data.errType && (data.errType=='sms_code')){
              self.els.$codeTipErr.text('校验码错误').show();
              self.els.$code.focus();
            }else if(data.errType && (data.errType=='payPassword')){
              self.els.$passTipErr.text('密码输入错误，请重新输入，您有3次输入密码的机会，若三次输入错误，密码将被锁定').show();
              self.els.$pass.focus();
              if(data.error=='times'){
                  $('#passErrModal').modal();
                  $('#payBtn').attr('id','').addClass('disable');
              }
            }
          }
        })
      }
  }
})
