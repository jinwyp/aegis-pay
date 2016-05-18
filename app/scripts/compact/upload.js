define(['jquery', 'jquery.fileupload', 'bootstrap'],function($){
	return {
		init: function(){
			this.uploadfile();
			this.signCompact();
			// this.cancelSign();
		},
		uploadfile: function(){
			$('#fileupload').fileupload({
	        url: '/api/upload-compact',
	        dataType: 'json',
	        done: function (e, data) {
	            // $.each(data.result.files, function (index, file) {
	            //     $('<p/>').text(file.name).appendTo('#files');
	            // });
	        },
	        progressall: function (e, data) {

	        }
	    });
		},
		signCompact: function(){
			$('#signCompact .submit').click(function(e){
				var params = $('#signCompact').serialize();
				$.post('/api/sign-compact', params, function(result){
					if(result.success){
						location.href = '/payment?orderid=' + result.orderid;
					}
				})
			})
		},
		cancelSign: function(){
			$('#signCompact .cancel').click(function(e){
				$('#cancelSignModel').modal()
			})
		}
	}
})
