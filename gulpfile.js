const gulp = require('gulp'),
  sass = require('gulp-sass')(require('sass')),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  del = require('del'),
  webpackStream = require('webpack-stream'),
  rev = require('gulp-rev-append'),
  util = require('gulp-util'),
  imagemin = require('gulp-imagemin'),
  newer = require('gulp-newer'),
  rename = require('gulp-rename'),
  browsersync = require('browser-sync').create();


const src = './src';
const dist = './dist';
const build = './build';

const config = {
  css: `/css`,
  sass: `/sass`,
  pug: `/views/containers`,
  pages: `/pages`,
  html: `${dist}`,
  js: `/js`,
  images: `/images`,
  minImages: `/images`,
  production: !!util.env.production,
};

const browserSync = (done) => {
  browsersync.init({
    server: {
      baseDir: dist,
    },
    port: 3000,
    online: true,
  });
  done();
};

// const browserSyncReload = done => {
//   browsersync.reload();
//   done();
// };

const clean = () => {
  return del([config.production ? build : dist]);
};

const images = () => {
  return gulp
    .src(src + config.images + '/**/*')
    .pipe(newer((config.production ? build : dist) + config.images))
    .pipe(imagemin())
    .pipe(gulp.dest((config.production ? build : dist) + config.images));
};

const sassTask = () => {
  return gulp
    .src(`${src + config.sass}/**/*.scss`)
    .pipe(config.production ? util.noop() : sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'compressed',
      }).on('error', sass.logError)
    )
    .pipe(
      autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
        cascade: true,
      })
    )
    .pipe(config.production ? util.noop() : sourcemaps.write())
    .pipe(rename('main.css'))
    .pipe(gulp.dest(`${(config.production ? build : dist) + config.css}`))
    .pipe(browsersync.stream());
};

// const htmlTask = () => {
//   return gulp
//     .src(src + config.pages + `/**/*.html`)
//     .pipe(gulp.dest(config.production ? build : dist));
// };
const jsTask = () => {
  return gulp
    .src(src + config.js + '/index.js')
    .pipe(
      webpackStream({
        mode: config.production ? 'production' : 'development',
        output: {
          filename: 'main.js',
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest((config.production ? build : dist) + config.js))
    .pipe(browsersync.stream());
};

const revTask = () => {
  return gulp
    .src(`${src}${config.pages}/**/*.html`)
    .pipe(gulp.dest(config.production ? build : dist))
    .pipe(browsersync.stream());
};

const watchFiles = () => {
  gulp.watch(`${src}/**/*.scss`, sassTask);
  gulp.watch(`${src}/**/*.js`, jsTask);
  gulp.watch(`${src}/**/*.html`, revTask);

  gulp.watch(src + config.images + '/**/*', images);
};

gulp.task('revTask', revTask);
gulp.task('images', images);
gulp.task('sassTask', sassTask);
gulp.task('jsTask', jsTask);
gulp.task('clean', clean);

gulp.task('default', gulp.series(clean, gulp.parallel(sassTask, jsTask, images, revTask)));
gulp.task('watch', gulp.series(gulp.parallel(watchFiles, browserSync)));
