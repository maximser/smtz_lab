//Подключаем модуль Gulp
const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const nano = require('gulp-cssnano');
const uncss = require('gulp-uncss');
var notify = require("gulp-notify");
var gulpIgnore = require('gulp-ignore');
var pngSprite = require('coveo-png-sprite');

//Порядок подключения css файлов
const cssFiles = [
	'../shared/bootstrap-4.6.0-dist/css/bootstrap.min.css',
	'../shared/jquery.fancybox.min.css'];

//Порядок подключения css файлов
const jsFiles = [
	'../shared/jquery-3.6.0.min.js',
    '../shared/bootstrap-4.6.0-dist/js/bootstrap.min.js',
	'../shared/popper.min.js',
    '../shared/jquery.fancybox.min.js'
];

//Таск для стилей CSS 
function styles() {
	//Шаблон для поиска файлов CSS
	return gulp.src(cssFiles)
	//Объединение файлов в один
	.pipe(concat('style.css'))
	//Минификация CSS
	.pipe(cleanCSS({
		level: 2
	}))
	//Выходная папка для стилей
	.pipe(gulp.dest('./build/css'))
}

//Таск для скриптов JavaScript 
function scripts() {
	//Шаблон для поиска файлов JavaScript
	return gulp.src(jsFiles)
	//Объединение файлов в один
	.pipe(concat('script.js'))
	//Минификация JavaScript
	.pipe(uglify())
	//Выходная папка для стилей
	.pipe(gulp.dest('./build/js'))
}

//Таск для скриптов JavaScript
function html() {
    //Шаблон для поиска файлов JavaScript
    return gulp.src(jsFiles)
        .pipe(rename(function (path) {
        path.dirname += "/ciao";
        path.basename += "-goodbye";
        path.extname = ".js";
    }))
        .pipe(notify("Hello Gulp!"))
        .pipe(gulp.dest('./build/'))
}

gulp.task('sprites', function () {
    gulp.src('./img/*.png')
        .pipe(sprite('sprites.png', {
            imagePath: 'build/img',
            cssPath: './src/scss/utils/',
            preprocessor: 'scss'
        }))
        .pipe(gulp.dest('./build/img/'));
});

gulp.task('sprite', function (done) {
    return gulp.src('img/*.png')
        .pipe(pngSprite.gulp({
            cssPath: 'sprites.scss',
            pngPath: 'sprites.png',
            namespace: 'sprites'
        }))
        .pipe(gulp.dest('./build/img/'))
});

//Вызов функций
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('html', html);