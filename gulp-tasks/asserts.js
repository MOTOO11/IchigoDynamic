'use strict'
import gulp from 'gulp'
import { DIR as config } from '../gulp-config';
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

// define tasks here
gulp.task('asserts:copy', () => {
    gulp.src(config.SRC + '/asserts/**/*.*')
        .pipe(gulp.dest(config.DIST + '/asserts/'));
})