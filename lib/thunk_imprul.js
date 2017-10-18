"use strict";

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
            console.log('next1', res);
            var it = g.next(res);
            if (it.done) {
                done.call(ctx, err, it.value);
            } else {
                // 增加对其他类型的处理
                it.value = toThunk.call(ctx, it.value);

                it.value(next);
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
                    _context.next = 2;
                    return getThunk(10000);

                case 2:
                    a = _context.sent;
                    _context.next = 5;
                    return getThunk(1000);

                case 5:
                    b = _context.sent;
                    return _context.abrupt("return", [a, b]);

                case 7:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, this);
}))(function (err, args) {
    console.log("callback thunk co : ==========");
    // console.log(err, args);
});