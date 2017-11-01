 /****************** Server ****************/
var gulp = require('gulp');
var http = require('http');
var st = require('st');

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

gulp.task('server', server);