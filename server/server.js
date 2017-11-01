var config = require('./config.json');
var request = require('request');

var options = {
        baseUrl: 'http://chanpin.family.baidu.com',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Cookie': 'BDUSS=3hoMmZFUUJwZ1piZXpUbDh4bEIzTGpDQlhlSXBZQlNmb2NOUGpqOVRWU1lGWU5aSVFBQUFBJCQAAAAAAAAAAAEAAAB-Sro9d2hhdGNvbG9yZmx5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJiIW1mYiFtZR; BAIDUID=ABF0A87C0B5551881FDC3CD4B022D2A6:FG=1; PSTM=1499242939; BIDUPSID=40B8CCD54F0CE7D33FE0217176BBE4EE; quickMenu_close=true; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; PSINO=1; H_PS_PSSID=23142_1463_13702_21122_18560_17001_20929; express.sid=s%3AnD98xneto779Wr7OXnxa9rgF70EyJOTD.OmoI1xSMw%2FK1WEPKgIhPIFK6avnGnPhp6qPOwJqBaAM; Hm_lvt_e5c8f30b30415b1fc94d820ba9d4d08c=1499011435; Hm_lpvt_e5c8f30b30415b1fc94d820ba9d4d08c=1499407916'
        }
    };
function fetch(content, callback) {
    options.uri = '/asyncComment';
    options.form = {'articleId': config.articleId};
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = body.match(/<em>(\d+)<\/em>/);
            if (result) {
                var conmentNumber = result.length > 1
                    ? result[1]
                    : 0;
                callback(conmentNumber);
            }
        }
    });
}

function send(text, callback) {
    options.uri = '/addComment';
    options.form = {'content': text, 'articleId': config.articleId, 'replyToComment': undefined};
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(body);
        }
    });
}
module.exports = {
    fetch: fetch,
    send: send
}
