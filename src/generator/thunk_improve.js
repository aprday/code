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

console.log("callback thunk co : ==========");

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
            let it = g.next(res);
            if (it.done) {
                done.call(ctx, err, it.value);
            } else {
                // 增加对其他类型的处理
                const value = toThunk.call(ctx, it.value);
                // 对于promise 此处应该是 value.then(next)
                value(next);
            }
        }
        next();
    }
}

co2Thunk(function * () {
    var a = getThunk(100);
    var b = getThunk(1000);
    // console.log('a:', a); console.log('b:', b);
    return yield [a, b];
})(function (err, args) {
    console.log("callback thunk co : ==========");
    console.log(err, args);
});

function toThunk(obj) {
    if (isObject(obj) || isArray(obj)) {
        return objectToThunk(obj);
    }
    if (isPromise(obj)) {
        return promiseToThunk.call(ctx, obj);
    }
    return obj;
}

function objectToThunk(obj) {
    return function (done) {
        let keys = Object.keys(obj);
        let length = keys.length;
        let results = new obj.constructor();
        for(let key in keys) {
            const fn = toThunk(obj[key]);
            fn((err, res) => {
                results[key] = res;
                --length || done(null, results);
            }, key);
        }
    }
}

function promiseToThunk(promise){
    return function(done){
        promise.then(function(err,res){
            done(err,res);
        },done)
    }
}

function isObject(obj) {
    return obj && Object == obj.constructor;
}
function isArray(obj) {
    return Array.isArray(obj);
}

function isPromise(obj) {
  return obj && 'function' == typeof obj.then;
}