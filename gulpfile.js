let gulp = require("gulp");
let uglify = require("gulp-uglify"); //压缩模块
let babel = require("gulp-babel"); //ES6的编译模块
let cleancss = require("gulp-clean-css");
let webserver = require("gulp-webserver");
let sass = require("gulp-sass");//编译scss到css


gulp.task("buildJS", ()=>{
	
	//编译压缩复制
	gulp.src("./src/scripts/**/*.js")
// 		.pipe(babel({
//             presets: ['env']
//         }))
// 		.pipe( uglify() )
		.pipe( gulp.dest("./dist/scripts") );
		
		
	gulp.src("./src/pages/**/*.js")
		.pipe(babel({
			presets: ['env']
		}))
		.pipe( uglify() )
		.pipe( gulp.dest("./dist/pages") );
		
})

gulp.task("buildCSS", ()=>{
	
	gulp.src("./src/**/*.scss")
		// .pipe(cleancss())
		.pipe(sass().on("error",sass.logError))
		.pipe( gulp.dest("./dist") )
		gulp.src("./src/**/*.css")
			.pipe(cleancss())
			.pipe( gulp.dest("./dist") )
	
})

gulp.task("buildHTML", ()=>{
	gulp.src("./src/**/*.html").pipe( gulp.dest("./dist") );
})

gulp.task("watching",()=>{
	gulp.watch("./src/**/*.scss",["buildCSS"]);
	gulp.watch("./src/**/*.js",["buildJS"]);
	gulp.watch("./src/**/*.html",["buildHTML"])
});
gulp.task("buildStaticResource",()=>{
	gulp.src("./src/static/**/*.*").pipe(gulp.dest("./dist/static"));
})

	gulp.task('webserver',["watching"], function() {
	gulp.src('dist')
		.pipe(webserver({
			livereload: true, //是否支持热部署
			// https: true,   
			port:8000,//端口
			host:"localhost",
			// open : "pages",
			proxies : [
				{	
					source: '/search', 
					target: 'https://shopapi.smartisan.com/v1/search/hot-words',
				}
			]
		}));
});

gulp.task("build", ["buildJS","buildHTML", "buildCSS","buildStaticResource"])
