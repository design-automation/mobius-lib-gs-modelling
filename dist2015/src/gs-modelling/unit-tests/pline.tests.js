"use strict";

var _pline_tests = require("../lib/pline_tests");

var pline_tests = _interopRequireWildcard(_pline_tests);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe("Tests for Pline Module", function () {
    it("test_pline_fromPoints", function () {
        expect(pline_tests.test_pline_fromPoints()).toBe(true);
    });
    it("test_pline_From2Points", function () {
        expect(pline_tests.test_pline_From2Points()).toBe(true);
    });
    it("test_pline_evalParam", function () {
        expect(pline_tests.test_pline_evalParam()).toBe(true);
    });
    it("test_pline_join", function () {
        expect(pline_tests.test_pline_join()).toBe(true);
    });
    it("test_pline_extract", function () {
        expect(pline_tests.test_pline_extract()).toBe(true);
    });
    it("test_pline_explode", function () {
        expect(pline_tests.test_pline_explode()).toBe(true);
    });
    it("test_pline_extend", function () {
        expect(pline_tests.test_pline_extend()).toBe(true);
    });
    it("test_pline_extrude", function () {
        expect(pline_tests.test_pline_extrude()).toBe(true);
    });
});
//# sourceMappingURL=pline.tests.js.map