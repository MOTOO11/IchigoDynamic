import gulp from 'gulp'
import config from '../gulp-config';
import gulpLoadPlugins from 'gulp-load-plugins';
const $ = gulpLoadPlugins();
var del = require('del');
import bower from 'bower';
var bower_files = require('bower-files')();
// var css = config.css;
//var js = config.scripts;

gulp.task('bower:copy', () => {
    vendor_js();
    //vendor_css();
});

var vendor_js = () => {
    $.util.log('Vendor javascript loading.');
    gulp.src(bower_files.ext("js").files)
        .pipe($.plumber())
        .pipe($.concat('vendor.js'))
        //.pipe(gulp.dest(config.dist.dir))
        .pipe(gulp.dest('dist/javascripts'))
        .pipe($.rename('vendor.min.js'))
        .pipe($.uglify({
            preserveComments: 'all'
        }))
        // .pipe(gulp.dest(js.dist.vendor.js));
        .pipe(gulp.dest('dist/javascripts'));
};

// var vendor_css = function() {
//     $.util.log('Vendor css loading.');
//     gulp.src(bower_files.ext("css").files).pipe($.plumber()).pipe($.concat('vendor.css')).pipe(gulp.dest(config.dest.vendor.css)).pipe($.rename('vendor.min.css')).pipe($.minifyCss({
//         keepBreaks: false
//     })).pipe(gulp.dest(config.dest.vendor.css));
// };

// var vendor_other = function() {
//     var filter;
//     $.util.log('Vendor other component loading.');
//     filter = $.filter(['*', '!*.css', '!*.js', '!*.less', '!glyphicons-halflings-regular.*']);
//     gulp.src(bower_files()).pipe(filter).pipe(gulp.dest(config.dest.vendor["static"]));
// };

// var bootstrap_fonts = function() {
//     var filter;
//     $.util.log('bootstrap fonts loading.');
//     filter = $.filter(['glyphicons-halflings-regular.*']);
//     gulp.src(bower_files()).pipe(filter).pipe(gulp.dest(config.dest.vendor.fonts));
// };

// gulp.task('bower:init', function() {
//     return bower.commands.install().on('end', function(r) {
//         return load_components();
//     });
// });

// gulp.task('bower:update', function() {
//     return bower.commands.update().on('end', function(r) {
//         return load_components();
//     });
// });