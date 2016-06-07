define(['jquery', 'pay.upload'],function($, upload){
	return {
		init: function(){
			upload.init();
			this.signCompact();
		},
		signCompact: function(){
			$('#signCompact .submit').click(function(e){
				if(!$('input[name="file_id"]').size()>0 || !$('input[name="file_id"]').val()){
					$('#signCompact .tip-error').text('请上传已盖章合同！').show();
					return ;
				}
				$('#signCompact .tip-error').hide();
				var params = $('#signCompact').serialize();
				$.post('/api/sign-compact', params, function(result){
					if(result.success){
						location.href = '/pay?orderId=' + $('input[name="orderId"]').val();
					}
				})
			})
		}
	}
})
