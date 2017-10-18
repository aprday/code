"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

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

console.log("callback promise co : ==========");
function co2Promise(fn) {
    var _this = this;

    return new _promise2.default(function (resolve, reject) {
        var ctx = _this;
        var g = fn.call(ctx);
        function next(err, res) {
            var it = g.next(res);
            if (it.done) {
                resolve(it.value);
            } else {
                it.value(next);
            }
        }
        next();
    });
}

co2Promise(_regenerator2.default.mark(function _callee() {
    var a, b;
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return getThunk(100);

                case 2:
                    a = _context.sent;
                    _context.next = 5;
                    return getThunk(1000);

                case 5:
                    b = _context.sent;

                    console.log('a:', a);
                    console.log('b:', b);
                    return _context.abrupt("return", [a, b]);

                case 9:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, this);
})).then(function (args) {
    console.log("callback promise co : ==========");
    console.log(args);
});