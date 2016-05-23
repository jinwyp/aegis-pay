require.config({
  baseUrl: 'scripts',
  paths: {
    'jquery': '../../components/jquery/dist/jquery',
    'bootstrap': '../../components/bootstrap/dist/js/bootstrap',
    'eonasdan-bootstrap-datetimepicker': '../../components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
    'moment': '../../components/moment/moment',
    'moment-timezone': '../../components/moment-timezone/builds/moment-timezone-with-data-2010-2020',
    'flexslider': '../../components/flexslider/jquery.flexslider',
    'lightbox': '../../components/lightbox2/dist/js/lightbox',
    'picker': '../../components/pickadate/lib/picker',
    'picker.date': '../../components/pickadate/lib/picker.date',
    'picker.time': '../../components/pickadate/lib/picker.time',
    "jQuery.fn.datePicker": '/scripts/Plugins/jQuery.fn.datePicker',
    'jquery.fancySelect': '/scripts/Plugins/jQuery.fn.fancySelect',           // 下拉框插件
    'jquery.fileupload': '../../components/blueimp-file-upload/js/jquery.fileupload',
    'jquery.fileupload.ui': '../../components/blueimp-file-upload/js/jquery.fileupload-ui',
    'jquery.ui.widget': '../../components/blueimp-file-upload/js/vendor/jquery.ui.widget',
    'jquery.fileupload-image': '../../components/blueimp-file-upload/js//jquery.fileupload-image',
    'jquery.fileupload-audio': '../../components/blueimp-file-upload/js//jquery.fileupload-audio',
    'jquery.fileupload-video': '../../components/blueimp-file-upload/js//jquery.fileupload-video',
    'jquery.fileupload-validate': '../../components/blueimp-file-upload/js/jquery.fileupload-validate',
    'jquery.fileupload-process': '../../components/blueimp-file-upload/js/jquery.fileupload-process',
    'tmpl': '../../components/blueimp-tmpl/js/tmpl',
    'load-image': '../../components/blueimp-load-image/js/load-image',
    'load-image-exif': '../../components/blueimp-load-image/js/load-image-exif',
    'load-image-meta': '../../components/blueimp-load-image/js/load-image-meta',
    'canvas-to-blob': '../../components/blueimp-canvas-to-blob/js/canvas-to-blob.min',
    'pay.upload': '../../custom_components/upload/upload'
  },
  packages: [

  ],
  shim: {
    'jQuery.fn.datePicker': {
      deps: [
        'jquery'
      ]
    },
    'flexslider': {
          deps: ['jquery'],
          exports: 'flexslider'
      },
    'lightbox': {
          deps: ['jquery'],
          exports: 'lightbox'
      },
    'bootstrap': {
          deps: ['jquery'],
          exports: 'bootstrap'
    },
    'jquery.fancySelect': {
      deps: [
        'jquery'
      ]
    },
  }
})
