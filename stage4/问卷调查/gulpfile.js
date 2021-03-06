var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    // livereload = require('gulp-livereload'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync').create();

    gulp.task('style',function(){
        return sass('src/style/*.scss',{
                     style:'compress'
        })
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(concat("index.css"))
            .pipe(gulp.dest('src/dist/assets/css'))
            .pipe(rename({suffix: '.min'}))
            .pipe(minifycss())
            .pipe(gulp.dest('src/dist/assets/css'))
            .pipe(notify({ message: "Styles task finished" }))
            .pipe(browserSync.stream());
    });

    gulp.task('scripts',function(){
        return gulp.src('src/scripts/*.js')
             .pipe(jshint())
             .pipe(jshint.reporter('default'))
            .pipe(concat('bundle.js'))
            .pipe(gulp.dest('src/dist/assets/js'))
            .pipe(rename({suffix:'.min'}))
            .pipe(uglify())
            .pipe(gulp.dest('src/dist/assets/js'))
            .pipe(notify({message:'scripts task complete'}))
            .pipe(browserSync.stream());
    });
    
    gulp.task('browser-sync',function(){
        browserSync.init({
            server: {
                baseDir: "./src"
            }
        });
        gulp.watch('src/style/*.scss',['style']);
        gulp.watch('src/scripts/*.js',['scripts']);
        // 自动刷新页面
        gulp.watch(['src/dist/assets/**']).on('change', browserSync.reload);
    });

    gulp.task('clean', function(cb) {
        return gulp.src(['src/dist/assets/css','src/dist/assets/js'],{read:false})
            .pipe(clean());
    });

    gulp.task('default',['clean'],function(){
        gulp.start('style','scripts','browser-sync');
    });
