require.config({
  baseUrl: '/static/scripts',
  paths: {
    jquery: '../../static/components/jquery/dist/jquery',
    bootstrap: '../../components/bootstrap/dist/js/bootstrap',
    'eonasdan-bootstrap-datetimepicker': '../../components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
    moment: '../../components/moment/moment',
    'moment-timezone': '../../components/moment-timezone/builds/moment-timezone-with-data-2010-2020',
    flexslider: '../../components/flexslider/jquery.flexslider',
    lightbox: '../../static/components/lightbox2/dist/js/lightbox',
    picker: '../../components/pickadate/lib/picker',
    'picker.date': '../../components/pickadate/lib/picker.date',
    'picker.time': '../../components/pickadate/lib/picker.time',
    'jQuery.fn.datePicker': 'Plugins/jQuery.fn.datePicker',
    'jquery.fancySelect': 'Plugins/jQuery.fn.fancySelect',
    'jquery.fileupload': '../../static/components/blueimp-file-upload/js/jquery.fileupload',
    'jquery.fileupload.ui': '../../static/components/blueimp-file-upload/js/jquery.fileupload-ui',
    'jquery.ui.widget': '../../static/components/blueimp-file-upload/js/vendor/jquery.ui.widget',
    'jquery.fileupload-image': '../../static/components/blueimp-file-upload/js//jquery.fileupload-image',
    'jquery.fileupload-audio': '../../static/components/blueimp-file-upload/js//jquery.fileupload-audio',
    'jquery.fileupload-video': '../../static/components/blueimp-file-upload/js//jquery.fileupload-video',
    'jquery.fileupload-validate': '../../static/components/blueimp-file-upload/js/jquery.fileupload-validate',
    'jquery.fileupload-process': '../../static/components/blueimp-file-upload/js/jquery.fileupload-process',
    tmpl: '../../static/components/blueimp-tmpl/js/tmpl',
    'load-image': '../../static/components/blueimp-load-image/js/load-image',
    'load-image-exif': '../../static/components/blueimp-load-image/js/load-image-exif',
    'load-image-meta': '../../static/components/blueimp-load-image/js/load-image-meta',
    'canvas-to-blob': '../../static/components/blueimp-canvas-to-blob/js/canvas-to-blob.min',
    'pay.upload': '../../static/custom_components/upload/upload',
    'blueimp-file-upload': '../../components/blueimp-file-upload/js/jquery.fileupload',
    'blueimp-canvas-to-blob': '../../components/blueimp-canvas-to-blob/js/canvas-to-blob',
    'blueimp-load-image': '../../components/blueimp-load-image/index',
    'blueimp-tmpl': '../../components/blueimp-tmpl/js/tmpl',
    lightbox2: '../../components/lightbox2/dist/js/lightbox'
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
