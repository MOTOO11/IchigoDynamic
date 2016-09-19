'use strict'
import gulp from 'gulp'
import config from './gulp-config';
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();
import requireDir from 'require-dir'
requireDir('./gulp-tasks');

// define tasks here
gulp.task('default',['typescript:compile'], () => {
  // $.util.log(config.dest.javascript);
  // run tasks here
  // set up watch handlers here
});
