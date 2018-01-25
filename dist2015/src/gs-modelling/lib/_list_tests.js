"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.test_Copy = test_Copy;
exports.test_FromRange = test_FromRange;
exports.test_len = test_len;
exports.test_append = test_append;
exports.test_appendFront = test_appendFront;
exports.test_extend = test_extend;
exports.test_extendFront = test_extendFront;
exports.test_flatten = test_flatten;
exports.test_removeIndex = test_removeIndex;
exports.test_removeValue = test_removeValue;
exports.test_reverse = test_reverse;
exports.test_sortAlpha = test_sortAlpha;
exports.test_sortNum = test_sortNum;
exports.test_slice = test_slice;
exports.test_splice = test_splice;

var _list = require("./list");

var test = _interopRequireWildcard(_list);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function test_Copy() {
    var x = [1, 2, "abc", 1.23];
    var y = test.Copy(x);
    if (x[1] !== y[1]) {
        return false;
    }
    return true;
}
function test_FromRange() {
    var x = test.FromRange(10, 20);
    if (x[0] !== 10) {
        return false;
    }
    if (x.length !== 10) {
        return false;
    }
    if (x[9] !== 19) {
        return false;
    }
    return true;
}
function test_len() {
    var x = [0, 1, 2, 3, 4];
    if (x.length !== 5) {
        return false;
    }
    return true;
}
function test_append() {
    var x = [1, 2, 3];
    var y = test.append(x, 10);
    if (y[3] !== 10) {
        return false;
    }
    return true;
}
function test_appendFront() {
    var x = [1, 2, 3];
    var y = test.appendFront(x, 10);
    if (y[0] !== 10) {
        return false;
    }
    return true;
}
function test_extend() {
    var x = [1, 2, 3];
    var y = test.extend(x, [7, 6, 5]);
    if (y[5] !== 5) {
        return false;
    }
    return true;
}
function test_extendFront() {
    var x = [1, 2, 3];
    var y = test.extendFront(x, [7, 6, 5]);
    if (y[0] !== 7) {
        return false;
    }
    return true;
}
function test_flatten() {
    var x = [1, [7, 8, 9], [3, 4, 5]];
    var y = test.flatten(x);
    if (y[6] !== 5) {
        return false;
    }
    return true;
}
function test_removeIndex() {
    var x = [10, 20, 30, 40];
    var y = test.removeIndex(x, 1);
    if (y[2] !== 40) {
        return false;
    }
    return true;
}
function test_removeValue() {
    var x = [10, 20, 30, 40, 20];
    var y1 = test.removeValue(x, 20, true);
    var y2 = test.removeValue(x, 20, false);
    if (y1.length !== 3) {
        return false;
    }
    if (y2.length !== 4) {
        return false;
    }
    return true;
}
function test_reverse() {
    var x = [10, 20, 30, 40, 20];
    var y = test.reverse(x);
    if (y[0] !== 20) {
        return false;
    }
    return true;
}
function test_sortAlpha() {
    var x = ["b", "a", "d", "c"];
    var y = test.sortAlpha(x);
    if (y[0] !== "a") {
        return false;
    }
    return true;
}
function test_sortNum() {
    var x = [2, 1, 4, 3];
    var y = test.sortNum(x);
    if (y[0] !== 1) {
        return false;
    }
    return true;
}
function test_slice() {
    var x = [2, 1, 4, 3];
    var y = test.slice(x, 1, 3);
    if (y[0] !== 1) {
        return false;
    }
    if (y.length !== 2) {
        return false;
    }
    return true;
}
function test_splice() {
    var x = [2, 1, 4, 3];
    var y = test.splice(x, 1, 2, [10, 20, 30]);
    if (y[1] !== 10) {
        return false;
    }
    if (y.length !== 5) {
        return false;
    }
    return true;
}
//# sourceMappingURL=_list_tests.js.map