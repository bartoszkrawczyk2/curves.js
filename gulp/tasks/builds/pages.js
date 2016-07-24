var browserSync = require('browser-sync'),
    changed = require('gulp-changed'),
    config = {},
    gulp = require('gulp');

config.server = require('./../../config/server');
config.path = require('./../../config/path');

gulp.task('pages', function () {
    var result = gulp.src(config.path.views.src)
        .pipe(changed(config.path.views.dist))
        .pipe(gulp.dest(config.path.views.dist));
    if (config.server.enabled === true) {
        result.pipe(browserSync.reload({stream: true}));
    }
});
