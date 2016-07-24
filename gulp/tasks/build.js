var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('build', function (callback) {
    runSequence(
        [
            'images',
            'scripts',
            'doc',
            'styles',
            'fonts',
            'files'
        ],
        'pages',
        callback
    );
});
