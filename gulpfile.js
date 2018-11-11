/**
 * Dependencies
 * -----------------------------------------------------------------------------
 */

/**
 * If 'npm install' not working!
 * npm install babel-core babel-preset-env del gulp gulp-autoprefixer gulp-babel gulp-cssmin gulp-if gulp-imagemin gulp-include gulp-plumber gulp-prettify gulp-pug gulp-rename gulp-sass gulp-uglify gulp-util live-server run-sequence --save-dev
 * -----------------------------------------------------------------------------
 */

/* ========================= Gulp ========================= */
const gulp = require('gulp'),
    /* ========================= Sass ========================= */
    sass = require('gulp-sass'),
    cssmin  = require('gulp-cssmin'),
    autoprefixer = require('gulp-autoprefixer'),
    sequence = require('run-sequence'),

 

    /* ========================= Babel ========================= */
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),

    /* ========================= Image ========================= */
    imagemin = require('gulp-imagemin'),

    /* ========================= File Name & Includes ========================= */
    rename = require('gulp-rename'),
    include = require('gulp-include'),
    fileinclude = require('gulp-file-include'),

    /* ========================= Eror Reporting ========================= */

    /* ========================= Compaile & Server ========================= */
    del = require('del'),
    gulpif = require('gulp-if'),
     liveServer = require("live-server"),

    /**
     * Output Css & Js File Name and Set Paths
     * -----------------------------------------------------------------------------
     */

    demo = false, //Minified file include
    ThemeName = 'theme',
    path = {
        base: '../',
        developmentDir: 'resources',
        productionDir: ThemeName.charAt(0).toUpperCase() + ThemeName.slice(1) + ' HTML'
    };


/**
 * Delete the productionDir directory
 * -----------------------------------------------------------------------------
 */

gulp.task('clean', function () {
    return del(path.base + path.productionDir, {
        force: true
    });
});
/**
 * Copy Html files
 * -----------------------------------------------------------------------------
 */

gulp.task('html', function () {
    //Select files
    return gulp.src(path.developmentDir + '/html/**/*')
        //Save files
        .pipe(gulp.dest(path.base + path.productionDir));
});

gulp.task('fonts', function () {
    return gulp.src('node_modules/material-design-icons/iconfont/*')
        .pipe(gulp.dest(path.base + path.productionDir + '/assets/fonts'));
})

gulp.task('fileinclude', function () {
    gulp.src(path.developmentDir + '/html/**')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(path.base + path.productionDir));
});

/**
 * Build styles with SASS
 * -----------------------------------------------------------------------------
 */

gulp.task('sass', function () {
    //Select files
    return gulp.src(path.developmentDir + '/sass/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
         //Compile Sass
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        //Add vendor prefixes
        .pipe(autoprefixer({
            browsers: ['last 4 version'],
            cascade: false
        }))
        //Save unminified file
        .pipe(gulpif(!demo, gulp.dest(path.base + path.productionDir + '/assets/css')))
        //Optimize and minify
        .pipe(cssmin())
        //Append suffix
        .pipe(rename({
            suffix: '.min'
        }))
        //Save minified file
        .pipe(gulp.dest(path.base + path.productionDir + '/assets/css/min'));
});
/**
 * Build styles with SASS
 * -----------------------------------------------------------------------------
 */

gulp.task('include', function () {
    //Select files
    return gulp.src(path.developmentDir + '/sass/include/**/*.scss')
        //Compile Sass
        .pipe(sass({

            outputStyle: 'expanded'

        }))
        //Add vendor prefixes
        .pipe(autoprefixer({
            browsers: ['last 4 version'],
            cascade: false
        }))
        //Save unminified file
        .pipe(gulpif(!demo, gulp.dest(path.base + path.productionDir + '/assets/css')))
        //Optimize and minify
        .pipe(cssmin())
        //Append suffix
        .pipe(rename({
            suffix: '.min'
        }))
        //Save minified file
        .pipe(gulp.dest(path.base + path.productionDir + '/assets/css/min'));
});

/**
 * Build scripts with ES6/Babel
 * -----------------------------------------------------------------------------
 */

gulp.task('js', function () {
    //Select files
    return gulp.src(path.developmentDir + '/babel/*.js')
        //Concatenate includes
        .pipe(include())
        //Transpile
        .pipe(babel({
            presets: [
                ['env', {
                    loose: true,
                    modules: false
                }]
            ] //'use-strict' deleted
        }))
        //Save unminified file
        .pipe(gulpif(!demo, gulp.dest(path.base + path.productionDir + '/assets/js')))
        //Optimize and minify
        .pipe(uglify())
        //Append suffix
        .pipe(rename({
            suffix: '.min'
        }))
        //Save minified file
        .pipe(gulp.dest(path.base + path.productionDir + '/assets/js/min'));
});

/**
 * Copy image files
 * -----------------------------------------------------------------------------
 */

gulp.task('images', function () {
    //Select files
    return gulp.src(demo ? path.developmentDir + '/images/sample/**/*' : path.developmentDir + '/images/prod/**/*')
        //ImageMin
        .pipe(imagemin())
        //Save files
        .pipe(gulp.dest(demo ? path.base + path.productionDir + '/assets/img/sample' : path.base + path.productionDir + '/assets/img'))
});

/**
 * Copy vendors files
 * -----------------------------------------------------------------------------
 */

gulp.task('vendors', function () {
    //Select files
    return gulp.src(path.developmentDir + '/vendors/**/*')
        //Save files
        .pipe(gulp.dest(path.base + path.productionDir + '/assets/vendors'));
});



/**
 * Server
 * -----------------------------------------------------------------------------
 */

gulp.task('server', function () {

    //Create and initialize local server
    liveServer.start({
        port: 3000,
        host: "127.0.0.1",
        root: path.base + path.productionDir,
        file: "index.html"
    });

    //Watch for source changes and execute associated tasks
    gulp.watch(path.developmentDir + '/html/**/*', ['html']);
    gulp.watch(path.developmentDir + '/html/**', ['fileinclude']);
    gulp.watch(path.developmentDir + '/node_modules/material-design-icons/iconfont/*', ['fonts']);
    gulp.watch(path.developmentDir + '/sass/*.scss', ['sass']);
    gulp.watch(path.developmentDir + '/sass/include/**/*.scss', ['include']);
    gulp.watch(path.developmentDir + '/babel/**/*.js', ['js']);
    gulp.watch(path.developmentDir + '/images/**/*', ['images']);
    gulp.watch(path.developmentDir + '/vendors/**/*', ['vendors']);

});

/** 
 * Default Task
 * -----------------------------------------------------------------------------
 */

gulp.task('default', function (callback) {
    return sequence( ['images'],['sass'], ['include'],['html'], ['fileinclude'], ['fonts'], ['js'], ['vendors'],['server'], callback);
});