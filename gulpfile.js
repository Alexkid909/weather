const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const install = require('gulp-install');
const babel = require('gulp-babel');
// const concat = require('gulp-concat');
// const autoprefixer = require('gulp-autoprefixer');

const paths = {
    src: {
        root: './src/**/*',
        HTML: './src/**/*.html',
        CSS: './src/**/*.css',
        SASS: './src/**/*.scss',
        JS: './src/app/js/**/*.js',
        ASSETS: './src/app/assets/**/*',
        NPM: './src/package.json'
    },
    tmp: {
        root: './tmp/',
        Index: './tmp/index.html',
        CSS: './tmp/app/css',
        SASS: './tmp/app/sass/**/*.scss',
        JS: './tmp/app/js/',
        ASSETS: './tmp/app/assets',
        NPMJson: './tmp/package.json',
        NPMFiles: './tmp/node_modules/*'
    },
    dist: {
        root: './dist/**/*',
        Index: './dist/index.html',
        CSS: './dist/**/*.css',
        SASS: './dist/**/*.scss',
        JS: './dist/**/*.js'
    }
};

function copyHtmlToTmp() {
    return gulp.src(paths.src.HTML)
        .pipe(gulp.dest(paths.tmp.root));
}
gulp.task('copyHtmlToTmp', copyHtmlToTmp);

function copySassToTmp() {
    return gulp.src(paths.src.SASS)
        .pipe(gulp.dest(paths.tmp.root));
}
gulp.task('copySassToTmp',copySassToTmp);

function copyJsToTmp() {
    return gulp.src(paths.src.JS)
        .pipe(gulp.dest(paths.tmp.JS));
}

gulp.task('copyJsToTmp',copyJsToTmp);

function babelTranspileToTmp() {
    return gulp.src(paths.src.JS)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.tmp.JS));
}

gulp.task('babelTranspileToTmp', babelTranspileToTmp);

function copyAssetsToTmp() {
    return gulp.src(paths.src.ASSETS)
        .pipe(gulp.dest(paths.tmp.ASSETS));
}
gulp.task('copyAssetsToTmp',copyAssetsToTmp);

function copyPackageJson() {
    return gulp.src(paths.src.NPM).pipe(gulp.dest(paths.tmp.root))
}
gulp.task('copyPackageJson',copyPackageJson);

const copyToTmp = gulp.parallel(copyHtmlToTmp, babelTranspileToTmp, copySassToTmp, copyAssetsToTmp, copyPackageJson);
gulp.task('copyToTmp', copyToTmp);

const npmInstallTmp = function() {
    return gulp.src(paths.tmp.NPMJson).pipe(install());
};
gulp.task('npmInstallTmp', npmInstallTmp);

function compileSassAndAutoPrefix() {
    return gulp.src(paths.tmp.SASS)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        // .pipe(autoprefixer({
        //     browsers: ['last 2 versions'],
        //     cascade: false
        // }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./tmp/app/css'));
}
gulp.task('compileSassAndAutoPrefix', compileSassAndAutoPrefix);

function watchSrc() {
    gulp.watch(paths.src.HTML, copyHtmlToTmp);
    gulp.watch(paths.src.SASS, copySassToTmp);
    gulp.watch(paths.src.JS, copyJsToTmp);
    gulp.watch(paths.src.ASSETS, copyAssetsToTmp);
    gulp.watch(paths.src.NPM, copyPackageJson);
}
gulp.task('watchSrc',watchSrc);

function watchTmp() {
    gulp.watch(['./tmp/**/*.js','./tmp/**/*.css','./tmp/**/*.html']).on('change', browserSync.reload);
    // gulp.watch('tmp/app/css/style.css',['autoprefixer']);
    gulp.watch(paths.tmp.SASS, compileSassAndAutoPrefix);
    gulp.watch(paths.tmp.NPMJson, npmInstallTmp)
}
gulp.task('watchTmp', watchTmp);

function runBrowserSync() {
    return browserSync.init({
        server: {
            baseDir: "./tmp"
        }
    });
}
gulp.task('browserSync', runBrowserSync);

const watch = gulp.parallel(runBrowserSync, watchSrc, watchTmp);
gulp.task('watch', watch);

const build = gulp.series(copyToTmp, gulp.parallel(npmInstallTmp, compileSassAndAutoPrefix));
gulp.task('build', build);

const serve = gulp.series(build, watch);
gulp.task('serve', serve);