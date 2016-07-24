var browserSync = require('browser-sync'),
    changed = require('gulp-changed'),
    config = {},
    gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

config.server = require('./../../config/server');
config.path = require('./../../config/path');

gulp.task('images', function () {
    var result = gulp.src(config.path.images.src)
        .pipe(changed(config.path.images.dist))
        .pipe(imagemin({
            progressive: true,
            svgPlugins: [{
                removeViewBox: true
            }],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(config.path.images.dist));
    if (config.server.enabled === true) {
        result.pipe(browserSync.reload({stream: true}));
    }
});
