require.config({
  baseUrl: '/static/scripts',
  paths: { 
    'jquery': '/static/components/jquery/dist/jquery',
    'bootstrap': '/static/components/bootstrap/dist/js/bootstrap',
    'eonasdan-bootstrap-datetimepicker': '../../static/components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
    'moment': '../../static/components/moment/moment',
    'moment-timezone': '../../static/components/moment-timezone/builds/moment-timezone-with-data-2010-2020',
    'flexslider': '../../static/components/flexslider/jquery.flexslider',
    'lightbox': '../../static/components/lightbox2/dist/js/lightbox',
    'picker': '../../static/components/pickadate/lib/picker',
    'picker.date': '../../static/components/pickadate/lib/picker.date',
    'picker.time': '../../static/components/pickadate/lib/picker.time',
    "jQuery.fn.datePicker": 'Plugins/jQuery.fn.datePicker',
    'jquery.fancySelect': 'Plugins/jQuery.fn.fancySelect',           // 下拉框插件
    'jquery.fileupload': '../../static/components/blueimp-file-upload/js/jquery.fileupload',
    'jquery.fileupload.ui': '../../static/components/blueimp-file-upload/js/jquery.fileupload-ui',
    'jquery.ui.widget': '../../static/components/blueimp-file-upload/js/vendor/jquery.ui.widget',
    'jquery.fileupload-image': '../../static/components/blueimp-file-upload/js//jquery.fileupload-image',
    'jquery.fileupload-audio': '../../static/components/blueimp-file-upload/js//jquery.fileupload-audio',
    'jquery.fileupload-video': '../../static/components/blueimp-file-upload/js//jquery.fileupload-video',
    'jquery.fileupload-validate': '../../static/components/blueimp-file-upload/js/jquery.fileupload-validate',
    'jquery.fileupload-process': '../../static/components/blueimp-file-upload/js/jquery.fileupload-process',
    'tmpl': '../../static/components/blueimp-tmpl/js/tmpl',
    'load-image': '../../static/components/blueimp-load-image/js/load-image',
    'load-image-exif': '../../static/components/blueimp-load-image/js/load-image-exif',
    'load-image-meta': '../../static/components/blueimp-load-image/js/load-image-meta',
    'canvas-to-blob': '../../static/components/blueimp-canvas-to-blob/js/canvas-to-blob.min',
    'pay.upload': '../../static/custom_components/upload/upload',
    'message': 'Plugins/message',
    'html5shiv': '/static/components/html5shiv/static/html5shiv',
    'requirejs': '/static/components/requirejs/require',
    "devbridge-autocomplete": "/static/components/devbridge-autocomplete/dist/jquery.autocomplete",
    'avalon': '/static/components/avalon/dist/avalon',
    'pay.smscode': '../../static/custom_components/sms-code/sms-code',
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
    "devbridge-autocomplete": {
      deps: [
        "jquery"
      ]
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
    },
    avalon: {
      deps: [
        'jquery',
      ],
      exports: "avalon"
    }
  }
});

