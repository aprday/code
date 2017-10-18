"use strict";

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getThunk(number) {
    return function (fn) {
        setTimeout(function () {
            if (number) {
                fn(null, number);
            } else {
                var err = "error open";
                fn(err);
            }
        }, number);
    };
}

console.log("callback thunk co : ==========");

function co2ThunkSample(fn) {
    var _this = this;

    return function (done) {
        var ctx = _this;
        var g = fn.call(ctx);
        var it0 = g.next();
        it0.value(function (err, res) {
            var it1 = g.next(res);
            it0.value(function (err, res) {
                var it1 = g.next(res);
                it1.value(function (err, res) {
                    var it2 = g.next(data);
                    // ...
                });
            });
        });
    };
}

function co2Thunk(fn) {
    var _this2 = this;

    return function (done) {
        var ctx = _this2;
        var g = fn.call(ctx);
        function next(err, res) {
            var it = g.next(res);
            if (it.done) {
                done.call(ctx, err, it.value);
            } else {
                // 增加对其他类型的处理
                var value = toThunk.call(ctx, it.value);
                // 对于promise 此处应该是 value.then(next)
                value(next);
            }
        }
        next();
    };
}

co2Thunk(_regenerator2.default.mark(function _callee() {
    var a, b;
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    a = getThunk(100);
                    b = getThunk(1000);
                    // console.log('a:', a); console.log('b:', b);

                    _context.next = 4;
                    return [a, b];

                case 4:
                    return _context.abrupt("return", _context.sent);

                case 5:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, this);
}))(function (err, args) {
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
        var keys = (0, _keys2.default)(obj);
        var length = keys.length;
        var results = new obj.constructor();

        var _loop = function _loop(key) {
            var fn = toThunk(obj[key]);
            fn(function (err, res) {
                results[key] = res;
                --length || done(null, results);
            }, key);
        };

        for (var key in keys) {
            _loop(key);
        }
    };
}

function promiseToThunk(promise) {
    return function (done) {
        promise.then(function (err, res) {
            done(err, res);
        }, done);
    };
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