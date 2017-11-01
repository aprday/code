function async(callback) {
    process.nextTick(function () {
        if (err) {
            return callback(err);
        }
        callback(null);

    });
}

try {
    async(function (err) {
        if (!err) {
            console.log(a);
        }
    });
} catch (err) {
    // TODO
}