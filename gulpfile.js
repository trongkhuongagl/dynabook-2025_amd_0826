var gulp = require('gulp')
  , $ = require('gulp-load-plugins')()
  , postcss = require("gulp-postcss")
  , autoprefixer = require("autoprefixer")
  , postcssGapProperties = require("postcss-gap-properties")
  , sass = require('gulp-sass')(require('sass'))
  , ejs = require('gulp-ejs')
  , rename = require('gulp-rename')
  , webpackStream = require('webpack-stream')
  , webpack = require('webpack')
  , webpackConfig = require('./webpack.config')
  , browserSync = require('browser-sync').create()
  , plumber = require('gulp-plumber')
  , notify = require('gulp-notify')
  , connect = require('gulp-connect-php')
  , connectSSI = require('connect-ssi')
  , fs = require('fs')

  , dir = '.'
  , dev_dir = '/src/'
  , dev_path = dir + dev_dir
  , dest_dir = '/dist/'
  , dest_path = dir + dest_dir
  , start_dir = './'

  , project = ''

  ;

// sass.compiler = require('sass');

gulp.task('sass', function (done) {
  gulp.src([dev_path + '_sass/**/*.scss'])
    .pipe(plumber(notify.onError('Error: <%= error.message %>')))
    .pipe(sass.sync({
      outputStyle: 'compressed'
    }))
    .pipe(postcss([
      postcssGapProperties(),
      autoprefixer({
        grid: true,
        cascade: false
      })
    ]))
    .pipe(gulp.dest(dest_path));
  done();
});

gulp.task('ejs', function (done) {
  gulp.src(
    [dev_path + '_ejs/*.ejs', dev_path + '_ejs/**/*.ejs', '!' + dev_path + '_ejs/**/_*.ejs']
  )
    .pipe(plumber(notify.onError('Error: <%= error.message %>')))
    .pipe(ejs(
      {
        // 'sitemap': JSON.parse(fs.readFileSync('./src/ejs/corporate/_modules/_sitemap.json', 'utf8'))
      }, {
    }, {
      ext: '.html'
    }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(dest_path + project));
  done();
});

gulp.task('webpack', function (done) {
  return webpackStream(webpackConfig, webpack)
    .pipe(plumber(notify.onError('Error: <%= error.message %>')))
    .pipe(gulp.dest(dev_path));
  done();
});

gulp.task('bs', function (done) {
  //    connect.server({
  //        port:3000,
  //        base:dest_path
  //    }, function (){
  //        browserSync.init({
  //            proxy:'localhost:3000'
  //            , browser: ['chrome', 'firefox']
  //            , startPath: './'
  //            , middleware: [
  //                connectSSI({
  //                    baseDir:dest_path
  //                    , ext:'.html'
  //                })
  //            ]
  //        });
  //    });



  browserSync.init({
    server: {
      baseDir: dest_path
    }
    , browser: ['chrome']
    , startPath: './'
  });
  done();
});

gulp.task('bsReload', function (done) {
  browserSync.reload()
  done();
});

gulp.task('default', gulp.series('bs', function (done) {
  gulp.watch([dev_path + '_ejs/*.ejs', dev_path + '_ejs/**/*.ejs', dev_path + '_ejs/**/*.json'],
    gulp.series('ejs')
  );

  gulp.watch([dev_path + '_sass/*.scss', dev_path + '_sass/**/*.scss'],
    gulp.series('sass')
  );

  gulp.watch([dev_path + '_js/*.js', dev_path + '_js/**/*.js'],
    gulp.series('webpack')
  );

  gulp.watch([dest_path + '*.html', dest_path + '**/*.html', dest_path + '**/*.js', dest_path + '**/*.css'],
    gulp.series('bsReload')
  );

  done();
})

);
