'use strict'
import gulp from 'gulp';
import config from '../gulp-config.js';
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();
import postprocessors from './postcss-config';

gulp.task("compile:postcss", function() {
    gulp.src(config.src.postcss)
        .pipe($.plumber())
        .pipe($.cssnext({
            compress: false,
            "import": true,
            plugins: []
        }))
        .pipe($.postcss(postprocessors))
        .pipe(gulp.dest(config.dist.css));
});