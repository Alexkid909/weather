var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
// var autoprefixer = require('gulp-autoprefixer');
var install = require('gulp-install');
var paths = {
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
};
gulp.task('copyHtmlToTmp', copyHtmlToTmp)

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

function copyAssetsToTmp() {
    return gulp.src(paths.src.ASSETS)
        .pipe(gulp.dest(paths.tmp.ASSETS));
}
gulp.task('copyAssetsToTmp',copyAssetsToTmp);

function copyPackageJson() {
    return gulp.src(paths.src.NPM).pipe(gulp.dest(paths.tmp.root))
}
gulp.task('copyPackageJson',copyPackageJson);

const copyToTmp = gulp.parallel(copyHtmlToTmp, copyJsToTmp, copySassToTmp, copyAssetsToTmp, copyPackageJson);
gulp.task('copyToTmp', copyToTmp);

const npmInstallTmp = function() {
    return gulp.src(paths.tmp.NPMJson).pipe(install());
};
gulp.task('npmInstallTmp', npmInstallTmp);

function compileSass() {
    return gulp.src(paths.tmp.SASS)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./tmp/app/css'));
}
gulp.task('compileSass', compileSass);

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
    gulp.watch(paths.tmp.SASS, compileSass);
    gulp.watch(paths.tmp.NPMJson, npmInstallTmp)
}
gulp.task('watchTmp', watchTmp);

function runBrowserSync() {
    return browserSync.init({
        server: {
            baseDir: "./tmp"
        }
    });
};
gulp.task('browserSync', runBrowserSync);

const watch = gulp.parallel(runBrowserSync, watchSrc, watchTmp);
gulp.task('watch', watch);

const build = gulp.series(copyToTmp, gulp.parallel(npmInstallTmp, compileSass));
gulp.task('build', build);

const serve = gulp.series(build, watch);
gulp.task('serve', serve);