var browserSync = require('browser-sync'),
    changed = require('gulp-changed'),
    config = {},
    gulp = require('gulp');

config.server = require('./../../config/server');
config.path = require('./../../config/path');

gulp.task('fonts', function () {
    var result = gulp.src(config.path.fonts.src)
        .pipe(changed(config.path.fonts.dist))
        .pipe(gulp.dest(config.path.fonts.dist));
    if (config.server.enabled === true) {
        result.pipe(browserSync.reload({stream: true}));
    }
});
