'use strict';

import gulp from 'gulp';
import del from 'del';
import spritesmith from 'gulp.spritesmith';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import nodemon from  'nodemon';

var bs  = browserSync.create();
var reload  = bs.reload;
const plugins = gulpLoadPlugins();



const sourcePaths = {
    "html"               : "../backend/views/**/*",
    "javascript"               : "scripts/**/*.js",
    "custom_components_styles" : "custom_components/**/*.scss",
    "custom_components_js"     : "custom_components/**/*.js",
    "components"               : "components/**/*",
    "images"                   : "images/**/*",
    "imagesSprites"            : "images/sprite/icon/**/*",
    "scss"                     : 'styles/**/*.scss'
};

const distPaths = {
    "javascript"        : "dist/scripts",
    "custom_components" : "dist/custom_components",
    "components"        : "dist/components",
    "images"            : "dist/images",
    "imagesSprites"     : "images/sprite/auto-sprite.png",
    "imagesSpritesScss" : "styles/helpers/_auto_sprite.scss",
    "css"               : "dist/styles",
    "browserSyncWatchFiles" : [sourcePaths.html, "dist/scripts/**/*.js", "dist/styles/**/*.css"]
};



// Lint JavaScript
gulp.task('jslint', () =>
    gulp.src(sourcePaths.javascript)
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format())
        .pipe(plugins.if(!browserSync.active, plugins.eslint.failOnError()))
);


// Optimize images
gulp.task('images', () =>
    gulp.src(sourcePaths.images)
         //.pipe(plugins.imagemin({
         //  progressive: true,
         //  interlaced: true
         //}))
        .pipe(gulp.dest(distPaths.images))
        .pipe(plugins.size({title : 'Images'}))
);


// Compile and automatically prefix stylesheets
gulp.task('sass', ['sprite'], () =>
    gulp.src(sourcePaths.scss)
        .pipe(plugins.newer({
            dest: distPaths.css,
            ext: '.css'
        }))
        .pipe(plugins.sass({
            precision : 10,
            outputStyle: 'compact',
            errLogToConsole: true
        }).on('error', plugins.sass.logError))
        //.pipe(plugins.autoprefixer({
        //    browsers: ['> 1%', 'Last 2 versions', 'IE 8'],
        //    cascade: false
        //}))
        .pipe(plugins.size({title : 'CSS Styles'}))
        .pipe(gulp.dest(distPaths.css))
);


gulp.task('sprite', function () {
    var spriteData = gulp.src(sourcePaths.imagesSprites).pipe(spritesmith({
        imgName:  distPaths.imagesSprites ,
        cssName:  distPaths.imagesSpritesScss ,
        cssFormat:  'scss'
    }));
    return spriteData.pipe(gulp.dest(''));
});


gulp.task('components', () =>
    gulp.src(sourcePaths.components)
        .pipe(gulp.dest(distPaths.components))
);

gulp.task('custom_components', () => {
    gulp.src(sourcePaths.custom_components_styles)
        .pipe(plugins.newer({
            dest: distPaths.custom_components,
            ext: '.css'
        }))
        .pipe(plugins.sass({
            precision : 10
        }).on('error', plugins.sass.logError))
        .pipe(plugins.size({title : 'Custom_components'}))
        .pipe(gulp.dest(distPaths.custom_components));

    gulp.src(sourcePaths.custom_components_js).pipe(gulp.dest(distPaths.custom_components))
});



gulp.task('javascript', ['jslint', 'components', 'custom_components'], () =>
    gulp.src(sourcePaths.javascript).pipe(gulp.dest(distPaths.javascript))
);


gulp.task('watch', () => {
    gulp.watch(sourcePaths.javascript, ['javascript']);
    gulp.watch(sourcePaths.images, ['images']);
    gulp.watch(sourcePaths.scss, ['sass']);
    gulp.watch(sourcePaths.custom_components_js, ['custom_components']);
    gulp.watch(sourcePaths.custom_components_styles, ['custom_components']);
});





gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({
        // nodemon our expressjs server
        script: '../backend/app.js',
        env: { 'MODE': 'local' , 'MOCK':true},
        ignore: ["app/**/*", "../backend/views/**/*","../backend/test/**/*"],
        // watch core server file(s) that require server restart on change
         watch: ['../backend/**/*.js']
    }).on('start', () => {
        // ensure start only got called once
        if (!called) {
            called = true;
            cb();
        }
    }).on('restart', () => {
        setTimeout(function () {
            reload({ stream: false });
        }, 3000);
        console.log('---------- nodemon 重启服务器成功 ---------- ');
    }).on('exit', () => {
        console.log('---------- Exiting the process ---------- ');
        //process.exit();
    });
});



gulp.task('browser-sync', function() {
    bs.init({
        // informs browser-sync to proxy our expressjs app which would run at the following location
        proxy: 'http://localhost:3000',
        // informs browser-sync to use the following port for the proxied app
        // notice that the default port is 3000, which would clash with our expressjs
        port: 4000,
        // browser: ['google-chrome'], // open the proxied app in chrome
        notify: true,
        open: false,
        files: distPaths.browserSyncWatchFiles
    });
});





gulp.task('clean', () => {
    del.sync(['dist/**/*']);
});


gulp.task('default', ['clean', 'images', 'sass', 'javascript', 'watch']);
gulp.task('server', ['clean', 'images', 'sass', 'javascript', 'watch', 'nodemon']);
gulp.task('sync', ['clean', 'images', 'sass', 'javascript', 'watch', 'nodemon', 'browser-sync']);
gulp.task('build', ['clean', 'images', 'sass', 'javascript']);



t st
// gulp.task('default', () =>
//   gulp.src('app/*.html')
//         .pipe(plugins.useref())
//         .pipe(gulp.dest('dist'))
// )
