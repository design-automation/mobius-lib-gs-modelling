"use strict";

var _split_tests = require("../lib/split_tests");

var test = _interopRequireWildcard(_split_tests);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe("Tests for Split", function () {
    it("test_circleCircle2D", function () {
        expect(test.test_circleCircle2D()).toBe(true);
    });
});
//# sourceMappingURL=split.tests.js.map