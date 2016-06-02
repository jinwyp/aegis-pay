define(['jquery', 'jquery.fileupload', 'bootstrap'],function($){
	return {
		init: function(){
			this.uploadfile();
		},
		uploadfile: function(){
			// 上传文件
			$('.fileupload').fileupload({
	        url: '/api/upload-file',
	        dataType: 'json',
			maxFileSize: 5000000,
	        done: function (e, data) {
				var e = e || window.event;
				var target = e.srcElement || e.target;
				var $fileWrapper = $(target).parent().next('.files');
				//var $fileWrapper = $('#files');
	            $.each(data.result.attach, function (index, file) {
					var filehtml = '<p class="file">' + file.filename + '<span class="del"></span><input type="hidden" name="file_id" value="' + file.id + '"><input type="hidden" name="file_name" value="' + file.filename + '"></p>';
	                $fileWrapper.append(filehtml);
	            });
	        },
					progressall: function (e, data) {
			        // var progress = parseInt(data.loaded / data.total * 100, 10);
			    }
	    });
			// 删除文件
			$('.files').click(function(e){
				var ev = e || window.event;
				var target = ev.target || ev.srcElement;
				if(target.className.toLowerCase() == 'del'){
					$.post('/api/del-file', {'id':$(target).siblings('input[name="file_id"]').val()}, function(result){
						if(result.success){
							$(target).parent().remove();
						}
					})
				}
			})
		}
	}
})
