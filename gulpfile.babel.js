'use strict';

import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
import gulpLoadPlugins from 'gulp-load-plugins';

const plugins = gulpLoadPlugins();
const reload = browserSync.reload;

const paths = {
  "images": "app/images/**/*",
  "styles": [
                'app/styles/**/*.scss',
                'app/styles/**/*.css'
              ],
  "scripts":"app/scripts/**/*.js"
}

// Lint JavaScript
gulp.task('lint', () =>
  gulp.src('app/scripts/**/*.js')
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.if(!browserSync.active, plugins.eslint.failOnError()))
);

// Optimize images
gulp.task('images', ['clean'], () =>
  gulp.src(paths.images)
    .pipe(plugins.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'))
    .pipe(plugins.size({title: 'images'}))
);


// Compile and automatically prefix stylesheets
gulp.task('styles', ['clean'], () => 
  gulp.src(paths.styles)
    .pipe(plugins.newer('.tmp/styles'))
    .pipe(plugins.sass({
      precision: 10
    }).on('error', plugins.sass.logError))
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(plugins.size({title: 'styles'}))
    .pipe(gulp.dest('dist/styles'))
);

gulp.task('scripts', ['clean'], () =>
    gulp.src(paths.scripts)
      .pipe(plugins.babel())
      .pipe(plugins.concat({path:'app/script/**/*'}))
      .pipe(plugins.uglify({preserveComments: 'some'}))
      // Output files
      .pipe(plugins.size({title: 'scripts'}))
      .pipe(gulp.dest('dist/scripts'))
);

gulp.task('watch', () => {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('clean', () => {
  del(['dist']);
});

gulp.task('default', ['watch', 'images', 'styles', 'scripts']);

// gulp.task('default', () => 
//   gulp.src('app/*.html')
//         .pipe(plugins.useref())
//         .pipe(gulp.dest('dist'))
// )



