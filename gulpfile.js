
var gulp=require('gulp'),
	less=require('gulp-less'),
	cssmin=require('gulp-cssmin'),
	auto=require('gulp-autoprefixer'),
	rev=require('gulp-rev'),
	rename=require('gulp-rename'),
	useref=require('gulp-useref'),
	img=require('gulp-imagemin'),
	col=require('gulp-rev-collector'),
	use=require('gulp-useref');

gulp.task('css',function(){

	 return gulp.src('./public/css/index.less')
	.pipe(less())
	.pipe(cssmin())
	.pipe(auto({
            browsers: ['last 2 versions'],
            cascade: false
        }))
	.pipe(rev())
	.pipe(gulp.dest('./release/public/css'))
	.pipe(rev.manifest())
	.pipe(rename('css-manifest.json'))
	.pipe(gulp.dest('./release/rev'));
});
gulp.task('img',function(){

     return gulp.src('./images/*')
	.pipe(img())
	.pipe(rev())
	.pipe(gulp.dest('./release/images'))
	.pipe(rev.manifest())
	.pipe(rename('img-manifest.json'))
	.pipe(gulp.dest('./release/rev'));
});
gulp.task('use',function(){

	return gulp.src('./index.html')
	.pipe(use())
	.pipe(gulp.dest('./release'));
});
gulp.task('other',function(){
	 
	 return gulp.src(['./psd/*','./public/fonts/*','./public/js/*'],{base:'./'})
	.pipe(gulp.dest('./release'));
});
gulp.task('rev',function(){
	 return gulp.src(['./release/rev/*.json','./release/index.html'])
	.pipe(col())
	.pipe(gulp.dest('./release'));
});
gulp.task('default',['rev','other','img','css','use']);