// 'use strict';

import gulp from 'gulp';
import del from 'del';
import spritesmith from 'gulp.spritesmith';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import nodemon from  'nodemon';
import portscanner from  'portscanner';

var bs  = browserSync.create();

const plugins = gulpLoadPlugins();
// const reload  = bs.reload;


const sourcePaths = {
    "html"                     : "views/**/*",
    "javascript"               : "../app/scripts/**/*.js",
    "custom_components_styles" : "../app/custom_components/**/*.scss",
    "custom_components_js"     : "../app/custom_components/**/*.js",
    "components"               : "../app/components/**/*",
    "images"                   : "../app/images/**/*",
    "imagesSprites"            : "../app/images/sprite/icon/**/*",
    "scss"                     : '../app/styles/**/*.scss'
};

const distPaths = {
    "javascript"        : "../app/static/scripts",
    "custom_components" : "../app/static/custom_components",
    "components"        : "../app/static/components",
    "images"            : "../app/static/images",
    "imagesSprites"     : "../app/images/sprite/auto-sprite.png",
    "imagesSpritesScss" : "../app/styles/helpers/_auto_sprite.scss",
    "css"               : "../app/static/styles"
};


// Lint JavaScript
gulp.task('jslint', () =>
    gulp.src(sourcePaths.javascript)
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format())
        .pipe(plugins.if(!bs.active, plugins.eslint.failOnError()))
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
    gulp.watch(sourcePaths.html).on('change',bs.reload);
    gulp.watch(sourcePaths.javascript, ['javascript',bs.reload]);
    gulp.watch(sourcePaths.images, ['images',bs.reload]);
    gulp.watch(sourcePaths.scss, ['sass',bs.reload]);
    gulp.watch(sourcePaths.custom_components_js, ['custom_components',bs.reload]);
    gulp.watch(sourcePaths.custom_components_styles, ['custom_components',bs.reload]);
});


gulp.task('watchBrowserSync', () => {
    // browserSync.init({
    //     proxy: "http://localhost:3000"
    // });
    gulp.watch(sourcePaths.html).on('change', bs.reload);
    gulp.watch(sourcePaths.javascript, ['javascript', bs.reload]);
    gulp.watch(sourcePaths.images, ['images']);
    gulp.watch(sourcePaths.scss, ['sass', bs.reload]);
    gulp.watch(sourcePaths.custom_components_js, ['custom_components', bs.reload]);
    gulp.watch(sourcePaths.custom_components_styles, ['custom_components', bs.reload]);
});



gulp.task('nodemon', function (cb) {
    let called = false;
    return nodemon({
        // nodemon our expressjs server
        script: 'app.js',
        ignore: ["views/*","test/*",'gulpfile*'],
        // watch core server file(s) that require server restart on change
        // watch: ['app.js',]
    }).on('start', function () {
        // ensure start only got called once
        if (!called) {
            called = true;
            cb();
            // bs.reload();
            onStart();
        }
    }).on('restart',onReStart);
});









function onReStart() {


    var times =0 ;
    var loop =  setInterval(function(){
        bs.notify('正在重新启动!');
        portscanner.checkPortStatus(3000, '127.0.0.1', function(error, status) {
            if(status=='open'){
                bs.notify('重启成功!,开始刷新页面...');
                console.log('连接成功!开始刷新浏览器.');
                bs.reload();
                clearInterval(loop);
            }else{
                console.log('正在等待服务器完全启动:'+times+"s");
            }
            times++ ;
        })
    },1000);
}


function onStart() {
    var times =0 ;
    var loop =  setInterval(function(){
        portscanner.checkPortStatus(3000, '127.0.0.1', function(error, status) {
            if(status=='open'){
                console.log('连接成功!开始刷新浏览器.');
                bs.init({
                    // informs browser-sync to proxy our expressjs app which would run at the following location
                    proxy: 'http://localhost:3000',
                    // informs browser-sync to use the following port for the proxied app
                    // notice that the default port is 3000, which would clash with our expressjs
                    port: 4000
                    // open the proxied app in chrome
                    // browser: ['google-chrome']
                });
                clearInterval(loop);
            }else{
                console.log('正在等待服务器完全启动:'+times+"s");
            }
            times++ ;
        })
    },1000);
}





gulp.task('clean', () => {
    del.sync(['static']);
});

gulp.task('default', ['clean', 'images', 'sass', 'javascript', 'watch','nodemon']);
gulp.task('sync', ['clean', 'images', 'sass', 'javascript', 'watchBrowserSync']);

// gulp.task('default', () =>
//   gulp.src('app/*.html')
//         .pipe(plugins.useref())
//         .pipe(gulp.dest('dist'))
// )
