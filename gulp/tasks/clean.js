var changed = require('gulp-changed'),
    config = {},
    gulp = require('gulp'),
    rimraf = require('rimraf');

config.path = require('./../config/path');

gulp.task('clean', function (callback) {
    rimraf(config.path.server.root + '*', callback);
});
