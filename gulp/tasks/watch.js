var config = {},
    gulp = require('gulp');

config.server = require('./../config/server');
config.path = require('./../config/path');

gulp.task('watch', function () {
    for (var key in config.path) {
        if (config.path[key].hasOwnProperty('src') && config.path[key].hasOwnProperty('task')) {
            gulp.watch(config.path[key].src, [config.path[key].task]);
        }
    }
});
