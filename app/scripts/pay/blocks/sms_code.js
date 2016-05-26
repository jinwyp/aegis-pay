define(['jquery'],function($){
  return {
      init: function(){
        $('.send_sms').click(function(){
          if($(this).hasClass('disable')) return;
          var self = $(this);
          $.post('api/send_sms', function(data){
            // 大于n次需要图片验证码
            if(data.needimgcode){
              self.parent().after('<li>请输入：<input type="text" name="imgcode" value=""/><img src="api/imgcode" /></li>')
            }
            if(data.success){
              var text = data.time + 's后重新发送';
              self.addClass('disable').text(text);
            }
          })
        })
      }
  }
})
