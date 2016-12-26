// bulbo
const bulbo = require('bulbo');
const asset = bulbo.asset;

// commons
const plumber = require('gulp-plumber');
const rimraf = require('rimraf');
const runSequence = require('run-sequence');
const notifier = require('node-notifier');

// ejs
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const prettify = require('gulp-prettify');

// less
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({
  browsers: ['last 5 versions']
});

// sass
const sass = require('gulp-sass');

// eslint
const eslint = require('gulp-eslint');

// path
const path = {
  src: {
    js: 'src/**/*.js',
    ejs: 'src/**/*.ejs',
    less: 'src/**/*.less',
    scss: 'src/**/*.scss'
  },
  excludeFile: {
    ejs: '!src/**/_*.ejs',
    less: '!src/**/_*.less',
    scss: '!src/**/_*.scss'
  }
};

// ejs
asset([path.src.ejs, path.excludeFile.ejs])
  .pipe(ejs())
  .pipe(rename(function (path) {
    path.extname = '.html';
  }))
  .pipe(prettify({
    indent_with_tabs: false,
    indent_size: 2,
    max_preserve_newlines: 1,
    preserve_newlines: true,
    unformatted: [
      'b', 'big', 'i', 'small', 'tt', 'abbr', 'acronym',
      'cite', 'code', 'dfn', 'em', 'kbd', 'strong', 'samp',
      'time', 'var', 'a', 'bdo', 'br', 'img', 'map', 'object',
      'q', 'span', 'sub', 'sup', 'button', 'input',
      'label', 'select', 'textarea'
    ]
  }));

// less
asset([path.src.less, path.excludeFile.less])
  .pipe(plumber({
    errorHandler: function (err) {
      console.log(err);
      this.emit('end');
    }
  }))
  .pipe(less({
    sourceMap: {
      sourceMapFileInline: true
    },
    plugins: [autoprefix]
  }))
  .pipe(sourcemaps.init())
  .pipe(cleanCSS())
  .pipe(sourcemaps.write('sourcemaps'));

// scss
asset([path.src.scss, path.excludeFile.scss])
  .pipe(sourcemaps.init())
  .pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError))
  .pipe(sourcemaps.write('sourcemaps'));

// eslint
asset(path.src.js)
  .pipe(plumber({
    // エラーをハンドル
    errorHandler: function (error) {
      var taskName = 'eslint';
      var title = '[task]' + taskName + ' ' + error.plugin;
      var errorMsg = 'error: ' + error.message;
      // ターミナルにエラーを出力
      console.error(title + '\n' + errorMsg);
      // エラーを通知
      notifier.notify({
        title: title,
        message: errorMsg,
        time: 3000
      });
    }
  }))
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .pipe(plumber.stop());
