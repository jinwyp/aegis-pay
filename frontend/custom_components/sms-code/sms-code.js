define(['jquery','bootstrap'],function($){
  return {
      init: function(){
        this.els = {
            $code: $('input[name="sms_code"]'),
            $codeTipErr: $('input[name="sms_code"]').parent().find('.tip-error'),
            $codeTipMsg: $('input[name="sms_code"]').parent().find('.tip-msg'),
            $imgcodeTipErr: $('#imgcodeModal .tip-error')
        }
        this.imgcode();
      },
      imgcode: function(){
        var self = this;
        var $code_img = $('#generate_imgcode').parent().find("img");
        $('#imgcodeModal').on('show.bs.modal', function(){
            $code_img.attr('src','/api/imgcode?time='+new Date().getTime());
            self.els.$imgcodeTipErr.hide();
            $('input[name="imgcode"]').val('');
        });

        $('#generate_imgcode').click(function(){
          $code_img.attr('src','/api/imgcode?time='+new Date().getTime())
        })

        $('#imgcodeValid').click(function(){
          var imgcode = $('input[name="imgcode"]').val();
          if(!imgcode){
            $('input[name="imgcode"]').focus();
            return;
          }
          self.validImgcode(imgcode);
        })
    },
    validImgcode: function(imgcode){
        var self = this;
        var $send_sms = $('#send_code');
        $.post('/api/validImgcode', {'captchaText':imgcode}, function(data){
          if(data.success){
              $('#imgcodeModal').modal('hide');
              // 发送短信验证码成功
              var time = data.time;
              $send_sms.addClass('disable').text(time + 's后重新发送').attr('data-target','');
              self.els.$codeTipMsg.text('校验码已发送，5分钟之内输入有效，请勿泄露!').show();
              self.els.$codeTipErr.hide();
              var timer = setInterval(function(){
                time -= 1;
                if(time>0){
                  $send_sms.text(time + 's后重新发送');
                }else{
                  clearInterval(timer);
                  $send_sms.removeClass('disable').text('重新发送验证码').attr('data-target','#imgcodeModal');
                }
              },1000)
          }else{
              if(data.errType == 'imgcode'){
                  $('input[name="imgcode"]').focus();
                  self.els.$imgcodeTipErr.text('验证码无效，请重新输入').show();
              }else{
                  // 短信发送失败
                  var $tiperror = $('.phone').parent().find('.tip-error');
                  $('#imgcodeModal').modal('hide');
                  switch(data.errType){
                    case 'sms':  //验证码发送失败
                        $tiperror.text('验证码发送失败，请重新再试').show();
                        break;
                    case 'dayTimes':  //超出一天次数限制
                        $tiperror.text('已经超出最大次数限制').show();
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
})
