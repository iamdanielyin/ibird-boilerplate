/**
 * 模块依赖
 */

const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const uglify = require('gulp-uglify');
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
        .pipe(uglify({
            warnings: false,
            compress: {
                dead_code: true,
                drop_debugger: true
            },
            mangle: {
                toplevel: true
            },
            output: {
                beautify: false
            },
            toplevel: false,
            ie8: false
        }))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

// 复制
gulp.task('copy', function () {
    return gulp.src(['package.json'], { base: '.' })
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean', 'build', 'copy']);