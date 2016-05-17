requirejs.config({
  baseUrl: 'scripts',
  paths: {
    components: '../components',
    libs: '../libs',
    flexslider: '../components/flexslider/jquery.flexslider-min',
    jquery: '../libs/jquery-2.2.3.min',
    lightbox: '../components/lightbox2/dist/js/lightbox.min',
    'jquery.fileupload': '../components/blueimp-file-upload/js/jquery.fileupload',
    'jquery.fileupload.ui': '../components/blueimp-file-upload/js/jquery.fileupload-ui',
    'jquery.ui.widget': '../components/blueimp-file-upload/js/vendor/jquery.ui.widget',
    'jquery.fileupload-image': '../components/blueimp-file-upload/js//jquery.fileupload-image',
    'jquery.fileupload-audio': '../components/blueimp-file-upload/js//jquery.fileupload-audio',
    'jquery.fileupload-video': '../components/blueimp-file-upload/js//jquery.fileupload-video',
    'jquery.fileupload-validate': '../components/blueimp-file-upload/js/jquery.fileupload-validate',
    'jquery.fileupload-process': '../components/blueimp-file-upload/js/jquery.fileupload-process',
    'tmpl': '../components/blueimp-tmpl/js/tmpl',
    'load-image': '../components/blueimp-load-image/js/load-image',
    'load-image-exif': '../components/blueimp-load-image/js/load-image-exif',
    'load-image-meta': '../components/blueimp-load-image/js/load-image-meta',
    'canvas-to-blob': '../components/blueimp-canvas-to-blob/js/canvas-to-blob.min',
    compact: 'compact/compact',
    upload: 'compact/upload'
  },
	shim: {
		'flexslider': {
			deps: ['jquery'],
			exports: 'flexslider'
		},
    'lightbox': {
			deps: ['jquery'],
			exports: 'lightbox'
		},
    // 'jquery.ui.widget': {
    //   deps: ['jquery'],
    //   exports: 'jquery.ui.widget'
    // },
    // 'jquery.fileupload': {
    //   deps: ['jquery'],
    //   exports: 'jquery.fileupload'
    // }
	}
});

require(['compact', 'upload'], function(compact, upload){
  compact.init();
  upload.init();
})
