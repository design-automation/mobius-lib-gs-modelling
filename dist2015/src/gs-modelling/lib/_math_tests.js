"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.test_PI = test_PI;
exports.test_POS_INF = test_POS_INF;
exports.test_NEG_INF = test_NEG_INF;
exports.test_cos = test_cos;
exports.test_sin = test_sin;
exports.test_tan = test_tan;
exports.test_pow = test_pow;
exports.test_ceiling = test_ceiling;
exports.test_floor = test_floor;
exports.test_abs = test_abs;
exports.test_max = test_max;
exports.test_min = test_min;
exports.test_rand = test_rand;
exports.test_randInt = test_randInt;
exports.test_randFloat = test_randFloat;

var _math = require("./math");

var test = _interopRequireWildcard(_math);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function test_PI() {
    return test.PI() > 3.14;
}
function test_POS_INF() {
    return test.POS_INF() > 0;
}
function test_NEG_INF() {
    return test.NEG_INF() < 0;
}
function test_cos() {
    return test.cos(180) === -1;
}
function test_sin() {
    return test.sin(90) === 1;
}
function test_tan() {
    return test.tan(0) === 0;
}
function test_pow() {
    return test.pow(2, 3) === 8;
}
function test_ceiling() {
    return test.ceiling(2.1) === 3;
}
function test_floor() {
    return test.floor(2.9) === 2;
}
function test_abs() {
    return test.abs(-2.9) === 2.9;
}
function test_max() {
    return test.max([1, 3, -10, 9, 5]) === 9;
}
function test_min() {
    return test.min([1, 3, -10, 9, 5]) === -10;
}
function test_rand() {
    return test.rand() >= 0 && test.rand() < 1;
}
function test_randInt() {
    return test.randInt(10, 20) >= 10 && test.randInt(10, 20) < 20;
}
function test_randFloat() {
    return test.randFloat(1.5, 2.5) >= 1.5 && test.randInt(1.5, 2.5) < 2.5;
}
//# sourceMappingURL=_math_tests.js.map