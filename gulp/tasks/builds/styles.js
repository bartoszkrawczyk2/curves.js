var autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    changed = require('gulp-changed'),
    cleanCSS = require('gulp-clean-css'),
    config = {},
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    urlAdjuster = require('gulp-css-url-adjuster');

config.server = require('./../../config/server');
config.path = require('./../../config/path');

gulp.task('styles', function () {
    var result = gulp.src(config.path.styles.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(changed(config.path.styles.dist))
        .pipe(sass({
            errLogToConsole: true,
            precision: 1
        }))
        .pipe(autoprefixer({
            browsers: ['last 45 versions'],
            cascade: false
        }))
        .pipe(urlAdjuster({
            append: function (url) {
                var version = new Date().getTime();
                return url + '?version=' + version;
            }
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.path.styles.dist));
    if (config.server.enabled === true) {
        result.pipe(browserSync.reload({stream: true}));
    }
});
