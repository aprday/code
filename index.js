function resolveAfter2Seconds(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x);
        }, 2000);
    });
}

async function add1(x) {
    var a = resolveAfter2Seconds(20);
    var b = resolveAfter2Seconds(30);
    return x + await a + await b;
}

add1(1).then(v => {
    console.log(v); // prints 60 after 2 seconds.
});

async function add2(x) {
    var a = await resolveAfter2Seconds(20);
    var b = await resolveAfter2Seconds(30);
    return x + a + b;
}

add2(2).then(v => {
    console.log(v); // prints 60 after 4 seconds.
});

function _asyncToGenerator(fn) {
    return function () {
        var gen = fn.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            function step(key, arg) {
                try {
                    var info = gen[key](arg);
                    var value = info.value;
                } catch (error) {
                    reject(error);
                    return;
                }
                if (info.done) {
                    resolve(value);
                } else {
                    return Promise
                        .resolve(value)
                        .then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                }
            }
            return step("next");
        });
    };
}