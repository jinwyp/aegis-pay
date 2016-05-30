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
            $code_img.attr('src','api/imgcode?time='+new Date().getTime());
            self.els.$imgcodeTipErr.hide();
            $('input[name="imgcode"]').val('');
        });

        $('#generate_imgcode').click(function(){
          $code_img.attr('src','api/imgcode?time='+new Date().getTime())
        })

        $('#imgcodeValid').click(function(){
          var imgcode = $('input[name="imgcode"]').val();
          if(!imgcode){
            $('input[name="imgcode"]').focus();
            return;
          }
          $.post('api/validImgcode', {'code':imgcode}, function(data){
            if(data.success){
                $('#imgcodeModal').modal('hide');
                self.send_sms();
            }else{
              $('input[name="imgcode"]').focus()
              self.els.$imgcodeTipErr.text('验证码无效，请重新输入').show();
            }
          })
        })
      },
      send_sms: function(){
        var self = this;
        var $send_sms = $('#send_code');
        $.post('api/send_sms', function(data){
          if(data.success){
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
          }else {

          }
        })
      }
  }
})
