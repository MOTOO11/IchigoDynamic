'use strict'
import gulp from 'gulp'
import { DIR as config } from '../gulp-config';
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();


gulp.task('html:copy', () => {
    gulp.src(config.SRC + '/html/**/*.*')
        .pipe(gulp.dest(config.DIST));
})
