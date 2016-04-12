const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

var PATHS = {
    src: 'src/**/*.ts',
    images: ['src/assets/images/orange.jpg',
        'src/assets/images/colorado.jpg',
        'src/assets/images/grotto.jpg',
        'src/assets/images/mccrae.jpg',
        'src/assets/images/tobermory.jpg'
    ]
};

gulp.task('clean', function(done) {
    var del = require('del');
    del(['public'], done);
});

gulp.task('imagemin', () => {
    var jpegtran = require('imagemin-jpegtran');
    return gulp.src(PATHS.images)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [jpegtran()]
        }))
        .pipe(gulp.dest('public/assets/images'));
});
