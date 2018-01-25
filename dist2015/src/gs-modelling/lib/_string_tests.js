"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.test_endsWith = test_endsWith;
exports.test_startsWith = test_startsWith;
exports.test_includes = test_includes;
exports.test_len = test_len;
exports.test_replace = test_replace;
exports.test_search = test_search;
exports.test_split = test_split;
exports.test_substring = test_substring;

var _string = require("./string");

var test = _interopRequireWildcard(_string);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function test_endsWith() {
    return test.endsWith("abc", "bc");
}
function test_startsWith() {
    return test.startsWith("abc", "ab");
}
function test_includes() {
    return test.includes("abcdef", "bc");
}
function test_len() {
    return test.len("abcdef") === 6;
}
function test_replace() {
    var x = "abcdef";
    var y = test.replace(x, "bc", "BC");
    if (y[1] !== "B") {
        return false;
    }
    if (y.length !== 6) {
        return false;
    }
    return true;
}
function test_search() {
    return test.search("abcdef", "cde") === 2;
}
function test_split() {
    var x = "this is some text with spaces";
    var y = test.split(x, " ");
    if (y[0] !== "this") {
        return false;
    }
    if (y.length !== 6) {
        return false;
    }
    return true;
}
function test_substring() {
    var x = "this is some text with spaces";
    var y = test.substring(x, 8, 12);
    if (y !== "some") {
        return false;
    }
    return true;
}
//# sourceMappingURL=_string_tests.js.map