/**
 * 模块依赖
 */

const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const del = require('del');

// 清空
gulp.task('clean', function () {
    return del(['dist']);
});

// 编译
gulp.task('build', function () {
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env'],
            plugins: ['transform-runtime']
        }))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean', 'build']);