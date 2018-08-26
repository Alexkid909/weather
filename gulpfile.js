const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const install = require('gulp-install');
const babel = require('gulp-babel');
const babelMin = require('gulp-babel-minify');
// const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const postCSS = require('gulp-postcss');
const karma = require('gulp-karma-runner');
const jasmine = require('gulp-jasmine');

const conf = {
    env: 'dev'
};

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
    dest: {
        root: '',
        Index: '/index.html',
        CSS: '/app/css',
        SASS: '/app/sass/**/*.scss',
        JS: '/app/js/',
        ASSETS: '/app/assets',
        NPMJson: '/package.json',
        NPMFiles: '/node_modules/*'
    },
    getDestPath: function(type) {
        return `./${conf.env === 'dev' ? 'tmp' : 'dist'}${this.dest[type]}`;
    }
};

function copyHtmlTo() {
    return gulp.src(paths.src.HTML)
        .pipe(gulp.dest(`${paths.getDestPath('root')}`));
}
gulp.task('copyHtmlTo', copyHtmlTo);

function copySassTo() {
    return gulp.src(paths.src.SASS)
        .pipe(gulp.dest(`${paths.getDestPath('root')}`));
}
gulp.task('copySassTo',copySassTo);

function copyJsTo() {
    return gulp.src(paths.src.JS)
        .pipe(gulp.dest(`${paths.getDestPath('JS')}`));
}

gulp.task('copyJsTo',copyJsTo);

function babelTranspileTo() {
    return gulp.src(paths.src.JS)
        // .pipe(sourcemaps.init())
        .pipe(
            conf.env === 'dev' ?
                babel({presets: ['env']}) :
                babelMin({
                    mangle: false
                })
        )
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(`${paths.getDestPath('JS')}`));
}

gulp.task('babelTranspileTo', babelTranspileTo);

function copyAssetsTo() {
    return gulp.src(paths.src.ASSETS)
        .pipe(gulp.dest(`${paths.getDestPath('ASSETS')}`));
}
gulp.task('copyAssetsTo',copyAssetsTo);

function copyPackageJson() {
    return gulp.src(paths.src.NPM).pipe(gulp.dest(`${paths.getDestPath('root')}`));
}
gulp.task('copyPackageJson',copyPackageJson);

const copyTo = gulp.parallel(copyHtmlTo, babelTranspileTo, copySassTo, copyAssetsTo, copyPackageJson);
gulp.task('copyTo', copyTo);

const npmInstall = function() {
    return gulp.src(`${paths.getDestPath('NPMJson')}`).pipe(install());
};
gulp.task('npmInstall', npmInstall);

function compileSassAndAutoPrefix() {
    return gulp.src(`${paths.getDestPath('SASS')}`)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(`${paths.getDestPath('CSS')}`));
}
gulp.task('compileSassAndAutoPrefix', compileSassAndAutoPrefix);

function watchSrc() {
    gulp.watch(paths.src.HTML, copyHtmlTo);
    gulp.watch(paths.src.SASS, copySassTo);
    gulp.watch(paths.src.JS, copyJsTo);
    gulp.watch(paths.src.ASSETS, copyAssetsTo);
    gulp.watch(paths.src.NPM, copyPackageJson);
}
gulp.task('watchSrc',watchSrc);

function watchTmp() {
    gulp.watch(['./tmp/**/*.js','./tmp/**/*.css','./tmp/**/*.html']).on('change', browserSync.reload);
    gulp.watch(`${paths.getDestPath('SASS')}`, compileSassAndAutoPrefix);
    gulp.watch(`${paths.getDestPath('NPMJson')}`, npmInstall)
}
gulp.task('watchTmp', watchTmp);

function runBrowserSync() {
    const basePath = paths.getDestPath('root');
    return browserSync.init({
        server: {
            baseDir: basePath
        }
    });
}
gulp.task('runBrowserSync', runBrowserSync);

const watch = gulp.parallel(runBrowserSync, watchSrc, watchTmp);
gulp.task('watch', watch);

const build = gulp.series(copyTo, gulp.parallel(npmInstall, compileSassAndAutoPrefix));
gulp.task('build', build);

const serve = gulp.series(build, watch);
gulp.task('serve', serve);

const setProd = (done) => {
    conf.env = 'prod';
    console.log('serving prod', conf.env);
    done();
};
gulp.task('setProd', setProd);

const setDev = (done) => {
    conf.env = 'dev';
    console.log('serving dev', conf.env);
    done();
};
gulp.task('setDev', setDev);

const serveDev = gulp.parallel(setDev, serve);
const serveProd = gulp.parallel(setProd, serve);

gulp.task('serveProd',serveProd);
gulp.task('serveDev',serveDev);

//Tests

var KarmaServer = require('karma').Server;
const browserSyncCoverage = require('browser-sync').create();


const unitTests = function (done) {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
};

gulp.task('test', unitTests);

function serveCoverage() {
    const basePath = './coverage/Chrome 66.0.3359 (Linux 0.0.0)/';
    return browserSyncCoverage.init({
        server: {
            baseDir: basePath,
            port: 3002
        }
    });
}

gulp.task('serveCoverage', serveCoverage);

function watchCoverage() {
    gulp.watch(['./coverage/Chrome 66.0.3359 (Linux 0.0.0)/']).on('change', browserSyncCoverage.reload);
}

gulp.task('watchCoverage', watchCoverage);

const coverage = gulp.parallel(serveCoverage, watchCoverage);
gulp.task('coverage', coverage);

