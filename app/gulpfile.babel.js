'use strict';

import gulp from 'gulp';
import del from 'del';
import spritesmith from 'gulp.spritesmith';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import rjs from 'requirejs';

const plugins = gulpLoadPlugins();
const reload  = browserSync.reload;


const sourcePaths = {
    "html"               : "../backend/views/**/*",
    "javascript"               : "scripts/**/*.js",
    "custom_components_styles" : "custom_components/**/*.scss",
    "custom_components_js"     : "custom_components/**/*.js",
    "components"               : "components/**/*",
    "images"                   : "images/**/*",
    "imagesSprites"            : "images/sprite/icon/**/*",
    "scss"                     : 'styles/*.scss'
};

const distPaths = {
    "javascript"        : "static/scripts",
    "custom_components" : "static/custom_components",
    "components"        : "static/components",
    "images"            : "static/images",
    "imagesSprites"     : "images/sprite",
    "imagesSpritesScss" : "styles/sprite",
    "css"               : "static/styles"
};


// Lint JavaScript
gulp.task('lint', () =>
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
        imgName:  distPaths.imagesSprites + '/auto-sprites.png',
        cssName:  distPaths.imagesSpritesScss + '/_sprites.scss',
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



gulp.task('javascript', ['components', 'custom_components'], () =>

    // rjs.optimize({
    //   baseUrl: 'app/scripts',
    //   paths: {
    //     libs: '../libs',
    //     components: '../components'
    //   },
    //   shims: {
    //
    //   },
    //   dir: 'assets/scripts',
    //   optimize: "uglify",
    //   modules: [
    //     {
    //       name: 'common',
    //       include: [
    //         'libs/jquery-2.2.3.min.js',
    //         'components/bootstrap/dist/js/bootstrap.min.js'
    //       ]
    //     },
    //     {
    //       name: 'compact/index',
    //       include: [
    //         'compact/compact',
    //         'compact/upload'
    //       ],
    //       exclude: ['common']
    //     }
    //   ]
    // }, function(buildResponse){
    //   cb();
    // }, cb);
    gulp.src(sourcePaths.javascript).pipe(gulp.dest(distPaths.javascript))
);


gulp.task('watch', () => {
    browserSync.init({
        proxy: "http://localhost:3000"
    });
    gulp.watch(sourcePaths.html).on('change', reload);
    gulp.watch(sourcePaths.scripts, ['javascript', reload]);
    gulp.watch(sourcePaths.images, ['images']);
    gulp.watch(sourcePaths.scss, ['sass', reload]);
    gulp.watch(sourcePaths.custom_components_js, ['custom_components', reload]);
    gulp.watch(sourcePaths.custom_components_styles, ['custom_components', reload]);
});

gulp.task('clean', () => {
    del.sync(['static']);
});

gulp.task('default', ['clean', 'images', 'sass', 'javascript', 'watch']);

// gulp.task('default', () =>
//   gulp.src('app/*.html')
//         .pipe(plugins.useref())
//         .pipe(gulp.dest('dist'))
// )
