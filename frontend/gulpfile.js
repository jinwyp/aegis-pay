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

var rconfig = require('./rconfig');

var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var runSequence = require('run-sequence');



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

// release tasks
gulp.task('release-js', ['jslint', 'components'], function(){
    return gulp.src(['scripts/*.js', 'scripts/*/*.js', '!scripts/avalon_components/*.js', '!scripts/business_components/*.js', '!scripts/jquery_plugins/*.js'])
    .pipe(requirejsOptimize(function(file){
        if(file.relative !== 'common.js'){
            rconfig.exclude = ['common'];
        }else{
            rconfig.exclude = [];
        }
        return rconfig;
    }))
    .pipe(rev())
    .pipe(gulp.dest(distPaths.javascript))
    .pipe( rev.manifest() )
    .pipe( gulp.dest('rev/js') );
})

gulp.task('release-sass', ['sprite'], function() {
    return gulp.src(sourcePaths.scss)
        .pipe(plugins.sass({
            precision       : 10,
            outputStyle     : 'compressed',
            errLogToConsole : true
        }).on('error', plugins.sass.logError))
        .pipe(rev())
        .pipe(gulp.dest(distPaths.css))
        .pipe( rev.manifest() )
        .pipe( gulp.dest('rev/css') );
});

gulp.task('release-images', function() {
    return gulp.src(sourcePaths.images)
        .pipe(rev())
        .pipe(gulp.dest(distPaths.images))
        .pipe( rev.manifest() )
        .pipe( gulp.dest('rev/img') );
});

gulp.task('rev-collector', function () {
    gulp.src(['rev/**/*.json', 'dist/styles/**/*.css'])
        .pipe( revCollector() )
        .pipe( gulp.dest(distPaths.css) );
    gulp.src(['rev/**/*.json', '../backend/views/**/*.ejs'])
        .pipe( revCollector() )
        .pipe( gulp.dest('../backend/views') );
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
gulp.task('build', ['clean', 'sass', 'javascript', 'images']);
gulp.task('release', function(){
    runSequence('clean', ['release-images', 'release-sass', 'release-js'], 'rev-collector')
});

gulp.task('default', ['sync']);
