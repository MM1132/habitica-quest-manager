const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

gulp.task('bundle', function() {
  return gulp.src('build/**/*.js')
    .pipe(babel({
      plugins: [['remove-import-export', {
        removeImport: true,
        removeExport: true,
        removeExportDefault: true,
        preseveNamedDeclaration: true
      }]]
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-files', function() {
  return gulp.src(['src/**/*', '!src/ts/**']) // Copy everything except JS files
    .pipe(gulp.dest('dist'));
});

//gulp.task('default', gulp.series('scripts'));
gulp.task('default', gulp.series('bundle', 'copy-files'));
