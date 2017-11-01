var server = require('./server');
var config = require('./config.json');
var isStop = false;
var levels = config
    .levels
    .sort(function (a, b) {
        return a - b;
    });

var time = 500;
function getTime(number) {
    if (!number) {
        return;
    }
    for (var i = 0; i < levels.length; i++) {
        if (number < levels[i]) {
            var min = levels[i] - number;
            if (min < 10) {
                time = 0;
            } else if (min > 100) {
                time = 60000;
            } else {
                time = 1000;
            }
            return;
        }
    }
}
var main = function (content) {
    if (content) {
        console.log('现在的楼层是:' + content);
    } 
    if (!!~levels.indexOf(parseInt(content))) {
        server.send(config.conment, function (content) {
            console.log('评论成功', content);
            isStop = true;
        });
    } else if (content > levels.reverse()[0]) {
        isStop = true;
        console.log('退出程序');
    } else {
        getTime(content);
    }
};

function start() {
    setTimeout(function () {
        console.log('开始访问楼层，访问时间间隔：' + time);
        server.fetch('', main);
        if (!isStop) {
            start();
        }
    }, time);
}
start();
