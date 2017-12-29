var gulp = require('gulp'),
	webpack = require('webpack'),
	fs = require('fs'),
	debug = require('gulp-debug')


gulp.task('webpack', function(callback) {
	var webpackConfig = require('./webpack.config.js')
	var compileLogger = require('./webpack-config/compileLogger.js')
	
	var myConfig = Object.create(webpackConfig)

	webpack(
		myConfig
	, function(err, stats) {
		compileLogger(err, stats)
		callback()
	})
})

/***************** 移动待发布文件到trunk ***********************/

var file = './file.txt'
gulp.task('copybeta', function() {
	fs.readFile(file, function(err, obj){
		//console.log('err:', err)
		obj = obj.toString().replace(/\s{2,}/g, '\n').replace(/(^\s+)|(\s+$)/g, '').split('\n')

		for(var i = 0; i< obj.length; i++){

			var srcFile = obj[i].replace(/\s+/g,'')
            
			if(srcFile.indexOf('.') == -1){
				srcFile = srcFile + '/**/*.*'
			}
			console.log('dir:', srcFile)

			if(srcFile.indexOf('static_grab') != -1){
				gulp.src(srcFile, {base: './static_grab'})    
                    .pipe(debug({title: 'static_grab:'}))
                    .pipe(gulp.dest( fs.realpathSync('./beta/static_grab') ))
			}else{
				srcFile = srcFile.replace('grab/web/','')

				gulp.src(srcFile, {base: './html'})    
                    .pipe(debug({title: 'grab:'}))
                    .pipe(gulp.dest( fs.realpathSync('./beta/grab/web/html') ))
			}
            
		}
        
	})  


})


gulp.task('copytrunk', function() {
	fs.readFile(file, function(err, obj){
		//console.log('err:', err)
		obj = obj.toString().replace(/\s{2,}/g, '\n').replace(/(^\s+)|(\s+$)/g, '').split('\n')

		for(var i = 0; i< obj.length; i++){

			var srcFile = obj[i].replace(/\s+/g,'')
            
			if(srcFile.indexOf('.') == -1){
				srcFile = srcFile + '/**/*.*'
			}
			console.log('dir:', srcFile)

			if(srcFile.indexOf('maps') != -1) continue

			if(srcFile.indexOf('static_grab') != -1){
				gulp.src(srcFile, {base: './static_grab'})    
                    .pipe(debug({title: 'static_grab:'}))
                    .pipe(gulp.dest( fs.realpathSync('./trunk/static_grab') ))
			}else{
				srcFile = srcFile.replace('grab/web/','')
				
				gulp.src(srcFile, {base: './html'})    
                    .pipe(debug({title: 'grab:'}))
                    .pipe(gulp.dest( fs.realpathSync('./trunk/grab/web/html') ))
			}
            
		}
        
	})  


})