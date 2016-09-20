'use strict'
import gulp from 'gulp'
import { DIR as config } from '../gulp-config';
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

// define tasks here
gulp.task('assets:copy', () => {
    gulp.src(config.SRC + '/assets/**/*.*')
        .pipe(gulp.dest(config.DIST + '/assets/'));
})