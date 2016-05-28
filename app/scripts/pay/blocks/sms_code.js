define(['jquery','bootstrap'],function($){
  return {
      init: function(){
        this.imgcode();
      },
      imgcode: function(){
        var self = this;
        $('#generate_imgcode').click(function(){
          $(this).parent().find('img').attr('src','api/imgcode?time='+new Date().getTime())
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
            }
          })
        })
      },
      send_sms: function(){
        var $send_sms = $('#send_code');
        $.post('api/send_sms', function(data){
          if(data.success){
            var time = data.time;
            $send_sms.addClass('disable').text(time + 's后重新发送');
            $('input[name="sms_code"]').parent().find('.tip-msg').text('校验码已发送，5分钟之内输入有效，请勿泄露!').show();
            var timer = setInterval(function(){
              time -= 1;
              if(time>0){
                $send_sms.text(time + 's后重新发送');
              }else{
                clearInterval(timer);
                $send_sms.removeClass('disable').text('重新发送验证码');
              }
            },1000)
          }else {

          }
        })
      }
  }
})
