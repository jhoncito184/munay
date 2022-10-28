'use strict';

var gulp       = require('gulp'),
    changed    = require('gulp-changed' ),
    concat     = require('gulp-concat' ),
    connect    = require('gulp-connect'),
    deepExtend = require('deep-extend-stream'),
    gutil      = require('gulp-util'),
    pug        = require('gulp-pug'),
    jshint     = require('gulp-jshint'),
    plumber    = require('gulp-plumber'),
    rename     = require('gulp-rename'),
    sass       = require('gulp-sass'),
    size       = require('gulp-size'),
    //stylus   = require('gulp-stylus'),
    imagemin   = require('gulp-imagemin'),
    uglify     = require('gulp-uglify' ),
    yamlData   = require('vinyl-yaml-data'),
    webpack    = require('webpack-stream');

var env = process.env.NODE_ENV || 'development',

    /* Solo activar Frontend */
    outputDir = 'dist',
    outputDirTemplate = outputDir;

    /* Solo activar con Django */
    //outputDir = '../project/static/',
    //outputDirTemplate = '../project/templates';

function onError (error) {
    gutil.log(error);
    this.emit('end');
}


/* Obtener data desde YAML */
var locals;
gulp.task('data', function () {
    locals = {};

    return gulp.src('source/data/data.yaml')
        .pipe( yamlData() )
        .pipe( deepExtend(locals) )
        .pipe( connect.reload() );
});


/* Transpilar Pug a HTML */
gulp.task('templates', function () {
    return gulp.src('source/layouts/*.pug')
        .pipe( plumber({ errorHandler: onError }) )
        .pipe( changed(outputDirTemplate) )
        .pipe( pug({
            data: locals,
            pretty: env === 'development'
        }) )
        .pipe( gulp.dest(outputDirTemplate) )
        .pipe( connect.reload() );
});


/* Linter a Javascript */
gulp.task('js', function () {
    return gulp.src('source/javascript/application.js')
        .pipe( jshint() )
        .pipe( jshint.reporter( require('jshint-stylish') ) )
        .pipe( plumber({ errorHandler: onError }) )
        .pipe( webpack({
            watch: true,
            output: {
                filename: 'bundle.js'
            }
        }) )
        .pipe( uglify() )
        .pipe( size() )
        .pipe( gulp.dest(outputDir + '/js') )
        .pipe( connect.reload() );
});


gulp.task('vendor', function() {
    return gulp.src( './source/javascript/plugins/*.js' )
        .pipe( concat('vendor_all.js') )
        .pipe( uglify() )
        .pipe( size() )
        .pipe( gulp.dest( outputDir + '/js/vendor') )
        .pipe( connect.reload() );
});


/* Transpilar SaSS a CSS */
gulp.task('styles', function () {
    var config = {
        outputStyle : 'compressed'
    };

    return gulp.src('source/sass/style.scss')
        .pipe( plumber({ errorHandler: onError }) )
        .pipe( changed(outputDir + '/css') )
        .pipe( sass() )
        .pipe( gulp.dest(outputDir + '/css') )
        .pipe( sass(config) )
        .pipe( rename('style.min.css') )
        .pipe( size() )
        .pipe( gulp.dest(outputDir + '/css') )
        .pipe( connect.reload() );
});


/* imagenes */
gulp.task('images', function() {
    return gulp.src('source/images/**/*.{png,jpg,jpeg,gif,svg,ico,mp4}')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(gulp.dest(outputDir + '/images'))
    .pipe(connect.reload());
});

gulp.task('fonts', function() {
return gulp.src('source/sass/globals/fonts/*.{otf,ttf,woff,woff2,svg}')
    .pipe(plumber({ errorHandler: onError }))
    .pipe(gulp.dest(outputDir + '/css/fonts'))
    .pipe(connect.reload());
});

/* Transpilar Stylus a CSS */
/*gulp.task('styles', function () {
    var config = {
        compress : true
    };

    return gulp.src('source/stylus/style.styl')
        .pipe( plumber({ errorHandler: onError }) )
        .pipe( changed(outputDir + '/css') )
        .pipe( stylus() )
        .pipe( gulp.dest(outputDir + '/css') )
        .pipe( stylus(config) )
        .pipe(rename('style.min.css'))
        .pipe( gulp.dest(outputDir + '/css') )
        .pipe( connect.reload() );
}); */


/* Optimizar imagenes */
gulp.task('optimages', function () {
    return gulp.src('source/images/*.{png,jpg,jpeg,gif,svg}')
        .pipe( plumber({ errorHandler: onError }) )
        .pipe( imagemin({
             progressive: true,
             interlaced:  true,
             optimizationLevel: 3,
             svgoPlugins: [{
                removeViewBox: false
             }],
             use: [ pngquant({
                quality: '65-80',
                speed: 4
             }) ]
        }) )
        .pipe( size() )
        .pipe( gulp.dest(outputDir + '/images') );
});


gulp.task('watch', function () {
    gulp.watch( 'source/data/**/*.yaml', ['data', 'templates'] );
    gulp.watch( 'source/layouts/**/*.pug', ['templates'] );
    gulp.watch( 'source/javascript/**/*.js', ['js'] );
    gulp.watch( 'source/javascript/plugins/*.js', ['vendor'] );
    gulp.watch( 'source/sass/**/*.scss', ['styles'] );
    gulp.watch('source/images/*.{png,jpg,jpeg,gif,svg}', ['images']);
    gulp.watch('source/sass/fonts/*.{otf,ttf,woff,woff2,svg}', ['styles']);
    //gulp.watch( 'source/stylus/**/*.styl', ['styles'] );
});


gulp.task('connect-server', function () {
    connect.server({
        root : outputDir,
        port : 7000,
        livereload : true
    });
});

gulp.task("plugins", function() {
    gulp
      .src(["./source/javascript/plugins/jquery.1.10.1.min.js"])
      .pipe(concat("vendor_all.js"))
      .pipe(
        uglify({
          compress: {
            drop_console: true
          }
        })
      )
      .pipe(gulp.dest("dist/js/vendor"))
      .pipe(browserSync.reload({ stream: true }));
});


var taskBuild = [
    'data',
    'templates',
    'js',
    'vendor',
    'styles',
    'fonts',
    'images'
];

var taskDefault = [
    'data',
    'templates',
    'js',
    'vendor',
    'styles',
    'fonts',
    'images',
    'watch',
    'connect-server'
];


gulp.task('build', taskBuild);

gulp.task('default', taskDefault );