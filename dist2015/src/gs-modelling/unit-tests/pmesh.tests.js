"use strict";

var _pmesh_tests = require("../lib/pmesh_tests");

var tests = _interopRequireWildcard(_pmesh_tests);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe("Tests for PMesh Module", function () {
    it("test_pmesh_fromPoints", function () {
        expect(tests.test_pmesh_fromPoints()).toBe(true);
    });
    it("test_pmesh_fromPline", function () {
        expect(tests.test_pmesh_fromPline()).toBe(true);
    });
    it("test_pmesh_offset", function () {
        expect(tests.test_pmesh_offset()).toBe(true);
    });
    it("test_pmesh_thicken", function () {
        expect(tests.test_pmesh_thicken()).toBe(true);
    });
});
//# sourceMappingURL=pmesh.tests.js.map