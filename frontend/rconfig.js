var rconfig = {
    baseUrl  : 'scripts',
    paths    : {
        'avalon'                            : 'empty:',
        'avalon.pagination'                 : 'empty:',
        'bootstrap'                         : '../components/bootstrap/dist/js/bootstrap',
        "devbridge-autocomplete"            : '../components/devbridge-autocomplete/dist/jquery.autocomplete',
        'eonasdan-bootstrap-datetimepicker' : '../components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
        'flexslider'                        : '../components/flexslider/jquery.flexslider',
        'html5shiv'                         : '../components/html5shiv/static/html5shiv',
        'jquery'                            : '../components/jquery/dist/jquery',
        'lightbox'                          : '../components/lightbox2/dist/js/lightbox',
        'moment'                            : '../components/moment/moment',
        'moment-timezone'                   : '../components/moment-timezone/builds/moment-timezone-with-data-2010-2020',
        'picker'                            : '../components/pickadate/lib/picker',
        'picker.date'                       : '../components/pickadate/lib/picker.date',
        'picker.time'                       : '../components/pickadate/lib/picker.time',
        'validator'                         : '../components/validator-js/validator',
        'jquery.fileupload'                 : '../components/blueimp-file-upload/js/jquery.fileupload',
        'jquery.iframe-transport'           : '../components/blueimp-file-upload/js/jquery.iframe-transport',
        'jquery.fileupload.ui'              : '../components/blueimp-file-upload/js/jquery.fileupload-ui',
        'jquery.ui.widget'                  : '../components/blueimp-file-upload/js/vendor/jquery.ui.widget',
        'jquery.fileupload-image'           : '../components/blueimp-file-upload/js//jquery.fileupload-image',
        'jquery.fileupload-audio'           : '../components/blueimp-file-upload/js//jquery.fileupload-audio',
        'jquery.fileupload-video'           : '../components/blueimp-file-upload/js//jquery.fileupload-video',
        'jquery.fileupload-validate'        : '../components/blueimp-file-upload/js/jquery.fileupload-validate',
        'jquery.fileupload-process'         : '../components/blueimp-file-upload/js/jquery.fileupload-process',
        'tmpl'                              : '../components/blueimp-tmpl/js/tmpl',
        'load-image'                        : '../components/blueimp-load-image/js/load-image',
        'load-image-exif'                   : '../components/blueimp-load-image/js/load-image-exif',
        'load-image-meta'                   : '../components/blueimp-load-image/js/load-image-meta',
        'canvas-to-blob'                    : '../components/blueimp-canvas-to-blob/js/canvas-to-blob.min',
        "jQuery.fn.datePicker"              : 'jquery_plugins/jQuery.fn.datePicker',
        'jquery.fancySelect'                : 'jquery_plugins/jQuery.fn.fancySelect',           // 下拉框插件
        'message'                           : 'business_components/message',
        'pay.upload'                        : 'business_components/upload',
        'pay.smscode'                       : 'business_components/sms-code',
        'datachecker'                       : 'business_components/datachecker',
        'compact-block'                     : 'compact/blocks/compact',
        'compact-upload'                    : 'compact/blocks/upload',
        'pay-block'                         : 'pay/blocks/pay',
        'guarantee-pay-block'               : 'guarantee/pay/blocks/pay',
        'forgetValid'                       : 'paypassword/blocks/forget-valid',
        'forgetSet'                         : 'paypassword/blocks/forget-set',
        'modifyValid'                       : 'paypassword/blocks/modify-valid',
        'modifySet'                         : 'paypassword/blocks/modify-set'
    },
    packages : [],
    shim     : {
        "jQuery.fn.datePicker"   : {
            deps : ['jquery']
        },
        "flexslider"               : {
            deps : ['jquery'],
            exports : 'flexslider'
        },
        "devbridge-autocomplete" : {
            deps : ['jquery']
        },
        "lightbox"                 : {
            deps : ['jquery'],
            exports : 'lightbox'
        },
        "bootstrap"                : {
            deps : ['jquery'],
            exports : 'bootstrap'
        },
        "jquery.fancySelect"     : {
            deps : ['jquery']
        },
        "avalon"                   : {
            deps : ['jquery', 'jquery.fancySelect', 'jQuery.fn.datePicker'],
            exports : "avalon"
        }
    }
}

module.exports = rconfig;