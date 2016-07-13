'use strict';

var gulp = require('gulp');
var del = require( 'del');
var spritesmith = require( 'gulp.spritesmith');
var browserSync = require( 'browser-sync');
var gulpLoadPlugins = require( 'gulp-load-plugins');
var nodemon = require(  'nodemon');
var requirejsOptimize= require('gulp-requirejs-optimize');

var bs  = browserSync.create();
var reload  = bs.reload;
var plugins = gulpLoadPlugins();



var sourcePaths = {
    "html"               : "../backend/views/**/*",
    "javascript"               : "scripts/**/*.js",
    "components"               : "components/**/*",
    "images"                   : "images/**/*",
    "imagesSprites"            : "images/sprite/icon/**/*",
    "scss"                     : 'styles/**/*.scss'
};

var distPaths = {
    "javascript"        : "dist/scripts",
    "components"        : "dist/components",
    "images"            : "dist/images",
    "imagesSprites"     : "images/sprite/auto-sprite.png",
    "imagesSpritesScss" : "styles/helpers/_auto_sprite.scss",
    "imagesSpritesScssReferringPath" : "/static/images/sprite/auto-sprite.png",
    "css"               : "dist/styles",
    "browserSyncWatchFiles" : [sourcePaths.html, "dist/scripts/**/*.js", "dist/styles/**/*.css"]
};



// Lint JavaScript
gulp.task('jslint', function() {
    gulp.src(sourcePaths.javascript)
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format())
        .pipe(plugins.if(!bs.active, plugins.eslint.failOnError()))
});


// Optimize images
gulp.task('images', function() {
    gulp.src(sourcePaths.images)
        .pipe(gulp.dest(distPaths.images))
});



gulp.task('sprite', function () {
    var spriteData = gulp.src(sourcePaths.imagesSprites).pipe(spritesmith({
        imgName:  distPaths.imagesSprites ,
        imgPath: distPaths.imagesSpritesScssReferringPath,
        cssName:  distPaths.imagesSpritesScss ,
        cssFormat:  'scss',
        algorithm : 'alt-diagonal',
        padding: 20
    }));
    return spriteData.pipe(gulp.dest(''));
});

// Compile and automatically prefix stylesheets
gulp.task('sass', ['sprite'], function() {
    gulp.src(sourcePaths.scss)
        .pipe(plugins.sass({
            precision       : 10,
            outputStyle     : 'compact',
            errLogToConsole : true
        }).on('error', plugins.sass.logError))
        //.pipe(plugins.autoprefixer({
        //    browsers: ['> 1%', 'Last 2 versions', 'IE 8'],
        //    cascade: false
        //}))
        //.pipe(plugins.cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(distPaths.css))
});



gulp.task('components', function() {
    gulp.src(sourcePaths.components)
        .pipe(gulp.dest(distPaths.components))
});





gulp.task('javascript', ['jslint', 'components'], function() {
    gulp.src(sourcePaths.javascript).pipe(gulp.dest(distPaths.javascript))
});


gulp.task('watch', function() {
    gulp.watch(sourcePaths.scss, ['sass']);
    gulp.watch(sourcePaths.javascript, ['javascript']);
    gulp.watch(sourcePaths.images, ['images']);
});


