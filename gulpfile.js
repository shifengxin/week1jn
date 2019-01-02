var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var fs = require('fs');
var url = require('url');
var path = require('path');
var data = require('./data/list')
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'))
});
gulp.task('js', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('build.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});
gulp.task('watch', function() {
    gulp.watch('src/', gulp.seriers('src'))
});
gulp.task('web', function() {
    return gulp.src('src')
        .pipe(webserver({
            port: 8800,
            open: true,
            livereload: true,
            middlewre: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                console.log(pathname);
                if (pathname === '/favicon.ico') {
                    return res.end();
                } else {
                    if (pathname === 'api/list') {
                        res.json({ code: 1, msg: data })
                    } else {
                        res.end(fs.readFileSync(__dirname, 'src', pathname));
                    }
                }
            }
        }))
})