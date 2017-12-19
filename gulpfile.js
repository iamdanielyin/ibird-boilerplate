/**
 * 模块依赖
 */

const path = require('path');
const execSync = require('child_process').execSync;
const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require('gulp-uglify');
const sequence = require('gulp-sequence');
const del = require('del');
const dest = 'dist';

// 清空输出目录
gulp.task('clean', function () {
    return del(['dist']);
});

// 编译服务端
gulp.task('build:server', function () {
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

// 复制其余文件
gulp.task('copy:others', function () {
    return gulp.src([
        'package.json',
        'Dockerfile',
        'src/**/*.json'
    ]).pipe(gulp.dest('dist'));
});

gulp.task('default', sequence('clean', ['build:server', 'copy:others']));