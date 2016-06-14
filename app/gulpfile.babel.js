'use strict';

import gulp from 'gulp';
import del from 'del';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import rjs from 'requirejs';

const plugins = gulpLoadPlugins();
const reload  = browserSync.reload;


const sourcePaths = {
    "javascript" : "scripts/**/*.js",
    "custom_components_styles" : "custom_components/**/*.scss",
    "custom_components_js" : "custom_components/**/*.js",
    "libs"       : "libs/*",
    "components" : "components/**/*",
    "images"     : "images/**/*",
    "scss"       : 'styles/*.scss'
};

const distPaths = {
    "javascript" : "static/scripts",
    "custom_components" : "static/custom_components",
    "libs"       : "static/libs",
    "components" : "static/components",
    "images"     : "static/images",
    "css"        : "static/styles"
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
gulp.task('sass', () =>
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




gulp.task('libs', () =>
    gulp.src(sourcePaths.libs)
        .pipe(gulp.dest(distPaths.libs))
);

gulp.task('components', () =>
    gulp.src(sourcePaths.components)
        .pipe(gulp.dest(distPaths.libs))
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
        .pipe(plugins.size({title : 'ustom_components'}))
        .pipe(gulp.dest(distPaths.custom_components));

    gulp.src(sourcePaths.custom_components_js).pipe(gulp.dest(distPaths.custom_components))
});


gulp.task('javascript', ['libs', 'components', 'custom_components'], () =>
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
    gulp.watch(sourcePaths.scripts, ['javascript', reload]);
    gulp.watch(sourcePaths.images, ['images', reload]);
    gulp.watch(sourcePaths.scss, ['sass', reload]);
    gulp.watch(sourcePaths.custom_components_js, ['custom_components', reload]);
    gulp.watch(sourcePaths.custom_components_styles, ['custom_components', reload]);
});

gulp.task('clean', () => {
    del.sync(['static/**/*']);
});

gulp.task('default', ['clean', 'images', 'sass', 'javascript', 'watch']);

// gulp.task('default', () =>
//   gulp.src('app/*.html')
//         .pipe(plugins.useref())
//         .pipe(gulp.dest('dist'))
// )
