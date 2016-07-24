var browserSync = require('browser-sync').create(),
    changed = require('gulp-changed'),
    config = {},
    connectPHP = require('gulp-connect-php'),
    gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    url = require('url');

config.server = require('./../config/server');
config.path = require('./../config/path');

gulp.task('server', function () {
    if (config.server.enabled === true) {
        if (config.server.php === true) {
            connectPHP.server({
                base: config.path.server.root,
                hostname: 'localhost',
                port: 8747
            }, function () {
                browserSync.init(config.path.server.watch, {
                    proxy: 'localhost:8747',
                    port: 8080,
                    notify: true
                });
            });
        } else {
            var folder = path.resolve(config.path.server.root);
            browserSync.init(config.path.server.watch, {
                server: {
                    baseDir: config.path.server.root,
                    middleware: function(req, res, next) {
                        if (config.server.browserSyncSPA) {
                            var fileName = url.parse(req.url);
                            fileName = fileName.href.split(fileName.search).join("");
                            var fileExists = fs.existsSync(folder + fileName);
                            if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
                                req.url = "/";
                            }
                        }
                        return next();
                    }
                },
                port: 8080,
                notify: true
            });
        }
    }
});
