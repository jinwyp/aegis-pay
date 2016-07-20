'use strict';

var gulp = require('gulp');
var del = require( 'del');
var spritesmith = require( 'gulp.spritesmith');
var gulpLoadPlugins = require( 'gulp-load-plugins');


var browserSync = require( 'browser-sync');
var nodemon = require(  'nodemon');
var requirejsOptimize= require('gulp-requirejs-optimize');

var bs  = browserSync.create();
var reload  = bs.reload;
var plugins = gulpLoadPlugins();

var rconfig = require('./rconfig');

var sourcePaths = {
    "html"               : "../backend/views/**/*",
    "javascript"               : "scripts/**/*.js",
    "components"               : "components/**/*",
    "avalon_components"        : 'scripts/avalon_components/*.js',
    "plugins"                  : 'scripts/jquery_plugins/*.js',
    "images"                   : "images/**/*",
    "imagesSprites"            : "images/sprite/icon/**/*",
    "scss"                     : 'styles/**/*.scss'
};

var distPaths = {
    "html"                           : "../backend/viewsdist",
    "javascript"                     : "dist/scripts",
    "components"                     : "dist/components",
    "avalon_components"              : 'dist/scripts/avalon_components',
    "plugins"                        : 'dist/scripts/jquery_plugins',
    "images"                         : "dist/images",
    "imagesSprites"                  : "images/sprite/auto-sprite.png",
    "imagesSpritesScss"              : "styles/helpers/_auto_sprite.scss",
    "imagesSpritesScssReferringPath" : "/static/images/sprite/auto-sprite.png",
    "css"                            : "dist/styles",
    "browserSyncWatchFiles"          : [sourcePaths.html, "dist/scripts/**/*.js", "dist/styles/**/*.css"],
    "manifest" : "dist/rev"
};



// Html Views
gulp.task('htmlTemplate', function() {
    gulp.src(sourcePaths.html)
        .pipe(gulp.dest(distPaths.html))
});


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
        .pipe(gulp.dest(distPaths.components));
    gulp.src(sourcePaths.plugins)
        .pipe(gulp.dest(distPaths.plugins));
    gulp.src(sourcePaths.avalon_components)
        .pipe(gulp.dest(distPaths.avalon_components));
});





gulp.task('javascript', ['jslint', 'components'], function() {
    gulp.src(sourcePaths.javascript).pipe(gulp.dest(distPaths.javascript))
});


gulp.task('watch', function() {
    gulp.watch(sourcePaths.scss, ['sass']);
    gulp.watch(sourcePaths.javascript, ['javascript']);
    gulp.watch(sourcePaths.images, ['images']);
});




// release tasks
gulp.task('release-js', ['htmlTemplate', 'jslint', 'components'], function(){
    return gulp.src(['scripts/*.js', 'scripts/*/*.js', '!scripts/avalon_components/*.js', '!scripts/business_components/*.js', '!scripts/jquery_plugins/**/*.js'])
    .pipe(requirejsOptimize(function(file){
        if(file.relative !== 'common.js'){
            rconfig.exclude = ['common'];
        }else{
            rconfig.exclude = [];
        }
        return rconfig;
    }))
    .pipe(plugins.rev())
    .pipe(gulp.dest(distPaths.javascript))
    .pipe(plugins.rev.manifest('rev-manifest-js.json'))
    .pipe(gulp.dest(distPaths.manifest) );
});

gulp.task('release-sass', ['sprite'], function() {
    return gulp.src(sourcePaths.scss)
        .pipe(plugins.sass({
            precision       : 10,
            outputStyle     : 'compressed',
            errLogToConsole : true
        }).on('error', plugins.sass.logError))
        .pipe(plugins.rev())
        .pipe(gulp.dest(distPaths.css))
        .pipe(plugins.rev.manifest('rev-manifest-css.json'))
        .pipe(gulp.dest(distPaths.manifest) );
});


gulp.task('rev-collector', ['release-js', 'release-sass'],  function () {
    //gulp.src(['rev/**/*.json', 'dist/styles/**/*.css'])
    //    .pipe( plugins.revCollector() )
    //    .pipe( gulp.dest(distPaths.css) );

    gulp.src([distPaths.manifest + '/*.json', distPaths.html+'/**/*'])
        .pipe( plugins.revCollector() )
        .pipe( gulp.dest(distPaths.html) );
});


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
gulp.task('build', ['clean', 'rev-collector', 'images']);

gulp.task('default', ['sync']);



//
//gulp.task('release-images', function() {
//    return gulp.src(sourcePaths.images)
//        .pipe(rev())
//        .pipe(gulp.dest(distPaths.images))
//        .pipe( rev.manifest() )
//        .pipe( gulp.dest('rev/img') );
//});

