"use strict";

var _three_utils_tests = require("../lib/_three_utils_tests");

var _tests = _interopRequireWildcard(_three_utils_tests);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe("Tests for Three Utils Dev", function () {
    it("test_multVectorMatrix", function () {
        expect(_tests.test_multVectorMatrix()).toBe(true);
    });
    it("test_xformMatrixPointXYZs", function () {
        expect(_tests.test_xformMatrixPointXYZs()).toBe(true);
    });
    it("test_xformMatrix", function () {
        expect(_tests.test_xformMatrix()).toBe(true);
    });
    it("test_subVectors", function () {
        expect(_tests.test_subVectors()).toBe(true);
    });
    it("test_planesAreCoplanar", function () {
        expect(_tests.test_planesAreCoplanar()).toBe(true);
    });
    it("test_pointIsOnPlane", function () {
        expect(_tests.test_pointIsOnPlane()).toBe(true);
    });
    it("test_vectorsAreCodir", function () {
        expect(_tests.test_vectorsAreCodir()).toBe(true);
    });
});
//# sourceMappingURL=_three.tests.js.map