define(['jquery', 'jquery.fileupload'],function($){
	return {
		init: function(){
			this.uploadfile();

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
			
		},
		cancelSign: function(){

		}
	}
})
