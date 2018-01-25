"use strict";

var _plane_tests = require("../lib/plane_tests");

var tests = _interopRequireWildcard(_plane_tests);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe("Tests for Plane Module", function () {
    it("test_plane_FromOriginVectors", function () {
        expect(tests.test_plane_FromOriginVectors()).toBe(true);
    });
    it("test_plane_FromOriginPoints", function () {
        expect(tests.test_plane_FromOriginPoints()).toBe(true);
    });
    it("test_plane_FromOriginWCS", function () {
        expect(tests.test_plane_FromOriginWCS()).toBe(true);
    });
});
//# sourceMappingURL=plane.tests.js.map