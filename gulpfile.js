var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-server-livereload');
let cleanCSS = require('gulp-clean-css');
//style paths
var sassFiles = 'scss/style.scss',
    cssDest = './';

gulp.task('styles', function(){
    gulp.src(sassFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest(cssDest));
});

gulp.task('watch',function() {
    gulp.watch('scss/**',['styles']);
});

gulp.task('webserver', ['styles', 'watch'],function() {
  gulp.src('')
    .pipe(server({
      livereload: true,
      defaultFile: 'index.html',
      open: false
    }));
});