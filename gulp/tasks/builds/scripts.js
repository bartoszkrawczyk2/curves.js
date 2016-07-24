var babelify = require('babelify'),
    browserify = require('browserify'),
    browserSync = require('browser-sync'),
    buffer = require('vinyl-buffer')
    changed = require('gulp-changed'),
    config = {},
    gulp = require('gulp'),
    scssify = require('scssify'),
    gutil = require('gulp-util'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify');

config.server = require('./../../config/server');
config.path   = require('./../../config/path');

gulp.task('scripts', function () {
    var result = browserify({
        entries    : config.path.scripts.entry,
        extensions : ['.jsx'],
        debug      : true
    })
    .transform(scssify, {
        postcss: {
            autoprefixer: {
                browsers: ['last 45 versions'],
                cascade: false
            },
        }
    })
    .transform(babelify, {
        stage: 0
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify().on('error', gutil.log))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.path.scripts.dist));

    if (config.server.enabled) {
        result.pipe(browserSync.reload({stream: true}));
    }
});
