

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



function co2ThunkSample(fn) {
    return (done) => {
        const ctx = this;
        const g = fn.call(ctx);
        let it0 = g.next();
        it0.value((err, res) => {
            const it1 = g.next(res);
            it0.value((err, res) => {
                const it1 = g.next(res);
                it1.value((err, res) => {
                    const it2 = g.next(data);
                    // ...
                });
            });
        });
    }
}

function co2Thunk(fn) {
    return (done) => {
        const ctx = this;
        const g = fn.call(ctx);
        function next(err, res) {
            console.log('next1', res);
            let it = g.next(res);
            if (it.done) {
                done.call(ctx, err, it.value);
            } else {
                it.value(next);
            }
        }
        next();
    }
}
console.log("callback thunk co12313123123 : ==========");
co2Thunk(function * () {
    var a = yield getThunk(10000);
    var b = yield getThunk(1000);
    console.log('a:', a);
    console.log('b:', b);
    return [a, b];
})(function (err, args) {
    console.log("callback thunk co : ==========");
    console.log(err, args);
});