var browserSync = require('browser-sync'),
    changed = require('gulp-changed'),
    config = {},
    gulp = require('gulp');

config.server = require('./../../config/server');
config.path = require('./../../config/path');

gulp.task('files', function () {
    var result = gulp.src(config.path.files.src)
        .pipe(changed(config.path.files.dist))
        .pipe(gulp.dest(config.path.files.dist));
    if (config.server.enabled === true) {
        result.pipe(browserSync.reload({stream: true}));
    }
});
