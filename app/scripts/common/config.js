require.config({
  baseUrl: '/dist/scripts',
  paths: { 
    'jquery': '/dist/components/jquery/dist/jquery',
    'bootstrap': '/dist/components/bootstrap/dist/js/bootstrap',
    'eonasdan-bootstrap-datetimepicker': '../../dist/components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
    'moment': '../../dist/components/moment/moment',
    'moment-timezone': '../../dist/components/moment-timezone/builds/moment-timezone-with-data-2010-2020',
    'flexslider': '../../dist/components/flexslider/jquery.flexslider',
    'lightbox': '../../dist/components/lightbox2/dist/js/lightbox',
    'picker': '../../dist/components/pickadate/lib/picker',
    'picker.date': '../../dist/components/pickadate/lib/picker.date',
    'picker.time': '../../dist/components/pickadate/lib/picker.time',
    "jQuery.fn.datePicker": 'Plugins/jQuery.fn.datePicker',
    'jquery.fancySelect': 'Plugins/jQuery.fn.fancySelect',           // 下拉框插件
    'jquery.fileupload': '../../dist/components/blueimp-file-upload/js/jquery.fileupload',
    'jquery.fileupload.ui': '../../dist/components/blueimp-file-upload/js/jquery.fileupload-ui',
    'jquery.ui.widget': '../../dist/components/blueimp-file-upload/js/vendor/jquery.ui.widget',
    'jquery.fileupload-image': '../../dist/components/blueimp-file-upload/js//jquery.fileupload-image',
    'jquery.fileupload-audio': '../../dist/components/blueimp-file-upload/js//jquery.fileupload-audio',
    'jquery.fileupload-video': '../../dist/components/blueimp-file-upload/js//jquery.fileupload-video',
    'jquery.fileupload-validate': '../../dist/components/blueimp-file-upload/js/jquery.fileupload-validate',
    'jquery.fileupload-process': '../../dist/components/blueimp-file-upload/js/jquery.fileupload-process',
    'tmpl': '../../dist/components/blueimp-tmpl/js/tmpl',
    'load-image': '../../dist/components/blueimp-load-image/js/load-image',
    'load-image-exif': '../../dist/components/blueimp-load-image/js/load-image-exif',
    'load-image-meta': '../../dist/components/blueimp-load-image/js/load-image-meta',
    'canvas-to-blob': '../../dist/components/blueimp-canvas-to-blob/js/canvas-to-blob.min',
    'pay.upload': '../../dist/custom_components/upload/upload',
    'message': 'Plugins/message',
    'html5shiv': '/dist/components/html5shiv/dist/html5shiv',
    'requirejs': '/dist/components/requirejs/require',
    'pay.smscode': '../../dist/custom_components/sms-code/sms-code'
  },
  packages: [

  ],
  shim: {
    'jQuery.fn.datePicker': {
      deps: [
        'jquery'
      ]
    },
    flexslider: {
      deps: [
        'jquery'
      ],
      exports: 'flexslider'
    },
    lightbox: {
      deps: [
        'jquery'
      ],
      exports: 'lightbox'
    },
    bootstrap: {
      deps: [
        'jquery'
      ],
      exports: 'bootstrap'
    },
    'jquery.fancySelect': {
      deps: [
        'jquery'
      ]
    }
  }
})
