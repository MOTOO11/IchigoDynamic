'use strict'
import gulp from 'gulp'
import {
    DIR as config
} from './gulp-config';
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();
import requireDir from 'require-dir'
requireDir('./gulp-tasks');

// define tasks here
gulp.task('default', ['pre', 'connect', 'watch'], () => {
    // $.util.log(config.dest.javascript);
    // run tasks here
    // set up watch handlers here
});


gulp.task('connect', () => {
    $.connect.server({
        root: config.DIST,
        livereload: true
    });
});

gulp.task("ts:compile", ["typescript:compile"], () => {
    gulp.src(config.SRC+"/**/*.*").pipe(
        $.connect.reload());
});

gulp.task('watch', () => {
    gulp.watch([config.SRC + '/**/*.*'], ['pre']);
});

gulp.task('pre', ['ts:compile', 'assets:copy', 'html:copy'], () => {

})