// gulp.task('release', function(){
//     gulp.src('scripts/**/*.js')
//     .pipe(requirejsOptimize({
//         baseUrl  : 'scripts',
//         paths    : {
//             'avalon'                            : '../components/avalon/dist/avalon',
//             'bootstrap'                         : '../components/bootstrap/dist/js/bootstrap',
//             "devbridge-autocomplete"            : '../components/devbridge-autocomplete/dist/jquery.autocomplete',
//             'eonasdan-bootstrap-datetimepicker' : '../components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
//             'flexslider'                        : '../components/flexslider/jquery.flexslider',
//             'html5shiv'                         : '../components/html5shiv/static/html5shiv',
//             'jquery'                            : '../components/jquery/dist/jquery',
//             'lightbox'                          : '../components/lightbox2/dist/js/lightbox',
//             'moment'                            : '../components/moment/moment',
//             'moment-timezone'                   : '../components/moment-timezone/builds/moment-timezone-with-data-2010-2020',
//             'picker'                            : '../components/pickadate/lib/picker',
//             'picker.date'                       : '../components/pickadate/lib/picker.date',
//             'picker.time'                       : '../components/pickadate/lib/picker.time',
//             'validator'                         : '../components/validator-js/validator',
//             'jquery.fileupload'                 : '../components/blueimp-file-upload/js/jquery.fileupload',
//             'jquery.fileupload.ui'              : '../components/blueimp-file-upload/js/jquery.fileupload-ui',
//             'jquery.ui.widget'                  : '../components/blueimp-file-upload/js/vendor/jquery.ui.widget',
//             'jquery.fileupload-image'           : '../components/blueimp-file-upload/js//jquery.fileupload-image',
//             'jquery.fileupload-audio'           : '../components/blueimp-file-upload/js//jquery.fileupload-audio',
//             'jquery.fileupload-video'           : '../components/blueimp-file-upload/js//jquery.fileupload-video',
//             'jquery.fileupload-validate'        : '../components/blueimp-file-upload/js/jquery.fileupload-validate',
//             'jquery.fileupload-process'         : '../components/blueimp-file-upload/js/jquery.fileupload-process',
//             'tmpl'                              : '../components/blueimp-tmpl/js/tmpl',
//             'load-image'                        : '../components/blueimp-load-image/js/load-image',
//             'load-image-exif'                   : '../components/blueimp-load-image/js/load-image-exif',
//             'load-image-meta'                   : '../components/blueimp-load-image/js/load-image-meta',
//             'canvas-to-blob'                    : '../components/blueimp-canvas-to-blob/js/canvas-to-blob.min',
//             "jQuery.fn.datePicker"              : 'jquery_plugins/jQuery.fn.datePicker',
//             'jquery.fancySelect'                : 'jquery_plugins/jQuery.fn.fancySelect',           // 下拉框插件
//             'message'                           : 'business_components/message',
//             'pay.upload'                        : 'business_components/upload',
//             'pay.smscode'                       : 'business_components/sms-code',
//             'datachecker'                       : 'business_components/datachecker',
//             'avalon.pagination'                 : 'avalon_components/pagination',
//             'compact'                           : 'compact/compact',
//             'upload'                            : 'compact/upload',
//             'pay'                               : 'pay/blocks/pay'

//         },
//         packages : [],
//         shim     : {
//             "jQuery.fn.datePicker"   : {
//                 deps : ['jquery']
//             },
//             "flexslider"               : {
//                 deps : ['jquery'],
//                 exports : 'flexslider'
//             },
//             "devbridge-autocomplete" : {
//                 deps : ['jquery']
//             },
//             "lightbox"                 : {
//                 deps : ['jquery'],
//                 exports : 'lightbox'
//             },
//             "bootstrap"                : {
//                 deps : ['jquery'],
//                 exports : 'bootstrap'
//             },
//             "jquery.fancySelect"     : {
//                 deps : ['jquery']
//             },
//             "avalon"                   : {
//                 deps : ['jquery', 'jquery.fancySelect', 'jQuery.fn.datePicker'],
//                 exports : "avalon"
//             }
//         }
//     }))
//     .pipe(gulp.dest(distPaths.javascript))
// })
gulp.task('release', function(){
    gulp.src('scripts/**/*.js')
    .pipe(requirejsOptimize(function(file){
        console.log('---new file-----------------------------------------------')
        console.log(file.relative);
    }))
    .pipe(gulp.dest(distPaths.javascript))
})

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        nodeArgs: ['--debug'],
        script: '../backend/app.js',
        env: { 'MODE': 'local' , 'MOCK':'false'},
        ignore: ["app/**/*", "../backend/views/**/*","../backend/test/**/*"],
        // watch core server file(s) that require server restart on change
         watch: ['../backend/**/*.js']
    }).on('start', function() {
        // ensure start only got called once
        if (!called) {
            called = true;
            cb();
        }
    }).on('restart', function() {
        setTimeout(function () {
            reload({ stream: false });
        }, 3000);
        console.log('---------- nodemon 重启服务器成功 ---------- ');
    }).on('quit', function() {
        console.log('---------- Exiting the process ---------- ');
        process.exit();
    });
});



gulp.task('browser-sync', function() {
    bs.init({
        // informs browser-sync to proxy our expressjs app which would run at the following location
        proxy: 'http://localhost:3001',
        // informs browser-sync to use the following port for the proxied app
        // notice that the default port is 3000, which would clash with our expressjs
        port: 4000,
        // browser: ['google-chrome'], // open the proxied app in chrome
        notify: true,
        ui: {
            port: 4001,
            weinre: {
                port: 4002
            }
        },
        open: false,
        files: distPaths.browserSyncWatchFiles
    });
});

gulp.task('clean', function() {
    del.sync(['dist/**/*']);
});

gulp.task('frontend', ['clean', 'sass', 'javascript', 'images', 'watch']);
gulp.task('server', ['clean',  'sass', 'javascript', 'images', 'watch', 'nodemon']);
gulp.task('sync', ['clean',  'sass', 'javascript', 'images', 'watch', 'nodemon', 'browser-sync']);
gulp.task('build', ['clean', 'sass', 'javascript', 'images']);

gulp.task('default', ['sync']);
