"use strict";

var _circle_tests = require("../lib/circle_tests");

var tests = _interopRequireWildcard(_circle_tests);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe("Tests for Pline Module", function () {
    it("test_circle_FromOriginVectors", function () {
        expect(tests.test_circle_FromOriginVectors()).toBe(true);
    });
    it("test_circle_From3Points", function () {
        expect(tests.test_circle_From3Points()).toBe(true);
    });
    it("test_circle_ArcFrom3Points", function () {
        expect(tests.test_circle_ArcFrom3Points()).toBe(true);
    });
});
//# sourceMappingURL=circle.tests.js.map