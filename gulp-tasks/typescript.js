'use strict'
import gulp from 'gulp'
import { scripts as config } from '../gulp-config';
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();

// define tasks here
gulp.task('typescript:compile', () => {
    gulp.src(config.src.typescript)
        .pipe($.typescript({
            target: 'ES5',
            removeComments: true,
            out: 'app.js'
        }))
        .js
        .pipe(gulp.dest(config.dist.dir));
});