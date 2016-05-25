define(['jquery', 'pay.upload'],function($, upload){
	return {
		init: function(){
			upload.init();
			this.signCompact();
		},
		signCompact: function(){
			$('#signCompact .submit').click(function(e){
				var params = $('#signCompact').serialize();
				$.post('/api/sign-compact', params, function(result){
					if(result.success){
						location.href = '/pay?orderid=' + result.orderid;
					}
				})
			})
		}
	}
})
