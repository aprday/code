var app = require('http').createServer(handler)
var fs = require('fs');

app.listen(8020);

function handler(req, res) {
    var url = require('url').parse(req.url)
    if (url.pathname === '/api/a/b/c') {
        res.writeHead(200);
        res.end("hello world");
        return;
    }
    fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    });
}
