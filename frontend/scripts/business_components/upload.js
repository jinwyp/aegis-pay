define(['jquery', 'jquery.fileupload', 'bootstrap'],function($){

	/**
	 * 异步上传附件.自定义
	 * @param $file file控件元素
	 * @param params 参数对象(API:接口路径, typeObj:请求类型, maxFileSize: 最多值, fileType: ["jpg", "png"]文件类型限制, fileWidth:宽度, fileHeight:高度)
	 * @param callback 回调函数
	 */
	function ajaxFileUpload ($file, params, callback) {
		var errorMessage = '', verify = true; 						// 错误信息, 验证结果
		params = params || {};
		params.maxFileSize = params.maxFileSize || 1048576 * 5;		// 最大5Mb
		params.fileType = params.fileType || [];

		var file = $file[0];
		if( filterFormat(file, params.fileType) ) {
			errorMessage = '上传附件格式错误!';
			verify = false;
		}
		if( file.files.length > 0 && (file.files[0].size > params.maxFileSize) ) {
			errorMessage = '上传附件超出大小上限!';
			verify = false;
		}

		if(verify) {
			$file.fileupload({
				url: params.API || '/api/upload-file',
				dataType: 'json',
				//maxFileSize: params.maxSize || 5120,
				done: function (e, data) {
					if (data && data.result && data.result) {
						callback && typeof callback === "function" && callback(data.result);
					}
				},
				progressall: function (e, data) {
					// var progress = parseInt(data.loaded / data.total * 100, 10);
				}
			});
		} else {
			var data = {
				success: false,
				errorMessage: errorMessage
			};
			callback && typeof callback === "function" && callback(data);
		}
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
					$tag.parent('.fileLab').remove();
				}
			}
		});
	}

	// 图片格式
	function filterFormat($tag, typeList) {
		var results = false,
			tagType = $tag.value.substr($tag.value.lastIndexOf('.') + 1);

		if(typeList && typeList.length > 0 && $.inArray(tagType.toLowerCase(), typeList) < 0) {
			results = true;
		}
		return results;
	}

	return {
		ajaxFileUpload: ajaxFileUpload,				//上传附件
		ajaxFileRemove: ajaxFileRemove,				//移除附件
		filterFormat: filterFormat,					//格式验证

		init: function(){
			this.uploadfile();
		},
		uploadfile: function(){
			var self = this;
			// 上传文件
			$('.fileupload').fileupload({
	        url: '/api/upload-file',
	        dataType: 'json',
			maxFileSize: 30000000,
			add: function(e, data) {
				var e = e || window.event;
				var target = e.srcElement || e.target;
				self.$inputfile = $(target).parent();

                var uploadErrors = [];
                // var acceptFileTypes = /^image\/(gif|jpe?g|png)$/i;
                // if(data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type'])) {
                //     uploadErrors.push('Not an accepted file type');
                // }
                if(data.originalFiles[0]['size'] && data.originalFiles[0]['size'] > 30000000) {
                    uploadErrors.push('Filesize is too big');
                }
				// 确认提货页面上传限制
				if($("#confirmDelivery").length){
					
					if(data.originalFiles[0]['size'] && data.originalFiles[0]['size'] > 5000000) {
						$(".errorMes").text("请上传大小5M以内的图片");
						return false;
					}else{
						$(".errorMes").text("");
					}
					
				}
                if(uploadErrors.length > 0) {
					self.$inputfile.siblings('.tip-error').addClass('uploadlimit').text(uploadErrors.join("\n")).show();
                } else {
					$('.uploadlimit.tip-error').removeClass('uploadlimit').hide();
                    data.submit();
                }
        	},
	        done: function (e, data) {
				var e = e || window.event;
				var target = e.srcElement || e.target;
				var self = this;
				self.$fileWrapper = $(target).parent().next('.files');
				//var $fileWrapper = $('#files');
	            $.each(data.result.attach, function (index, file) {
					var filehtml = '<p class="file">' + file.filename + '<span class="del"></span><input type="hidden" name="file_id" value="' + file.id + '"><input type="hidden" name="file_name" value="' + file.filename + '"></p>';
	                self.$fileWrapper.append(filehtml);
	            });
	        },
			progressall: function (e, data) {
				var $p = self.$inputfile.siblings('.progress');
				if(data.total < 20000000){
					$p.hide();
					return;
				}
		        var progress = parseInt(data.loaded / data.total * 100, 10);
				$p.children('.progress-bar').css('width', progress+ '%');
				$p.attr("aria-valuenow", progress).show();
				if(progress>=100){
					$p.hide();
				}
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
