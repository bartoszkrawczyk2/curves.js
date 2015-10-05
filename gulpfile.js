var gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    cssmin     = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    connect    = require('gulp-connect'),
    prefixer   = require('gulp-autoprefixer'),
    jsmin      = require('gulp-uglify'),
    gutil      = require('gulp-util'),
    react      = require('gulp-react'),
    exec       = require('child_process').exec;

// ---------------------------------------------------

var path = {};

path.styles = {
    src  : './src/scss/**/*.scss',
    dest : './build/assets/css'
};

path.js = {
    src  : './src/js/**/*.**',
    dest : './build/assets/js'
};

path.images = {
    src  : './src/images/**/*.**',
    dest : './build/assets/images'
};

path.html = {
    src   : './src/html/**/*.html',
    dest  : './build'
};

// ---------------------------------------------------

gulp.task('styles', function() {
    gulp.src(path.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass({errLogToConsole: true}))
        .pipe(prefixer({
            browsers: ['last 35 versions']
        }))
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.styles.dest));
});

gulp.task('js', function() {
    gulp.src(path.js.src)
        .pipe(sourcemaps.init())
        .pipe(react())
        .pipe(jsmin({
            preserveComments: 'some'
        }).on('error', gutil.log))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.js.dest));
});

gulp.task('html', function() {
    gulp.src(path.html.src)
        .pipe(gulp.dest(path.html.dest));
});

gulp.task('images', function() {
    gulp.src(path.images.src)
        .pipe(gulp.dest(path.images.dest));
});

gulp.task('bower', function() {
    exec('bower install', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

gulp.task('build', [
    'styles',
    'html',
    'images',
    'js',
    'bower'
]);

gulp.task('watch', function() {
    gulp.watch(path.js.src, function() {
        gulp.start('js');
    });

    gulp.watch(path.styles.src, function() {
        gulp.start('styles');
    });

    gulp.watch(path.html.src, function() {
        gulp.start('html');
    });
});

gulp.task('server', function() {
    connect.server({
        root: './build/',
        port: 8083
    });
});

gulp.task('default', ['build', 'watch', 'server']);