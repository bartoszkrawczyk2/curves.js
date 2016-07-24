var config = {},
    gulp = require('gulp'),
    jsdoc = require('gulp-jsdoc3');

config.path = require('./../../config/path');
config.jsdoc = require('./../../config/build').jsdoc;

gulp.task('doc', function (cb) {
    if (config.jsdoc)
    gulp.src(['README.md', config.path.scripts.src], {read: false})
        .pipe(jsdoc(cb));
});
