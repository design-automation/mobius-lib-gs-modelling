"use strict";

var _string_tests = require("../lib/_string_tests");

var test = _interopRequireWildcard(_string_tests);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe("Tests for String Module", function () {
    it("test_endsWith", function () {
        expect(test.test_endsWith()).toBe(true);
    });
    it("test_startsWith", function () {
        expect(test.test_startsWith()).toBe(true);
    });
    it("test_includes", function () {
        expect(test.test_includes()).toBe(true);
    });
    it("test_len", function () {
        expect(test.test_len()).toBe(true);
    });
    it("test_replace", function () {
        expect(test.test_replace()).toBe(true);
    });
    it("test_search", function () {
        expect(test.test_search()).toBe(true);
    });
    it("test_split", function () {
        expect(test.test_split()).toBe(true);
    });
    it("test_substring", function () {
        expect(test.test_substring()).toBe(true);
    });
});
//# sourceMappingURL=string.tests.js.map