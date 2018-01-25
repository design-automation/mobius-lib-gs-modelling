"use strict";

var _model_tests = require("../lib/model_tests");

var pline_tests = _interopRequireWildcard(_model_tests);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

describe("Tests for Model Module", function () {
    it("test_model_New", function () {
        expect(pline_tests.test_model_New()).toBe(true);
    });
    it("test_model_Load", function () {
        expect(pline_tests.test_model_FromData()).toBe(true);
    });
    it("test_model_Save", function () {
        expect(pline_tests.test_model_Save()).toBe(true);
    });
});
//# sourceMappingURL=model.tests.js.map