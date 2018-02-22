var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var fileinclude = require('gulp-file-include');
var less = require('gulp-less');
var clean = require('gulp-clean');
var gutil = require('gulp-util');

const sourceDir = './source/'
const targetDir = './target/'

/* include 文件 */
gulp.task('fileinclude', ['clean:html'], function () {
  gulp.src(sourceDir + 'html/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './source/html/'
    }))
    .pipe(gulp.dest(targetDir))
    .pipe(reload({ stream: true }));
});

// less
gulp.task('less', ['clean:css'], function () {
  gulp.src(sourceDir + 'less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest(targetDir + 'css'))
    .pipe(reload({ stream: true }));
});
// js move
gulp.task('js', ['clean:js'], function () {
  gulp.src(sourceDir + 'js/**/*.js')
    .pipe(gulp.dest(targetDir + 'js'))
    .pipe(reload({ stream: true }));
});

// clean less
gulp.task('clean:js', function () {
  gutil.log("清理target js文件.....");
  return gulp.src([targetDir + '**/*.js'], { read: true })
    .pipe(clean({ force: false }));
});
gulp.task('clean:html', function () {
  gutil.log("清理target html文件.....");
  return gulp.src([targetDir + '*.js'], { read: true })
    .pipe(clean({ force: false }));
});
gulp.task('clean:css', function () {
  gutil.log("清理target css文件.....");
  return gulp.src([targetDir + '**/*.css'], { read: true })
    .pipe(clean({ force: false }));
});

// 开发模式
gulp.task('run:dev', ['less', 'js', 'fileinclude'], function () {
  browserSync.init({
    server: {
      baseDir: "./",
      directory: true
    },
    port: 7878,
  });
  gulp.watch(sourceDir + '**/*.js', ['js'])
  gulp.watch(sourceDir + '**/*.less', ['less'])
  gulp.watch(sourceDir + '**/*.html', ['fileinclude'])
});

// 生产模式
// @TODO 除以上功能以外，还需要添加以下功能
// css压缩
// js压缩，生成sourcemap
//
gulp.task('run:pro', ['clean', 'fileinclude', 'less', 'js']);
