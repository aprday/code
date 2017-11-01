var tracker = new tracking.ObjectTracker(['face']);
//识别回调
tracker.on('track', function(event) {
    if (!event.data.length) {
        return console.log('画面中没有人脸');
    }
    event.data.forEach(function(rect, i) {
        console.log(rect);//单个面部数据
    })
})