define(['jquery', 'datachecker'],function($, datachecker){
  return {
      init: function(){
        this.els = {
          $oldpass: $('#modifySet input[type="password"]').eq(0),
          $pass1: $('#modifySet input[type="password"]').eq(1),
          $pass2: $('#modifySet input[type="password"]').eq(2),
          $oldpassErr: $('#modifySet input[type="password"]').eq(0).parent().find('.tip-error'),
          $passFormatErr: $('#modifySet input[type="password"]').eq(1).parent().find('.tip-error'),
          $passDiffErr: $('#modifySet input[type="password"]').eq(2).parent().find('.tip-error'),
          $submit: $('#modifySet #setBtn')
        }
        this.eventBind();
      },
      eventBind: function(){
        var self = this;
        // validate
        self.els.$pass1.on('blur', function(e){
            // var isMatch = /^(\w){6,20}$/.test(self.els.$pass1.val());
            var isMatch = datachecker.payPassword(self.els.$pass1.val());
            if(!isMatch){
                self.els.$pass1.focus();
                self.els.$passFormatErr.text('支付密码格式不正确！').show();
                return;
            }else{
                self.els.$passFormatErr.hide();
            }
        })
        self.els.$pass2.on('blur', function(e){
            if(self.els.$pass2.val() !== self.els.$pass1.val()){
                self.els.$passDiffErr.text('两次密码输入不一致！').show();
                return;
            }else{
                self.els.$passDiffErr.hide();
            }
        })
        // click submit
        self.els.$submit.click(function(){
            if($(this).hasClass('disable')) return;
            if(!datachecker.payPassword(self.els.$oldpass.val())){
                self.els.$oldpass.focus();
                self.els.$oldpassErr.text('请填写原支付密码').show();
                return;
            }
            if(!datachecker.payPassword(self.els.$pass1.val())){
                self.els.$pass1.focus();
                self.els.$passFormatErr.text('请重置支付密码').show();
                return;
            }
            if(!datachecker.payPassword(self.els.$pass2.val())){
                self.els.$pass2.focus();
                self.els.$passDiffErr.text('请重置支付密码').show();
                return;
            }
            if(self.els.$pass2.val() !== self.els.$pass1.val()){
                self.els.$passDiffErr.text('两次密码输入不一致！').show();
                return;
            }else{
                self.els.$passDiffErr.hide();
            }
            self.els.$passFormatErr.hide();
            self.els.$passDiffErr.hide();
            self.submit();
        })
      },
      submit: function(){
        var self = this;
        var params = $('#modifySet').serialize();
        self.els.$submit.addClass('disable');
        $.post('/api/paypassword/modify/submit', params, function(data){
          if(data.success){
            // 跳转到付款成功提示页面
            location.href = '/ucenter/paypassword/modify/success';
            }else if(data.errorCode==1004){
                self.els.$oldpass.focus();
                self.els.$oldpassErr.text('原支付密码错误，请重新输入！').show();
            }else{
              self.els.$submit.removeClass('disable');
              self.els.$passFormatErr.text('请重置支付密码').show();
              self.els.$passDiffErr.text('请重置支付密码').show();
          }
        })
      }
  }
})
