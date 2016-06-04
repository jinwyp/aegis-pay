define(['jquery', 'jquery.fileupload', 'bootstrap'],function($){

	/**
	 * 异步上传附件.自定义
	 * @param $file file控件元素
	 * @param params 参数对象(API:接口路径, typeObj:请求类型, fileSize:大小, fileWidth:宽度, fileHeight:高度, fileType:文件类型限制)
	 * @param callback 回调函数
	 */
	function ajaxFileUpload ($file, params, callback) {
		params = params || {};

		$file.fileupload({
			url: params.API || '/api/upload-file',
			dataType: 'json',
			maxFileSize: params.maxSize || 5120,		// 单位 K  5Mb
			done: function (e, data) {
				if (data && data.result && data.result) {
					callback && typeof callback === "function" && callback(data.result);
				}
			},
			progressall: function (e, data) {
				// var progress = parseInt(data.loaded / data.total * 100, 10);
			}
		});
	}

	/**
	 * 异步删除附件.自定义
	 * @param $tag 删除控件元素
	 * @param params 参数对象
	 * @param callback 回调函数
	 */
	function ajaxFileRemove($tag, params, callback) {
		params = params || {};

		$.ajax({
			url: params.API || '/api/del-file',
			data: {
				id: $tag.attr('data-id')
			},
			type: 'POST',
			dataType: 'json',
			success: function(data){
				callback && typeof callback === "function" && callback(data);

				if(data.success){
					$tag.parent().remove();
				}
			}
		});
	}



	return {
		ajaxFileUpload: ajaxFileUpload,				//上传附件
		ajaxFileRemove: ajaxFileRemove,				//移除附件

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
					var filehtml = '<p class="file">' + file.filename + '<span class="del"></span><input type="hidden" name="file_id" value="' + file.id + '"></p>';
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
});
