define(['jquery'],function($){
  return {
      init: function(){
        this.els = {
          $code: $('input[name="sms_code"]'),
          $codeTipErr: $('input[name="sms_code"]').parent().find('.tip-error')
        }
        this.eventBind();
      },
      eventBind: function(){
        var self = this;
        $('#validBtn').click(function(){
            if($(this).hasClass('disable')) return;
            var sms_code = self.els.$code.val();
            if(!datachecker.smsText(sms_code)){
                self.els.$codeTipErr.text('请输入有效的校验码').show();
                self.els.$code.focus();
                return;
            }
            self.els.$codeTipErr.hide();
            self.submit();
        })
      },
      submit: function(){
        var self = this;
        var params = $('#modifyValid').serialize();
        $.post('/api/paypassword/modify/valid', params, function(data){
          if(data.success){
            // 跳转到付款成功提示页面
            location.href = '/ucenter/paypassword/modify/set';
          }else{
              self.els.$codeTipErr.text('校验码错误！').show();
              self.els.$code.focus();
          }
        })
      }
  }
})
