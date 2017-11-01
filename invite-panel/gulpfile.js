 /****************** Server ****************/
var gulp = require('gulp');

var http = require('http');
var st = require('st');

// 引入组件
var less = require('gulp-less'),            // less
    minifycss = require('gulp-minify-css'), // CSS压缩
    uglify = require('gulp-uglify'),        // js压缩
    concat = require('gulp-concat'),        // 合并文件
    rename = require('gulp-rename'),        // 重命名
    clean = require('gulp-clean');          //清空文件夹

// less解析
gulp.task('less', function(){
  gulp.src('./less/style.less')
    .pipe(less())
    .pipe(gulp.dest('./css/'))
});

// 合并、压缩、重命名css
gulp.task('css',['less'], function() {
    // 注意这里通过数组的方式写入两个地址,仔细看第一个地址是css目录下的全部css文件,第二个地址是css目录下的areaMap.css文件,但是它前面加了!,这个和.gitignore的写法类似,就是排除掉这个文件.
  gulp.src('./css/*.css')
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./css/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('./css'));
});

// 合并，压缩js文件
gulp.task('js', function() {
  gulp.src('./js/vendor/*.js')
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
});

function server(done) {
  http.createServer(
    st({
      path: __dirname + '/',
      index: 'index.html',
      cache: false
    })
  ).listen(8080, done);
  console.log("preview listening on http://localhost:8080");
}

gulp.task('server',['css','js'], server);