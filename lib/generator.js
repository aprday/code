"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = [maker, fn].map(_regenerator2.default.mark);

function maker() {
    var index;
    return _regenerator2.default.wrap(function maker$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    index = 0;

                    console.log(123);

                case 2:
                    if (!(index < 10)) {
                        _context.next = 8;
                        break;
                    }

                    _context.next = 5;
                    return index++;

                case 5:
                    index++;
                    _context.next = 2;
                    break;

                case 8:
                    index++;
                    index++;
                    index++;

                case 11:
                case "end":
                    return _context.stop();
            }
        }
    }, _marked[0], this);
}

var g = maker();

console.log(g.next().value); // 0
console.log(g.next().value); // 1


function fn() {
    return _regenerator2.default.wrap(function fn$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.next = 2;
                    return 1;

                case 2:
                case "end":
                    return _context2.stop();
            }
        }
    }, _marked[1], this);
}