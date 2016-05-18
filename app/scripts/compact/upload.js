define(['jquery', 'jquery.fileupload', 'bootstrap'],function($){
	return {
		init: function(){
			this.uploadfile();
			this.signCompact();
		},
		uploadfile: function(){
			// 上传文件
			$('#fileupload').fileupload({
	        url: '/api/upload-file',
	        dataType: 'json',
					maxFileSize: 5000000,
	        done: function (e, data) {
							var $fileWrapper = $('#files');
	            $.each(data.result.attach, function (index, file) {
									var filehtml = '<p class="file">' + file.filename + '<span class="del"></span><input type="hidden" name="filepath" value="' + file.path + '"></p>';
	                $fileWrapper.append(filehtml);
	            });
	        },
					progressall: function (e, data) {
			        // var progress = parseInt(data.loaded / data.total * 100, 10);
			    }
	    });
			// 删除文件
			$('#files').click(function(e){
				var ev = e || window.event;
				var target = ev.target || ev.srcElement;
				if(target.className.toLowerCase() == 'del'){
					$.post('/api/del-file', {'path':$(target).siblings('input[name="filepath"]').val()}, function(result){
						if(result.success){
							$(target).parent().remove();
						}
					})
				}
			})
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
		}
	}
})
