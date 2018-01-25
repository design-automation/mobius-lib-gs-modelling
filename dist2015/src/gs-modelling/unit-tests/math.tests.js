"use strict";

var _math_tests = require("../lib/_math_tests");

var test = _interopRequireWildcard(_math_tests);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe("Tests for List Module", function () {
    it("test_PI", function () {
        expect(test.test_PI()).toBe(true);
    });
    it("test_POS_INF", function () {
        expect(test.test_POS_INF()).toBe(true);
    });
    it("test_NEG_INF", function () {
        expect(test.test_NEG_INF()).toBe(true);
    });
    it("test_cos", function () {
        expect(test.test_cos()).toBe(true);
    });
    it("test_sin", function () {
        expect(test.test_sin()).toBe(true);
    });
    it("test_tan", function () {
        expect(test.test_tan()).toBe(true);
    });
    it("test_pow", function () {
        expect(test.test_pow()).toBe(true);
    });
    it("test_ceiling", function () {
        expect(test.test_ceiling()).toBe(true);
    });
    it("test_abs", function () {
        expect(test.test_abs()).toBe(true);
    });
    it("test_max", function () {
        expect(test.test_max()).toBe(true);
    });
    it("test_min", function () {
        expect(test.test_min()).toBe(true);
    });
    it("test_rand", function () {
        expect(test.test_rand()).toBe(true);
    });
    it("test_randInt", function () {
        expect(test.test_randInt()).toBe(true);
    });
    it("test_randFloat", function () {
        expect(test.test_randFloat()).toBe(true);
    });
});
//# sourceMappingURL=math.tests.js.map