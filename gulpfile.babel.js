'use strict';

import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';
import rjs from 'requirejs';

const plugins = gulpLoadPlugins();
const reload = browserSync.reload;

const paths = {
  "images": "app/images/**/*",
  "styles": [
                'app/styles/*.scss',
                'app/styles/*.css'
              ],
  "scripts":"app/scripts/**/*.js",
  "libs": "app/libs/*",
  "components": "app/components/**/*"
}

// Lint JavaScript
gulp.task('lint', () =>
  gulp.src('app/scripts/**/*.js')
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.if(!browserSync.active, plugins.eslint.failOnError()))
);

// Optimize images
gulp.task('images', () =>
  gulp.src(paths.images)
    .pipe(plugins.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('assets/images'))
    .pipe(plugins.size({title: 'images'}))
);


// Compile and automatically prefix stylesheets
gulp.task('styles', () =>
  gulp.src(paths.styles)
    .pipe(plugins.newer('.tmp/styles'))
    .pipe(plugins.sass({
      precision: 10
    }).on('error', plugins.sass.logError))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(plugins.size({title: 'styles'}))
    .pipe(gulp.dest('assets/styles'))
);

gulp.task('scripts', ['libs', 'components'], () =>
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
  gulp.src(paths.scripts).pipe(gulp.dest('assets/scripts'))
);

gulp.task('libs', () =>
  gulp.src(paths.libs)
    .pipe(gulp.dest('assets/libs'))
);
gulp.task('components', () =>
  gulp.src(paths.components)
    .pipe(gulp.dest('assets/components'))
);

gulp.task('watch', () => {
  gulp.watch(paths.scripts, ['scripts', reload]);
  gulp.watch(paths.images, ['images', reload]);
  gulp.watch(['app/styles/**/*.scss', 'app/styles/**/*.css'], ['styles', reload]);
});

gulp.task('clean', () => {
  del.sync(['assets']);
});

gulp.task('default', ['clean', 'images', 'styles', 'scripts', 'watch']);

// gulp.task('default', () =>
//   gulp.src('app/*.html')
//         .pipe(plugins.useref())
//         .pipe(gulp.dest('dist'))
// )
