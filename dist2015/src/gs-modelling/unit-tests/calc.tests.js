"use strict";

var _calc_tests = require("../lib/calc_tests");

var tests = _interopRequireWildcard(_calc_tests);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe("Tests for calc Module", function () {
    it("test_calc_distBetweenPoints", function () {
        expect(tests.test_calc_distBetweenPoints()).toBe(true);
    });
});
//# sourceMappingURL=calc.tests.js.map