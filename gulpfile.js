const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

var PATHS = {
        html: ['src/index.html'],
        css: ['src/assets/css/animate.css', 'src/assets/css/animations.css', 'src/assets/css/style.css'],
        js: ['src/js/jquery.appear.js', 'src/js/template.js'],
        favicon: ['src/favicon/**/*'],
        images: ['src/assets/images/orange.jpg',
                 'src/assets/images/colorado.jpg',
                 'src/assets/images/banner.jpg',
                 'src/assets/images/grotto.jpg',
                 'src/assets/images/mccrae.jpg',
                 'src/assets/images/tobermory.jpg',
                 'src/assets/images/logo4.png']
};

gulp.task('clean', function(done) {
    var del = require('del');
    del(['public'], done);
});

gulp.task('jsmin', () => {
    var jsmin = require('gulp-jsmin');
    gulp.src(PATHS.js)
        .pipe(jsmin())
        .pipe(gulp.dest('public/js'));
});

gulp.task('cssmin', function() {
    var cleanCSS = require('gulp-clean-css');
    gulp.src(PATHS.css)
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('imagemin', () => {
    var jpegtran = require('imagemin-jpegtran');
    gulp.src(PATHS.images)
        .pipe(imagemin({progressive: true,
          svgoPlugins: [{removeViewBox: false}],
            use: [jpegtran()]}))
        .pipe(gulp.dest('public/assets/images'));
});

gulp.task('htmlmin', function() {
    var htmlmin = require('gulp-htmlmin');
    gulp.src(PATHS.html)
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('public'));
});

gulp.task('copy', function(){
    gulp.src(PATHS.favicon)
        .pipe(gulp.dest('public/favicon'));
});

gulp.task('fonts', function() {
    gulp.src('src/assets/fonts/**/*')
        .pipe(gulp.dest('public/assets/fonts'))
})

gulp.task('build', ['clean', 'imagemin', 'cssmin', 'jsmin', 'htmlmin', 'fonts','copy']);
