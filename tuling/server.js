var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var tuling = require('./tuling');

app.listen(8020);

function handler(req, res) {
    fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    });
}

io.on('connection', function (socket) {
    socket.on('chat', function (data) {
        console.log(data);
        var msg = data.message;
        tuling.chat(msg, function (content) {
            socket.emit('chat', {content: content, msg: msg});
        });
    });
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
