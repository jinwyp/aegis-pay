var baseUrl    = '/static';
var libraryUrl = '/static/components';
require.config({
    baseUrl  : baseUrl + '/scripts',
    paths    : {
        'avalon'                            : libraryUrl + '/avalon/dist/avalon',
        'bootstrap'                         : libraryUrl + '/bootstrap/dist/js/bootstrap',
        "devbridge-autocomplete"            : libraryUrl + '/devbridge-autocomplete/dist/jquery.autocomplete',
        'eonasdan-bootstrap-datetimepicker' : libraryUrl + '/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
        'flexslider'                        : libraryUrl + '/flexslider/jquery.flexslider',
        'html5shiv'                         : libraryUrl + '/html5shiv/static/html5shiv',
        'jquery'                            : libraryUrl + '/jquery/dist/jquery',
        'lightbox'                          : libraryUrl + '/lightbox2/dist/js/lightbox',
        'moment'                            : libraryUrl + '/moment/moment',
        'moment-timezone'                   : libraryUrl + '/moment-timezone/builds/moment-timezone-with-data-2010-2020',
        'picker'                            : libraryUrl + '/pickadate/lib/picker',
        'picker.date'                       : libraryUrl + '/pickadate/lib/picker.date',
        'picker.time'                       : libraryUrl + '/pickadate/lib/picker.time',
        'validator'                         : libraryUrl + '/validator-js/validator',
        'jquery.fileupload'                 : libraryUrl + '/blueimp-file-upload/js/jquery.fileupload',
        'jquery.fileupload.ui'              : libraryUrl + '/blueimp-file-upload/js/jquery.fileupload-ui',
        'jquery.ui.widget'                  : libraryUrl + '/blueimp-file-upload/js/vendor/jquery.ui.widget',
        'jquery.fileupload-image'           : libraryUrl + '/blueimp-file-upload/js//jquery.fileupload-image',
        'jquery.fileupload-audio'           : libraryUrl + '/blueimp-file-upload/js//jquery.fileupload-audio',
        'jquery.fileupload-video'           : libraryUrl + '/blueimp-file-upload/js//jquery.fileupload-video',
        'jquery.fileupload-validate'        : libraryUrl + '/blueimp-file-upload/js/jquery.fileupload-validate',
        'jquery.fileupload-process'         : libraryUrl + '/blueimp-file-upload/js/jquery.fileupload-process',
        'tmpl'                              : libraryUrl + '/blueimp-tmpl/js/tmpl',
        'load-image'                        : libraryUrl + '/blueimp-load-image/js/load-image',
        'load-image-exif'                   : libraryUrl + '/blueimp-load-image/js/load-image-exif',
        'load-image-meta'                   : libraryUrl + '/blueimp-load-image/js/load-image-meta',
        'canvas-to-blob'                    : libraryUrl + '/blueimp-canvas-to-blob/js/canvas-to-blob.min',
        "jQuery.fn.datePicker"              : 'jquery_plugins/jQuery.fn.datePicker',
        'jquery.fancySelect'                : 'jquery_plugins/jQuery.fn.fancySelect',           // 下拉框插件
        'message'                           : 'business_components/message',
        'pay.upload'                        : 'business_components/upload',
        'pay.smscode'                       : 'business_components/sms-code',
        'datachecker'                       : 'business_components/datachecker',
        'avalon.pagination'                 : 'avalon_components/pagination'

    },
    packages : [],
    shim     : {
        'jQuery.fn.datePicker'   : {
            deps : [
                'jquery'
            ]
        },
        flexslider               : {
            deps    : [
                'jquery'
            ],
            exports : 'flexslider'
        },
        "devbridge-autocomplete" : {
            deps : [
                "jquery"
            ]
        },
        lightbox                 : {
            deps    : [
                'jquery'
            ],
            exports : 'lightbox'
        },
        bootstrap                : {
            deps    : [
                'jquery'
            ],
            exports : 'bootstrap'
        },
        'jquery.fancySelect'     : {
            deps    : [
                'jquery'
            ]
        },
        avalon                   : {
            deps    : [
                'jquery',
            ],
            exports : "avalon"
        }
    }
});

