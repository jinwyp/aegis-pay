define(['jquery'],function($){
  return {
      init: function(){
        this.els = {
          $code: $('input[name="sms_code"]'),
          $cardID: $('input[name="companyUniqueCode"]'),
          $codeTipErr: $('input[name="sms_code"]').parent().find('.tip-error'),
          $cardIdTipErr: $('input[name="companyUniqueCode"]').parent().find('.tip-error')
        }
        this.eventBind();
      },
      eventBind: function(){
        var self = this;
        $('#validBtn').click(function(){
            if($(this).hasClass('disable')) return;
            var sms_code = self.els.$code.val(),
                cardID = self.els.$cardID.val();
            if(!sms_code){
                self.els.$codeTipErr.text('请输入校验码').show();
                self.els.$code.focus();
                return;
            }
            if(!cardID){
                self.els.$cardIdTipErr.text('请输入营业执照号码').show();
                self.els.$cardID.focus();
                return;
            }
                self.els.$codeTipErr.hide();
                self.els.$cardIdTipErr.hide();
                self.submit();
            })
      },
      submit: function(){
        var self = this;
        var params = $('#forgetValid').serialize();
        $.post('/api/paypassword/forget/valid', params, function(data){
          if(data.success){
            // 跳转到付款成功提示页面
            location.href = '/ucenter/paypassword/fg/set';
          }else{
            if(data.errType && (data.errType=='sms_code')){
              self.els.$codeTipErr.text('校验码错误').show();
              self.els.$code.focus();
          }else if(data.errType && (data.errType=='cardID')){
              self.els.$cardIdTipErr.text('营业执照号码错误，请重新输入！').show();
              self.els.$cardID.focus();
            }
          }
        })
      }
  }
})
