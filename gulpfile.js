var gulp = require('gulp');
var browserSync = require('browser-sync').create();
// var sass = require('gulp-sass');
var reload = browserSync.reload;
// var pug = require('gulp-pug');
// postcss以及相关插件
var postcss = require('gulp-postcss');
var nested = require('postcss-nested');
var autoprefixer = require('autoprefixer');
var vars = require('postcss-simple-vars');
var comment = require('postcss-discard-comments');

// 静态服务器 + 监听 scss/html文件
gulp.task('serve', ['sass', 'css'], function () {

  browserSync.init({
    server: './'
  });

  // gulp.watch('scss/*.scss', ['sass']);
  gulp.watch('src/*.css', ['css']);
  gulp.watch('js/*.js').on('change', reload);
  gulp.watch('*.html').on('change', reload);
});

// scss编译后的css将注入到浏览器里实现更新
// gulp.task('sass', function () {
//   return gulp.src('./scss/*.scss')
//     .pipe(sass({
//       outputStyle: 'expanded'
//     }).on('error', sass.logError))
//     .pipe(gulp.dest('./css'))
//     .pipe(reload({
//       stream: true
//     }));
// });

// 编译pug
// gulp.task('views', function buildHTML() {
//   return gulp.src('views/*.pug')
//     .pipe(pug({
//       // Your options in here. 
//     })).pipe(gulp.dest('./html'))
// });


// 编译postcss
gulp.task('css', function () {
  var plugins = [
    autoprefixer({ browsers: ['last 1 version'] }),
    nested,
    vars,
    comment
  ];
  return gulp.src('./src/*.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dest'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('default', ['serve']);