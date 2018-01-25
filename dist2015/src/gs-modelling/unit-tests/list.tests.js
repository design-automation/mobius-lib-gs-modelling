"use strict";

var _list_tests = require("../lib/_list_tests");

var test = _interopRequireWildcard(_list_tests);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe("Tests for List Module", function () {
    it("test_Copy", function () {
        expect(test.test_Copy()).toBe(true);
    });
    it("test_FromRange", function () {
        expect(test.test_FromRange()).toBe(true);
    });
    it("test_len", function () {
        expect(test.test_len()).toBe(true);
    });
    it("test_append", function () {
        expect(test.test_append()).toBe(true);
    });
    it("test_appendFront", function () {
        expect(test.test_appendFront()).toBe(true);
    });
    it("test_extend", function () {
        expect(test.test_extend()).toBe(true);
    });
    it("test_extendFront", function () {
        expect(test.test_extendFront()).toBe(true);
    });
    it("test_flatten", function () {
        expect(test.test_flatten()).toBe(true);
    });
    it("test_removeIndex", function () {
        expect(test.test_removeIndex()).toBe(true);
    });
    it("test_removeValue", function () {
        expect(test.test_removeValue()).toBe(true);
    });
    it("test_reverse", function () {
        expect(test.test_reverse()).toBe(true);
    });
    it("test_sortAlpha", function () {
        expect(test.test_sortAlpha()).toBe(true);
    });
    it("test_sortNum", function () {
        expect(test.test_sortNum()).toBe(true);
    });
    it("test_slice", function () {
        expect(test.test_slice()).toBe(true);
    });
    it("test_splice", function () {
        expect(test.test_splice()).toBe(true);
    });
});
//# sourceMappingURL=list.tests.js.map