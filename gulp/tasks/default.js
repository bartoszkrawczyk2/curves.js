var config = {},
    gulp = require('gulp'),
    runSequence = require('run-sequence');

config.server = require('./../config/server');

gulp.task('default', function (callback) {
    var tasks = [];
    tasks.push('build');
    tasks.push('doc');
    tasks.push('watch');
    if (config.server.enabled === true) {
        tasks.push('server');
    }
    runSequence(
        tasks
    );
});
