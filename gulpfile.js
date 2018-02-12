var gulp = require('gulp');

/* ##### SASS ##### */
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sasswatch = './*.scss';
var sassinput = './*.scss';
var sassoutput = './';
var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};
gulp.task('sass', function() {
        // Find all .scss files from the ./src/css folder
        gulp.src(sassinput)
        // Run Sass on those files
        .pipe(sass())
        // Run Autoprefixer
        .pipe(autoprefixer(autoprefixerOptions))
        // Write resulting CSS in ./dist/css
        .pipe(gulp.dest(sassoutput));
});

gulp.task('watch', function() {
    gulp.watch(sasswatch, ['sass']);
});

gulp.task('default', ['sass', 'watch']);
