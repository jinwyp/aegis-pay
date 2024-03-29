define(['jquery', 'datachecker'],function($, datachecker){
  return {
      init: function(){
        this.els = {
          $pass1: $('#forgetSet input[type="password"]').eq(0),
          $pass2: $('#forgetSet input[type="password"]').eq(1),
          $passFormatErr: $('#forgetSet input[type="password"]').eq(0).parent().find('.tip-error'),
          $passDiffErr: $('#forgetSet input[type="password"]').eq(1).parent().find('.tip-error'),
          $submit: $('#forgetSet #setBtn')
        }
        this.eventBind();
      },
      eventBind: function(){
        var self = this;
        // validate
        // self.els.$pass1.on('blur', function(e){
        //     var isMatch = datachecker.payPassword(self.els.$pass1.val());
        //     if(!isMatch){
        //         self.els.$pass1.focus();
        //         self.els.$passFormatErr.text('支付密码格式不正确！').show();
        //         return;
        //     }else{
        //         self.els.$passFormatErr.hide();
        //     }
        // })
        // self.els.$pass2.on('blur', function(e){
        //     if(self.els.$pass2.val() !== self.els.$pass1.val()){
        //         self.els.$passDiffErr.text('两次密码输入不一致！').show();
        //         return;
        //     }else{
        //         self.els.$passDiffErr.hide();
        //     }
        // })
        // click submit
        self.els.$submit.click(function(){
            if($(this).hasClass('disable')) return;
            if(!datachecker.payPassword(self.els.$pass1.val())){
                var msg = self.els.$pass1.val() ? '支付密码格式不正确！' : '请输入支付密码';
                self.els.$pass1.focus();
                self.els.$passFormatErr.text(msg).show();
                return;
            }else{
                self.els.$passFormatErr.hide();
            }
            if(!datachecker.payPassword(self.els.$pass2.val())){
                var msg = self.els.$pass2.val() ? '支付密码格式不正确！' : '请输入支付密码';
                self.els.$pass2.focus();
                self.els.$passDiffErr.text(msg).show();
                return;
            }else{
                self.els.$passDiffErr.hide();
            }
            if(self.els.$pass2.val() !== self.els.$pass1.val()){
                self.els.$passDiffErr.text('两次密码输入不一致！').show();
                return;
            }else{
                self.els.$passDiffErr.hide();
            }
            self.submit();
        })
      },
      submit: function(){
        var self = this;
        var params = $('#forgetSet').serialize();
        self.els.$submit.addClass('disable');
        $.post('/api/paypassword/forget/submit', params, function(data){
          if(data.success){
            // 跳转到付款成功提示页面
            location.href = '/ucenter/paypassword/fg/success';
          }else{
              self.els.$submit.removeClass('disable');
              self.els.$passFormatErr.text('重置失败，请重新填写支付密码').show();
              self.els.$passDiffErr.text('重置失败，请重新填写支付密码').show();
          }
        })
      }
  }
})
