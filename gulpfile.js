/**
 * 模块依赖
 */

const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require('gulp-uglify');
const sequence = require('gulp-sequence');
const del = require('del');
const dest = 'dist';

// 清空
gulp.task('clean', function () {
    return del(['dist']);
});

// 编译
gulp.task('build', function () {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['env'],
            plugins: ['transform-runtime']
        }))
        .pipe(uglify({
            sourceMap: {
                url: 'inline'
            }
        }))
        .pipe(gulp.dest(dest));
});

// 复制
gulp.task('copy', function () {
    return gulp.src(['package.json'], { base: '.' })
        .pipe(gulp.dest('dist'));
});

gulp.task('default', sequence('clean', ['build', 'copy']));