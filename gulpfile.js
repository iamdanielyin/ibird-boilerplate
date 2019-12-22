/**
 * 模块依赖
 */

const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;
const del = require('del');
const dest = 'dist';

// 清空输出目录
gulp.task('clean', function () {
    return del(['dist']);
});

// 编译服务端
gulp.task('build:server', function () {
    return pipeline(
        gulp.src('src/**/*.js'),
        babel({
            presets: ['@babel/env'],
            plugins: ['@babel/transform-runtime']
        }),
        uglify({
            sourceMap: {
                url: 'inline'
            }
        }),
        gulp.dest(dest)
    );
});

// 复制其余文件
gulp.task('copy:others', function () {
    return pipeline(
        gulp.src([
            'package.json',
            'Dockerfile',
            'src/**/*.json'
        ]),
        gulp.dest('dist')
    );
});

gulp.task('default', gulp.series('clean', ['build:server', 'copy:others']));
