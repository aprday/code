var http = require('http');
var net = require('net');
var url = require('url');
var xml2js = require('xml2js');
var querystring = require('querystring') 

function chat (content, callback) {
    var body = querystring.stringify({
        'key': 'ed18a28894f9411cb0c96dd9a3c98363',
        'info': content,
        'userid': 'f075d517-b4bb-47be-b63a-5248a515bbe4',
        'loc': '上海'
    });
    var options = {
        hostname: 'www.tuling123.com',
        path: '/openapi/api',
        port: 80,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    var req = http.request(options, function (res) {
        // console.log(res.statusCode);
        // console.log(JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log(chunk);
            if (chunk.code === '100000') {
                callback(chunk.text);
            }
        });
    });
    console.log(encodeURIComponent(JSON.stringify(body)));
    req.write(body);
    req.end();
}
module.exports = {
    chat: chat
}

