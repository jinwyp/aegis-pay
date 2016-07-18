define(['jquery','bootstrap'],function($){
  return {
      init: function(customPhone){
        this.els = {
            $code: $('input[name="sms_code"]'),
            $codeTipErr: $('input[name="sms_code"]').parent().find('.tip-error'),
            $codeTipMsg: $('input[name="sms_code"]').parent().find('.tip-msg'),
            $imgcodeTipErr: $('#imgcodeModal .tip-error')
        };
        this.customPhone = customPhone || false;
        this.imgcode();
      },
      imgcode: function(){
        var self = this;
        var $code_img = $('#generate_imgcode').parent().find("img");
        $('#imgcodeModal').on('show.bs.modal', function(){
            ($('input[type="text"][name="sms_code"]').size()>0) && $('input[type="text"][name="sms_code"]').val('');
            $code_img.attr('src','/api/imgcode?time='+new Date().getTime());
            self.els.$imgcodeTipErr.hide();
            self.els.$codeTipErr.hide();
            $('input[name="imgcode"]').val('');
        });

        $('#generate_imgcode').click(function(){
            $code_img.attr('src','/api/imgcode?time='+new Date().getTime());
            $('#imgcodeModal .tip-error').hide();           // 刷新图片,隐藏错误提示
            $('input[name="imgcode"]').val('');
        });

        $('#imgcodeValid').click(function(){
            var imgcode = $('input[name="imgcode"]').val();
                if(!imgcode){
                $('input[name="imgcode"]').focus();
                return;
            }
            if( $(this).hasClass("sended")){
                return  ;
            }
            $(this).addClass("sended");
            // $('.glyphicon').show();
            self.validImgcode(imgcode);
        })
    },
    validImgcode: function(imgcode){
        var self = this;
        var $send_sms = $('#send_code');
        var params = {
            'captchaText':imgcode,
            'payPhone': $('input[name="payPhone"]').val(),
            'amount': $('input[name="amount"]').val()
        };
        self.customPhone && (params.payPhone = $('input[name="'+ self.customPhone +'"]').val())
        $.post('/api/validImgcode', params, function(data){
            $('#imgcodeValid').removeClass("sended");
            // $('.glyphicon').hide();
          if(data.success){
              $('#imgcodeModal').modal('hide');
              // 发送短信验证码成功
              var time = data.time;
              $send_sms.addClass('disable').text(time + 's后重新发送').attr('data-target','');
              self.els.$codeTipMsg.text('验证码已发送，5分钟之内输入有效，请勿泄露!').show();
              self.els.$codeTipErr.hide();
              ($('.icon-sendsms').size()>0) && ($('.icon-sendsms').show());
              var timer = setInterval(function(){
                time -= 1;
                if(time>0){
                  $send_sms.text(time + 's后重新发送');
                }else{
                  clearInterval(timer);
                  $send_sms.removeClass('disable').text('重新获取验证码').attr('data-target','#imgcodeModal');
                  ($('.icon-sendsms').size()>0) && ($('.icon-sendsms').hide());
                }
              },1000)
          }else{
              if(data.errType == 'imgcode'){
                  $('input[name="imgcode"]').focus();
                  self.els.$imgcodeTipErr.text('验证码无效，请重新输入').show();
              }else{
                  // 短信发送失败
                  var $tiperror = $('.phone').parent().find('.tip-error');
                  if($(".vertifyCode").length){
                      var $tiperror=$(".vertifyCode").find(".errorMsg");
                  }
                  $('#imgcodeModal').modal('hide');
                  switch(data.errType){
                    case 'sms':  //验证码发送失败
                        $tiperror.text('验证码发送失败，请重新再试').show();
                        break;
                    case 'dayTimes':  //超出一天次数限制
                        $tiperror.text('此账号今天短信发送已达到最大条数,请明天再尝试!').show();
                        break;
                    case 'hourTimes': //超出一小时次数限制
                        $tiperror.text('已经超出每小时最大次数限制，请过一会儿再试').show();
                        break;
                    default:
                        $tiperror.text('验证码发送失败，请重新再试').show();
                  }
              }
          }
        })
    }
  }
});
