"use strict";

var _point_tests = require("../lib/point_tests");

var tests = _interopRequireWildcard(_point_tests);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe("Tests for Point Module", function () {
    it("test_point_FromXYZ", function () {
        expect(tests.test_point_FromXYZ()).toBe(true);
    });
});
//# sourceMappingURL=point.tests.js.map