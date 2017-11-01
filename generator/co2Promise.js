
function getThunk(number) {
    return function (fn) {
        setTimeout(() => {
            if (number) {
                fn(null, number);
            } else {
                const err = "error open";
                fn(err);
            }
        }, number)
    }
}

console.log("callback promise co : ==========");
function co2Promise(fn) {
    return new Promise((resolve, reject) => {
        const ctx = this;
        const g = fn.call(ctx);
        function next(err, res) {
            let it = g.next(res);
            if (it.done) {
                resolve(it.value);
            } else {
                it.value(next);
            }
        }
        next();
    });
}

co2Promise(function * () {
    var a = yield getThunk(100);
    var b = yield getThunk(1000);
    console.log('a:', a);
    console.log('b:', b);
    return [a, b];
}).then(function (args) {
    console.log("callback promise co : ==========");
    console.log(args);
});